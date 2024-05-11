import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { TypedResponse } from '../../types/response';
import { axiosClient } from '../axiosClient';

type Variables = {
  id: string;
  username: string;
  email: string;
};

export const useCreateUser = createMutation<
  TypedResponse<{
    user: {
      id: string;
      username: string;
      email: string;
      created_at: string;
    };
  }>,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) =>
    axiosClient({
      url: '/api/user/create',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
