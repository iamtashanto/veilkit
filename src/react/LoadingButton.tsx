'use client';

import { useRef, useEffect, ButtonHTMLAttributes, ReactNode } from 'react';
import { LoadingButtonProps } from '../core/types';
import { wrapLoadingButton } from '../core/button';

export interface ReactLoadingButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
    LoadingButtonProps {
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function LoadingButton({
  loading = false,
  spinner = 'ring',
  spinnerPlacement = 'start',
  loadingText,
  disabled,
  children,
  className = '',
  onClick,
  ...rest
}: ReactLoadingButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const controllerRef = useRef<ReturnType<typeof wrapLoadingButton> | null>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    if (!controllerRef.current) {
      controllerRef.current = wrapLoadingButton(buttonRef.current, {
        loading,
        spinner,
        spinnerPlacement,
        loadingText,
      });
    } else {
      controllerRef.current.setLoading(loading, loadingText);
    }

    return () => {
      if (controllerRef.current) {
        controllerRef.current.destroy();
        controllerRef.current = null;
      }
    };
  }, [loading, spinner, spinnerPlacement, loadingText]);

  return (
    <button
      ref={buttonRef}
      className={`veil-button ${className}`.trim()}
      disabled={disabled || loading}
      onClick={loading ? undefined : onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
