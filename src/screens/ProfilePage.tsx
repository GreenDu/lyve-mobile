import { View, Text } from 'react-native'
import React from 'react'
import { useGetUser } from '@api/user/useGetUser'
import { Avatar, YStack } from 'tamagui';


const ProfilePage: React.FC < { userid: string } > = ( {userid }) => {

const { data } = useGetUser({ variables: { id: userid }}); 

  return (
    <View>
      <YStack height="100%" backgroundColor="$color.background">
        <YStack height="35%" backgroundColor={'$color.accentDark'} borderRadius={30}>
        <Avatar circular size="$8">
          <Avatar.Image
            accessibilityLabel="Nate Wienert"
            src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
          />
          <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
        </Avatar>
        </YStack>
      
        </YStack>
    </View>
  )
}

export default ProfilePage