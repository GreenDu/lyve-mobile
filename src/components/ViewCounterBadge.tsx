import { Feather } from '@expo/vector-icons';
import { formatNumber } from '@utils/formatNumber';
import React from 'react';
import { XStack, SizableText } from 'tamagui';

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
      w: 72,
      h: 26,
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
      gap="$2"
      testID="viewerCounterBadge">
      {size === 'normal' && <Feather name="eye" size={20} color="white" />}
      <SizableText>{formatNumber(count) ?? 0}</SizableText>
    </XStack>
  );
};

export default ViewCounterBadge;
