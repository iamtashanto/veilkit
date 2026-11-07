/**
 * Veilkit - SvelteKit Route Progress Integration
 */

import { progressController } from '../core/progress';

export function setupSvelteKitProgress(beforeNavigate?: (cb: any) => void, afterNavigate?: (cb: any) => void) {
  if (typeof window === 'undefined') return;

  if (beforeNavigate && afterNavigate) {
    beforeNavigate(() => {
      progressController.start();
    });

    afterNavigate(() => {
      progressController.done();
    });
  }
}
