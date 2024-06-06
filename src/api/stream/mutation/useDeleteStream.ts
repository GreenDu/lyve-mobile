import { DeleteStreamResponse } from '@api/responses';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = {
  id: string;
};

export const useDeleteStream = createMutation<DeleteStreamResponse, Variables, AxiosError>({
  mutationFn: async (variables) =>
    axiosClient({
      url: `/api/stream/${variables.id}/delete`,
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
