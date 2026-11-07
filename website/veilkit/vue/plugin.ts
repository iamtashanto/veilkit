import { App } from 'vue';
import { VeilGlobalConfig } from '../core/types';
import veil from '../core/controller';
import { vVeil } from './directive';
import {
  VSkeleton,
  VVeil,
  VSpinner,
  VProgressBar,
  VOverlay,
  VLoadingButton,
  VLazyImage,
} from './components';

export const veilkitPlugin = {
  install(app: App, options: VeilGlobalConfig = {}) {
    veil.configure(options);

    // Register directive
    app.directive('veil', vVeil);

    // Register components globally
    app.component('VSkeleton', VSkeleton);
    app.component('VVeil', VVeil);
    app.component('VSpinner', VSpinner);
    app.component('VProgressBar', VProgressBar);
    app.component('VOverlay', VOverlay);
    app.component('VLoadingButton', VLoadingButton);
    app.component('VLazyImage', VLazyImage);

    // Provide globally
    app.config.globalProperties.$veil = veil;
    app.provide('veil', veil);
  },
};
