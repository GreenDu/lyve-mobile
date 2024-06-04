import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import { Message } from '../types';

export const useStreamChatStore = create(
  combine(
    {
      messages: [] as Message[],
    },
    (set) => ({
      setMessages: (m: Message[]) => set(() => ({ messages: m })),
      addMessage: (m: Message) => set((s) => ({ messages: [...s.messages, m] })),
      clearChat: () =>
        set(() => ({
          messages: [],
        })),
    })
  )
);
