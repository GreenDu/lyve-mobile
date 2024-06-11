import { GetNotificationsResponse } from '@api/responses';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = { id: string };

export const useGetNotifications = createQuery<GetNotificationsResponse, Variables, AxiosError>({
  queryKey: ['notifications'],
  fetcher: (variables) => {
    return axiosClient
      .get(`api/user/${variables.id}/notifications`)
      .then((response) => response.data);
  },
});
