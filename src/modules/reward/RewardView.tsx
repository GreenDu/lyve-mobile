import { getRandomLightHexColor } from '@utils/getRandomLightHexColor';
import React, { useEffect, useState } from 'react';
import { YStack } from 'tamagui';

import Reward from './Reward';
import { useIncomingRewardStore } from './stores/useIncomingRewardStore';
import { IncomingReward } from './types';

const RewardView = () => {
  const { rewardQueue } = useIncomingRewardStore((state) => ({
    rewardQueue: state.rewardQueue,
  }));

  const [visible, setVisible] = useState<boolean>(false);

  const [color, setColor] = useState<string>('#000');
  const [currentDisplayedReward, setCurrentDisplayedReward] = useState<IncomingReward>();

  const handleIncomingReward = () => {
    // run only if no other reward is displayed at the moment
    if (!visible) {
      // check if defined
      const d = rewardQueue.at(0);
      if (d) {
        setCurrentDisplayedReward(d);
        setColor(getRandomLightHexColor());

        setVisible(true);

        const t = setTimeout(() => {
          setVisible(false);
          setCurrentDisplayedReward(undefined);
          clearTimeout(t);
        }, 3000);

        useIncomingRewardStore.getState().dequeue();
      }
    }
  };

  useEffect(() => {
    if (rewardQueue.length) {
      handleIncomingReward();
    }
  }, [rewardQueue, handleIncomingReward]);

  return (
    <YStack flex={1} alignItems="center" justifyContent="flex-end" padding="$4">
      {visible && currentDisplayedReward && <Reward data={currentDisplayedReward} color={color} />}
    </YStack>
  );
};

export default RewardView;
