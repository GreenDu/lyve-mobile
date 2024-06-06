import { Stream, User } from '@api/responses';
import StreamPreviewCard from '@components/stream/StreamPreviewCard';
import StreamPreviewCardPlaceholder from '@components/stream/StreamPreviewCardPlaceholder';
import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, H1, XStack } from 'tamagui';

const MyFeed: React.FC<{
  feed: (Stream & {
    streamer: Pick<
      User,
      'id' | 'username' | 'dispname' | 'avatar_url' | 'promotionPoints' | 'level'
    >;
  })[];
}> = ({ feed }) => {
  return (
    <YStack marginTop="$6" backgroundColor="transparent">
      <H1 fontSize={24} fontWeight="800">
        Followings
      </H1>
      <ScrollView horizontal>
        <XStack gap="$2.5">
          {feed.length === 0 ? (
            <StreamPreviewCardPlaceholder />
          ) : (
            feed.map((d) => {
              return (
                <StreamPreviewCard
                  previewImg={d.previewImgUrl}
                  streamerName={d.streamer.dispname}
                  key={d.id}
                  streamId={d.id}
                  viewerCount={d.viewerCount}
                />
              );
            })
          )}
        </XStack>
      </ScrollView>
    </YStack>
  );
};

export default MyFeed;
