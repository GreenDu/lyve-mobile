import { AchievementType } from '@api/responses';
import { LevelType } from '../../types/types';
import React, { useState } from 'react';
import { YStack, SizableText, XStack, Progress, Accordion } from 'tamagui';
import { achievementLookupTable, getAchievementDescription } from '@utils/achievementLookup';
import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Props {
  name: string;
  condition: number;
  progress: number;
  type: AchievementType;
  level: number;
}

const AchievementBadge: React.FC<Props> = ({ name, condition, progress, type, level }) => {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <Pressable onPress={toggleDescription}>
      <YStack padding="$2" borderRadius={15}>
        <XStack gap="$4" alignItems="center">
          <YStack
            borderRadius={15}
            height="$6"
            width="$6"
            backgroundColor="$primaryLight"
            alignItems="center"
            justifyContent="center">
            <SizableText size="$8">{achievementLookupTable[type][level as LevelType]}</SizableText>
          </YStack>
          <YStack flex={1} gap="$2" paddingRight="$2">
            <XStack justifyContent="space-between">
              <SizableText>{name}</SizableText>
              <SizableText>
                {progress} / {condition}
              </SizableText>
            </XStack>

            <Progress
              backgroundColor="$primaryLight"
              value={Math.round((progress / condition) * 100)}>
              <Progress.Indicator backgroundColor="$textWashedOut" />
            </Progress>
          </YStack>
        </XStack>
      </YStack>

      {showDescription && (
        <YStack flex={1} padding="$4" borderRadius="$5">
          <SizableText>{getAchievementDescription(type, condition)}</SizableText>
        </YStack>
      )}
    </Pressable>
  );
};

export default AchievementBadge;
