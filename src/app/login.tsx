import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { YStack, Button, Text } from 'tamagui';

import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const { isLoading, session, signIn } = useAuth();
  return (
    <SafeAreaView style={{ backgroundColor: '#151718' }}>
      <YStack
        height="100%"
        justifyContent="center"
        alignItems="center"
        backgroundColor="$color.background">
        <YStack justifyContent="center" alignItems="center" marginBottom="$20">
          <Text fontWeight="500" fontSize={35} color="$color.textMain">
            Welcome to
          </Text>
          <Svg width="140" height="80" viewBox="0 0 292 192" fill="none">
            <Path
              d="M33.75 156.85C32.65 157.05 31 157.3 28.8 157.6C26.7 158 24.55 158.2 22.35 158.2C20.15 158.2 18.15 158.05 16.35 157.75C14.65 157.45 13.2 156.85 12 155.95C10.8 155.05 9.85 153.85 9.15 152.35C8.55 150.75 8.25 148.7 8.25 146.2V59.2C9.35 59 10.95 58.75 13.05 58.45C15.25 58.05 17.45 57.85 19.65 57.85C21.85 57.85 23.8 58 25.5 58.3C27.3 58.6 28.8 59.2 30 60.1C31.2 61 32.1 62.25 32.7 63.85C33.4 65.35 33.75 67.35 33.75 69.85V156.85ZM61.241 138.4C60.141 135.9 58.941 133.1 57.641 130C56.441 126.9 55.141 123.35 53.741 119.35C52.441 115.35 51.041 110.8 49.541 105.7C48.141 100.5 46.641 94.55 45.041 87.85C46.441 86.45 48.291 85.25 50.591 84.25C52.991 83.15 55.591 82.6 58.391 82.6C61.891 82.6 64.791 83.35 67.091 84.85C69.391 86.25 71.091 88.95 72.191 92.95L84.041 134.2H84.641C85.841 130.8 86.991 127.1 88.091 123.1C89.291 119.1 90.441 115 91.541 110.8C92.641 106.5 93.641 102.25 94.541 98.05C95.541 93.75 96.391 89.55 97.091 85.45C100.691 83.55 104.641 82.6 108.941 82.6C112.441 82.6 115.341 83.35 117.641 84.85C119.941 86.35 121.091 88.95 121.091 92.65C121.091 95.35 120.741 98.5 120.041 102.1C119.341 105.6 118.391 109.35 117.191 113.35C116.091 117.35 114.741 121.5 113.141 125.8C111.641 130 110.041 134.15 108.341 138.25C106.641 142.35 104.891 146.25 103.091 149.95C101.291 153.55 99.541 156.8 97.841 159.7C95.041 164.6 92.441 168.6 90.041 171.7C87.641 174.8 85.341 177.2 83.141 178.9C80.941 180.7 78.741 181.9 76.541 182.5C74.341 183.2 72.041 183.55 69.641 183.55C65.441 183.55 62.041 182.3 59.441 179.8C56.841 177.3 55.291 174.05 54.791 170.05C57.991 167.55 61.191 164.75 64.391 161.65C67.591 158.65 70.491 155.55 73.091 152.35C71.391 151.85 69.541 150.7 67.541 148.9C65.641 147 63.541 143.5 61.241 138.4ZM182.38 155.05C180.98 156.15 178.93 157.05 176.23 157.75C173.53 158.45 170.48 158.8 167.08 158.8C163.18 158.8 159.78 158.3 156.88 157.3C154.08 156.3 152.13 154.7 151.03 152.5C150.13 150.8 149.03 148.45 147.73 145.45C146.53 142.35 145.23 138.95 143.83 135.25C142.43 131.45 140.98 127.4 139.48 123.1C137.98 118.8 136.53 114.55 135.13 110.35C133.83 106.15 132.63 102.1 131.53 98.2C130.43 94.3 129.53 90.85 128.83 87.85C130.23 86.45 132.08 85.25 134.38 84.25C136.78 83.15 139.38 82.6 142.18 82.6C145.68 82.6 148.53 83.35 150.73 84.85C153.03 86.25 154.73 88.95 155.83 92.95L161.68 115.9C162.78 120.4 163.83 124.5 164.83 128.2C165.83 131.8 166.58 134.6 167.08 136.6H167.83C169.73 129.2 171.73 121 173.83 112C175.93 103 177.83 94.15 179.53 85.45C181.23 84.55 183.13 83.85 185.23 83.35C187.43 82.85 189.53 82.6 191.53 82.6C195.03 82.6 197.98 83.35 200.38 84.85C202.78 86.35 203.98 88.95 203.98 92.65C203.98 94.25 203.58 96.6 202.78 99.7C202.08 102.7 201.13 106.15 199.93 110.05C198.83 113.85 197.48 117.9 195.88 122.2C194.38 126.5 192.83 130.7 191.23 134.8C189.63 138.9 188.03 142.75 186.43 146.35C184.93 149.85 183.58 152.75 182.38 155.05ZM253.186 159.4C247.286 159.4 241.786 158.6 236.686 157C231.686 155.3 227.286 152.8 223.486 149.5C219.786 146.2 216.836 142.05 214.636 137.05C212.536 132.05 211.486 126.2 211.486 119.5C211.486 112.9 212.536 107.25 214.636 102.55C216.836 97.75 219.686 93.85 223.186 90.85C226.686 87.75 230.686 85.5 235.186 84.1C239.686 82.6 244.286 81.85 248.986 81.85C254.286 81.85 259.086 82.65 263.386 84.25C267.786 85.85 271.536 88.05 274.636 90.85C277.836 93.65 280.286 97 281.986 100.9C283.786 104.8 284.686 109.05 284.686 113.65C284.686 117.05 283.736 119.65 281.836 121.45C279.936 123.25 277.286 124.4 273.886 124.9L236.836 130.45C237.936 133.75 240.186 136.25 243.586 137.95C246.986 139.55 250.886 140.35 255.286 140.35C259.386 140.35 263.236 139.85 266.836 138.85C270.536 137.75 273.536 136.5 275.836 135.1C277.436 136.1 278.786 137.5 279.886 139.3C280.986 141.1 281.536 143 281.536 145C281.536 149.5 279.436 152.85 275.236 155.05C272.036 156.75 268.436 157.9 264.436 158.5C260.436 159.1 256.686 159.4 253.186 159.4ZM248.986 100.45C246.586 100.45 244.486 100.85 242.686 101.65C240.986 102.45 239.586 103.5 238.486 104.8C237.386 106 236.536 107.4 235.936 109C235.436 110.5 235.136 112.05 235.036 113.65L260.686 109.45C260.386 107.45 259.286 105.45 257.386 103.45C255.486 101.45 252.686 100.45 248.986 100.45Z"
              fill="white"
            />
          </Svg>
        </YStack>
        <Button
          width="$19"
          onPress={async () => {
            signIn();
          }}>
          Login
        </Button>
      </YStack>
    </SafeAreaView>
  );
};

export default LoginPage;