import { Feather } from '@expo/vector-icons';
import useAuth from '@modules/auth/useAuth';
import { router } from 'expo-router';
import React from 'react';
import { XStack, Avatar, Button } from 'tamagui';

const HomeHeader = () => {
  const { user } = useAuth();
  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      paddingBottom="$6"
      testID="home-header">
      <Avatar circular size="$5">
        <Avatar.Image
          accessibilityLabel="Nate Wienert"
          testID="avatar"
          src={
            user.avatar_url ||
            'https://lyveblobstorage.blob.core.windows.net/images/avatar_placeholder.png'
          }
        />
        <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
      </Avatar>
      <XStack space="$5" alignItems="center">
        <Button
          onPress={() => router.navigate('/notification')}
          backgroundColor="$primaryDark"
          borderColor="$primaryLight"
          testID="notification-button"
          icon={<Feather name="bell" size={24} color="white" />}
          circular
          size="$5"
        />
        <Button
          onPress={() => router.navigate('/search')}
          testID="search-button"
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
