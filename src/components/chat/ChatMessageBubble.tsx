import { View, Text } from 'react-native';
import React from 'react';
import { Avatar, SizableText, XStack, YStack } from 'tamagui';
import { Message } from '@modules/chat/types';

interface ChatMessageBubbleProps {
  msg: Message['msg'];
  sender: Message['sender'];
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ msg, sender }) => {
  return (
    <XStack
      justifyContent="flex-start"
      alignItems="center"
      space="$2"
      width="80%"
      paddingVertical="$1.5"
      paddingHorizontal="$3"
      marginTop="$2">
      <Avatar circular size="$4">
        <Avatar.Image
          accessibilityLabel={sender.username}
          src={sender.avatar_url ?? 'https://random.imagecdn.app/200/75'}
        />
        <Avatar.Fallback delayMs={600} />
      </Avatar>
      <YStack justifyContent="center" flex={1} alignItems="flex-start">
        <SizableText size="$4">{sender.dispname}</SizableText>
        <SizableText size="$4">{msg}</SizableText>
      </YStack>
    </XStack>
  );
};

export default ChatMessageBubble;
