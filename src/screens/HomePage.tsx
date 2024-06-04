import StreamCard from '@components/stream/StreamCard';
import StreamPreviewCard from '@components/stream/StreamPreviewCard';
import StreamPreviewCardPlaceholder from '@components/stream/StreamPreviewCardPlaceholder';
import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, XStack, Avatar, H1 } from 'tamagui';

const HomePage = () => {
  const fakeFollowingStreamData: {
    viewerCount: number;
    streamerName: string;
    previewImg: string;
  }[] = [
    {
      viewerCount: 1200000,
      streamerName: 'Nic',
      previewImg: 'https://random.imagecdn.app/181/310',
    },
    {
      viewerCount: 10000,
      streamerName: 'Tom',
      previewImg: 'https://random.imagecdn.app/181/310',
    },
    {
      viewerCount: 100000,
      streamerName: 'Tom',
      previewImg: 'https://random.imagecdn.app/181/310',
    },
    {
      viewerCount: 1200,
      streamerName: 'Julia',
      previewImg: 'https://random.imagecdn.app/181/310',
    },
    {
      viewerCount: 80,
      streamerName: 'Kevin',
      previewImg: 'https://random.imagecdn.app/181/310',
    },
  ];
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
            {fakeFollowingStreamData.length === 0 ? (
              <StreamPreviewCardPlaceholder />
            ) : (
              fakeFollowingStreamData.map((d, idx) => {
                return <StreamPreviewCard key={idx} {...d} streamId={idx.toString()} />;
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
          <YStack gap="$2.5">
            <StreamCard
              streamId="1"
              name="Anna"
              viewerCount={1200000}
              avatar_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSOLGUixXG8-JSCNGgzrdg0tIqAFL9VfHbJBYylyOtU28twsRS"
            />

            <StreamCard
              streamId="1"
              name="Anna"
              viewerCount={1200000}
              avatar_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSOLGUixXG8-JSCNGgzrdg0tIqAFL9VfHbJBYylyOtU28twsRS"
            />
            <StreamCard
              streamId="1"
              name="Anna"
              viewerCount={1200000}
              avatar_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSOLGUixXG8-JSCNGgzrdg0tIqAFL9VfHbJBYylyOtU28twsRS"
            />
            <StreamCard
              streamId="1"
              name="Anna"
              viewerCount={1200000}
              avatar_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSOLGUixXG8-JSCNGgzrdg0tIqAFL9VfHbJBYylyOtU28twsRS"
            />
            <StreamCard
              streamId="1"
              name="Anna"
              viewerCount={1200000}
              avatar_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSOLGUixXG8-JSCNGgzrdg0tIqAFL9VfHbJBYylyOtU28twsRS"
            />
          </YStack>
        </ScrollView>
      </YStack>
    </YStack>
  );
};

export default HomePage;
