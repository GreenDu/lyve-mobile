import { Platform, ScrollView, View } from 'react-native';
import { Platform, ScrollView, View } from 'react-native';
import React from 'react';
import { YStack, XStack, H1, Button, H2 } from 'tamagui';
import { Feather } from '@expo/vector-icons';
import SettingButton from '@components/settings/SettingButton';
import SettingStack from '@components/settings/SettingStack';
import useAuth from '@modules/auth/useAuth';
import { router } from 'expo-router';

const SettingsPage: React.FC<{ userid: string }> = ({ userid }) => {
  const { signOut } = useAuth();

  return (
    <YStack
      backgroundColor="$background"
      padding="$4"
      style={Platform.OS === 'ios' ? { flexGrow: 1 } : { height: '100%' }}>
      <XStack alignItems="center">
        <Button
          backgroundColor="#151718"
          icon={<Feather name="chevron-left" size={24} color="white" />}
          onPress={() => router.back()}
        />
        <H1 fontSize={32}>Settings</H1>
      </XStack>

      <ScrollView>
        <H2 mt="$8" fontSize={24} mb="$3">
          Account
        </H2>
        <SettingStack>
          <SettingButton name="Account" onPress={() => console.log('setting')} />
          <SettingButton name="Safety" onPress={() => console.log('setting')} />
          <SettingButton name="Share" onPress={() => console.log('setting')} />
          <SettingButton name="Permissions" onPress={() => console.log('setting')} />
        </SettingStack>

        <H2 mt="$5" fontSize={24} mb="$3">
          Contents
        </H2>
        <SettingStack>
          <SettingButton name="Ads" onPress={() => console.log('setting')} />
          <SettingButton name="Language" onPress={() => console.log('setting')} />
          <SettingButton name="Notifications" onPress={() => console.log('setting')} />
        </SettingStack>

        <H2 mt="$5" fontSize={24} mb="$3">
          Support
        </H2>
        <SettingStack>
          <SettingButton name="Support" onPress={() => console.log('setting')} />
        </SettingStack>

        <H2 mt="$5" fontSize={24} mb="$3">
          Logout
        </H2>
        <SettingStack>
          <SettingButton
            name="Logout"
            onPress={async () => {
              signOut();
            }}
          />
        </SettingStack>
      </ScrollView>
    </YStack>
  );
};

export default SettingsPage;