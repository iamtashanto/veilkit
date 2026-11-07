import { describe, it, expect } from 'vitest';
import { overlayController } from '../../src/core/overlay';

describe('Core - Overlay', () => {
  it('should show and hide container-level overlay with message and spinner', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const overlay = overlayController.show(container, {
      message: 'Processing payment…',
      blur: true,
    });

    expect(overlay).toBeInstanceOf(HTMLElement);
    expect(overlay.classList.contains('veil-overlay')).toBe(true);
    expect(container.getAttribute('aria-busy')).toBe('true');
    expect(overlay.textContent).toContain('Processing payment…');

    overlayController.hide(container);
  });
});
