import React from 'react';
import { YStack, SizableText, XStack, Progress } from 'tamagui';

const achievementEmojis = {
    'NTH_STREAM': {
      1: '1️⃣',
      2: '🔟',
      3: '🔥',
      4: '🎥',
      5: '💯',
      6: '🏆'
    },
    'NTH_VIEWER': {
      1: '🔟',
      2: '📈',
      3: '💯',
      4: '✨',
      5: '💛',
      6: '🌟',
      7: '👑',
      8: '🌏'
    },
    'MINUTES_STREAMED': {
      1: '🔟',
      2: '⌛️',
      3: '🏃‍➡️',
      4: '🔥',
      5: '🌄',
      6: '🤯',
      7: '❤️‍🔥'
    }
  };

interface Props {
  name: string;
  condition: number;
  progress: number;
  type: string;
  level: number;
}

const AchievementBadge: React.FC<Props> = ({ name, condition, progress, type, level }) => {
  return (
    <YStack padding="$2" backgroundColor="$primaryLight" borderRadius={15}>
      <XStack gap="$2">

        <YStack borderRadius={15} backgroundColor={"black"} height="$4" width="$4" alignItems='center' justifyContent='center'>
            <SizableText>💯</SizableText>
        </YStack>
        <YStack flex={1} gap="$2">
        <XStack justifyContent='space-between'>
            <SizableText>{name}</SizableText>
            <SizableText>{progress} / {condition}</SizableText>
        </XStack>

        <Progress value={Math.round((progress/condition) * 100)}>
        <Progress.Indicator backgroundColor="$textWashedOut" />
        </Progress>
        </YStack>
      </XStack>
    </YStack>
  );
};

export default AchievementBadge;
