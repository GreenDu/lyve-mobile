import { TypedResponse } from '../types/response';
import { Days } from '../types/types';

export type AchievementType = 'NTH_STREAM' | 'MINUTES_STREAMED' | 'NTH_VIEWERS';

export type NotificationType =
  | 'STREAM_STARTED'
  | 'REWARD_RECEIVED'
  | 'ACHIEVEMENT_RECEIVED'
  | 'NEW_FOLLOWER';

export type User = {
  id: string;
  username: string;
  dispname: string;
  email: string;
  avatar_url: string | null;
  bio: string;
  created_at: Date;
  updatedAt: Date;
  followerCount: number;
  followingCount: number;
  numStreams: number;
  num10minStreams: number;
  minStreamed: number;
  level: number;
  promotionPoints: number;
  coins: number;
};

export type Streamer = Pick<
  User,
  'id' | 'username' | 'dispname' | 'avatar_url' | 'followerCount' | 'promotionPoints' | 'level'
>;

export type Stream = {
  id: string;
  serverId: string | null;
  active: boolean;
  streamerId: string;
  viewerCount: number;
  previewImgUrl: string;
  created_at: Date;
  ended_at: Date | null;
  duration: number;
  genre: string;
  mostViewers: number;
};

export type Achievement = {
  id: string;
  type: AchievementType;
  name: string;
  level: number;
  condition: number;
  promotionPoints: number;
};

export type UserToAchievement = {
  progress: number;
  created_at: Date;
  updated_at: Date;
  achievemnt: Achievement;
};

export type Follows = {
  followedById: string;
  followingId: string;
  created_at: Date;
};

export type Notification = {
  id: string;
  type: NotificationType;
  streamId: string | null;
  achievemntId: string | null;
  rewardId: string | null;
  userWhoFiredEvent: string | null;
  message: string;
  recipientId: string;
  created_at: Date;
  updated_at: Date;
};

export type Genre = {
  name: string;
  percent: number;
  days: Days[];
  avgViewers: number;
}

export type GetUserResponse = TypedResponse<{
  user: User & {
    subscribed: boolean;
    userToAchievement: UserToAchievement[];
    streams: Stream[];
  };
}>;

export type CreateUserResponse = TypedResponse<{
  user: Pick<User, 'id' | 'username' | 'dispname' | 'avatar_url' | 'email' | 'level'>;
}>;

export type FollowUserResponse = TypedResponse<{
  follow: Follows;
}>;

export type UnFollowUserResponse = TypedResponse<{
  follow: Follows;
}>;

export type GetUserFollowingResponse = TypedResponse<{
  user: Pick<User, 'id' | 'username' | 'followingCount'> & {
    following: {
      created_at: Date;
      user: Pick<User, 'id' | 'username' | 'avatar_url' | 'dispname'>;
    }[];
  };
}>;

export type GetUserFollowedByResponse = TypedResponse<{
  user: Pick<User, 'id' | 'username' | 'followerCount'> & {
    followedBy: {
      subscribed: boolean;
      created_at: Date;
      user: Pick<User, 'id' | 'username' | 'dispname' | 'avatar_url'>;
    }[];
  };
}>;

export type GetFeedResponse = TypedResponse<{
  feed: (Stream & {
    streamer: Streamer & {
      subscribed: boolean;
    };
  })[];
  nextCursor: string | null;
  hasNext: boolean;
}>;

export type GetMostStreamedGenresResponse = TypedResponse<{
  user: {
    numStreams: number;
    genres: {
      name: string;
      percent: number;
      days: Days[];
      avgViewers: number;
    }[];
  };
}>;

export type GetNotificationsResponse = TypedResponse<{
  notifications: Notification[];
}>;

export type UpdateUserResponse = TypedResponse<{
  user: User;
}>;

// stream responses

export type GetStreamInfoResponse = TypedResponse<{
  stream: Stream & {
    streamer: Streamer & {
      followed: boolean;
    };
  };
}>;

export type CreateStreamResponse = TypedResponse<{
  stream: Stream & {
    streamer: Streamer;
  };
}>;

export type DeleteStreamResponse = TypedResponse<{
  stream: Stream & {
    streamer: Streamer;
  };
}>;

export type StartStreamResponse = TypedResponse<{
  stream: Stream & {
    streamer: Streamer;
  };
}>;

export type SearchResponse = TypedResponse<{
  result: {
    users: (Pick<User, 'id' | 'username' | 'dispname' | 'avatar_url' | 'followerCount'> & {
      subscribed: boolean;
    })[];
  };
  nextCursor: string;
  hasNext: boolean;
}>;
