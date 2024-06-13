import React from 'react';
import { YStack, SizableText } from 'tamagui';

interface Props {
  genre: string;
  percent: number;
}

const GenreBadge: React.FC<Props> = ({ genre, percent = 0 }) => {
  return (
    <YStack
      padding="$2"
      gap="$1"
      alignItems="center"
      backgroundColor="$primaryLight"
      height="$10"
      width="$8"
      borderRadius={15}>
      <YStack
        justifyContent="center"
        alignItems="center"
        height="$4"
        width="$4"
        backgroundColor="#151718"
        borderRadius={15}>
        <SizableText fontSize={20}>{genre.split(' ')[1] ?? '❓'}</SizableText>
      </YStack>
      <YStack alignItems="center">
        <SizableText fontSize={13}>{genre.split(' ')[0]}</SizableText>
        <SizableText fontSize={13}>{percent}%</SizableText>
      </YStack>
    </YStack>
  );
};

export default GenreBadge;
