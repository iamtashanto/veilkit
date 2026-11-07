/**
 * Veilkit - 12 Spinner Loaders
 * Types: ring, dual-ring, dots, bars, pulse, orbit, wave, bounce,
 *        ios-activity, glass-orb, morph, progress-circle
 */

import { SpinnerProps, VeilSpinnerType } from './types';
import { injectStyles } from './css';

export const SPINNER_TYPES: VeilSpinnerType[] = [
  'ring',
  'dual-ring',
  'dots',
  'bars',
  'pulse',
  'orbit',
  'wave',
  'bounce',
  'ios-activity',
  'glass-orb',
  'morph',
  'progress-circle',
];

/**
 * Creates a DOM spinner element with specified type, size, and colors
 */
export function createSpinner(props: SpinnerProps = {}): HTMLElement {
  injectStyles();

  const type = props.type || 'ring';
  const size = props.size !== undefined ? (typeof props.size === 'number' ? `${props.size}px` : props.size) : '28px';
  const color = props.color || 'var(--veil-progress-color, #3b82f6)';
  const secondaryColor = props.secondaryColor || 'rgba(0, 0, 0, 0.12)';

  const container = document.createElement('div');
  container.className = `veil-spinner veil-spinner-${type} ${props.className || ''}`.trim();
  container.setAttribute('role', 'status');
  container.setAttribute('aria-label', props.label || 'Loading');
  container.style.width = size;
  container.style.height = size;
  container.style.display = 'inline-flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.position = 'relative';

  switch (type) {
    case 'ring': {
      const ring = document.createElement('div');
      ring.style.width = '100%';
      ring.style.height = '100%';
      ring.style.borderRadius = '50%';
      ring.style.border = `3px solid ${secondaryColor}`;
      ring.style.borderTopColor = color;
      ring.style.animation = 'veil-spin 800ms linear infinite';
      ring.style.boxSizing = 'border-box';
      container.appendChild(ring);
      break;
    }

    case 'dual-ring': {
      const ring = document.createElement('div');
      ring.style.width = '100%';
      ring.style.height = '100%';
      ring.style.borderRadius = '50%';
      ring.style.border = `3px solid transparent`;
      ring.style.borderTopColor = color;
      ring.style.borderBottomColor = color;
      ring.style.animation = 'veil-spin 900ms cubic-bezier(0.5, 0, 0.5, 1) infinite';
      ring.style.boxSizing = 'border-box';
      container.appendChild(ring);
      break;
    }

    case 'dots': {
      container.style.gap = '4px';
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.style.width = '28%';
        dot.style.height = '28%';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = color;
        dot.style.animation = 'veil-dot-bounce 1200ms ease-in-out infinite';
        dot.style.animationDelay = `${i * 160}ms`;
        container.appendChild(dot);
      }
      break;
    }

    case 'bars': {
      container.style.gap = '3px';
      for (let i = 0; i < 4; i++) {
        const bar = document.createElement('div');
        bar.style.width = '18%';
        bar.style.height = '100%';
        bar.style.borderRadius = '2px';
        bar.style.backgroundColor = color;
        bar.style.animation = 'veil-bar-wave 1000ms ease-in-out infinite';
        bar.style.animationDelay = `${i * 140}ms`;
        container.appendChild(bar);
      }
      break;
    }

    case 'pulse': {
      const pulseCircle = document.createElement('div');
      pulseCircle.style.width = '100%';
      pulseCircle.style.height = '100%';
      pulseCircle.style.borderRadius = '50%';
      pulseCircle.style.backgroundColor = color;
      pulseCircle.style.animation = 'veil-pulse-scale 1200ms ease-out infinite';
      container.appendChild(pulseCircle);
      break;
    }

    case 'orbit': {
      const nucleus = document.createElement('div');
      nucleus.style.width = '30%';
      nucleus.style.height = '30%';
      nucleus.style.borderRadius = '50%';
      nucleus.style.backgroundColor = color;
      nucleus.style.position = 'absolute';

      const orbitRing = document.createElement('div');
      orbitRing.style.width = '100%';
      orbitRing.style.height = '100%';
      orbitRing.style.position = 'absolute';
      orbitRing.style.animation = 'veil-spin 1200ms linear infinite';

      const satellite = document.createElement('div');
      satellite.style.width = '24%';
      satellite.style.height = '24%';
      satellite.style.borderRadius = '50%';
      satellite.style.backgroundColor = color;
      satellite.style.position = 'absolute';
      satellite.style.top = '0';
      satellite.style.left = '38%';

      orbitRing.appendChild(satellite);
      container.append(nucleus, orbitRing);
      break;
    }

    case 'wave': {
      container.style.gap = '4px';
      for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.style.width = '12%';
        line.style.height = '80%';
        line.style.borderRadius = '3px';
        line.style.backgroundColor = color;
        line.style.animation = 'veil-wave-dance 1100ms ease-in-out infinite';
        line.style.animationDelay = `${i * 110}ms`;
        container.appendChild(line);
      }
      break;
    }

    case 'bounce': {
      const ball = document.createElement('div');
      ball.style.width = '60%';
      ball.style.height = '60%';
      ball.style.borderRadius = '50%';
      ball.style.backgroundColor = color;
      ball.style.animation = 'veil-bounce-ball 900ms cubic-bezier(0.28, 0.84, 0.42, 1) infinite';
      container.appendChild(ball);
      break;
    }

    case 'ios-activity': {
      // 12 radial tick spokes with stepped opacity
      for (let i = 0; i < 12; i++) {
        const spoke = document.createElement('div');
        spoke.style.position = 'absolute';
        spoke.style.width = '8%';
        spoke.style.height = '26%';
        spoke.style.backgroundColor = color;
        spoke.style.borderRadius = '2px';
        spoke.style.transformOrigin = '50% 190%';
        spoke.style.transform = `rotate(${i * 30}deg) translateY(-90%)`;
        spoke.style.animation = 'veil-ios-fade 1000ms linear infinite';
        spoke.style.animationDelay = `-${(12 - i) * (1000 / 12)}ms`;
        container.appendChild(spoke);
      }
      break;
    }

    case 'glass-orb': {
      const orb = document.createElement('div');
      orb.style.width = '100%';
      orb.style.height = '100%';
      orb.style.borderRadius = '50%';
      orb.style.background = `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8), ${color} 70%)`;
      orb.style.boxShadow = `0 4px 12px ${color}44, inset 0 2px 4px rgba(255,255,255,0.6)`;
      orb.style.animation = 'veil-glass-orbit 1600ms ease-in-out infinite';
      container.appendChild(orb);
      break;
    }

    case 'morph': {
      const shape = document.createElement('div');
      shape.style.width = '80%';
      shape.style.height = '80%';
      shape.style.backgroundColor = color;
      shape.style.animation = 'veil-morph-shape 2000ms ease-in-out infinite';
      container.appendChild(shape);
      break;
    }

    case 'progress-circle': {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 36 36');
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.transform = 'rotate(-90deg)';

      const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      bgCircle.setAttribute('cx', '18');
      bgCircle.setAttribute('cy', '18');
      bgCircle.setAttribute('r', '14');
      bgCircle.setAttribute('fill', 'none');
      bgCircle.setAttribute('stroke', secondaryColor);
      bgCircle.setAttribute('stroke-width', '3');

      const meterCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      meterCircle.setAttribute('cx', '18');
      meterCircle.setAttribute('cy', '18');
      meterCircle.setAttribute('r', '14');
      meterCircle.setAttribute('fill', 'none');
      meterCircle.setAttribute('stroke', color);
      meterCircle.setAttribute('stroke-width', '3');
      meterCircle.setAttribute('stroke-dasharray', '88');
      meterCircle.setAttribute('stroke-dashoffset', '25');
      meterCircle.setAttribute('stroke-linecap', 'round');
      meterCircle.style.animation = 'veil-spin 1200ms linear infinite';
      meterCircle.style.transformOrigin = '50% 50%';

      svg.append(bgCircle, meterCircle);
      container.appendChild(svg);
      break;
    }
  }

  // Keyframes for spinners if not already injected
  injectSpinnerKeyframes();

  return container;
}

