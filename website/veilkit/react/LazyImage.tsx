'use client';

import { useRef, useEffect } from 'react';
import { LazyImageProps } from '../core/types';
import { createLazyImage } from '../core/lazy-image';

export function LazyImage(props: LazyImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = createLazyImage(props);
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(el);
  }, [props.src, props.alt, props.width, props.height, props.radius, props.aspectRatio]);

  return <div ref={containerRef} className={`veil-lazy-image-host ${props.className || ''}`.trim()} />;
}
