/**
 * Veilkit - Request Tracker & Fetch Wrapper
 * Automatic loading state tracking with anti-flicker and error resilience
 */

import { loadingManager } from './manager';
import { AntiFlickerController } from './antiflicker';
import { progressController } from './progress';
import { overlayController } from './overlay';

export interface TrackOptions {
  id?: string;
  delay?: number;
  minVisible?: number;
  overlay?: boolean;
  target?: HTMLElement | string;
  progress?: boolean;
  onStart?: () => void;
  onFinish?: () => void;
}

/**
 * Tracks a Promise or async function, updating loading states automatically
 */
export async function track<T>(
  task: Promise<T> | (() => Promise<T>),
  options: TrackOptions = {},
): Promise<T> {
  const reqId = loadingManager.start(options.id);

  if (options.progress) {
    progressController.start();
  }

  const antiFlicker = new AntiFlickerController({
    delay: options.delay !== undefined ? options.delay : 150,
    minVisible: options.minVisible !== undefined ? options.minVisible : 300,
    onShow: () => {
      if (options.overlay) {
        overlayController.show(options.target);
      }
      if (options.onStart) options.onStart();
    },
    onHide: () => {
      if (options.overlay) {
        overlayController.hide(options.target);
      }
      if (options.onFinish) options.onFinish();
    },
  });

  antiFlicker.start();

  try {
    const promise = typeof task === 'function' ? task() : task;
    const result = await promise;
    return result;
  } catch (error) {
    if (options.progress) {
      progressController.fail();
    }
    throw error;
  } finally {
    loadingManager.stop(reqId);
    if (options.progress) {
      progressController.done();
    }
    antiFlicker.finish();
  }
}

/**
 * Opt-in fetch wrapper that tracks HTTP requests automatically
 * (Never patches global fetch by default)
 */
export function wrapFetch(
  fetchFn: typeof fetch = typeof window !== 'undefined' ? window.fetch.bind(window) : (fetch as any),
  options: TrackOptions = {},
): typeof fetch {
  return async function wrappedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    return track(() => fetchFn(input, init), options);
  };
}
