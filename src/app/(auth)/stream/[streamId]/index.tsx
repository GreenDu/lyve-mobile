import useSocket from '@modules/ws/useSocket';
import StreamPage from '@screens/StreamPage';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef } from 'react';

const Stream = () => {
  const { streamId } = useLocalSearchParams();

  const firstLoad = useRef(true);

  const { socket } = useSocket();

  useEffect(() => {
    if (socket && !firstLoad.current) {
      console.log('send join stream');
      socket.emit('join_stream', { streamId: streamId as string }, (data) => {
        console.log(`Send join stream success: ${data?.success}`);
      });
    }

    firstLoad.current = false;
  }, [socket]);

  return <StreamPage id={streamId as string} />;
};

export default Stream;
