/**
 * Veilkit - Animation Engine
 * 12 GPU-Accelerated Animation Definitions (transform & opacity only)
 */

import { VeilAnimationName, VeilDirection } from './types';

export interface AnimationConfig {
  name: VeilAnimationName;
  duration?: number | string;
  direction?: VeilDirection;
  speedMultiplier?: number;
  intensity?: number;
}

export const ANIMATION_NAMES: VeilAnimationName[] = [
  'shimmer',
  'wave',
  'pulse',
  'blink',
  'breathe',
  'glass-shine',
  'gradient-flow',
  'aurora',
  'scan-line',
  'sparkle',
  'neon-glow',
  'stagger',
  'none',
];

/**
 * Generates the CSS keyframes and utility rules for all 12 animations.
 * Strictly uses transform and opacity for 60fps GPU execution.
 */
export function getAnimationKeyframesCSS(): string {
  return `
/* === VEILKIT 12 GPU ANIMATIONS === */

/* 1. Shimmer: Classic linear translation */
@keyframes veil-shimmer-ltr {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
@keyframes veil-shimmer-rtl {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
@keyframes veil-shimmer-ttb {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
@keyframes veil-shimmer-btt {
  0% { transform: translateY(100%); }
  100% { transform: translateY(-100%); }
}

/* 2. Wave: Sinusoidal curved sweep */
@keyframes veil-wave {
  0% { transform: translateX(-120%) scaleX(0.8); opacity: 0.3; }
  50% { opacity: 0.95; }
  100% { transform: translateX(120%) scaleX(1.2); opacity: 0.3; }
}

/* 3. Pulse: Smooth opacity cycling */
@keyframes veil-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.38; }
}

/* 4. Blink: Crisp rhythmic pulse */
@keyframes veil-blink {
  0%, 49% { opacity: 1; }
  50%, 99% { opacity: 0.2; }
  100% { opacity: 1; }
}

/* 5. Breathe: Calm soothing opacity + subtle micro-scale */
@keyframes veil-breathe {
  0%, 100% { opacity: 0.65; transform: scale(0.995); }
  50% { opacity: 1; transform: scale(1.005); }
}

/* 6. Glass Shine: Soft diagonal glint */
@keyframes veil-glass-shine {
  0% { transform: translate3d(-150%, -150%, 0) rotate(35deg); opacity: 0.1; }
  40%, 60% { opacity: 0.85; }
  100% { transform: translate3d(200%, 200%, 0) rotate(35deg); opacity: 0.1; }
}

/* 7. Gradient Flow: Multi-stop hue flow across horizontal span */
@keyframes veil-gradient-flow {
  0% { transform: translateX(-66.6%); }
  100% { transform: translateX(0%); }
}

/* 8. Aurora: Organic multi-chroma soft orbital drift */
@keyframes veil-aurora {
  0% { transform: translate3d(-20%, -15%, 0) rotate(0deg) scale(1); opacity: 0.5; }
  50% { transform: translate3d(25%, 20%, 0) rotate(180deg) scale(1.25); opacity: 0.85; }
  100% { transform: translate3d(-20%, -15%, 0) rotate(360deg) scale(1); opacity: 0.5; }
}

/* 9. Scan Line: High-tech laser sweep */
@keyframes veil-scan-line {
  0% { transform: translateY(-100%); opacity: 0.2; }
  50% { opacity: 1; }
  100% { transform: translateY(300%); opacity: 0.2; }
}

/* 10. Sparkle: Micro glint bursts */
@keyframes veil-sparkle {
  0%, 100% { opacity: 0.2; transform: scale(0.98); }
  25% { opacity: 0.8; transform: scale(1.02); }
  50% { opacity: 0.3; transform: scale(0.99); }
  75% { opacity: 0.95; transform: scale(1.01); }
}

/* 11. Neon Glow: Luminous edge pulse */
@keyframes veil-neon-glow {
  0%, 100% { opacity: 0.45; transform: scale(0.998); }
  50% { opacity: 1; transform: scale(1.002); }
}

/* 12. Stagger child timing helper */
[data-veil-anim="stagger"] > * {
  animation-delay: calc(var(--veil-stagger-idx, 0) * 120ms) !important;
}
`;
}
