import { formatNumber } from '@utils/formatNumber';
import React from 'react';
import { XStack, SizableText } from 'tamagui';
import { Feather } from '@expo/vector-icons';

interface ViewCounterBadgeProps {
  count: number;
  size?: 'small' | 'normal';
}

const ViewCounterBadge: React.FC<ViewCounterBadgeProps> = ({ count, size = 'small' }) => {
  const badgeStyle = {
    small: {
      w: 41,
      h: 26,
    },
    normal: {
      w: 84,
      h: 34,
    },
  };
  return (
    <XStack
      width={badgeStyle[size]!.w}
      height={badgeStyle[size]!.h}
      backgroundColor="#15171899"
      alignItems="center"
      justifyContent="center"
      borderRadius={25}
      gap="$3">
      {size === 'normal' && <Feather name="eye" size={20} color="white" />}
      <SizableText>{formatNumber(count) ?? 0}</SizableText>
    </XStack>
  );
};

export default ViewCounterBadge;
