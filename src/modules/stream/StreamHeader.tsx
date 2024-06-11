import StreamerInfoBadge from '@components/stream/StreamerInfoBadge';
import { Feather } from '@expo/vector-icons';
import { SocketUser } from '@modules/ws/types';
import React from 'react';

import { Button, XStack } from 'tamagui';

interface StreamHeaderProps {
  onLeave: () => void;
}

const StreamHeader: React.FC<StreamHeaderProps> = ({ onLeave }) => {
  return (
    <XStack justifyContent="space-between" alignItems="center" space="$3">
      <StreamerInfoBadge />
      <Button
        onPress={onLeave}
        size="$4.5"
        backgroundColor="#242526CC"
        circular
        icon={<Feather size={24} name="x" color="#fff" />}
      />
    </XStack>
  );
};

export default StreamHeader;
