import { View, Text } from 'react-native'
import React from 'react'
import EditProfilePage from '@screens/EditProfilePage'
import { SafeAreaView } from 'react-native-safe-area-context'

const EditProfile = () => {
  return (
    <SafeAreaView>
      <EditProfilePage></EditProfilePage>
    </SafeAreaView>
  )
}

export default EditProfile