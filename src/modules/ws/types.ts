import { ChatMessage, GIF } from '@modules/chat/types';
import { RewardType } from '@modules/reward/types';
import {
  DtlsParameters,
  IceCandidate,
  IceParameters,
  RtpCapabilities,
  RtpParameters,
  MediaKind,
  AppData,
} from 'mediasoup-client/lib/types';
import { Socket } from 'socket.io-client';

import { RequireOnlyOne } from '../../types/types';

export interface Consumer {
  peerId: string;
  consumerParameters: {
    producerId: string;
    id: string;
    kind: MediaKind;
    rtpParameters: RtpParameters;
    type: any;
    producerPaused: boolean;
  };
}

export type StreamSendDirection = 'recv' | 'send';

export type TransportOptions = {
  id: string;
  iceParameters: IceParameters;
  iceCandidates: IceCandidate[];
  dtlsParameters: DtlsParameters;
};

export type SocketUser = {
  id: string;
  username: string;
  dispname: string;
  avatar_url: string | null;
};

export type SocketCallback<T> = (response?: SocketResponse<T>) => void;

export interface SocketResponse<T> {
  success: boolean;
  data: T | null;
  error: {
    name: string;
    code: number;
    msg: string;
  }[];
}

export interface ServerToClientEvents {
  'you-joined-as-streamer': (data: {
    streamId: string;
    routerRtpCapabilities: RtpCapabilities;
    recvTransportOptions: TransportOptions;
    sendTransportOptions: TransportOptions;
  }) => void;
  'you-joined-as-viewer': (data: {
    streamId: string;
    routerRtpCapabilities: RtpCapabilities;
    recvTransportOptions: TransportOptions;
  }) => void;
  'get-recv-tracks-res': (data: { consumerParametersArr: Consumer[] }) => void;
  'send-track-send-res': (data: { id: string; error: string }) => void;
  'send-track-recv-res': (data: { id: string; error: string }) => void;
  'connect-transport-send-res': (data: { error: string }) => void;
  'connect-transport-recv-res': (data: { error: string }) => void;
  'you-left-stream': () => void;
  'resume-consumers-done': (data: { error?: string }) => void;
  user_joined: (data: { user: SocketUser }) => void;
  user_leaved: (data: { user: SocketUser }) => void;
  viewer_count: (data: { viewerCount: number }) => void;
  stream_ended: (data: { ended_at: string; duration: number }) => void;
  new_msg: (data: ChatMessage) => void;
  resv_reward: (data: {
    msg: string;
    reward: {
      id: string;
      type: RewardType;
      points: number; // the promotion points one receives for receiving the reward
    };
    sender: SocketUser;
    receiver: SocketUser;
  }) => void;
}

export interface ClientToServerEvents {
  'connect-transport': (data: {
    transportId: string;
    dtlsParameters: DtlsParameters;
    direction: StreamSendDirection;
  }) => void;
  'send-track': (data: {
    transportId: string;
    direction: StreamSendDirection;
    paused: boolean;
    kind: MediaKind;
    rtpParameters: RtpParameters;
    rtpCapabilities: RtpCapabilities;
    appData: AppData;
  }) => void;
  'get-recv-tracks': (data: { rtpCapabilities: RtpCapabilities }) => void;
  'resume-consumers': () => void;
  join_stream: (data: { streamId: string }, callback: SocketCallback<null>) => void;
  leave_stream: () => void;
  send_msg: (data: RequireOnlyOne<{ msg?: string; gif?: GIF }, 'gif' | 'msg'>) => void;
  send_reward: (
    data: {
      msg: string;
      reward: {
        type: RewardType;
      };
    },
    callback: SocketCallback<null>
  ) => void;
}

export type MySocket = Socket<ServerToClientEvents, ClientToServerEvents>;
