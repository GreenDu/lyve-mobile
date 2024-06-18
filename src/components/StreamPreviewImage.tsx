import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, Pressable } from 'react-native';
import { YStack, ZStack } from 'tamagui';

interface StreamPreviewImageProps {
  uri: string | null;
  handleAddImage: () => void;
  clearImage: () => void;
}
const StreamPreviewImage: React.FC<StreamPreviewImageProps> = ({
  uri,
  handleAddImage,
  clearImage,
}) => {
  const [imageUri, setImageUri] = useState<string | null>(uri);

  useEffect(() => {
    setImageUri(uri);
  }, [uri]);

  return (
    <ZStack
      width="60%"
      height="45%"
      backgroundColor="$primaryLight"
      borderRadius={25}
      alignSelf="center">
      {!imageUri ? (
        <YStack width="100%" height="100%" alignItems="center" justifyContent="center">
          <Pressable onPress={handleAddImage}>
            <YStack
              backgroundColor="#000000"
              borderRadius={100}
              padding="$4"
              testID="add-image-button">
              <Feather size={28} name="plus" color="#fff" />
            </YStack>
          </Pressable>
        </YStack>
      ) : (
        <ZStack width="100%" height="100%" alignItems="center" justifyContent="center">
          <Image
            source={{ uri: imageUri }}
            style={{ width: '100%', height: '100%', borderRadius: 25 }}
            resizeMode="cover"
          />
          <YStack width="100%" height="100%" alignItems="center" justifyContent="center">
            <Pressable onPress={clearImage}>
              <YStack
                backgroundColor="#00000099"
                borderRadius={100}
                padding="$4"
                alignSelf="center"
                testID="clear-image-button">
                <Feather size={28} name="x" color="#fff" />
              </YStack>
            </Pressable>
          </YStack>
        </ZStack>
      )}
    </ZStack>
  );
};

export default StreamPreviewImage;
