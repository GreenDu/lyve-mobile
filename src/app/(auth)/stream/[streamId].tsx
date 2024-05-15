import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Text, Button, YStack } from 'tamagui';

const Stream = () => {
  const { streamId } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <YStack height="100%" backgroundColor="#ff0000">
        <Text>Stream: {streamId}</Text>
        <Link asChild href={{ pathname: '/stream/' }}>
          <Button>To Create Stream</Button>
        </Link>
      </YStack>
    </SafeAreaView>
  );
};

export default Stream;
