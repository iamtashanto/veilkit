import { describe, it, expect } from 'vitest';
import { createSpinner, SPINNER_TYPES } from '../../src/core/spinners';

describe('Core - Spinners', () => {
  it('should generate all 30 spinner types', () => {
    expect(SPINNER_TYPES.length).toBe(30);

    for (const type of SPINNER_TYPES) {
      const el = createSpinner({ type, size: 32, color: '#10b981', glass: true, speed: '1000ms' });
      expect(el).toBeInstanceOf(HTMLElement);
      expect(el.classList.contains('veil-spinner')).toBe(true);
      expect(el.classList.contains(`veil-spinner-${type}`)).toBe(true);
      expect(el.classList.contains('veil-spinner-glass')).toBe(true);
      expect(el.getAttribute('role')).toBe('status');
      expect(el.style.width).toBe('32px');
    }
  });
});
