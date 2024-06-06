import ChatInput from '@components/chat/ChatInput';
import RewardModal from '@components/reward/RewardModal';
import { Feather } from '@expo/vector-icons';
import { useMessageStore } from '@modules/chat/stores/useMessageStore';
import { useRewardModalStore } from '@modules/reward/stores/useRewardModalStore';
import useSocket from '@modules/ws/useSocket';
import { useState } from 'react';
import { Keyboard } from 'react-native';
import { Button, XStack } from 'tamagui';

const StreamFooter: React.FC = () => {
  const { socket } = useSocket();

  // const { message } = useMessageStore((state) => ({ message: state.message }));
  const { clear } = useMessageStore.getState();
  const { visible } = useRewardModalStore((state) => ({ visible: state.visible }));

  const handleSendMessage = () => {
    const { message } = useMessageStore.getState();
    if (message.length > 1) {
      socket.emit('send_msg', { msg: message });
      Keyboard.dismiss();
      clear();
    }
  };

  const toggleRewardModal = () => {
    if (visible) {
      useRewardModalStore.getState().close();
    } else {
      useRewardModalStore.getState().open();
    }
  };

  return (
    <XStack
      backgroundColor="transparent"
      justifyContent="space-between"
      alignItems="center"
      space="$4">
      <RewardModal />
      <ChatInput onPress={handleSendMessage} />
      <Button
        onPress={toggleRewardModal}
        size="$5"
        backgroundColor="$accentMain"
        circular
        icon={<Feather name="gift" size={22} color="white" />}
      />
    </XStack>
  );
};

export default StreamFooter;
