import { describe, it, expect } from 'vitest';
import { setupVisibilityObserver, observeOffscreen, teardownObservers } from '../../src/core/observer';

describe('Core - Performance Observers', () => {
  it('should initialize visibility change listeners safely', () => {
    setupVisibilityObserver();
    expect(document.documentElement).toBeDefined();
  });

  it('should register and unregister offscreen elements', () => {
    const el = document.createElement('div');
    const cleanup = observeOffscreen(el);
    expect(typeof cleanup).toBe('function');
    cleanup();
    teardownObservers();
  });
});
