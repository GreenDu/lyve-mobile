import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import ProfilePage from '@screens/ProfilePage'
import { useLocalSearchParams } from 'expo-router'

const Index = () => {

    const { userid } = useLocalSearchParams();

  return (
    <SafeAreaView>
        <ProfilePage userid={userid as string}/>
    </SafeAreaView>
  )
}

export default Index