import NotificationPage from '@screens/NotificationPage';
import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

const Notifications = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#151718' }}>
      <NotificationPage />
    </SafeAreaView>
  );
};

export default Notifications;
