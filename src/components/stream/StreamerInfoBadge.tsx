import ViewCounterBadge from '@components/ViewCounterBadge';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { YStack, XStack, Avatar, SizableText, Button } from 'tamagui';

import { formatNumber } from '../../utils/formatNumber';

interface StreamerInfoBadgeProps {
  username: string;
  avatar_url: string;
  followerCount: number;
  viewerCount: number;
  isStreamer: boolean;
}

const StreamerInfoBadge: React.FC<StreamerInfoBadgeProps> = ({
  username,
  avatar_url,
  followerCount,
  viewerCount,
  isStreamer,
}) => {
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
          <Avatar.Image accessibilityLabel={username} src={avatar_url} />
          <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
        </Avatar>
        <YStack marginLeft="$3" height="$4" justifyContent="center" width="$5">
          <SizableText size="$4" overflow="hidden" textOverflow="clip" whiteSpace="nowrap">
            {username}
          </SizableText>
          <XStack justifyContent="flex-start" alignItems="center" gap="$2">
            <FontAwesome6 name="user-group" size={12} color="white" />
            <SizableText size="$4">{formatNumber(followerCount)}</SizableText>
          </XStack>
        </YStack>
      </XStack>

      <XStack justifyContent="space-between" alignItems="center" space="$2">
        {isStreamer && (
          <Button
            backgroundColor="$accentMain"
            paddingHorizontal="$4"
            height={26}
            borderRadius={25}>
            Follow
          </Button>
        )}

        <ViewCounterBadge count={viewerCount} size="normal" />
      </XStack>
    </XStack>
  );
};

export default StreamerInfoBadge;
