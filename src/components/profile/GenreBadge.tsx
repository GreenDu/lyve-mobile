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
    <YStack padding="$3" gap="$2" alignItems='center' backgroundColor="$primaryLight" height="$12" width="$10" borderRadius={15}>
        <YStack justifyContent='center' alignItems='center' height="$5" width="$5" backgroundColor="#151718" borderRadius={15}>
            <SizableText fontSize={20}>
              {genreIcon}
            </SizableText>
        </YStack>
        <SizableText>
            {genre.split(" ")[0]}
        </SizableText>
        <SizableText>
            {percent}%
        </SizableText>
    </YStack>
  );
};

export default ProfileHeader;
