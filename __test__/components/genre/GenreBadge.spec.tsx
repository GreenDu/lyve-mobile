import React from 'react';
import { customRender } from '../../test_utils/customRender';
import GenreBadge from '../../../src/components/genre/GenreBadge';

describe('GenreBadge', () => {
  it('renders GenreBadge size=mediul correctly', () => {
    const { getByText } = customRender(<GenreBadge size="medium" text="Nature 🌳" />);

    expect(getByText('Nature 🌳')).toBeTruthy();
  });

  it('renders GenreBadge size=small correctly', () => {
    const { getByText } = customRender(<GenreBadge size="small" text="Nature 🌳" />);

    expect(getByText('🌳')).toBeTruthy();
  });
});
