import FollowButton from '@components/FollowButton';
import ViewCounterBadge from '@components/ViewCounterBadge';
import { FontAwesome6 } from '@expo/vector-icons';
import useCurrentStreamInfo from '@modules/stream/hooks/useCurrentStreamInfo';
import { useCurrentStreamInfoStore } from '@modules/stream/stores/useCurrentStreamInfoStore';
import React from 'react';
import { YStack, XStack, Avatar, SizableText } from 'tamagui';

import { formatNumber } from '../../utils/formatNumber';

const StreamerInfoBadge: React.FC = () => {
  const { id } = useCurrentStreamInfoStore((state) => ({ id: state.id }));

  const { streamer } = useCurrentStreamInfoStore((state) => ({ streamer: state.streamer }));

  const { viewerCount } = useCurrentStreamInfoStore((state) => ({
    viewerCount: state.viewerCount,
  }));

  const { isStreamer } = useCurrentStreamInfo(id);
  return (
    <XStack
      paddingHorizontal="$3"
      backgroundColor="#242526CC"
      borderRadius="$12"
      justifyContent="space-between"
      alignItems="center"
      gap="$4"
      width="$16"
      height="$5"
      flex={1}>
      <XStack flex={1} justifyContent="flex-start" alignItems="center">
        <Avatar circular size="$4">
          <Avatar.Image
            accessibilityLabel={streamer?.username}
            src={streamer?.avatar_url ?? 'https://placehold.co/200x200'}
          />
          <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
        </Avatar>
        <YStack marginLeft="$3" height="$4" justifyContent="center" width="$5">
          <SizableText size="$4" overflow="hidden" textOverflow="clip" whiteSpace="nowrap">
            {streamer?.username}
          </SizableText>
          <XStack justifyContent="flex-start" alignItems="center" gap="$2">
            <FontAwesome6 name="user-group" size={12} color="white" />
            <SizableText size="$4">{formatNumber(streamer?.followerCount ?? 0)}</SizableText>
          </XStack>
        </YStack>
      </XStack>

      <XStack justifyContent="space-between" alignItems="center" space="$2">
        {!isStreamer && (
          <FollowButton size="small" userId={id} subscribed={!!streamer?.subscribed} />
        )}

        <ViewCounterBadge count={viewerCount} size="normal" />
      </XStack>
    </XStack>
  );
};

export default StreamerInfoBadge;
