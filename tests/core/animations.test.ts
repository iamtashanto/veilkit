import { describe, it, expect } from 'vitest';
import { ANIMATION_NAMES, getAnimationKeyframesCSS } from '../../src/core/animations';
import { createSkeletonElement } from '../../src/core/primitives';

describe('Core - Animations', () => {
  it('should have exactly 30 active animation names + none', () => {
    const activeAnimations = ANIMATION_NAMES.filter((name) => name !== 'none');
    expect(activeAnimations.length).toBe(30);
  });

  it('should generate valid CSS keyframes for all animations', () => {
    const css = getAnimationKeyframesCSS();
    expect(css).toContain('@keyframes veil-shimmer-ltr');
    expect(css).toContain('@keyframes veil-ripple');
    expect(css).toContain('@keyframes veil-ping-pong');
    expect(css).toContain('@keyframes veil-wipe');
    expect(css).toContain('@keyframes veil-cascade');
    expect(css).toContain('@keyframes veil-spotlight');
    expect(css).toContain('@keyframes veil-rainbow');
    expect(css).toContain('@keyframes veil-heartbeat');
    expect(css).toContain('@keyframes veil-liquid');
    expect(css).toContain('@keyframes veil-stripes');
    expect(css).toContain('@keyframes veil-halftone');
    expect(css).toContain('@keyframes veil-border-glow');
    expect(css).toContain('@keyframes veil-typewriter');
    expect(css).toContain('@keyframes veil-glitch');
    expect(css).toContain('@keyframes veil-pixelate');
    expect(css).toContain('@keyframes veil-tilt');
    expect(css).toContain('@keyframes veil-diagonal-sweep');
    expect(css).toContain('@keyframes veil-bounce-in');
    expect(css).toContain('@keyframes veil-fade-slide');
  });

  it('should render skeleton element with any of the 30 animations', () => {
    for (const anim of ANIMATION_NAMES) {
      const el = createSkeletonElement({ animation: anim, width: '100px', height: '20px' });
      expect(el).toBeInstanceOf(HTMLElement);
      expect(el.getAttribute('data-veil-anim')).toBe(anim);
    }
  });
});
