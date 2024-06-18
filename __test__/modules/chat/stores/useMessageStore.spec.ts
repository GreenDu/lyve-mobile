import { useMessageStore } from '../../../../src/modules/chat/stores/useMessageStore';

describe('useMessageStore', () => {
  afterEach(() => {
    // Clear the state after each test
    useMessageStore.getState().clear();
  });

  it('sets message correctly', () => {
    const testMessage = 'Test message';

    // Set message
    useMessageStore.getState().setMessage(testMessage);

    expect(useMessageStore.getState().message).toBe(testMessage);
  });

  it('clears message correctly', () => {
    // Set initial message
    useMessageStore.getState().setMessage('Initial message');

    // Clear message
    useMessageStore.getState().clear();

    expect(useMessageStore.getState().message).toBe('');
  });
});
