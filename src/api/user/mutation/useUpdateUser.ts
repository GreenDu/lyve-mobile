import { UpdateUserResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = {
  id: string;
  body: {
    dispname?: string;
    avatar_url?: string;
    bio?: string;
  };
};

export const useUpdateUser = createMutation<UpdateUserResponse, Variables, AxiosError>({
  mutationFn: async (variables) =>
    axiosClient({
      url: `api/user/${variables.id}/update`,
      method: 'PUT',
      data: variables.body,
      headers: { Authorization: 'Bearer ' + (await AsyncStorage.getItem('accessToken')) },
    }).then((response) => response.data),
});
