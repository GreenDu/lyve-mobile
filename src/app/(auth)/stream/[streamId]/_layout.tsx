import { Slot } from 'expo-router';
import React from 'react';

import WebSocketProvider from '../../../../components/providers/WebSocketProvider';

const StreamLayout = () => {
  return (
    <WebSocketProvider>
      <Slot />
    </WebSocketProvider>
  );
};

export default StreamLayout;
