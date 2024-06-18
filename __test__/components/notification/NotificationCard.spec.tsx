import moment from 'moment';
import React from 'react';

import NotificationCard from '../../../src/components/notification/NotificationCard'; // adjust the path as necessary
import { customRender } from '../../test_utils/customRender';

describe('NotificationCard', () => {
  const notification = {
    type: 'NEW_FOLLOWER',
    message: 'You have a new follower!',
    created_at: moment().subtract(1, 'hour').toISOString(),
  };

  it('renders correctly with the given notification data', () => {
    const { getByText } = customRender(<NotificationCard notification={notification} />);

    expect(getByText('You have a new follower!')).toBeTruthy();
    expect(getByText(/an hour ago/i)).toBeTruthy();
  });
});
