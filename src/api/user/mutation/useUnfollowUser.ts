import { UnFollowUserResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = {
  ownId: string;
  otherId: string;
};

export const useUnfollowUser = createMutation<UnFollowUserResponse, Variables, AxiosError>({
  mutationFn: async (variables) =>
    axiosClient({
      url: `api/user/unfollow`,
      method: 'POST',
      data: variables,
      headers: { Authorization: 'Bearer ' + (await AsyncStorage.getItem('accessToken')) },
    }).then((response) => response.data),
});
