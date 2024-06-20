import { AchievementType } from '@api/responses';
import { LevelType } from '../../types/types';
import React from 'react';
import { YStack, SizableText, XStack, Progress } from 'tamagui';
import { achievementLookupTable } from '@utils/achievementLookup';


interface Props {
  name: string;
  condition: number;
  progress: number;
  type: AchievementType;
  level: number;
}

const AchievementBadge: React.FC<Props> = ({ name, condition, progress, type, level }) => {

    console.log(achievementLookupTable[type][level as LevelType])
  return (
    <YStack padding="$2" backgroundColor="$primaryLight" borderRadius={15}>
      <XStack gap="$2">

        <YStack borderRadius={15} backgroundColor={"black"} height="$4" width="$4" alignItems='center' justifyContent='center'>
            <SizableText>{achievementLookupTable[type][level as LevelType]}</SizableText>
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
