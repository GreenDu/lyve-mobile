import HomePage from '@screens/HomePage';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#151718' }}>
      <HomePage />
    </SafeAreaView>
  );
};

export default Home;
