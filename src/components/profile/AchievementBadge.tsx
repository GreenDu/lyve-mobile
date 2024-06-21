import { AchievementType } from '@api/responses';

import { achievementLookupTable, getAchievementDescription } from '@utils/achievementLookup';
import React, { useEffect, useRef, useState } from 'react';
import { YStack, SizableText, XStack, Progress } from 'tamagui';
import { Animated, Pressable } from 'react-native';

interface Props {
  name: string;
  condition: number;
  progress: number;
  type: AchievementType;
  level: number;
}

const AchievementBadge: React.FC<Props> = ({ name, condition, progress, type, level }) => {
  const [showDescription, setShowDescription] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: showDescription ? 80 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showDescription]);

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
            <SizableText size="$8">{achievementLookupTable[type][level]}</SizableText>
          </YStack>
          <YStack flex={1} gap="$2" paddingRight="$2">
            <XStack justifyContent="space-between">
              <SizableText size="$5">{name}</SizableText>
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

      <Animated.View
        style={{
          height: heightAnim,
          overflow: 'hidden',
        }}>
        <YStack flex={1} paddingHorizontal="$3" paddingVertical="$2" borderRadius="$5">
          <SizableText size="$5" color="$textWashedOut">
            {getAchievementDescription(type, condition)}
          </SizableText>
        </YStack>
      </Animated.View>
    </Pressable>
  );
};

export default AchievementBadge;
