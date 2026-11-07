import { describe, it, expect } from 'vitest';
import { createPreset, PRESET_NAMES } from '../../src/core/presets';
import { VeilShapeStyle } from '../../src/core/types';

describe('Core - Presets', () => {
  it('should generate valid DOM elements for all 40 presets', () => {
    expect(PRESET_NAMES.length).toBe(40);

    const shapes: VeilShapeStyle[] = ['rounded', 'pill', 'square', 'sharp', 'glass'];

    for (const [idx, name] of PRESET_NAMES.entries()) {
      const shape = shapes[idx % shapes.length];
      const el = createPreset({ name, shape });
      expect(el).toBeInstanceOf(HTMLElement);
      expect(el.classList.contains(`veil-preset-${name}`)).toBe(true);
      expect(el.children.length).toBeGreaterThan(0);
    }
  });
});
