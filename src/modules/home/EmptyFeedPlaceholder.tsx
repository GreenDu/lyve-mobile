import { FontAwesome } from '@expo/vector-icons';
import React from 'react';

import { Button, H2, SizableText, Stack, YStack } from 'tamagui';

const EmptyFeedPlaceholder: React.FC<{ onRefresh: () => void }> = ({ onRefresh }) => {
  return (
    <YStack alignItems="center" justifyContent="center" padding="$4">
      <Stack marginBottom="$2">
        <FontAwesome name="rss" size={40} color="#fff" />
      </Stack>
      <H2>No feed available</H2>
      <SizableText size="$4" textAlign="center" marginTop="$2" marginBottom="$4">
        It looks like there’s nothing here right now. Try refreshing the feed.
      </SizableText>
      <Button onPress={onRefresh} size="$5" backgroundColor="$accentMain">
        Refresh Feed
      </Button>
    </YStack>
  );
};

export default EmptyFeedPlaceholder;
