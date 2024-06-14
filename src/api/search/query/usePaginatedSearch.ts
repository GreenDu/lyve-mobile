import { axiosClient } from '@api/axiosClient';
import { SearchResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  InfiniteQueryObserverResult,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';

type Variables = { query: string; limit: string };

export const usePaginatedSearch = (
  variables: Variables,
  opts?: UseInfiniteQueryOptions<SearchResponse>
): InfiniteQueryObserverResult<SearchResponse, Error> => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token);
    };

    fetchAccessToken();
  }, []);

  return useInfiniteQuery<SearchResponse, Error, SearchResponse>({
    ...opts,
    queryKey: ['search', variables.query, variables.limit],
    queryFn: async ({ pageParam = '' }) => {
      if (!accessToken) {
        throw new Error('Access token is not available');
      }
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
