import { createContext } from 'react';

import { MySocket } from './types';

export const WebSocketContext = createContext<{
  socket: MySocket;
}>({
  socket: null as any,
});
