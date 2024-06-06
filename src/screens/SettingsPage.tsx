import { View, Text } from 'react-native'
import React from 'react'
import { YStack } from 'tamagui'

const SettingsPage: React.FC<{ userid: string }> = ({ userid }) => {
  return (
    <View>
        <YStack backgroundColor="white" height="100%">

        </YStack>
      <Text>SettingsPage</Text>
    </View>
  )
}

export default SettingsPage