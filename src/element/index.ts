/**
 * Veilkit - Web Components & Custom Elements (`veilkit/element`)
 * Universal custom elements for Solid, Qwik, HTMX, Astro, Blade, plain HTML
 */

import { injectStyles } from '../core/css';
import { createSkeletonElement, createSkeletonParagraph } from '../core/primitives';
import { createPreset } from '../core/presets';
import { createSpinner } from '../core/spinners';
import { createProgressElement } from '../core/progress';
import { overlayController } from '../core/overlay';
import { wrapLoadingButton } from '../core/button';
import {
  VeilPrimitiveType,
  VeilAnimationName,
  VeilThemeName,
  VeilSpinnerType,
  VeilPresetName,
  VeilShapeStyle,
  ButtonStatus,
  ButtonLoadingStyle,
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

export class VeilPresetElement extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'items', 'columns', 'shape', 'animation', 'theme', 'width'];
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
    const name = (this.getAttribute('name') as VeilPresetName) || 'card';
    const items = this.getAttribute('items') ? parseInt(this.getAttribute('items')!, 10) : undefined;
    const columns = this.getAttribute('columns') ? parseInt(this.getAttribute('columns')!, 10) : undefined;
    const shape = (this.getAttribute('shape') as VeilShapeStyle) || 'rounded';
    const animation = (this.getAttribute('animation') as VeilAnimationName) || 'shimmer';
    const theme = (this.getAttribute('theme') as VeilThemeName) || 'light';
    const width = this.getAttribute('width') || undefined;

    const el = createPreset({
      name,
      items,
      columns,
      shape,
      animation,
      theme,
      width,
    });
    this.appendChild(el);
  }
}

export class VeilSpinnerElement extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'size', 'color', 'secondary-color', 'speed', 'glass', 'label'];
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
    const secondaryColor = this.getAttribute('secondary-color') || undefined;
    const speed = this.getAttribute('speed') || undefined;
    const glass = this.hasAttribute('glass');
    const label = this.getAttribute('label') || undefined;

    const el = createSpinner({ type, size, color, secondaryColor, speed, glass, label });
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
    return ['status', 'loading', 'style-type', 'spinner', 'loading-text', 'success-text', 'error-text', 'reset-after'];
  }

  connectedCallback() {
    injectStyles();
    const btn = this.querySelector('button');
    if (btn) {
      this.btnController = wrapLoadingButton(btn, {
        status: (this.getAttribute('status') as ButtonStatus) || undefined,
        loading: this.hasAttribute('loading'),
        styleType: (this.getAttribute('style-type') as ButtonLoadingStyle) || 'spinner-left',
        spinner: (this.getAttribute('spinner') as VeilSpinnerType) || 'ring',
        loadingText: this.getAttribute('loading-text') || undefined,
        successText: this.getAttribute('success-text') || undefined,
        errorText: this.getAttribute('error-text') || undefined,
        resetAfter: this.getAttribute('reset-after') ? parseInt(this.getAttribute('reset-after')!, 10) : 2000,
      });
    }
  }

  attributeChangedCallback(name: string) {
    if (!this.btnController) return;
    if (name === 'status') {
      const status = this.getAttribute('status') as ButtonStatus;
      if (status) this.btnController.setStatus(status, this.getAttribute('loading-text') || undefined);
    } else if (name === 'loading') {
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
  if (!customElements.get('veil-preset')) {
    customElements.define('veil-preset', VeilPresetElement);
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
