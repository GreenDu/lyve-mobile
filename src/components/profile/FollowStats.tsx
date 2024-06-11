import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { formatNumber } from '@utils/formatNumber';
import { XStack, YStack, H2, Separator } from 'tamagui';
import { router } from 'expo-router';

const FollowStats: React.FC<{ userId: string; followerCount: number; followingCount: number }> = ({
  userId,
  followerCount,
  followingCount,
}) => {
  return (
    <XStack flex={1} paddingHorizontal="$8" height="$5" justifyContent="space-evenly">
      <Pressable
        onPress={() => {
          router.push(`/profile/${userId}/followers`);
        }}>
        <YStack>
          <H2 fontSize={16} fontWeight="500">
            {formatNumber(followerCount)}
          </H2>
          <H2 fontSize={16} fontWeight="400" mt="$-3.5" opacity={0.5}>
            Followers
          </H2>
        </YStack>
      </Pressable>
      <Separator
        alignSelf="stretch"
        vertical
        borderWidth="$0.25"
        borderColor="$textMain"
        opacity={0.5}
      />
      <YStack>
        <Pressable
          onPress={() => {
            router.push(`/profile/${userId}/following`);
          }}>
          <H2 fontSize={16} fontWeight="500">
            {formatNumber(followingCount)}
          </H2>
          <H2 fontSize={16} fontWeight="400" mt="$-3.5" opacity={0.5}>
            Following
          </H2>
        </Pressable>
      </YStack>
    </XStack>
  );
};

export default FollowStats;
