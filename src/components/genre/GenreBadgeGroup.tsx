import GenreBadge from '@components/genre/GenreBadge';
import React from 'react';
import { XStack } from 'tamagui';

interface GenreBadgeGroupProps {
  children: React.ReactElement<React.ComponentProps<typeof GenreBadge>>[];
}

const GenreBadgeGroup: React.FC<GenreBadgeGroupProps> = ({ children }) => {
  return (
    <XStack flex={1} justifyContent="flex-end" position="relative">
      {children.map((child, index) => {
        return React.cloneElement(child, {
          key: index,
          size: 'small',
          marginLeft: -16, // Adjust margin to negative marginRight
          elevation: 6,
        });
      })}
    </XStack>
  );
};

export default GenreBadgeGroup;
