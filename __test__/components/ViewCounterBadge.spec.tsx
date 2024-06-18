import React from 'react';
import ViewCounterBadge from '../../src/components/ViewCounterBadge';
import { customRender } from '../test_utils/customRender';

describe('ViewCounterBadge', () => {
  it('renders with default props', () => {
    const { getByText } = customRender(<ViewCounterBadge count={1000} />);

    // Check if count is displayed properly
    expect(getByText('1k')).toBeDefined();
  });

  it('renders with normal size', () => {
    const { getByTestId } = customRender(<ViewCounterBadge count={1000} size="normal" />);

    // Check if the badge has a normal size
    const badge = getByTestId('viewerCounterBadge');
    expect(badge.props.style.width).toBe(72);
    expect(badge.props.style.height).toBe(26);
  });

  it('renders with small size', () => {
    const { getByTestId } = customRender(<ViewCounterBadge count={1000} size="small" />);

    // Check if the badge has a small size
    const badge = getByTestId('viewerCounterBadge');
    expect(badge.props.style.width).toBe(41);
    expect(badge.props.style.height).toBe(26);
  });
});
