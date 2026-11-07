import { describe, it, expect } from 'vitest';
import { createApp, h } from 'vue';
import { veilkitPlugin, VSkeleton } from '../../src/vue';

describe('Vue 3 Adapter', () => {
  it('should install veilkit plugin and register global directives/components', () => {
    const app = createApp({ render: () => h('div') });
    app.use(veilkitPlugin);

    expect(app.directive('veil')).toBeDefined();
    expect(app.component('VSkeleton')).toBeDefined();
    expect(app.component('VSpinner')).toBeDefined();
  });

  it('should mount VSkeleton component in a DOM element', () => {
    const container = document.createElement('div');
    const app = createApp({
      render: () => h(VSkeleton, { width: 120, height: 20, animation: 'pulse' }),
    });
    app.mount(container);

    const skeleton = container.querySelector('.veil-skeleton');
    expect(skeleton).not.toBeNull();
    expect(skeleton?.getAttribute('data-veil-anim')).toBe('pulse');
    app.unmount();
  });
});
