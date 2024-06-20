import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Button, XStack, Input } from 'tamagui';

interface SearchBarProps {
  onSearch: (query: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');
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
          value={query}
          onChangeText={(e) => setQuery(e)}
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
