import { User } from '@api/responses';
import useAuth from '@modules/auth/useAuth';
import { router } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { XStack, Avatar, YStack, SizableText } from 'tamagui';

import FollowButton from '../FollowButton';
import { formatNumber } from '@utils/formatNumber';

interface UserSearchResultCardProps {
  user: Pick<User, 'id' | 'username' | 'dispname' | 'avatar_url' | 'followerCount'> & {
    subscribed: boolean;
  };
}
const UserSearchResultCard: React.FC<UserSearchResultCardProps> = ({ user }) => {
  const { user: me } = useAuth();
  return (
    <Pressable
      onPress={() => {
        router.replace(`/(auth)/(tabs)/profile/${user.id}`);
      }}>
      <XStack justifyContent="space-between" alignItems="center" testID="user-search-result-card">
        <XStack space="$3" alignItems="center">
          <Avatar circular size="$5">
            <Avatar.Image
              accessibilityLabel={user.username}
              src={
                user.avatar_url ??
                'https://lyveblobstorage.blob.core.windows.net/images/avatar_placeholder.png'
              }
            />
            <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
          </Avatar>

          <YStack>
            <SizableText size="$5">{user.dispname}</SizableText>

            <SizableText size="$4" mt="$-1.5" color="$textWashedOut">
              {formatNumber(user.followerCount)} Followers
            </SizableText>
          </YStack>
        </XStack>
        {me.id !== user.id && (
          <FollowButton size="medium" userId={user.id} subscribed={user.subscribed} />
        )}
      </XStack>
    </Pressable>
  );
};

export default UserSearchResultCard;
