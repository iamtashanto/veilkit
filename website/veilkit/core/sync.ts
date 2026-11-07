/**
 * Veilkit - Global Synchronized Timeline
 * Keeps all shimmer animations in lockstep phase via negative animation-delay
 */

let globalStartTime: number = 0;

/**
 * Initializes or gets the baseline global timeline origin
 */
export function getTimelineOrigin(): number {
  if (globalStartTime === 0 && typeof performance !== 'undefined') {
    globalStartTime = performance.now();
  }
  return globalStartTime;
}

/**
 * Computes a negative animation-delay string so that an element mounting right now
 * is in exact phase synchronization with all other animations sharing this duration.
 *
 * @param durationMs Duration in milliseconds (default 1500)
 * @returns CSS animation-delay value, e.g. "-642ms"
 */
export function getSyncDelay(durationMs: number = 1500): string {
  if (typeof performance === 'undefined') return '0ms';
  const elapsed = performance.now() - getTimelineOrigin();
  const phaseOffset = Math.round(elapsed % durationMs);
  return `-${phaseOffset}ms`;
}

/**
 * Parses duration string (e.g. "1.5s", "800ms") into milliseconds
 */
export function parseDurationMs(duration: string | number = 1500): number {
  if (typeof duration === 'number') return duration;
  if (!duration) return 1500;
  const trimmed = duration.trim().toLowerCase();
  if (trimmed.endsWith('ms')) {
    return parseFloat(trimmed) || 1500;
  }
  if (trimmed.endsWith('s')) {
    return (parseFloat(trimmed) || 1.5) * 1000;
  }
  return parseFloat(trimmed) || 1500;
}
