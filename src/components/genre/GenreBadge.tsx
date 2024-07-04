import React from 'react';
import { Pressable } from 'react-native';
import { XStack, XStackProps, Text } from 'tamagui';

export interface GenreBadgeProps extends XStackProps {
  size: 'small' | 'medium';
  text: string;
  color?: string;
  selected?: boolean;
  onPress?: () => void;
}

const GenreBadge: React.FC<GenreBadgeProps> = ({
  size,
  text,
  color,
  selected,
  onPress,
  ...props
}) => {
  return (
    <Pressable onPress={onPress}>
      <XStack
        borderRadius={50}
        backgroundColor={size === 'medium' ? (selected ? color : '#f1f1f1') : '#5E5E60'}
        paddingHorizontal={size === 'medium' ? '$3.5' : '$2'}
        paddingVertical={size === 'medium' ? '$2' : '$1'}
        {...props}>
        <Text fontWeight="400">{size === 'medium' ? text : text.trim().split(' ')[1]}</Text>
      </XStack>
    </Pressable>
  );
};

export default GenreBadge;
