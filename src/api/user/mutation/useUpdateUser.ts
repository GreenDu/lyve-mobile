import { CreateUserResponse, UpdateUserResponse } from '@api/responses';
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
    }).then((response) => response.data),
});
