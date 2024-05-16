import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'tamagui';

import useAuth from '../../../hooks/useAuth';
import { router } from 'expo-router';

const NotificationPage = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView>
      <Text>NotificationPage</Text>
      <Button onPress={() => signOut()}>Logout</Button>
      <Button onPress={() => router.navigate('/stream/clw98k2ku00054iqyhs11vhh4')}>
        To stream
      </Button>
    </SafeAreaView>
  );
};

export default NotificationPage;
