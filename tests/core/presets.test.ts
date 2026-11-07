import { describe, it, expect } from 'vitest';
import { createPreset } from '../../src/core/presets';
import { VeilPresetName } from '../../src/core/types';

describe('Core - Presets', () => {
  const presets: VeilPresetName[] = [
    'card',
    'product-card',
    'product-grid',
    'list',
    'list-item',
    'table',
    'profile',
    'profile-header',
    'feed-post',
    'article',
    'comment-thread',
    'chat',
    'dashboard',
    'form',
    'media-card',
    'navbar',
    'sidebar',
    'settings-page',
  ];

  it('should generate valid DOM elements for all 18 presets', () => {
    for (const name of presets) {
      const el = createPreset({ name });
      expect(el).toBeInstanceOf(HTMLElement);
      expect(el.classList.contains(`veil-preset-${name}`)).toBe(true);
      expect(el.children.length).toBeGreaterThan(0);
    }
  });
});
