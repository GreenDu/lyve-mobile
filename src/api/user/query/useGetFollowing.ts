import { GetUserFollowingResponse } from '@api/responses';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = { id: string };

export const useGetFollowing = createQuery<GetUserFollowingResponse, Variables, AxiosError>({
  queryKey: ['user_following'],
  fetcher: (variables) => {
    return axiosClient.get(`api/user/${variables.id}/following`).then((response) => response.data);
  },
});
