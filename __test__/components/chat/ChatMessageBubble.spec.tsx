import React from 'react';
import { customRender } from '../../test_utils/customRender';

import ChatMessageBubble from '../../../src/components/chat/ChatMessageBubble';

describe('ChatMessageBubble', () => {
  it('renders ChatMessageBubble type ChatMessage', () => {
    const { getByText } = customRender(
      <ChatMessageBubble
        message={{
          id: 'id',
          msg: 'Hey',
          sender: {
            id: 'user id',
            username: 'username',
            dispname: 'dispname',
            avatar_url: '',
          },
          created_at: new Date().toString(),
        }}
        opacity={1.0}
      />
    );

    expect(getByText('Hey')).toBeTruthy();
  });

  it('renders ChatMessageBubble type EventInfoMessage', () => {
    const { getByText } = customRender(
      <ChatMessageBubble
        message={{
          id: 'id',
          msg: 'EventInfo',
          created_at: new Date().toString(),
        }}
        opacity={1.0}
      />
    );

    expect(getByText('EventInfo')).toBeTruthy();
  });
});
