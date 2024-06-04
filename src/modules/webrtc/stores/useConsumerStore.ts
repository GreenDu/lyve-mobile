import { Consumer } from 'mediasoup-client/lib/Consumer';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useConsumerStore = create(
  combine(
    {
      consumers: [] as Consumer[],
    },
    (set) => ({
      add: (c: Consumer) => set((s) => ({ consumers: [...s.consumers, c] })),
      closeAll: () =>
        set((s) => {
          s.consumers.forEach((c) => {
            if (!c.closed) {
              c.close();
            }
          });
          return {
            consumers: [],
          };
        }),
    })
  )
);
