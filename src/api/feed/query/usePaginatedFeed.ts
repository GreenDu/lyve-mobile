import { GetFeedResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  InfiniteQueryObserverResult,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { axiosClient } from '../../axiosClient';

type Variables = { id: string; limit: string };
export const usePaginatedFeed = (
  variables: Variables,
  opts?: UseInfiniteQueryOptions<GetFeedResponse>
): InfiniteQueryObserverResult<GetFeedResponse, Error> => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token);
    };

    fetchAccessToken();
  }, []);

  return useInfiniteQuery<GetFeedResponse, Error, GetFeedResponse>({
    ...opts,
    queryKey: ['feed', variables.id, variables.limit],
    queryFn: async ({ pageParam = '' }) => {
      if (!accessToken) {
        throw new Error('Access token is not available');
      }
      return axiosClient
        .get<GetFeedResponse>(`api/user/${variables.id}/feed`, {
          params: {
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
