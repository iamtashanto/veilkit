import { describe, it, expect } from 'vitest';
import { createSkeletonElement, createSkeletonParagraph, createPrimitive } from '../../src/core/primitives';

describe('Core - Primitives', () => {
  it('should create basic skeleton element with data attributes and classes', () => {
    const el = createSkeletonElement({
      type: 'rect',
      width: 200,
      height: 30,
      radius: 8,
      animation: 'wave',
      theme: 'glass',
    });

    expect(el.classList.contains('veil-skeleton')).toBe(true);
    expect(el.getAttribute('data-veil-shape')).toBe('rect');
    expect(el.getAttribute('data-veil-anim')).toBe('wave');
    expect(el.getAttribute('data-veil-theme')).toBe('glass');
    expect(el.getAttribute('aria-hidden')).toBe('true');
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('30px');
    expect(el.style.borderRadius).toBe('8px');
  });

  it('should create multi-line paragraph with natural varied widths', () => {
    const para = createSkeletonParagraph(3, {
      lastLineWidth: '50%',
    });

    expect(para.classList.contains('veil-lines-group')).toBe(true);
    expect(para.children.length).toBe(3);

    const lastLine = para.children[2] as HTMLElement;
    expect(lastLine.style.width).toBe('50%');
  });

  it('should create all primitive types via createPrimitive factory', () => {
    const primitives = ['line', 'heading', 'circle', 'image', 'button', 'badge', 'icon', 'input', 'divider', 'table-row'] as const;

    for (const type of primitives) {
      const node = createPrimitive(type);
      expect(node).toBeInstanceOf(HTMLElement);
    }
  });
});
