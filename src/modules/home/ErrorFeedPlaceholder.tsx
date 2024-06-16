import { FontAwesome } from '@expo/vector-icons';
import React from 'react';

import { Button, H2, SizableText, Stack, YStack } from 'tamagui';

const ErrorFeedPlaceholder: React.FC<{ onRetry: () => void }> = ({ onRetry }) => {
  return (
    <YStack alignItems="center" justifyContent="center" padding="$4">
      <Stack marginBottom="$2">
        <FontAwesome name="exclamation-circle" size={40} color="#ff0000" />
      </Stack>
      <H2>Error Loading Feed</H2>
      <SizableText size="$4" textAlign="center" marginTop="$2" marginBottom="$4">
        Something went wrong while loading the feed. Please try again.
      </SizableText>
      <Button onPress={onRetry} size="$5" backgroundColor="$accentMain">
        Retry
      </Button>
    </YStack>
  );
};

export default ErrorFeedPlaceholder;
