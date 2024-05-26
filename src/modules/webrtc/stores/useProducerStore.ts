import { Producer } from 'mediasoup-client/lib/types';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useProducerStore = create(
  combine(
    {
      videoProducer: null as Producer | null,
      audioProducer: null as Producer | null,
    },
    (set) => ({
      addVideo: (p: Producer) =>
        set((s) => {
          if (s.videoProducer && !s.videoProducer.closed) {
            s.videoProducer.close();
          }
          return { videoProducer: p };
        }),
      addAudio: (p: Producer) =>
        set((s) => {
          if (s.audioProducer && !s.audioProducer.closed) {
            s.audioProducer.close();
          }
          return { audioProducer: p };
        }),
      close: () =>
        set((s) => {
          if (s.videoProducer && !s.videoProducer.closed) {
            s.videoProducer.close();
          }
          if (s.audioProducer && !s.audioProducer.closed) {
            s.audioProducer.close();
          }
          return {
            audioProducer: null,
            videoProducer: null,
          };
        }),
    })
  )
);
