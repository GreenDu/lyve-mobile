import { View, Text } from 'react-native';
import React from 'react';
import { useGetUser } from '@api/user/useGetUser';
import { H1, XStack, YStack } from 'tamagui';
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
          followingCount={data?.data.user.followingCount}
          ></UserStats>

          <XStack>
            <Text>hallo</Text>
          </XStack>
          </YStack>


        </YStack>
      </YStack>
    </View>
  );
};

export default ProfilePage;
