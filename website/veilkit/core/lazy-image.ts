/**
 * Veilkit - Lazy Image & Media Placeholder
 * Renders synchronized skeleton placeholder until image loads,
 * then reveals with smooth blur-up transition and handles error fallback.
 */

import { LazyImageProps } from './types';
import { createSkeletonElement } from './primitives';
import { injectStyles } from './css';

export function createLazyImage(props: LazyImageProps): HTMLElement {
  injectStyles();

  const container = document.createElement('div');
  container.className = `veil-lazy-img-wrap ${props.className || ''}`.trim();
  container.style.position = 'relative';
  container.style.display = 'inline-block';
  container.style.overflow = 'hidden';

  if (props.width) {
    container.style.width = typeof props.width === 'number' ? `${props.width}px` : props.width;
  }
  if (props.height) {
    container.style.height = typeof props.height === 'number' ? `${props.height}px` : props.height;
  }
  if (props.aspectRatio) {
    container.style.aspectRatio = String(props.aspectRatio);
  }
  if (props.radius) {
    const r = typeof props.radius === 'number' ? `${props.radius}px` : props.radius;
    container.style.borderRadius = r;
  }

  // Skeleton placeholder
  const skeleton = createSkeletonElement({
    animation: props.animation || 'shimmer',
    theme: props.theme,
    width: '100%',
    height: '100%',
    radius: props.radius,
  });
  skeleton.style.position = 'absolute';
  skeleton.style.inset = '0';
  container.appendChild(skeleton);

  // Real Image
  const img = document.createElement('img');
  img.alt = props.alt || '';
  img.className = 'veil-lazy-img veil-lazy-img-loading';
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  img.style.display = 'block';

  img.onload = () => {
    img.classList.remove('veil-lazy-img-loading');
    img.classList.add('veil-lazy-img-loaded');
    skeleton.style.opacity = '0';
    setTimeout(() => {
      skeleton.remove();
    }, 350);
    if (props.onLoad) props.onLoad();
  };

  img.onerror = (err) => {
    if (props.fallbackSrc && img.src !== props.fallbackSrc) {
      img.src = props.fallbackSrc;
    } else {
      skeleton.remove();
      container.style.backgroundColor = '#fee2e2';
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'center';
      container.textContent = '⚠️ Image failed to load';
    }
    if (props.onError) props.onError(err);
  };

  img.src = props.src;
  container.appendChild(img);

  return container;
}
