import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { HistoryItem } from '@modules/search/types';
import { SizableText, XStack } from 'tamagui';
import { Feather } from '@expo/vector-icons';

const SearchHistoryItem: React.FC<{ history: HistoryItem; onRemove: (id: string) => void }> = ({
  history,
  onRemove,
}) => {
  return (
    <XStack flex={1} justifyContent="space-between" alignItems="center">
      <XStack>
        <Feather name="clock" size={20} color="#5E5E60" />
        <SizableText>{history.name}</SizableText>
        <Pressable onPress={() => onRemove(history.id)}>
          <Feather name="x" size={20} color="#5E5E60" />
        </Pressable>
      </XStack>
    </XStack>
  );
};

export default SearchHistoryItem;
