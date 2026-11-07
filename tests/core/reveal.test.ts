import { describe, it, expect } from 'vitest';
import { applyReveal } from '../../src/core/reveal';

describe('Core - Reveal Transitions', () => {
  it('should apply reveal classes (fade, blur-in, slide-up, scale)', () => {
    const el1 = document.createElement('div');
    applyReveal(el1, { transition: 'fade' });
    expect(el1.classList.contains('veil-reveal-fade')).toBe(true);

    const el2 = document.createElement('div');
    applyReveal(el2, { transition: 'blur-in' });
    expect(el2.classList.contains('veil-reveal-blur-in')).toBe(true);

    const el3 = document.createElement('div');
    applyReveal(el3, { transition: 'slide-up' });
    expect(el3.classList.contains('veil-reveal-slide-up')).toBe(true);

    const el4 = document.createElement('div');
    applyReveal(el4, { transition: 'scale' });
    expect(el4.classList.contains('veil-reveal-scale')).toBe(true);
  });

  it('should handle stagger-children on container elements', () => {
    const parent = document.createElement('div');
    for (let i = 0; i < 3; i++) {
      parent.appendChild(document.createElement('span'));
    }

    applyReveal(parent, { transition: 'stagger-children' });
    expect(parent.classList.contains('veil-revealing')).toBe(true);
    const firstChild = parent.children[0] as HTMLElement;
    expect(firstChild.classList.contains('veil-reveal-fade')).toBe(true);
  });
});
