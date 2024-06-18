import { renderHook, act } from '@testing-library/react-hooks';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import useImagePicker from '../../src/hooks/useImagePicker'; // Adjust the path to where your hook is located

jest.mock('expo-constants', () => ({
  platform: { ios: true },
}));

jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  requestCameraPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: {
    Images: 'Images',
  },
}));

const alertMock = jest.fn();
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

beforeAll(() => {
  global.alert = alertMock;
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useImagePicker', () => {
  it('requests permissions on mount and shows alert if not granted', async () => {
    (ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });
    (ImagePicker.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });

    renderHook(() => useImagePicker());

    await act(async () => {});

    expect(ImagePicker.requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
    expect(ImagePicker.requestCameraPermissionsAsync).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith('Sorry, we need these permissions to make this work!');
  });

  it('does not show alert if permissions are granted', async () => {
    (ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });
    (ImagePicker.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    renderHook(() => useImagePicker());

    await act(async () => {});

    expect(ImagePicker.requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
    expect(ImagePicker.requestCameraPermissionsAsync).toHaveBeenCalled();
    expect(alertMock).not.toHaveBeenCalled();
  });

  it('opens the image library with the correct options', async () => {
    const mockResult = { canceled: false, assets: [{ uri: 'test-uri' }] };
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue(mockResult);

    const { result } = renderHook(() => useImagePicker());

    let assets;
    await act(async () => {
      assets = await result.current.pickImage();
    });

    expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalledWith({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 0,
    });
    expect(assets).toEqual(mockResult.assets);
  });

  it('returns null if image picking is canceled', async () => {
    const mockResult = { canceled: true };
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue(mockResult);

    const { result } = renderHook(() => useImagePicker());

    let assets;
    await act(async () => {
      assets = await result.current.pickImage();
    });

    expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled();
    expect(assets).toBeNull();
  });

  it('returns null if there is an error picking the image', async () => {
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockRejectedValue(new Error('Test error'));

    const { result } = renderHook(() => useImagePicker());

    let assets;
    await act(async () => {
      assets = await result.current.pickImage();
    });

    expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled();
    expect(assets).toBeNull();
  });
});
