/**
 * Veilkit - Loading Overlay System
 * Container-level and fullscreen blurred frosted overlays with spinner and message.
 */

import { OverlayProps } from './types';
import { injectStyles } from './css';
import { createSpinner } from './spinners';
import { applyA11yLoading, removeA11yLoading } from './a11y';

const activeOverlays = new Map<HTMLElement, HTMLElement>();
let scrollLockOriginalOverflow: string = '';

export class OverlayController {
  /**
   * Shows a loading overlay over a container element or fullscreen
   */
  public show(target?: HTMLElement | string, props: OverlayProps = {}): HTMLElement {
    injectStyles();

    let container: HTMLElement;
    const isFullscreen = !target;

    if (isFullscreen) {
      container = document.body;
    } else if (typeof target === 'string') {
      container = document.querySelector(target) as HTMLElement;
      if (!container) container = document.body;
    } else {
      container = target;
    }

    if (activeOverlays.has(container)) {
      return activeOverlays.get(container)!;
    }

    const overlay = document.createElement('div');
    overlay.className = `veil-overlay ${isFullscreen ? 'veil-overlay-fullscreen' : ''} ${props.className || ''}`.trim();
    overlay.setAttribute('role', 'status');

    if (props.color) {
      overlay.style.setProperty('--veil-overlay-bg', props.color);
    }
    if (props.blur !== undefined) {
      const blurVal = typeof props.blur === 'boolean' ? (props.blur ? '8px' : '0px') : props.blur;
      overlay.style.setProperty('--veil-overlay-blur', blurVal);
    }
    if (props.zIndex !== undefined) {
      overlay.style.zIndex = String(props.zIndex);
    }

    // Spinner
    if (props.spinner !== false) {
      const spinnerType = typeof props.spinner === 'string' ? props.spinner : 'ring';
      const spinnerEl = createSpinner({ type: spinnerType, size: 36 });
      overlay.appendChild(spinnerEl);
    }

    // Message
    if (props.message) {
      const msg = document.createElement('span');
      msg.className = 'veil-overlay-message';
      msg.style.fontSize = '14px';
      msg.style.fontWeight = '500';
      msg.style.color = 'var(--veil-contrast, #1f2937)';
      msg.textContent = props.message;
      overlay.appendChild(msg);
    }

    if (!isFullscreen) {
      const compPos = window.getComputedStyle(container).position;
      if (compPos === 'static') {
        container.style.position = 'relative';
      }
    }

    applyA11yLoading(container, props.message);

    if (props.lockScroll && isFullscreen && typeof document !== 'undefined') {
      scrollLockOriginalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }

    container.appendChild(overlay);
    activeOverlays.set(container, overlay);

    return overlay;
  }

  /**
   * Hides and removes the overlay
   */
  public hide(target?: HTMLElement | string): void {
    let container: HTMLElement;
    const isFullscreen = !target;

    if (isFullscreen) {
      container = document.body;
    } else if (typeof target === 'string') {
      container = document.querySelector(target) as HTMLElement;
      if (!container) container = document.body;
    } else {
      container = target;
    }

    const overlay = activeOverlays.get(container);
    if (!overlay) return;

    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.remove();
      activeOverlays.delete(container);
      removeA11yLoading(container);

      if (isFullscreen && scrollLockOriginalOverflow !== undefined) {
        document.body.style.overflow = scrollLockOriginalOverflow;
      }
    }, 200);
  }
}

export const overlayController = new OverlayController();
