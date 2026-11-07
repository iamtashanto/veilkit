import { describe, it, expect } from 'vitest';
import veil from '../../src/core/controller';

describe('Core - Imperative Controller API', () => {
  it('should expose all imperative methods', () => {
    expect(typeof veil.configure).toBe('function');
    expect(typeof veil.skeleton).toBe('function');
    expect(typeof veil.spinner).toBe('function');
    expect(veil.overlay).toBeDefined();
    expect(veil.progress).toBeDefined();
    expect(veil.manager).toBeDefined();
    expect(typeof veil.track).toBe('function');
    expect(typeof veil.wrapFetch).toBe('function');
  });

  it('should configure global defaults', () => {
    veil.configure({
      theme: 'glass',
      animation: 'aurora',
      locale: 'fr',
    });
    expect(veil.getThemeTokens('glass')).toBeDefined();
  });

  it('should create skeleton controller with show, hide, update, destroy lifecycle', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);

    const controller = veil.skeleton(el, { animation: 'pulse' });
    expect(controller.element).toBe(el);
    expect(el.getAttribute('aria-busy')).toBe('true');

    controller.update({ animation: 'wave' });
    controller.hide();
    expect(el.getAttribute('aria-busy')).toBeNull();

    controller.show();
    expect(el.getAttribute('aria-busy')).toBe('true');

    controller.destroy();
    el.remove();
  });

  it('should attach spinner via veil.spinner()', () => {
    const target = document.createElement('div');
    const spinner = veil.spinner(target, { type: 'bars' });
    expect(spinner.classList.contains('veil-spinner-bars')).toBe(true);
    expect(target.children.length).toBe(1);
  });
});
