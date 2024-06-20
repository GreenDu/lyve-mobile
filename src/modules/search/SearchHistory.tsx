import SearchHistoryItem from '@components/search/SearchHistoryItem';
import React, { useEffect, useState } from 'react';
import { ScrollView, Pressable } from 'react-native';
import { SizableText, YStack } from 'tamagui';

import { useSearchHistoryStore } from './stores/useSearchHistoryStore';

const SearchHistory = () => {
  const { history } = useSearchHistoryStore((s) => ({ history: s.history }));

  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await useSearchHistoryStore.getState().load();
    })();
  }, []);

  const handleRemove = async (id: string) => {
    await useSearchHistoryStore.getState().removeItem(id);
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  if (!history.length) {
    return null;
  }

  return (
    <YStack height={showMore ? '100%' : '20%'} width="100%" alignItems="center">
      <ScrollView>
        {history.map((item) => (
          <SearchHistoryItem history={item} onRemove={handleRemove} />
        ))}
      </ScrollView>
      <Pressable onPress={handleShowMore}>
        <SizableText color="$textWashedOut">Show more</SizableText>
      </Pressable>
    </YStack>
  );
};

export default SearchHistory;
