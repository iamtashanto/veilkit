<div align="center">

# ✦ veilkit

**Every loading state, beautifully. One package, every framework.**

[![npm version](https://img.shields.io/npm/v/veilkit?color=0284c7&style=for-the-badge&logo=npm)](https://www.npmjs.com/package/veilkit)
[![npm downloads](https://img.shields.io/npm/dm/veilkit?color=38bdf8&style=for-the-badge)](https://www.npmjs.com/package/veilkit)
[![bundle size](https://img.shields.io/bundlephobia/minzip/veilkit?color=10b981&label=gzip%20size&style=for-the-badge)](https://bundlephobia.com/package/veilkit)
[![npm provenance](https://img.shields.io/badge/npm-provenance-0284c7?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/veilkit)
[![Website](https://img.shields.io/badge/website-veilkit.tashanto.com-6366f1?style=for-the-badge&logo=google-chrome&logoColor=white)](https://veilkit.tashanto.com)
[![GitHub](https://img.shields.io/badge/github-iamtashanto%2Fveilkit-181717?style=for-the-badge&logo=github)](https://github.com/iamtashanto/veilkit)
[![License: MIT](https://img.shields.io/badge/license-MIT-amber.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A production-grade, zero-dependency loading & skeleton UI toolkit built for the modern web and mobile ecosystem.
Pure GPU-accelerated motion (`transform` & `opacity`), synchronized timeline clocks, anti-flicker timing,
auto-measure DOM wrapping, 18 responsive presets, 12 spinners, route progress, and frosted glass themes.
auto-measure DOM wrapping, 40 responsive presets, 30 spinners, 30 GPU animations, 16 loading button styles, 5 shape styles, route progress, and frosted glass themes.

[**Live Interactive Playground & Documentation → https://veilkit.tashanto.com**](https://veilkit.tashanto.com)

</div>

---

## 📑 Table of Contents

- [Why Veilkit?](#-why-veilkit)
- [Key Features](#-key-features)
- [Package Architecture](#-package-architecture)
- [Installation](#-installation)
- [Framework Quickstarts](#-framework-quickstarts)
  - [React & Next.js](#1-react--nextjs-veilkitreact)
  - [Vue 3 & Nuxt 3](#2-vue-3--nuxt-3-veilkitvue)
  - [Svelte 4/5 & SvelteKit](#3-svelte-45--sveltekit-veilkitsvelte)
  - [Angular (17, 18, 19)](#4-angular-standalone-veilkitangular)
  - [Web Components (Solid, Qwik, HTMX, HTML)](#5-web-components-veilkitelement)
  - [React Native & Expo](#6-react-native--expo-veilkitnative)
  - [Electron Desktop](#7-electron-desktop)
  - [Vanilla JS & CDN](#8-vanilla-javascript--cdn)
- [18 Layout Presets](#-18-ready-made-presets)
- [12 GPU-Accelerated Animations](#-12-gpu-accelerated-animations)
- [40 Ready-Made Presets (5 Shape Styles)](#-40-ready-made-presets)
- [30 GPU-Accelerated Animations](#-30-gpu-accelerated-animations)
- [11 Built-in Themes & Custom Factory](#-11-built-in-themes--custom-theming)
- [12 Spinners Gallery](#-12-spinner-loaders)
- [30 Spinner Loaders](#-30-spinner-loaders)
- [Loading Button & State Machine (16 Styles)](#-loading-button--state-machine)
- [Auto-Measure & Reveal Engine](#-auto-measure--reveal-engine)
- [Anti-Flicker Timing Controller](#-anti-flicker-timing-controller)
- [Global Loading Manager & Tracker](#-global-loading-manager--request-tracking)
- [Accessibility (a11y) & Localization](#-accessibility-a11y--localization)
- [Veilkit CLI (`capture`)](#-veilkit-cli-capture)
- [GitHub Actions & npm Provenance](#-github-actions--npm-provenance)
- [Author & License](#-author--license)

---

## 💡 Why Veilkit?

Most skeleton libraries suffer from several critical shortcomings:
1. **Layout Thrashing**: Animating background positions, widths, or margins forces constant layout recalculations and battery drain.
2. **Phase Jitter**: Shimmers that mount at different seconds animate out of sync, making pages look chaotic and disjointed.
3. **Flicker**: Fast API calls (under 100ms) briefly flash a skeleton before immediately rendering content, causing visual jarring.
4. **Framework Fragmentation**: Separate incompatible packages for React, Vue, Svelte, Angular, and React Native.

| Feature | Veilkit | react-loading-skeleton | react-content-loader | nprogress |
| :--- | :---: | :---: | :---: | :---: |
| **Zero Runtime Dependencies** | ✅ Yes | ❌ No | ❌ No | ✅ Yes |
| **Universal Platform Support** | ✅ React, Vue, Svelte, Angular, Native, Web Components | ❌ React only | ❌ React/React Native only | ❌ Vanilla only |
| **GPU Compositor Only (`transform`/`opacity`)**| ✅ 60 FPS | ❌ Background-position | ❌ SVG clipPath | ❌ CSS width |
| **Synchronized Global Phase Clocks** | ✅ Yes (zero jitter) | ❌ No | ❌ No | ❌ N/A |
| **Built-in Anti-Flicker (`delay`/`minVisible`)** | ✅ Built-in | ❌ Manual | ❌ Manual | ❌ No |
| **Auto-Measure DOM Tree Wrapping** | ✅ Built-in | ❌ No | ❌ No | ❌ N/A |
| **12 Spinners & Route Progress Included** | ✅ All-in-one | ❌ Skeletons only | ❌ SVG only | ❌ Progress only |
| **11 Design Themes (Glass, iOS, Neon, etc.)** | ✅ Built-in | ❌ Light/Dark only | ❌ Custom SVG | ❌ None |
| **Full TypeScript & Dual ESM/CJS Exports** | ✅ 100% | ⚠️ Limited | ⚠️ Limited | ❌ No DTS |

---

## ⚡️ Key Features

- **Zero Runtime Dependencies**: The core package has 0 dependencies. All framework libraries are declared as optional peer dependencies.
- **Synchronized Global Timeline**: All shimmers across the page share a synced clock phase via negative CSS `animation-delay` offsets calculated from `performance.now() % duration`.
- **Zero Layout Thrashing**: Animations strictly use `transform` and `opacity` on the GPU compositor thread. Offscreen elements and hidden background tabs automatically pause execution via `IntersectionObserver` and `visibilitychange`.
- **12 Animations**: `shimmer`, `wave`, `pulse`, `blink`, `breathe`, `glass-shine`, `gradient-flow`, `aurora`, `scan-line`, `sparkle`, `neon-glow`, and `stagger`.
- **30 GPU Animations**: `shimmer`, `wave`, `pulse`, `blink`, `breathe`, `glass-shine`, `gradient-flow`, `aurora`, `scan-line`, `sparkle`, `neon-glow`, `stagger`, `ripple`, `ping-pong`, `wipe`, `cascade`, `spotlight`, `rainbow`, `heartbeat`, `liquid`, `stripes`, `halftone`, `border-glow`, `typewriter`, `glitch`, `pixelate`, `tilt`, `diagonal-sweep`, `bounce-in`, `fade-slide`.
- **11 Themes**: `light`, `dark`, `auto`, `glass`, `ios`, `material`, `minimal`, `mono`, `neon`, `sunset`, `ocean`, plus `createTheme()` for brand palettes.
- **18 Responsive Presets**: Ready-made layouts for cards, feeds, dashboards, profiles, tables, articles, chat, forms, and navigation bars.
- **12 Spinners**: High-performance SVG and CSS spinners with customizable colors and sizes.
- **40 Canonical Presets**: Ready-made layouts with 5 shape styles (`rounded`, `pill`, `square`, `sharp`, `glass`).
- **30 Spinner Loaders**: Ultra-smooth CSS/SVG spinners with customizable size, color, speed, and glass variants.
- **Loading Button Machine**: 16 loading styles, auto-managed promise state machine (`idle → loading → success | error → idle`), result animations (`checkmark`, `cross`, `shake`, `success-burst`), press ripple/scale feedback, and native haptics.
- **Auto-Measure Engine**: Wrap real markup with `<Veil loading>` or `v-veil="loading"` to measure layout leaf elements with zero hydration mismatches.
- **Top Route Progress**: NProgress-style route loader with auto-trickle and error fallbacks.

---

## 📦 Package Architecture

Veilkit is authored with pure TypeScript strict mode, bundled with `tsup`, and provides comprehensive subpath exports:

```
veilkit
├── veilkit                 # Core vanilla JS/TS runtime engine
├── veilkit/styles.css      # Standalone static CSS bundle
├── veilkit/react           # React 18/19 & Next.js client/server components & hooks
├── veilkit/vue             # Vue 3 & Nuxt 3 components, composables, & directive
├── veilkit/svelte          # Svelte 4/5 & SvelteKit runes & actions
├── veilkit/angular         # Angular 17+ standalone components, directives & service
├── veilkit/element         # Universal Web Components (<veil-skeleton>, etc.)
├── veilkit/native          # React Native & Expo (Expo Go compatible)
├── veilkit/themes          # Theme token definitions & createTheme()
└── dist/veilkit.min.js     # Standalone UMD/IIFE bundle (global Veilkit)
```

---

## 🚀 Installation

```bash
# npm
npm install veilkit

# pnpm
pnpm add veilkit

# yarn
yarn add veilkit

# bun
bun add veilkit
```

---

## 💻 Framework Quickstarts

### 1. React & Next.js (`veilkit/react`)

Compatible with React 18 and 19, Next.js App Router, Pages Router, Server Components, and Suspense.

```tsx
import 'veilkit/styles.css';
import { useState } from 'react';
import {
  Skeleton,
  SkeletonPreset,
  Veil,
  Spinner,
  ProgressBar,
  RouteProgress,
  LoadingButton,
  useLoading,
} from 'veilkit/react';

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {/* Route progress bar for App and Pages router */}
      <RouteProgress color="#38bdf8" />

      {/* Ready-made card preset */}
      <SkeletonPreset name="product-card" animation="shimmer" theme="glass" />

      {/* Auto-measure wrapper: Renders identical markup on server/client.
          Measures leaf nodes only after mount to prevent hydration errors. */}
      <Veil loading={loading} reveal="fade" cacheKey="user-profile">
        <div className="profile-card">
          <img src="/avatar.jpg" alt="Avatar" />
          <h2>Jane Doe</h2>
          <p>Senior Staff UI Systems Architect</p>
          <button>Connect</button>
        </div>
      </Veil>

      {/* Inline Loading Button (preserves exact dimensions, prevents layout jumps) */}
      <LoadingButton
        loading={loading}
        loadingText="Saving profile…"
        onClick={() => setLoading(!loading)}
      >
        Save Changes
      </LoadingButton>

      {/* 12 GPU Spinners */}
      <Spinner type="ios-activity" size={28} />
      <Spinner type="glass-orb" size={32} />
    </div>
  );
}
```

#### Next.js App Router `loading.tsx` Example:
```tsx
// app/dashboard/loading.tsx
import { SkeletonPreset } from 'veilkit/react';

export default function Loading() {
  return <SkeletonPreset name="dashboard" animation="aurora" theme="glass" />;
}
```

---

### 2. Vue 3 & Nuxt 3 (`veilkit/vue`)

```vue
<script setup lang="ts">
import 'veilkit/styles.css';
import { ref } from 'vue';
import {
  VSkeleton,
  VSpinner,
  VProgressBar,
  VLoadingButton,
  useProgress,
} from 'veilkit/vue';

const loading = ref(true);
const progress = useProgress();
</script>

<template>
  <main>
    <button @click="progress.start()">Simulate Navigation</button>

    <!-- Auto-measure directive -->
    <div v-veil="loading" class="card">
      <h2>Vue 3 Dashboard</h2>
      <p>Automatic DOM leaf measurement with ResizeObserver reflow.</p>
      <button>Action</button>
    </div>

    <!-- Primitive Skeletons -->
    <VSkeleton circle width="52px" height="52px" animation="wave" theme="ios" />
    <VSkeleton type="heading" width="60%" height="28px" animation="shimmer" />

    <!-- Spinners -->
    <VSpinner type="orbit" size="32px" color="#38bdf8" />
  </main>
</template>
```

#### Registering Vue Plugin globally:
```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import veilkitPlugin from 'veilkit/vue';
import 'veilkit/styles.css';

const app = createApp(App);
app.use(veilkitPlugin, {
  theme: 'glass',
  animation: 'shimmer',
});
app.mount('#app');
```

---

### 3. Svelte 4/5 & SvelteKit (`veilkit/svelte`)

Runes-friendly, SSR-safe, with actions and SvelteKit route navigation hooks.

```svelte
<script lang="ts">
  import 'veilkit/styles.css';
  import { veil, skeletonAction, spinnerAction } from 'veilkit/svelte';

  export let loading = true;
</script>

<!-- Auto-measure action -->
<div use:veil={{ loading, reveal: 'fade', cacheKey: 'article-view' }}>
  <article>
    <h1>Svelte 5 Runes Article</h1>
    <p>High-performance loading skeletons with zero runtime dependencies.</p>
  </article>
</div>

<!-- Svelte element actions -->
<div use:skeletonAction={{ width: '240px', height: '24px', animation: 'aurora' }}></div>
<div use:spinnerAction={{ type: 'pulse', size: 36 }}></div>
```

#### SvelteKit Route Progress (`+layout.svelte`):
```svelte
<script lang="ts">
  import 'veilkit/styles.css';
  import { setupSvelteKitProgress } from 'veilkit/svelte';
  import { beforeNavigate, afterNavigate } from '$app/navigation';

  setupSvelteKitProgress(beforeNavigate, afterNavigate);
</script>

<slot />
```

---

### 4. Angular Standalone (`veilkit/angular`)

Works with Angular 17, 18, and 19 (both zoneless and with zone.js), signals, and HTTP interceptors.

```typescript
import { Component } from '@angular/core';
import {
  VeilDirective,
  VeilSkeletonComponent,
  VeilSpinnerComponent,
  VeilProgressBarComponent,
  VeilService,
} from 'veilkit/angular';
import 'veilkit/styles.css';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    VeilDirective,
    VeilSkeletonComponent,
    VeilSpinnerComponent,
    VeilProgressBarComponent,
  ],
  template: `
    <!-- Structural / Attribute Directive -->
    <div [veil]="loading">
      <h2>Angular Signals Workspace</h2>
      <p>Data loaded over HTTP client.</p>
    </div>

    <!-- Standalone Components -->
    <veil-skeleton type="heading" width="220px" animation="glass-shine" theme="glass"></veil-skeleton>
    <veil-spinner type="ios-activity" size="32px"></veil-spinner>
  `,
})
export class AppComponent {
  loading = true;
  constructor(public veil: VeilService) {}
}
```

#### Angular Functional HTTP Interceptor:
```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { veilHttpInterceptor } from 'veilkit/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([veilHttpInterceptor])),
  ],
};
```

---

### 5. Web Components (`veilkit/element`)

Universal custom elements with zero wrappers for Solid, Qwik, HTMX, Astro, Laravel/Blade, WordPress, and static HTML:

```html
<link rel="stylesheet" href="https://unpkg.com/veilkit/dist/styles.css" />
<script type="module" src="https://unpkg.com/veilkit/dist/element/index.js"></script>

<!-- Native Custom Elements -->
<veil-skeleton type="circle" width="56px" height="56px" animation="wave"></veil-skeleton>
<veil-skeleton type="heading" width="240px" height="24px" animation="aurora"></veil-skeleton>
<veil-skeleton lines="3" width="100%"></veil-skeleton>
<veil-spinner type="morph" size="32px" color="#38bdf8"></veil-spinner>
<veil-progress value="68" circular="true" show-percentage="true"></veil-progress>
```

---

### 6. React Native & Expo (`veilkit/native`)

Runs in Expo Go, supports New Architecture, iOS, Android, and `react-native-web`.
Automatically detects `expo-linear-gradient` / `react-native-linear-gradient` and falls back gracefully to a native driver opacity pulse if missing.

```tsx
import {
  Skeleton,
  SkeletonGroup,
  Spinner,
  LoadingButton,
  ProgressBar,
  Overlay,
} from 'veilkit/native';

export default function MobileCard() {
  const [loading, setLoading] = useState(false);

  return (
    <SkeletonGroup>
      {/* Rectangular image placeholder */}
      <Skeleton height={180} radius={12} theme="auto" animation="shimmer" />

      {/* Avatar circle */}
      <Skeleton circle width={44} height={44} style={{ marginTop: 12 }} />

      {/* Text lines */}
      <Skeleton height={20} width="75%" radius={4} style={{ marginTop: 8 }} />
      <Skeleton height={14} width="50%" radius={4} style={{ marginTop: 6 }} />

      {/* Button */}
      <LoadingButton
        loading={loading}
        title="Sync Database"
        onPress={() => setLoading(!loading)}
      />
    </SkeletonGroup>
  );
}
```

---

### 7. Electron Desktop

Veilkit runs in Electron renderer processes with zero native dependencies.

- **IPC Loading Skeletons**: Automatically mask UI components while IPC requests (`ipcRenderer.invoke`) query native resources.
- **Strict CSP Support**: Compatible with strict Content Security Policies (`style-src 'self'`) by importing `veilkit/styles.css` directly or configuring a CSP nonce via `veil.configure({ nonce: '...' })`.
- **OS Theme Sync**: Responds to Electron's `nativeTheme.on('updated')` to synchronize light/dark modes.

---

### 8. Vanilla JavaScript & CDN

Drop-in UMD/IIFE bundle exporting the global `Veilkit`:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/veilkit/dist/styles.css" />
</head>
<body>
  <div id="card-container"></div>
  <button id="submit-btn">Save</button>

  <script src="https://unpkg.com/veilkit/dist/veilkit.min.js"></script>
  <script>
    // 1. Render Preset
    const card = Veilkit.createPreset({ name: 'card', animation: 'shimmer', theme: 'glass' });
    document.getElementById('card-container').appendChild(card);

    // 2. Route Progress
    Veilkit.progress.start();
    setTimeout(() => Veilkit.progress.done(), 1000);

    // 3. Loading Button Controller
    const btn = document.getElementById('submit-btn');
    const btnController = Veilkit.wrapLoadingButton(btn, { loadingText: 'Saving…' });

    btn.onclick = () => {
      btnController.setLoading(true);
      setTimeout(() => btnController.setLoading(false), 2000);
    };

    // 4. Auto-track async promises
    Veilkit.track(fetch('/api/user'), { overlay: true });
  </script>
</body>
</html>
```

---

## 🎨 18 Ready-Made Presets
## 🎨 40 Ready-Made Presets

Ready-to-use, responsive, customizable layout presets:
Veilkit includes 40 canonical, responsive, customizable layout presets. Every preset supports responsive breakpoints and 5 shape styles (`rounded`, `pill`, `square`, `sharp`, `glass`).

| Preset Name | Description | Common Use Cases |
| :--- | :--- | :--- |
| `card` | Hero media, title heading, 2 paragraph lines, and action button | Content cards, blog summaries |
| `product-card` | Product thumbnail, category badge, title, price line, buy button | E-commerce storefronts |
| `product-grid` | Responsive multi-column grid of product cards | Catalog browse pages |
| `feed-post` | Avatar, user handle, post content, media embed, 3 reaction icons | Social feeds, activity streams |
| `article` | Wide hero banner, large headline, byline, rich text blocks | News, blogs, documentation |
| `profile` | Centered avatar, user name, bio text lines, follow button | User overview, author cards |
| `profile-header`| Cover image banner, overlapping circle avatar, handle, bio | Social profile headers |
| `dashboard` | 4 metric counter cards and 2 responsive chart placeholders | Analytics, admin dashboards |
| `form` | Form title, 3 labeled input fields, and submit button | Login, registration, checkout |
| `table` | Header row with bold columns, followed by N table body rows | Data tables, inventory, billing |
| `list` | Container of multiple avatar list items with dividers | Settings lists, notifications |
| `list-item` | Circle avatar, primary title, subtitle, and trailing action icon | Contact list, message list |
| `comment-thread`| Nested comment tree with author avatars and reply indentations | Discussion forums, reviews |
| `chat` | Alternating left and right message bubbles with user avatars | Messaging apps, support chat |
| `media-card` | Video/audio thumbnail with play button overlay, channel meta | Video streaming, podcast cards |
| `navbar` | Brand logo block, horizontal link tabs, search input, avatar | Top navigation bars |
| `sidebar` | Logo, vertical menu items with icons, profile footer | Admin sidebars, desktop apps |
| `settings-page` | Section headers, toggle/input rows with descriptions, action | User account preferences |
### Shape Styles (`shape`)
- `rounded`: Default modern rounded corners (`8px` radius).
- `pill`: Fully rounded capsule corners (`9999px` radius).
- `square`: Subtle soft-square corners (`4px` radius).
- `sharp`: Geometric 0px razor-sharp borders (`0px` radius).
- `glass`: Translucent glassmorphic skeleton with `backdrop-filter: blur(12px)` and subtle frosted borders.

```tsx
<SkeletonPreset name="product-card" shape="glass" animation="aurora" />
```

| Category | Presets |
| :--- | :--- |
| **Cards & Content** | `card`, `product-card`, `product-grid`, `product-detail`, `feed-post`, `article`, `news-feed`, `media-card`, `map-card`, `pricing-card`, `testimonial` |
| **User & Social** | `profile`, `profile-header`, `stories-row`, `reels`, `comment-thread`, `chat` |
| **Dashboard & Data** | `dashboard`, `kpi-card`, `chart-bar`, `chart-line`, `chart-pie`, `kanban`, `timeline`, `calendar`, `table` |
| **Lists & Feeds** | `list`, `list-item`, `inbox-list`, `notification-list`, `order-list`, `search-results` |
| **Forms & Navigation**| `form`, `navbar`, `sidebar`, `tabs`, `settings-page`, `faq-accordion` |
| **Media Players** | `video-player`, `music-player` |

---

## ✨ 12 GPU-Accelerated Animations
## ✨ 30 GPU-Accelerated Animations

All animations strictly use `transform` and `opacity` to eliminate layout thrashing:

1. `shimmer`: Classic smooth linear gradient sweep.
2. `wave`: Curved sinusoidal sweep overlay.
3. `pulse`: Calm opacity breathing cycle (`0.4` ↔ `1.0`).
4. `blink`: Crisp, rhythmic stepped pulse.
5. `breathe`: Subtly slow opacity + micro-scale (`0.995` ↔ `1.005`).
6. `glass-shine`: Angled diagonal sheen glint.
7. `gradient-flow`: Continuous multi-stop hue transition across element width.
8. `aurora`: Organic multi-chroma soft orbital drift.
9. `scan-line`: High-tech precision laser line sweep.
10. `sparkle`: Shifting micro-glint highlights.
11. `neon-glow`: Luminous edge glow pulsing.
12. `stagger`: Applies progressive animation delays to child elements in sequence.
| Animation | Description |
| :--- | :--- |
| `shimmer` | Classic smooth linear gradient sweep |
| `wave` | Curved sinusoidal sweep overlay |
| `pulse` | Calm opacity breathing cycle (`0.4` ↔ `1.0`) |
| `blink` | Crisp, rhythmic stepped pulse |
| `breathe` | Subtly slow opacity + micro-scale (`0.995` ↔ `1.005`) |
| `glass-shine` | Angled diagonal sheen glint across frosted surface |
| `gradient-flow` | Continuous multi-stop hue transition across element width |
| `aurora` | Organic multi-chroma soft orbital drift |
| `scan-line` | High-tech precision laser line sweep |
| `sparkle` | Shifting micro-glint highlights |
| `neon-glow` | Luminous edge glow pulsing |
| `stagger` | Applies progressive animation delays to child elements in sequence |
| `ripple` | Radial circular pulse emanating outward from element center |
| `ping-pong` | Smooth sweeping highlight that reverses direction at edges |
| `wipe` | Sleek bar that slides across element revealing geometry |
| `cascade` | Top-to-bottom delayed wave across blocks |
| `spotlight` | Focused soft light cone traversing the container |
| `rainbow` | Chromatic multi-hue sweep transition |
| `heartbeat` | Rhythmic double-beat opacity pulse |
| `liquid` | Soft fluid morphing highlight sweep |
| `stripes` | Animated barber-pole diagonal stripe pattern |
| `halftone` | Stylized dot-matrix luminous pulse |
| `border-glow` | Luminous perimeter neon border trace |
| `typewriter` | Text placeholders that dynamically grow in width |
| `glitch` | Micro high-tech digital displacement flicker |
| `pixelate` | Retro 8-bit block pixel flicker matrix |
| `tilt` | Subtle 3D perspective tilt motion |
| `diagonal-sweep`| 45-degree corner-to-corner highlight sweep |
| `bounce-in` | Elastic micro-spring scale reveal |
| `fade-slide` | Subtle upward floating drift |

---

## 🎨 11 Built-in Themes & Custom Theming

| Theme | Description | Tokens / Styling |
| :--- | :--- | :--- |
| `light` | Crisp neutral gray | `#e5e7eb` base, `rgba(255, 255, 255, 0.7)` highlight |
| `dark` | Deep slate night palette | `#1f2937` base, `rgba(255, 255, 255, 0.12)` highlight |
| `auto` | System dynamic theme | Automatically switches light/dark via `prefers-color-scheme` |
| `glass` | Frosted translucency | `backdrop-filter: blur(12px)`, subtle border, inner glow |
| `ios` | Apple Human Interface aesthetic | Soft neutral gray `rgba(120, 120, 128, 0.18)`, iOS easing |
| `material`| Material You / M3 | Surface tonal elevations, pill radius, standard ease |
| `minimal` | Ultra-clean low contrast | Subtle neutral tint, 4px border radius |
| `mono` | Pure monochrome | High-contrast grayscale with crisp stops |
| `neon` | Cyberpunk luminous glow | Deep charcoal `#0c0b16` base, electric cyan `#00f0ff` glow |
| `sunset` | Warm golden twilight | Peach/coral base `#fed7aa` with warm amber glow |
| `ocean` | Deep marine azure | Deep sea `#0f2937` base with vibrant cyan highlight |

### Custom Brand Themes via `createTheme()`:
```ts
import { createTheme } from 'veilkit';

createTheme({
  name: 'cyberpunk',
  base: '#0c0a18',
  highlight: 'rgba(0, 240, 255, 0.6)',
  radius: '8px',
  border: '1px solid rgba(0, 240, 255, 0.3)',
  glow: '0 0 16px rgba(0, 240, 255, 0.4)',
});
```

---

## 🔄 12 Spinner Loaders
## 🔄 30 Spinner Loaders

All spinners are GPU-accelerated and fully scalable via `size` and `color`:
All 30 spinners are GPU-accelerated, scalable via `size` and `color`, and support `glass` frosted blur variants and custom `speed`:

`ring` • `dual-ring` • `dots` • `bars` • `pulse` • `orbit` • `wave` • `bounce` • `ios-activity` • `glass-orb` • `morph` • `progress-circle`
`ring` • `dual-ring` • `dots` • `bars` • `pulse` • `orbit` • `wave` • `bounce` • `ios-activity` • `glass-orb` • `morph` • `progress-circle` • `arc-gradient` • `pulse-ring` • `dots-circle` • `grid-dots` • `square-flip` • `cube-fold` • `hourglass` • `infinity` • `heartbeat-line` • `equalizer` • `chasing-dots` • `typing` • `liquid-fill` • `atom` • `clock` • `radar` • `ellipsis` • `flower`

```tsx
<Spinner type="ios-activity" size={32} color="#38bdf8" />
<Spinner type="glass-orb" size={36} />
<Spinner type="morph" size={28} />
<Spinner type="arc-gradient" size={32} color="#38bdf8" speed={0.8} />
<Spinner type="atom" size={36} glass />
<Spinner type="infinity" size={28} color="#a855f7" />
```

---

## 🔘 Loading Button & State Machine

Veilkit includes a comprehensive loading button with state machine transitions, 16 loading styles, result animations, press feedback, and native haptics:

- **State Machine**: `idle → loading → success | error → idle`. Automatically handles async promises or explicit `status` prop (`idle`, `loading`, `success`, `error`).
- **Auto-Reset**: Configurable `resetAfter` (default: 2000ms) resets success/error state back to idle.
- **Double-Click Protection**: Clicks are safely ignored while non-idle.
- **Result Animations**: Animated SVG `checkmark` draw, `cross` draw, error `shake`, and celebratory `success-burst`.
- **Press Feedback**: `ripple` (material ink ripple), `press-scale` (tactile spring down), or `glow-follow` (magnetic mouse highlight).
- **Native Haptics**: On React Native/Expo, automatically triggers light haptic on start, notification success on completion, and notification error on failure (via `expo-haptics`).

### 16 Loading Styles:
1. `spinner-left`: Spinner docked at the start of text
2. `spinner-right`: Spinner docked at the end of text
3. `spinner-replace`: Button text smoothly fades out, replaced by centered spinner
4. `dots-after-text`: Animated trailing ellipsis dots (`Saving...`)
5. `progress-fill`: Button background fills horizontally as determinate or indeterminate progress
6. `shimmer-surface`: Subtle GPU light sheen swept across button surface
7. `pulse-glow`: Luminous breathing glow around button border
8. `stripes-progress`: Animated diagonal barber-pole progress stripes
9. `morph-circle`: Button contracts into a compact circle spinner, then expands back to pill
10. `slide-text`: Active text slides upward as loading status slides into view
11. `border-trace`: Laser beam traced continuously along the button's perimeter
12. `liquid-fill`: Fluid wave that rises and fills the button interior
13. `bounce-dots`: Three rhythmic bouncing micro-dots
14. `glass-shine`: Glint reflecting across frosted glassmorphic button
15. `neon-pulse`: Electric neon aura pulsing around the button
16. `skeleton-button`: Button transforms seamlessly into a matching skeleton placeholder

```tsx
<LoadingButton
  loadingStyle="morph-circle"
  pressFeedback="ripple"
  loadingText="Deploying..."
  successText="Live!"
  errorText="Failed"
  onClick={async () => {
    await deployProject();
  }}
>
  Deploy to Production
</LoadingButton>
```

---

## 📐 Auto-Measure & Reveal Engine

Wrap real UI components to automatically generate an accurate skeleton matching your real layout. When data finishes loading, Veilkit reveals the content with a smooth transition:

- **Reveal Transitions**: `fade`, `blur-in`, `slide-up`, `scale`, `stagger-children`, `none`.
- **Layout Caching**: Supports `cacheKey="profile-view"` with in-memory & `localStorage` caching for instant placeholder rendering on repeat visits.
- **Attributes**:
  - `data-veil-ignore`: Skips element measurement.
  - `data-veil-shape="circle|rect|line"`: Forces placeholder shape.

---

## ⏱️ Anti-Flicker Timing Controller

Veilkit includes built-in anti-flicker timing:
- `delay` (default `150ms`): If your data loads faster than 150ms, the loader is never shown, avoiding annoying micro-flashes.
- `minVisible` (default `300ms`): Once a skeleton or spinner appears, it remains visible for at least 300ms to eliminate visual flashing.

```ts
import { AntiFlickerController } from 'veilkit';

const controller = new AntiFlickerController({
  delay: 150,
  minVisible: 300,
  onShow: () => showLoader(),
  onHide: () => hideLoader(),
});
```

---

## 🌐 Global Loading Manager & Request Tracking

Coordinate multiple concurrent network requests with a unified manager:

```ts
import { veil } from 'veilkit';

// 1. Automatic Promise tracking with anti-flicker and overlay
const data = await veil.track(fetchUserData(), {
  delay: 150,
  minVisible: 300,
  overlay: true,
  progress: true,
});

// 2. Fetch wrapper (opt-in, never monkey-patches globals)
const trackedFetch = veil.wrapFetch(window.fetch, { progress: true });
await trackedFetch('/api/orders');

// 3. Concurrency Counter Subscription
veil.manager.subscribe((isLoading, count) => {
  console.log(`Active operations: ${count}, Busy: ${isLoading}`);
});
```

---

## ♿️ Accessibility (a11y) & Localization

- Containers are marked with `aria-busy="true"` while loading.
- Skeletons are hidden from screen readers via `aria-hidden="true"`.
- Loading state announcements are delivered via polite live regions (`role="status"`, `aria-live="polite"`).
- Built-in multi-language localization dictionary:
  - English (`en`), Spanish (`es`), French (`fr`), German (`de`), Japanese (`ja`), Chinese (`zh`), Arabic (`ar`).
  - Configure globally: `veil.setLocale('es')` or override labels via `veil.setLabels({ loading: 'Espere por favor…' })`.
- Fully complies with `prefers-reduced-motion: reduce` and `forced-colors: active`.

---

## 🛠️ Veilkit CLI (`capture`)

Pre-render static layout maps using headless Chromium:

```bash
npx veilkit capture https://myapp.com/dashboard --out ./dashboard.veil.json --selector "#dashboard"
```

The resulting `.veil.json` file can be bundled directly with your application to render instant skeletons without requiring runtime DOM measurements.

---

## 🔒 GitHub Actions & npm Provenance

`veilkit` releases are published with verifiable **npm Provenance** backed by OpenID Connect (OIDC) and Sigstore public transparency logs. This guarantees cryptographic traceability from the published npm package directly to the verified source commit in GitHub Actions.

### Trusted Publisher Configuration

The package is configured on npm under **Trusted Publisher** with the following parameters:

| Setting | Value | Description |
| :--- | :--- | :--- |
| **Publisher** | `GitHub Actions` | Authenticates via GitHub OpenID Connect (OIDC) token exchange |
| **Label** | `veilkit` | Human-readable identifier on npmjs.com |
| **Organization or user** | `iamtashanto` | GitHub owner account (`github.com/iamtashanto`) |
| **Repository** | `veilkit` | GitHub source repository (`github.com/iamtashanto/veilkit`) |
| **Workflow filename** | `release.yml` | Dedicated workflow in `.github/workflows/release.yml` |
| **Environment name** | `npm-publish` | Protected GitHub Actions environment with scoped access |
| **Allowed actions** | `Allow npm publish`, `Allow npm dist-tag` | Permits version publishing and dist-tag management (`latest`, `next`) |

### Workflow Configuration (`.github/workflows/release.yml`)

```yaml
name: Release

on:
  push:
    branches:
      - main
  workflow_dispatch:

concurrency: ${{ github.workflow }}-${{ github.ref }}

jobs:
  release:
    name: Release & Publish to npm
    runs-on: ubuntu-latest
    environment: npm-publish
    permissions:
      contents: write
      id-token: write # Required for npm provenance OIDC exchange
      pull-requests: write

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: pnpm/action-setup@v3
        with:
          version: 12

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build:all
      - run: pnpm publint

      - name: Publish to npm with Provenance
        run: npm publish --access public --provenance
```

### Verifying Provenance

You can verify the authenticity and build attestation of any installed `veilkit` release:

```bash
# Verify signatures and build provenance using npm CLI
npm audit signatures

# View provenance details directly on npm:
# https://www.npmjs.com/package/veilkit
```

---

## 👤 Author & Maintainer

- **Creator & Maintainer**: **Md Tanvir Ahamed Shanto**
- **Website & Documentation**: [veilkit.tashanto.com](https://veilkit.tashanto.com)
- **GitHub**: [@iamtashanto](https://github.com/iamtashanto)
- **npm Account**: [@mdtanvirahamedshanto](https://www.npmjs.com/~mdtanvirahamedshanto)
- **Repository**: [github.com/iamtashanto/veilkit](https://github.com/iamtashanto/veilkit)
- **Issues & Feedback**: [github.com/iamtashanto/veilkit/issues](https://github.com/iamtashanto/veilkit/issues)

---

## 📄 License

Veilkit is open-source software licensed under the [MIT License](LICENSE).
© 2026 Md Tanvir Ahamed Shanto. All rights reserved.
