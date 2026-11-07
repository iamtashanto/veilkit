/**
 * Veilkit - Svelte Action (`use:veil`)
 * Auto-measures and wraps element with animated skeleton overlay
 */

import { createAutoMeasureOverlay } from '../core/measure';
import { injectStyles } from '../core/css';

export interface SvelteVeilActionOptions {
  loading: boolean;
  cacheKey?: string;
  persistCache?: boolean;
  reveal?: 'fade' | 'blur-in' | 'slide-up' | 'scale' | 'none';
}

export function veil(node: HTMLElement, options: SvelteVeilActionOptions = { loading: false }) {
  injectStyles();
  let overlayInstance: ReturnType<typeof createAutoMeasureOverlay> | null = null;

  function apply(opts: SvelteVeilActionOptions) {
    if (opts.loading && !overlayInstance) {
      overlayInstance = createAutoMeasureOverlay(node, {
        cacheKey: opts.cacheKey,
        persistCache: opts.persistCache,
        reveal: opts.reveal,
      });
      node.setAttribute('aria-busy', 'true');
    } else if (!opts.loading && overlayInstance) {
      overlayInstance.destroy();
      overlayInstance = null;
      node.removeAttribute('aria-busy');
    }
  }

  apply(options);

  return {
    update(newOptions: SvelteVeilActionOptions) {
      apply(newOptions);
    },
    destroy() {
      if (overlayInstance) {
        overlayInstance.destroy();
        overlayInstance = null;
      }
    },
  };
}
