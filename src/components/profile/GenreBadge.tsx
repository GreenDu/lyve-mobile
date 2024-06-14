import React from 'react';
import { YStack, SizableText, XStack } from 'tamagui';

interface Props {
  genre: string;
  percent: number;
}

const GenreBadge: React.FC<Props> = ({ genre, percent = 0 }) => {
  return (
    <YStack padding="$2" backgroundColor="$primaryLight" borderRadius={15}>
      <YStack gap="$2" paddingLeft="$2" paddingRight="$2">
        <SizableText fontSize={14}>
          {percent}% {genre}
        </SizableText>
        <XStack justifyContent='space-between'>
          <SizableText fontSize={13} color="$color.textWashedOut">Avg. Viewers: 1.2k</SizableText>
          <SizableText fontSize={13} color="$color.textWashedOut">Mostly Mo or Fr</SizableText>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default GenreBadge;
