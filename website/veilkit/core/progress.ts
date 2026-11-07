/**
 * Veilkit - Progress System
 * Route Progress Bar (NProgress-style with auto-trickle) +
 * Determinate & Indeterminate Linear and Circular Progress components
 */

import { ProgressProps } from './types';
import { injectStyles } from './css';

export class RouteProgressController {
  private el: HTMLElement | null = null;
  private innerEl: HTMLElement | null = null;
  private currentProgress: number = 0;
  private trickleTimer: any = null;
  private status: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  private ensureDOM(): void {
    if (this.el || typeof document === 'undefined') return;
    injectStyles();

    this.el = document.createElement('div');
    this.el.className = 'veil-progress-bar';
    this.el.setAttribute('role', 'progressbar');
    this.el.setAttribute('aria-valuemin', '0');
    this.el.setAttribute('aria-valuemax', '100');
    this.el.setAttribute('aria-valuenow', '0');

    this.innerEl = document.createElement('div');
    this.innerEl.className = 'veil-progress-inner';
    this.innerEl.style.width = '0%';
    this.innerEl.style.opacity = '1';

    this.el.appendChild(this.innerEl);
    document.body.appendChild(this.el);
  }

  public start(): void {
    this.ensureDOM();
    if (this.status === 'loading') return;
    this.status = 'loading';
    this.currentProgress = 0;
    this.set(0.08);

    if (this.innerEl) {
      this.innerEl.style.opacity = '1';
      this.innerEl.style.backgroundColor = 'var(--veil-progress-color, #3b82f6)';
    }

    this.trickle();
  }

  public set(n: number): void {
    this.ensureDOM();
    this.currentProgress = Math.min(1, Math.max(0, n));
    const percent = Math.round(this.currentProgress * 100);

    if (this.innerEl) {
      this.innerEl.style.width = `${percent}%`;
    }
    if (this.el) {
      this.el.setAttribute('aria-valuenow', String(percent));
    }
  }

  public inc(amount?: number): void {
    const n = this.currentProgress;
    if (n >= 1) return;

    if (typeof amount !== 'number') {
      if (n >= 0 && n < 0.2) amount = 0.1;
      else if (n >= 0.2 && n < 0.5) amount = 0.04;
      else if (n >= 0.5 && n < 0.8) amount = 0.02;
      else if (n >= 0.8 && n < 0.99) amount = 0.005;
      else amount = 0;
    }

    this.set(n + amount);
  }

  private trickle(): void {
    this.stopTrickle();
    this.trickleTimer = setInterval(() => {
      if (this.currentProgress < 0.95) {
        this.inc();
      }
    }, 250);
  }

  private stopTrickle(): void {
    if (this.trickleTimer) {
      clearInterval(this.trickleTimer);
      this.trickleTimer = null;
    }
  }

  public done(): void {
    if (this.status === 'idle') return;
    this.stopTrickle();
    this.set(1);
    this.status = 'idle';

    setTimeout(() => {
      if (this.innerEl) {
        this.innerEl.style.opacity = '0';
      }
      setTimeout(() => {
        if (this.el) {
          this.el.remove();
          this.el = null;
          this.innerEl = null;
        }
        this.currentProgress = 0;
      }, 350);
    }, 200);
  }

  public fail(): void {
    this.stopTrickle();
    this.status = 'error';
    if (this.innerEl) {
      this.innerEl.style.backgroundColor = '#ef4444'; // Red error color
    }
    this.set(1);
    setTimeout(() => this.done(), 500);
  }
}

export const progressController = new RouteProgressController();

/**
 * Creates an inline determinate or indeterminate Linear/Circular Progress element
 */
export function createProgressElement(props: ProgressProps = {}): HTMLElement {
  injectStyles();

  const isCircular = Boolean(props.circular);
  const color = props.color || 'var(--veil-progress-color, #3b82f6)';
  const trackColor = props.trackColor || 'rgba(0, 0, 0, 0.08)';

  if (isCircular) {
    const size = props.size !== undefined ? (typeof props.size === 'number' ? `${props.size}px` : props.size) : '48px';
    const strokeWidth = props.strokeWidth || 4;

    const container = document.createElement('div');
    container.className = `veil-progress-circular ${props.className || ''}`.trim();
    container.style.width = size;
    container.style.height = size;
    container.style.display = 'inline-flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.position = 'relative';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 48 48');
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.transform = 'rotate(-90deg)';

    const track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    track.setAttribute('cx', '24');
    track.setAttribute('cy', '24');
    track.setAttribute('r', '20');
    track.setAttribute('fill', 'none');
    track.setAttribute('stroke', trackColor);
    track.setAttribute('stroke-width', String(strokeWidth));

    const meter = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    meter.setAttribute('cx', '24');
    meter.setAttribute('cy', '24');
    meter.setAttribute('r', '20');
    meter.setAttribute('fill', 'none');
    meter.setAttribute('stroke', color);
    meter.setAttribute('stroke-width', String(strokeWidth));
    meter.setAttribute('stroke-linecap', 'round');

    const circumference = 2 * Math.PI * 20; // ~125.66
    meter.setAttribute('stroke-dasharray', String(circumference));

    if (props.value !== undefined) {
      const val = Math.min(100, Math.max(0, props.value));
      const offset = circumference - (val / 100) * circumference;
      meter.setAttribute('stroke-dashoffset', String(offset));
      meter.style.transition = 'stroke-dashoffset 300ms ease';
    } else {
      // Indeterminate mode
      meter.setAttribute('stroke-dashoffset', String(circumference * 0.75));
      svg.style.animation = 'veil-spin 1200ms linear infinite';
    }

    svg.append(track, meter);
    container.appendChild(svg);

    if (props.showPercentage && props.value !== undefined) {
      const text = document.createElement('span');
      text.style.position = 'absolute';
      text.style.fontSize = '11px';
      text.style.fontWeight = '600';
      text.textContent = `${Math.round(props.value)}%`;
      container.appendChild(text);
    }

    return container;
  }

  // Linear progress
  const height = props.height !== undefined ? (typeof props.height === 'number' ? `${props.height}px` : props.height) : '4px';
  const container = document.createElement('div');
  container.className = `veil-progress-linear ${props.className || ''}`.trim();
  container.setAttribute('role', 'progressbar');
  container.style.width = '100%';
  container.style.height = height;
  container.style.backgroundColor = trackColor;
  container.style.borderRadius = '9999px';
  container.style.overflow = 'hidden';
  container.style.position = 'relative';

  const bar = document.createElement('div');
  bar.style.height = '100%';
  bar.style.backgroundColor = color;
  bar.style.borderRadius = '9999px';

  if (props.value !== undefined) {
    const val = Math.min(100, Math.max(0, props.value));
    container.setAttribute('aria-valuenow', String(val));
    bar.style.width = `${val}%`;
    bar.style.transition = 'width 250ms ease';
  } else {
    // Indeterminate
    bar.style.width = '35%';
    bar.style.animation = 'veil-progress-indeterminate 1400ms ease-in-out infinite';
  }

  container.appendChild(bar);
  return container;
}
