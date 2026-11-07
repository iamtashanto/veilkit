import { describe, it, expect } from 'vitest';
import {
  measureContainer,
  createAutoMeasureOverlay,
  getCachedLayout,
  setCachedLayout,
} from '../../src/core/measure';

describe('Core - Auto Measure Engine', () => {
  it('should store and retrieve cached layouts in memory and localStorage', () => {
    const fakeLayout = {
      width: 400,
      height: 300,
      boxes: [
        { x: 10, y: 10, width: 380, height: 40, radius: '6px', shape: 'rect' as const },
      ],
    };

    setCachedLayout('test-card', fakeLayout, true);
    const retrieved = getCachedLayout('test-card');

    expect(retrieved).not.toBeNull();
    expect(retrieved?.width).toBe(400);
    expect(retrieved?.boxes.length).toBe(1);
  });

  it('should measure container and attach auto measure overlay', () => {
    const container = document.createElement('div');
    container.style.width = '300px';
    container.style.height = '200px';

    const heading = document.createElement('h2');
    heading.textContent = 'Product Title';
    container.appendChild(heading);

    const button = document.createElement('button');
    button.textContent = 'Add to Cart';
    container.appendChild(button);

    document.body.appendChild(container);

    const measured = measureContainer(container);
    expect(measured).toBeDefined();
    expect(Array.isArray(measured.boxes)).toBe(true);

    const instance = createAutoMeasureOverlay(container, {
      observeResize: false,
      observeMutations: false,
    });

    expect(instance.overlay).toBeInstanceOf(HTMLElement);
    expect(instance.overlay.classList.contains('veil-auto-overlay')).toBe(true);

    instance.refresh();
    instance.destroy();
    container.remove();
  });
});
