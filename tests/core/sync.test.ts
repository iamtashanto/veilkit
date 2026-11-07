import { describe, it, expect } from 'vitest';
import { getSyncDelay, parseDurationMs } from '../../src/core/sync';

describe('Core - Sync Timeline', () => {
  it('should parse duration units correctly', () => {
    expect(parseDurationMs('1.5s')).toBe(1500);
    expect(parseDurationMs('800ms')).toBe(800);
    expect(parseDurationMs(2000)).toBe(2000);
    expect(parseDurationMs('')).toBe(1500);
  });

  it('should return a negative millisecond string for CSS animation-delay', () => {
    const delay = getSyncDelay(1500);
    expect(delay.startsWith('-')).toBe(true);
    expect(delay.endsWith('ms')).toBe(true);

    const val = parseInt(delay.replace('-', '').replace('ms', ''), 10);
    expect(val).toBeGreaterThanOrEqual(0);
    expect(val).toBeLessThan(1500);
  });
});
