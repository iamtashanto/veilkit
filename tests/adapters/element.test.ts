import { describe, it, expect } from 'vitest';
import '../../src/element';

describe('Web Components Adapter', () => {
  it('should define veil custom elements', () => {
    expect(customElements.get('veil-skeleton')).toBeDefined();
    expect(customElements.get('veil-spinner')).toBeDefined();
    expect(customElements.get('veil-progress')).toBeDefined();
    expect(customElements.get('veil-overlay')).toBeDefined();
    expect(customElements.get('veil-loading-button')).toBeDefined();
  });

  it('should render <veil-skeleton> attributes into DOM', () => {
    const el = document.createElement('veil-skeleton');
    el.setAttribute('type', 'circle');
    el.setAttribute('width', '50px');
    el.setAttribute('height', '50px');
    el.setAttribute('animation', 'pulse');
    document.body.appendChild(el);

    const inner = el.querySelector('.veil-skeleton');
    expect(inner).not.toBeNull();
    expect(inner?.getAttribute('data-veil-shape')).toBe('circle');
    expect(inner?.getAttribute('data-veil-anim')).toBe('pulse');
    el.remove();
  });

  it('should render <veil-spinner> attributes into DOM', () => {
    const el = document.createElement('veil-spinner');
    el.setAttribute('type', 'orbit');
    document.body.appendChild(el);

    expect(el.querySelector('.veil-spinner-orbit')).not.toBeNull();
    el.remove();
  });
});
