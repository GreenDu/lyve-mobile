import { GetMostStreamedGenresResponse } from '@api/responses';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = { id: string };

export const useGetUser = createQuery<GetMostStreamedGenresResponse, Variables, AxiosError>({
  queryKey: ['genre_stats'],
  fetcher: (variables) => {
    return axiosClient
      .get(`api/user/${variables.id}/statistics/most-streamed-genre`)
      .then((response) => response.data);
  },
});
