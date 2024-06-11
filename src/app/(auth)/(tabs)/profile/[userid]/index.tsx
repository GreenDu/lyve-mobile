import React from 'react';
import ProfilePage from '@screens/ProfilePage';
import { useLocalSearchParams } from 'expo-router';

const Index = () => {
  const { userid } = useLocalSearchParams();

  return <ProfilePage userid={userid as string} />;
};

export default Index;
