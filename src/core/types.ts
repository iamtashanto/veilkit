/**
 * Veilkit - Core Type Definitions
 * Complete Loading & Skeleton UI Toolkit
 */

export type VeilThemeName =
  | 'light'
  | 'dark'
  | 'auto'
  | 'glass'
  | 'ios'
  | 'material'
  | 'minimal'
  | 'mono'
  | 'neon'
  | 'sunset'
  | 'ocean';

export type VeilAnimationName =
  | 'shimmer'
  | 'wave'
  | 'pulse'
  | 'blink'
  | 'breathe'
  | 'glass-shine'
  | 'gradient-flow'
  | 'aurora'
  | 'scan-line'
  | 'sparkle'
  | 'neon-glow'
  | 'stagger'
  | 'ripple'
  | 'ping-pong'
  | 'wipe'
  | 'cascade'
  | 'spotlight'
  | 'rainbow'
  | 'heartbeat'
  | 'liquid'
  | 'stripes'
  | 'halftone'
  | 'border-glow'
  | 'typewriter'
  | 'glitch'
  | 'pixelate'
  | 'tilt'
  | 'diagonal-sweep'
  | 'bounce-in'
  | 'fade-slide'
  | 'none';

export type VeilDirection = 'ltr' | 'rtl' | 'ttb' | 'btt';

export type VeilPrimitiveType =
  | 'line'
  | 'paragraph'
  | 'heading'
  | 'circle'
  | 'rect'
  | 'image'
  | 'button'
  | 'badge'
  | 'icon'
  | 'input'
  | 'table-row'
  | 'divider';

export type VeilShapeStyle = 'rounded' | 'pill' | 'square' | 'sharp' | 'glass';

export type VeilPresetName =
  | 'card'
  | 'product-card'
  | 'product-grid'
  | 'list'
  | 'list-item'
  | 'table'
  | 'profile'
  | 'profile-header'
  | 'feed-post'
  | 'article'
  | 'comment-thread'
  | 'chat'
  | 'dashboard'
  | 'form'
  | 'media-card'
  | 'navbar'
  | 'sidebar'
  | 'settings-page'
  | 'product-detail'
  | 'news-feed'
  | 'inbox-list'
  | 'notification-list'
  | 'order-list'
  | 'kpi-card'
  | 'chart-bar'
  | 'chart-line'
  | 'chart-pie'
  | 'search-results'
  | 'video-player'
  | 'music-player'
  | 'stories-row'
  | 'reels'
  | 'tabs'
  | 'calendar'
  | 'kanban'
  | 'timeline'
  | 'map-card'
  | 'pricing-card'
  | 'testimonial'
  | 'faq-accordion'
  | 'file-explorer'
  | 'code-block'
  | 'e-commerce-checkout'
  | 'social-story'
  | 'hero-banner';

export type VeilSpinnerType =
  | 'ring'
  | 'dual-ring'
  | 'dots'
  | 'bars'
  | 'pulse'
  | 'orbit'
  | 'wave'
  | 'bounce'
  | 'ios-activity'
  | 'glass-orb'
  | 'morph'
  | 'progress-circle'
  | 'arc-gradient'
  | 'pulse-ring'
  | 'dots-circle'
  | 'grid-dots'
  | 'square-flip'
  | 'cube-fold'
  | 'hourglass'
  | 'infinity'
  | 'heartbeat-line'
  | 'equalizer'
  | 'chasing-dots'
  | 'typing'
  | 'liquid-fill'
  | 'atom'
  | 'clock'
  | 'radar'
  | 'ellipsis'
  | 'flower';

export type VeilRevealTransition =
  | 'fade'
  | 'blur-in'
  | 'slide-up'
  | 'scale'
  | 'stagger-children'
  | 'none';

export interface VeilThemeTokens {
  base: string;
  highlight: string;
  radius: string;
  duration: string;
  easing: string;
  blur?: string;
  border?: string;
  glow?: string;
  contrast?: string;
}

export type CustomThemeInput = Partial<VeilThemeTokens> & {
  name: string;
  parent?: VeilThemeName;
};

export interface VeilGlobalConfig {
  theme?: VeilThemeName | CustomThemeInput;
  animation?: VeilAnimationName;
  duration?: number | string;
  easing?: string;
  direction?: VeilDirection;
  speedMultiplier?: number;
  intensity?: number; // 0.1 to 2.0
  nonce?: string;
  locale?: string;
  labels?: Record<string, string>;
  syncTimeline?: boolean;
  pauseOffscreen?: boolean;
  respectReducedMotion?: boolean;
  antiFlicker?: {
    delay?: number;
    minVisible?: number;
  };
}

