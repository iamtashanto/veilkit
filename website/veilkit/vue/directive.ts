import { Directive, DirectiveBinding } from 'vue';
import { createAutoMeasureOverlay } from '../core/measure';
import { injectStyles } from '../core/css';

interface VeilDirectiveState {
  overlayInstance?: ReturnType<typeof createAutoMeasureOverlay>;
}

const elementStateMap = new WeakMap<HTMLElement, VeilDirectiveState>();

export const vVeil: Directive<HTMLElement, boolean> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    injectStyles();
    const state: VeilDirectiveState = {};
    elementStateMap.set(el, state);

    if (binding.value) {
      state.overlayInstance = createAutoMeasureOverlay(el, {
        observeResize: true,
        observeMutations: true,
        reveal: 'fade',
      });
      el.setAttribute('aria-busy', 'true');
    }
  },

  updated(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    const state = elementStateMap.get(el);
    if (!state) return;

    if (binding.value && !state.overlayInstance) {
      state.overlayInstance = createAutoMeasureOverlay(el, {
        observeResize: true,
        observeMutations: true,
        reveal: 'fade',
      });
      el.setAttribute('aria-busy', 'true');
    } else if (!binding.value && state.overlayInstance) {
      state.overlayInstance.destroy();
      state.overlayInstance = undefined;
      el.removeAttribute('aria-busy');
    }
  },

  unmounted(el: HTMLElement) {
    const state = elementStateMap.get(el);
    if (state?.overlayInstance) {
      state.overlayInstance.destroy();
      state.overlayInstance = undefined;
    }
    elementStateMap.delete(el);
  },
};
