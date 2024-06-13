import { useActionSheet, ActionSheetOptions } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import useCamera from './useCamera';
import useImagePicker from './useImagePicker';

const useCameraActionSheet = (
  imagePickerOpts?: ImagePicker.ImagePickerOptions | undefined,
  actionSheetOpts?: ActionSheetOptions | undefined
) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const { openCamera } = useCamera(imagePickerOpts);

  const { pickImage } = useImagePicker(imagePickerOpts);

  const [assets, setAssets] = useState<ImagePicker.ImagePickerAsset[] | null>(null);

  const show = async (): Promise<void> => {
    const options = ['Take Photo', 'Choose From Gallery', 'Cancel'];

    showActionSheetWithOptions(
      {
        ...actionSheetOpts,
        options,
        cancelButtonIndex: 2,
        title: 'Select Image',
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          // Take photo
          const result = await openCamera();

          setAssets(result);
        } else if (buttonIndex === 1) {
          // Pick from Gallery

          const result = await pickImage();

          setAssets(result);
        }
      }
    );
  };

  return { show, assets } as const;
};

export default useCameraActionSheet;
