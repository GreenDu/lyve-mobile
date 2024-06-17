import { renderHook, act } from '@testing-library/react-hooks';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import useCamera from '../../src/hooks/useCamera'; // Adjust the path to where your hook is located

jest.mock('expo-constants', () => ({
  platform: { ios: true },
}));

jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  requestCameraPermissionsAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
  MediaTypeOptions: {
    Images: 'Images',
  },
}));

const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

const alertMock = jest.fn();

beforeAll(() => {
  global.alert = alertMock;
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useCamera', () => {
  it('requests permissions on mount and shows alert if not granted', async () => {
    (ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });
    (ImagePicker.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });

    renderHook(() => useCamera());

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

    renderHook(() => useCamera());

    await act(async () => {});

    expect(ImagePicker.requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
    expect(ImagePicker.requestCameraPermissionsAsync).toHaveBeenCalled();
    expect(alertMock).not.toHaveBeenCalled();
  });

  it('opens the camera with the correct options', async () => {
    const mockResult = { canceled: false, assets: [{ uri: 'test-uri' }] };
    (ImagePicker.launchCameraAsync as jest.Mock).mockResolvedValue(mockResult);

    const { result } = renderHook(() => useCamera());

    let assets;
    await act(async () => {
      assets = await result.current.openCamera();
    });

    expect(ImagePicker.launchCameraAsync).toHaveBeenCalledWith({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 0,
    });
    expect(assets).toEqual(mockResult.assets);
  });

  it('returns null if camera launch is canceled', async () => {
    const mockResult = { canceled: true };
    (ImagePicker.launchCameraAsync as jest.Mock).mockResolvedValue(mockResult);

    const { result } = renderHook(() => useCamera());

    let assets;
    await act(async () => {
      assets = await result.current.openCamera();
    });

    expect(ImagePicker.launchCameraAsync).toHaveBeenCalled();
    expect(assets).toBeNull();
  });

  it('returns null if there is an error launching the camera', async () => {
    (ImagePicker.launchCameraAsync as jest.Mock).mockRejectedValue(new Error('Test error'));

    const { result } = renderHook(() => useCamera());

    let assets;
    await act(async () => {
      assets = await result.current.openCamera();
    });

    expect(ImagePicker.launchCameraAsync).toHaveBeenCalled();
    expect(assets).toBeNull();
  });
});
