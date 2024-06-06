import { View, Text } from 'react-native'
import React from 'react'
import { useGetUser } from '@api/user/useGetUser'

const ProfilePage: React.FC < { userid: string } > = ( {userid }) => {

const { data } = useGetUser({ variables: { id: userid }}); 

  return (
    <View>
      <Text style = {{color: "white"}}>ProfilePage {JSON.stringify(data)} </Text>
    </View>
  )
}

export default ProfilePage