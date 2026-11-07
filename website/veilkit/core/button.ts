/**
 * Veilkit - Loading Button Controller
 * 16 Loading Styles, State Machine (idle -> loading -> success | error -> idle),
 * Result Animations (checkmark, cross, shake, success-burst), and Press Feedback.
 */

import {
  ButtonLoadingStyle,
  ButtonPressFeedback,
  ButtonStatus,
  LoadingButtonProps,
} from './types';
import { createSpinner } from './spinners';
import { injectStyles } from './css';

export const BUTTON_LOADING_STYLES: ButtonLoadingStyle[] = [
  'spinner-left',
  'spinner-right',
  'spinner-replace',
  'dots-after-text',
  'progress-fill',
  'shimmer-surface',
  'pulse-glow',
  'stripes-progress',
  'morph-circle',
  'slide-text',
  'border-trace',
  'liquid-fill',
  'bounce-dots',
  'glass-shine',
  'neon-pulse',
  'skeleton-button',
];

export function wrapLoadingButton(
  buttonEl: HTMLButtonElement,
  props: LoadingButtonProps = {},
): {
  setStatus: (status: ButtonStatus, customText?: string) => void;
  setLoading: (loading: boolean, loadingText?: string) => void;
  getStatus: () => ButtonStatus;
  destroy: () => void;
} {
  injectStyles();
  injectButtonKeyframes();

  let currentStatus: ButtonStatus = props.status || (props.loading ? 'loading' : 'idle');
  let originalWidth: string = '';
  let originalHeight: string = '';
  let originalHtml: string = buttonEl.innerHTML;
  let resetTimer: ReturnType<typeof setTimeout> | null = null;

  // Press Feedback Listeners
  const pressFeedback: ButtonPressFeedback = props.pressFeedback || 'press-scale';
  setupPressFeedback(buttonEl, pressFeedback);

  function clearResetTimer(): void {
    if (resetTimer) {
      clearTimeout(resetTimer);
      resetTimer = null;
    }
  }

  function setStatus(status: ButtonStatus, customText?: string): void {
    clearResetTimer();
    const prevStatus = currentStatus;
    currentStatus = status;

    if (props.onStatusChange && prevStatus !== status) {
      props.onStatusChange(status);
    }

    if (status === 'idle') {
      buttonEl.classList.remove(
        'veil-btn-loading',
        'veil-btn-success',
        'veil-btn-error',
        'veil-btn-shake',
        'veil-btn-morph',
      );
      buttonEl.removeAttribute('aria-disabled');
      buttonEl.removeAttribute('aria-busy');
      buttonEl.style.width = originalWidth;
      buttonEl.style.height = originalHeight;
      buttonEl.innerHTML = originalHtml;
      return;
    }

    // Lock dimensions on first transition away from idle
    if (prevStatus === 'idle') {
      const rect = buttonEl.getBoundingClientRect();
      originalWidth = buttonEl.style.width;
      originalHeight = buttonEl.style.height;
      originalHtml = buttonEl.innerHTML;

      if (rect.width > 0) {
        buttonEl.style.width = `${rect.width}px`;
      }
      if (rect.height > 0) {
        buttonEl.style.height = `${rect.height}px`;
      }
    }

    if (status === 'loading') {
      buttonEl.classList.add('veil-btn-loading');
      buttonEl.classList.remove('veil-btn-success', 'veil-btn-error');
      buttonEl.setAttribute('aria-disabled', 'true');
      buttonEl.setAttribute('aria-busy', 'true');

      const styleType: ButtonLoadingStyle =
        props.styleType ||
        (props.spinnerPlacement === 'replace'
          ? 'spinner-replace'
          : props.spinnerPlacement === 'end'
          ? 'spinner-right'
          : 'spinner-left');

      renderLoadingStyle(buttonEl, styleType, props, customText || props.loadingText);
    } else if (status === 'success') {
      buttonEl.classList.remove('veil-btn-loading', 'veil-btn-error');
      buttonEl.classList.add('veil-btn-success');
      buttonEl.setAttribute('aria-busy', 'false');

      renderResult(buttonEl, 'success', customText || props.successText || 'Success', props.resultAnimation);

      const resetDelay = props.resetAfter !== undefined ? props.resetAfter : 2000;
      if (resetDelay > 0) {
        resetTimer = setTimeout(() => setStatus('idle'), resetDelay);
      }
    } else if (status === 'error') {
      buttonEl.classList.remove('veil-btn-loading', 'veil-btn-success');
      buttonEl.classList.add('veil-btn-error');
      buttonEl.setAttribute('aria-busy', 'false');

      renderResult(buttonEl, 'error', customText || props.errorText || 'Failed', props.resultAnimation);

      const resetDelay = props.resetAfter !== undefined ? props.resetAfter : 2000;
      if (resetDelay > 0) {
        resetTimer = setTimeout(() => setStatus('idle'), resetDelay);
      }
    }
  }

  // Promise-driven Click Handler
  const clickHandler = async (e: MouseEvent) => {
    if (currentStatus !== 'idle') {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (props.onClick) {
      try {
        const result = props.onClick(e);
        if (result && typeof result.then === 'function') {
          setStatus('loading');
          await result;
          setStatus('success');
        }
      } catch {
        setStatus('error');
      }
    }
  };

  buttonEl.addEventListener('click', clickHandler);

  if (props.status) {
    setStatus(props.status);
  } else if (props.loading) {
    setStatus('loading', props.loadingText);
  }

  return {
    setStatus,
    setLoading: (loading: boolean, text?: string) => setStatus(loading ? 'loading' : 'idle', text),
    getStatus: () => currentStatus,
    destroy: () => {
      clearResetTimer();
      buttonEl.removeEventListener('click', clickHandler);
      setStatus('idle');
    },
  };
}

function setupPressFeedback(btn: HTMLElement, feedback: ButtonPressFeedback): void {
  if (feedback === 'none') return;

  if (feedback === 'press-scale') {
    btn.style.transition = 'transform 100ms ease, box-shadow 150ms ease';
    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'scale(0.97)';
    });
    const reset = () => {
      btn.style.transform = 'scale(1)';
    };
    btn.addEventListener('mouseup', reset);
    btn.addEventListener('mouseleave', reset);
  } else if (feedback === 'ripple') {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';

    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.className = 'veil-btn-ripple';

      const existing = btn.querySelector('.veil-btn-ripple');
      if (existing) existing.remove();
      btn.appendChild(circle);
    });
  } else if (feedback === 'glow-follow') {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--veil-mouse-x', `${x}px`);
      btn.style.setProperty('--veil-mouse-y', `${y}px`);
    });
  }
}

