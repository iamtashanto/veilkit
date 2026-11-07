/**
 * Veilkit - Auto-Measure Skeleton Engine
 * Dynamically measures real DOM trees, generates matching skeleton overlays,
 * updates on resize/mutation, and supports instant layout caching.
 */

import { AutoMeasureOptions, SkeletonProps } from './types';
import { createSkeletonElement } from './primitives';
import { applyReveal } from './reveal';

export interface LeafBox {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: string;
  shape: 'circle' | 'rect' | 'line';
}

export interface CachedLayout {
  width: number;
  height: number;
  boxes: LeafBox[];
}

const memoryLayoutCache = new Map<string, CachedLayout>();

/**
 * Retrieve cached layout by key
 */
export function getCachedLayout(cacheKey: string): CachedLayout | null {
  if (memoryLayoutCache.has(cacheKey)) {
    return memoryLayoutCache.get(cacheKey)!;
  }
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = localStorage.getItem(`veil_cache_${cacheKey}`);
      if (stored) {
        const parsed = JSON.parse(stored) as CachedLayout;
        memoryLayoutCache.set(cacheKey, parsed);
        return parsed;
      }
    } catch {
      // Storage unavailable or quota exceeded
    }
  }
  return null;
}

/**
 * Store layout in cache
 */
export function setCachedLayout(cacheKey: string, layout: CachedLayout, persist: boolean = false): void {
  memoryLayoutCache.set(cacheKey, layout);
  if (persist && typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(`veil_cache_${cacheKey}`, JSON.stringify(layout));
    } catch {
      // Storage unavailable
    }
  }
}

/**
 * Measures the leaf elements of a container DOM tree
 */
export function measureContainer(container: HTMLElement, ignoreSelector?: string): CachedLayout {
  const containerRect = container.getBoundingClientRect();
  const boxes: LeafBox[] = [];

  function isLeafOrTarget(el: HTMLElement): boolean {
    if (el.hasAttribute('data-veil-ignore')) return false;
    if (ignoreSelector && el.matches(ignoreSelector)) return false;

    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return false;
    }

    const tag = el.tagName.toLowerCase();
    if (['img', 'svg', 'button', 'input', 'textarea', 'select'].includes(tag)) {
      return true;
    }

    if (el.hasAttribute('data-veil-shape')) {
      return true;
    }

    // Has text nodes and no child elements
    const hasOnlyText = Array.from(el.childNodes).some((n) => n.nodeType === Node.TEXT_NODE && (n.textContent || '').trim().length > 0) &&
      el.children.length === 0;

    return hasOnlyText;
  }

  function walk(node: HTMLElement) {
    if (node !== container && isLeafOrTarget(node)) {
      const rect = node.getBoundingClientRect();
      if (rect.width > 2 && rect.height > 2) {
        const computed = window.getComputedStyle(node);
        const radius = computed.borderRadius || '6px';
        const customShape = node.getAttribute('data-veil-shape');

        let shape: 'circle' | 'rect' | 'line' = 'rect';
        if (customShape === 'circle' || radius === '50%' || (radius.includes('px') && parseFloat(radius) >= rect.width / 2)) {
          shape = 'circle';
        } else if (customShape === 'line' || ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'label'].includes(node.tagName.toLowerCase())) {
          shape = 'line';
        }

        boxes.push({
          x: Math.round(rect.left - containerRect.left),
          y: Math.round(rect.top - containerRect.top),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          radius,
          shape,
        });
      }
      return;
    }

    const children = Array.from(node.children) as HTMLElement[];
    for (const child of children) {
      if (!child.hasAttribute('data-veil-ignore')) {
        walk(child);
      }
    }
  }

  walk(container);

  return {
    width: Math.round(containerRect.width),
    height: Math.round(containerRect.height),
    boxes,
  };
}

/**
 * Creates and attaches an auto-measured skeleton overlay to a container
 */
export function createAutoMeasureOverlay(
  container: HTMLElement,
  options: AutoMeasureOptions = {},
  skeletonProps: SkeletonProps = {},
): {
  overlay: HTMLElement;
  refresh: () => void;
  destroy: () => void;
} {
  const overlay = document.createElement('div');
  overlay.className = 'veil-auto-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.pointerEvents = 'none';
  overlay.style.zIndex = '5';

  if (!options.preserveBackground) {
    const computed = window.getComputedStyle(container);
    overlay.style.backgroundColor = computed.backgroundColor !== 'rgba(0, 0, 0, 0)' ? computed.backgroundColor : 'transparent';
  }

  function renderLayout(layout: CachedLayout) {
    overlay.innerHTML = '';
    for (let i = 0; i < layout.boxes.length; i++) {
      const box = layout.boxes[i]!;
      const el = createSkeletonElement({
        ...skeletonProps,
        type: box.shape,
        radius: box.radius,
      });
      el.style.position = 'absolute';
      el.style.left = `${box.x}px`;
      el.style.top = `${box.y}px`;
      el.style.width = `${box.width}px`;
      el.style.height = `${box.height}px`;
      el.style.setProperty('--veil-stagger-idx', String(i));
      overlay.appendChild(el);
    }
  }

  function update() {
    const layout = measureContainer(container, options.ignoreSelector);
    if (layout.boxes.length > 0) {
      renderLayout(layout);
      if (options.cacheKey) {
        setCachedLayout(options.cacheKey, layout, options.persistCache);
      }
    }
  }

  // Check cache first for instant repeat render
  if (options.cacheKey) {
    const cached = getCachedLayout(options.cacheKey);
    if (cached) {
      renderLayout(cached);
    }
  }

  // Ensure container has relative positioning
  const compPos = window.getComputedStyle(container).position;
  if (compPos === 'static') {
    container.style.position = 'relative';
  }

  container.appendChild(overlay);

  // If no cache hit, measure immediately
  if (overlay.children.length === 0) {
    update();
  }

  let ro: ResizeObserver | null = null;
  let mo: MutationObserver | null = null;

  if (options.observeResize !== false && typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(() => update());
    ro.observe(container);
  }

  if (options.observeMutations !== false && typeof MutationObserver !== 'undefined') {
    mo = new MutationObserver(() => update());
    mo.observe(container, { childList: true, subtree: true, attributes: false });
  }

  return {
    overlay,
    refresh: update,
    destroy: () => {
      if (ro) ro.disconnect();
      if (mo) mo.disconnect();
      if (options.reveal && options.reveal !== 'none') {
        applyReveal(container, {
          transition: options.reveal,
          duration: options.revealDuration,
          easing: options.revealEasing,
          onComplete: () => overlay.remove(),
        });
      } else {
        overlay.remove();
      }
    },
  };
}
