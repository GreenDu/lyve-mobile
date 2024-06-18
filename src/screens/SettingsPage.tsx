import { Platform, Pressable, ScrollView, View } from 'react-native';
import React from 'react';
import { YStack, XStack, H1, Button, H2 } from 'tamagui';
import { Feather } from '@expo/vector-icons';
import SettingButton from '@components/settings/SettingButton';
import SettingStack from '@components/settings/SettingStack';
import useAuth from '@modules/auth/useAuth';
import { router } from 'expo-router';
import SettingsList from '@modules/settings/SettingsList';

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
