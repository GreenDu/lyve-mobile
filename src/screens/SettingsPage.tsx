import { View, Text } from 'react-native';
import React from 'react';
import { YStack, XStack, H1, Button } from 'tamagui';
import { Feather } from '@expo/vector-icons';

const SettingsPage: React.FC<{ userid: string }> = ({ userid }) => {
  return (
    <View>
      <YStack height="100%" padding="$4">
        <XStack alignItems="center">
          <Button 
          icon={<Feather name="chevron-left" size={24} color="white" />} 
          backgroundColor="black">
            
          </Button>
          <H1 fontSize={32}>
            Settings
            </H1>
        </XStack>
      </YStack>
      <Text>SettingsPage</Text>
    </View>
  );
};

export default SettingsPage;
