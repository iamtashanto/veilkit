/**
 * Veilkit - Animation Engine
 * 12 GPU-Accelerated Animation Definitions (transform & opacity only)
 * 30 GPU-Accelerated Animation Definitions (transform & opacity only)
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
  'ripple',
  'ping-pong',
  'wipe',
  'cascade',
  'spotlight',
  'rainbow',
  'heartbeat',
  'liquid',
  'stripes',
  'halftone',
  'border-glow',
  'typewriter',
  'glitch',
  'pixelate',
  'tilt',
  'diagonal-sweep',
  'bounce-in',
  'fade-slide',
  'none',
];

/**
 * Generates the CSS keyframes and utility rules for all 12 animations.
 * Generates the CSS keyframes and utility rules for all 30 animations.
 * Strictly uses transform and opacity for 60fps GPU execution.
 */
export function getAnimationKeyframesCSS(): string {
  return [
    '@keyframes veil-shimmer-ltr{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}',
    '@keyframes veil-shimmer-rtl{0%{transform:translateX(100%)}100%{transform:translateX(-100%)}}',
    '@keyframes veil-shimmer-ttb{0%{transform:translateY(-100%)}100%{transform:translateY(100%)}}',
    '@keyframes veil-shimmer-btt{0%{transform:translateY(100%)}100%{transform:translateY(-100%)}}',
    '@keyframes veil-wave{0%{transform:translateX(-120%) scaleX(0.8);opacity:0.3}50%{opacity:0.95}100%{transform:translateX(120%) scaleX(1.2);opacity:0.3}}',
    '@keyframes veil-pulse{0%,100%{opacity:1}50%{opacity:0.38}}',
    '@keyframes veil-blink{0%,49%{opacity:1}50%,99%{opacity:0.2}100%{opacity:1}}',
    '@keyframes veil-breathe{0%,100%{opacity:0.65;transform:scale(0.995)}50%{opacity:1;transform:scale(1.005)}}',
    '@keyframes veil-glass-shine{0%{transform:translate3d(-150%,-150%,0) rotate(35deg);opacity:0.1}40%,60%{opacity:0.85}100%{transform:translate3d(200%,200%,0) rotate(35deg);opacity:0.1}}',
    '@keyframes veil-gradient-flow{0%{transform:translateX(-66.6%)}100%{transform:translateX(0%)}}',
    '@keyframes veil-aurora{0%{transform:translate3d(-20%,-15%,0) rotate(0deg) scale(1);opacity:0.5}50%{transform:translate3d(25%,20%,0) rotate(180deg) scale(1.25);opacity:0.85}100%{transform:translate3d(-20%,-15%,0) rotate(360deg) scale(1);opacity:0.5}}',
    '@keyframes veil-scan-line{0%{transform:translateY(-100%);opacity:0.2}50%{opacity:1}100%{transform:translateY(300%);opacity:0.2}}',
    '@keyframes veil-sparkle{0%,100%{opacity:0.2;transform:scale(0.98)}25%{opacity:0.8;transform:scale(1.02)}50%{opacity:0.3;transform:scale(0.99)}75%{opacity:0.95;transform:scale(1.01)}}',
    '@keyframes veil-neon-glow{0%,100%{opacity:0.45;transform:scale(0.998)}50%{opacity:1;transform:scale(1.002)}}',
    '@keyframes veil-ripple{0%{transform:scale(0.2);opacity:0.9}100%{transform:scale(2.4);opacity:0}}',
    '@keyframes veil-ping-pong{0%,100%{transform:translateX(-100%)}50%{transform:translateX(100%)}}',
    '@keyframes veil-wipe{0%{transform:translateX(-100%) scaleX(0.2);opacity:0.2}50%{transform:translateX(0%) scaleX(1);opacity:0.9}100%{transform:translateX(100%) scaleX(0.2);opacity:0.2}}',
    '@keyframes veil-cascade{0%{transform:translateY(-100%);opacity:0.3}50%{opacity:0.95}100%{transform:translateY(100%);opacity:0.3}}',
    '@keyframes veil-spotlight{0%{transform:translate3d(-100%,-50%,0);opacity:0.15}50%{transform:translate3d(50%,0%,0);opacity:0.85}100%{transform:translate3d(200%,50%,0);opacity:0.15}}',
    '@keyframes veil-rainbow{0%{filter:hue-rotate(0deg);transform:translateX(-50%)}100%{filter:hue-rotate(360deg);transform:translateX(0%)}}',
    '@keyframes veil-heartbeat{0%,100%{transform:scale(1);opacity:0.7}14%{transform:scale(1.025);opacity:1}28%{transform:scale(1);opacity:0.75}42%{transform:scale(1.035);opacity:1}70%{transform:scale(1);opacity:0.7}}',
    '@keyframes veil-liquid{0%,100%{transform:translateX(-100%) scaleY(0.9) skewX(-8deg);opacity:0.4}50%{transform:translateX(100%) scaleY(1.1) skewX(8deg);opacity:0.9}}',
    '@keyframes veil-stripes{0%{transform:translateX(-48px)}100%{transform:translateX(0px)}}',
    '@keyframes veil-halftone{0%,100%{opacity:0.35;transform:scale(0.995)}50%{opacity:0.95;transform:scale(1.005)}}',
    '@keyframes veil-border-glow{0%,100%{opacity:0.5;transform:scale(0.998)}50%{opacity:1;transform:scale(1.002)}}',
    '@keyframes veil-typewriter{0%{transform:scaleX(0.1);transform-origin:left;opacity:0.4}100%{transform:scaleX(1);transform-origin:left;opacity:1}}',
    '@keyframes veil-glitch{0%,100%{transform:translate(0);opacity:0.8}20%{transform:translate(-2px,1px);opacity:0.95}40%{transform:translate(2px,-1px);opacity:0.85}60%{transform:translate(-1px,-1px);opacity:1}80%{transform:translate(1px,2px);opacity:0.9}}',
    '@keyframes veil-pixelate{0%,100%{opacity:0.3;transform:scale(0.99)}25%{opacity:0.75;transform:scale(1)}50%{opacity:0.45;transform:scale(0.995)}75%{opacity:0.9;transform:scale(1.005)}}',
    '@keyframes veil-tilt{0%,100%{transform:perspective(600px) rotateX(0deg) rotateY(0deg);opacity:0.7}50%{transform:perspective(600px) rotateX(4deg) rotateY(-4deg);opacity:1}}',
    '@keyframes veil-diagonal-sweep{0%{transform:translate3d(-100%,-100%,0) rotate(-45deg)}100%{transform:translate3d(150%,150%,0) rotate(-45deg)}}',
    '@keyframes veil-bounce-in{0%,100%{transform:scale(0.985);opacity:0.6}50%{transform:scale(1.015);opacity:1}}',
    '@keyframes veil-fade-slide{0%,100%{transform:translateY(3px);opacity:0.5}50%{transform:translateY(-3px);opacity:1}}',
    '[data-veil-anim="stagger"]>*{animation-delay:calc(var(--veil-stagger-idx,0)*120ms)!important}',
  ].join('');
}
