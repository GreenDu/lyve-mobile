import { Stack } from 'expo-router';
import React from 'react';

const ProfileRootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[userid]" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
      <Stack.Screen name="editProfile" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
    </Stack>
    
  );
};

export default ProfileRootLayout;