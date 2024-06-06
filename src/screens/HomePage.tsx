import { Stream, Streamer, User } from '@api/responses';
import StreamCard from '@components/stream/StreamCard';
import StreamPreviewCard from '@components/stream/StreamPreviewCard';
import StreamPreviewCardPlaceholder from '@components/stream/StreamPreviewCardPlaceholder';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { YStack, XStack, Avatar, H1 } from 'tamagui';

const HomePage = () => {
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
      <XStack>
        <Avatar circular size="$5">
          <Avatar.Image
            accessibilityLabel="Nate Wienert"
            src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
          />
          <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
        </Avatar>
      </XStack>
      <YStack marginTop="$6" backgroundColor="transparent">
        <H1 fontSize={24} fontWeight="800">
          Followings
        </H1>
        <ScrollView horizontal>
          <XStack gap="$2.5">
            {myStreamsFeed.length === 0 ? (
              <StreamPreviewCardPlaceholder />
            ) : (
              myStreamsFeed.map((d) => {
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
      <YStack marginTop="$6">
        <H1 fontSize={24} fontWeight="800">
          Recommended
        </H1>
        <ScrollView>
          <YStack gap="$2.5" />
        </ScrollView>
      </YStack>
    </YStack>
  );
};

export default HomePage;
