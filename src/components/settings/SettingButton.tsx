import React from 'react';
import { Button } from 'tamagui';

interface ButtonProps {
  name: string;
  onPress: () => void;
}

const SettingButton: React.FC<ButtonProps> = ({ name, onPress }) => {
  return (
    <Button onPress={onPress}>
      {name}
    </Button>
  );
};

export default SettingButton;
