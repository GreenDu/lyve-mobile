import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import StreamChatList from '../../../src/modules/chat/StreamChatList';
import { useStreamChatStore } from '../../../src/modules/chat/stores/useStreamChatStore';
import { customRender } from '../../test_utils/customRender';

// Mock the useStreamChatStore hook
jest.mock('../../../src/modules/chat/stores/useStreamChatStore');

describe('StreamChatList', () => {
  const messages = [
    { id: '1', msg: 'Hello', created_at: '2022-01-01T12:00:00.000Z' },
    { id: '2', msg: 'Hi', created_at: '2022-01-01T12:01:00.000Z' },
    { id: '3', msg: 'Hey', created_at: '2022-01-01T12:02:00.000Z' },
  ];

  beforeEach(() => {
    (useStreamChatStore as unknown as jest.Mock).mockReturnValue({ messages });
  });

  it('renders chat messages', () => {
    const { getByText } = customRender(<StreamChatList />);

    messages.forEach(({ msg }) => {
      expect(getByText(msg)).toBeTruthy();
    });
  });

  it('renders chat list', () => {
    const { getByTestId } = customRender(<StreamChatList />);

    expect(getByTestId('chat-list')).toBeDefined();
  });
});
