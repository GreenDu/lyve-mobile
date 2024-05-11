import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { TypedResponse } from '../../types/response';
import { axiosClient } from '../axiosClient';

type Variables = { id: string };

export const usePost = createQuery<
  TypedResponse<{
    user: {
      id: string;
      username: string;
      bio: string;
      avatar_url: string | null;
      followingCount: number;
      followerCount: number;
      level: number;
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
