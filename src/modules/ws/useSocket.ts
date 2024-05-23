import { useContext } from 'react';

import { WebSocketContext } from './WebSocketContext';

const useSocket = () => {
  const socketContext = useContext(WebSocketContext);
  if (!socketContext) {
    throw new Error('useSocket must be used within an WebSocketProvider');
  }
  return socketContext;
};

export default useSocket;
