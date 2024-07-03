import { formatNumber } from '@utils/formatNumber';
import React from 'react';
import { YStack, SizableText, XStack } from 'tamagui';

interface Props {
  genre: string;
  percent: number;
  avgViewer: number;
  days: string[];
}

const GenreStatisticBadge: React.FC<Props> = ({ genre, percent, avgViewer, days }) => {
  const formatDaysString = (arr: string[]): string => {
    return arr.length === 0
      ? ''
      : arr.length === 1
        ? arr[0]!
        : arr.length === 2
          ? `${arr[0]} & ${arr[1]}`
          : arr
              .slice(0, -1)
              .map((str, index) => `${str}${index === arr.length - 2 ? ' & ' : ', '}`)
              .join('') + arr[arr.length - 1];
  };

  return (
    <YStack padding="$2" backgroundColor="$primaryLight" borderRadius={15}>
      <YStack gap="$2" paddingLeft="$2" paddingRight="$2">
        <SizableText fontSize={14}>
          {percent.toPrecision(3)}% {genre}
        </SizableText>
        <XStack justifyContent="space-between">
          <SizableText fontSize={13} color="$color.textWashedOut">
            Avg. Viewers: {formatNumber(avgViewer)}
          </SizableText>
          <SizableText fontSize={13} color="$color.textWashedOut">
            mostly {formatDaysString(days.map((s) => s.substring(0, 3)))}
          </SizableText>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default GenreStatisticBadge;
