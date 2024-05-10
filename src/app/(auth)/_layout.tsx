import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { YStack } from 'tamagui';

import useAuth from '../../hooks/useAuth';

export default function AppLayout() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </YStack>
    );
  }

  // Only require authentication within the (app) group's layout as users

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
