import SearchHistoryItem from '@components/search/SearchHistoryItem';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { SizableText, ScrollView, YStack } from 'tamagui';

import { useSearchHistoryStore } from './stores/useSearchHistoryStore';

const SearchHistory: React.FC<{ onPress: (query: string) => void }> = ({ onPress }) => {
  const { history } = useSearchHistoryStore((s) => ({ history: s.history }));

  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await useSearchHistoryStore.getState().load();
    })();
    setShowMore(false);
  }, []);

  const handleRemove = async (id: string) => {
    await useSearchHistoryStore.getState().removeItem(id);
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  if (!history.length) {
    return null;
  }

  return (
    <YStack
      height={!showMore ? '20%' : '50%'}
      width="100%"
      alignItems="center"
      borderBottomColor="$primaryLight"
      borderBottomWidth={1}
      paddingBottom="$3">
      <ScrollView space="$2">
        {history.map((item) => (
          <SearchHistoryItem
            key={item.id}
            history={item}
            onPress={onPress}
            onRemove={handleRemove}
          />
        ))}
      </ScrollView>
      <Pressable onPress={handleShowMore}>
        <SizableText color="$textWashedOut">Show {showMore ? 'less' : 'more'}</SizableText>
      </Pressable>
    </YStack>
  );
};

export default SearchHistory;
