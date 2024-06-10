import React from 'react';
import { Image } from 'react-native';
import { H3, SizableText, YStack } from 'tamagui';

import { rewardMap } from './rewardMap';
import { IncomingReward } from './types';

const Reward: React.FC<{ data: IncomingReward; color: string }> = ({ data, color }) => {
  return data ? (
    <YStack
      backgroundColor={color + 'aa'}
      width="$20"
      height="$12"
      borderRadius="$5"
      alignItems="center"
      justifyContent="flex-end">
      <Image
        source={rewardMap[data.reward.type].asset}
        style={{ position: 'absolute', top: '-90%', width: 200, height: 200 }}
      />
      <YStack alignItems="center" space="$4" paddingVertical="$4">
        <H3>{data.sender.dispname} sent you a reward</H3>
        <SizableText size="$6">{data.msg}</SizableText>
      </YStack>
    </YStack>
  ) : null;
};

export default Reward;
