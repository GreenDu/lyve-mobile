import React from 'react';
import { customRender } from '../../test_utils/customRender';
import GenreBadge from '../../../src/components/genre/GenreBadge';
import GenreBadgeGroup from '../../../src/components/genre/GenreBadgeGroup';

describe('GenreBadgeGroup', () => {
  it('renders GenreBadgeGroup and children', () => {
    const { getAllByTestId } = customRender(
      <GenreBadgeGroup>
        <GenreBadge testID="nature-badge" size="small" text="Nature 🌳" />
        <GenreBadge testID="gaming-badge" size="small" text="Gaming 🎮" />
      </GenreBadgeGroup>
    );

    expect(getAllByTestId('nature-badge').length).toEqual(1);
    expect(getAllByTestId('gaming-badge').length).toEqual(1);
  });
});
