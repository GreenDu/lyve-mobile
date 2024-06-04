import StreamerInfoBadge from '@components/stream/StreamerInfoBadge';
import ViewCounterBadge from '@components/ViewCounterBadge';
import { Feather } from '@expo/vector-icons';
import { SocketUser } from '@modules/ws/types';
import React from 'react';
import { Pressable } from 'react-native';
import { XStack } from 'tamagui';

interface StreamHeaderProps {
  streamer:
    | (SocketUser & {
        followerCount: number;
      })
    | null;
  viewerCount: number;
  onLeave: () => void;
}

const StreamHeader: React.FC<StreamHeaderProps> = ({ streamer, viewerCount, onLeave }) => {
  return (
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

      <Pressable onPress={onLeave}>
        <Feather size={28} name="x" color="#fff" />
      </Pressable>
    </XStack>
  );
};

export default StreamHeader;
