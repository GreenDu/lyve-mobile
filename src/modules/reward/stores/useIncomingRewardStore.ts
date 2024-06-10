import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import { IncomingReward } from '../types';

export const useIncomingRewardStore = create(
  combine(
    {
      rewardQueue: [] as IncomingReward[],
    },
    (set) => ({
      add: (r: IncomingReward) => set((state) => ({ rewardQueue: [...state.rewardQueue, r] })),
      dequeue: () =>
        set((state) => {
          if (state.rewardQueue.length === 0) return state;

          const [, ...updatedQueue] = state.rewardQueue;

          return {
            rewardQueue: updatedQueue,
          };
        }),
    })
  )
);
