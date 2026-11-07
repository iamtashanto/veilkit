# Changelog

All notable changes to `veilkit` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-11-07

### Added
- **Custom Skeleton Layout Builder**:
  - Fluent builder class `SkeletonBuilder` for programmatic skeleton tree construction: `.card()`, `.row()`, `.col()`, `.avatar()`, `.heading()`, `.lines()`, `.button()`, `.rect()`, `.badge()`, `.toConfig()`, `.build()`, and `.toCode()`.
  - Declarative DOM engine `createCustomSkeleton(config)` converting JSON layout trees into responsive, GPU-animated DOM elements.
  - React `<CustomSkeleton config={...} />` component with SSR compatibility.
  - Visual Custom Skeleton Studio on official website (`https://veilkit.tashanto.com/custom-builder`).
- **45 Canonical Presets** (expanded from 40):
  - Added 5 new high-demand layout presets:
    - `code-block`: Code editor frame with window controls, line numbers, and token lines.
    - `file-explorer`: Hierarchical IDE file tree with folder icons and indented file items.
    - `e-commerce-checkout`: Multi-step address/payment form with order total sidebar summary.
    - `social-story`: Full-screen mobile story view with multi-segment top progress bars.
    - `hero-banner`: Large centered marketing headline, subtitle, badge, and dual CTA buttons.
- **Production Website & Documentation Overhaul (`website/`)**:
  - Full Next.js 16 documentation and playground website (`https://veilkit.tashanto.com`).
  - Comprehensive SEO architecture: OpenGraph cards, Twitter meta, XML sitemap (`/sitemap.xml`), robots exclusion (`/robots.txt`), and AI crawler index (`/llms.txt`).
  - Schema.org JSON-LD structured data (`SoftwareApplication`, `TechArticle`, `FAQPage`) targeting Google search queries.
  - Deep architectural feature matrix and benchmarks comparing Veilkit vs `react-loading-skeleton`, `react-content-loader`, `nprogress`, `shadcn/ui`, and `mantine`.
  - Dedicated visual catalogs for 45+ Presets (`/presets`), 30 Spinners (`/spinners`), Custom Builder (`/custom-builder`), Comparison Matrix (`/comparison`), and Documentation Hub (`/docs`).
  - Interactive multi-framework code switcher (React, Vue, Svelte, Angular, Web Components, Native, CDN).

## [0.2.0] - 2026-11-07

### Added
- **30 GPU-Accelerated Skeleton Animations** (expanded from 12):
  - 18 new animations: `ripple`, `ping-pong`, `wipe`, `cascade`, `spotlight`, `rainbow`, `heartbeat`, `liquid`, `stripes`, `halftone`, `border-glow`, `typewriter`, `glitch`, `pixelate`, `tilt`, `diagonal-sweep`, `bounce-in`, `fade-slide`.
  - All animations strictly use `transform` and `opacity` on the GPU compositor thread with synchronized timeline clock phases.
- **30 Spinner Loaders** (expanded from 12):
  - 18 new spinners: `arc-gradient`, `pulse-ring`, `dots-circle`, `grid-dots`, `square-flip`, `cube-fold`, `hourglass`, `infinity`, `heartbeat-line`, `equalizer`, `chasing-dots`, `typing`, `liquid-fill`, `atom`, `clock`, `radar`, `ellipsis`, `flower`.
  - Added support for `glass` frosted blur backdrop variant and custom `speed` multiplier on all 30 spinners.
- **40 Ready-Made Presets** (expanded from 18):
  - 22 new presets: `product-detail`, `news-feed`, `inbox-list`, `notification-list`, `order-list`, `kpi-card`, `chart-bar`, `chart-line`, `chart-pie`, `search-results`, `video-player`, `music-player`, `stories-row`, `reels`, `tabs`, `calendar`, `kanban`, `timeline`, `map-card`, `pricing-card`, `testimonial`, `faq-accordion`.
  - Support for 5 shape styles across all 40 presets: `rounded`, `pill`, `square`, `sharp`, `glass`.
- **Loading Button Full Catalog & State Machine**:
  - Deterministic state machine: `idle → loading → success | error → idle` with configurable `resetAfter` timer.
  - Automatic async promise tracking via `onClick={async () => ...}`.
  - Double-click suppression while non-idle.
  - 16 loading animation styles: `spinner-left`, `spinner-right`, `spinner-replace`, `dots-after-text`, `progress-fill`, `shimmer-surface`, `pulse-glow`, `stripes-progress`, `morph-circle`, `slide-text`, `border-trace`, `liquid-fill`, `bounce-dots`, `glass-shine`, `neon-pulse`, `skeleton-button`.
  - Result animations: animated SVG `checkmark` draw, `cross` draw, error `shake`, and `success-burst`.
  - Press feedback: `ripple`, `press-scale`, `glow-follow`.
  - React Native / Expo: automatic haptic feedback via `expo-haptics` integration with graceful fallback.
- **Documentation Website & Playground**:
  - Live interactive pickers for all 30 animations, 30 spinners, 16 button styles, 40 presets, and 5 shapes.
  - Dedicated galleries for Presets, Animations, Spinners, and Loading Buttons with one-click simulation.
  - Code generation tabs for 7 frameworks (React, Vue, Svelte, Angular, Web Components, React Native, CDN).

## [0.1.0] - 2026-11-07

### Added
- Core loading and skeleton engine with zero runtime dependencies.
- Synced animation timeline for all shimmers via global clock.
- 12 animations: `shimmer`, `wave`, `pulse`, `blink`, `breathe`, `glass-shine`, `gradient-flow`, `aurora`, `scan-line`, `sparkle`, `neon-glow`, `stagger`.
- 11 built-in themes: `light`, `dark`, `auto`, `glass`, `ios`, `material`, `minimal`, `mono`, `neon`, `sunset`, `ocean`, and `createTheme` factory.
- 12 spinner types: `ring`, `dual-ring`, `dots`, `bars`, `pulse`, `orbit`, `wave`, `bounce`, `ios-activity`, `glass-orb`, `morph`, `progress-circle`.
- Route progress and linear/circular determinate/indeterminate progress loaders.
- Anti-flicker timing controller (`delay` & `minVisible`).
- Auto-measure DOM skeleton generator with `ResizeObserver` and cached layouts.
- Reveal transitions: `fade`, `blur-in`, `slide-up`, `scale`, `stagger-children`.
- Overlay with backdrop blur and container/fullscreen mounting.
- LoadingButton and LazyImage with blur-up placeholder.
- Multi-framework adapters:
  - React & Next.js (`veilkit/react`) with Suspense, App Router & Pages Router support.
  - Vue 3 & Nuxt (`veilkit/vue`) with composables, plugin, directive `v-veil`.
  - Svelte 5 & SvelteKit (`veilkit/svelte`) with runes, action `use:veil`.
  - Angular (`veilkit/angular`) standalone components, directive, and `VeilService`.
  - Web Components (`veilkit/element`) custom elements.
  - React Native & Expo (`veilkit/native`) with Reanimated and Animated fallbacks.
- Standalone CLI `veilkit capture` for pre-rendering static `.veil.json` layout maps.
