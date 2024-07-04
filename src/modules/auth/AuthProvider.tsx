import { GetUserResponse } from '@api/responses';
import { useCreateUser } from '@api/user/mutation/useCreateUser';
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
} from 'expo-auth-session';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';

import { AuthContext } from './AuthContext';
import { IdTokenPayload } from './types';
import { AuthContextData, KeycloakConfiguration } from '../../types/auth';

// This is needed for ios
global.atob = decode;
interface AuthProviderProps {
  children: React.ReactNode;
  config: KeycloakConfiguration;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children, config }) => {
  const [user, setUser] = useState<AuthContextData['user']>({} as AuthContextData['user']);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const createUserMutation = useCreateUser();

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

  const storeTokensAndSetUser = async (tokens: TokenResponse, initialLogin = false) => {
    const { accessToken, idToken } = tokens;

    await AsyncStorage.multiSet([
      ['tokenConfig', JSON.stringify(tokens)],
      ['accessToken', accessToken],
    ]);

    if (idToken) {
      const userData = jwtDecode<IdTokenPayload>(idToken);

      const userResponse = await fetchUserData(userData);

      if (userResponse) {
        setUser({
          id: userResponse.id,
          username: userResponse.username,
          dispname: userResponse.dispname,
          avatar_url: userResponse.avatar_url ?? '',
          level: userResponse.level,
          email: userData.email,
        });
        setIsAuthenticated(true);

        if (initialLogin) {
          router.navigate('/');
        }
      }
    }
  };

  const fetchUserData = async (userData: IdTokenPayload) => {
    const access_token = await AsyncStorage.getItem('accessToken');
    const userResponse = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/user/${userData.sub}`,
      {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      }
    ).then((res) => res.json() as unknown as GetUserResponse);

    if (userResponse.success && userResponse.data) {
      return userResponse.data.user;
    } else {
      const createdUserData = await createUserMutation.mutateAsync({
        id: userData.sub,
        username: userData.preferred_username,
        email: userData.email,
      });

      if (createdUserData.success && createdUserData.data) {
        return createdUserData.data.user;
      }

      if (createdUserData.error[0]) {
        Toast.show({
          type: 'error',
          text1: createdUserData.error[0].name,
          text2: createdUserData.error[0].msg,
        });
      }
    }
    return null;
  };

  const signIn = useCallback(async () => {
    await promptAsync();
  }, [promptAsync]);

  const signOut = useCallback(async (): Promise<void> => {
    if (discovery?.revocationEndpoint) {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          await revokeAsync({ token: accessToken, clientId: config.clientId }, discovery);
          await clearUserData();
        }
      } catch (error) {
        console.error('Error during sign out', error);
      }
    }
  }, [config.clientId, discovery]);

  const clearUserData = async () => {
    setUser({} as AuthContextData['user']);
    await AsyncStorage.multiRemove(['accessToken', 'tokenConfig']);
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  const handleTokenExchange = useCallback(async (): Promise<TokenResponse | null> => {
    try {
      if (result?.type === 'success' && discovery?.tokenEndpoint) {
        const { code } = result.params;
        if (code) {
          const tokens = await AuthSession.exchangeCodeAsync(
            {
              code,
              redirectUri,
              clientId: config.clientId,
              extraParams: { code_verifier: request?.codeVerifier as string },
            },
            discovery
          );

          return tokens;
        }
      }
    } catch (error) {
      console.error('Error during token exchange ', error);
    }
    return null;
  }, [discovery, redirectUri, request, result, config.clientId]);

  const handleRefresh = useCallback(
    async (initialLogin = false) => {
      try {
        const tokenConfigString = await AsyncStorage.getItem('tokenConfig');
        if (tokenConfigString) {
          const tokenConfig = JSON.parse(tokenConfigString);
          if (tokenConfig.refreshToken && discovery?.tokenEndpoint) {
            let tokenResponse = new TokenResponse(tokenConfig);
            if (tokenResponse.shouldRefresh()) {
              tokenResponse = await refreshAsync(
                { clientId: config.clientId, refreshToken: tokenConfig.refreshToken },
                discovery
              );

              await storeTokensAndSetUser(tokenResponse, initialLogin);
            }
          }
        }
      } catch (error) {
        console.error('Error refreshing token', error);
        await clearUserData();
      }
    },
    [config.clientId, discovery]
  );

  const checkExistingTokens = useCallback(async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const tokenConfigString = await AsyncStorage.getItem('tokenConfig');

      if (accessToken && tokenConfigString && discovery?.userInfoEndpoint) {
        const tokenConfig = JSON.parse(tokenConfigString);

        await AuthSession.fetchUserInfoAsync(
          {
            accessToken,
          },
          discovery
        );

        if (new TokenResponse(tokenConfig).shouldRefresh()) {
          await handleRefresh(true);
        } else {
          await storeTokensAndSetUser(new TokenResponse(tokenConfig));
        }
      } else {
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
      clearUserData();
    }
  }, [handleRefresh]);

  useEffect(() => {
    if (result) {
      handleTokenExchange().then(async (res) => {
        if (res) {
          await storeTokensAndSetUser(res, true);
        } else {
          setIsAuthenticated(false);
        }
      });
    }
  }, [result, handleTokenExchange]);

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(handleRefresh, 2 * 60 * 1000);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [isAuthenticated, handleRefresh]);

  useEffect(() => {
    checkExistingTokens();
  }, [checkExistingTokens]);

  useEffect(() => {
    if (result?.type === 'error') {
      if (result.error) {
        Toast.show({
          type: 'error',
          text1: result.error.name,
          text2: result.error.message,
        });
      }
      Toast.show({
        type: 'error',
        text1: 'Authentication Error',
        text2: 'An error occurred. Please try logging in again.',
      });
    }
  }, [result]);

  const authContextValue = useMemo(
    () => ({
      isLoading,
      session: isAuthenticated,
      signIn,
      signOut,
      user,
    }),
    [isLoading, isAuthenticated, signIn, signOut, user]
  );

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
