'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { SkeletonProps, AutoMeasureOptions } from '../core/types';
import { useVeil } from './context';
import { injectStyles } from '../core/css';
import { getSyncDelay, parseDurationMs } from '../core/sync';
import { createAutoMeasureOverlay } from '../core/measure';
import { useDelayedLoading } from './hooks';

export interface ReactSkeletonProps extends SkeletonProps {
  children?: ReactNode;
  circle?: boolean;
}

export function Skeleton({
  type = 'rect',
  circle,
  width,
  height,
  radius,
  count = 1,
  gap = '0.5rem',
  lines,
  lastLineWidth = '65%',
  animation,
  theme,
  direction,
  speed,
  className = '',
  style = {},
  ariaLabel = 'Loading',
  children,
}: ReactSkeletonProps) {
  const context = useVeil();
  useEffect(() => {
    injectStyles(context.nonce);
  }, [context.nonce]);

  const effectiveAnim = animation || context.animation || 'shimmer';
  const effectiveTheme = theme || context.theme || 'light';
  const effectiveShape = circle ? 'circle' : (lines ? 'line' : type);

  const durMs = parseDurationMs(speed || 1500);
  const syncDelay = typeof window !== 'undefined' ? getSyncDelay(durMs) : '0s';

  const baseInlineStyle: Record<string, any> = {
    ...style,
    '--veil-sync-delay': syncDelay,
  };

  if (speed) {
    baseInlineStyle['--veil-duration'] = `${durMs}ms`;
  }
  if (width !== undefined) {
    baseInlineStyle.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height !== undefined) {
    baseInlineStyle.height = typeof height === 'number' ? `${height}px` : height;
  }
  if (radius !== undefined) {
    const r = typeof radius === 'number' ? `${radius}px` : radius;
    baseInlineStyle['--veil-radius'] = r;
    baseInlineStyle.borderRadius = r;
  }
  if (circle) {
    baseInlineStyle.borderRadius = '50%';
    baseInlineStyle.aspectRatio = '1 / 1';
  }

  // Multi-line paragraph
  const totalLines = lines || (count > 1 ? count : 1);
  if (totalLines > 1) {
    const defaultWidths = ['100%', '94%', '88%', '75%'];
    const gapVal = typeof gap === 'number' ? `${gap}px` : gap;

    return (
      <div
        className={`veil-lines-group ${className}`.trim()}
        role="status"
        aria-label={ariaLabel}
        style={{ display: 'flex', flexDirection: 'column', gap: gapVal }}
      >
        <span className="veil-sr-only">{ariaLabel}</span>
        {Array.from({ length: totalLines }).map((_, i) => {
          const isLast = i === totalLines - 1;
          const lineWidth = isLast ? lastLineWidth : (defaultWidths[i % defaultWidths.length] || '95%');
          return (
            <div
              key={i}
              className="veil-skeleton"
              data-veil-shape="line"
              data-veil-anim={effectiveAnim}
              data-veil-theme={typeof effectiveTheme === 'string' ? effectiveTheme : undefined}
              data-veil-dir={direction}
              aria-hidden="true"
              style={{
                ...baseInlineStyle,
                width: lineWidth,
                ['--veil-stagger-idx' as any]: i,
              }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`veil-skeleton ${className}`.trim()}
      data-veil-shape={effectiveShape}
      data-veil-anim={effectiveAnim}
      data-veil-theme={typeof effectiveTheme === 'string' ? effectiveTheme : undefined}
      data-veil-dir={direction}
      role="status"
      aria-label={ariaLabel}
      style={baseInlineStyle}
    >
      <span className="veil-sr-only">{ariaLabel}</span>
      {children}
    </div>
  );
}

export interface VeilWrapperProps extends AutoMeasureOptions {
  loading: boolean;
  children: ReactNode;
  skeletonProps?: SkeletonProps;
}

/**
 * Auto-Measure wrapper component
 * Wraps real content, measures layout upon loading, and reveals cleanly with no hydration mismatches
 */
export function Veil({
  loading,
  children,
  cacheKey,
  persistCache,
  ignoreSelector,
  observeResize = true,
  observeMutations = true,
  preserveBackground = true,
  reveal = 'fade',
  revealDuration = 350,
  revealEasing,
  delay = 150,
  minVisible = 300,
  skeletonProps,
}: VeilWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visible = useDelayedLoading(loading, { delay, minVisible });

  useEffect(() => {
    if (!visible || !containerRef.current) return;

    const instance = createAutoMeasureOverlay(
      containerRef.current,
      {
        cacheKey,
        persistCache,
        ignoreSelector,
        observeResize,
        observeMutations,
        preserveBackground,
        reveal,
        revealDuration,
        revealEasing,
      },
      skeletonProps,
    );

    return () => {
      instance.destroy();
    };
  }, [
    visible,
    cacheKey,
    persistCache,
    ignoreSelector,
    observeResize,
    observeMutations,
    preserveBackground,
    reveal,
    revealDuration,
    revealEasing,
    skeletonProps,
  ]);

  return (
    <div
      ref={containerRef}
      className="veil-measure-wrapper"
      aria-busy={visible}
      style={{ position: 'relative' }}
    >
      {children}
    </div>
  );
}
