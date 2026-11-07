/**
 * Veilkit - Performance & Offscreen Observers
 * Automatically pauses animations when offscreen or when document is hidden
 */

let intersectionObserver: IntersectionObserver | null = null;
const observedElements = new Set<HTMLElement>();
let visibilityInitialized = false;

function handleIntersection(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    const el = entry.target as HTMLElement;
    if (entry.isIntersecting) {
      el.removeAttribute('data-veil-offscreen');
      el.style.removeProperty('--veil-play-state');
    } else {
      el.setAttribute('data-veil-offscreen', 'true');
      el.style.setProperty('--veil-play-state', 'paused');
    }
  }
}

/**
 * Ensures tab visibility change listener is attached
 */
export function setupVisibilityObserver(): void {
  if (visibilityInitialized || typeof document === 'undefined') return;
  visibilityInitialized = true;

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.documentElement.setAttribute('data-veil-tab-hidden', 'true');
    } else {
      document.documentElement.removeAttribute('data-veil-tab-hidden');
    }
  });
}

/**
 * Registers an element to pause CSS animations when outside the viewport
 */
export function observeOffscreen(element: HTMLElement): () => void {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return () => {};
  }

  setupVisibilityObserver();

  if (!intersectionObserver) {
    intersectionObserver = new IntersectionObserver(handleIntersection, {
      rootMargin: '100px 0px', // Pre-activate 100px before coming into view
      threshold: 0,
    });
  }

  intersectionObserver.observe(element);
  observedElements.add(element);

  return () => {
    if (intersectionObserver && element) {
      intersectionObserver.unobserve(element);
      observedElements.delete(element);
    }
  };
}

/**
 * Disconnects all observers
 */
export function teardownObservers(): void {
  if (intersectionObserver) {
    intersectionObserver.disconnect();
    intersectionObserver = null;
  }
  observedElements.clear();
}
