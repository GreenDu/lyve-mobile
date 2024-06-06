import { View, Text } from 'react-native';
import React from 'react';
import { useGetUser } from '@api/user/useGetUser';
import { Button, H1, H2, SizableText, XStack, YStack } from 'tamagui';
import UserStats from '@components/profile/ProfileHeader';

const ProfilePage: React.FC<{ userid: string }> = ({ userid }) => {
  const { data } = useGetUser({ variables: { id: userid } });

  return (
    <View>
      <YStack height="100%" backgroundColor="$color.background">
        <YStack height="35%" backgroundColor={'$color.accentDark'} borderRadius={30}>
          <YStack top="$5" left="$5">
            <UserStats
              followerCount={data?.data.user.followerCount}
              followingCount={data?.data.user.followingCount}></UserStats>

            <YStack justifyContent="flex-start" gap="$3">
              <H2>{data?.data.user.username}</H2>
              <SizableText>@{data?.data.user.username}</SizableText>
              <SizableText>{data?.data.user.bio}This is a user bio</SizableText>
            </YStack>
            <XStack gap="$15">
              <Button
                onPress={() => console.log('Edit Profile View')}
                backgroundColor="$primaryLight"
                maxWidth="40%"
                borderRadius="$10"
                height="$5"
                mt="$5"
                fontSize={20}>
                Edit Profile
              </Button>

              <Button
                onPress={() => console.log('Settings View')}
                backgroundColor="$primaryLight"
                maxWidth="40%"
                borderRadius="$10"
                height="$5"
                mt="$5"
                fontSize={20}>
                Settings
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </YStack>
    </View>
  );
};

export default ProfilePage;
