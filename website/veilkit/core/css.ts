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
${Object.entries(BUILTIN_THEMES).map(([name, t]) => `[data-veil-theme="${name}"]{--veil-base:${t.base};--veil-highlight:${t.highlight};--veil-radius:${t.radius};--veil-duration:${t.duration};--veil-easing:${t.easing};${t.border ? `--veil-border:${t.border};` : ''}${t.blur ? `--veil-blur:${t.blur};` : ''}${t.glow ? `--veil-glow:${t.glow};` : ''}--veil-contrast:${t.contrast};}`).join('')}

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

.veil-skeleton[data-veil-anim="ripple"]::after {
  width: 100%;
  height: 100%;
  animation: veil-ripple var(--veil-duration, 1.8s) ease-out infinite;
  background: radial-gradient(circle, var(--veil-highlight, rgba(255, 255, 255, 0.7)) 10%, transparent 70%);
}

.veil-skeleton[data-veil-anim="ping-pong"]::after {
  animation-name: veil-ping-pong;
  animation-duration: var(--veil-duration, 2.4s);
  animation-timing-function: ease-in-out;
}

.veil-skeleton[data-veil-anim="wipe"]::after {
  width: 100%;
  animation-name: veil-wipe;
  animation-duration: var(--veil-duration, 1.8s);
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.veil-skeleton[data-veil-anim="cascade"]::after {
  width: 100%;
  animation-name: veil-cascade;
  animation-duration: var(--veil-duration, 1.6s);
}

.veil-skeleton[data-veil-anim="spotlight"]::after {
  width: 140%;
  height: 140%;
  animation-name: veil-spotlight;
  animation-duration: var(--veil-duration, 2.5s);
  background: radial-gradient(circle at center, var(--veil-highlight, rgba(255, 255, 255, 0.85)) 0%, transparent 60%);
}

.veil-skeleton[data-veil-anim="rainbow"]::after {
  width: 250%;
  animation-name: veil-rainbow;
  animation-duration: var(--veil-duration, 3.5s);
  background: linear-gradient(90deg, #f43f5e, #fbbf24, #10b981, #06b6d4, #8b5cf6, #f43f5e);
  opacity: 0.25;
}

.veil-skeleton[data-veil-anim="heartbeat"] {
  animation: veil-heartbeat var(--veil-duration, 1.4s) ease-in-out infinite;
  animation-delay: var(--veil-sync-delay, 0s);
}
.veil-skeleton[data-veil-anim="heartbeat"]::after {
  background: none;
}

.veil-skeleton[data-veil-anim="liquid"]::after {
  width: 150%;
  animation-name: veil-liquid;
  animation-duration: var(--veil-duration, 2.2s);
  background: radial-gradient(ellipse at center, var(--veil-highlight, rgba(255, 255, 255, 0.7)) 0%, transparent 70%);
}

.veil-skeleton[data-veil-anim="stripes"]::after {
  width: 200%;
  animation-name: veil-stripes;
  animation-duration: var(--veil-duration, 1.5s);
  animation-timing-function: linear;
  background: repeating-linear-gradient(45deg, transparent, transparent 12px, var(--veil-highlight, rgba(255, 255, 255, 0.4)) 12px, var(--veil-highlight, rgba(255, 255, 255, 0.4)) 24px);
}

.veil-skeleton[data-veil-anim="halftone"] {
  animation: veil-halftone var(--veil-duration, 1.8s) ease-in-out infinite;
}
.veil-skeleton[data-veil-anim="halftone"]::after {
  background: radial-gradient(var(--veil-highlight, rgba(255, 255, 255, 0.5)) 15%, transparent 16%);
  background-size: 8px 8px;
}

.veil-skeleton[data-veil-anim="border-glow"] {
  animation: veil-border-glow var(--veil-duration, 1.6s) ease-in-out infinite;
  box-shadow: 0 0 12px var(--veil-highlight, rgba(99, 102, 241, 0.5));
}
.veil-skeleton[data-veil-anim="border-glow"]::after {
  background: none;
}

.veil-skeleton[data-veil-anim="typewriter"] {
  animation: veil-typewriter var(--veil-duration, 1.5s) steps(20, end) infinite alternate;
}
.veil-skeleton[data-veil-anim="typewriter"]::after {
  background: none;
}

.veil-skeleton[data-veil-anim="glitch"] {
  animation: veil-glitch var(--veil-duration, 2s) steps(4, jump-none) infinite;
}
.veil-skeleton[data-veil-anim="glitch"]::after {
  background: linear-gradient(90deg, transparent, var(--veil-highlight, rgba(255, 255, 255, 0.6)), transparent);
}

.veil-skeleton[data-veil-anim="pixelate"] {
  animation: veil-pixelate var(--veil-duration, 1.4s) steps(5, start) infinite;
}
.veil-skeleton[data-veil-anim="pixelate"]::after {
  background: none;
}

.veil-skeleton[data-veil-anim="tilt"] {
  animation: veil-tilt var(--veil-duration, 2.5s) ease-in-out infinite;
  transform-style: preserve-3d;
}
.veil-skeleton[data-veil-anim="tilt"]::after {
  animation-name: veil-shimmer-ltr;
}

.veil-skeleton[data-veil-anim="diagonal-sweep"]::after {
  width: 200%;
  height: 200%;
  animation-name: veil-diagonal-sweep;
  animation-duration: var(--veil-duration, 2s);
  background: linear-gradient(90deg, transparent 20%, var(--veil-highlight, rgba(255, 255, 255, 0.65)) 50%, transparent 80%);
}

.veil-skeleton[data-veil-anim="bounce-in"] {
  animation: veil-bounce-in var(--veil-duration, 1.6s) cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
}
.veil-skeleton[data-veil-anim="bounce-in"]::after {
  background: none;
}

.veil-skeleton[data-veil-anim="fade-slide"] {
  animation: veil-fade-slide var(--veil-duration, 1.6s) ease-in-out infinite;
}
.veil-skeleton[data-veil-anim="fade-slide"]::after {
  background: none;
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
  cursor: wait !important;
}
.veil-btn-spinner-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}
.veil-btn-success { background-color: #10b981 !important; color: #fff !important; }
.veil-btn-error { background-color: #ef4444 !important; color: #fff !important; }
.veil-btn-shake { animation: veil-shake 350ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both; }
.veil-btn-ripple {
  position: absolute; border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transform: scale(0);
  animation: veil-btn-ripple-anim 600ms linear;
  pointer-events: none;
}
.veil-btn-progress-bar {
  position: absolute; left: 0; top: 0; bottom: 0;
  background: rgba(255, 255, 255, 0.25);
  transition: width 200ms ease;
}
.veil-btn-shimmer {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: veil-btn-shimmer 1.5s infinite;
}
.veil-btn-pulse-glow { animation: veil-btn-glow 1.4s ease-in-out infinite alternate; }
.veil-btn-stripes {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.15) 10px, transparent 10px, transparent 20px);
  background-size: 28px 28px;
  animation: veil-btn-stripes 1s linear infinite;
}
.veil-btn-morph { border-radius: 50% !important; padding: 0 !important; width: 40px !important; height: 40px !important; transition: all 250ms ease; }
.veil-btn-typing-dots { animation: veil-typing-text 1.2s infinite; display: inline-block; width: 1.2em; text-align: left; }
.veil-btn-slide-wrap { display: flex; flex-direction: column; overflow: hidden; height: 1.2em; position: relative; }
.veil-btn-slide-out { animation: veil-slide-up-out 250ms forwards; }
.veil-btn-slide-in { animation: veil-slide-up-in 250ms forwards; }
.veil-btn-border-trace {
  position: absolute; inset: -2px; border-radius: inherit;
  background: conic-gradient(from 0deg, transparent 60%, currentColor 100%);
  animation: veil-spin 1.2s linear infinite;
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 1.5px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 1.5px));
}
.veil-btn-liquid {
  position: absolute; inset: 0; background: currentColor; opacity: 0.15;
  animation: veil-liquid-wave 2s infinite ease-in-out alternate;
}
.veil-btn-glass-shine {
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05));
}
.veil-btn-neon-pulse {
  box-shadow: 0 0 15px currentColor;
  animation: veil-btn-glow 1.2s infinite alternate;
}
.veil-btn-burst {
  position: absolute; inset: -4px; border-radius: inherit;
  box-shadow: 0 0 20px #10b981;
  animation: veil-burst 500ms ease-out forwards;
  pointer-events: none;
}

@keyframes veil-draw { to { stroke-dashoffset: 0; } }
@keyframes veil-shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
@keyframes veil-btn-ripple-anim { to { transform: scale(4); opacity: 0; } }
@keyframes veil-btn-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
@keyframes veil-btn-glow { from { opacity: 0.8; transform: scale(0.99); } to { opacity: 1; transform: scale(1.01); } }
@keyframes veil-btn-stripes { from { background-position: 0 0; } to { background-position: 28px 0; } }
@keyframes veil-slide-up-out { from { transform: translateY(0); } to { transform: translateY(-100%); } }
@keyframes veil-slide-up-in { from { transform: translateY(100%); } to { transform: translateY(0); } }
@keyframes veil-liquid-wave { from { transform: scaleY(0.7); } to { transform: scaleY(1); } }
@keyframes veil-burst { 0% { opacity: 1; transform: scale(0.95); } 100% { opacity: 0; transform: scale(1.2); } }
@keyframes veil-typing-text { 0% { content: ''; } 25% { content: '.'; } 50% { content: '..'; } 75% { content: '...'; } }
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
