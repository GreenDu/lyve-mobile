import React from 'react';
import { XStack, YStack, SizableText, Avatar, Text } from 'tamagui';

import { formatNumber } from '../utils/formatNumber';

interface StreamCardProps {
  avatar_url: string;
  name: string;
  viewerCount: number;
}
const StreamCard: React.FC<StreamCardProps> = ({ avatar_url, name, viewerCount }) => {
  return (
    <XStack backgroundColor="$color.primaryLight" borderRadius={20} padding="$3">
      <Avatar size="$5" borderRadius={15}>
        <Avatar.Image accessibilityLabel={name} src={avatar_url} />
        <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
      </Avatar>
      <YStack marginLeft="$3" alignItems="flex-start" justifyContent="center">
        <Text fontWeight="800" fontSize={15} color="$color.textMain">
          {name}
        </Text>
        <SizableText color="$color.textWashedOut">
          {formatNumber(viewerCount)} people watching
        </SizableText>
      </YStack>
    </XStack>
  );
};

export default StreamCard;
