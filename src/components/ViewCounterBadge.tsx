import { formatNumber } from '@utils/formatNumber';
import React from 'react';
import { YStack, SizableText } from 'tamagui';

interface ViewCounterBadgeProps {
  count: number;
}

const ViewCounterBadge: React.FC<ViewCounterBadgeProps> = ({ count }) => {
  return (
    <YStack
      width={41}
      height={26}
      backgroundColor="#15171899"
      alignItems="center"
      justifyContent="center"
      borderRadius={25}>
      <SizableText>{formatNumber(count) ?? 0}</SizableText>
    </YStack>
  );
};

export default ViewCounterBadge;
