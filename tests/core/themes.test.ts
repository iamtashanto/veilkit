import { describe, it, expect } from 'vitest';
import { BUILTIN_THEMES, createTheme, getThemeTokens } from '../../src/core/themes';

describe('Core - Themes', () => {
  it('should have all 11 built-in themes defined with valid tokens', () => {
    const requiredThemes = [
      'light',
      'dark',
      'auto',
      'glass',
      'ios',
      'material',
      'minimal',
      'mono',
      'neon',
      'sunset',
      'ocean',
    ];

    for (const name of requiredThemes) {
      const theme = BUILTIN_THEMES[name as keyof typeof BUILTIN_THEMES];
      expect(theme).toBeDefined();
      expect(theme.base).toBeTruthy();
      expect(theme.highlight).toBeTruthy();
      expect(theme.radius).toBeTruthy();
      expect(theme.duration).toBeTruthy();
      expect(theme.easing).toBeTruthy();
    }
  });

  it('should get default light theme when none specified', () => {
    const tokens = getThemeTokens();
    expect(tokens.base).toBe(BUILTIN_THEMES.light.base);
  });

  it('should get theme by string name', () => {
    const darkTokens = getThemeTokens('dark');
    expect(darkTokens.base).toBe(BUILTIN_THEMES.dark.base);
    expect(darkTokens.contrast).toBe(BUILTIN_THEMES.dark.contrast);

    const glassTokens = getThemeTokens('glass');
    expect(glassTokens.blur).toBe('12px');
  });

  it('should create custom theme extending light parent', () => {
    const custom = createTheme({
      name: 'brand-purple',
      base: '#6b21a8',
      highlight: '#c084fc',
      radius: '16px',
    });

    expect(custom.base).toBe('#6b21a8');
    expect(custom.highlight).toBe('#c084fc');
    expect(custom.radius).toBe('16px');
    expect(custom.duration).toBe(BUILTIN_THEMES.light.duration);

    // Should be retrievable by name
    const retrieved = getThemeTokens('brand-purple');
    expect(retrieved.base).toBe('#6b21a8');
  });

  it('should create custom theme extending specific parent theme', () => {
    const customDark = createTheme({
      name: 'cyber-dark',
      parent: 'dark',
      highlight: '#22c55e',
    });

    expect(customDark.base).toBe(BUILTIN_THEMES.dark.base);
    expect(customDark.highlight).toBe('#22c55e');
  });
});
