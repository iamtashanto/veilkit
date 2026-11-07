import { describe, it, expect } from 'vitest';
import { veil, skeletonAction, spinnerAction } from '../../src/svelte';

describe('Svelte Adapter', () => {
  it('should attach and update use:veil action on DOM node', () => {
    const node = document.createElement('div');
    document.body.appendChild(node);

    const action = veil(node, { loading: true });
    expect(node.getAttribute('aria-busy')).toBe('true');

    action.update({ loading: false });
    expect(node.getAttribute('aria-busy')).toBeNull();

    action.destroy();
    node.remove();
  });

  it('should attach skeletonAction and spinnerAction to DOM nodes', () => {
    const node1 = document.createElement('div');
    const s1 = skeletonAction(node1, { width: 100, height: 20 });
    expect(node1.querySelector('.veil-skeleton')).not.toBeNull();
    s1.destroy();

    const node2 = document.createElement('div');
    const s2 = spinnerAction(node2, { type: 'bars' });
    expect(node2.querySelector('.veil-spinner-bars')).not.toBeNull();
    s2.destroy();
  });
});
