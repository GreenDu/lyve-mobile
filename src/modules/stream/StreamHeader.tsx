import StreamerInfoBadge from '@components/stream/StreamerInfoBadge';
import { Feather } from '@expo/vector-icons';
import { SocketUser } from '@modules/ws/types';
import React from 'react';

import { Button, XStack } from 'tamagui';

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
    <XStack justifyContent="space-between" alignItems="center" space="$3">
      <StreamerInfoBadge
        username={streamer?.username ?? ''}
        avatar_url={
          streamer?.avatar_url ??
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSOLGUixXG8-JSCNGgzrdg0tIqAFL9VfHbJBYylyOtU28twsRS'
        }
        followerCount={streamer?.followerCount ?? 0}
        viewerCount={viewerCount}
        isStreamer
      />
      <Button
        onPress={onLeave}
        size="$4.5"
        backgroundColor="#242526CC"
        circular
        icon={<Feather size={24} name="x" color="#fff" />}
      />
    </XStack>
  );
};

export default StreamHeader;
