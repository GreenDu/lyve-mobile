import React from 'react';
import SettingsPage from '@screens/SettingsPage';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
  const { userid } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <SettingsPage userid={userid as string} />
    </SafeAreaView>
  );
};

export default Settings;
