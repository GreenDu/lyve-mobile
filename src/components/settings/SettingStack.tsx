import React, { ReactNode } from 'react';
import { YStack } from 'tamagui';

interface SettingStackProps {
  children: ReactNode;
}

const SettingStack: React.FC<SettingStackProps> = ({ children }) => {
  return (
    <YStack
      overflow="hidden"
      borderRadius={15}
      backgroundColor="green"
    >
      {children}
    </YStack>
  );
};

export default SettingStack;
