'use client';

import { createContext, useContext, useEffect, useMemo, ReactNode } from 'react';
import { VeilGlobalConfig, VeilThemeName, VeilAnimationName, CustomThemeInput } from '../core/types';
import { injectStyles, setNonce } from '../core/css';
import { setLocale, setLabels } from '../core/a11y';

interface VeilContextValue extends VeilGlobalConfig {
  theme?: VeilThemeName | CustomThemeInput;
  animation?: VeilAnimationName;
}

const VeilContext = createContext<VeilContextValue>({
  theme: 'light',
  animation: 'shimmer',
});

export interface VeilProviderProps extends VeilGlobalConfig {
  children?: ReactNode;
}

export function VeilProvider({
  children,
  theme = 'light',
  animation = 'shimmer',
  nonce,
  locale,
  labels,
  antiFlicker,
}: VeilProviderProps) {
  useEffect(() => {
    if (nonce) setNonce(nonce);
    if (locale) setLocale(locale);
    if (labels) setLabels(labels);
    injectStyles(nonce);
  }, [nonce, locale, labels]);

  const value = useMemo(
    () => ({
      theme,
      animation,
      nonce,
      locale,
      labels,
      antiFlicker,
    }),
    [theme, animation, nonce, locale, labels, antiFlicker],
  );

  return <VeilContext.Provider value={value}>{children}</VeilContext.Provider>;
}

export function useVeil(): VeilContextValue {
  return useContext(VeilContext);
}
