import { View, Text } from 'react-native';
import React from 'react';
import { YStack, XStack, H1, Button, H2 } from 'tamagui';
import { Feather } from '@expo/vector-icons';
import SettingButton from '@components/settings/SettingButton';
import SettingStack from '@components/settings/SettingStack';

const SettingsPage: React.FC<{ userid: string }> = ({ userid }) => {
  return (
    <View>
      <YStack height="100%" padding="$4">
        <XStack alignItems="center">
          <Button
            icon={<Feather name="chevron-left" size={24} color="white" />}
            backgroundColor="black"></Button>
          <H1 fontSize={32}>Settings</H1>
        </XStack>

        <H2 mt="$10" fontSize={24} mb="$3">
          Account
        </H2>
        <SettingStack>
          <SettingButton name="Konto" onPress={() => console.log('setting')} />
          <SettingButton name="Sicherheit" onPress={() => console.log('another')} />
          <SettingButton name="Teilen" onPress={() => console.log('more')} />
          <SettingButton name="Berechtigungen" onPress={() => console.log('last')} />
        </SettingStack>
      </YStack>
    </View>
  );
};

export default SettingsPage;
