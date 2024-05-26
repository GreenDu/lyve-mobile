import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { TypedResponse } from '../../types/response';
import { axiosClient } from '../axiosClient';

type Variables = { id: string };

export const useGetStream = createQuery<
  TypedResponse<{
    stream: {
      id: string;
      serverId: string | null;
      active: boolean;
      viewerCount: number;
      previewImgUrl: string;
      created_at: Date;
      genre: string;
      streamer: {
        id: string;
        username: string;
        avatar_url: string | null;
        followerCount: number;
        level: number;
        promotionPoints: number;
      };
    };
  }>,
  Variables,
  AxiosError
>({
  queryKey: ['streams'],
  fetcher: (variables) => {
    return axiosClient.get(`api/stream/${variables.id}`).then((response) => response.data);
  },
});
