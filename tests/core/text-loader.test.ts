import { describe, it, expect } from 'vitest';
import { createTextLoader } from '../../src/core/text-loader';

describe('Core - Text Loader', () => {
  it('should render animated text loader with dots', () => {
    const el = createTextLoader({
      text: 'Analyzing codebase',
      dots: 4,
      locale: 'en',
    });

    expect(el.classList.contains('veil-text-loader')).toBe(true);
    expect(el.textContent).toContain('Analyzing codebase');

    const dots = el.querySelectorAll('.veil-typing-dot');
    expect(dots.length).toBe(4);
  });
});
