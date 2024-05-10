import React from 'react';
import { Card, CardProps, Image, XStack, H4 } from 'tamagui';

import LiveBadge from './LiveBadge';
import ViewCounterBadge from './ViewCounterBadge';

interface StreamPreviewCardProps extends CardProps {
  viewerCount: number;
  previewImg: string;
  streamerName: string;
}
const StreamPreviewCard: React.FC<StreamPreviewCardProps> = (
  { viewerCount, previewImg, streamerName },
  props
) => {
  return (
    <Card {...props} width={181} borderRadius="$8" height={310}>
      <Card.Header padded>
        <XStack alignItems="center" justifyContent="space-between">
          <LiveBadge />
          <ViewCounterBadge count={viewerCount} />
        </XStack>
      </Card.Header>
      <Card.Footer>
        <XStack alignItems="center" justifyContent="center" marginBottom="$4" flex={1}>
          <H4 fontWeight="800">{streamerName}</H4>
        </XStack>
      </Card.Footer>
      <Card.Background>
        <Image
          style={{ borderRadius: 25 }}
          resizeMode="cover"
          alignSelf="center"
          source={{
            width: 181,
            height: 310,
            uri: previewImg,
          }}
        />
      </Card.Background>
    </Card>
  );
};

export default StreamPreviewCard;
