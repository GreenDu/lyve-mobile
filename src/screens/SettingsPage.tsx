import { Feather } from '@expo/vector-icons';
import SettingsList from '@modules/settings/SettingsList';
import { router } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { YStack, XStack, H1 } from 'tamagui';

const SettingsPage: React.FC<{ userid: string }> = ({ userid }) => {
  return (
    <YStack
      backgroundColor="$primaryDark"
      padding="$4"
      height="100%"
      // style={Platform.OS === 'ios' ? { flexGrow: 1 } : { height: '100%' }}
    >
      <XStack
        alignItems="center"
        space="$2"
        justifyContent="flex-start"
        marginTop="$2"
        paddingBottom="$4">
        <Pressable onPress={() => router.back()} testID="back-pressable">
          <Feather name="chevron-left" size={28} color="white" />
        </Pressable>
        <H1 fontSize={28} fontWeight="800">
          Settings
        </H1>
      </XStack>

      <YStack flex={1} paddingBottom="$10">
        <SettingsList />
      </YStack>
    </YStack>
  );
};

export default SettingsPage;
