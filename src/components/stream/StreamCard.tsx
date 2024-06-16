import { Stream, Streamer } from '@api/responses';
import FollowButton from '@components/FollowButton';
import ViewCounterBadge from '@components/ViewCounterBadge';
import GenreBadge from '@components/genre/GenreBadge';
import GenreBadgeGroup from '@components/genre/GenreBadgeGroup';
import { formatNumber } from '@utils/formatNumber';
import { router } from 'expo-router';
import React from 'react';
import { XStack, YStack, SizableText, Avatar, Image, Card } from 'tamagui';
import { Pressable, Dimensions, ImageBackground } from 'react-native';

interface StreamCardProps {
  data: Stream & {
    streamer: Streamer & {
      subscribed: boolean;
    };
  };
}

const StreamCard: React.FC<StreamCardProps> = ({ data }) => {
  const { width } = Dimensions.get('window');
  const maxWidth = 300; // Set a max width for each card
  const cardWidth = width * 0.44 > maxWidth ? maxWidth : width * 0.44; // Ensure the card width does not exceed the max width
  const imageHeight = cardWidth * 1.75; // Adjust the image height based on the card width

  const handleCardPress = () => router.navigate(`/stream/${data.id}`);

  return (
    <Pressable onPress={handleCardPress} style={{ alignSelf: 'center' }}>
      {data.previewImgUrl ? (
        <Card
          bg="$primaryLight"
          borderRadius={10}
          width={cardWidth}
          height={imageHeight}
          marginBottom="$4">
          <ImageBackground
            source={{ uri: data.previewImgUrl }}
            style={{ width: cardWidth, height: imageHeight, borderRadius: 10 }}
            imageStyle={{ borderRadius: 10 }}>
            <Card.Header padding="$2">
              <YStack justifyContent="flex-end" alignItems="center">
                <XStack alignItems="center" height="$4" justifyContent="space-between" width="100%">
                  <XStack flex={1} alignItems="center" space="$2">
                    <Avatar circular size="$3">
                      <Avatar.Image
                        accessibilityLabel={data.streamer.username}
                        src={
                          data.streamer.avatar_url ||
                          'https://lyveblobstorage.blob.core.windows.net/images/avatar_placeholder.png'
                        }
                      />
                      <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
                    </Avatar>
                    <SizableText
                      size="$4.5"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="no-wrap"
                      maxWidth="$7">
                      {data.streamer.dispname}
                    </SizableText>
                  </XStack>
                  <ViewCounterBadge size="small" count={data.viewerCount} />
                </XStack>
                <XStack width="100%" alignItems="center" justifyContent="flex-end">
                  <GenreBadgeGroup>
                    {data.genre.split(',').map((g, index) => (
                      <GenreBadge size="small" text={g} key={index} />
                    ))}
                  </GenreBadgeGroup>
                </XStack>
              </YStack>
            </Card.Header>

            {/* Footer */}
            <Card.Footer justifyContent="flex-end" alignItems="center" padding="$2">
              {!data.streamer.subscribed && (
                <FollowButton
                  size="small"
                  userId={data.streamerId}
                  subscribed={data.streamer.subscribed}
                />
              )}
            </Card.Footer>
          </ImageBackground>
        </Card>
      ) : (
        <Card bg="$primaryLight" borderRadius={10} width={cardWidth} height={147} marginBottom="$4">
          <Card.Header padding="$3">
            <YStack space="$1.5">
              <XStack width="100%" alignItems="center" justifyContent="flex-start" space="$2">
                <Avatar circular size="$3">
                  <Avatar.Image
                    accessibilityLabel={data.streamer.username}
                    src={
                      data.streamer.avatar_url ||
                      'https://lyveblobstorage.blob.core.windows.net/images/avatar_placeholder.png'
                    }
                  />
                  <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
                </Avatar>
                <SizableText size="$5">{data.streamer.dispname}</SizableText>
              </XStack>

              <SizableText color="$textWashedOut">
                {formatNumber(data.viewerCount)} people are watching
              </SizableText>
            </YStack>
          </Card.Header>

          {/* Footer */}
          <Card.Footer
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            padding="$3">
            {!data.streamer.subscribed && (
              <FollowButton
                size="small"
                userId={data.streamerId}
                subscribed={data.streamer.subscribed}
              />
            )}
            <XStack flex={1} alignItems="center" justifyContent="flex-end">
              <GenreBadgeGroup>
                {data.genre.split(',').map((g, index) => (
                  <GenreBadge size="small" text={g} key={index} />
                ))}
              </GenreBadgeGroup>
            </XStack>
          </Card.Footer>
        </Card>
      )}
    </Pressable>
  );
};

export default StreamCard;
