import { SocketUser } from '@modules/ws/types';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useCurrentStreamInfoStore = create(
  combine(
    {
      id: '',
      streamer: null as (SocketUser & { followerCount: number }) | null,
      viewerCount: 0,
      active: false,
    },
    (set) => ({
      setId: (id: string) => set(() => ({ id })),
      setViewerCount: (c: number) => set(() => ({ viewerCount: c })),
      setStreamer: (s: SocketUser & { followerCount: number }) => set(() => ({ streamer: s })),
      setActive: (a: boolean) => set(() => ({ active: a })),
      reset: () =>
        set(() => ({
          streamId: '',
          streamer: null,
          viewerCount: 0,
        })),
    })
  )
);
