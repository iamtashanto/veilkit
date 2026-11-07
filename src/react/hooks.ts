'use client';

import { useState, useEffect, useCallback } from 'react';
import { AntiFlickerController } from '../core/antiflicker';
import { progressController } from '../core/progress';
import { loadingManager } from '../core/manager';

export interface UseDelayedLoadingOptions {
  delay?: number;
  minVisible?: number;
}

/**
 * Suppresses loading state if brief (delay) and prevents rapid flickering (minVisible)
 */
export function useDelayedLoading(
  loading: boolean,
  options: UseDelayedLoadingOptions = {},
): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const controller = new AntiFlickerController({
      delay: options.delay !== undefined ? options.delay : 150,
      minVisible: options.minVisible !== undefined ? options.minVisible : 300,
      onShow: () => setVisible(true),
      onHide: () => setVisible(false),
    });

    if (loading) {
      controller.start();
    } else {
      controller.finish();
    }

    return () => {
      controller.destroy();
    };
  }, [loading, options.delay, options.minVisible]);

  return visible;
}

/**
 * Tracks promise execution and returns state + execute trigger
 */
export function useLoading<T, Args extends any[]>(
  asyncFn: (...args: Args) => Promise<T>,
  options: UseDelayedLoadingOptions = {},
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const visibleLoading = useDelayedLoading(loading, options);

  const execute = useCallback(
    async (...args: Args): Promise<T> => {
      setLoading(true);
      setError(null);
      const reqId = loadingManager.start();

      try {
        const res = await asyncFn(...args);
        setData(res);
        return res;
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        loadingManager.stop(reqId);
        setLoading(false);
      }
    },
    [asyncFn],
  );

  return {
    loading: visibleLoading,
    rawLoading: loading,
    data,
    error,
    execute,
  };
}

/**
 * Controls top progress bar from React
 */
export function useProgress() {
  return {
    start: () => progressController.start(),
    set: (n: number) => progressController.set(n),
    inc: (amount?: number) => progressController.inc(amount),
    done: () => progressController.done(),
    fail: () => progressController.fail(),
  };
}
