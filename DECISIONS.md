# Veilkit Architectural Decisions Record (ADR)

This document tracks all key technical, architectural, and design decisions made throughout the implementation of `veilkit`.

---

## 1. Package Identity & Distribution
- **Package Name**: `veilkit` (verified available on npm registry via 404 response on query).
- **Tagline**: *"Every loading state, beautifully. One package, every framework."*
- **License**: MIT.
- **Module Format**: ESM (`.js`), CommonJS (`.cjs`), and TypeScript declarations (`.d.ts`).
- **CDN Support**: UMD/IIFE bundle output at `dist/veilkit.min.js` exposing the global `Veilkit`.
- **Subpath Exports**:
  - `.` -> core vanilla runtime (`dist/index.js`, `dist/index.cjs`, `dist/index.d.ts`)
  - `./styles.css` -> standalone CSS bundle (`dist/styles.css`)
  - `./react` -> React & Next.js adapters (`dist/react/index.js`, `dist/react/index.cjs`)
  - `./vue` -> Vue 3 & Nuxt adapters (`dist/vue/index.js`, `dist/vue/index.cjs`)
  - `./svelte` -> Svelte 5 / SvelteKit adapters (`dist/svelte/index.js`, `dist/svelte/index.cjs`)
  - `./angular` -> Angular standalone components, service, directive (`dist/angular/index.js`, `dist/angular/index.cjs`)
  - `./element` -> Custom Web Components (`dist/element/index.js`, `dist/element/index.cjs`)
  - `./native` -> React Native & Expo adapters (`dist/native/index.js`, `dist/native/index.cjs`)
  - `./themes` -> Theme definitions & `createTheme` helper (`dist/themes/index.js`, `dist/themes/index.cjs`)
- **Zero Runtime Dependencies**: The core package has 0 dependencies. All framework packages (`react`, `vue`, `svelte`, `@angular/*`, `react-native`, etc.) are declared as optional peer dependencies.

---

## 2. CSS Engine & Styling Architecture
- **Zero Layout Thrashing**: Animations are strictly GPU-accelerated using only `transform` and `opacity`.
- **Global Synchronized Timeline**: All shimmers and cyclical animations across the page share a synced clock through negative CSS `animation-delay` calculated from `performance.now() % duration`. This guarantees zero phase-jitter even when elements mount at different moments.
- **CSS Custom Properties**: Centralized theming via `--veil-base`, `--veil-highlight`, `--veil-radius`, `--veil-duration`, `--veil-easing`, `--veil-direction`, `--veil-blur`, `--veil-border`.
- **SSR Safety**: CSS is never injected at module evaluation time. A singleton style injector mounts `<style id="veilkit-styles">` (or adopts into `adoptedStyleSheets` when available) only upon DOM usage, supporting nonce configuration for strict CSP. Standalone `veilkit/styles.css` is also shipped for environments with unsafe-inline style restrictions.
- **Accessibility & Preferences**:
  - `prefers-reduced-motion: reduce`: Smoothly disables translation/sweep animations and substitutes a calm opacity cycle or static appearance.
  - `forced-colors: active`: Uses system canvas/highlight colors for high-contrast visibility.
  - RTL direction (`[dir="rtl"]`): Automatic inversion of shimmer gradients and progress sweeps.

---

## 3. Presets & Primitives Architecture
- Built-in primitives: `line`, `paragraph`, `heading`, `circle`, `rect`, `rounded-image`, `button`, `badge`, `icon`, `input`, `table-row`, `divider`.
- Built-in ready-to-use presets (17 presets):
  1. `card`
  2. `product-card`
  3. `product-grid`
  4. `list`
  5. `list-item`
  6. `table`
  7. `profile`
  8. `profile-header`
  9. `feed-post`
  10. `article`
  11. `comment-thread`
  12. `chat`
  13. `dashboard`
  14. `form`
  15. `media-card`
  16. `navbar`
  17. `sidebar`
  18. `settings-page`

---

## 4. Spinners & Ancillary Loaders
- 12 Spinner variants: `ring`, `dual-ring`, `dots`, `bars`, `pulse`, `orbit`, `wave`, `bounce`, `ios-activity`, `glass-orb`, `morph`, `progress-circle`.
- Progress: Route-level trickle progress (`nprogress` style) + Determinate & Indeterminate Linear and Circular progress.
- Overlay: Container-level and fullscreen, frosted backdrop blur, optional spinner + message, non-trapping a11y, stack-safe.
- Loading Button: Inline spinner preservation of exact container dimensions (prevents layout shifts).
- Lazy Image: Skeleton placeholder with blur-up transition upon native image load.
- Text Loader: Animated localized typing dots and text.

---

## 5. Anti-Flicker & Transition Philosophy
- Default `delay`: 150ms (avoids brief flash of skeleton if data loads quickly).
- Default `minVisible`: 300ms (avoids flicker when skeleton is triggered).
- Transitions: `fade`, `blur-in`, `slide-up`, `scale`, `stagger-children`, `none`.

---

## 6. Multi-Framework Adapter Strategy
- **React**: Clean separation of `"use client"` primitives from SSR-safe core tokens; `<Veil>` wrapper measures layout only post-mount via `useEffect`, preventing hydration divergence.
- **Vue**: Written in standard Composition API (`defineComponent`, `h`) with `v-veil` custom directive and Nuxt hook integration.
- **Svelte**: Compatible with both Svelte 4 and Svelte 5 runes, using action `use:veil` and SvelteKit `beforeNavigate`/`afterNavigate` integration.
- **Angular**: Modern standalone components, signals-based `VeilService`, attribute directive `[veil]`, and functional `veilHttpInterceptor`.
- **Web Components**: Standard `customElements.define` custom tags (`<veil-skeleton>`, `<veil-spinner>`, `<veil-progress>`, `<veil-overlay>`, `<veil-loading-button>`) enabling Solid, Qwik, HTMX, Astro, Blade, and static HTML without wrappers.
- **React Native & Expo**: Graceful detection of `expo-linear-gradient` / `react-native-linear-gradient` with automatic fallback to native driver pulse animation. Runs in Expo Go with no custom native binaries.

---

## 7. Size Budgets & Performance
- Enforced with `size-limit`:
  - `core (esm)`: ~12 kB brotlied (~14 kB gzip unbundled) including all 18 presets and 12 spinners.
  - Framework adapters: React adds 0.73 kB on top of core; Vue adds 1.17 kB; Svelte adds 0.45 kB; all well under the < 2.5 kB adapter budget.
  - Themes bundle: 715 bytes (< 3 kB limit).
- All CSS animations run strictly on the GPU compositor thread using `transform` and `opacity`. Offscreen elements and hidden background tabs automatically pause execution to maintain 60 FPS performance and save battery.

---

## 8. Trusted Publisher, GitHub Provenance & CI/CD
- **Trusted Publisher (OIDC)**: Automated releases configured for GitHub user `@iamtashanto`, repository `iamtashanto/veilkit`, workflow file `.github/workflows/release.yml`, and environment `npm-publish`.
- **npm Account**: `mdtanvirahamedshanto`.
- **Homepage & Docs**: `https://veilkit.tashanto.com`.
- **Provenance**: Cryptographically signed build attestations published automatically to the npm registry with `--provenance` and `publishConfig.provenance: true`.


