import { MySocket } from '@modules/ws/types';

import consumeStream from './consumeStream';
import { useStreamStore } from '../stores/useStreamStore';

const receiveStream = async (socket: MySocket) => {
  socket.once('get-recv-tracks-res', async ({ consumerParametersArr }) => {
    console.log('consumerParametersArr', consumerParametersArr.length);

    console.log('send get-recv-tracks-res success');
    try {
      for (const { peerId, consumerParameters } of consumerParametersArr) {
        if (!(await consumeStream(consumerParameters, peerId))) {
          break;
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

  console.log('send get-recv-tracks');
  socket.emit('get-recv-tracks', {
    rtpCapabilities: useStreamStore.getState().device!.rtpCapabilities,
  });
};

export default receiveStream;
