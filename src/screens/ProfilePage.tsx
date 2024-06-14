import { Genre, GetMostStreamedGenresResponse, GetUserResponse } from '@api/responses';
import { useGetGenreStatistic } from '@api/user/query/useGetGenreStatistic';
import { useGetUser } from '@api/user/query/useGetUser';
import SwitchButton from '@components/SwitchButton';
import GenreBadge from '@components/profile/GenreBadge';
import ProfileHeader from '@components/profile/ProfileHeader';
import useAuth from '@modules/auth/useAuth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { SizableText, View, XStack, YStack } from 'tamagui';

type States = 'Statistics' | 'Achievements';
const ProfilePage: React.FC<{ userid: string }> = ({ userid }) => {
  const { data, isFetching } = useGetUser({
    variables: { id: userid },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const { data: mostStreamedGenres } = useGetGenreStatistic({
    variables: { id: userid },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const { user: me } = useAuth();

  const [userData, setUserData] = useState<GetUserResponse['data']>(null);

  const [genreData, setGenreData] = useState<Genre[]>([]);

  const [activeState, setActiveState] = useState<States>('Statistics');

  const handleStateChange = (newState: string) => {
    setActiveState(newState as States);
  };

  useEffect(() => {
    if (data && data.data) {
      setUserData(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (mostStreamedGenres && mostStreamedGenres.data) {
      setGenreData(mostStreamedGenres.data.user.genres);
    }
  }, [mostStreamedGenres]);


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

        { genreData.length === 0 ? <>

        <YStack flex={1} paddingTop="$8" alignItems='center'>
            <SizableText fontSize={24} textAlign='center'>
              There are currently no statistics available!
            </SizableText>
        </YStack>

        </> : <>
        <ScrollView bounces>
          <YStack marginBottom="$8" padding="$4">
            <YStack flex={1} gap="$3">
              {genreData.map((genre, index) => (
                <GenreBadge
                  key={index} // Key prop should be unique for each item in the array
                  genre={genre.name} // Assuming genre name is stored in `name` property
                  percent={genre.percent}
                  avgViewer={genre.avgViewers}
                />
              ))}
            </YStack>
          </YStack>
        </ScrollView>
        </> }

      </YStack>
    </YStack>
  );
};

export default ProfilePage;
