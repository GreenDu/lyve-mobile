import React from 'react'
import ProfilePage from '@screens/ProfilePage'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';


const Index = () => {

  const { userid } = useLocalSearchParams();

  return (
    <SafeAreaView>
        <ProfilePage userid={userid as string}/>
    </SafeAreaView>
  )
}

export default Index