import SearchHistoryItem from '@components/search/SearchHistoryItem';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable } from 'react-native';
import { SizableText, ScrollView, YStack } from 'tamagui';

import { useSearchHistoryStore } from './stores/useSearchHistoryStore';

const SearchHistory: React.FC<{ onPress: (query: string) => void }> = ({ onPress }) => {
  const { history } = useSearchHistoryStore((s) => ({ history: s.history }));

  const heightAnim = useRef(new Animated.Value(0)).current;

  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await useSearchHistoryStore.getState().load();
    })();
    setShowMore(false);
  }, []);

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: showMore ? 400 : 170,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showMore]);

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
    <Animated.View
      style={{
        height: heightAnim,
        width: '100%',
        alignItems: 'center',
        borderBottomColor: '#242526',
        borderBottomWidth: 1,
        paddingBottom: 16, // Adjust as per your theme or design
      }}>
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
    </Animated.View>
  );
};

export default SearchHistory;
