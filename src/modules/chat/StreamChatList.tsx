import ChatMessageBubble from '@components/chat/ChatMessageBubble';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { FlatList } from 'react-native';
import { YStack } from 'tamagui';

import { useStreamChatStore } from './stores/useStreamChatStore';
import { Message } from './types';

const StreamChatList = () => {
  const flatListRef = useRef<FlatList>(null);
  const { messages } = useStreamChatStore((state) => ({ messages: state.messages }));

  const renderMessage = useCallback(
    (item: Message, index: number) => {
      return <ChatMessageBubble msg={item.msg} sender={item.sender} opacity={1.0} />;
    },
    [messages]
  );

  const keyExtractor = useCallback((item: Message) => item.id, []);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [messages]);

  const sortedMessages = useMemo(() => {
    return [...messages].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  }, [messages]);

  return (
    <YStack backgroundColor="$colorTransparent" flex={1}>
      <FlatList
        ref={flatListRef}
        data={sortedMessages}
        renderItem={({ item, index }) => renderMessage(item, index)}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ flexDirection: 'column-reverse' }}
        scrollEnabled
        inverted
      />
    </YStack>
  );
};

export default StreamChatList;
