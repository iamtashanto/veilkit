'use client';

import { useRef, useEffect, ButtonHTMLAttributes, ReactNode } from 'react';
import { LoadingButtonProps } from '../core/types';
import { wrapLoadingButton } from '../core/button';

export interface ReactLoadingButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
    LoadingButtonProps {
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<any> | void;
}

export function LoadingButton({
  status,
  loading = false,
  styleType = 'spinner-left',
  spinner = 'ring',
  spinnerPlacement = 'start',
  loadingText,
  successText,
  errorText,
  resetAfter = 2000,
  progress,
  pressFeedback = 'press-scale',
  resultAnimation = 'checkmark',
  haptics,
  disabled,
  children,
  className = '',
  onStatusChange,
  onClick,
  ...rest
}: ReactLoadingButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const controllerRef = useRef<ReturnType<typeof wrapLoadingButton> | null>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    if (!controllerRef.current) {
      controllerRef.current = wrapLoadingButton(buttonRef.current, {
        status,
        loading,
        styleType,
        spinner,
        spinnerPlacement,
        loadingText,
        successText,
        errorText,
        resetAfter,
        progress,
        pressFeedback,
        resultAnimation,
        haptics,
        onStatusChange,
        onClick,
      });
    } else {
      controllerRef.current.setLoading(loading, loadingText);
      if (status !== undefined) {
        controllerRef.current.setStatus(status);
      } else {
        controllerRef.current.setLoading(loading, loadingText);
      }
    }

    return () => {
      if (controllerRef.current) {
        controllerRef.current.destroy();
        controllerRef.current = null;
      }
    };
  }, [loading, spinner, spinnerPlacement, loadingText]);
  }, [
    status,
    loading,
    styleType,
    spinner,
    spinnerPlacement,
    loadingText,
    successText,
    errorText,
    resetAfter,
    progress,
    pressFeedback,
    resultAnimation,
  ]);

  return (
    <button
      ref={buttonRef}
      className={`veil-button ${className}`.trim()}
      disabled={disabled || loading}
      onClick={loading ? undefined : onClick}
      disabled={disabled || loading || status === 'loading'}
      {...rest}
    >
      {children}
    </button>
  );
}
