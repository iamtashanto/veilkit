/**
 * Veilkit - Imperative & Global API
 * Single unified interface for controlling loading states across any environment.
 */

import {
  VeilGlobalConfig,
  SkeletonProps,
  SkeletonController,
  SpinnerProps,
  AutoMeasureOptions,
} from './types';
import { injectStyles, setNonce } from './css';
import { createSkeletonElement, createPrimitive } from './primitives';
import { createPreset } from './presets';
import { createSpinner } from './spinners';
import { overlayController } from './overlay';
import { progressController } from './progress';
import { createAutoMeasureOverlay } from './measure';
import { loadingManager } from './manager';
import { track, wrapFetch } from './track';
import { setLocale, setLabels } from './a11y';
import { createTheme, getThemeTokens } from './themes';

export class VeilkitController {
  private config: VeilGlobalConfig = {};

  /**
   * Configure global defaults for themes, animations, anti-flicker, CSP nonce, and a11y
   */
  public configure(config: VeilGlobalConfig): void {
    Object.assign(this.config, config);
    if (config.nonce) {
      setNonce(config.nonce);
    }
    if (config.locale) {
      setLocale(config.locale);
    }
    if (config.labels) {
      setLabels(config.labels);
    }
    injectStyles(config.nonce);
  }

  /**
   * Mounts a skeleton controller onto an element with show/hide/update/destroy methods
   */
  public skeleton(target: HTMLElement | string, options: SkeletonProps & AutoMeasureOptions = {}): SkeletonController {
    injectStyles();

    const element = typeof target === 'string'
      ? (document.querySelector(target) as HTMLElement)
      : target;

    if (!element) {
      throw new Error(`[Veilkit] Target element not found for skeleton.`);
    }

    let measureInstance: { overlay: HTMLElement; refresh: () => void; destroy: () => void } | null = null;
    let isShowing = false;

    const show = () => {
      if (isShowing) return;
      isShowing = true;
      element.setAttribute('aria-busy', 'true');
      measureInstance = createAutoMeasureOverlay(element, options, options);
    };

    const hide = () => {
      if (!isShowing) return;
      isShowing = false;
      element.removeAttribute('aria-busy');
      if (measureInstance) {
        measureInstance.destroy();
        measureInstance = null;
      }
    };

    const update = (props: Partial<SkeletonProps>) => {
      Object.assign(options, props);
      if (measureInstance) {
        measureInstance.refresh();
      }
    };

    const destroy = () => {
      hide();
    };

    // Auto-show by default
    show();

    return {
      element,
      show,
      hide,
      update,
      destroy,
    };
  }

  /**
   * Injects a spinner into a target element
   */
  public spinner(target: HTMLElement | string, props: SpinnerProps = {}): HTMLElement {
    const el = typeof target === 'string'
      ? (document.querySelector(target) as HTMLElement)
      : target;

    const spinner = createSpinner(props);
    if (el) {
      el.appendChild(spinner);
    }
    return spinner;
  }

  // Subsystem controllers
  public overlay = overlayController;
  public progress = progressController;
  public manager = loadingManager;
  public track = track;
  public wrapFetch = wrapFetch;
  public setLocale = setLocale;
  public setLabels = setLabels;
  public createTheme = createTheme;
  public getThemeTokens = getThemeTokens;

  // DOM primitives & presets factories
  public createSkeleton = createSkeletonElement;
  public createPrimitive = createPrimitive;
  public createPreset = createPreset;
}

export const veil = new VeilkitController();
export default veil;
