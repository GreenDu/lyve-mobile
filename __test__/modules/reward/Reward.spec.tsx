import React from 'react';
import Reward from '../../../src/modules/reward/Reward';
import { customRender } from '../../test_utils/customRender';
import { RewardType } from '../../../src/modules/reward/types';

describe('Reward Component', () => {
  const mockData = {
    reward: { id: 'rewardId', type: 'popsicle' as RewardType, points: 1 },
    sender: { id: 'senderId', username: 'John Doe', dispname: 'John Doe', avatar_url: '' },
    msg: 'Congratulations!',
    receiver: { id: 'senderId2', username: 'Alice', dispname: 'Alice', avatar_url: '' },
  };

  it('renders correctly with given props', () => {
    const { getByText, getByTestId } = customRender(<Reward data={mockData} color="#FF5733" />);

    // Check if the sender's display name is rendered
    expect(getByText('John Doe sent you a reward')).toBeTruthy();

    // Check if the message is rendered
    expect(getByText('Congratulations!')).toBeTruthy();

    // Check if the image is rendered with the correct source
    const image = getByTestId('reward-image');
    expect(image.props.source).toBeDefined();
  });
});
