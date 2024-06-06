import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { Stream, Streamer } from '@api/responses';
import StreamCard from '@components/stream/StreamCard';
import { YStack, H1 } from 'tamagui';

const RecommendedFeed: React.FC<{
  feed: (Stream & {
    streamer: Streamer;
  })[];
}> = ({ feed }) => {
  return (
    <YStack marginTop="$6">
      <H1 fontSize={24} fontWeight="800">
        Recommended
      </H1>
      <ScrollView>
        <YStack gap="$2.5">
          {feed.map((d) => {
            return (
              <StreamCard
                key={d.id}
                streamId={d.id}
                viewerCount={d.viewerCount}
                avatar_url={d.streamer.avatar_url ?? ''}
                name={d.streamer.dispname}
              />
            );
          })}
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default RecommendedFeed;
