import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import FollowingPage from '@screens/FollowingPage';

const Following = () => {
  const { userid } = useLocalSearchParams();
  return (
    <SafeAreaView style={{ backgroundColor: '#151718' }}>
      <FollowingPage id={userid as string} />
    </SafeAreaView>
  );
};

export default Following;
