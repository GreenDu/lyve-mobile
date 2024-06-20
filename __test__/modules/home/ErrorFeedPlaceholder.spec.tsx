import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import ErrorFeedPlaceholder from '../../../src/modules/home/ErrorFeedPlaceholder';
import { customRender } from '../../test_utils/customRender';

describe('ErrorFeedPlaceholder', () => {
  it('renders correctly', () => {
    const { getByText } = customRender(<ErrorFeedPlaceholder onRetry={() => {}} />);

    // Check if error message is rendered
    expect(getByText('Error Loading Feed')).toBeDefined();

    // Check if retry button is rendered
    expect(getByText('Retry')).toBeDefined();
  });

  it('calls onRetry when retry button is pressed', () => {
    const onRetryMock = jest.fn();
    const { getByText } = customRender(<ErrorFeedPlaceholder onRetry={onRetryMock} />);

    // Press the retry button
    fireEvent.press(getByText('Retry'));

    // Check if onRetry function is called
    expect(onRetryMock).toHaveBeenCalled();
  });
});
