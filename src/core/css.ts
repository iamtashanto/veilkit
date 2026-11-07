/**
 * Veilkit - CSS Engine & Style Injector
 * SSR-safe, adoptedStyleSheets support, CSP nonce, and zero-layout-thrash animations
 */

import { BUILTIN_THEMES } from './themes';
import { getAnimationKeyframesCSS } from './animations';

let styleInjected = false;
let cspNonce: string | undefined = undefined;

/**
 * Configure CSP nonce for injected styles
 */
export function setNonce(nonce: string): void {
  cspNonce = nonce;
}

/**
 * Generates the full CSS stylesheet string
 */
export function getStylesCSS(): string {
  const light = BUILTIN_THEMES.light;
  const dark = BUILTIN_THEMES.dark;

  return `
/* === VEILKIT CORE STYLES === */
:root {
  --veil-base: ${light.base};
  --veil-highlight: ${light.highlight};
  --veil-radius: ${light.radius};
  --veil-duration: ${light.duration};
  --veil-easing: ${light.easing};
  --veil-direction: ltr;
  --veil-border: none;
  --veil-blur: none;
  --veil-glow: none;
  --veil-contrast: ${light.contrast};

  --veil-auto-base: ${light.base};
  --veil-auto-highlight: ${light.highlight};
  --veil-auto-contrast: ${light.contrast};
}

@media (prefers-color-scheme: dark) {
  :root {
    --veil-auto-base: ${dark.base};
    --veil-auto-highlight: ${dark.highlight};
    --veil-auto-contrast: ${dark.contrast};
  }
}

/* === DARK THEME SELECTORS === */
[data-theme="dark"], .dark, [data-theme="dark"] .veil-skeleton {
  --veil-base: ${dark.base};
  --veil-highlight: ${dark.highlight};
  --veil-contrast: ${dark.contrast};
}

/* === THEME ATTRIBUTE CLASSES === */
[data-veil-theme="light"] {
  --veil-base: ${BUILTIN_THEMES.light.base};
  --veil-highlight: ${BUILTIN_THEMES.light.highlight};
  --veil-radius: ${BUILTIN_THEMES.light.radius};
  --veil-duration: ${BUILTIN_THEMES.light.duration};
  --veil-easing: ${BUILTIN_THEMES.light.easing};
  --veil-border: none;
  --veil-contrast: ${BUILTIN_THEMES.light.contrast};
}

[data-veil-theme="dark"] {
  --veil-base: ${BUILTIN_THEMES.dark.base};
  --veil-highlight: ${BUILTIN_THEMES.dark.highlight};
  --veil-radius: ${BUILTIN_THEMES.dark.radius};
  --veil-duration: ${BUILTIN_THEMES.dark.duration};
  --veil-easing: ${BUILTIN_THEMES.dark.easing};
  --veil-border: none;
  --veil-contrast: ${BUILTIN_THEMES.dark.contrast};
}

[data-veil-theme="auto"] {
  --veil-base: var(--veil-auto-base);
  --veil-highlight: var(--veil-auto-highlight);
  --veil-contrast: var(--veil-auto-contrast);
}

[data-veil-theme="glass"] {
  --veil-base: ${BUILTIN_THEMES.glass.base};
  --veil-highlight: ${BUILTIN_THEMES.glass.highlight};
  --veil-radius: ${BUILTIN_THEMES.glass.radius};
  --veil-duration: ${BUILTIN_THEMES.glass.duration};
  --veil-easing: ${BUILTIN_THEMES.glass.easing};
  --veil-border: ${BUILTIN_THEMES.glass.border};
  --veil-blur: ${BUILTIN_THEMES.glass.blur};
  --veil-glow: ${BUILTIN_THEMES.glass.glow};
  --veil-contrast: ${BUILTIN_THEMES.glass.contrast};
}

[data-veil-theme="ios"] {
  --veil-base: ${BUILTIN_THEMES.ios.base};
  --veil-highlight: ${BUILTIN_THEMES.ios.highlight};
  --veil-radius: ${BUILTIN_THEMES.ios.radius};
  --veil-duration: ${BUILTIN_THEMES.ios.duration};
  --veil-easing: ${BUILTIN_THEMES.ios.easing};
  --veil-contrast: ${BUILTIN_THEMES.ios.contrast};
}

[data-veil-theme="material"] {
  --veil-base: ${BUILTIN_THEMES.material.base};
  --veil-highlight: ${BUILTIN_THEMES.material.highlight};
  --veil-radius: ${BUILTIN_THEMES.material.radius};
  --veil-duration: ${BUILTIN_THEMES.material.duration};
  --veil-easing: ${BUILTIN_THEMES.material.easing};
  --veil-contrast: ${BUILTIN_THEMES.material.contrast};
}

[data-veil-theme="minimal"] {
  --veil-base: ${BUILTIN_THEMES.minimal.base};
  --veil-highlight: ${BUILTIN_THEMES.minimal.highlight};
  --veil-radius: ${BUILTIN_THEMES.minimal.radius};
  --veil-duration: ${BUILTIN_THEMES.minimal.duration};
  --veil-easing: ${BUILTIN_THEMES.minimal.easing};
  --veil-contrast: ${BUILTIN_THEMES.minimal.contrast};
}

[data-veil-theme="mono"] {
  --veil-base: ${BUILTIN_THEMES.mono.base};
  --veil-highlight: ${BUILTIN_THEMES.mono.highlight};
  --veil-radius: ${BUILTIN_THEMES.mono.radius};
  --veil-duration: ${BUILTIN_THEMES.mono.duration};
  --veil-easing: ${BUILTIN_THEMES.mono.easing};
  --veil-border: ${BUILTIN_THEMES.mono.border};
  --veil-contrast: ${BUILTIN_THEMES.mono.contrast};
}

[data-veil-theme="neon"] {
  --veil-base: ${BUILTIN_THEMES.neon.base};
  --veil-highlight: ${BUILTIN_THEMES.neon.highlight};
  --veil-radius: ${BUILTIN_THEMES.neon.radius};
  --veil-duration: ${BUILTIN_THEMES.neon.duration};
  --veil-easing: ${BUILTIN_THEMES.neon.easing};
  --veil-border: ${BUILTIN_THEMES.neon.border};
  --veil-glow: ${BUILTIN_THEMES.neon.glow};
  --veil-contrast: ${BUILTIN_THEMES.neon.contrast};
}

[data-veil-theme="sunset"] {
  --veil-base: ${BUILTIN_THEMES.sunset.base};
  --veil-highlight: ${BUILTIN_THEMES.sunset.highlight};
  --veil-radius: ${BUILTIN_THEMES.sunset.radius};
  --veil-duration: ${BUILTIN_THEMES.sunset.duration};
  --veil-easing: ${BUILTIN_THEMES.sunset.easing};
  --veil-glow: ${BUILTIN_THEMES.sunset.glow};
  --veil-contrast: ${BUILTIN_THEMES.sunset.contrast};
}

[data-veil-theme="ocean"] {
  --veil-base: ${BUILTIN_THEMES.ocean.base};
  --veil-highlight: ${BUILTIN_THEMES.ocean.highlight};
  --veil-radius: ${BUILTIN_THEMES.ocean.radius};
  --veil-duration: ${BUILTIN_THEMES.ocean.duration};
  --veil-easing: ${BUILTIN_THEMES.ocean.easing};
  --veil-border: ${BUILTIN_THEMES.ocean.border};
  --veil-glow: ${BUILTIN_THEMES.ocean.glow};
  --veil-contrast: ${BUILTIN_THEMES.ocean.contrast};
}

/* === BASE SKELETON ELEMENT === */
.veil-skeleton {
  position: relative;
  display: block;
  box-sizing: border-box;
  background-color: var(--veil-base, #e5e7eb);
  border-radius: var(--veil-radius, 6px);
  border: var(--veil-border, none);
  box-shadow: var(--veil-glow, none);
  overflow: hidden;
  pointer-events: none;
  user-select: none;
  min-height: 12px;
}

[data-veil-theme="glass"] .veil-skeleton,
.veil-skeleton[data-veil-theme="glass"] {
  backdrop-filter: blur(var(--veil-blur, 12px));
  -webkit-backdrop-filter: blur(var(--veil-blur, 12px));
}

/* === SHIMMER / ANIMATION OVERLAY === */
.veil-skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  will-change: transform, opacity;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--veil-highlight, rgba(255, 255, 255, 0.7)) 50%,
    transparent 100%
  );
  animation-duration: var(--veil-duration, 1.5s);
  animation-timing-function: var(--veil-easing, cubic-bezier(0.4, 0, 0.2, 1));
  animation-iteration-count: infinite;
  animation-delay: var(--veil-sync-delay, 0s);
  animation-play-state: var(--veil-play-state, running);
}

/* Animation name mapping */
.veil-skeleton[data-veil-anim="shimmer"]::after,
.veil-skeleton:not([data-veil-anim])::after {
  animation-name: veil-shimmer-ltr;
}
.veil-skeleton[data-veil-dir="rtl"]::after,
[dir="rtl"] .veil-skeleton[data-veil-anim="shimmer"]::after {
  animation-name: veil-shimmer-rtl;
}
.veil-skeleton[data-veil-dir="ttb"]::after {
  animation-name: veil-shimmer-ttb;
  background: linear-gradient(180deg, transparent 0%, var(--veil-highlight, rgba(255,255,255,0.7)) 50%, transparent 100%);
}
.veil-skeleton[data-veil-dir="btt"]::after {
  animation-name: veil-shimmer-btt;
  background: linear-gradient(0deg, transparent 0%, var(--veil-highlight, rgba(255,255,255,0.7)) 50%, transparent 100%);
}

.veil-skeleton[data-veil-anim="wave"]::after {
  animation-name: veil-wave;
}

.veil-skeleton[data-veil-anim="pulse"]::after {
  background: none;
}
.veil-skeleton[data-veil-anim="pulse"] {
  animation: veil-pulse var(--veil-duration, 1.5s) var(--veil-easing, ease-in-out) infinite;
  animation-delay: var(--veil-sync-delay, 0s);
  animation-play-state: var(--veil-play-state, running);
}

.veil-skeleton[data-veil-anim="blink"]::after {
  background: none;
}
.veil-skeleton[data-veil-anim="blink"] {
  animation: veil-blink var(--veil-duration, 1.2s) steps(2, start) infinite;
  animation-delay: var(--veil-sync-delay, 0s);
  animation-play-state: var(--veil-play-state, running);
}

.veil-skeleton[data-veil-anim="breathe"]::after {
  background: none;
}
.veil-skeleton[data-veil-anim="breathe"] {
  animation: veil-breathe var(--veil-duration, 2.2s) var(--veil-easing, ease-in-out) infinite;
  animation-delay: var(--veil-sync-delay, 0s);
  animation-play-state: var(--veil-play-state, running);
}

.veil-skeleton[data-veil-anim="glass-shine"]::after {
  animation-name: veil-glass-shine;
  background: linear-gradient(
    115deg,
    transparent 20%,
    var(--veil-highlight, rgba(255, 255, 255, 0.4)) 50%,
    transparent 80%
  );
}

.veil-skeleton[data-veil-anim="gradient-flow"]::after {
  width: 300%;
  animation-name: veil-gradient-flow;
  background: linear-gradient(
    90deg,
    var(--veil-base, #e5e7eb) 0%,
    var(--veil-highlight, rgba(255, 255, 255, 0.8)) 30%,
    var(--veil-base, #e5e7eb) 60%,
    var(--veil-highlight, rgba(255, 255, 255, 0.8)) 100%
  );
}

.veil-skeleton[data-veil-anim="aurora"]::after {
  width: 160%;
  height: 160%;
  animation-name: veil-aurora;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(56, 189, 248, 0.3) 0%,
    rgba(168, 85, 247, 0.25) 45%,
    rgba(236, 72, 153, 0.2) 75%,
    transparent 100%
  );
}

.veil-skeleton[data-veil-anim="scan-line"]::after {
  height: 30%;
  animation-name: veil-scan-line;
  background: linear-gradient(180deg, transparent, var(--veil-highlight, rgba(0, 240, 255, 0.8)), transparent);
}

.veil-skeleton[data-veil-anim="sparkle"]::after {
  animation-name: veil-sparkle;
}

.veil-skeleton[data-veil-anim="neon-glow"] {
  animation: veil-neon-glow var(--veil-duration, 1.6s) ease-in-out infinite;
  animation-delay: var(--veil-sync-delay, 0s);
}

.veil-skeleton[data-veil-anim="none"]::after {
  display: none !important;
}

/* === PRIMITIVE VARIANTS === */
.veil-skeleton[data-veil-shape="line"] {
  height: 1em;
  margin: 0.35em 0;
  border-radius: var(--veil-radius, 4px);
}
.veil-skeleton[data-veil-shape="circle"] {
  border-radius: 50% !important;
  aspect-ratio: 1 / 1;
}
.veil-skeleton[data-veil-shape="heading"] {
  height: 1.8em;
  margin: 0.5em 0;
  border-radius: var(--veil-radius, 6px);
}
.veil-skeleton[data-veil-shape="button"] {
  height: 2.5rem;
  border-radius: var(--veil-radius, 8px);
}
.veil-skeleton[data-veil-shape="badge"] {
  height: 1.35rem;
  border-radius: 9999px;
  display: inline-block;
}
.veil-skeleton[data-veil-shape="icon"] {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: var(--veil-radius, 6px);
  display: inline-block;
}
.veil-skeleton[data-veil-shape="input"] {
  height: 2.6rem;
  border-radius: var(--veil-radius, 8px);
}
.veil-skeleton[data-veil-shape="divider"] {
  height: 1px;
  width: 100%;
  margin: 1rem 0;
  min-height: 1px;
}

/* Natural randomized last-line widths */
.veil-lines-group > .veil-skeleton:last-child {
  width: var(--veil-last-width, 68%);
}

/* === ACCESSIBILITY === */
.veil-sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border-width: 0 !important;
}

/* prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .veil-skeleton::after {
    animation: none !important;
    display: none !important;
  }
  .veil-skeleton {
    animation: veil-pulse 3s ease-in-out infinite !important;
    transform: none !important;
  }
}

/* forced-colors */
@media (forced-colors: active) {
  .veil-skeleton {
    forced-color-adjust: none;
    background-color: ButtonFace !important;
    outline: 1px solid Highlight !important;
  }
  .veil-skeleton::after {
    display: none !important;
  }
}

/* Offscreen & Tab Hidden Pausing */
[data-veil-tab-hidden="true"] .veil-skeleton,
[data-veil-tab-hidden="true"] .veil-skeleton::after,
[data-veil-offscreen="true"],
[data-veil-offscreen="true"]::after {
  animation-play-state: paused !important;
}

/* === REVEAL TRANSITIONS === */
.veil-revealing {
  position: relative;
}
.veil-reveal-fade {
  animation: veil-reveal-fade 350ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.veil-reveal-blur-in {
  animation: veil-reveal-blur 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.veil-reveal-slide-up {
  animation: veil-reveal-slide 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.veil-reveal-scale {
  animation: veil-reveal-scale 350ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes veil-reveal-fade {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes veil-reveal-blur {
  0% { opacity: 0; filter: blur(8px); }
  100% { opacity: 1; filter: blur(0px); }
}
@keyframes veil-reveal-slide {
  0% { opacity: 0; transform: translateY(12px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes veil-reveal-scale {
  0% { opacity: 0; transform: scale(0.96); }
  100% { opacity: 1; transform: scale(1); }
}

/* === SPINNERS, PROGRESS, OVERLAY, BUTTON, LAZY IMAGE === */
.veil-spinner {
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle;
}
.veil-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: var(--veil-overlay-bg, rgba(255, 255, 255, 0.75));
  backdrop-filter: blur(var(--veil-overlay-blur, 6px));
  -webkit-backdrop-filter: blur(var(--veil-overlay-blur, 6px));
  z-index: 100;
  transition: opacity 250ms ease;
}
.veil-overlay-fullscreen {
  position: fixed !important;
  z-index: 999999 !important;
}
.veil-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 999999;
  background: transparent;
  pointer-events: none;
}
.veil-progress-inner {
  height: 100%;
  background: var(--veil-progress-color, #3b82f6);
  box-shadow: 0 0 10px var(--veil-progress-color, #3b82f6), 0 0 5px var(--veil-progress-color, #3b82f6);
  transition: width 200ms ease, opacity 350ms ease;
}
.veil-btn-loading {
  position: relative;
  pointer-events: none;
  cursor: default;
}
.veil-btn-spinner-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}
.veil-lazy-img-wrap {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.veil-lazy-img {
  transition: opacity 350ms ease, filter 350ms ease;
}
.veil-lazy-img-loading {
  opacity: 0;
  filter: blur(10px);
}
.veil-lazy-img-loaded {
  opacity: 1;
  filter: blur(0px);
}

${getAnimationKeyframesCSS()}
`;
}

/**
 * Injects CSS into the document head safely (runs only once, SSR safe)
 */
export function injectStyles(nonce?: string): void {
  if (styleInjected || typeof document === 'undefined') return;
  styleInjected = true;

  const css = getStylesCSS();
  const effectiveNonce = nonce || cspNonce;

  // Try adoptedStyleSheets if supported
  if (
    typeof document.adoptedStyleSheets !== 'undefined' &&
    typeof CSSStyleSheet !== 'undefined' &&
    'replaceSync' in CSSStyleSheet.prototype &&
    !effectiveNonce // Some CSP setups disallow adoptedStyleSheets with strict style-src
  ) {
    try {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(css);
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
      return;
    } catch {
      // Fallback to <style> injection
    }
  }

  // <style> tag fallback with CSP nonce support
  const styleEl = document.createElement('style');
  styleEl.id = 'veilkit-styles';
  if (effectiveNonce) {
    styleEl.setAttribute('nonce', effectiveNonce);
  }
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}
