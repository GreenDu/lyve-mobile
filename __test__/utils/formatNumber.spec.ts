import { formatNumber } from '../../src/utils/formatNumber';

describe('formatNumber', () => {
  it('formats positive numbers correctly', () => {
    expect(formatNumber(1200)).toBe('1.2k');
    expect(formatNumber(12400)).toBe('12.4k');
    expect(formatNumber(1430000)).toBe('1.4M');
    expect(formatNumber(1234567890)).toBe('1.2B');
  });

  it('formats negative numbers correctly', () => {
    expect(formatNumber(-1200)).toBe('-1.2k');
    expect(formatNumber(-12400)).toBe('-12.4k');
    expect(formatNumber(-1430000)).toBe('-1.4M');
    expect(formatNumber(-1234567890)).toBe('-1.2B');
  });

  it('formats zero correctly', () => {
    expect(formatNumber(0)).toBe('0');
  });

  it('returns "0" for invalid inputs', () => {
    expect(formatNumber(NaN)).toBe('0');
    expect(formatNumber(null as unknown as number)).toBe('0');
    expect(formatNumber(undefined as unknown as number)).toBe('0');
  });

  it('works with very large numbers', () => {
    expect(formatNumber(1000000000000)).toBe('1T');
    expect(formatNumber(123456789012345)).toBe('123.5T');
  });

  it('works with very small numbers', () => {
    expect(formatNumber(0.001)).toBe('0');
    expect(formatNumber(0.0001)).toBe('0');
    expect(formatNumber(0.00001)).toBe('0');
  });
});
