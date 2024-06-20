import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import { useRewardModalStore } from '../../../../src/modules/reward/stores/useRewardModalStore';

describe('useRewardModalStore', () => {
  afterEach(() => {
    act(() => {
      useRewardModalStore.getState().close();
    });
  });

  it('should have initial state of visible as false', () => {
    const { result } = renderHook(() => useRewardModalStore());
    expect(result.current.visible).toBe(false);
  });

  it('should open modal', () => {
    const { result } = renderHook(() => useRewardModalStore());
    act(() => {
      result.current.open();
    });
    expect(result.current.visible).toBe(true);
  });

  it('should close modal', () => {
    const { result } = renderHook(() => useRewardModalStore());
    act(() => {
      result.current.open();
    });
    expect(result.current.visible).toBe(true);

    act(() => {
      result.current.close();
    });
    expect(result.current.visible).toBe(false);
  });
});
