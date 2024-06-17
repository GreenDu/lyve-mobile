import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import GenrePicker from '../../../src/modules/stream/GenrePicker';
import { customRender } from '../../test_utils/customRender';

describe('GenrePicker', () => {
  const genres = [
    { text: 'Action', color: 'red', selected: false },
    { text: 'Adventure', color: 'blue', selected: true },
    { text: 'Sci-Fi', color: 'green', selected: false },
  ];

  it('renders correctly', () => {
    const handlePress = jest.fn();
    const { getByText } = customRender(<GenrePicker genres={genres} handlePress={handlePress} />);

    expect(getByText('Action')).toBeTruthy();
    expect(getByText('Adventure')).toBeTruthy();
    expect(getByText('Sci-Fi')).toBeTruthy();
  });

  it('calls handlePress with correct index when a genre is pressed', () => {
    const handlePress = jest.fn();
    const { getByText } = customRender(<GenrePicker genres={genres} handlePress={handlePress} />);

    fireEvent.press(getByText('Action'));
    expect(handlePress).toHaveBeenCalledWith(0);

    fireEvent.press(getByText('Adventure'));
    expect(handlePress).toHaveBeenCalledWith(1);

    fireEvent.press(getByText('Sci-Fi'));
    expect(handlePress).toHaveBeenCalledWith(2);
  });
});
