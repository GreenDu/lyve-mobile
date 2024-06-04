import useAuth from '@modules/auth/useAuth';
import { router } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'tamagui';

const NotificationPage = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView>
      <Text>NotificationPage</Text>
      <Button
        onPress={async () => {
          signOut();
        }}>
        Logout
      </Button>
      <Button onPress={() => router.navigate('/stream/clws6ngxl0009ll7fxu0nlaoq')}>
        To stream
      </Button>
    </SafeAreaView>
  );
};

export default NotificationPage;
