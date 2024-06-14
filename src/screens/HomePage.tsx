import { usePaginatedFeed } from '@api/feed/query/usePaginatedFeed';
import { Stream, Streamer, User } from '@api/responses';
import useAuth from '@modules/auth/useAuth';
import HomeHeader from '@modules/home/HomeHeader';
import MyFeed from '@modules/home/MyFeed';
import RecommendedFeed from '@modules/home/RecommendedFeed';
import React, { useEffect, useState } from 'react';
import { YStack } from 'tamagui';

const HomePage = () => {
  const { user } = useAuth();

  // const {  fetchNextPage, data, isSuccess: isFeedSuccess } = usePaginatedFeed({
  //   id: user.id,
  //   limit: '20',
  // });

  const [myStreamsFeed, setMyStreamsFeed] = useState<
    (Stream & {
      streamer: Pick<
        User,
        'id' | 'username' | 'dispname' | 'avatar_url' | 'promotionPoints' | 'level'
      >;
    })[]
  >([]);
  const [recommendedStreamsFeed, setRecommendedStreamsFeed] = useState<
    (Stream & {
      streamer: Streamer;
    })[]
  >([]);

  return (
    <YStack height="100%" backgroundColor="$color.background" padding="$4">
      <HomeHeader />
      <MyFeed feed={myStreamsFeed} />

      <RecommendedFeed feed={recommendedStreamsFeed} />
    </YStack>
  );
};

export default HomePage;
