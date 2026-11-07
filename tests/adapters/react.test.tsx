import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { Skeleton, Spinner, LoadingButton, VeilProvider } from '../../src/react';

describe('React Adapter', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('should render Skeleton with props and provider defaults', async () => {
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <VeilProvider theme="glass" animation="aurora">
          <Skeleton width={180} height={24} radius={6} ariaLabel="Loading title" />
        </VeilProvider>,
      );
    });

    const skeleton = container.querySelector('.veil-skeleton') as HTMLElement;
    expect(skeleton).not.toBeNull();
    expect(skeleton.getAttribute('data-veil-anim')).toBe('aurora');
    expect(skeleton.getAttribute('data-veil-theme')).toBe('glass');
    expect(skeleton.style.width).toBe('180px');
  });

  it('should render Spinner', async () => {
    const root = createRoot(container);
    await act(async () => {
      root.render(<Spinner type="dots" size={24} />);
    });
    expect(container.querySelector('.veil-spinner-dots')).not.toBeNull();
  });

  it('should render LoadingButton', async () => {
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <LoadingButton loading={false} spinner="ring">
          Click Me
        </LoadingButton>,
      );
    });

    const btn = container.querySelector('button');
    expect(btn).not.toBeNull();
    expect(btn?.textContent).toBe('Click Me');
  });
});
