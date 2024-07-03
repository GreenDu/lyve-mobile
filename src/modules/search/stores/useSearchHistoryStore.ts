import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import * as Crypto from 'expo-crypto';

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
          id: Crypto.randomUUID(),
          name,
          created_at: new Date(),
        };

        // Filter out existing item with the same name
        const filteredHistory = get().history.filter((item) => item.name !== name);

        const newHistory = [newItem, ...filteredHistory];

        if (newHistory.length > 20) {
          newHistory.pop();
        }

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
