import { describe, it, expect } from 'vitest';
import { createLazyImage } from '../../src/core/lazy-image';

describe('Core - Lazy Image', () => {
  it('should create lazy image container with placeholder skeleton and img tag', () => {
    const el = createLazyImage({
      src: 'https://images.unsplash.com/photo-1.jpg',
      alt: 'Scenic photo',
      width: 300,
      height: 200,
      radius: 8,
      aspectRatio: '16/9',
    });

    expect(el.classList.contains('veil-lazy-img-wrap')).toBe(true);
    expect(el.style.width).toBe('300px');
    expect(el.style.height).toBe('200px');
    expect(el.style.borderRadius).toBe('8px');

    const img = el.querySelector('img') as HTMLImageElement;
    expect(img).not.toBeNull();
    expect(img.src).toBe('https://images.unsplash.com/photo-1.jpg');
    expect(img.alt).toBe('Scenic photo');

    const skeleton = el.querySelector('.veil-skeleton');
    expect(skeleton).not.toBeNull();

    // Trigger onload
    img.dispatchEvent(new Event('load'));
    expect(img.classList.contains('veil-lazy-img-loaded')).toBe(true);
  });

  it('should handle error fallback when image fails to load', () => {
    const el = createLazyImage({
      src: 'https://invalid-url.com/fake.jpg',
      fallbackSrc: 'https://fallback.com/fallback.jpg',
    });

    const img = el.querySelector('img') as HTMLImageElement;
    img.dispatchEvent(new Event('error'));
    expect(img.src).toBe('https://fallback.com/fallback.jpg');
  });
});
