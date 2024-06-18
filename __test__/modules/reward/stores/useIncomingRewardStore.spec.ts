import { renderHook, act } from '@testing-library/react-hooks';
import { useIncomingRewardStore } from '../../../../src/modules/reward/stores/useIncomingRewardStore';
import { IncomingReward, RewardType } from '../../../../src/modules/reward/types';

describe('useIncomingRewardStore', () => {
  afterEach(() => {
    const { result } = renderHook(() => useIncomingRewardStore());
    const { rewardQueue } = result.current;
    // Dequeue all elements in the reward queue
    rewardQueue.forEach(() => {
      act(() => {
        result.current.dequeue();
      });
    });
  });
  it('adds a reward to the queue', () => {
    const { result } = renderHook(() => useIncomingRewardStore());
    const { add } = result.current;

    const reward = {
      reward: { id: 'rewardId', type: 'popsicle' as RewardType, points: 1 },
      sender: { id: 'senderId', username: 'John Doe', dispname: 'John Doe', avatar_url: '' },
      msg: 'Congratulations!',
      receiver: { id: 'senderId2', username: 'Alice', dispname: 'Alice', avatar_url: '' },
    } as IncomingReward;

    act(() => {
      add(reward);
    });

    expect(result.current.rewardQueue).toHaveLength(1);
    expect(result.current.rewardQueue[0]).toEqual(reward);
  });

  it('dequeues a reward from the queue', () => {
    const { result } = renderHook(() => useIncomingRewardStore());
    const { add, dequeue } = result.current;

    const rewards = [
      {
        reward: { id: 'rewardId', type: 'popsicle' as RewardType, points: 1 },
        sender: { id: 'senderId', username: 'John Doe', dispname: 'John Doe', avatar_url: '' },
        msg: 'Congratulations!',
        receiver: { id: 'senderId2', username: 'Alice', dispname: 'Alice', avatar_url: '' },
      },
      {
        reward: { id: 'rewardId2', type: 'bouquet' as RewardType, points: 1 },
        sender: { id: 'senderId', username: 'John Doe', dispname: 'John Doe', avatar_url: '' },
        msg: 'Congratulations!',
        receiver: { id: 'senderId2', username: 'Alice', dispname: 'Alice', avatar_url: '' },
      },
    ] as IncomingReward[];

    // Add some rewards to the queue
    act(() => {
      add(rewards[0]);
      add(rewards[1]);
    });

    // Dequeue one reward
    act(() => {
      dequeue();
    });

    expect(result.current.rewardQueue).toHaveLength(1);
    expect(result.current.rewardQueue[0]).toEqual(rewards[1]);
  });

  it('dequeues nothing when the queue is empty', () => {
    const { result } = renderHook(() => useIncomingRewardStore());
    const { dequeue } = result.current;

    act(() => {
      dequeue(); // Attempt to dequeue when the queue is empty
    });

    expect(result.current.rewardQueue).toHaveLength(0);
  });
});
