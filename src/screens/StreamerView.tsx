import { axiosClient } from '@api/axiosClient';
import StreamChatList from '@modules/chat/StreamChatList';
import RewardView from '@modules/reward/RewardView';
import StreamFooter from '@modules/stream/StreamFooter';
import StreamHeader from '@modules/stream/StreamHeader';
import { useCurrentStreamInfoStore } from '@modules/stream/stores/useCurrentStreamInfoStore';
import React, { useEffect } from 'react';
import { YStack, Button } from 'tamagui';

const StreamerView: React.FC<{ onLeave: () => void }> = ({ onLeave }) => {
  const { streamer } = useCurrentStreamInfoStore((state) => ({ streamer: state.streamer }));
  const { active } = useCurrentStreamInfoStore((state) => ({ active: state.active }));
  const { viewerCount } = useCurrentStreamInfoStore((state) => ({
    viewerCount: state.viewerCount,
  }));

  const startStream = async () => {
    await axiosClient
      .put(`/api/stream/${useCurrentStreamInfoStore.getState().id}/start`)
      .then(() => {
        useCurrentStreamInfoStore.setState({ active: true });
      });

    console.log('startStream');
  };

  useEffect(() => {}, [active]);

  return (
    <YStack padding="$4" height="100%" justifyContent="space-between">
      <StreamHeader streamer={streamer} viewerCount={viewerCount} onLeave={onLeave} />
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
