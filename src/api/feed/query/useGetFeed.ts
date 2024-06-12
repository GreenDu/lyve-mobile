import { GetFeedResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = { id: string };

export const useGetFeed = createQuery<GetFeedResponse, Variables, AxiosError>({
  queryKey: ['feed'],
  fetcher: async (variables) => {
    return axiosClient
      .get(`api/user/${variables.id}/feed`, {
        headers: { Authorization: 'Bearer ' + (await AsyncStorage.getItem('accessToken')) },
      })
      .then((response) => response.data);
  },
});
