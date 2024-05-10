import React from 'react';
import { YStack, SizableText } from 'tamagui';

const LiveBadge: React.FC = () => {
  return (
    <YStack
      backgroundColor="$color.orange"
      width={60}
      height={26}
      alignItems="center"
      justifyContent="center"
      borderRadius={25}>
      <SizableText>Live</SizableText>
    </YStack>
  );
};

export default LiveBadge;
