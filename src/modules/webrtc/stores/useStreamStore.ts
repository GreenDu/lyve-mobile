import { Device } from 'mediasoup-client';
import { detectDevice, Transport } from 'mediasoup-client/lib/types';
import { MediaStream } from 'react-native-webrtc';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const getDevice = async () => {
  try {
    let handlerName = detectDevice();
    if (!handlerName) {
      console.warn('mediasoup does not recognize this device, going to to default: Chrome74');
      handlerName = 'Chrome74';
    }

    console.log('Detected device: ' + handlerName);
    return new Device({ handlerName });
  } catch {
    return null;
  }
};

export const useStreamStore = create(
  combine(
    {
      streamId: '',
      stream: null as MediaStream | null,
      streamAudioTracks: null as MediaStreamTrack | null,
      streamVideoTracks: null as MediaStreamTrack | null,
      recvTransport: null as Transport | null,
      sendTransport: null as Transport | null,
      device: null as unknown as Device,
    },
    (set) => ({
      prepare: async () => {
        const d = await getDevice();
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
          streamVideoTracks: null,
          streamAudioTracks: null,
          recvTransport: null,
          sendTransport: null,
        }),
      set,
    })
  )
);
