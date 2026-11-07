/**
 * Veilkit - Web Components & Custom Elements (`veilkit/element`)
 * Universal custom elements for Solid, Qwik, HTMX, Astro, Blade, plain HTML
 */

import { injectStyles } from '../core/css';
import { createSkeletonElement, createSkeletonParagraph } from '../core/primitives';
import { createSpinner } from '../core/spinners';
import { createProgressElement } from '../core/progress';
import { overlayController } from '../core/overlay';
import { wrapLoadingButton } from '../core/button';
import {
  VeilPrimitiveType,
  VeilAnimationName,
  VeilThemeName,
  VeilSpinnerType,
} from '../core/types';

export class VeilSkeletonElement extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'width', 'height', 'radius', 'lines', 'animation', 'theme', 'circle'];
  }

  connectedCallback() {
    injectStyles();
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    this.innerHTML = '';
    const type = (this.getAttribute('type') as VeilPrimitiveType) || 'rect';
    const lines = this.getAttribute('lines') ? parseInt(this.getAttribute('lines')!, 10) : undefined;
    const width = this.getAttribute('width') || undefined;
    const height = this.getAttribute('height') || undefined;
    const radius = this.getAttribute('radius') || undefined;
    const animation = (this.getAttribute('animation') as VeilAnimationName) || 'shimmer';
    const theme = (this.getAttribute('theme') as VeilThemeName) || 'light';
    const circle = this.hasAttribute('circle');

    const shape = circle ? 'circle' : type;

    const el = lines
      ? createSkeletonParagraph(lines, { width, animation, theme })
      : createSkeletonElement({
          type: shape,
          width,
          height,
          radius,
          animation,
          theme,
        });

    this.appendChild(el);
  }
}

export class VeilSpinnerElement extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'size', 'color'];
  }

  connectedCallback() {
    injectStyles();
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    this.innerHTML = '';
    const type = (this.getAttribute('type') as VeilSpinnerType) || 'ring';
    const size = this.getAttribute('size') || '28px';
    const color = this.getAttribute('color') || undefined;

    const el = createSpinner({ type, size, color });
    this.appendChild(el);
  }
}

export class VeilProgressElement extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'circular', 'size', 'color'];
  }

  connectedCallback() {
    injectStyles();
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    this.innerHTML = '';
    const value = this.getAttribute('value') ? parseFloat(this.getAttribute('value')!) : undefined;
    const circular = this.hasAttribute('circular');
    const size = this.getAttribute('size') || undefined;
    const color = this.getAttribute('color') || undefined;

    const el = createProgressElement({ value, circular, size, color });
    this.appendChild(el);
  }
}

export class VeilOverlayElement extends HTMLElement {
  static get observedAttributes() {
    return ['visible', 'message', 'blur'];
  }

  connectedCallback() {
    injectStyles();
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  private update() {
    const visible = this.hasAttribute('visible') && this.getAttribute('visible') !== 'false';
    const message = this.getAttribute('message') || undefined;
    const blur = this.getAttribute('blur') !== 'false';

    if (visible) {
      overlayController.show(this, { message, blur });
    } else {
      overlayController.hide(this);
    }
  }

  disconnectedCallback() {
    overlayController.hide(this);
  }
}

export class VeilLoadingButtonElement extends HTMLElement {
  private btnController: ReturnType<typeof wrapLoadingButton> | null = null;

  static get observedAttributes() {
    return ['loading', 'loading-text'];
  }

  connectedCallback() {
    injectStyles();
    const btn = this.querySelector('button');
    if (btn) {
      this.btnController = wrapLoadingButton(btn, {
        loading: this.hasAttribute('loading'),
        loadingText: this.getAttribute('loading-text') || undefined,
      });
    }
  }

  attributeChangedCallback(name: string) {
    if (name === 'loading' && this.btnController) {
      const loading = this.hasAttribute('loading') && this.getAttribute('loading') !== 'false';
      this.btnController.setLoading(loading, this.getAttribute('loading-text') || undefined);
    }
  }

  disconnectedCallback() {
    if (this.btnController) {
      this.btnController.destroy();
      this.btnController = null;
    }
  }
}

/**
 * Registers all Veilkit custom elements
 */
export function defineVeilElements(): void {
  if (typeof window === 'undefined' || typeof customElements === 'undefined') return;

  if (!customElements.get('veil-skeleton')) {
    customElements.define('veil-skeleton', VeilSkeletonElement);
  }
  if (!customElements.get('veil-spinner')) {
    customElements.define('veil-spinner', VeilSpinnerElement);
  }
  if (!customElements.get('veil-progress')) {
    customElements.define('veil-progress', VeilProgressElement);
  }
  if (!customElements.get('veil-overlay')) {
    customElements.define('veil-overlay', VeilOverlayElement);
  }
  if (!customElements.get('veil-loading-button')) {
    customElements.define('veil-loading-button', VeilLoadingButtonElement);
  }
}

// Auto-define when imported in a browser environment
if (typeof window !== 'undefined') {
  defineVeilElements();
}
