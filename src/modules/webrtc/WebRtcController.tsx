import { useCurrentStreamInfoStore } from '@modules/stream/stores/useCurrentStreamInfoStore';
import useSocket from '@modules/ws/useSocket';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import InCallManager from 'react-native-incall-manager';

import { useConsumerStore } from './stores/useConsumerStore';
import { useProducerStore } from './stores/useProducerStore';
import { useStreamStore } from './stores/useStreamStore';
import createTransport from './utils/createTransport';
import loadDevice from './utils/loadDevice';
import receiveStream from './utils/receiveStream';
import sendMedia from './utils/sendMedia';
import { useStreamChatStore } from '@modules/chat/stores/useStreamChatStore';

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

const inCallManagerStart = () => {
  InCallManager.start({ media: 'video' });
};

const WebRtcController = () => {
  const { socket } = useSocket();

  const { reset } = useCurrentStreamInfoStore.getState();
  const { close } = useProducerStore.getState();
  const { closeAll } = useConsumerStore.getState();
  const { clearChat } = useStreamChatStore.getState();

  //   useEffect(() => {
  //     if (!initialLoad.current) {
  //       sendMedia();
  //     }

  //     initialLoad.current = false;
  //   });

  useEffect(() => {
    if (socket) {
      socket.on('you-left-stream', () => {
        console.log('you-left-stream event recv');
        closeConnections(useCurrentStreamInfoStore.getState().id);
        reset(); // reset stream info store
        close(); // close producers
        closeAll(); // close all consumers
        clearChat();

        router.replace('/(auth)/(tabs)/');
        InCallManager.stop();
      });
      socket.on('you-joined-as-streamer', async (data) => {
        console.log('you-joined-as-streamer called');
        closeConnections(null);
        useStreamStore.getState().set({ streamId: data.streamId });

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

        // try {
        //   await createTransport(socket, 'recv', data.recvTransportOptions);
        // } catch (err) {
        //   console.log('error creating recv transport | ', err);
        //   return;
        // }
        // receiveStream(socket);

        inCallManagerStart();
      });

      socket.on('you-joined-as-viewer', async (data) => {
        closeConnections(null);
        useStreamStore.getState().set({ streamId: data.streamId });
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

        await receiveStream(socket);

        inCallManagerStart();
      });
    }

    // return () => {
    //   if (socket) {
    //     socket.off('you-joined-as-streamer');
    //     socket.off('you-joined-as-viewer');
    //   }
    // };
  }, [socket]);

  return <></>;
};

export default WebRtcController;
