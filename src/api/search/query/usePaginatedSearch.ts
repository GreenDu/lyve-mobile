import { axiosClient } from '@api/axiosClient';
import { SearchResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useMemo } from 'react';
import { InfiniteQueryHookOptions } from 'react-query-kit';

type Variables = { query: string; limit: string };

export const usePaginatedSearch = (
  variables: Variables,
  opts?: InfiniteQueryHookOptions<
    SearchResponse,
    Error,
    InfiniteData<SearchResponse, string>,
    QueryKey,
    unknown
  >
): UseInfiniteQueryResult<InfiniteData<SearchResponse, unknown>, Error> => {
  return useInfiniteQuery<SearchResponse, Error>({
    ...opts,
    queryKey: ['search', variables.query, variables.limit],
    queryFn: async ({ pageParam = '' }) => {
      return axiosClient
        .get<SearchResponse>(`api/search`, {
          params: {
            query: variables.query,
            curser: pageParam,
            limit: variables.limit,
          },
          headers: { Authorization: 'Bearer ' + (await AsyncStorage.getItem('accessToken')) },
        })
        .then((response) => response.data);
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
    enabled: variables.query.length > 0,
  });
};
