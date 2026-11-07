import { describe, it, expect } from 'vitest';
import { wrapLoadingButton } from '../../src/core/button';

describe('Core - Loading Button', () => {
  it('should toggle loading state and inject spinner without shift', () => {
    const btn = document.createElement('button');
    btn.textContent = 'Submit';
    document.body.appendChild(btn);

    const controller = wrapLoadingButton(btn, { loadingText: 'Submitting…' });

    controller.setLoading(true);
    expect(btn.classList.contains('veil-btn-loading')).toBe(true);
    expect(btn.getAttribute('aria-disabled')).toBe('true');
    expect(btn.getAttribute('aria-busy')).toBe('true');
    expect(btn.querySelector('.veil-spinner')).not.toBeNull();
    expect(btn.textContent).toContain('Submitting…');

    controller.setLoading(false);
    expect(btn.classList.contains('veil-btn-loading')).toBe(false);
    expect(btn.getAttribute('aria-disabled')).toBeNull();
    expect(btn.querySelector('.veil-spinner')).toBeNull();
  });
});
