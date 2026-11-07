import { describe, it, expect } from 'vitest';
import { wrapLoadingButton } from '../../src/core/button';
import { describe, it, expect, vi } from 'vitest';
import { wrapLoadingButton, BUTTON_LOADING_STYLES } from '../../src/core/button';

describe('Core - Loading Button', () => {
  it('should toggle loading state and inject spinner without shift', () => {
  it('should have all 16 loading styles registered', () => {
    expect(BUTTON_LOADING_STYLES.length).toBe(16);
  });

  it('should toggle loading state and inject spinner without layout shift', () => {
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

    btn.remove();
  });

  it('should execute state machine idle -> loading -> success -> idle with auto-reset', async () => {
    vi.useFakeTimers();
    const btn = document.createElement('button');
    btn.textContent = 'Save';
    document.body.appendChild(btn);

    const statusHistory: string[] = [];
    const controller = wrapLoadingButton(btn, {
      resetAfter: 500,
      onStatusChange: (s) => statusHistory.push(s),
    });

    expect(controller.getStatus()).toBe('idle');

    controller.setStatus('loading');
    expect(controller.getStatus()).toBe('loading');
    expect(btn.classList.contains('veil-btn-loading')).toBe(true);
    expect(btn.getAttribute('aria-busy')).toBe('true');

    controller.setStatus('success');
    expect(controller.getStatus()).toBe('success');
    expect(btn.classList.contains('veil-btn-success')).toBe(true);
    expect(btn.querySelector('svg')).not.toBeNull(); // checkmark svg

    // Advance timer to trigger auto-reset back to idle
    vi.advanceTimersByTime(500);
    expect(controller.getStatus()).toBe('idle');
    expect(btn.classList.contains('veil-btn-success')).toBe(false);
    expect(btn.textContent).toBe('Save');

    expect(statusHistory).toEqual(['loading', 'success', 'idle']);

    controller.destroy();
    btn.remove();
    vi.useRealTimers();
  });

  it('should execute state machine idle -> loading -> error with shake and auto-reset', () => {
    vi.useFakeTimers();
    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    document.body.appendChild(btn);

    const controller = wrapLoadingButton(btn, {
      resetAfter: 300,
      resultAnimation: 'shake',
    });

    controller.setStatus('error', 'Error Occurred');
    expect(controller.getStatus()).toBe('error');
    expect(btn.classList.contains('veil-btn-error')).toBe(true);
    expect(btn.classList.contains('veil-btn-shake')).toBe(true);
    expect(btn.textContent).toContain('Error Occurred');

    vi.advanceTimersByTime(300);
    expect(controller.getStatus()).toBe('idle');

    controller.destroy();
    btn.remove();
    vi.useRealTimers();
  });

  it('should auto-drive states with promise and ignore double-clicks while busy', async () => {
    const btn = document.createElement('button');
    btn.textContent = 'Submit';
    document.body.appendChild(btn);

    let resolvePromise: (value: any) => void;
    let executionCount = 0;

    const fakeAsyncCall = () => {
      executionCount++;
      return new Promise((resolve) => {
        resolvePromise = resolve;
      });
    };

    const controller = wrapLoadingButton(btn, {
      onClick: fakeAsyncCall,
      resetAfter: 100,
    });

    // First click
    btn.click();
    expect(executionCount).toBe(1);
    expect(controller.getStatus()).toBe('loading');

    // Second click while loading (should be IGNORED!)
    btn.click();
    expect(executionCount).toBe(1);

    // Resolve the promise
    resolvePromise!({ ok: true });
    await Promise.resolve();

    expect(controller.getStatus()).toBe('success');

    controller.destroy();
    btn.remove();
  });

  it('should render all 16 loading styles correctly', () => {
    for (const styleType of BUTTON_LOADING_STYLES) {
      const btn = document.createElement('button');
      btn.textContent = 'Action';
      document.body.appendChild(btn);

      const controller = wrapLoadingButton(btn, { styleType });
      controller.setStatus('loading');

      expect(btn.classList.contains('veil-btn-loading')).toBe(true);
      expect(btn.children.length).toBeGreaterThan(0);

      controller.destroy();
      btn.remove();
    }
  });

  it('should support press feedback ripple and press-scale', () => {
    const btn = document.createElement('button');
    btn.textContent = 'Click';
    document.body.appendChild(btn);

    const controller = wrapLoadingButton(btn, { pressFeedback: 'ripple' });
    btn.click();

    expect(btn.querySelector('.veil-btn-ripple')).not.toBeNull();

    controller.destroy();
    btn.remove();
  });
});
