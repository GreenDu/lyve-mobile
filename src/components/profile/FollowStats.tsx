import { View, Text } from 'react-native';
import React from 'react';
import { formatNumber } from '@utils/formatNumber';
import { XStack, YStack, H2, Separator } from 'tamagui';

const FollowStats: React.FC<{ followerCount: number; followingCount: number }> = ({
  followerCount,
  followingCount,
}) => {
  return (
    <XStack flex={1} paddingHorizontal="$8" height="$5" justifyContent="space-evenly">
      <YStack>
        <H2 fontSize={16} fontWeight="500">
          {formatNumber(followerCount)}
        </H2>
        <H2 fontSize={16} fontWeight="400" mt="$-3.5" opacity={0.5}>
          Followers
        </H2>
      </YStack>
      <Separator
        alignSelf="stretch"
        vertical
        borderWidth="$0.25"
        borderColor="$textMain"
        opacity={0.5}
      />
      <YStack>
        <H2 fontSize={16} fontWeight="500">
          {formatNumber(followingCount)}
        </H2>
        <H2 fontSize={16} fontWeight="400" mt="$-3.5" opacity={0.5}>
          Following
        </H2>
      </YStack>
    </XStack>
  );
};

export default FollowStats;
