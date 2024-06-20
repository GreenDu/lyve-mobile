import { Genre, GetMostStreamedGenresResponse, GetUserResponse } from '@api/responses';
import { useGetGenreStatistic } from '@api/user/query/useGetGenreStatistic';
import { useGetUser } from '@api/user/query/useGetUser';
import SwitchButton from '@components/SwitchButton';
import GenreStatisticBadge from '@components/profile/GenreStatisticBadge';
import ProfileHeader from '@components/profile/ProfileHeader';
import useAuth from '@modules/auth/useAuth';
import { groupAchievements } from '@utils/groupAchievements';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { SizableText, View, XStack, YStack } from 'tamagui';
import { DisplayedAchievement } from "../types/types";
import AchievementBadge from '@components/profile/AchievementBadge';


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

  const [groupedAchievements, setGroupedAchievements] = useState<DisplayedAchievement[]>([]);


  const handleStateChange = (newState: string) => {
    setActiveState(newState as States);
  };

  useEffect(() => {
    if (data && data.data) {
      setUserData(data.data);
      setGroupedAchievements(groupAchievements(data.data.user.userToAchievement))
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
    <YStack height="100%" backgroundColor="$color.background" paddingBottom="$4">
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
        {activeState === 'Statistics' ? (
          genreData.length === 0 ? (
            <>
              <YStack flex={1} paddingTop="$8" paddingHorizontal="$4" alignItems="center">
                <SizableText size="$6" textAlign="center" color="$textWashedOut">
                  {me.id === userData?.user.id
                    ? "You haven't streamed yet. Start your first stream to see your stats here!"
                    : "This user hasn't started streaming yet. Check back later for their stats!"}
                </SizableText>
              </YStack>
            </>
          ) : (
            <>
              <ScrollView bounces>
                <YStack marginBottom="$8" padding="$4">
                  <YStack flex={1} gap="$3">
                    {genreData.map((genre, index) => (
                      <GenreStatisticBadge
                        key={index}
                        genre={genre.name}
                        percent={genre.percent}
                        avgViewer={genre.avgViewers}
                        days={genre.days}
                      />
                    ))}
                  </YStack>
                </YStack>
              </ScrollView>
            </>
          )
        ) : (
          <>
            <ScrollView bounces>
              <YStack marginBottom="$8" padding="$4">
              <YStack flex={1} gap="$3">
                    {groupedAchievements.map((achievement) => (
                      <AchievementBadge
                        key={achievement.id}
                        name={achievement.name}
                        progress={achievement.progress}
                        condition={achievement.condition}
                        type={achievement.type}
                      />
                    ))}
                  </YStack>
              </YStack>
            </ScrollView>
          </>
        )}
      </YStack>
    </YStack>
  );
};

export default ProfilePage;
