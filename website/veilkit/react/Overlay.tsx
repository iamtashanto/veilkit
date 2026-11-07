'use client';

import React, { useRef, useEffect } from 'react';
import { OverlayProps } from '../core/types';
import { overlayController } from '../core/overlay';

export interface ReactOverlayProps extends OverlayProps {
  children?: React.ReactNode;
}

export function Overlay({
  visible = false,
  blur = true,
  opacity,
  color,
  spinner = true,
  message,
  lockScroll = false,
  className = '',
  zIndex,
  children,
}: ReactOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const target = containerRef.current;

    if (visible) {
      overlayController.show(target, {
        blur,
        opacity,
        color,
        spinner,
        message,
        lockScroll,
        className,
        zIndex,
      });
    } else {
      overlayController.hide(target);
    }

    return () => {
      overlayController.hide(target);
    };
  }, [visible, blur, opacity, color, spinner, message, lockScroll, className, zIndex]);

  return (
    <div
      ref={containerRef}
      className="veil-overlay-target"
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {children}
    </div>
  );
}
