import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import HomeHeader from '../../../src/modules/home/HomeHeader';
import { customRender } from '../../test_utils/customRender';

// Mock useAuth hook
jest.mock('../../../src/modules/auth/useAuth', () => () => ({
  user: {
    avatar_url: 'https://example.com/avatar.jpg',
  },
}));

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
  },
}));

describe('HomeHeader', () => {
  it('renders correctly', () => {
    const { getByTestId } = customRender(<HomeHeader />);

    expect(getByTestId('avatar')).toBeDefined();

    // Check if notification button is rendered
    expect(getByTestId('notification-button')).toBeDefined();

    // Check if search button is rendered
    expect(getByTestId('search-button')).toBeDefined();
  });

  it('navigates to /notification when notification button is pressed', () => {
    const { getByTestId } = render(<HomeHeader />);
    fireEvent.press(getByTestId('notification-button'));
    expect(require('expo-router').router.navigate).toHaveBeenCalledWith('/notification');
  });

  it('navigates to /search when search button is pressed', () => {
    const { getByTestId } = render(<HomeHeader />);
    fireEvent.press(getByTestId('search-button'));
    expect(require('expo-router').router.navigate).toHaveBeenCalledWith('/search');
  });
});
