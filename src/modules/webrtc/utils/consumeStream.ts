import { Consumer, MySocket } from '@modules/ws/types';
import Toast from 'react-native-toast-message';
import { useConsumerStore } from '../stores/useConsumerStore';
import { useStreamStore } from '../stores/useStreamStore';

const consumeStream = async (
  socket: MySocket,
  params: Consumer['consumerParameters'],
  peerId: string
) => {
  const { recvTransport } = useStreamStore.getState();
  if (!recvTransport) {
    console.log('skipping consumeAudio because recvTransport is null');
    return false;
  }

  console.log('consumeStream params: ', params);
  const consumer = await recvTransport.consume({
    ...params,
    appData: {
      peerId,
      producerId: params.producerId,
      mediaTag: 'cam-audio',
    },
  });

  recvTransport.on('connectionstatechange', (state) => {
    socket.on('resume-consumers-done', () => {
      consumer.resume();
      console.log('resumed consumers');
    });
    // the server-side consumer will be started in paused state. wait
    // until we're connected, then send a resume request to the server
    // to get our first keyframe and start displaying video
    if (state === 'connected') {
      socket.emit('resume-consumers');
    }

    if (state === 'failed' || state === 'disconnected' || state === 'closed') {
    }
  });

  useConsumerStore.getState().add(consumer);

  return true;
};

export default consumeStream;
