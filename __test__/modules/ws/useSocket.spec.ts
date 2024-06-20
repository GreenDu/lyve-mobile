import { renderHook } from '@testing-library/react-hooks';

import useSocket from '.../../../src/modules/ws/useSocket';
import React from 'react';

// Mock the socket object
const mockSocket = { connected: true };

describe('useSocket', () => {
  it('should throw error if used outside WebSocketProvider', () => {
    // Mock useContext to return null outside of WebSocketProvider
    jest.spyOn(React, 'useContext').mockReturnValue(null);

    // Render the hook
    const { result } = renderHook(() => useSocket());

    // Expect an error to be thrown
    expect(result.error).toEqual(new Error('useSocket must be used within an WebSocketProvider'));
  });

  it('should return socket context', () => {
    // Mock useContext to return socket object within WebSocketProvider
    jest.spyOn(React, 'useContext').mockReturnValue({ socket: mockSocket });

    // Render the hook
    const { result } = renderHook(() => useSocket());

    // Expect the hook to return the socket context
    expect(result.current).toEqual({ socket: mockSocket });
  });
});
