'use client';

import React, { useRef, useEffect } from 'react';
import { SpinnerProps } from '../core/types';
import { createSpinner } from '../core/spinners';
import { injectStyles } from '../core/css';

export function Spinner(props: SpinnerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectStyles();
    if (!containerRef.current) return;

    const el = createSpinner(props);
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(el);
  }, [props.type, props.size, props.color, props.secondaryColor, props.speed, props.label]);

  return (
    <div
      ref={containerRef}
      className={`veil-spinner-wrap ${props.className || ''}`.trim()}
      style={{ display: 'inline-flex', ...props.style }}
    />
  );
}
