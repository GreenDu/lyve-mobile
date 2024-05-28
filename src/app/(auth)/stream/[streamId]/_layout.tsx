import { Slot } from 'expo-router';
import React from 'react';

import WebSocketProvider from '../../../../modules/ws/WebSocketProvider';

const StreamLayout = () => {
  return (
    <WebSocketProvider>
      <Slot />
    </WebSocketProvider>
  );
};

export default StreamLayout;
