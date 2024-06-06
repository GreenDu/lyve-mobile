import { useGetFeed } from '@api/feed/query/useGetFeed';
import { useGetRecommendedStreams } from '@api/feed/query/useGetRecommendedStreams';
import { Stream, Streamer, User } from '@api/responses';
import useAuth from '@modules/auth/useAuth';
import HomeHeader from '@modules/home/HomeHeader';
import MyFeed from '@modules/home/MyFeed';
import RecommendedFeed from '@modules/home/RecommendedFeed';
import React, { useEffect, useState } from 'react';
import { YStack } from 'tamagui';

const HomePage = () => {
  const { user } = useAuth();

  const { data: feedData } = useGetFeed({ variables: { id: user.id }, refetchInterval: 30 * 1000 });
  const { data: rsData } = useGetRecommendedStreams({ refetchInterval: 30 * 1000 });

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

  useEffect(() => {
    if (feedData && feedData.data) {
      setMyStreamsFeed(feedData.data.feed);
    }

    if (rsData && rsData.data) {
      setRecommendedStreamsFeed(rsData.data.streams);
    }
  }, [feedData, rsData]);
  return (
    <YStack height="100%" backgroundColor="$color.background" padding="$4">
      <HomeHeader />
      <MyFeed feed={myStreamsFeed} />

      <RecommendedFeed feed={recommendedStreamsFeed} />
    </YStack>
  );
};

export default HomePage;
