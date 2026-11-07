import { describe, it, expect } from 'vitest';
import { progressController, createProgressElement } from '../../src/core/progress';

describe('Core - Progress', () => {
  it('should handle route progress start, set, inc, and done lifecycle', () => {
    progressController.start();
    expect(document.querySelector('.veil-progress-bar')).not.toBeNull();

    progressController.set(0.5);
    const bar = document.querySelector('.veil-progress-bar');
    expect(bar?.getAttribute('aria-valuenow')).toBe('50');

    progressController.inc(0.2);
    expect(bar?.getAttribute('aria-valuenow')).toBe('70');

    progressController.done();
  });

  it('should create determinate linear progress element', () => {
    const el = createProgressElement({ value: 65, height: 6, color: '#3b82f6' });
    expect(el.classList.contains('veil-progress-linear')).toBe(true);
    expect(el.getAttribute('aria-valuenow')).toBe('65');
  });

  it('should create circular progress element', () => {
    const el = createProgressElement({ circular: true, value: 40, showPercentage: true });
    expect(el.classList.contains('veil-progress-circular')).toBe(true);
    expect(el.querySelector('svg')).not.toBeNull();
    expect(el.textContent).toContain('40%');
  });
});
