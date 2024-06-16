import useSocket from '@modules/ws/useSocket';
import StreamPage from '@screens/StreamPage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import Toast from 'react-native-toast-message';

const Stream = () => {
  const { streamId } = useLocalSearchParams();

  const firstLoad = useRef(true);

  const { socket } = useSocket();

  useEffect(() => {
    if (socket && !firstLoad.current) {
      console.log('send join stream');
      socket.emit('join_stream', { streamId: streamId as string }, (data) => {
        console.log(`Send join stream success: ${data?.success}`);

        if (data && !data.success) {
          Toast.show({
            type: 'error',
            text1: data.error[0]!.name,
            text2: data.error[0]!.msg,
          });

          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace('/(auth)/(tabs)/');
          }
        }
      });
    }

    firstLoad.current = false;
  }, [socket]);

  return <StreamPage id={streamId as string} />;
};

export default Stream;
