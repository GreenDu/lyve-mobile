import { GetFeedResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useMemo } from 'react';

import { axiosClient } from '../../axiosClient';
import { InfiniteQueryHookOptions } from 'react-query-kit';

type Variables = { id: string; limit: string };
export const usePaginatedFeed = (
  variables: Variables,
  opts?: InfiniteQueryHookOptions<
    GetFeedResponse,
    Error,
    InfiniteData<GetFeedResponse, unknown>,
    QueryKey,
    unknown
  >
): UseInfiniteQueryResult<InfiniteData<GetFeedResponse, unknown>, Error> => {
  return useInfiniteQuery<GetFeedResponse, Error>({
    ...opts,
    queryKey: ['feed', variables.id, variables.limit],
    queryFn: async ({ pageParam = '' }) => {
      return axiosClient
        .get<GetFeedResponse>(
          `api/user/${variables.id}/feed?limit=${variables.limit}&courser=${pageParam}`,
          {
            params: {
              curser: pageParam,
              limit: variables.limit,
            },
            headers: { Authorization: 'Bearer ' + (await AsyncStorage.getItem('accessToken')) },
          }
        )
        .then((response) => response.data);
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
  });
};
