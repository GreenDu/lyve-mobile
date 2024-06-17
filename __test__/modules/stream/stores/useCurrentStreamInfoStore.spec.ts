import { renderHook, act } from '@testing-library/react-hooks';
import { useCurrentStreamInfoStore } from '../../../../src/modules/stream/stores/useCurrentStreamInfoStore';

describe('useCurrentStreamInfoStore', () => {
  it('sets stream ID correctly', () => {
    const { result } = renderHook(() => useCurrentStreamInfoStore());

    act(() => {
      result.current.setId('123');
    });

    expect(result.current.id).toBe('123');
  });

  it('sets viewer count correctly', () => {
    const { result } = renderHook(() => useCurrentStreamInfoStore());

    act(() => {
      result.current.setViewerCount(100);
    });

    expect(result.current.viewerCount).toBe(100);
  });

  it('sets streamer info correctly', () => {
    const { result } = renderHook(() => useCurrentStreamInfoStore());
    const streamer = {
      id: '1',
      username: 'test',
      dispname: 'Test User',
      followerCount: 100,
      subscribed: true,
    };

    act(() => {
      result.current.setStreamer(streamer);
    });

    expect(result.current.streamer).toEqual(streamer);
  });

  it('sets active state correctly', () => {
    const { result } = renderHook(() => useCurrentStreamInfoStore());

    act(() => {
      result.current.setActive(true);
    });

    expect(result.current.active).toBe(true);
  });

  it('sets ended state correctly', () => {
    const { result } = renderHook(() => useCurrentStreamInfoStore());

    act(() => {
      result.current.setEnded(true);
    });

    expect(result.current.ended).toBe(true);
  });

  it('resets the store state correctly', () => {
    const { result } = renderHook(() => useCurrentStreamInfoStore());

    act(() => {
      result.current.setId('123');
      result.current.setViewerCount(100);
      result.current.setActive(true);
      result.current.setEnded(false);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.id).toBe('');
    expect(result.current.viewerCount).toBe(0);
    expect(result.current.active).toBe(false);
    expect(result.current.ended).toBe(false);
  });
});
