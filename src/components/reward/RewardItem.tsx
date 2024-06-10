import React from 'react';
import { Image } from 'react-native';
import { XStack, YStack, SizableText } from 'tamagui';

const RewardItem: React.FC<{ uri: any; coins: number; onPress: () => void }> = ({
  uri,
  coins,
  onPress,
}) => {
  return (
    <YStack
      onPress={onPress}
      pressStyle={{ backgroundColor: '$primaryLight' }}
      width="25%"
      alignItems="center"
      space="$2"
      paddingVertical="$1"
      //   backgroundColor="$primaryLight"
      borderRadius="$5">
      <Image source={uri} style={{ width: 70, height: 70 }} />
      <XStack justifyContent="center" alignItems="center" space="$2">
        <SizableText>{coins}</SizableText>
        <Image
          source={require('../../../assets/rewards/coin.png')}
          style={{ width: 20, height: 20 }}
        />
      </XStack>
    </YStack>
  );
};

export default RewardItem;
