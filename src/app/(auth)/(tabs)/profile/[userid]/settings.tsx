import React from 'react';
import SettingsPage from '@screens/SettingsPage';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
  const { userid } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ backgroundColor: '#151718' }}>
      <SettingsPage userid={userid as string} />
    </SafeAreaView>
  );
};

export default Settings;
