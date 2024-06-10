import React from 'react';
import { XStack, YStack, H2, Avatar, Separator } from 'tamagui';

interface Props {
  genre?: string | undefined;
  percent?: number | undefined;
}

const ProfileHeader: React.FC<Props> = ({ genre = "NaN", percent = 0 }) => {
  return (
    <YStack backgroundColor="$primaryLight"  height="$12" width="$10" borderRadius={30}></YStack>
  );
};

export default ProfileHeader;
