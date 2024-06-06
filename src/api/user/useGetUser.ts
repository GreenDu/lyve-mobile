import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { TypedResponse } from '../../types/response';
import { axiosClient } from '../axiosClient';

type Variables = { id: string };

export const useGetUser = createQuery<
  TypedResponse<{
    user: {
      id: string;
      username: string;
      dispname: string;
      avatar_url: string | null;
      bio: string;
      followerCount: number;
      followingCount: number;
      level: number;
      promotionPoints: number;
      coins: number;
    };
  }>,
  Variables,
  AxiosError
>({
  queryKey: ['users'],
  fetcher: (variables) => {
    return axiosClient.get(`api/user/${variables.id}`).then((response) => response.data);
  },
});
