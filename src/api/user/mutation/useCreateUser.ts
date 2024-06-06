import { CreateUserResponse } from '@api/responses';
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
    }).then((response) => response.data),
});
