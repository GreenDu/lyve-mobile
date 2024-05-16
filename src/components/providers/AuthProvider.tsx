import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';
import * as AuthSession from 'expo-auth-session';
import {
  makeRedirectUri,
  TokenResponse,
  useAuthRequest,
  useAutoDiscovery,
  revokeAsync,
  refreshAsync,
  TokenResponseConfig,
} from 'expo-auth-session';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { AuthContextData, KeycloakConfiguration } from '../../types/auth';

// This is needed for ios
global.atob = decode;
interface AuthProviderProps {
  children: React.ReactNode;
  config: KeycloakConfiguration;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children, config }) => {
  const [user, setUser] = useState<AuthContextData['user']>({} as AuthContextData['user']);
  const [session, setSession] = useState<boolean>(
    AsyncStorage.getItem('accessToken') != null && AsyncStorage.getItem('tokenConfig') != null
  );

  const discovery = useAutoDiscovery(config.realmUrl);

  const redirectUri = makeRedirectUri({
    scheme: config.scheme,
    native: 'lyve-mobile://auth/redirect',
  });

  const authRequestConfig = {
    responseType: AuthSession.ResponseType.Code,
    clientId: config.clientId,
    redirectUri,
    prompt: AuthSession.Prompt.Login,
    scopes: ['openid', 'profile', 'offline_access', 'email'],
    usePKCE: true,
  };

  // Create and load an auth request
  const [request, result, promptAsync] = useAuthRequest({ ...authRequestConfig }, discovery);

  const signIn = useCallback(async () => {
    await promptAsync();
  }, [promptAsync]);

  const signOut = useCallback(async (): Promise<void> => {
    if (discovery?.revocationEndpoint) {
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (accessToken) {
        setUser({} as AuthContextData['user']); // remove userData
        const revokeResponse = await revokeAsync(
          {
            token: accessToken,
            clientId: config.clientId,
          },
          discovery
        );

        if (revokeResponse) {
          setUser({} as AuthContextData['user']); // remove userData
          await AsyncStorage.multiRemove(['accessToken', 'tokenConfig']);
          setSession(false);
        }
      }
    }
  }, [config.clientId, discovery]);

  const handleTokenExchange = useCallback(async (): Promise<{
    tokens: TokenResponse;
  } | null> => {
    try {
      if (result?.type === 'success' && !!discovery?.tokenEndpoint) {
        const { code } = result.params;

        if (!code) {
          return null;
        }

        const tokens: TokenResponse = await AuthSession.exchangeCodeAsync(
          {
            code,
            redirectUri,
            clientId: process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID as string,
            extraParams: {
              code_verifier: request?.codeVerifier as string,
            },
          },
          discovery
        );

        return { tokens };
      }

      return null;
    } catch (_error) {
      return null;
    }
  }, [discovery, redirectUri, request, result]);

  const updateState = async (x: { tokens: TokenResponse } | null) => {
    const tokens = x?.tokens ?? null;

    if (!tokens) return;

    const { accessToken, idToken } = tokens;

    await AsyncStorage.multiSet([
      ['tokenConfig', JSON.stringify(idToken)],
      ['accessToken', accessToken],
    ]);

    if (!idToken) return;

    // set user data
    const userData: any = jwtDecode(idToken); // not beautiful but it works

    // make axios call to /api/user/:id

    const checkUser = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/user/${userData.sub}`
    ).then((res) => res.json());

    let createdUser: any = null;

    const isUserNotFound = checkUser.error.length > 0 && checkUser.error[0]?.code === 404;
    if (isUserNotFound) {
      createdUser = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/user/create`, {
        method: 'POST',
        body: JSON.stringify({
          id: userData.sub,
          username: userData.preferred_username,
          email: userData.email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
    }

    const user = createdUser.data.data || checkUser.data.user;

    const { id, username, avatar_url, level } = user;

    setUser({
      id,
      username,
      avatar_url,
      level,
      email: userData.email,
    });

    setSession(true);
    router.replace('/');
  };

  const handleRefresh = useCallback(async () => {
    const tokenConfigString = await AsyncStorage.getItem('tokenConfig');

    if (tokenConfigString && session) {
      const tokenConfig: TokenResponseConfig = JSON.parse(tokenConfigString);
      if (tokenConfig?.refreshToken && discovery?.tokenEndpoint) {
        // instantiate a new token response object which will allow us to refresh
        let tokenResponse = new TokenResponse(tokenConfig);
        // shouldRefresh checks the expiration and makes sure there is a refresh token
        if (tokenResponse.shouldRefresh()) {
          tokenResponse = await refreshAsync(
            {
              clientId: config.clientId,
              refreshToken: tokenConfig.refreshToken,
            },
            discovery
          );
        }

        // update tokenConfig, accesToken and user
        updateState({ tokens: tokenResponse });
      }
    }
  }, [config.clientId, discovery, session]);

  const fetchAndSetUser = async () => {
    const configToken = await AsyncStorage.getItem('tokenConfig');

    if (!configToken) {
      return;
    }

    const userData: any = jwtDecode(configToken);

    const fetchedUser = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/user/${userData.sub}`
    ).then((res) => res.json());

    const { id, username, avatar_url, level } = fetchedUser.data.user;

    setUser({
      id,
      username,
      avatar_url,
      level,
      email: userData.email,
    });
  };

  useEffect(() => {
    handleTokenExchange().then(updateState);
  }, [handleTokenExchange, result]);

  useEffect(() => {
    if (session) {
      const refreshInterval = setInterval(
        () => {
          handleRefresh();
        },
        2 * 60 * 1000
      ); // Refresh every 2 min

      return () => clearInterval(refreshInterval);
    }
  }, [handleRefresh, session]);

  useEffect(() => {
    fetchAndSetUser();
  }, []);

  const authContextValue = useMemo(
    () => ({
      isLoading: discovery !== null && !request,
      session,
      signIn,
      signOut,
      user,
    }),
    [discovery, request, session, signIn, signOut, user]
  );

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
