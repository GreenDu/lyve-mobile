import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import FollowersPage from '@screens/FollowersPage';

const Followers = () => {
  const { userid } = useLocalSearchParams();
  return (
    <SafeAreaView style={{ backgroundColor: '#151718' }}>
      <FollowersPage id={userid as string} />
    </SafeAreaView>
  );
};

export default Followers;
