import { Feather } from '@expo/vector-icons';
import { useMessageStore } from '@modules/chat/stores/useMessageStore';
import React from 'react';
import { Button, Input, XStack } from 'tamagui';

const ChatInput: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const { message } = useMessageStore((state) => ({ message: state.message }));
  const { setMessage } = useMessageStore.getState();

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
          value={message}
          onChangeText={(m) => setMessage(m)}
          borderColor="$colorTransparent"
          backgroundColor="$colorTransparent"
          placeholder="Say something..."
          placeholderTextColor="#fff"
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
        onPress={onPress}
        icon={<Feather name="send" size={21} color="white" />}
        circular
        backgroundColor="#24252600"
        marginRight="$2"
      />
    </XStack>
  );
};

export default ChatInput;
