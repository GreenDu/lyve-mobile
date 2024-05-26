import { MySocket } from '@modules/ws/types';

import consumeAudio from './consumeAudio';
import { useStreamStore } from '../stores/useStreamStore';

const receiveStream = async (socket: MySocket, flushQueue: () => void) => {
  socket.once('get-recv-tracks-res', async ({ consumerParametersArr }) => {
    try {
      for (const { peerId, consumerParameters } of consumerParametersArr) {
        if (!(await consumeAudio(consumerParameters, peerId))) {
          break;
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      flushQueue();
    }
  });
  socket.emit('get-recv-tracks', {
    rtpCapabilities: useStreamStore.getState().device!.rtpCapabilities,
  });
};

export default receiveStream;
