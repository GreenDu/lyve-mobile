import React from 'react';
import { XStack, YStack, H2, Avatar, Separator, SizableText } from 'tamagui';

interface Props {
  genre?: string | undefined;
  percent?: number | undefined;
}

const ProfileHeader: React.FC<Props> = ({ genre = "NaN", percent = 0 }) => {
  return (
    <YStack alignItems='center' backgroundColor="$primaryLight"  height="$12" width="$10" borderRadius={30}>
        <YStack mt="$3" height="$5" width="$5" backgroundColor="#151718" borderRadius={90}></YStack>
        <SizableText>
            fhrb
        </SizableText>

        <SizableText>
            fhrb
        </SizableText>


    </YStack>
  );
};

export default ProfileHeader;
