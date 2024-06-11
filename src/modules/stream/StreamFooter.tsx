import ChatInput from '@components/chat/ChatInput';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { GiphyDialog, GiphyMedia } from '@giphy/react-native-sdk';
import { useMessageStore } from '@modules/chat/stores/useMessageStore';
import { giphyTheme } from '@modules/gif/giphyTheme';
import RewardModal from '@modules/reward/RewardModal';
import { useRewardModalStore } from '@modules/reward/stores/useRewardModalStore';
import useSocket from '@modules/ws/useSocket';
import { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { Button, XStack, YStack } from 'tamagui';
import { useCurrentStreamInfoStore } from './stores/useCurrentStreamInfoStore';
import useCurrentStreamInfo from './hooks/useCurrentStreamInfo';

const StreamFooter: React.FC = () => {
  const { socket } = useSocket();

  // const { message } = useMessageStore((state) => ({ message: state.message }));
  const { clear } = useMessageStore.getState();
  const { visible: rewardModalVisisble } = useRewardModalStore((state) => ({
    visible: state.visible,
  }));

  const { id } = useCurrentStreamInfoStore((state) => ({ id: state.id }));

  const { isStreamer } = useCurrentStreamInfo(id);

  const handleSendMessage = () => {
    const { message } = useMessageStore.getState();
    if (message.length > 1) {
      socket.emit('send_msg', { msg: message });
      Keyboard.dismiss();
      clear();
    }
  };

  const toggleRewardModal = () => {
    if (rewardModalVisisble) {
      useRewardModalStore.getState().close();
    } else {
      useRewardModalStore.getState().open();
    }
  };

  const handleSelectedGif = (media: GiphyMedia) => {
    console.log('footer', media.data.images.downsized.url);
    socket.emit('send_msg', {
      gif: {
        url: media.data.images.fixed_height_small.url,
        width: media.data.images.fixed_height_small.width.toString(),
        height: media.data.images.fixed_height_small.height.toString(),
      },
    });
  };

  useEffect(() => {
    const listener = GiphyDialog.addListener('onMediaSelect', (e: { media: GiphyMedia }) => {
      handleSelectedGif(e.media);
      GiphyDialog.hide();
    });
    return () => {
      listener.remove();
    };
  }, [handleSelectedGif]);

  GiphyDialog.configure({
    rating: 'pg',
    mediaTypeConfig: ['recents', 'gif', 'emoji', 'sticker'],
    theme: giphyTheme,
    showConfirmationScreen: true,
  });
  return (
    <XStack
      backgroundColor="transparent"
      justifyContent="space-between"
      alignItems="flex-end"
      space="$4">
      <RewardModal />
      <ChatInput onPress={handleSendMessage} />
      <YStack space="$3">
        {!isStreamer && (
          <Button
            size="$5"
            onPress={toggleRewardModal}
            backgroundColor="$accentMain"
            circular
            icon={<Feather name="gift" size={22} color="white" />}
          />
        )}
        <Button
          size="$5"
          onPress={() => GiphyDialog.show()}
          backgroundColor="$accentMain"
          circular
          icon={<MaterialIcons name="gif" size={40} color="white" />}
        />
      </YStack>
    </XStack>
  );
};

export default StreamFooter;
