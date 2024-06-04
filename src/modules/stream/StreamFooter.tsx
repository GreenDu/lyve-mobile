import ChatInput from '@components/chat/ChatInput';
import { Feather } from '@expo/vector-icons';
import { useMessageStore } from '@modules/chat/stores/useMessageStore';
import useSocket from '@modules/ws/useSocket';
import { Keyboard } from 'react-native';
import { Button, XStack } from 'tamagui';

const StreamFooter: React.FC = () => {
  const { socket } = useSocket();

  // const { message } = useMessageStore((state) => ({ message: state.message }));
  const { clear } = useMessageStore.getState();

  const handleSendMessage = () => {
    const { message } = useMessageStore.getState();
    if (message.length > 1) {
      socket.emit('send_msg', { msg: message });
      Keyboard.dismiss();
      clear();
    }
  };

  return (
    <XStack
      backgroundColor="transparent"
      justifyContent="space-between"
      alignItems="center"
      space="$4">
      <ChatInput onPress={handleSendMessage} />
      <Button
        size="$5"
        backgroundColor="$accentMain"
        circular
        icon={<Feather name="gift" size={22} color="white" />}
      />
    </XStack>
  );
};

export default StreamFooter;
