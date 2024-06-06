import { GetUserResponse } from '@api/responses';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = { id: string };

export const useGetUser = createQuery<GetUserResponse, Variables, AxiosError>({
  queryKey: ['users'],
  fetcher: (variables) => {
    return axiosClient.get(`api/user/${variables.id}`).then((response) => response.data);
  },
});
