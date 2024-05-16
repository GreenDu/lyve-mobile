import 'expo-dev-client';

import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { registerGlobals } from 'react-native-webrtc';
import { TamaguiProvider } from 'tamagui';

import config from '../../tamagui.config';
import { APIProvider } from '../api/APIProvider';
import AuthProvider from '../components/providers/AuthProvider';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

WebBrowser.maybeCompleteAuthSession();

SplashScreen.preventAutoHideAsync();

registerGlobals();

export default function RootLayout() {
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
            </SafeAreaProvider>
          </AuthProvider>
        </APIProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
