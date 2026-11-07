'use client';

import { useRef, useEffect, ButtonHTMLAttributes, ReactNode } from 'react';
import { LoadingButtonProps } from '../core/types';
import { wrapLoadingButton } from '../core/button';

export interface ReactLoadingButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
    LoadingButtonProps {
  children?: ReactNode;
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

  // Keep latest callbacks in ref to avoid recreation
  const callbacksRef = useRef({ onStatusChange, onClick });
  callbacksRef.current = { onStatusChange, onClick };

  // Initialize/reconfigure controller when core options change
  useEffect(() => {
    if (!buttonRef.current) return;

    const controller = wrapLoadingButton(buttonRef.current, {
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
      onStatusChange: (s) => callbacksRef.current.onStatusChange?.(s),
      onClick: (e) => callbacksRef.current.onClick?.(e),
    });

    controllerRef.current = controller;

    return () => {
      controller.destroy();
      controllerRef.current = null;
    };
  }, [
    styleType,
    spinner,
    spinnerPlacement,
    resetAfter,
    pressFeedback,
    resultAnimation,
    haptics,
  ]);

  // Synchronize state without destroying controller
  useEffect(() => {
    if (!controllerRef.current) return;

    if (status !== undefined) {
      if (controllerRef.current.getStatus() !== status) {
        controllerRef.current.setStatus(status);
      }
    } else {
      controllerRef.current.setLoading(loading, loadingText);
    }
  }, [status, loading, loadingText]);

  return (
    <button
      ref={buttonRef}
      className={`veil-button ${className}`.trim()}
      disabled={disabled || loading || status === 'loading'}
      {...rest}
    >
      {children}
    </button>
  );
}
