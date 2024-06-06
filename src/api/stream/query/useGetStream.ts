import { GetStreamInfoResponse } from '@api/responses';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = { id: string };

export const useGetStream = createQuery<GetStreamInfoResponse, Variables, AxiosError>({
  queryKey: ['stream'],
  fetcher: (variables) => {
    return axiosClient.get(`api/stream/${variables.id}`).then((response) => response.data);
  },
});
