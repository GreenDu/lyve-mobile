import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useMessageStore = create(
  combine(
    {
      message: '',
    },
    (set) => ({
      setMessage: (m: string) => set(() => ({ message: m })),
      clear: () =>
        set(() => ({
          message: '',
        })),
    })
  )
);
