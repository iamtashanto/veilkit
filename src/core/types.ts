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
  | 'settings-page';

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
  | 'progress-circle';

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

export interface LoadingButtonProps {
  loading?: boolean;
  spinner?: VeilSpinnerType;
  spinnerPlacement?: 'start' | 'end' | 'replace';
  loadingText?: string;
  disabled?: boolean;
  className?: string;
  children?: any;
  onClick?: (event: any) => void;
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
