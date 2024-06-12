import { GetUserFollowedByResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = { id: string };

export const useGetFollowedBy = createQuery<GetUserFollowedByResponse, Variables, AxiosError>({
  queryKey: ['user_followedBy'],
  fetcher: async (variables) => {
    return axiosClient
      .get(`api/user/${variables.id}/followedBy`, {
        headers: { Authorization: 'Bearer ' + (await AsyncStorage.getItem('accessToken')) },
      })
      .then((response) => response.data);
  },
});
