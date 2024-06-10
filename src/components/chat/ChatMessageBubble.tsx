import { ChatMessage, EventInfoMessage, Message } from '@modules/chat/types';
import React from 'react';
import { Image } from 'react-native';
import { Avatar, SizableText, XStack, YStack } from 'tamagui';

interface ChatMessageBubbleProps {
  message: Message;
  opacity: number;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message, opacity }) => {
  if ('sender' in message) {
    const chatMessage = message as ChatMessage;
    const sender = chatMessage.sender;

    return (
      <XStack
        opacity={opacity}
        justifyContent="flex-start"
        alignItems={chatMessage.gif === undefined ? 'center' : 'flex-start'}
        space="$2"
        width="80%"
        paddingVertical="$1.5"
        paddingHorizontal="$3"
        marginTop="$2">
        <Avatar circular size="$4">
          <Avatar.Image
            accessibilityLabel={sender.username}
            src={
              sender.avatar_url ??
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSOLGUixXG8-JSCNGgzrdg0tIqAFL9VfHbJBYylyOtU28twsRS'
            }
          />
          <Avatar.Fallback delayMs={600} />
        </Avatar>

        <YStack justifyContent="center" flex={1} alignItems="flex-start">
          <SizableText size="$4">{sender.dispname}</SizableText>
          {chatMessage.gif === undefined ? (
            <SizableText size="$4">{chatMessage.msg ?? ''}</SizableText>
          ) : (
            <Image
              source={{ uri: chatMessage.gif.url }}
              width={Number(chatMessage.gif.width)}
              height={Number(chatMessage.gif.height)}
            />
          )}
        </YStack>
      </XStack>
    );
  } else {
    const eventInfoMessage = message as EventInfoMessage;

    return (
      <XStack
        opacity={opacity}
        justifyContent="flex-start"
        alignItems="center"
        space="$2"
        width="80%"
        paddingVertical="$1.5"
        paddingHorizontal="$3"
        marginTop="$2">
        <SizableText size="$4">{eventInfoMessage.msg}</SizableText>
      </XStack>
    );
  }
};

export default ChatMessageBubble;
