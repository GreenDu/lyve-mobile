import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { HistoryItem } from '@modules/search/types';
import { SizableText, XStack } from 'tamagui';
import { Feather } from '@expo/vector-icons';

const SearchHistoryItem: React.FC<{
  history: HistoryItem;
  onPress: (query: string) => void;
  onRemove: (id: string) => void;
}> = ({ history, onPress, onRemove }) => {
  return (
    <XStack
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      testID="search-history-item">
      <Pressable onPress={() => onPress(history.name)}>
        <XStack space="$4">
          <Feather name="clock" size={20} color="#5E5E60" />
          <SizableText>{history.name}</SizableText>
        </XStack>
      </Pressable>
      <Pressable onPress={() => onRemove(history.id)}>
        <Feather testID="search-history-item-delete-button" name="x" size={20} color="#5E5E60" />
      </Pressable>
    </XStack>
  );
};

export default SearchHistoryItem;
