import { Button, ButtonProps } from "tamagui";
import { Feather } from "@expo/vector-icons";

const FloatingButton = (props: ButtonProps) => {
  return (
    <Button
      backgroundColor="$color.accentMain"
      icon={<Feather size={28} name="video" color="#fff" />}
      circular
      size="$6"
      position="relative"
      top="$-4"
      {...props}
    />
  );
};

export default FloatingButton;
