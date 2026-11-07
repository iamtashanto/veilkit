/**
 * Veilkit - Svelte Runes & Element Helpers
 */

import { SkeletonProps, SpinnerProps, ProgressProps, OverlayProps } from '../core/types';
import { SkeletonProps, SpinnerProps, ProgressProps, OverlayProps, PresetProps, LoadingButtonProps } from '../core/types';
import { createSkeletonElement, createSkeletonParagraph } from '../core/primitives';
import { createPreset } from '../core/presets';
import { createSpinner } from '../core/spinners';
import { createProgressElement } from '../core/progress';
import { overlayController } from '../core/overlay';
import { wrapLoadingButton } from '../core/button';

export function skeletonAction(node: HTMLElement, props: SkeletonProps = {}) {
  const el = props.lines || (props.count && props.count > 1)
    ? createSkeletonParagraph(props.lines || props.count || 3, props)
    : createSkeletonElement(props);
  node.appendChild(el);
  return {
    destroy() {
      el.remove();
    },
  };
}

export function spinnerAction(node: HTMLElement, props: SpinnerProps = {}) {
  const el = createSpinner(props);
  node.appendChild(el);
  return {
    destroy() {
      el.remove();
    },
  };
}

export function progressAction(node: HTMLElement, props: ProgressProps = {}) {
  const el = createProgressElement(props);
  node.appendChild(el);
  return {
    destroy() {
      el.remove();
    },
  };
}

export function overlayAction(node: HTMLElement, props: OverlayProps = {}) {
  if (props.visible) {
    overlayController.show(node, props);
  }
  return {
    update(newProps: OverlayProps) {
      if (newProps.visible) {
        overlayController.show(node, newProps);
      } else {
        overlayController.hide(node);
      }
    },
    destroy() {
      overlayController.hide(node);
    },
  };
}

export function presetAction(node: HTMLElement, props: PresetProps) {
  const el = createPreset(props);
  node.appendChild(el);
  return {
    destroy() {
      el.remove();
    },
  };
}

export function loadingButtonAction(node: HTMLButtonElement, props: LoadingButtonProps = {}) {
  const controller = wrapLoadingButton(node, props);
  return {
    update(newProps: LoadingButtonProps) {
      if (newProps.status) {
        controller.setStatus(newProps.status, newProps.loadingText);
      } else {
        controller.setLoading(Boolean(newProps.loading), newProps.loadingText);
      }
    },
    destroy() {
      controller.destroy();
    },
  };
}
