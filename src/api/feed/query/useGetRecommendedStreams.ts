import { GetRecommendedStreamsResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  fetcher: async () => {
    return axiosClient
      .get(`api/stream/recommended`, {
        headers: { Authorization: 'Bearer ' + (await AsyncStorage.getItem('accessToken')) },
      })
      .then((response) => response.data);
  },
});