function renderLoadingStyle(
  btn: HTMLElement,
  style: ButtonLoadingStyle,
  props: LoadingButtonProps,
  text?: string,
): void {
  const spinnerType = props.spinner || 'ring';
  const labelText = text || btn.textContent?.trim() || '';

  btn.innerHTML = '';

  switch (style) {
    case 'spinner-left': {
      const spinner = createSpinner({ type: spinnerType, size: 16, color: 'currentColor' });
      spinner.classList.add('veil-btn-spinner-wrap');
      const span = document.createElement('span');
      span.textContent = labelText;
      btn.append(spinner, span);
      break;
    }

    case 'spinner-right': {
      const span = document.createElement('span');
      span.textContent = labelText;
      const spinner = createSpinner({ type: spinnerType, size: 16, color: 'currentColor' });
      spinner.classList.add('veil-btn-spinner-wrap');
      spinner.style.marginLeft = '8px';
      spinner.style.marginRight = '0';
      btn.append(span, spinner);
      break;
    }

    case 'spinner-replace': {
      const spinner = createSpinner({ type: spinnerType, size: 20, color: 'currentColor' });
      btn.appendChild(spinner);
      break;
    }

    case 'dots-after-text': {
      const span = document.createElement('span');
      span.textContent = labelText;
      const dots = document.createElement('span');
      dots.className = 'veil-btn-typing-dots';
      dots.textContent = '...';
      btn.append(span, dots);
      break;
    }

    case 'progress-fill': {
      const progress = document.createElement('div');
      progress.className = 'veil-btn-progress-bar';
      const pct = props.progress !== undefined ? props.progress : 60;
      progress.style.width = `${pct}%`;
      const span = document.createElement('span');
      span.style.position = 'relative';
      span.style.zIndex = '2';
      span.textContent = labelText;
      btn.append(progress, span);
      break;
    }

    case 'shimmer-surface': {
      const span = document.createElement('span');
      span.textContent = labelText;
      span.style.position = 'relative';
      span.style.zIndex = '2';
      const shimmer = document.createElement('div');
      shimmer.className = 'veil-btn-shimmer';
      btn.append(span, shimmer);
      break;
    }

    case 'pulse-glow': {
      btn.classList.add('veil-btn-pulse-glow');
      const span = document.createElement('span');
      span.textContent = labelText;
      btn.appendChild(span);
      break;
    }

    case 'stripes-progress': {
      const stripes = document.createElement('div');
      stripes.className = 'veil-btn-stripes';
      const span = document.createElement('span');
      span.style.position = 'relative';
      span.style.zIndex = '2';
      span.textContent = labelText;
      btn.append(stripes, span);
      break;
    }

    case 'morph-circle': {
      btn.classList.add('veil-btn-morph');
      const spinner = createSpinner({ type: spinnerType, size: 20, color: 'currentColor' });
      btn.appendChild(spinner);
      break;
    }

    case 'slide-text': {
      const wrap = document.createElement('span');
      wrap.className = 'veil-btn-slide-wrap';
      const oldText = document.createElement('span');
      oldText.className = 'veil-btn-slide-out';
      oldText.textContent = labelText;
      const newText = document.createElement('span');
      newText.className = 'veil-btn-slide-in';
      newText.textContent = text || 'Loading…';
      wrap.append(oldText, newText);
      btn.appendChild(wrap);
      break;
    }

    case 'border-trace': {
      const span = document.createElement('span');
      span.textContent = labelText;
      span.style.position = 'relative';
      span.style.zIndex = '2';
      const trace = document.createElement('div');
      trace.className = 'veil-btn-border-trace';
      btn.append(span, trace);
      break;
    }

    case 'liquid-fill': {
      const liquid = document.createElement('div');
      liquid.className = 'veil-btn-liquid';
      const span = document.createElement('span');
      span.style.position = 'relative';
      span.style.zIndex = '2';
      span.textContent = labelText;
      btn.append(liquid, span);
      break;
    }

    case 'bounce-dots': {
      const spinner = createSpinner({ type: 'dots', size: 22, color: 'currentColor' });
      const span = document.createElement('span');
      span.textContent = labelText ? ` ${labelText}` : '';
      btn.append(spinner, span);
      break;
    }

    case 'glass-shine': {
      btn.classList.add('veil-btn-glass-shine');
      const span = document.createElement('span');
      span.textContent = labelText;
      btn.appendChild(span);
      break;
    }

    case 'neon-pulse': {
      btn.classList.add('veil-btn-neon-pulse');
      const span = document.createElement('span');
      span.textContent = labelText;
      btn.appendChild(span);
      break;
    }

    case 'skeleton-button': {
      const skel = document.createElement('div');
      skel.className = 'veil-skeleton';
      skel.setAttribute('data-veil-shape', 'button');
      skel.setAttribute('data-veil-anim', 'shimmer');
      skel.style.width = '100%';
      skel.style.height = '100%';
      btn.appendChild(skel);
      break;
    }
  }
}

