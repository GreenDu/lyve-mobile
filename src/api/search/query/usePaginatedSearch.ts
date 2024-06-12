import { axiosClient } from '@api/axiosClient';
import { SearchResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseInfiniteQueryOptions, UseQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo } from 'react';
import { createInfiniteQuery } from 'react-query-kit';

type Variables = { query: string; limit: string };

export const usePaginatedSearch = (
  variables: Variables,
  opts?: UseInfiniteQueryOptions<SearchResponse>
) => {
  const accessToken = useMemo(async () => {
    return await AsyncStorage.getItem('accessToken');
  }, []);

  return useInfiniteQuery<SearchResponse, Error, SearchResponse>({
    ...opts,
    queryKey: ['search'],
    queryFn: async ({ pageParam }) => {
      return axiosClient
        .get(`api/search`, {
          params: {
            query: variables.query,
            courser: pageParam,
            limit: variables.limit,
          },
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => response.data);
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.data?.nextCursor,
  });
};
