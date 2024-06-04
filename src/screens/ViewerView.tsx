import StreamHeader from '@modules/stream/StreamHeader';
import { useCurrentStreamInfoStore } from '@modules/stream/stores/useCurrentStreamInfoStore';
import React from 'react';
import { YStack } from 'tamagui';

const ViewerView: React.FC<{ onLeave: () => void }> = ({ onLeave }) => {
  const { streamer } = useCurrentStreamInfoStore((state) => ({ streamer: state.streamer }));
  const { viewerCount } = useCurrentStreamInfoStore((state) => ({
    viewerCount: state.viewerCount,
  }));
  return (
    <YStack padding="$4" height="100%" justifyContent="space-between">
      <StreamHeader streamer={streamer} viewerCount={viewerCount} onLeave={onLeave} />
    </YStack>
  );
};

export default ViewerView;
