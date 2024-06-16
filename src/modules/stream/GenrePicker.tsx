import GenreBadge from '@components/genre/GenreBadge';
import React from 'react';
import { XStack } from 'tamagui';

interface GenrePickerProps {
  genres: {
    text: string;
    color: string;
    selected: boolean;
  }[];
  handlePress: (idx: number) => void;
}

const GenrePicker: React.FC<GenrePickerProps> = ({ genres, handlePress }) => {
  return (
    <XStack gap="$3" flexWrap="wrap" justifyContent="flex-start">
      {genres.map((g, idx) => {
        return (
          <GenreBadge
            size="medium"
            key={`genre:${idx}:${g.text}`}
            text={g.text}
            color={g.color}
            selected={g.selected}
            onPress={() => handlePress(idx)}
          />
        );
      })}
    </XStack>
  );
};

export default GenrePicker;
