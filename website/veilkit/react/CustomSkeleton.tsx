'use client';

import { useRef, useEffect } from 'react';
import { CustomSkeletonConfig } from '../core/types';
import { createCustomSkeleton } from '../core/custom-builder';
import { useVeil } from './context';
import { injectStyles } from '../core/css';

export interface CustomSkeletonProps {
  config: CustomSkeletonConfig;
  className?: string;
  style?: React.CSSProperties;
}

export function CustomSkeleton({ config, className = '', style }: CustomSkeletonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const context = useVeil();

  useEffect(() => {
    injectStyles(context.nonce);
    if (!containerRef.current) return;

    const el = createCustomSkeleton({
      ...config,
      animation: config.animation || context.animation,
      theme: config.theme || context.theme,
    });

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(el);
  }, [config, context.animation, context.theme, context.nonce]);

  return <div ref={containerRef} className={`veil-custom-skeleton-wrap ${className}`.trim()} style={style} />;
}
