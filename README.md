<div align="center">

# ✦ veilkit

**Every loading state, beautifully. One package, every framework.**

[![npm version](https://img.shields.io/npm/v/veilkit?color=38bdf8&style=flat-square)](https://www.npmjs.com/package/veilkit)
[![bundle size](https://img.shields.io/bundlephobia/minzip/veilkit?color=10b981&label=gzip%20size&style=flat-square)](https://bundlephobia.com/package/veilkit)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A production-grade, zero-dependency loading & skeleton UI toolkit for every web and mobile framework.
Pure GPU-accelerated motion (`transform` & `opacity`), synchronized timeline clocks, anti-flicker timing,
auto-measure DOM wrapping, 12 spinners, route progress, and glassmorphic design themes.

[**Documentation & Live Playground →**](https://veilkit.dev)

</div>

---

## ⚡️ Key Features

- **Zero Runtime Dependencies**: The core package has 0 dependencies. Frameworks are declared as optional peer dependencies.
- **Synchronized Global Timeline**: All shimmer skeletons across an entire page share a synced clock phase via negative CSS `animation-delay` offsets. No phase-jitter when elements mount at different times.
- **Zero Layout Thrashing**: Animations strictly use `transform` and `opacity` for 60fps GPU execution.
- **12 Animations**: `shimmer`, `wave`, `pulse`, `blink`, `breathe`, `glass-shine`, `gradient-flow`, `aurora`, `scan-line`, `sparkle`, `neon-glow`, `stagger`.
- **11 Built-in Themes**: `light`, `dark`, `auto`, `glass`, `ios`, `material`, `minimal`, `mono`, `neon`, `sunset`, `ocean`, plus `createTheme()` for custom tokens.
- **18 Ready-Made Presets**: Responsive layouts for `card`, `product-card`, `product-grid`, `feed-post`, `article`, `dashboard`, `profile`, `form`, `table`, `chat`, and more.
- **12 Spinner Types**: `ring`, `dual-ring`, `dots`, `bars`, `pulse`, `orbit`, `wave`, `bounce`, `ios-activity`, `glass-orb`, `morph`, `progress-circle`.
- **Auto-Measure Skeleton**: Wrap real markup with `<Veil loading>` or `v-veil="loading"` to measure layout leaf elements with zero hydration mismatches.
- **Anti-Flicker Controller**: Built-in `delay` (150ms default) and `minVisible` (300ms default) eliminates brief jarring flashes on fast network requests.
- **Universal Adapters**:
  - React & Next.js (`veilkit/react`)
  - Vue 3 & Nuxt (`veilkit/vue`)
  - Svelte 4/5 & SvelteKit (`veilkit/svelte`)
  - Angular Standalone (`veilkit/angular`)
  - Web Components (`veilkit/element`) for Solid, Qwik, HTMX, Astro, Blade, HTML
  - React Native & Expo (`veilkit/native`)
  - Electron & Desktop

---

## 📦 Installation

```bash
# npm
npm install veilkit

# pnpm
pnpm add veilkit

# yarn
yarn add veilkit
```

---

## 🚀 1-Minute Quick Start

### 1. React & Next.js (`veilkit/react`)

```tsx
import 'veilkit/styles.css';
import { Skeleton, SkeletonPreset, Veil, Spinner, LoadingButton } from 'veilkit/react';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Ready-made card preset */}
      <SkeletonPreset name="product-card" animation="shimmer" theme="glass" />

      {/* Auto-measure wrapper around real content */}
      <Veil loading={loading} reveal="fade">
        <UserProfileCard user={data} />
      </Veil>

      {/* Inline Loading Button */}
      <LoadingButton loading={loading} loadingText="Saving…">
        Save Changes
      </LoadingButton>
    </>
  );
}
```

### 2. Vue 3 & Nuxt (`veilkit/vue`)

```vue
<script setup>
import 'veilkit/styles.css';
import { ref } from 'vue';
import { VSkeleton, VSpinner, vVeil } from 'veilkit/vue';

const loading = ref(true);
</script>

<template>
  <!-- Auto-measure directive -->
  <div v-veil="loading" class="card">
    <h2>User Profile</h2>
    <p>Bio details and account settings</p>
  </div>

  <VSkeleton circle width="48px" height="48px" animation="aurora" />
  <VSpinner type="ios-activity" size="32px" />
</template>
```

### 3. Svelte & SvelteKit (`veilkit/svelte`)

```svelte
<script>
  import 'veilkit/styles.css';
  import { veil } from 'veilkit/svelte';

  export let loading = true;
</script>

<!-- Auto-measure action -->
<div use:veil={{ loading, reveal: 'fade' }}>
  <article>
    <h1>Blog Article</h1>
    <p>Full article paragraph content…</p>
  </article>
</div>
```

### 4. Angular Standalone (`veilkit/angular`)

```typescript
import { Component } from '@angular/core';
import { VeilDirective, VeilSkeletonComponent, VeilSpinnerComponent } from 'veilkit/angular';
import 'veilkit/styles.css';

@Component({
  standalone: true,
  imports: [VeilDirective, VeilSkeletonComponent, VeilSpinnerComponent],
  template: `
    <div [veil]="loading">
      <h2>Server Data</h2>
    </div>
    <veil-skeleton type="heading" width="220px" animation="wave"></veil-skeleton>
    <veil-spinner type="glass-orb"></veil-spinner>
  `,
})
export class AppComponent {
  loading = true;
}
```

### 5. Web Components (Solid, Qwik, HTMX, HTML)

```html
<link rel="stylesheet" href="https://unpkg.com/veilkit/dist/styles.css" />
<script type="module" src="https://unpkg.com/veilkit/dist/element/index.js"></script>

<!-- Custom Elements -->
<veil-skeleton type="circle" width="48px" height="48px" animation="aurora"></veil-skeleton>
<veil-skeleton type="heading" width="200px" animation="shimmer"></veil-skeleton>
<veil-spinner type="orbit" size="32px" color="#38bdf8"></veil-spinner>
```

### 6. React Native & Expo (`veilkit/native`)

```tsx
import { Skeleton, SkeletonGroup, LoadingButton, ProgressBar } from 'veilkit/native';

export default function MobileCard() {
  return (
    <SkeletonGroup>
      <Skeleton height={160} radius={10} theme="auto" />
      <Skeleton height={20} width="75%" radius={4} style={{ marginTop: 12 }} />
      <Skeleton height={14} width="45%" radius={4} style={{ marginTop: 8 }} />
    </SkeletonGroup>
  );
}
```

### 7. Vanilla JS & CDN

```html
<link rel="stylesheet" href="https://unpkg.com/veilkit/dist/styles.css" />
<script src="https://unpkg.com/veilkit/dist/veilkit.min.js"></script>
<script>
  // Mount skeleton controller onto any element
  const controller = Veilkit.skeleton('#my-container', { animation: 'wave' });

  // Route progress bar
  Veilkit.progress.start();
  setTimeout(() => Veilkit.progress.done(), 800);

  // Auto-track async promises
  Veilkit.track(fetch('/api/user'), { overlay: true });
</script>
```

---

## 🎨 Theme Tokens

Customize styling seamlessly via CSS variables:

```css
:root {
  --veil-base: #e5e7eb;
  --veil-highlight: rgba(255, 255, 255, 0.7);
  --veil-radius: 8px;
  --veil-duration: 1.5s;
  --veil-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --veil-border: none;
  --veil-blur: 12px;
}
```

Or create custom branded themes with JavaScript/TypeScript:

```ts
import { createTheme } from 'veilkit';

createTheme({
  name: 'cyberpunk',
  base: '#0c0a18',
  highlight: 'rgba(0, 240, 255, 0.6)',
  radius: '8px',
  border: '1px solid rgba(0, 240, 255, 0.3)',
});
```

---

## ♿️ Accessibility (a11y)

- All loading containers automatically set `aria-busy="true"`.
- Skeletons are hidden from assistive technology with `aria-hidden="true"`.
- Polite live regions (`role="status"`, `aria-live="polite"`) announce content loading states in multiple languages (EN, ES, FR, DE, JA, ZH, AR) with customizable overrides.
- Respects `prefers-reduced-motion: reduce` by replacing translations with a calm opacity cycle.
- Complies with `forced-colors: active` high-contrast system palettes.

---

## 📄 License

MIT © 2026 [Veilkit Contributors](https://github.com/veilkit/veilkit)
