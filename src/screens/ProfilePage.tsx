import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useGetUser } from '@api/user/query/useGetUser';
import { Button, H3, SizableText, XStack, YStack } from 'tamagui';
import ProfileHeader from '@components/profile/ProfileHeader';
import GenreBadge from '@components/profile/GenreBadge';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { User, Achievement, Stream } from '@api/responses';

const ProfilePage: React.FC<{ userid: string }> = ({ userid }) => {
  const { data } = useGetUser({ variables: { id: userid } });

  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    if (data && data.data) {
      setUserData(data.data.user);
    }
  }, [data]);

  if (userData) {
    userData.dispname = 'Streamer_testname';
    userData.followerCount = 464724;
    userData.followingCount = 1652;
    userData.bio = 'Das ist eine Testbeschreibung für einen User';
  }
  return (
    <View>
      <YStack height="100%" backgroundColor="$color.background">
        <YStack height="35%" backgroundColor={'$color.accentDark'} borderRadius={30}>
          <YStack top="$5" left="$5">
            <ProfileHeader
              followerCount={userData?.followerCount}
              followingCount={userData?.followingCount}></ProfileHeader>

            <YStack justifyContent="flex-start" gap="$2" maxWidth="90%">
              <H3 fontWeight="700" mt="$3">
                {userData?.dispname}
              </H3>
              <SizableText opacity={0.8}>@{userData?.username}</SizableText>
              <SizableText>{userData?.bio.substring(0, 100)}</SizableText>
            </YStack>

            {/* Button component in profile modal*/}
            <XStack gap="$18">
              <Button
                onPress={() => console.log('Edit Profile View')}
                backgroundColor="#A372F9"
                maxWidth="40%"
                borderRadius="$10"
                height="$5"
                mt="$5"
                fontSize={18}>
                Edit Profile
              </Button>

              <Button
                onPress={() => router.push(`profile/${userid}/settings`)}
                backgroundColor="#A372F9"
                minWidth="20%"
                borderRadius="$10"
                height="$5"
                mt="$5"
                icon={<Feather name="settings" size={24} color="white" />}></Button>
            </XStack>
          </YStack>
        </YStack>

        <YStack height="65%">
          {/* Button component for statistics and achievements*/}

          <XStack justifyContent="center" mt="$5" maxHeight="10%">
            <Button
              flex={1}
              height="$5"
              maxWidth="40%"
              borderRadius={20}
              backgroundColor="#A372F9">
              Statistics
            </Button>
            <Button flex={1} height="$5"maxWidth="40%" borderRadius={20}>
              Achievements
            </Button>
          </XStack>

          <XStack height="30%" justifyContent="center" gap="$6" padding="$7">
            <GenreBadge genre='Education 👨‍🏫' percent={30}/>
            <GenreBadge genre='Music 🎶' percent={20}/>
            <GenreBadge genre='Football ⚽️'percent={13}/>
          </XStack>

          <XStack height="30%" justifyContent="center" gap="$6" padding="$7">
            <GenreBadge genre='IRL 😄' percent={9}/>
            <GenreBadge genre='Art 🎨' percent={5}/>
            <GenreBadge genre='Sport 🏈' percent={2}/>
          </XStack>
        </YStack>
      </YStack>
    </View>
  );
};

export default ProfilePage;
