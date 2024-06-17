import React from 'react';
import { customRender } from '../../test_utils/customRender';

import ChatInput from '../../../src/components/chat/ChatInput';

describe('ChatInput', () => {
  it('renders ChatInput', () => {
    const { getByPlaceholderText } = customRender(<ChatInput onPress={() => {}} />);

    expect(getByPlaceholderText('Say something...')).toBeTruthy();
  });
});
