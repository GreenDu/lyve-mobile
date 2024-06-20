import React, { useEffect, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { YStack, Button, SizableText, XStack } from 'tamagui';

interface SwitchButtonProps {
  states: [string, string];
  onStateChange: (newState: string) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ states, onStateChange }) => {
  const [active, setActive] = useState<(typeof states)[number]>(states[0]!);

  // Using reanimated shared value for animation
  const sliderPosition = useSharedValue(0);

  useEffect(() => {
    // Animate to the new position when active state changes
    sliderPosition.value = withTiming(states.indexOf(active), {
      duration: 500,
      easing: Easing.inOut(Easing.exp),
    });
    // Call onStateChange whenever active state changes
    setTimeout(() => {
      onStateChange(active);
    }, 150);
  }, [active, states, sliderPosition]);

  const toggleSwitch = (newState: string) => {
    setActive(newState);
  };

  // Define animated style for the slider
  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sliderPosition.value * 150 }], // Adjust according to the width of each tab
  }));

  return (
    <YStack justifyContent="center" alignItems="center" flex={1}>
      <XStack
        backgroundColor="$primaryDark"
        width={300}
        height={30}
        borderRadius={25}
        position="relative"
        overflow="hidden">
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: '50%',
              height: '100%',
              backgroundColor: '#242526',
              borderRadius: 25,
              zIndex: -1,
            },
            sliderStyle,
          ]}
        />
        {states.map((state, index) => {
          return (
            <Button
              testID={`${state}-button`}
              key={index}
              flex={1}
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
              borderRadius={25}
              backgroundColor="transparent"
              pressStyle={{
                backgroundColor: 'transparent',
                borderColor: 'tranparent',
              }}
              onPress={() => toggleSwitch(state)}>
              <SizableText size="$5" fontWeight="bold">
                {state}
              </SizableText>
            </Button>
          );
        })}
      </XStack>
    </YStack>
  );
};

export default SwitchButton;
