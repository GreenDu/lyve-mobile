import { GetRecommendedStreamsResponse } from '@api/responses';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = void;

export const useGetRecommendedStreams = createQuery<
  GetRecommendedStreamsResponse,
  Variables,
  AxiosError
>({
  queryKey: ['recommended-streams'],
  fetcher: () => {
    return axiosClient.get(`api/stream/recommended`).then((response) => response.data);
  },
});
