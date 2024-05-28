import { MySocket, StreamSendDirection, TransportOptions } from '@modules/ws/types';

import { useStreamStore } from '../stores/useStreamStore';

const createTransport = async (
  socket: MySocket,
  direction: StreamSendDirection,
  transportOptions: TransportOptions
) => {
  const { device, set } = useStreamStore.getState();

  console.log('Create Transport');
  const transport =
    direction === 'recv'
      ? await device!.createRecvTransport(transportOptions)
      : await device!.createSendTransport(transportOptions);

  console.log('Transport on connect');
  transport.on('connect', ({ dtlsParameters }, callback, errback) => {
    socket.once(`connect-transport-${direction}-res`, (d) => {
      if (d.error) {
        console.log(`connect-transport ${direction} failed`, d.error);
        if (d.error.includes('already called')) {
          callback();
        } else {
          errback(new Error(`Error connect ${direction} transport`));
        }
      } else {
        console.log(`connect-transport ${direction} success`);
        callback();
      }
    });
    socket.emit('connect-transport', {
      transportId: transportOptions.id,
      dtlsParameters,
      direction,
    });
  });

  if (direction === 'send') {
    transport.on('produce', ({ kind, rtpParameters, appData }, callback, errback) => {
      console.log('transport produce event', appData.mediaTag);

      // tell the server what it needs to know from us in order to set
      // up a server-side producer object, and get back a
      // producer.id. call callback() on success or errback() on
      // failure.
      socket.on(`send-track-${direction}-res`, (data) => {
        if (data.error) {
          console.log(`send-track ${direction} failed`, data.error);
          errback(new Error(`Error ${direction} tack `));
        } else {
          console.log(`send-track-transport ${direction} success`);
          callback({ id: data.id });
        }
      });

      console.log('Sending send-track...');
      socket.emit('send-track', {
        transportId: transportOptions.id,
        direction,
        paused: false,
        kind,
        rtpParameters,
        rtpCapabilities: device!.rtpCapabilities,
        appData,
      });
    });
  }

  console.log(transport.connectionState);

  transport.on('connectionstatechange', (state) => {
    console.log(`${direction} transport ${transport.id} connectionstatechange ${state}`);

    if (state === 'closed' || state === 'failed' || state === 'disconnected') {
      // leave stream;
      console.log(`connectionstatechange state ${state}`);
    }
  });

  if (direction === 'recv') {
    set({ recvTransport: transport });
  } else {
    set({ sendTransport: transport });
  }
};

export default createTransport;
