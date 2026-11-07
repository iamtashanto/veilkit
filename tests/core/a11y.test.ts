import { describe, it, expect } from 'vitest';
import { setLocale, getLabel, applyA11yLoading, removeA11yLoading } from '../../src/core/a11y';

describe('Core - A11y & Localization', () => {
  it('should support multiple languages and label retrieval', () => {
    setLocale('en');
    expect(getLabel('loading')).toContain('Loading');

    setLocale('es');
    expect(getLabel('loading')).toContain('Cargando');

    setLocale('fr');
    expect(getLabel('loading')).toContain('Chargement');

    setLocale('de');
    expect(getLabel('loading')).toContain('Inhalt wird geladen');

    setLocale('ja');
    expect(getLabel('loading')).toContain('読み込んでいます');

    setLocale('en'); // Reset
  });

  it('should apply and remove accessible loading attributes', () => {
    const el = document.createElement('div');
    applyA11yLoading(el, 'Please wait…');

    expect(el.getAttribute('aria-busy')).toBe('true');
    const sr = el.querySelector('.veil-sr-only');
    expect(sr).not.toBeNull();
    expect(sr?.textContent).toBe('Please wait…');

    removeA11yLoading(el);
    expect(el.getAttribute('aria-busy')).toBeNull();
    expect(el.querySelector('.veil-sr-only')).toBeNull();
  });
});
