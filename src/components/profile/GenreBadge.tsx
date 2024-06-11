import React from 'react';
import { XStack, YStack, H2, Avatar, Separator, SizableText } from 'tamagui';

interface Props {
  genre?: string | undefined;
  percent?: number | undefined;
}

const ProfileHeader: React.FC<Props> = ({ genre = "NaN", percent = 0 }) => {
  return (
    <YStack gap="$2" alignItems='center' backgroundColor="$primaryLight"  height="$12" width="$10" borderRadius={30}>
        <YStack justifyContent='center' alignItems='center' mt="$3" height="$5" width="$5" backgroundColor="#151718" borderRadius={90}>
            <SizableText fontSize={28}>
            🎮
            </SizableText>
        </YStack>
        <SizableText>
            Gaming
        </SizableText>

        <SizableText>
            53%
        </SizableText>


    </YStack>
  );
};

export default ProfileHeader;
