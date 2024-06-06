import { CreateStreamResponse } from '@api/responses';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = {
  streamerId: string;
  previewImgUrl: string;
  genre: string;
};

export const useCreateStream = createMutation<CreateStreamResponse, Variables, AxiosError>({
  mutationFn: async (variables) =>
    axiosClient({
      url: '/api/stream/create',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
