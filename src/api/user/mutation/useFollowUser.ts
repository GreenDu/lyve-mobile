import { FollowUserResponse } from '@api/responses';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = {
  ownId: string;
  otherId: string;
};

export const useFollowUser = createMutation<FollowUserResponse, Variables, AxiosError>({
  mutationFn: async (variables) =>
    axiosClient({
      url: `api/user/follow`,
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
