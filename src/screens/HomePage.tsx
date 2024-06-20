import { usePaginatedFeed } from '@api/feed/query/usePaginatedFeed';
import { GetFeedResponse, Stream, Streamer } from '@api/responses';
import StreamCard from '@components/stream/StreamCard';
import useAuth from '@modules/auth/useAuth';
import EmptyFeedPlaceholder from '@modules/home/EmptyFeedPlaceholder';
import ErrorFeedPlaceholder from '@modules/home/ErrorFeedPlaceholder';
import HomeHeader from '@modules/home/HomeHeader';
import { MasonryFlashList } from '@shopify/flash-list';
import { generateFeed } from '@utils/generateFeed';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { YStack } from 'tamagui';

type FeedItem = Stream & {
  streamer: Streamer & {
    subscribed: boolean;
  };
};

const HomePage = () => {
  const { user } = useAuth();

  const [renewFeed, setRenewFeed] = useState(false);

  const { fetchNextPage, refetch, isRefetching, data, isSuccess, isLoading, isFetching, isError } =
    usePaginatedFeed({
      id: user.id,
      limit: '20',
    });

  const [feed, setFeed] = useState<NonNullable<GetFeedResponse['data']>>({
    // feed: generateFeed(50),
    feed: [],
    hasNext: false,
    nextCursor: '',
  });

  useEffect(() => {
    if (data && isSuccess) {
      const newFeed = data.pages[0]?.data?.feed ?? [];
      const lastPage = data.pages[data.pages.length - 1]!.data;
      setFeed((prevFeed) => {
        const updatedFeed = renewFeed ? newFeed : [...prevFeed.feed, ...newFeed];

        return {
          feed: updatedFeed,
          hasNext: lastPage?.hasNext || false,
          nextCursor: lastPage?.nextCursor || '',
        };
      });

      // Reset the refreshing state
      if (renewFeed) {
        setRenewFeed(false);
      }
    }
  }, [data, isSuccess, refetch, fetchNextPage]);

  const handleRefresh = async () => {
    setRenewFeed(true);
    await refetch();
  };

  const renderItem = useCallback(
    ({ item }: { item: FeedItem }) => <StreamCard data={item} />,
    [data]
  );

  const keyExtractor = useCallback((item: FeedItem) => item.id, [data]);

  return (
    <YStack height="100%" backgroundColor="$color.background" padding="$4">
      <HomeHeader />
      {isLoading ? (
        <YStack
          padding="$4"
          justifyContent="center"
          alignItems="center"
          backgroundColor="$primaryDark"
          space="$2">
          <ActivityIndicator size="small" />
        </YStack>
      ) : isError ? (
        <ErrorFeedPlaceholder onRetry={handleRefresh} />
      ) : (
        <MasonryFlashList
          bounces
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyFeedPlaceholder onRefresh={handleRefresh} />}
          data={feed.feed}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          estimatedItemSize={273}
          onEndReached={() => !isFetching && fetchNextPage()}
          onEndReachedThreshold={0.3}
          onRefresh={handleRefresh}
          refreshing={isRefetching}
        />
      )}
    </YStack>
  );
};

export default HomePage;
