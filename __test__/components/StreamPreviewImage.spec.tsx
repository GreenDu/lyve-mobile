import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import StreamPreviewImage from '../../src/components/StreamPreviewImage'; // Adjust the path as necessary
import { customRender } from '../test_utils/customRender';

describe('StreamPreviewImage', () => {
  const handleAddImageMock = jest.fn();
  const clearImageMock = jest.fn();

  beforeEach(() => {
    handleAddImageMock.mockClear();
    clearImageMock.mockClear();
  });

  it('customRenders correctly without image', () => {
    const { getByTestId, queryByTestId } = customRender(
      <StreamPreviewImage
        uri={null}
        handleAddImage={handleAddImageMock}
        clearImage={clearImageMock}
      />
    );

    expect(queryByTestId('add-image-button')).toBeTruthy();
    expect(queryByTestId('clear-image-button')).toBeFalsy();
  });

  it('customRenders correctly with image', () => {
    const { getByTestId, queryByTestId } = customRender(
      <StreamPreviewImage
        uri="https://example.com/image.jpg"
        handleAddImage={handleAddImageMock}
        clearImage={clearImageMock}
      />
    );

    expect(queryByTestId('add-image-button')).toBeFalsy();
    expect(queryByTestId('clear-image-button')).toBeTruthy();
  });

  it('calls handleAddImage when add image button is pressed', () => {
    const { getByTestId } = customRender(
      <StreamPreviewImage
        uri={null}
        handleAddImage={handleAddImageMock}
        clearImage={clearImageMock}
      />
    );

    fireEvent.press(getByTestId('add-image-button'));
    expect(handleAddImageMock).toHaveBeenCalledTimes(1);
  });

  it('calls clearImage when clear image button is pressed', () => {
    const { getByTestId } = customRender(
      <StreamPreviewImage
        uri="https://example.com/image.jpg"
        handleAddImage={handleAddImageMock}
        clearImage={clearImageMock}
      />
    );

    fireEvent.press(getByTestId('clear-image-button'));
    expect(clearImageMock).toHaveBeenCalledTimes(1);
  });
});
