/**
 * Veilkit - Reveal Transitions Engine
 * Seamless skeleton -> content reveal transitions:
 * fade, blur-in, slide-up, scale, stagger-children, none
 */

import { VeilRevealTransition } from './types';

export interface RevealOptions {
  transition?: VeilRevealTransition;
  duration?: number; // ms
  easing?: string;
  onComplete?: () => void;
}

export function applyReveal(element: HTMLElement, options: RevealOptions = {}): void {
  const transition = options.transition || 'fade';
  if (transition === 'none') {
    if (options.onComplete) options.onComplete();
    return;
  }

  element.classList.add('veil-revealing');

  if (transition === 'stagger-children') {
    const children = Array.from(element.children) as HTMLElement[];
    children.forEach((child, idx) => {
      child.classList.add('veil-reveal-fade');
      child.style.animationDelay = `${idx * 60}ms`;
      if (options.duration) {
        child.style.animationDuration = `${options.duration}ms`;
      }
    });

    const totalDuration = (options.duration || 350) + (children.length * 60);
    setTimeout(() => {
      element.classList.remove('veil-revealing');
      children.forEach((child) => {
        child.classList.remove('veil-reveal-fade');
        child.style.removeProperty('animation-delay');
        child.style.removeProperty('animation-duration');
      });
      if (options.onComplete) options.onComplete();
    }, totalDuration);

    return;
  }

  const className = `veil-reveal-${transition}`;
  element.classList.add(className);

  if (options.duration) {
    element.style.animationDuration = `${options.duration}ms`;
  }
  if (options.easing) {
    element.style.animationTimingFunction = options.easing;
  }

  const handleEnd = () => {
    element.removeEventListener('animationend', handleEnd);
    element.classList.remove('veil-revealing', className);
    element.style.removeProperty('animation-duration');
    element.style.removeProperty('animation-timing-function');
    if (options.onComplete) options.onComplete();
  };

  element.addEventListener('animationend', handleEnd);
}
