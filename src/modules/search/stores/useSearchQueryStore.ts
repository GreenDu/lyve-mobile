import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useSearchQueryStore = create(
  combine(
    {
      query: '',
    },
    (set) => ({
      setQuery: (q: string) => set(() => ({ query: q })),
    })
  )
);
