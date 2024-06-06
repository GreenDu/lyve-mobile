import StreamChatList from '@modules/chat/StreamChatList';
import StreamFooter from '@modules/stream/StreamFooter';
import StreamHeader from '@modules/stream/StreamHeader';
import { useCurrentStreamInfoStore } from '@modules/stream/stores/useCurrentStreamInfoStore';
import React from 'react';
import { YStack } from 'tamagui';

const ViewerView: React.FC<{ onLeave: () => void }> = ({ onLeave }) => {
  const { streamer } = useCurrentStreamInfoStore((state) => ({ streamer: state.streamer }));
  const { active } = useCurrentStreamInfoStore((state) => ({ active: state.active }));
  const { viewerCount } = useCurrentStreamInfoStore((state) => ({
    viewerCount: state.viewerCount,
  }));
  return (
    <YStack padding="$4" height="100%" justifyContent="space-between">
      <StreamHeader streamer={streamer} viewerCount={viewerCount} onLeave={onLeave} />

      {active && (
        <YStack backgroundColor="$colorTransparent" height="60%" space="$7">
          <StreamChatList />
          <StreamFooter />
        </YStack>
      )}
    </YStack>
  );
};

export default ViewerView;
