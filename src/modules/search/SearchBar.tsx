import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Button, XStack, Input } from 'tamagui';
import { useSearchQueryStore } from './stores/useSearchQueryStore';
import { Keyboard, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { query } = useSearchQueryStore((s) => ({ query: s.query }));
  const { setQuery } = useSearchQueryStore.getState();

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Enter') {
      Keyboard.dismiss();
      if (query.length) {
        onSearch(query);
      }
    }
  };

  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      borderRadius={50}
      backgroundColor="#24252677"
      flex={1}>
      <XStack flex={1}>
        <Input
          value={query}
          onChangeText={(e) => setQuery(e)}
          onKeyPress={handleKeyPress}
          testID="search-input"
          borderColor="$colorTransparent"
          backgroundColor="$colorTransparent"
          placeholder="Search"
          placeholderTextColor="$textWashedOut"
          overflow="hidden"
          textOverflow="hidden"
          size="$5"
          flex={1}
          borderRadius={50}
          showSoftInputOnFocus
          pressStyle={{
            backgroundColor: '$colorTransparent',
            borderColor: '$colorTransparent',
          }}
          focusStyle={{
            backgroundColor: '$colorTransparent',
            borderColor: '$colorTransparent',
          }}
        />
      </XStack>
      <Button
        testID="send-button"
        onPress={() => {
          if (query.length) {
            onSearch(query);
          }
        }}
        icon={<Feather name="search" size={21} color="white" />}
        circular
        backgroundColor="#24252600"
        marginRight="$2"
      />
    </XStack>
  );
};

export default SearchBar;
