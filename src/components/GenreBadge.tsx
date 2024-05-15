import React from 'react';
import { Pressable } from 'react-native';
import { XStack, Text } from 'tamagui';

interface GenreBadgeProps {
  text: string;
  color: string;
  selected: boolean;
  onPress: () => void;
}

const GenreBadge: React.FC<GenreBadgeProps> = ({ text, color, selected, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <XStack
        borderRadius={50}
        backgroundColor={selected ? color : '#f1f1f1'}
        paddingHorizontal="$3.5"
        paddingVertical="$2">
        <Text fontWeight="400">{text}</Text>
      </XStack>
    </Pressable>
  );
};

export default GenreBadge;
