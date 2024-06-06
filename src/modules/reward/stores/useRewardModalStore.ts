import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useRewardModalStore = create(
  combine(
    {
      visible: false,
    },
    (set) => ({
      open: () => set(() => ({ visible: true })),
      close: () => set(() => ({ visible: false })),
    })
  )
);
