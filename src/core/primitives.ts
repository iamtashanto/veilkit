/**
 * Veilkit - Skeleton Primitives
 * Primitives: line, paragraph, heading, circle, rect, image, button, badge, icon, input, table-row, divider
 */

import { SkeletonProps, VeilPrimitiveType } from './types';
import { injectStyles } from './css';
import { getSyncDelay, parseDurationMs } from './sync';
import { observeOffscreen } from './observer';

/**
 * Creates a DOM skeleton element with applied styles, classes, and synced timing
 */
export function createSkeletonElement(props: SkeletonProps = {}): HTMLElement {
  injectStyles();

  const el = document.createElement('div');
  el.className = `veil-skeleton ${props.className || ''}`.trim();
  el.setAttribute('aria-hidden', 'true');

  const shape = props.type || 'rect';
  el.setAttribute('data-veil-shape', shape);

  if (props.animation) {
    el.setAttribute('data-veil-anim', props.animation);
  }
  if (props.direction) {
    el.setAttribute('data-veil-dir', props.direction);
  }
  if (typeof props.theme === 'string') {
    el.setAttribute('data-veil-theme', props.theme);
  }

  // Style attributes
  if (props.width !== undefined) {
    el.style.width = typeof props.width === 'number' ? `${props.width}px` : props.width;
  }
  if (props.height !== undefined) {
    el.style.height = typeof props.height === 'number' ? `${props.height}px` : props.height;
  }
  if (props.radius !== undefined) {
    el.style.setProperty('--veil-radius', typeof props.radius === 'number' ? `${props.radius}px` : props.radius);
    el.style.borderRadius = typeof props.radius === 'number' ? `${props.radius}px` : props.radius;
  }
  if (props.speed !== undefined) {
    const durMs = parseDurationMs(props.speed);
    el.style.setProperty('--veil-duration', `${durMs}ms`);
    el.style.setProperty('--veil-sync-delay', getSyncDelay(durMs));
  } else {
    el.style.setProperty('--veil-sync-delay', getSyncDelay(1500));
  }

  if (props.style) {
    for (const [key, val] of Object.entries(props.style)) {
      (el.style as any)[key] = val;
    }
  }

  observeOffscreen(el);
  return el;
}

/**
 * Creates multiple lines of text with natural varied widths
 */
export function createSkeletonParagraph(lines: number = 3, props: SkeletonProps = {}): HTMLElement {
  const container = document.createElement('div');
  container.className = `veil-lines-group ${props.className || ''}`.trim();
  container.setAttribute('aria-hidden', 'true');

  const gap = props.gap !== undefined ? (typeof props.gap === 'number' ? `${props.gap}px` : props.gap) : '0.45rem';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = gap;

  const defaultWidths = ['100%', '94%', '88%', '75%'];
  const lastWidth = props.lastLineWidth !== undefined
    ? (typeof props.lastLineWidth === 'number' ? `${props.lastLineWidth}px` : props.lastLineWidth)
    : '65%';

  for (let i = 0; i < lines; i++) {
    const isLast = i === lines - 1;
    const width = isLast ? lastWidth : (defaultWidths[i % defaultWidths.length] || '95%');
    const lineEl = createSkeletonElement({
      ...props,
      type: 'line',
      width,
    });
    lineEl.style.setProperty('--veil-stagger-idx', String(i));
    container.appendChild(lineEl);
  }

  return container;
}

/**
 * Creates any primitive by type
 */
export function createPrimitive(type: VeilPrimitiveType, props: SkeletonProps = {}): HTMLElement {
  switch (type) {
    case 'paragraph':
      return createSkeletonParagraph(props.lines || 3, props);
    case 'line':
      return createSkeletonElement({ ...props, type: 'line' });
    case 'heading':
      return createSkeletonElement({ ...props, type: 'heading', width: props.width || '65%' });
    case 'circle':
      return createSkeletonElement({
        ...props,
        type: 'circle',
        width: props.width || props.height || '40px',
        height: props.height || props.width || '40px',
        radius: '50%',
      });
    case 'image':
      return createSkeletonElement({
        ...props,
        type: 'rect',
        width: props.width || '100%',
        height: props.height || '200px',
        radius: props.radius || '8px',
      });
    case 'button':
      return createSkeletonElement({
        ...props,
        type: 'button',
        width: props.width || '120px',
        height: props.height || '38px',
      });
    case 'badge':
      return createSkeletonElement({
        ...props,
        type: 'badge',
        width: props.width || '64px',
        height: props.height || '22px',
      });
    case 'icon':
      return createSkeletonElement({
        ...props,
        type: 'icon',
        width: props.width || '24px',
        height: props.height || '24px',
      });
    case 'input':
      return createSkeletonElement({
        ...props,
        type: 'input',
        width: props.width || '100%',
        height: props.height || '40px',
      });
    case 'divider':
      return createSkeletonElement({
        ...props,
        type: 'divider',
        width: '100%',
        height: '1px',
      });
    case 'table-row': {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.gap = '1rem';
      row.style.alignItems = 'center';
      row.style.width = '100%';
      row.style.padding = '0.5rem 0';
      const cols = props.count || 4;
      for (let i = 0; i < cols; i++) {
        const cell = createSkeletonElement({
          ...props,
          type: 'line',
          width: `${100 / cols}%`,
          height: '16px',
        });
        row.appendChild(cell);
      }
      return row;
    }
    default:
      return createSkeletonElement(props);
  }
}
