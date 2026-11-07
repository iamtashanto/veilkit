'use client';

import { useRef, useEffect } from 'react';
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
export const SkeletonProductDetail = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="product-detail" />;
export const SkeletonNewsFeed = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="news-feed" />;
export const SkeletonInboxList = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="inbox-list" />;
export const SkeletonNotificationList = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="notification-list" />;
export const SkeletonOrderList = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="order-list" />;
export const SkeletonKpiCard = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="kpi-card" />;
export const SkeletonChartBar = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="chart-bar" />;
export const SkeletonChartLine = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="chart-line" />;
export const SkeletonChartPie = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="chart-pie" />;
export const SkeletonSearchResults = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="search-results" />;
export const SkeletonVideoPlayer = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="video-player" />;
export const SkeletonMusicPlayer = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="music-player" />;
export const SkeletonStoriesRow = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="stories-row" />;
export const SkeletonReels = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="reels" />;
export const SkeletonTabs = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="tabs" />;
export const SkeletonCalendar = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="calendar" />;
export const SkeletonKanban = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="kanban" />;
export const SkeletonTimeline = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="timeline" />;
export const SkeletonMapCard = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="map-card" />;
export const SkeletonPricingCard = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="pricing-card" />;
export const SkeletonTestimonial = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="testimonial" />;
export const SkeletonFaqAccordion = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="faq-accordion" />;
export const SkeletonFileExplorer = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="file-explorer" />;
export const SkeletonCodeBlock = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="code-block" />;
export const SkeletonCheckout = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="e-commerce-checkout" />;
export const SkeletonSocialStory = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="social-story" />;
export const SkeletonHeroBanner = (props: Omit<PresetProps, 'name'>) => <SkeletonPreset {...props} name="hero-banner" />;
