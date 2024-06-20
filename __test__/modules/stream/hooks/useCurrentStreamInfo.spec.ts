import { renderHook } from '@testing-library/react-hooks';
import { useGetStream } from '../../../../src/api/stream/query/useGetStream';
import useAuth from '../../../../src/modules/auth/useAuth';
import useCurrentStreamInfo from '../../../../src/modules/stream/hooks/useCurrentStreamInfo';

// Mocking useGetStream
jest.mock('../../../../src/api/stream/query/useGetStream', () => ({
  useGetStream: jest.fn(),
}));

// Mocking useAuth
jest.mock('../../../../src/modules/auth/useAuth', () => () => ({
  user: {
    id: 'user123',
  },
}));

describe('useCurrentStreamInfo', () => {
  it('returns correct values when stream data is not available', () => {
    const streamId = '123';

    (useGetStream as unknown as jest.Mock).mockReturnValue({
      success: false,
      data: null,
      error: [],
    });

    const { result } = renderHook(() => useCurrentStreamInfo(streamId));

    expect(result.current).toEqual({
      id: null,
      streamerId: null,
      isStreamer: false,
      isViewer: false,
    });
  });

  it('returns correct values when stream data fetch fails', () => {
    const streamId = '123';

    (useGetStream as unknown as jest.Mock).mockReturnValue({
      success: false,
      data: null,
      error: [{ name: 'Stream not Found', msg: 'Stream not found', code: 404 }],
    });

    const { result } = renderHook(() => useCurrentStreamInfo(streamId));

    expect(result.current).toEqual({
      id: null,
      streamerId: null,
      isStreamer: false,
      isViewer: false,
    });
  });
});
