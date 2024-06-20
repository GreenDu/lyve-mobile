import React from 'react';
import SettingsPage from '@screens/SettingsPage';

import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#151718' }}>
      <SettingsPage />
    </SafeAreaView>
  );
};

export default Settings;
