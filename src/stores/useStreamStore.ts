import { Device } from 'mediasoup-client';
import { detectDevice, Transport } from 'mediasoup-client/lib/types';
import create from 'zustand';
import { combine } from 'zustand/middleware';

export const getDevice = async () => {
  try {
    let handlerName = detectDevice();
    if (!handlerName) {
      console.warn('mediasoup does not recognize this device, going to to default: Chrome74');
      handlerName = 'Chrome74';
    }
    return new Device({ handlerName });
  } catch {
    return null;
  }
};

export const useVoiceStore = create(
  combine(
    {
      streamId: '',
      stream: null as MediaStream | null,
      streamTracks: null as MediaStreamTrack | null,
      recvTransport: null as Transport | null,
      sendTransport: null as Transport | null,
      device: null as unknown as Device,
    },
    (set) => ({
      prepare: async () => {
        let d = await getDevice();
        if (d) {
          set({
            device: d,
          });
        }
      },
      nullify: () =>
        set({
          streamId: '',
          stream: null,
          streamTracks: null,
          recvTransport: null,
          sendTransport: null,
        }),
      set,
    })
  )
);
