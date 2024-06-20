import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import FollowStats from '../../../src/components/profile/FollowStats';
import { formatNumber } from '../../../src/utils/formatNumber';
import { customRender } from '../../test_utils/customRender';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

describe('FollowStats', () => {
  it('renders follower and following counts correctly', () => {
    const userId = 'testUserId';
    const followerCount = 1000;
    const followingCount = 500;

    const { getByText } = customRender(
      <FollowStats userId={userId} followerCount={followerCount} followingCount={followingCount} />
    );

    expect(getByText(formatNumber(followerCount))).toBeTruthy();
    expect(getByText(formatNumber(followingCount))).toBeTruthy();
  });

  it('navigates to correct paths when follower and following counts are pressed', () => {
    const userId = 'testUserId';
    const followerCount = 1000;
    const followingCount = 500;

    const { getByText } = customRender(
      <FollowStats userId={userId} followerCount={followerCount} followingCount={followingCount} />
    );

    const followerCountText = getByText(formatNumber(followerCount));
    const followingCountText = getByText(formatNumber(followingCount));

    fireEvent.press(followerCountText);
    fireEvent.press(followingCountText);

    expect(require('expo-router').router.push).toHaveBeenCalledWith(`/profile/${userId}/followers`);
    expect(require('expo-router').router.push).toHaveBeenCalledWith(`/profile/${userId}/following`);
  });
});
