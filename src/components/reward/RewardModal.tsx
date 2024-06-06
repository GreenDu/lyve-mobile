import { useRewardModalStore } from '@modules/reward/stores/useRewardModalStore';
import { useAssets } from 'expo-asset';
import React from 'react';
import { View, Text, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Button, XStack, YStack } from 'tamagui';

const RewardModal: React.FC = () => {
  const { visible } = useRewardModalStore((state) => ({ visible: state.visible }));

  const [assets, error] = useAssets([
    require('../../../assets/rewards/coin.png'),
    require('../../../assets/rewards/popsicle.png'),
    require('../../../assets/rewards/cat.png'),
    require('../../../assets/rewards/bouquet.png'),
    require('../../../assets/rewards/bouquet_2.png'),
    require('../../../assets/rewards/crown.png'),
    require('../../../assets/rewards/gift.png'),
    require('../../../assets/rewards/star.png'),
    require('../../../assets/rewards/heart.png'),
    require('../../../assets/rewards/cake.png'),
  ]);

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const close = () => {
    useRewardModalStore.getState().close();
  };
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0}
      onBackdropPress={close}
      swipeDirection={['down']}
      onSwipeComplete={close}
      style={{ flex: 1, margin: 0, justifyContent: 'flex-end' }}>
      <YStack backgroundColor="$primaryLight" height="$20" alignItems="center">
        {assets && (
          <XStack flexWrap="wrap" flex={1} justifyContent="space-around" padding="$4" space="$6">
            {assets.map((a) => {
              return <Image key={a.name} src={a.uri} style={{ width: 70, height: 70 }} />;
            })}
          </XStack>
        )}
      </YStack>
    </Modal>
  );
};

export default RewardModal;
