import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmptyFeedPlaceholder from '../../../src/modules/home/EmptyFeedPlaceholder';
import { customRender } from '../../test_utils/customRender';

describe('EmptyFeedPlaceholder', () => {
  it('renders correctly', () => {
    const { getByText } = customRender(<EmptyFeedPlaceholder onRefresh={() => {}} />);

    // Check if "No feed available" message is rendered
    expect(getByText('No feed available')).toBeDefined();

    // Check if "Refresh Feed" button is rendered
    expect(getByText('Refresh Feed')).toBeDefined();
  });

  it('calls onRefresh when "Refresh Feed" button is pressed', () => {
    const onRefreshMock = jest.fn();
    const { getByText } = customRender(<EmptyFeedPlaceholder onRefresh={onRefreshMock} />);

    // Press the "Refresh Feed" button
    fireEvent.press(getByText('Refresh Feed'));

    // Check if onRefresh function is called
    expect(onRefreshMock).toHaveBeenCalled();
  });
});
