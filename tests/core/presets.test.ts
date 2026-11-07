import { describe, it, expect } from 'vitest';
import { createPreset, PRESET_NAMES } from '../../src/core/presets';
import { createCustomSkeleton, SkeletonBuilder } from '../../src/core/custom-builder';
import { VeilShapeStyle } from '../../src/core/types';

describe('Core - Presets', () => {
  it('should generate valid DOM elements for all 45 presets', () => {
    expect(PRESET_NAMES.length).toBe(45);

    const shapes: VeilShapeStyle[] = ['rounded', 'pill', 'square', 'sharp', 'glass'];

    for (const [idx, name] of PRESET_NAMES.entries()) {
      const shape = shapes[idx % shapes.length];
      const el = createPreset({ name, shape });
      expect(el).toBeInstanceOf(HTMLElement);
      expect(el.classList.contains(`veil-preset-${name}`)).toBe(true);
      expect(el.children.length).toBeGreaterThan(0);
    }
  });

  it('should support CustomSkeletonBuilder fluent API', () => {
    const builder = new SkeletonBuilder({ animation: 'wave', theme: 'glass', shape: 'pill' });
    builder
      .card((c) => {
        c.row((r) => {
          r.avatar(50);
          r.col((col) => {
            col.heading('60%');
            col.lines(2);
          });
        });
        c.rect('100%', 120);
        c.row((r) => {
          r.button(100, 36);
          r.badge(60, 24);
        });
      });

    const el = builder.build();
    expect(el).toBeInstanceOf(HTMLElement);
    expect(el.classList.contains('veil-custom-skeleton')).toBe(true);
    expect(el.querySelectorAll('.veil-skeleton').length).toBeGreaterThan(4);

    const directEl = createCustomSkeleton(builder.toConfig());
    expect(directEl).toBeInstanceOf(HTMLElement);
    expect(directEl.classList.contains('veil-custom-skeleton')).toBe(true);
  });
});
