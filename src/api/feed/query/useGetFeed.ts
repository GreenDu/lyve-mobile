import { GetFeedResponse } from '@api/responses';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = { id: string };

export const useGetFeed = createQuery<GetFeedResponse, Variables, AxiosError>({
  queryKey: ['feed'],
  fetcher: (variables) => {
    return axiosClient.get(`api/user/${variables.id}/feed`).then((response) => response.data);
  },
});
