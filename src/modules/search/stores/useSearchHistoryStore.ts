import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import { HistoryItem } from '../types';

export const useSearchHistoryStore = create(
  combine(
    {
      history: [] as HistoryItem[],
    },
    (set, get) => ({
      load: async () => {
        const loadedHistory = await AsyncStorage.getItem('searchHistory');
        if (loadedHistory) {
          set({ history: JSON.parse(loadedHistory) as HistoryItem[] });
        }
      },
      addItem: async (name: string) => {
        const newItem: HistoryItem = {
          id: crypto.randomUUID(),
          name,
          created_at: new Date(),
        };

        const newHistory = [newItem, ...get().history];

        await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));

        set({ history: newHistory });
      },
      removeItem: async (id: string) => {
        const newHistory = get().history.filter((i) => i.id !== id);

        await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));

        set({ history: newHistory });
      },
      clear: async () => {
        await AsyncStorage.removeItem('searchHistory');
        set({ history: [] });
      },
    })
  )
);
