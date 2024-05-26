import useSocket from '@modules/ws/useSocket';
import React, { useEffect, useRef } from 'react';

import { useStreamStore } from './stores/useStreamStore';
import createTransport from './utils/createTransport';
import loadDevice from './utils/loadDevice';
import sendMedia from './utils/sendMedia';
import receiveStream from './utils/receiveStream';
import consumeAudio from './utils/consumeAudio';

function closeConnections(id: string | null) {
  const { streamId, streamVideoTracks, streamAudioTracks, nullify } = useStreamStore.getState();
  if (id === null || id === streamId) {
    if (streamAudioTracks || streamVideoTracks) {
      streamAudioTracks?.stop();
      streamVideoTracks?.stop();
    }

    nullify();
  }
}

const WebRtcController = () => {
  const { socket } = useSocket();
  const initialLoad = useRef<boolean>(true);
  const consumerQueue = useRef<{ id: string; data: any }[]>([]);

  async function flushConsumerQueue(streamId: string) {
    try {
      for (const {
        id,
        data: { peerId, consumerParameters },
      } of consumerQueue.current) {
        if (streamId === id) {
          await consumeAudio(consumerParameters, peerId);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      consumerQueue.current = [];
    }
  }

  useEffect(() => {
    if (!initialLoad.current) {
      sendMedia();
    }

    initialLoad.current = false;
  });

  useEffect(() => {
    console.log('first');
    if (socket) {
      socket.on('you-joined-as-streamer', async (data) => {
        console.log('you-joined-as-streamer called');
        closeConnections(null);
        useStreamStore.getState().set({ streamId: data.streamId });

        consumerQueue.current = [];

        console.log('Trying to load device');
        // load device
        try {
          await loadDevice(data.routerRtpCapabilities);
        } catch (err) {
          console.error('Error creating a device ', err);
          return;
        }

        console.log('Trying to create send transport');
        // connect transport
        try {
          await createTransport(socket, 'send', data.sendTransportOptions);
        } catch (err) {
          console.error('Error creating a transport ', err);
          return;
        }

        console.log('Trying to send media');
        // send tracks
        try {
          await sendMedia();
        } catch (err) {
          console.error('Error sending media ', err);
        }

        // await createTransport(socket, 'recv', data.recvTransportOptions);
        // receiveStream(socket, () => flushConsumerQueue(data.streamId));
      });

      socket.on('you-joined-as-viewer', async (data) => {
        closeConnections(null);
        useStreamStore.getState().set({ streamId: data.streamId });

        consumerQueue.current = [];
        // load device
        try {
          await loadDevice(data.routerRtpCapabilities);
        } catch (err) {
          console.error('Error creating a device ', err);
          return;
        }

        // connect transport
        try {
          await createTransport(socket, 'recv', data.recvTransportOptions);
        } catch (err) {
          console.error('Error creating a transport ', err);
          return;
        }

        await createTransport(socket, 'recv', data.recvTransportOptions);
        receiveStream(socket, () => flushConsumerQueue(data.streamId));
      });
    }
    return () => {
      //   socket.off('you-joined-as-streamer');
      //   socket.off('you-joined-as-viewer');
    };
  }, [socket]);

  return <></>;
};

export default WebRtcController;
