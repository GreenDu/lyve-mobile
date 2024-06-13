import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';

const useCamera = (opts?: ImagePicker.ImagePickerOptions | undefined) => {
  useEffect(() => {
    (async () => {
      if (Constants.platform!.ios) {
        const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraRollStatus.status !== 'granted' || cameraStatus.status !== 'granted') {
          alert('Sorry, we need these permissions to make this work!');
        }
      }
    })();
  }, []);

  const openCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        allowsMultipleSelection: false,
        quality: 0,
        ...opts,
      });

      if (!result.canceled) {
        return result.assets;
      }

      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return { openCamera } as const;
};

export default useCamera;
