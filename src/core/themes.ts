/**
 * Veilkit - Themes & Token Definitions
 * 11 Built-in Themes + `createTheme()`
 */

import { VeilThemeName, VeilThemeTokens, CustomThemeInput } from './types';

export const BUILTIN_THEMES: Record<VeilThemeName, VeilThemeTokens> = {
  light: {
    base: '#e5e7eb',
    highlight: 'rgba(255, 255, 255, 0.7)',
    radius: '6px',
    duration: '1.5s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    border: 'none',
    contrast: '#374151',
  },
  dark: {
    base: '#1f2937',
    highlight: 'rgba(255, 255, 255, 0.12)',
    radius: '6px',
    duration: '1.5s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    border: 'none',
    contrast: '#f3f4f6',
  },
  auto: {
    // Dynamic CSS variables will resolve light/dark via prefers-color-scheme
    base: 'var(--veil-auto-base, #e5e7eb)',
    highlight: 'var(--veil-auto-highlight, rgba(255, 255, 255, 0.7))',
    radius: '6px',
    duration: '1.5s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    border: 'none',
    contrast: 'var(--veil-auto-contrast, #374151)',
  },
  glass: {
    base: 'rgba(255, 255, 255, 0.08)',
    highlight: 'rgba(255, 255, 255, 0.25)',
    radius: '12px',
    duration: '1.8s',
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    blur: '12px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    glow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 4px 16px 0 rgba(0, 0, 0, 0.12)',
    contrast: '#ffffff',
  },
  ios: {
    base: 'rgba(120, 120, 128, 0.18)',
    highlight: 'rgba(255, 255, 255, 0.45)',
    radius: '10px',
    duration: '1.4s',
    easing: 'cubic-bezier(0.32, 0.72, 0, 1)',
    border: 'none',
    contrast: '#1c1c1e',
  },
  material: {
    base: '#e7e0ec',
    highlight: '#f7f2fa',
    radius: '12px',
    duration: '1.6s',
    easing: 'cubic-bezier(0.2, 0, 0, 1)',
    border: 'none',
    contrast: '#1d1b20',
  },
  minimal: {
    base: '#f1f3f5',
    highlight: '#ffffff',
    radius: '4px',
    duration: '1.4s',
    easing: 'ease-in-out',
    border: 'none',
    contrast: '#212529',
  },
  mono: {
    base: '#e0e0e0',
    highlight: '#ffffff',
    radius: '0px',
    duration: '1.2s',
    easing: 'linear',
    border: '1px solid #cccccc',
    contrast: '#000000',
  },
  neon: {
    base: '#0c0b16',
    highlight: 'rgba(0, 240, 255, 0.5)',
    radius: '8px',
    duration: '1.6s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid rgba(0, 240, 255, 0.3)',
    glow: '0 0 12px rgba(0, 240, 255, 0.35)',
    contrast: '#00f0ff',
  },
  sunset: {
    base: '#fed7aa',
    highlight: '#fff7ed',
    radius: '8px',
    duration: '1.7s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    border: 'none',
    glow: '0 0 8px rgba(251, 146, 60, 0.25)',
    contrast: '#7c2d12',
  },
  ocean: {
    base: '#0f2937',
    highlight: 'rgba(56, 189, 248, 0.45)',
    radius: '8px',
    duration: '1.7s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid rgba(56, 189, 248, 0.2)',
    glow: '0 0 10px rgba(56, 189, 248, 0.25)',
    contrast: '#38bdf8',
  },
};

const customThemesRegistry = new Map<string, VeilThemeTokens>();

/**
 * Creates and registers a new custom theme
 */
export function createTheme(themeInput: CustomThemeInput): VeilThemeTokens {
  const parentTheme = themeInput.parent && BUILTIN_THEMES[themeInput.parent]
    ? BUILTIN_THEMES[themeInput.parent]
    : BUILTIN_THEMES.light;

  const resolvedTheme: VeilThemeTokens = {
    base: themeInput.base ?? parentTheme.base,
    highlight: themeInput.highlight ?? parentTheme.highlight,
    radius: themeInput.radius ?? parentTheme.radius,
    duration: themeInput.duration ?? parentTheme.duration,
    easing: themeInput.easing ?? parentTheme.easing,
    border: themeInput.border ?? parentTheme.border,
    blur: themeInput.blur ?? parentTheme.blur,
    glow: themeInput.glow ?? parentTheme.glow,
    contrast: themeInput.contrast ?? parentTheme.contrast,
  };

  customThemesRegistry.set(themeInput.name, resolvedTheme);
  return resolvedTheme;
}

/**
 * Get theme tokens by name or object
 */
export function getThemeTokens(theme?: VeilThemeName | CustomThemeInput): VeilThemeTokens {
  if (!theme) return BUILTIN_THEMES.light;
  if (typeof theme === 'string') {
    if (theme in BUILTIN_THEMES) {
      return BUILTIN_THEMES[theme as VeilThemeName];
    }
    const custom = customThemesRegistry.get(theme);
    if (custom) return custom;
    return BUILTIN_THEMES.light;
  }
  return createTheme(theme);
}
