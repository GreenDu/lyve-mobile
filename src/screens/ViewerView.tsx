import StreamChatList from '@modules/chat/StreamChatList';
import RewardView from '@modules/reward/RewardView';
import StreamFooter from '@modules/stream/StreamFooter';
import StreamHeader from '@modules/stream/StreamHeader';
import { useCurrentStreamInfoStore } from '@modules/stream/stores/useCurrentStreamInfoStore';
import React from 'react';
import { YStack } from 'tamagui';

const ViewerView: React.FC<{ onLeave: () => void }> = ({ onLeave }) => {
  const { active } = useCurrentStreamInfoStore((state) => ({ active: state.active }));

  return (
    <YStack padding="$4" height="100%" justifyContent="space-between">
      <StreamHeader onLeave={onLeave} />
      <RewardView />

      {active && (
        <YStack backgroundColor="$colorTransparent" height="50%">
          <StreamChatList />
          <StreamFooter />
        </YStack>
      )}
    </YStack>
  );
};

export default ViewerView;
