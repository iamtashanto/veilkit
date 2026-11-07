'use client';

import React, { useRef, useEffect } from 'react';
import { PresetProps } from '../core/types';
import { createPreset } from '../core/presets';
import { useVeil } from './context';
import { injectStyles } from '../core/css';

export function SkeletonPreset(props: PresetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const context = useVeil();

  useEffect(() => {
    injectStyles(context.nonce);
    if (!containerRef.current) return;

    const el = createPreset({
      ...props,
      animation: props.animation || context.animation,
      theme: props.theme || context.theme,
    });

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(el);
  }, [props, context.animation, context.theme, context.nonce]);

  return <div ref={containerRef} className={`veil-preset-react-wrap ${props.className || ''}`.trim()} />;
}

// Preset shortcuts
export const SkeletonCard = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="card" />;
export const SkeletonProductCard = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="product-card" />;
export const SkeletonProductGrid = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="product-grid" />;
export const SkeletonList = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="list" />;
export const SkeletonListItem = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="list-item" />;
export const SkeletonTable = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="table" />;
export const SkeletonProfile = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="profile" />;
export const SkeletonFeedPost = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="feed-post" />;
export const SkeletonArticle = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="article" />;
export const SkeletonDashboard = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="dashboard" />;
export const SkeletonForm = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="form" />;
export const SkeletonNavbar = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="navbar" />;
export const SkeletonSidebar = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="sidebar" />;
