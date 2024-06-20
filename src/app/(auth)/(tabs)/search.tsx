import SearchPage from '@screens/SearchPage';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#151718' }}>
      <SearchPage />
    </SafeAreaView>
  );
};

export default Search;
