import { SocketUser } from '@modules/ws/types';

export type Message = ChatMessage | EventInfoMessage;

export type EventInfoMessage = {
  id: string;
  type: 'joined' | 'leaved';
  msg: string;
  created_at: string;
};

export type ChatMessage = {
  id: string;
  msg?: string;
  gif?: GIF;
  sender: SocketUser;
  created_at: string;
};

export type GIF = {
  height: string;
  width: string;
  url: string;
};
