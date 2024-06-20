import { GetFeedResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  InfiniteData,
  QueryKey,
  UndefinedInitialDataInfiniteOptions,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useMemo } from 'react';

import { axiosClient } from '../../axiosClient';

type Variables = { id: string; limit: string };
export const usePaginatedFeed = (
  variables: Variables,
  opts?: UndefinedInitialDataInfiniteOptions<
    GetFeedResponse,
    Error,
    InfiniteData<GetFeedResponse, unknown>,
    QueryKey,
    unknown
  >
): UseInfiniteQueryResult<InfiniteData<GetFeedResponse, unknown>, Error> => {
  const accessToken = useMemo(async () => {
    return await AsyncStorage.getItem('accessToken');
  }, []);

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
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => response.data);
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
  });
};