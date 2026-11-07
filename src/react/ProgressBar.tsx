'use client';

import React, { useRef, useEffect } from 'react';
import { ProgressProps } from '../core/types';
import { createProgressElement, progressController } from '../core/progress';
import { injectStyles } from '../core/css';

export function ProgressBar(props: ProgressProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectStyles();
    if (!containerRef.current) return;

    const el = createProgressElement(props);
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(el);
  }, [props.value, props.max, props.height, props.color, props.trackColor, props.circular, props.size, props.showPercentage]);

  return <div ref={containerRef} className={`veil-progress-react ${props.className || ''}`.trim()} />;
}

export interface RouteProgressProps {
  color?: string;
}

/**
 * Route Progress Bar for Next.js and React SPA routers
 */
export function RouteProgress({ color = '#3b82f6' }: RouteProgressProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.style.setProperty('--veil-progress-color', color);

    const handleBeforeUnload = () => {
      progressController.start();
    };

    const handlePopState = () => {
      progressController.start();
      setTimeout(() => progressController.done(), 300);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [color]);

  return null;
}
