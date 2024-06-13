import { UpdateUserResponse } from '@api/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { axiosClient } from '../../axiosClient';

type Variables = {
  id: string;
  data: FormData;
};

export const useUpdateUser = createMutation<UpdateUserResponse, Variables, AxiosError>({
  mutationFn: async (variables) =>
    axiosClient
      .put(`api/user/${variables.id}/update`, variables.data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('accessToken')),
        },
      })
      .then((response) => response.data),
});
