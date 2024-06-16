import { queryClient } from '@api/APIProvider';
import { useGetNotifications } from '@api/user/query/useGetNotifications';
import { useGetUser } from '@api/user/query/useGetUser';
import useAuth from '@modules/auth/useAuth';
import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { YStack } from 'tamagui';

export default function AppLayout() {
  const { isLoading, session, user } = useAuth();

  if (isLoading) {
    return (
      <YStack fullscreen justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </YStack>
    );
  }

  // Only require authentication within the (app) group's layout as users

  if (!session) {
    return <Redirect href="/login" />;
  }

  if (user) {
    queryClient.prefetchQuery(useGetUser.getFetchOptions({ id: user.id }));
    queryClient.prefetchQuery(useGetNotifications.getFetchOptions({ id: user.id }));
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
      <Stack.Screen name="stream" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
    </Stack>
  );
}
