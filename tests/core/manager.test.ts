import { describe, it, expect } from 'vitest';
import { loadingManager } from '../../src/core/manager';

describe('Core - LoadingManager', () => {
  it('should manage concurrent request counters and notifications', () => {
    loadingManager.reset();
    expect(loadingManager.isLoading()).toBe(false);
    expect(loadingManager.getCount()).toBe(0);

    const states: boolean[] = [];
    const unsubscribe = loadingManager.subscribe((isLoading) => {
      states.push(isLoading);
    });

    const req1 = loadingManager.start();
    const req2 = loadingManager.start();

    expect(loadingManager.isLoading()).toBe(true);
    expect(loadingManager.getCount()).toBe(2);

    loadingManager.stop(req1);
    expect(loadingManager.isLoading()).toBe(true);
    expect(loadingManager.getCount()).toBe(1);

    loadingManager.stop(req2);
    expect(loadingManager.isLoading()).toBe(false);
    expect(loadingManager.getCount()).toBe(0);

    unsubscribe();
  });
});