export interface SkeletonProps {
  type?: VeilPrimitiveType;
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  count?: number;
  gap?: string | number;
  lines?: number;
  lastLineWidth?: string | number;
  animation?: VeilAnimationName;
  theme?: VeilThemeName | CustomThemeInput;
  direction?: VeilDirection;
  speed?: number | string;
  intensity?: number;
  className?: string;
  style?: Record<string, string | number>;
  ariaLabel?: string;
}

export interface PresetProps extends Omit<SkeletonProps, 'type'> {
  name: VeilPresetName;
  items?: number;
  columns?: number;
  shape?: VeilShapeStyle;
}

export interface AutoMeasureOptions {
  container?: HTMLElement;
  cacheKey?: string;
  persistCache?: boolean;
  ignoreSelector?: string;
  observeMutations?: boolean;
  observeResize?: boolean;
  preserveBackground?: boolean;
  reveal?: VeilRevealTransition;
  revealDuration?: number;
  revealEasing?: string;
  delay?: number;
  minVisible?: number;
}

export interface SkeletonController {
  element: HTMLElement;
  show: () => void;
  hide: () => void;
  update: (props: Partial<SkeletonProps>) => void;
  destroy: () => void;
}

export interface SpinnerProps {
  type?: VeilSpinnerType;
  size?: number | string;
  color?: string;
  secondaryColor?: string;
  speed?: number | string;
  label?: string;
  glass?: boolean;
  className?: string;
  style?: Record<string, string | number>;
}

export interface ProgressProps {
  value?: number; // 0 to 100, undefined for indeterminate
  max?: number;
  height?: number | string;
  color?: string;
  trackColor?: string;
  circular?: boolean;
  size?: number | string;
  strokeWidth?: number;
  trickle?: boolean;
  showPercentage?: boolean;
  status?: 'loading' | 'success' | 'error';
  className?: string;
}

export interface OverlayProps {
  target?: HTMLElement | string;
  visible?: boolean;
  blur?: boolean | string;
  opacity?: number;
  color?: string;
  spinner?: VeilSpinnerType | boolean;
  message?: string;
  lockScroll?: boolean;
  className?: string;
  zIndex?: number;
}

export type ButtonStatus = 'idle' | 'loading' | 'success' | 'error';

export type ButtonLoadingStyle =
  | 'spinner-left'
  | 'spinner-right'
  | 'spinner-replace'
  | 'dots-after-text'
  | 'progress-fill'
  | 'shimmer-surface'
  | 'pulse-glow'
  | 'stripes-progress'
  | 'morph-circle'
  | 'slide-text'
  | 'border-trace'
  | 'liquid-fill'
  | 'bounce-dots'
  | 'glass-shine'
  | 'neon-pulse'
  | 'skeleton-button';

export type ButtonPressFeedback = 'ripple' | 'press-scale' | 'glow-follow' | 'none';

export type ButtonResultAnimation = 'checkmark' | 'cross' | 'shake' | 'success-burst' | 'none';

export interface LoadingButtonProps {
  status?: ButtonStatus;
  loading?: boolean;
  styleType?: ButtonLoadingStyle;
  spinner?: VeilSpinnerType;
  spinnerPlacement?: 'start' | 'end' | 'replace';
  loadingText?: string;
  successText?: string;
  errorText?: string;
  resetAfter?: number;
  progress?: number;
  pressFeedback?: ButtonPressFeedback;
  resultAnimation?: ButtonResultAnimation;
  haptics?: boolean;
  disabled?: boolean;
  className?: string;
  children?: any;
  onStatusChange?: (status: ButtonStatus) => void;
  onClick?: (event: any) => Promise<any> | void;
}

export interface LazyImageProps {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  aspectRatio?: string | number;
  animation?: VeilAnimationName;
  theme?: VeilThemeName;
  reveal?: VeilRevealTransition;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: (err: any) => void;
  className?: string;
}

export interface TextLoaderProps {
  text?: string;
  dots?: number;
  speed?: number;
  locale?: string;
  className?: string;
}

export type CustomSkeletonNodeType =
  | 'row'
  | 'col'
  | 'card'
  | 'avatar'
  | 'heading'
  | 'line'
  | 'rect'
  | 'image'
  | 'button'
  | 'badge'
  | 'divider'
  | 'custom';

export interface CustomSkeletonNode {
  type: CustomSkeletonNodeType;
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  count?: number;
  gap?: string | number;
  align?: 'start' | 'center' | 'end' | 'between';
  children?: CustomSkeletonNode[];
  className?: string;
  style?: Record<string, string | number>;
}

export interface CustomSkeletonConfig {
  nodes: CustomSkeletonNode[];
  animation?: VeilAnimationName;
  theme?: VeilThemeName | CustomThemeInput;
  direction?: VeilDirection;
  shape?: VeilShapeStyle;
  gap?: string | number;
  className?: string;
  style?: Record<string, string | number>;
}
