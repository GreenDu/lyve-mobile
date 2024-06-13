import React from 'react';
import { Stack } from 'expo-router';

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
      <Stack.Screen
        name="settings"
        options={{ headerShown: false, animation: 'fade_from_bottom' }}
      />
      <Stack.Screen
        name="followers"
        options={{ headerShown: false, animation: 'fade_from_bottom' }}
      />
      <Stack.Screen
        name="following"
        options={{ headerShown: false, animation: 'fade_from_bottom' }}
      />
    </Stack>
  );
};

export default ProfileLayout;
