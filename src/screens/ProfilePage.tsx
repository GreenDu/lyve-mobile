import { User, Achievement, Stream } from '@api/responses';
import { useGetUser } from '@api/user/query/useGetUser';
import ProfileHeader from '@components/profile/ProfileHeader';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Button, H3, SizableText, XStack, YStack } from 'tamagui';

const ProfilePage: React.FC<{ userid: string }> = ({ userid }) => {
  const { data, isFetching } = useGetUser({ variables: { id: userid }, refetchOnMount: true });

  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    if (data && data.data) {
      setUserData(data.data.user);
    }
  }, [data]);

  if (isFetching) {
    return (
      <YStack
        padding="$4"
        justifyContent="center"
        alignItems="center"
        height="100%"
        backgroundColor="$background">
        <ActivityIndicator size="large" />
      </YStack>
    );
  }

  return (
    <View>
      <YStack height="100%" backgroundColor="$color.background">
        <ProfileHeader user={userData!} />

        <YStack flex={1}>
          {/* Button component for statistics and achievements*/}

          <XStack justifyContent="center" mt="$5">
            <Button
              flex={1}
              minHeight="30%"
              maxWidth="30%"
              borderRadius={20}
              backgroundColor="#A372F9">
              Statistics
            </Button>
            <Button flex={1} minHeight="30%" maxWidth="30%" borderRadius={20}>
              Achievements
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </View>
  );
};

export default ProfilePage;
