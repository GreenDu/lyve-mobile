import { CreateStreamResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = {
  previewImgUrl: string;
  genre: string;
};

export const useCreateStream = createMutation<CreateStreamResponse, Variables, AxiosError>({
  mutationFn: async (variables) =>
    axiosClient({
      url: '/api/stream/create',
      method: 'POST',
      data: variables,
      headers: { Authorization: 'Bearer ' + (await AsyncStorage.getItem('accessToken')) },
    }).then((response) => response.data),
});
