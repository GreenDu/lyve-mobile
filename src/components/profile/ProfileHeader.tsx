import { User } from '@api/responses';
import FollowButton from '@components/FollowButton';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XStack, YStack, Avatar, Button, H3, SizableText } from 'tamagui';

import FollowStats from './FollowStats';

interface ProfileHeaderProps {
  user: User | null;
  isSelf: boolean;
  subscribed: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isSelf, subscribed }) => {
  return (
    <YStack
      height={340}
      backgroundColor="$primaryDark"
      borderBottomColor="$primaryLight"
      borderBottomWidth={1}
      padding="$4">
      <SafeAreaView
        style={{
          height: '100%',
          flexDirection: 'column',
        }}>
        <XStack alignItems="center">
          <Avatar circular size="$7" testID="profile-avatar">
            <Avatar.Image
              accessibilityLabel={user?.username ?? ''}
              src={
                user?.avatar_url ??
                'https://lyveblobstorage.blob.core.windows.net/images/avatar_placeholder.png'
              }
            />
            <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
          </Avatar>

          <FollowStats
            userId={user?.id ?? ''}
            followerCount={user?.followerCount ?? 0}
            followingCount={user?.followingCount ?? 0}
          />
        </XStack>
        <YStack justifyContent="flex-start" gap="$1" maxWidth="90%" paddingVertical="$3">
          <YStack>
            <H3 testID="user-dispname" fontWeight="700">
              {user?.dispname}
            </H3>
            <SizableText testID="user-username" opacity={0.8}>
              @{user?.username}
            </SizableText>
          </YStack>
          <YStack minHeight="$2">
            <SizableText testID="user-bio">{user?.bio.slice(0, 100)}</SizableText>
          </YStack>
        </YStack>

        {/* Button component in profile header*/}
        <XStack justifyContent="space-between">
          {isSelf ? (
            <>
              <Button
                onPress={() => router.push('/(auth)/(tabs)/profile/editProfile')}
                backgroundColor="$textWashedOut"
                size="$4"
                borderRadius="$10"
                fontSize={18}>
                Edit Profile
              </Button>
              <Button
                testID="settings-button"
                onPress={() => router.push(`/profile/${user?.id}/settings`)}
                backgroundColor="$textWashedOut"
                size="$4"
                borderRadius="$10"
                icon={<Feather name="settings" size={24} color="white" />}
              />
            </>
          ) : (
            <>
              <XStack>
                <FollowButton size="large" userId={user?.id ?? ''} subscribed={subscribed} />
              </XStack>
            </>
          )}
        </XStack>
      </SafeAreaView>
    </YStack>
  );
};

export default ProfileHeader;
