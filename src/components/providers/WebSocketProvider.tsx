import React, { useEffect, useMemo, useState } from 'react';
import { WebSocketContext } from '../../context/WebSocketContext';
import { Socket, io } from 'socket.io-client';
import useAuth from '../../hooks/useAuth';

const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>(null as any);
  const { session } = useAuth();

  useEffect(() => {
    if (!socket && session) {
      const s = io(process.env.EXPO_PUBLIC_API_URL as string, {
        path: '/socket/',
        transports: ['websocket'],
      });
      setSocket(s);
    }
  }, [socket, session]);

  return (
    <WebSocketContext.Provider value={useMemo(() => ({ socket }), [socket])}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
