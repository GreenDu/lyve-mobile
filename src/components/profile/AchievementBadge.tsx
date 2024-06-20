import React from 'react';
import { YStack, SizableText, XStack } from 'tamagui';

interface Props {
  name: string;
  condition: number;
  progress: number;
}

const AchievementBadge: React.FC<Props> = ({ name, condition, progress }) => {
  return (
    <YStack padding="$2" backgroundColor="$primaryLight" borderRadius={15}>
      <YStack gap="$2" paddingLeft="$2" paddingRight="$2">
        <SizableText fontSize={14}>
          {name}
        </SizableText>
        <XStack justifyContent='space-between'>
          <SizableText fontSize={13}> {condition} </SizableText>
          <SizableText fontSize={13}>{progress}</SizableText>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default AchievementBadge;
