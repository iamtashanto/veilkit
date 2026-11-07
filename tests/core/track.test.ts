import { describe, it, expect } from 'vitest';
import { track, wrapFetch } from '../../src/core/track';
import { loadingManager } from '../../src/core/manager';

describe('Core - Track & wrapFetch', () => {
  it('should track async function and return result', async () => {
    const task = async () => {
      expect(loadingManager.isLoading()).toBe(true);
      return 'success';
    };

    const result = await track(task, { delay: 0, minVisible: 0 });
    expect(result).toBe('success');
    expect(loadingManager.isLoading()).toBe(false);
  });

  it('should wrap fetch without mutating global fetch', async () => {
    const mockFetch = async () => new Response('{"ok":true}', { status: 200 });
    const wrapped = wrapFetch(mockFetch as any, { delay: 0, minVisible: 0 });

    const response = await wrapped('https://api.example.com');
    expect(response.status).toBe(200);
  });
});
