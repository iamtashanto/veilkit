import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AntiFlickerController } from '../../src/core/antiflicker';

describe('Core - AntiFlickerController', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should not show loader if finish is called before delay expires', () => {
    const onShow = vi.fn();
    const onHide = vi.fn();

    const controller = new AntiFlickerController({
      delay: 150,
      minVisible: 300,
      onShow,
      onHide,
    });

    controller.start();
    // Fast response after 50ms (less than delay of 150ms)
    vi.advanceTimersByTime(50);
    controller.finish();

    vi.advanceTimersByTime(400);

    expect(onShow).not.toHaveBeenCalled();
    expect(onHide).not.toHaveBeenCalled();
  });

  it('should show loader once delay is reached and enforce minVisible before hiding', () => {
    const onShow = vi.fn();
    const onHide = vi.fn();

    const controller = new AntiFlickerController({
      delay: 150,
      minVisible: 300,
      onShow,
      onHide,
    });

    controller.start();

    // Advance 150ms to trigger delay
    vi.advanceTimersByTime(150);
    expect(onShow).toHaveBeenCalledTimes(1);

    // Call finish 50ms after shown
    vi.advanceTimersByTime(50);
    controller.finish();

    // Should NOT hide yet, because 300 - 50 = 250ms remains
    expect(onHide).not.toHaveBeenCalled();

    // Advance 249ms
    vi.advanceTimersByTime(249);
    expect(onHide).not.toHaveBeenCalled();

    // Advance the last 1ms
    vi.advanceTimersByTime(1);
    expect(onHide).toHaveBeenCalledTimes(1);
  });

  it('should hide immediately if operation took longer than minVisible', () => {
    const onShow = vi.fn();
    const onHide = vi.fn();

    const controller = new AntiFlickerController({
      delay: 100,
      minVisible: 200,
      onShow,
      onHide,
    });

    controller.start();
    vi.advanceTimersByTime(100); // shown
    expect(onShow).toHaveBeenCalled();

    vi.advanceTimersByTime(500); // 500ms has elapsed (> 200ms)
    controller.finish();

    expect(onHide).toHaveBeenCalledTimes(1);
  });
});
