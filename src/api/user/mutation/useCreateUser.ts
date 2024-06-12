import { CreateUserResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = {
  id: string;
  username: string;
  email: string;
};

export const useCreateUser = createMutation<CreateUserResponse, Variables, AxiosError>({
  mutationFn: async (variables) =>
    axiosClient({
      url: '/api/user/create',
      method: 'POST',
      data: variables,
      headers: { Authorization: 'Bearer ' + (await AsyncStorage.getItem('accessToken')) },
    }).then((response) => response.data),
});
