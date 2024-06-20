import { axiosClient } from '@api/axiosClient';
import { StartStreamResponse } from '@api/responses';
import StreamChatList from '@modules/chat/StreamChatList';
import RewardView from '@modules/reward/RewardView';
import StreamFooter from '@modules/stream/StreamFooter';
import StreamHeader from '@modules/stream/StreamHeader';
import { useCurrentStreamInfoStore } from '@modules/stream/stores/useCurrentStreamInfoStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { YStack, Button } from 'tamagui';

const StreamerView: React.FC<{ onLeave: () => void }> = ({ onLeave }) => {
  const { active } = useCurrentStreamInfoStore((state) => ({ active: state.active }));

  const startStream = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    await axiosClient
      .put<StartStreamResponse>(
        `/api/stream/${useCurrentStreamInfoStore.getState().id}/start`,
        {},
        {
          headers: { Authorization: 'Bearer ' + accessToken },
        }
      )
      .then((res) => res.data)
      .then((d) => {
        if (d.success) {
          useCurrentStreamInfoStore.setState({ active: true });
        }
      });
  };

  useEffect(() => {}, [active]);

  return (
    <YStack padding="$4" height="100%" justifyContent="space-between">
      <StreamHeader onLeave={onLeave} />
      <RewardView />
      {!active ? (
        <Button backgroundColor="$accentMain" width="$20" alignSelf="center" onPress={startStream}>
          Start Stream
        </Button>
      ) : (
        <YStack backgroundColor="$colorTransparent" height="50%">
          <StreamChatList />
          <StreamFooter />
        </YStack>
      )}
    </YStack>
  );
};

export default StreamerView;
