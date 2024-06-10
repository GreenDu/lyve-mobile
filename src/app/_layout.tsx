import 'expo-dev-client';

import { APIProvider } from '@api/APIProvider';
import { GiphySDK } from '@giphy/react-native-sdk';
import AuthProvider from '@modules/auth/AuthProvider';
import { useStreamStore } from '@modules/webrtc/stores/useStreamStore';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback } from 'react';
import { Platform, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { registerGlobals } from 'react-native-webrtc';
import { TamaguiProvider } from 'tamagui';

import config from '../../tamagui.config';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

WebBrowser.maybeCompleteAuthSession();

SplashScreen.preventAutoHideAsync();
registerGlobals();

if (Platform.OS === 'ios' || Platform.OS === 'android') {
  GiphySDK.configure({
    apiKey:
      Platform.OS === 'ios'
        ? (process.env.EXPO_PUBLIC_IOS_GIPHY_API_KEY as string)
        : (process.env.EXPO_PUBLIC_ANDROID_GIPHY_API_KEY as string),
  });
}

export default function RootLayout() {
  useStreamStore.getState().prepare();
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <APIProvider>
          <AuthProvider
            config={{
              clientId: process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID as string,
              realmUrl: process.env.EXPO_PUBLIC_KEYCLOAK_REALM_URL as string,
              scheme: 'lyve-mobile',
            }}>
            <SafeAreaProvider onLayout={onLayoutRootView}>
              <Slot />
              <Toast />
            </SafeAreaProvider>
          </AuthProvider>
        </APIProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
