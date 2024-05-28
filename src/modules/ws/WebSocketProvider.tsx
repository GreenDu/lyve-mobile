import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useMemo, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { WebSocketContext } from './WebSocketContext';
import { MySocket } from './types';
import useAuth from '../auth/useAuth';

const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>(null as any);
  const { session } = useAuth();

  useEffect(() => {
    if (socket && socket.connected) {
      return;
    }
    if (!socket && session) {
      // eslint-disable-next-line no-unused-expressions
      const connect = async () => {
        const token = await AsyncStorage.getItem('accessToken');
        const s: MySocket = io(process.env.EXPO_PUBLIC_API_URL as string, {
          path: '/socket/',
          transports: ['websocket'],
          auth: {
            token,
          },
        });
        setSocket(s);
      };

      connect();
    }
  }, [socket]);

  return (
    <WebSocketContext.Provider value={useMemo(() => ({ socket }), [socket])}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
