import { Consumer } from '@modules/ws/types';

import { useConsumerStore } from '../stores/useConsumerStore';
import { useStreamStore } from '../stores/useStreamStore';

const consumeStream = async (params: Consumer['consumerParameters'], peerId: string) => {
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

  useConsumerStore.getState().add(consumer);

  return true;
};

export default consumeStream;
