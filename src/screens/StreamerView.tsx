import { View } from 'react-native';
import React from 'react';

import { YStack, Button } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';

const StreamerView = () => {
  return (
    <SafeAreaView style={{ backgroundColor: 'transparent' }}>
      <View style={{ flex: 1, position: 'relative', top: 0, bottom: 0, left: 0, right: 0 }}>
        <YStack width="100%" bottom="$6" position="absolute" paddingHorizontal="$4">
          <Button
            backgroundColor="$accentMain"
            width="$20"
            alignSelf="center"
            onPress={() => {
              console.log('press');
            }}>
            Start Stream
          </Button>
        </YStack>
      </View>
    </SafeAreaView>
  );
};

export default StreamerView;
