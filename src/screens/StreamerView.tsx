import { axiosClient } from '@api/axiosClient';
import StreamerInfoBadge from '@components/StreamerInfoBadge';
import ViewCounterBadge from '@components/ViewCounterBadge';
import { Feather } from '@expo/vector-icons';
import { useCurrentStreamInfoStore } from '@modules/stream/stores/useCurrentStreamInfoStore';
import useSocket from '@modules/ws/useSocket';
import React from 'react';
import { Pressable } from 'react-native';
import { XStack, YStack, Button } from 'tamagui';

const StreamerView = () => {
  const { socket } = useSocket();
  const { streamer } = useCurrentStreamInfoStore((state) => ({ streamer: state.streamer }));
  const { viewerCount } = useCurrentStreamInfoStore((state) => ({
    viewerCount: state.viewerCount,
  }));

  const leaveStream = () => {
    if (socket) {
      socket.emit('leave_stream');
    }
  };

  const startStream = async () => {
    await axiosClient
      .put(`/api/stream/${useCurrentStreamInfoStore.getState().id}/start`)
      .then(() => {
        useCurrentStreamInfoStore.setState({ active: true });
      });
  };

  return (
    <YStack padding="$4" height="100%" justifyContent="space-between">
      <XStack justifyContent="space-between" alignItems="flex-start">
        <StreamerInfoBadge
          username={streamer?.username || ''}
          avatar_url={
            streamer?.avatar_url ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSOLGUixXG8-JSCNGgzrdg0tIqAFL9VfHbJBYylyOtU28twsRS'
          }
          followerCount={streamer?.followerCount || 0}
          isStreamer
        />
        <ViewCounterBadge count={viewerCount} size="normal" />

        <Pressable onPress={leaveStream}>
          <Feather size={28} name="x" color="#fff" />
        </Pressable>
      </XStack>
      <Button backgroundColor="$accentMain" width="$20" alignSelf="center" onPress={startStream}>
        Start Stream
      </Button>
    </YStack>
  );
};

export default StreamerView;
