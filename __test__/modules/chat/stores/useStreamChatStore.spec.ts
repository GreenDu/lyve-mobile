import { useStreamChatStore } from '../../../../src/modules/chat/stores/useStreamChatStore';

describe('useStreamChatStore', () => {
  afterEach(() => {
    // Clear the state after each test
    useStreamChatStore.getState().clearChat();
  });

  it('adds message correctly', () => {
    const testMessage = {
      id: '1',
      msg: 'Message 1',
      sender: { id: 'user1', username: 'John Doe', disname: 'John Doe', avatar_url: '' },
      created_at: '2024-06-17T12:00:00Z',
    };

    // Add message
    useStreamChatStore.getState().addMessage(testMessage);

    expect(useStreamChatStore.getState().messages).toHaveLength(1);
    expect(useStreamChatStore.getState().messages[0]).toEqual(testMessage);
  });

  it('clears chat correctly', () => {
    // Add some messages
    const testMessages = [
      {
        id: '1',
        msg: 'Message 1',
        sender: { id: 'user1', username: 'John Doe', disname: 'John Doe', avatar_url: '' },
        created_at: '2024-06-17T12:00:00Z',
      },
      {
        id: '2',
        msg: 'Message 2',
        sender: { id: 'user2', username: 'Alice', disname: 'Alice', avatar_url: '' },
        created_at: '2024-06-17T12:05:00Z',
      },
    ];
    useStreamChatStore.getState().setMessages(testMessages);

    // Clear chat
    useStreamChatStore.getState().clearChat();

    expect(useStreamChatStore.getState().messages).toHaveLength(0);
  });
});
