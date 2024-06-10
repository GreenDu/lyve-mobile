import { View, Text } from 'react-native';
import React from 'react';
import { XStack, Avatar, Button } from 'tamagui';
import useAuth from '@modules/auth/useAuth';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const HomeHeader = () => {
  const { user } = useAuth();
  return (
    <XStack justifyContent="space-between" alignItems="center">
      <Avatar circular size="$5">
        <Avatar.Image
          accessibilityLabel="Nate Wienert"
          src={
            user.avatar_url ||
            'https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80'
          }
        />
        <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
      </Avatar>
      <XStack space="$5" alignItems="center">
        <Button
          onPress={() => router.navigate('/notification')}
          backgroundColor="$primaryDark"
          borderColor="$primaryLight"
          icon={<Feather name="bell" size={24} color="white" />}
          circular
          size="$5"
        />
        <Button
          onPress={() => router.navigate('/search')}
          backgroundColor="$primaryDark"
          borderColor="$primaryLight"
          icon={<Feather name="search" size={24} color="white" />}
          circular
          size="$5"
        />
      </XStack>
    </XStack>
  );
};

export default HomeHeader;
