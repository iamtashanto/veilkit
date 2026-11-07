/**
 * Veilkit - Svelte Runes & Element Helpers
 */

import { SkeletonProps, SpinnerProps, ProgressProps, OverlayProps } from '../core/types';
import { createSkeletonElement, createSkeletonParagraph } from '../core/primitives';
import { createSpinner } from '../core/spinners';
import { createProgressElement } from '../core/progress';
import { overlayController } from '../core/overlay';

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
