/**
 * Veilkit - 30 Spinner Loaders
 * Complete catalog of GPU-accelerated spinners
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
  'arc-gradient',
  'pulse-ring',
  'dots-circle',
  'grid-dots',
  'square-flip',
  'cube-fold',
  'hourglass',
  'infinity',
  'heartbeat-line',
  'equalizer',
  'chasing-dots',
  'typing',
  'liquid-fill',
  'atom',
  'clock',
  'radar',
  'ellipsis',
  'flower',
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

  function getDuration(baseMs: number): string {
    if (props.speed === undefined) return `${baseMs}ms`;
    if (typeof props.speed === 'string') return props.speed;
    if (props.speed > 0 && props.speed <= 10) {
      return `${Math.round(baseMs / props.speed)}ms`;
    }
    return `${Math.round(props.speed)}ms`;
  }

  const container = document.createElement('div');
  container.className = `veil-spinner veil-spinner-${type} ${props.glass ? 'veil-spinner-glass' : ''} ${props.className || ''}`.trim();
  container.setAttribute('role', 'status');
  container.setAttribute('aria-label', props.label || 'Loading');
  container.style.width = size;
  container.style.height = size;
  container.style.display = 'inline-flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.position = 'relative';

  if (props.glass) {
    container.style.borderRadius = '50%';
    container.style.backdropFilter = 'blur(8px)';
    (container.style as any).webkitBackdropFilter = 'blur(8px)';
    container.style.background = 'rgba(255, 255, 255, 0.12)';
    container.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.4)';
    container.style.border = '1px solid rgba(255, 255, 255, 0.25)';
  }

  switch (type) {
    case 'ring': {
      const ring = document.createElement('div');
      ring.style.width = '100%';
      ring.style.height = '100%';
      ring.style.borderRadius = '50%';
      ring.style.border = `3px solid ${secondaryColor}`;
      ring.style.borderTopColor = color;
      ring.style.animation = `veil-spin ${getDuration(800)} linear infinite`;
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
      ring.style.animation = `veil-spin ${getDuration(900)} cubic-bezier(0.5, 0, 0.5, 1) infinite`;
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
        dot.style.animation = `veil-dot-bounce ${getDuration(1200)} ease-in-out infinite`;
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
        bar.style.animation = `veil-bar-wave ${getDuration(1000)} ease-in-out infinite`;
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
      pulseCircle.style.animation = `veil-pulse-scale ${getDuration(1200)} ease-out infinite`;
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
      orbitRing.style.animation = `veil-spin ${getDuration(1200)} linear infinite`;

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
        line.style.animation = `veil-wave-dance ${getDuration(1100)} ease-in-out infinite`;
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
      ball.style.animation = `veil-bounce-ball ${getDuration(900)} cubic-bezier(0.28, 0.84, 0.42, 1) infinite`;
      container.appendChild(ball);
      break;
    }

    case 'ios-activity': {
      for (let i = 0; i < 12; i++) {
        const spoke = document.createElement('div');
        spoke.style.position = 'absolute';
        spoke.style.width = '8%';
        spoke.style.height = '26%';
        spoke.style.backgroundColor = color;
        spoke.style.borderRadius = '2px';
        spoke.style.transformOrigin = '50% 190%';
        spoke.style.transform = `rotate(${i * 30}deg) translateY(-90%)`;
        spoke.style.animation = `veil-ios-fade ${getDuration(1000)} linear infinite`;
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
      orb.style.animation = `veil-glass-orbit ${getDuration(1600)} ease-in-out infinite`;
      container.appendChild(orb);
      break;
    }

    case 'morph': {
      const shape = document.createElement('div');
      shape.style.width = '80%';
      shape.style.height = '80%';
      shape.style.backgroundColor = color;
      shape.style.animation = `veil-morph-shape ${getDuration(2000)} ease-in-out infinite`;
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
      meterCircle.style.animation = `veil-spin ${getDuration(1200)} linear infinite`;
      meterCircle.style.transformOrigin = '50% 50%';

      svg.append(bgCircle, meterCircle);
      container.appendChild(svg);
      break;
    }

    case 'arc-gradient': {
      const arc = document.createElement('div');
      arc.style.width = '100%';
      arc.style.height = '100%';
      arc.style.borderRadius = '50%';
      arc.style.background = `conic-gradient(from 0deg, transparent 20%, ${color} 100%)`;
      arc.style.mask = 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 2.5px))';
      arc.style.webkitMask = 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 2.5px))';
      arc.style.animation = `veil-spin ${getDuration(750)} linear infinite`;
      container.appendChild(arc);
      break;
    }

    case 'pulse-ring': {
      for (let i = 0; i < 2; i++) {
        const ring = document.createElement('div');
        ring.style.position = 'absolute';
        ring.style.inset = '0';
        ring.style.borderRadius = '50%';
        ring.style.border = `2px solid ${color}`;
        ring.style.animation = `veil-pulse-ring ${getDuration(1400)} cubic-bezier(0, 0.2, 0.8, 1) infinite`;
        ring.style.animationDelay = `${i * 700}ms`;
        container.appendChild(ring);
      }
      break;
    }

    case 'dots-circle': {
      for (let i = 0; i < 8; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.width = '20%';
        dot.style.height = '20%';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = color;
        dot.style.transformOrigin = '50% 250%';
        dot.style.transform = `rotate(${i * 45}deg) translateY(-150%)`;
        dot.style.animation = `veil-fade-seq ${getDuration(1000)} linear infinite`;
        dot.style.animationDelay = `-${(8 - i) * (1000 / 8)}ms`;
        container.appendChild(dot);
      }
      break;
    }

    case 'grid-dots': {
      container.style.display = 'grid';
      container.style.gridTemplateColumns = 'repeat(3, 1fr)';
      container.style.gap = '3px';
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const dot = document.createElement('div');
          dot.style.width = '100%';
          dot.style.aspectRatio = '1 / 1';
          dot.style.borderRadius = '50%';
          dot.style.backgroundColor = color;
          dot.style.animation = `veil-dot-bounce ${getDuration(1200)} ease-in-out infinite`;
          dot.style.animationDelay = `${(row + col) * 110}ms`;
          container.appendChild(dot);
        }
      }
      break;
    }

    case 'square-flip': {
      const sq = document.createElement('div');
      sq.style.width = '60%';
      sq.style.height = '60%';
      sq.style.backgroundColor = color;
      sq.style.borderRadius = '4px';
      sq.style.animation = `veil-square-flip ${getDuration(1200)} ease-in-out infinite`;
      container.appendChild(sq);
      break;
    }

    case 'cube-fold': {
      container.style.display = 'grid';
      container.style.gridTemplateColumns = 'repeat(2, 1fr)';
      container.style.gap = '2px';
      for (let i = 0; i < 4; i++) {
        const cube = document.createElement('div');
        cube.style.width = '100%';
        cube.style.aspectRatio = '1 / 1';
        cube.style.backgroundColor = color;
        cube.style.borderRadius = '2px';
        cube.style.animation = `veil-cube-fold ${getDuration(1400)} ease-in-out infinite`;
        cube.style.animationDelay = `${i * 175}ms`;
        container.appendChild(cube);
      }
      break;
    }

    case 'hourglass': {
      const hg = document.createElement('div');
      hg.style.width = '65%';
      hg.style.height = '65%';
      hg.style.border = `3px solid ${color}`;
      hg.style.borderLeftColor = 'transparent';
      hg.style.borderRightColor = 'transparent';
      hg.style.borderRadius = '50%';
      hg.style.animation = `veil-hourglass ${getDuration(1200)} cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite`;
      container.appendChild(hg);
      break;
    }

    case 'infinity': {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 48 24');
      svg.style.width = '100%';
      svg.style.height = '100%';

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M12,12 C4,12 4,4 12,4 C20,4 28,20 36,20 C44,20 44,12 36,12 C28,12 20,4 12,4');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', '3');
      path.setAttribute('stroke-dasharray', '80');
      path.setAttribute('stroke-dashoffset', '0');
      path.setAttribute('stroke-linecap', 'round');
      path.style.animation = `veil-dash ${getDuration(1400)} linear infinite`;

      svg.appendChild(path);
      container.appendChild(svg);
      break;
    }

    case 'heartbeat-line': {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 50 24');
      svg.style.width = '100%';
      svg.style.height = '100%';

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M0,12 L14,12 L18,3 L24,21 L28,9 L32,15 L36,12 L50,12');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', '2.5');
      path.setAttribute('stroke-dasharray', '60');
      path.setAttribute('stroke-dashoffset', '60');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      path.style.animation = `veil-ecg ${getDuration(1200)} ease-in-out infinite`;

      svg.appendChild(path);
      container.appendChild(svg);
      break;
    }

    case 'equalizer': {
      container.style.gap = '3px';
      const delays = [0, 200, 100, 300];
      for (let i = 0; i < 4; i++) {
        const bar = document.createElement('div');
        bar.style.width = '18%';
        bar.style.height = '100%';
        bar.style.borderRadius = '2px';
        bar.style.backgroundColor = color;
        bar.style.animation = `veil-eq-bounce ${getDuration(800)} ease-in-out infinite alternate`;
        bar.style.animationDelay = `${delays[i]}ms`;
        container.appendChild(bar);
      }
      break;
    }

    case 'chasing-dots': {
      const wrap = document.createElement('div');
      wrap.style.width = '100%';
      wrap.style.height = '100%';
      wrap.style.position = 'relative';
      wrap.style.animation = `veil-spin ${getDuration(1800)} linear infinite`;

      for (let i = 0; i < 2; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.width = '45%';
        dot.style.height = '45%';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = color;
        dot.style.animation = `veil-chase ${getDuration(1800)} ease-in-out infinite`;
        if (i === 0) {
          dot.style.top = '0';
          dot.style.left = '0';
        } else {
          dot.style.bottom = '0';
          dot.style.right = '0';
          dot.style.animationDelay = '-900ms';
        }
        wrap.appendChild(dot);
      }
      container.appendChild(wrap);
      break;
    }

    case 'typing': {
      container.style.gap = '4px';
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.style.width = '24%';
        dot.style.height = '24%';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = color;
        dot.style.animation = `veil-typing ${getDuration(1000)} ease-in-out infinite`;
        dot.style.animationDelay = `${i * 150}ms`;
        container.appendChild(dot);
      }
      break;
    }

    case 'liquid-fill': {
      const wrap = document.createElement('div');
      wrap.style.width = '85%';
      wrap.style.height = '85%';
      wrap.style.borderRadius = '50%';
      wrap.style.border = `2px solid ${color}`;
      wrap.style.position = 'relative';
      wrap.style.overflow = 'hidden';

      const liquid = document.createElement('div');
      liquid.style.position = 'absolute';
      liquid.style.inset = '0';
      liquid.style.backgroundColor = color;
      liquid.style.opacity = '0.7';
      liquid.style.borderRadius = '40%';
      liquid.style.animation = `veil-liquid-spin ${getDuration(2000)} linear infinite`;
      wrap.appendChild(liquid);
      container.appendChild(wrap);
      break;
    }

    case 'atom': {
      const nucleus = document.createElement('div');
      nucleus.style.width = '24%';
      nucleus.style.height = '24%';
      nucleus.style.borderRadius = '50%';
      nucleus.style.backgroundColor = color;
      nucleus.style.position = 'absolute';
      container.appendChild(nucleus);

      const angles = [0, 60, 120];
      for (const angle of angles) {
        const ring = document.createElement('div');
        ring.style.position = 'absolute';
        ring.style.width = '100%';
        ring.style.height = '45%';
        ring.style.borderRadius = '50%';
        ring.style.border = `1.5px solid ${color}`;
        ring.style.transform = `rotate(${angle}deg)`;
        ring.style.animation = `veil-atom-spin ${getDuration(1600)} linear infinite`;
        container.appendChild(ring);
      }
      break;
    }

    case 'clock': {
      const face = document.createElement('div');
      face.style.width = '100%';
      face.style.height = '100%';
      face.style.borderRadius = '50%';
      face.style.border = `2.5px solid ${color}`;
      face.style.position = 'relative';

      const center = document.createElement('div');
      center.style.width = '14%';
      center.style.height = '14%';
      center.style.borderRadius = '50%';
      center.style.backgroundColor = color;
      center.style.position = 'absolute';
      center.style.top = '43%';
      center.style.left = '43%';

      const hourHand = document.createElement('div');
      hourHand.style.position = 'absolute';
      hourHand.style.width = '2px';
      hourHand.style.height = '30%';
      hourHand.style.backgroundColor = color;
      hourHand.style.top = '20%';
      hourHand.style.left = 'calc(50% - 1px)';
      hourHand.style.transformOrigin = 'bottom center';
      hourHand.style.animation = `veil-spin ${getDuration(3000)} linear infinite`;

      const minuteHand = document.createElement('div');
      minuteHand.style.position = 'absolute';
      minuteHand.style.width = '2px';
      minuteHand.style.height = '42%';
      minuteHand.style.backgroundColor = color;
      minuteHand.style.top = '8%';
      minuteHand.style.left = 'calc(50% - 1px)';
      minuteHand.style.transformOrigin = 'bottom center';
      minuteHand.style.animation = `veil-spin ${getDuration(1000)} linear infinite`;

      face.append(center, hourHand, minuteHand);
      container.appendChild(face);
      break;
    }

    case 'radar': {
      const radarWrap = document.createElement('div');
      radarWrap.style.width = '100%';
      radarWrap.style.height = '100%';
      radarWrap.style.borderRadius = '50%';
      radarWrap.style.border = `1.5px solid ${color}`;
      radarWrap.style.position = 'relative';
      radarWrap.style.overflow = 'hidden';

      const beam = document.createElement('div');
      beam.style.position = 'absolute';
      beam.style.inset = '0';
      beam.style.borderRadius = '50%';
      beam.style.background = `conic-gradient(from 0deg, transparent 60%, ${color} 100%)`;
      beam.style.opacity = '0.6';
      beam.style.animation = `veil-spin ${getDuration(1500)} linear infinite`;

      radarWrap.appendChild(beam);
      container.appendChild(radarWrap);
      break;
    }

    case 'ellipsis': {
      container.style.gap = '3px';
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.style.width = '24%';
        dot.style.height = '24%';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = color;
        dot.style.animation = `veil-ellipsis ${getDuration(1200)} ease-in-out infinite`;
        dot.style.animationDelay = `${i * 200}ms`;
        container.appendChild(dot);
      }
      break;
    }

    case 'flower': {
      for (let i = 0; i < 6; i++) {
        const petal = document.createElement('div');
        petal.style.position = 'absolute';
        petal.style.width = '28%';
        petal.style.height = '48%';
        petal.style.borderRadius = '50%';
        petal.style.backgroundColor = color;
        petal.style.opacity = '0.85';
        petal.style.transformOrigin = '50% 100%';
        petal.style.top = '2%';
        petal.style.transform = `rotate(${i * 60}deg)`;
        petal.style.animation = `veil-flower-bloom ${getDuration(1600)} ease-in-out infinite`;
        petal.style.animationDelay = `${i * 120}ms`;
        container.appendChild(petal);
      }
      break;
    }
  }

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
    @keyframes veil-pulse-ring {
      0% { transform: scale(0.2); opacity: 1; }
      100% { transform: scale(1.4); opacity: 0; }
    }
    @keyframes veil-fade-seq { 0% { opacity: 1; } 100% { opacity: 0.1; } }
    @keyframes veil-square-flip {
      0% { transform: perspective(120px) rotateX(0deg) rotateY(0deg); }
      50% { transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg); }
      100% { transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg); }
    }
    @keyframes veil-cube-fold {
      0%, 10% { transform: scale(1); opacity: 1; }
      50% { transform: scale(0.3); opacity: 0.3; }
      90%, 100% { transform: scale(1); opacity: 1; }
    }
    @keyframes veil-hourglass {
      0% { transform: rotate(0); }
      50% { transform: rotate(180deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes veil-dash {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -160; }
    }
    @keyframes veil-ecg {
      0% { stroke-dashoffset: 60; }
      50% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -60; }
    }
    @keyframes veil-eq-bounce {
      0% { transform: scaleY(0.15); }
      100% { transform: scaleY(1); }
    }
    @keyframes veil-chase {
      0%, 100% { transform: scale(0.4); }
      50% { transform: scale(1); }
    }
    @keyframes veil-typing {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-4px); opacity: 1; }
    }
    @keyframes veil-liquid-spin {
      0% { transform: translateY(30%) rotate(0deg); }
      100% { transform: translateY(30%) rotate(360deg); }
    }
    @keyframes veil-atom-spin {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(0.95); }
      100% { transform: rotate(360deg) scale(1); }
    }
    @keyframes veil-ellipsis {
      0%, 100% { transform: scale(0.5); opacity: 0.3; }
      50% { transform: scale(1.1); opacity: 1; }
    }
    @keyframes veil-flower-bloom {
      0%, 100% { transform: scale(0.7); opacity: 0.5; }
      50% { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}
