import React from 'react';
import { XStack, YStack, H2, Avatar, Separator } from 'tamagui';

interface Props {
  followerCount?: number | undefined;
  followingCount?: number | undefined;
}

const UserStats: React.FC<Props> = ({ followerCount = 0, followingCount = 0 }) => {
  return (
    <XStack space="$7">
      <Avatar circular size="$7">
        <Avatar.Image
          accessibilityLabel="Nate Wienert"
          src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
        />
        <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
      </Avatar>
      <YStack>
        <H2 fontSize={16} fontWeight="300">
          {followerCount}
        </H2>
        <H2 fontSize={16} fontWeight="400">
          Followers
        </H2>
      </YStack>
      <Separator alignSelf="stretch" vertical borderWidth="$0.25" borderColor="white" />
      <YStack>
        <H2 fontSize={16} fontWeight="300">
          {followingCount}
        </H2>
        <H2 fontSize={16} fontWeight="400">
          Following
        </H2>
      </YStack>
    </XStack>
  );
};

export default UserStats;
