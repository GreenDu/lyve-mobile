import { SocketUser } from '@modules/ws/types';

export type RewardType =
  | 'popsicle'
  | 'pizza'
  | 'gift'
  | 'rocket'
  | 'star'
  | 'cake'
  | 'crown'
  | 'heart'
  | 'bouquet'
  | 'lucky_cat';

export type IncomingReward = {
  msg: string;
  reward: {
    id: string;
    type: RewardType;
    points: number; // the promotion points one receives for receiving the reward
  };
  sender: SocketUser;
  receiver: SocketUser;
};
