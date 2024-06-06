import { GetUserFollowedByResponse } from '@api/responses';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = { id: string };

export const useGetFollowedBy = createQuery<GetUserFollowedByResponse, Variables, AxiosError>({
  queryKey: ['user_followedBy'],
  fetcher: (variables) => {
    return axiosClient.get(`api/user/${variables.id}/followedBy`).then((response) => response.data);
  },
});