function renderResult(
  btn: HTMLElement,
  type: 'success' | 'error',
  text: string,
  animation: string = 'checkmark',
): void {
  btn.innerHTML = '';
  btn.style.display = 'inline-flex';
  btn.style.alignItems = 'center';
  btn.style.justifyContent = 'center';
  btn.style.gap = '8px';

  if (type === 'error' && (animation === 'shake' || animation === 'cross' || animation === 'none')) {
    btn.classList.add('veil-btn-shake');
  }

  if (type === 'success' && animation === 'success-burst') {
    const burst = document.createElement('div');
    burst.className = 'veil-btn-burst';
    btn.appendChild(burst);
  }

  // Draw Animated SVG Icon
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.style.width = '18px';
  svg.style.height = '18px';
  svg.style.stroke = 'currentColor';
  svg.style.strokeWidth = '2.5';
  svg.style.fill = 'none';
  svg.style.strokeLinecap = 'round';
  svg.style.strokeLinejoin = 'round';

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  if (type === 'success') {
    path.setAttribute('d', 'M5 13l4 4L19 7');
  } else {
    path.setAttribute('d', 'M6 18L18 6M6 6l12 12');
  }
  path.style.strokeDasharray = '30';
  path.style.strokeDashoffset = '30';
  path.style.animation = 'veil-draw 300ms ease forwards';

  svg.appendChild(path);
  const label = document.createElement('span');
  label.textContent = text;

  btn.append(svg, label);
}

let buttonKeyframesInjected = false;
function injectButtonKeyframes(): void {
  if (buttonKeyframesInjected || typeof document === 'undefined') return;
  buttonKeyframesInjected = true;

  const style = document.createElement('style');
  style.id = 'veilkit-button-styles';
  style.textContent = `
    .veil-btn-loading { position: relative; cursor: wait !important; pointer-events: none; }
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
  `;
  document.head.appendChild(style);
}
