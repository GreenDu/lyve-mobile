// Lookup table for genres
const genreLookup: { [key: string]: string } = {
  "Chatting 💬": '💬',
  "Beauty 💄": '💄',
  "Gaming 🎮": '🎮',
  "Nature 🌳": '🌳',
  "Sport 🏈": '🏈',
  "Art 🎨": '🎨',
  "IRL 😄": '😄',
  "Football ⚽️": '⚽️',
  "Cooking 🍜": '🍜',
  "Music 🎶": '🎶',
  "Podcast 🎙️": '🎙️',
  "Education 👨‍🏫": '👨‍🏫',
  "Camping  ⛺️": '⛺️',
};

import React from 'react';
import { YStack, SizableText } from 'tamagui';

interface Props {
  genre?: string;
  percent?: number;
}

const ProfileHeader: React.FC<Props> = ({ genre = "Camping  ⛺️", percent = 0 }) => {
  const genreIcon = genreLookup[genre] || '❓';

  return (
    <YStack padding="$2" gap="$1" alignItems='center' backgroundColor="$primaryLight" height="$10" width="$8" borderRadius={15}>
        <YStack justifyContent='center' alignItems='center' height="$4" width="$4" backgroundColor="#151718" borderRadius={15}>
            <SizableText fontSize={20}>
              {genreIcon}
            </SizableText>
        </YStack>
        <YStack alignItems='center'>
        <SizableText fontSize={13}>
            {genre.split(" ")[0]}
        </SizableText>
        <SizableText fontSize={13}>
            {percent}%
        </SizableText>
        </YStack>
    </YStack>
  );
};

export default ProfileHeader;
