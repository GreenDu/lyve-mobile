import { formatNumber } from '@utils/formatNumber';
import React from 'react';
import { XStack, YStack, H2, Avatar, Separator, Button, H3, SizableText } from 'tamagui';
import FollowStats from './FollowStats';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { User } from '@api/responses';
import { SafeAreaView } from 'react-native-safe-area-context';
import FollowButton from '@components/FollowButton';

interface ProfileHeaderProps {
  user: User | null;
  isSelf: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isSelf }) => {
  return (
    <YStack
      height={340}
      backgroundColor="$color.accentDark"
      borderBottomEndRadius="$4"
      borderBottomStartRadius="$4"
      padding="$4">
      <SafeAreaView
        style={{
          height: '100%',
          flexDirection: 'column',
        }}>
        <XStack alignItems="center">
          <Avatar circular size="$7">
            <Avatar.Image
              accessibilityLabel="Nate Wienert"
              src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
            />
            <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
          </Avatar>

          <FollowStats
            userId={user?.id ?? ''}
            followerCount={user?.followerCount ?? 0}
            followingCount={user?.followingCount ?? 0}
          />
        </XStack>
        <YStack justifyContent="flex-start" gap="$2" maxWidth="90%" paddingVertical="$3">
          <YStack>
            <H3 fontWeight="700">{user?.dispname}</H3>
            <SizableText opacity={0.8}>@{user?.username}</SizableText>
          </YStack>

          <YStack minHeight="$4.5">
            <SizableText>{user?.bio.substring(0, 100)}</SizableText>
          </YStack>
        </YStack>

        {/* Button component in profile header*/}
        <XStack justifyContent="space-between">
          {isSelf ? (
            <>
              <Button
                onPress={() => router.push('/(auth)/(tabs)/profile/editProfile')}
                backgroundColor="#A372F9"
                size="$4"
                borderRadius="$10"
                fontSize={18}>
                Edit Profile
              </Button>
              <Button
                onPress={() => router.push(`/profile/${user?.id}/settings`)}
                backgroundColor="#A372F9"
                size="$4"
                borderRadius="$10"
                icon={<Feather name="settings" size={24} color="white" />}
              />
            </>
          ) : (
            <>
              <XStack>
                <FollowButton size="large" userId={user?.id ?? ''} subscribed={true} />
              </XStack>
            </>
          )}
        </XStack>
      </SafeAreaView>
    </YStack>
  );
};

export default ProfileHeader;
