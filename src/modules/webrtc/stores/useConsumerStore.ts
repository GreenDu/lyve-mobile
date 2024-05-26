import { Consumer } from 'mediasoup-client/lib/Consumer';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useConsumerStore = create(
  combine(
    {
      consumer: null as Consumer | null,
    },
    (set) => ({
      add: (c: Consumer) => set(() => ({ consumer: c })),
      close: () =>
        set((s: { consumer: Consumer }) => {
          if (!s.consumer.closed) {
            s.consumer.close();
          }
          return {
            consumer: null,
          };
        }),
    })
  )
);
