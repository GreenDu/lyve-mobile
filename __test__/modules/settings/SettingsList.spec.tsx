import { fireEvent } from '@testing-library/react-native';
import React from 'react';

import useAuth from '../../../src/modules/auth/useAuth';
import SettingsList from '../../../src/modules/settings/SettingsList'; // Adjust the path as necessary
import { settingSectionsMap } from '../../../src/modules/settings/settings'; // Adjust the path as necessary
import { customRender } from '../../test_utils/customRender';

// Mock the useAuth hook
jest.mock('@modules/auth/useAuth', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('SettingsList', () => {
  const mockSignOut = jest.fn();
  const originalConsoleLog = console.log;

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ signOut: mockSignOut });
    console.log = jest.fn(); // Mock console.log
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.log = originalConsoleLog; // Restore console.log
  });
  it('renders all settings sections and items correctly', () => {
    const { getByTestId } = customRender(<SettingsList />);

    Object.entries(settingSectionsMap).forEach(([key, items]) => {
      // Check if the section header is rendered
      expect(getByTestId(`${key}-header`)).toBeTruthy();

      // Check if all items in the section are rendered
      items.forEach((item) => {
        expect(getByTestId(`${item}-button`)).toBeTruthy();
      });
    });
  });

  it('triggers the correct action on item press', () => {
    const { getByTestId } = customRender(<SettingsList />);

    Object.entries(settingSectionsMap).forEach(([_, items]) => {
      items.forEach((item) => {
        // Trigger the onPress event
        fireEvent.press(getByTestId(`${item}-button`));

        // Check console log or signOut action
        if (item === 'Logout') {
          expect(mockSignOut).toHaveBeenCalled();
        } else {
          expect(console.log).toHaveBeenCalled();
        }
      });
    });
  });
});
