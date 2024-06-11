import { router } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { XStack, Avatar, YStack, SizableText } from 'tamagui';

import FollowButton from './FollowButton';

const UserFollowerCard: React.FC<{
  id: string;
  username: string;
  dispname: string;
  avatar_url: string | null;
  subscribed: boolean;
}> = ({ id, username, dispname, avatar_url, subscribed }) => {
  return (
    <Pressable
      onPress={() => {
        router.replace(`/(auth)/(tabs)/profile/${id}`);
      }}>
      <XStack justifyContent="space-between" alignItems="center">
        <XStack space="$3" alignItems="center">
          <Avatar circular size="$5">
            <Avatar.Image
              accessibilityLabel="Nate Wienert"
              src={avatar_url || 'https://placehold.co/100x100'}
            />
            <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
          </Avatar>

          <YStack>
            <SizableText size="$5">{dispname}</SizableText>
            <SizableText mt="$-1.5" color="$textWashedOut">
              @{username}
            </SizableText>
          </YStack>
        </XStack>
        <FollowButton size="medium" userId={id} subscribed={subscribed} />
      </XStack>
    </Pressable>
  );
};

export default UserFollowerCard;
