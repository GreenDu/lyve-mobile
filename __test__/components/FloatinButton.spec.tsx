import React from 'react';
import FloatingButton from '../../src/components/FloatingButton';

import { customRender } from '../test_utils/customRender';

describe('FloatingButton', () => {
  it('renders with correct props', () => {
    const { getByTestId } = customRender(<FloatingButton testID="floating-button" />);

    expect(getByTestId('floating-button')).toBeTruthy();
  });
});
