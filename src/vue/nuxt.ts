/**
 * Veilkit - Nuxt 3 Integration Recipe
 * Provides Nuxt plugin helper with SSR safety and route loading synchronization
 */

import { progressController } from '../core/progress';
import { injectStyles } from '../core/css';

export function defineNuxtVeilkit(nuxtApp: any) {
  if (typeof window !== 'undefined') {
    injectStyles();

    // Hook into Nuxt page navigation lifecycle if available
    if (nuxtApp?.hook) {
      nuxtApp.hook('page:start', () => {
        progressController.start();
      });
      nuxtApp.hook('page:finish', () => {
        progressController.done();
      });
    }
  }
}
