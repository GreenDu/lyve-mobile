import React from 'react';

import RewardView from '../../../src/modules/reward/RewardView';
import { customRender } from '../../test_utils/customRender';

describe('RewardView Component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = customRender(<RewardView />);
    const rewardView = getByTestId('reward-view');
    expect(rewardView).toBeDefined();
  });
});
