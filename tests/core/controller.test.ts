import { describe, it, expect } from 'vitest';
import veil from '../../src/core/controller';

describe('Core - Imperative Controller API', () => {
  it('should expose all imperative methods', () => {
    expect(typeof veil.configure).toBe('function');
    expect(typeof veil.skeleton).toBe('function');
    expect(typeof veil.spinner).toBe('function');
    expect(veil.overlay).toBeDefined();
    expect(veil.progress).toBeDefined();
    expect(veil.manager).toBeDefined();
    expect(typeof veil.track).toBe('function');
    expect(typeof veil.wrapFetch).toBe('function');
  });

  it('should configure global defaults', () => {
    veil.configure({
      theme: 'glass',
      animation: 'aurora',
      locale: 'fr',
    });
    expect(veil.getThemeTokens('glass')).toBeDefined();
  });
});
