import { User } from '@api/responses';
import { useGetUser } from '@api/user/query/useGetUser';
import SwitchButton from '@components/SwitchButton';
import GenreBadge from '@components/profile/GenreBadge';
import ProfileHeader from '@components/profile/ProfileHeader';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { XStack, YStack } from 'tamagui';

type States = 'Statistics' | 'Achievements';
const ProfilePage: React.FC<{ userid: string }> = ({ userid }) => {
  const { data, isFetching } = useGetUser({
    variables: { id: userid },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const [userData, setUserData] = useState<User>();

  const [activeState, setActiveState] = useState<States>('Statistics');

  const handleStateChange = (newState: string) => {
    setActiveState(newState as States);
  };

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
    <YStack height="100%" backgroundColor="$color.background">
      <ProfileHeader user={userData!} />

      <YStack flex={1}>
        {/* Button component for statistics and achievements*/}

        <XStack justifyContent="center" paddingVertical="$4">
          <SwitchButton
            states={['Statistics', 'Achievements'] as [States, States]}
            onStateChange={handleStateChange}
          />
        </XStack>
        <ScrollView bounces>
          <YStack gap="$-8" marginBottom="$8">
            <XStack flex={1} justifyContent="center" gap="$6" padding="$7">
              <GenreBadge genre="Education 👨‍🏫" percent={30} />
              <GenreBadge genre="Music 🎶" percent={20} />
              <GenreBadge genre="Football ⚽️" percent={13} />
            </XStack>

            <XStack flex={1} justifyContent="center" gap="$6" padding="$7">
              <GenreBadge genre="IRL 😄" percent={9} />
              <GenreBadge genre="Art 🎨" percent={5} />
              <GenreBadge genre="Sport 🏈" percent={2} />
            </XStack>
          </YStack>
        </ScrollView>
      </YStack>
    </YStack>
  );
};

export default ProfilePage;
