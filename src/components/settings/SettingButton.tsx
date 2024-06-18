import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Button } from 'tamagui';

interface ButtonProps {
  name: string;
  onPress: () => void;
}

const SettingButton: React.FC<ButtonProps> = ({ name, onPress }) => {
  return (
    <Button
      testID={`${name.toLowerCase()}-button`}
      justifyContent="space-between"
      onPress={onPress}>
      {name}
      {<Feather name="chevron-right" size={24} color="white" />}
    </Button>
  );
};

export default SettingButton;
