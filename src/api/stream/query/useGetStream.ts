import { GetStreamInfoResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = { id: string };

export const useGetStream = createQuery<GetStreamInfoResponse, Variables, AxiosError>({
  queryKey: ['stream'],
  fetcher: async (variables) => {
    return axiosClient
      .get(`api/stream/${variables.id}`, {
        headers: { Authorization: 'Bearer ' + (await AsyncStorage.getItem('accessToken')) },
      })
      .then((response) => response.data);
  },
});
