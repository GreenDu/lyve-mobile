import { CreateStreamResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = {
  data: FormData;
};

export const useCreateStream = createMutation<CreateStreamResponse, Variables, AxiosError>({
  mutationFn: async (variables) =>
    axiosClient
      .post('/api/stream/create', variables.data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('accessToken')),
        },
      })
      .then((response) => response.data),
});
