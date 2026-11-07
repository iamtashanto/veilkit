/**
 * Veilkit - Text Loader
 * Animated localized typing text with pulsing ellipsis dots
 */

import { TextLoaderProps } from './types';
import { getLabel, setLocale } from './a11y';
import { injectStyles } from './css';

export function createTextLoader(props: TextLoaderProps = {}): HTMLElement {
  injectStyles();

  if (props.locale) {
    setLocale(props.locale);
  }

  const container = document.createElement('span');
  container.className = `veil-text-loader ${props.className || ''}`.trim();
  container.setAttribute('role', 'status');
  container.setAttribute('aria-live', 'polite');

  const textNode = document.createElement('span');
  textNode.className = 'veil-text-loader-text';
  textNode.textContent = props.text || getLabel('loading');

  const dotsContainer = document.createElement('span');
  dotsContainer.className = 'veil-text-loader-dots';
  dotsContainer.setAttribute('aria-hidden', 'true');

  const count = props.dots || 3;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    dot.className = 'veil-typing-dot';
    dot.textContent = '.';
    dot.style.display = 'inline-block';
    dot.style.animation = 'veil-dot-pulse 1200ms infinite';
    dot.style.animationDelay = `${i * 200}ms`;
    dotsContainer.appendChild(dot);
  }

  container.append(textNode, dotsContainer);
  return container;
}
