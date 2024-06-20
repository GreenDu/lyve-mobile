import React from 'react';

import SwitchButton from '../../src/components/SwitchButton';
import { customRender } from '../test_utils/customRender';

describe('SwitchButton', () => {
  it('renders without errors', () => {
    const { getByText } = customRender(
      <SwitchButton states={['State1', 'State2']} onStateChange={() => {}} />
    );
    expect(getByText('State1')).toBeTruthy();
    expect(getByText('State2')).toBeTruthy();
  });
});
