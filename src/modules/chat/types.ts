import { SocketUser } from '@modules/ws/types';

export type Message = {
  id: string;
  msg: string;
  sender: SocketUser;
  created_at: string;
};
