import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'tamagui';

import useAuth from '../../../hooks/useAuth';

const NotificationPage = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView>
      <Text>NotificationPage</Text>
      <Button onPress={() => signOut()}>Logout</Button>
    </SafeAreaView>
  );
};

export default NotificationPage;
