import { axiosClient } from '@api/axiosClient';
import { SearchResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  InfiniteData,
  QueryKey,
  UndefinedInitialDataInfiniteOptions,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useMemo } from 'react';

type Variables = { query: string; limit: string };

export const usePaginatedSearch = (
  variables: Variables,
  opts?: UndefinedInitialDataInfiniteOptions<
    SearchResponse,
    Error,
    InfiniteData<SearchResponse, string>,
    QueryKey,
    unknown
  >
): UseInfiniteQueryResult<InfiniteData<SearchResponse, unknown>, Error> => {
  const accessToken = useMemo(async () => {
    return await AsyncStorage.getItem('accessToken');
  }, []);

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
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => response.data);
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
  });
};
