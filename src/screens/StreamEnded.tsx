import { useGetStream } from '@api/stream/query/useGetStream';
import ViewCounterBadge from '@components/ViewCounterBadge';
import useAuth from '@modules/auth/useAuth';
import { useCurrentStreamInfoStore } from '@modules/stream/stores/useCurrentStreamInfoStore';
import React from 'react';
import { Button, H1, H2, H3, H4, SizableText, YStack } from 'tamagui';

const StreamEnded: React.FC<{ onLeave: () => void }> = ({ onLeave }) => {
  const { user } = useAuth();
  const { id, streamer } = useCurrentStreamInfoStore.getState();
  const { viewerCount } = useCurrentStreamInfoStore((s) => ({ viewerCount: s.viewerCount }));

  const { data } = useGetStream({ variables: { id } });

  return (
    <YStack
      fullscreen
      backgroundColor="#242526cc"
      justifyContent="center"
      alignItems="center"
      padding="$4">
      <YStack height="80%" justifyContent="space-between" alignItems="center">
        <YStack justifyContent="center" marginTop="$20" alignItems="center">
          <H2 marginBottom="$1">The stream has ended.</H2>
          <H4 textAlign="center" marginBottom="$10">
            Thank you for watching, {user.dispname}!
          </H4>

          <SizableText>
            Duration of the stream: {(data?.data?.stream.duration || 0) / 60} minutes
          </SizableText>
          <SizableText>There are still {viewerCount} people here!</SizableText>
        </YStack>
        <Button width="$19" backgroundColor="$accentDark" onPress={onLeave}>
          Leave Stream
        </Button>
      </YStack>
    </YStack>
  );
};

export default StreamEnded;
