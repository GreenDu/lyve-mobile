import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Card, Image, YStack, Text } from 'tamagui';

const StreamPreviewCardPlaceholder: React.FC = () => {
  return (
    <YStack
      width={181}
      borderRadius="$8"
      height={310}
      backgroundColor="$color.primaryLight"
      justifyContent="center"
      alignItems="center">
      <Link href="/stream">
        <YStack backgroundColor="#151718dd" borderRadius={50} padding="$4">
          <Feather size={28} name="plus" color="#fff" />
        </YStack>
      </Link>
      <Text marginTop="$4" fontWeight="600" color="$color.textMain">
        Start Streaming
      </Text>
    </YStack>
  );
};

export default StreamPreviewCardPlaceholder;