let spinnerKeyframesInjected = false;
function injectSpinnerKeyframes(): void {
  if (spinnerKeyframesInjected || typeof document === 'undefined') return;
  spinnerKeyframesInjected = true;

  const style = document.createElement('style');
  style.id = 'veilkit-spinner-keyframes';
  style.textContent = `
    @keyframes veil-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes veil-dot-bounce { 0%, 80%, 100% { transform: scale(0.4); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
    @keyframes veil-bar-wave { 0%, 100% { transform: scaleY(0.3); opacity: 0.5; } 50% { transform: scaleY(1); opacity: 1; } }
    @keyframes veil-pulse-scale { 0% { transform: scale(0.2); opacity: 1; } 100% { transform: scale(1.1); opacity: 0; } }
    @keyframes veil-wave-dance { 0%, 100% { transform: scaleY(0.2); } 50% { transform: scaleY(1); } }
    @keyframes veil-bounce-ball { 0%, 100% { transform: translateY(35%) scale(1.15, 0.75); } 50% { transform: translateY(-40%) scale(0.9, 1.1); } }
    @keyframes veil-ios-fade { 0% { opacity: 1; } 100% { opacity: 0.15; } }
    @keyframes veil-glass-orbit { 0%, 100% { transform: scale(0.9) rotate(0deg); } 50% { transform: scale(1.08) rotate(180deg); } }
    @keyframes veil-morph-shape {
      0%, 100% { border-radius: 50%; transform: rotate(0deg); }
      33% { border-radius: 8px; transform: rotate(90deg); }
      66% { border-radius: 20px; transform: rotate(180deg); }
    }
  `;
  document.head.appendChild(style);
}
