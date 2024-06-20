import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Button, XStack, Input } from 'tamagui';

interface SearchBarProps {
  query: string;
  setQuery: (v: string) => void;
  onSearch: () => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch }) => {
  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      borderRadius={50}
      backgroundColor="#24252677"
      // bg="red"
      flex={1}>
      <XStack flex={1}>
        <Input
          testID="search-input"
          value={query}
          onChangeText={(v) => setQuery(v)}
          borderColor="$colorTransparent"
          backgroundColor="$colorTransparent"
          placeholder="Search"
          placeholderTextColor="$textMain"
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
        onPress={onSearch}
        icon={<Feather name="search" size={21} color="white" />}
        circular
        backgroundColor="#24252600"
        marginRight="$2"
      />
    </XStack>
  );
};

export default SearchBar;
