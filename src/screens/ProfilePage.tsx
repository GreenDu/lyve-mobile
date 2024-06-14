import { GetUserResponse } from '@api/responses';
import { useGetUser } from '@api/user/query/useGetUser';
import SwitchButton from '@components/SwitchButton';
import GenreBadge from '@components/profile/GenreBadge';
import ProfileHeader from '@components/profile/ProfileHeader';
import useAuth from '@modules/auth/useAuth';
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

  const { user: me } = useAuth();

  const [userData, setUserData] = useState<GetUserResponse['data']>(null);

  const [activeState, setActiveState] = useState<States>('Statistics');

  const handleStateChange = (newState: string) => {
    setActiveState(newState as States);
  };

  useEffect(() => {
    if (data && data.data) {
      setUserData(data.data);
    }
  }, [data]);

  if (isFetching && !userData) {
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
      <ProfileHeader
        user={userData?.user!}
        isSelf={me.id === userid}
        subscribed={userData?.user.subscribed ?? false}
      />

      <YStack flex={1}>
        {/* Button component for statistics and achievements*/}

        <XStack justifyContent="center" paddingVertical="$4">
          <SwitchButton
            states={['Statistics', 'Achievements'] as [States, States]}
            onStateChange={handleStateChange}
          />
        </XStack>

        <ScrollView bounces>
          <YStack marginBottom="$8" padding="$4">
            <YStack flex={1} gap="$3">
              <GenreBadge genre="Education 👨‍🏫" percent={30} avgViewer={10234} />
              <GenreBadge genre="Music 🎶" percent={20} avgViewer={1200} />
              <GenreBadge genre="Football ⚽️" percent={13} avgViewer={1200} />
              <GenreBadge genre="IRL 😄" percent={9} avgViewer={1200} />
              <GenreBadge genre="Art 🎨" percent={5} avgViewer={1200} />
              <GenreBadge genre="Sport 🏈" percent={2} avgViewer={1200} />
            </YStack>
          </YStack>
        </ScrollView>
      </YStack>
    </YStack>
  );
};

export default ProfilePage;
