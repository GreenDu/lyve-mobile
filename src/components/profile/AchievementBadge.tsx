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
      <YStack padding="$2" backgroundColor="$primaryLight" borderRadius={15}>
        <XStack gap="$2">
          <YStack
            borderRadius={15}
            backgroundColor={'black'}
            height="$4"
            width="$4"
            alignItems="center"
            justifyContent="center">
            <SizableText>{achievementLookupTable[type][level as LevelType]}</SizableText>
          </YStack>
          <YStack flex={1} gap="$2" paddingRight="$2">
            <XStack justifyContent="space-between">
              <SizableText>{name}</SizableText>
              <SizableText>
                {progress} / {condition}
              </SizableText>
            </XStack>

            <Progress value={Math.round((progress / condition) * 100)}>
              <Progress.Indicator backgroundColor="$textWashedOut" />
            </Progress>
          </YStack>
        </XStack>
      </YStack>

      {showDescription && (
        <XStack alignItems='center'>
          <Feather name="corner-down-right" size={24} color="white" />
          <YStack flex={1} padding="$2" backgroundColor="$primaryLight" borderRadius={15}>
            <SizableText>
              {getAchievementDescription(type, condition)}
            </SizableText>
          </YStack>
        </XStack>
      )}
    </Pressable>
  );
};

export default AchievementBadge;
