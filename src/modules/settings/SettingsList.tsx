import { Feather } from '@expo/vector-icons';
import useAuth from '@modules/auth/useAuth';
import React from 'react';
import { ScrollView } from 'react-native';
import { H3, ListItem, Separator, YGroup, YStack } from 'tamagui';

import { settingSectionsMap } from './settings';
import { SettingTitle } from './types';

const SettingsList: React.FC = () => {
  const { signOut } = useAuth();

  const settingActionsMap: { [key in SettingTitle]: () => void } = {
    Profile: () => console.log('Profile action'),
    Security: () => console.log('Security action'),
    Shares: () => console.log('Shares action'),
    Permissions: () => console.log('Permissions action'),
    Preferences: () => console.log('Preferences action'),
    'Chat Options': () => console.log('Chat Options action'),
    Privacy: () => console.log('Privacy action'),
    'Content Moderation': () => console.log('Content Moderation action'),
    'Blocked Users': () => console.log('Blocked Users action'),
    General: () => console.log('General Notifications action'),
    Livestream: () => console.log('Livestream Notifications action'),
    'Help Center': () => console.log('Help Center action'),
    'Report a Problem': () => console.log('Report a Problem action'),
    'Rate Us': () => console.log('Rate Us action'),
    'Terms of Service': () => console.log('Terms of Service action'),
    'Privacy Policy': () => console.log('Privacy Policy action'),
    'Community Guidelines': () => console.log('Community Guidelines action'),
    Version: () => console.log('Version action'),
    'Developer Info': () => console.log('Developer Info action'),
    'Release Notes': () => console.log('Release Notes action'),
    'Join Beta Program': () => console.log('Join Beta Program action'),
    Logout: () => signOut(),
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {Object.entries(settingSectionsMap).map(([key, val]) => {
        return (
          <YStack key={key} paddingBottom="$5" testID={`${key}-header`}>
            <H3 ml="$2" mb="$3">
              {key}
            </H3>
            <YGroup bordered separator={<Separator />}>
              {val.map((v) => {
                return (
                  <YGroup.Item key={v}>
                    <ListItem
                      bg="$primaryLight"
                      hoverTheme
                      pressTheme
                      title={v}
                      onPress={settingActionsMap[v as SettingTitle]}
                      testID={`${v}-button`}
                      iconAfter={<Feather name="chevron-right" size={24} color="white" />}
                    />
                  </YGroup.Item>
                );
              })}
            </YGroup>
          </YStack>
        );
      })}
    </ScrollView>
  );
};

export default SettingsList;
