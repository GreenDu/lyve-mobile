import { TypedResponse } from '../types/response';

type AchievementType = 'NTH_STREAM' | 'NTH_VIEWERS';

type User = {
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

type Streamer = Pick<
  User,
  'id' | 'username' | 'dispname' | 'avatar_url' | 'followerCount' | 'promotionPoints' | 'level'
>;

type Stream = {
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
};

type Achievement = {
  id: string;
  type: AchievementType;
  name: string;
  level: number;
  bannerUrl: string;
  condition: number;
  progress: number;
  promotionPoints: number;
};

type Follows = {
  followedById: string;
  followingId: string;
  created_at: Date;
};

export type GetUserResponse = TypedResponse<{
  user: User & {
    userToAchievement: {
      achievement: Achievement;
    }[];
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
    streamer: Pick<
      User,
      'id' | 'username' | 'dispname' | 'avatar_url' | 'promotionPoints' | 'level'
    >;
  })[];
}>;

export type GetMostStreamedGenresResponse = TypedResponse<{
  user: {
    numStreams: number;
    genres: {
      name: string;
      percent: number;
    }[];
  };
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

export type GetRecommendedStreamsResponse = TypedResponse<{
  streams: (Stream & {
    streamer: Streamer;
  })[];
}>;

export type DeleteStreamResponse = TypedResponse<{
  stream: Stream & {
    streamer: Streamer;
  };
}>;
