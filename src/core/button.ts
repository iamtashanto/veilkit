/**
 * Veilkit - Loading Button Controller
 * Inline spinner, preserves exact button dimensions to prevent layout shifts,
 * disables clicks, and applies aria-disabled state.
 */

import { LoadingButtonProps } from './types';
import { createSpinner } from './spinners';
import { injectStyles } from './css';

export function wrapLoadingButton(
  buttonEl: HTMLButtonElement,
  props: LoadingButtonProps = {},
): {
  setLoading: (loading: boolean, loadingText?: string) => void;
  destroy: () => void;
} {
  injectStyles();

  let originalWidth: string = '';
  let originalHeight: string = '';
  let originalContent: Node[] = [];
  let spinnerWrapper: HTMLElement | null = null;
  let textNode: Text | null = null;

  function setLoading(loading: boolean, loadingText?: string) {
    if (loading) {
      if (!buttonEl.classList.contains('veil-btn-loading')) {
        const rect = buttonEl.getBoundingClientRect();
        originalWidth = buttonEl.style.width;
        originalHeight = buttonEl.style.height;

        // Lock button dimension to prevent layout shifts
        if (rect.width > 0) {
          buttonEl.style.width = `${rect.width}px`;
        }
        if (rect.height > 0) {
          buttonEl.style.height = `${rect.height}px`;
        }

        buttonEl.classList.add('veil-btn-loading');
        buttonEl.setAttribute('aria-disabled', 'true');
        buttonEl.setAttribute('aria-busy', 'true');

        if (props.spinnerPlacement === 'replace') {
          originalContent = Array.from(buttonEl.childNodes);
          buttonEl.innerHTML = '';
          const spinner = createSpinner({ type: props.spinner || 'ring', size: 18, color: 'currentColor' });
          buttonEl.appendChild(spinner);
        } else {
          // Prepend spinner
          spinnerWrapper = document.createElement('span');
          spinnerWrapper.className = 'veil-btn-spinner-wrap';
          const spinner = createSpinner({ type: props.spinner || 'ring', size: 16, color: 'currentColor' });
          spinnerWrapper.appendChild(spinner);
          buttonEl.insertBefore(spinnerWrapper, buttonEl.firstChild);

          if (loadingText || props.loadingText) {
            textNode = document.createTextNode(` ${loadingText || props.loadingText}`);
            buttonEl.appendChild(textNode);
          }
        }
      }
    } else {
      if (buttonEl.classList.contains('veil-btn-loading')) {
        buttonEl.classList.remove('veil-btn-loading');
        buttonEl.removeAttribute('aria-disabled');
        buttonEl.removeAttribute('aria-busy');

        buttonEl.style.width = originalWidth;
        buttonEl.style.height = originalHeight;

        if (props.spinnerPlacement === 'replace') {
          buttonEl.innerHTML = '';
          for (const node of originalContent) {
            buttonEl.appendChild(node);
          }
          originalContent = [];
        } else {
          if (spinnerWrapper) {
            spinnerWrapper.remove();
            spinnerWrapper = null;
          }
          if (textNode) {
            textNode.remove();
            textNode = null;
          }
        }
      }
    }
  }

  if (props.loading) {
    setLoading(true, props.loadingText);
  }

  return {
    setLoading,
    destroy: () => setLoading(false),
  };
}
