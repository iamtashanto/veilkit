# Changelog

All notable changes to `veilkit` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
