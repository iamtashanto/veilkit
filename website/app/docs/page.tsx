'use client';

import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function DocsPage() {
  const [installPm, setInstallPm] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const installCommands = {
    pnpm: 'pnpm add veilkit',
    npm: 'npm install veilkit',
    yarn: 'yarn add veilkit',
    bun: 'bun add veilkit',
  };

  const navSections = [
    {
      title: 'Getting Started',
      color: 'text-sky-400',
      items: [
        { href: '#installation', label: 'Installation' },
        { href: '#quickstart', label: 'Quickstart' },
        { href: '#architecture', label: 'Zero Reflow Architecture' },
        { href: '#anti-flicker', label: 'Anti-Flicker Timing' },
      ],
    },
    {
      title: 'Framework Guides',
      color: 'text-cyan-400',
      items: [
        { href: '#react', label: 'React & Next.js' },
        { href: '#vue', label: 'Vue 3 & Nuxt 3' },
        { href: '#svelte', label: 'Svelte 5 & Kit' },
        { href: '#angular', label: 'Angular 17-19' },
        { href: '#native', label: 'React Native & Expo' },
        { href: '#element', label: 'Web Components' },
        { href: '#cdn', label: 'Vanilla JS & CDN' },
      ],
    },
    {
      title: 'Components & Features',
      color: 'text-indigo-400',
      items: [
        { href: '#presets', label: '45+ Skeleton Presets' },
        { href: '#custom-builder', label: 'Custom Layout Builder' },
        { href: '#spinners', label: '30 GPU Spinners' },
        { href: '#buttons', label: '16 Loading Buttons' },
        { href: '#themes', label: 'Themes & Glassmorphism' },
        { href: '#progress', label: 'Route Progress Bar' },
        { href: '#cli', label: 'CLI Layout Capture' },
      ],
    },
  ];

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sticky Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6 text-sm max-h-[calc(100vh-8rem)] overflow-y-auto pr-3">
            {navSections.map((sec) => (
              <div key={sec.title} className="space-y-2">
                <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${sec.color}`}>
                  {sec.title}
                </h4>
                <ul className="space-y-1.5 text-slate-400 font-medium">
                  {sec.items.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="block py-1 hover:text-white transition-colors text-xs hover:translate-x-1 duration-150"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          {/* Main Documentation Body */}
          <article className="lg:col-span-9 space-y-16 text-slate-300">
            {/* Header */}
            <div className="space-y-4 border-b border-white/[0.08] pb-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                  Official Documentation
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                  v0.3.0 • 0-dependency core
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                Veilkit Complete Guide & API Reference
              </h1>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-3xl">
                Veilkit is an all-in-one, ultra-lightweight loading and skeleton UI toolkit designed for modern web applications.
                Experience pure GPU composited animations, synchronized timeline clocks, anti-flicker delay, 45 responsive presets,
                custom skeleton layouts, 30 spinners, and 16 button states across all major web and mobile frameworks.
              </p>
            </div>

            {/* 1. Installation */}
            <section id="installation" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono font-bold flex items-center justify-center text-sm">
                  01
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Installation</h2>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Install Veilkit in your project using any package manager. The core bundle is 100% zero-dependency, under 5KB min+gzip, and works across Node.js, Deno, Bun, and browser environments.
              </p>

              {/* Package Manager Selector */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] overflow-hidden shadow-xl">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#05080e] border-b border-white/[0.08]">
                  <div className="flex items-center gap-1.5">
                    {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((pm) => (
                      <button
                        key={pm}
                        onClick={() => setInstallPm(pm)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          installPm === pm
                            ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {pm}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => copyToClipboard(installCommands[installPm], 'install')}
                    className="px-3 py-1 rounded bg-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/30 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'install' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <div className="p-4 font-mono text-sm text-sky-300">
                  <code>{installCommands[installPm]}</code>
                </div>
              </div>

              {/* Global Styles Import */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white">Import Styles (Optional)</h4>
                <p className="text-xs text-slate-400">
                  Veilkit automatically injects required CSS keyframes into <code className="text-sky-300">&lt;head&gt;</code> at runtime in browser environments. For zero-JS SSR hydration, you can import the precompiled stylesheet into your root layout:
                </p>
                <div className="p-3.5 rounded-xl bg-[#080d16] border border-white/[0.08] font-mono text-xs text-slate-300 flex items-center justify-between">
                  <code>import &apos;veilkit/styles.css&apos;;</code>
                  <button
                    onClick={() => copyToClipboard("import 'veilkit/styles.css';", 'css-import')}
                    className="text-xs text-slate-500 hover:text-sky-400 font-mono cursor-pointer"
                  >
                    {copiedKey === 'css-import' ? '✓' : 'Copy'}
                  </button>
                </div>
              </div>
            </section>

            {/* 2. Quickstart */}
            <section id="quickstart" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono font-bold flex items-center justify-center text-sm">
                  02
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Quickstart</h2>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Add an instant, flicker-free skeleton loader to any component in 3 lines of code:
              </p>

              <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] overflow-hidden shadow-xl">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#05080e] border-b border-white/[0.08]">
                  <span className="text-xs font-mono text-slate-400">app/components/ProductCard.tsx</span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `import { SkeletonPreset, LoadingButton } from 'veilkit/react';\n\nexport function ProductCard({ loading, product, onAddToCart }) {\n  if (loading) {\n    return <SkeletonPreset name="product-card" shape="rounded" animation="shimmer" theme="dark" />;\n  }\n\n  return (\n    <div className="card">\n      <img src={product.image} alt={product.title} />\n      <h3>{product.title}</h3>\n      <p>{product.price}</p>\n      <LoadingButton\n        styleType="shimmer-surface"\n        resultAnimation="checkmark"\n        onClick={onAddToCart}\n      >\n        Add to Cart\n      </LoadingButton>\n    </div>\n  );\n}`,
                        'quickstart'
                      )
                    }
                    className="px-3 py-1 rounded bg-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/30 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'quickstart' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{`import { SkeletonPreset, LoadingButton } from 'veilkit/react';

export function ProductCard({ loading, product, onAddToCart }) {
  if (loading) {
    return <SkeletonPreset name="product-card" shape="rounded" animation="shimmer" theme="dark" />;
  }

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.price}</p>
      <LoadingButton
        styleType="shimmer-surface"
        resultAnimation="checkmark"
        onClick={onAddToCart}
      >
        Add to Cart
      </LoadingButton>
    </div>
  );
}`}</code>
                </pre>
              </div>
            </section>

            {/* 3. Zero Reflow Architecture */}
            <section id="architecture" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono font-bold flex items-center justify-center text-sm">
                  03
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Zero Reflow Architecture</h2>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Traditional skeleton libraries animate properties such as <code className="text-rose-400">background-position</code>, <code className="text-rose-400">width</code>, or <code className="text-rose-400">left</code>. On mobile devices or large dashboards with 50+ skeleton elements, this triggers 60 layout recalcs and reflows per second, draining CPU and battery.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-2">
                  <span className="text-xs font-bold font-mono text-rose-400">✕ Traditional Skeletons:</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Animates CSS layout properties on the browser main thread. Causes layout thrashing, battery drain, and frame drops.
                  </p>
                </div>
                <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                  <span className="text-xs font-bold font-mono text-emerald-400">✓ Veilkit GPU Compositor:</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Uses pseudoelement layers isolated with <code className="text-emerald-300">will-change: transform</code>. Animations run 100% on GPU composition threads without touching CPU DOM geometry.
                  </p>
                </div>
              </div>

              {/* Synced Clocks Math */}
              <div className="p-5 rounded-2xl border border-sky-500/20 bg-sky-500/5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-bold font-mono text-sky-400">Synchronized Global Timeline Clocks</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When you render 10 cards at different seconds during pagination or infinite scrolling, traditional skeletons shimmer out-of-phase. Veilkit synchronizes every skeleton element on the page to a single wall-clock phase:
                </p>
                <div className="p-3 rounded-xl bg-[#080d16] font-mono text-xs text-cyan-300 border border-white/[0.06]">
                  animation-delay = -1 * (performance.now() % durationMs) + &apos;ms&apos;;
                </div>
                <p className="text-xs text-slate-400">
                  Every shimmer, wave, and pulse aligns to the exact same wave phase regardless of when components mount.
                </p>
              </div>
            </section>

            {/* 4. Anti-Flicker Timing */}
            <section id="anti-flicker" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono font-bold flex items-center justify-center text-sm">
                  04
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Anti-Flicker Timing</h2>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                When an API returns in 50ms (e.g. from local cache or CDN edge), flashing a skeleton screen for 1/20th of a second produces an unpleasant visual jarring effect. Veilkit’s <code className="text-sky-300">AntiFlickerController</code> prevents this:
              </p>

              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c121e] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300 font-mono">
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">delay (default 80ms)</span>
                  <span>Suppresses skeleton if data resolves within threshold.</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 font-mono">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">minVisible (default 300ms)</span>
                  <span>If skeleton displays, it stays visible long enough to prevent jitter.</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] overflow-hidden shadow-xl">
                <pre className="p-4 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{`import { AntiFlickerController } from 'veilkit';

const controller = new AntiFlickerController({
  delay: 80,        // Do not show skeleton if response takes < 80ms
  minVisible: 300,  // Keep skeleton visible for at least 300ms if displayed
  onShow: () => setVisible(true),
  onHide: () => setVisible(false),
});

// React Hook shorthand:
import { useAntiFlicker } from 'veilkit/react';
const showSkeleton = useAntiFlicker(isLoading, { delay: 80, minVisible: 300 });`}</code>
                </pre>
              </div>
            </section>

            {/* 5. Framework Guides */}
            <section id="react" className="space-y-8 scroll-mt-24 pt-6 border-t border-white/[0.08]">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-sky-400 font-semibold tracking-wider">Framework Guide</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">React & Next.js</h2>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Available via <code className="text-sky-300">veilkit/react</code>. Works seamlessly with Next.js App Router (RSC + Client Components), Remix, and Vite.
              </p>
              <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] overflow-hidden shadow-xl">
                <pre className="p-4 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{`import {
  Skeleton,          // Raw primitive with shape/animation
  SkeletonPreset,    // 45 pre-designed layouts (product, dashboard, kanban, etc.)
  Spinner,           // 30 hardware-accelerated spinners
  LoadingButton,     // 16 button loading animations with state machine
  VeilProvider,      // Global theme and animation provider
} from 'veilkit/react';

export default function App() {
  return (
    <VeilProvider defaultTheme="dark" defaultAnimation="shimmer" defaultShape="rounded">
      <SkeletonPreset name="dashboard" />
    </VeilProvider>
  );
}`}</code>
                </pre>
              </div>
            </section>

            {/* Vue 3 & Nuxt 3 */}
            <section id="vue" className="space-y-6 scroll-mt-24">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">Framework Guide</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Vue 3 & Nuxt 3</h2>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Import components from <code className="text-emerald-300">veilkit/vue</code>, or register the global Vue plugin with auto-directive <code className="text-emerald-300">v-veil</code>:
              </p>
              <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] overflow-hidden shadow-xl">
                <pre className="p-4 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{`<!-- Composition API -->
<script setup>
import { ref } from 'vue';
import { VSkeletonPreset, VLoadingButton, VeilSpinner } from 'veilkit/vue';

const loading = ref(true);
const handleSave = async () => {
  await fetch('/api/save');
};
</script>

<template>
  <VSkeletonPreset v-if="loading" name="product-card" shape="rounded" />
  <VLoadingButton v-else style-type="shimmer-surface" :on-click="handleSave">
    Save Changes
  </VLoadingButton>
</template>`}</code>
                </pre>
              </div>
            </section>

            {/* Svelte 5 & SvelteKit */}
            <section id="svelte" className="space-y-6 scroll-mt-24">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider">Framework Guide</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Svelte 4/5 & SvelteKit</h2>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Use Svelte components or native actions like <code className="text-amber-300">use:presetAction</code> and <code className="text-amber-300">use:loadingButtonAction</code>:
              </p>
              <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] overflow-hidden shadow-xl">
                <pre className="p-4 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{`<script>
  import { SkeletonPreset, Spinner } from 'veilkit/svelte';
  import { loadingButtonAction } from 'veilkit/svelte';
  let loading = true;
</script>

{#if loading}
  <SkeletonPreset name="e-commerce-checkout" shape="rounded" />
{:else}
  <button use:loadingButtonAction={{ styleType: 'spinner-left', resetAfter: 2000 }}>
    Checkout Now
  </button>
{/if}`}</code>
                </pre>
              </div>
            </section>

            {/* Angular 17-19 */}
            <section id="angular" className="space-y-6 scroll-mt-24">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-rose-400 font-semibold tracking-wider">Framework Guide</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Angular 17, 18, 19 (Standalone)</h2>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] overflow-hidden shadow-xl">
                <pre className="p-4 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{`import { Component } from '@angular/core';
import { VeilPresetComponent, VeilLoadingButtonComponent } from 'veilkit/angular';

@Component({
  standalone: true,
  imports: [VeilPresetComponent, VeilLoadingButtonComponent],
  template: \`
    <veil-preset name="profile-header" shape="glass" animation="aurora"></veil-preset>
    <veil-loading-button styleType="morph-circle" (click)="onSave()">Save</veil-loading-button>
  \`,
})
export class UserProfileComponent {
  onSave() { /* ... */ }
}`}</code>
                </pre>
              </div>
            </section>

            {/* React Native & Expo */}
            <section id="native" className="space-y-6 scroll-mt-24">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">Mobile Guide</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">React Native & Expo</h2>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Mobile-optimized with <code className="text-cyan-300">expo-linear-gradient</code> and hardware haptics integration:
              </p>
              <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] overflow-hidden shadow-xl">
                <pre className="p-4 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{`import { Skeleton, SkeletonGroup, LoadingButton } from 'veilkit/native';
import { View } from 'react-native';

export function MobileCard() {
  return (
    <SkeletonGroup animation="shimmer" theme="dark">
      <Skeleton shape="circle" size={48} />
      <Skeleton width="70%" height={20} style={{ marginTop: 8 }} />
      <Skeleton width="100%" height={12} lines={3} />
    </SkeletonGroup>
  );
}`}</code>
                </pre>
              </div>
            </section>

            {/* Web Components & CDN */}
            <section id="element" className="space-y-6 scroll-mt-24">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-purple-400 font-semibold tracking-wider">Web Standards</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Web Components (Solid, Qwik, HTMX)</h2>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] overflow-hidden shadow-xl">
                <pre className="p-4 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{`import 'veilkit/element';

// Use directly in any HTML, SolidJS, Qwik, or HTMX template:
<veil-preset name="pricing-card" shape="rounded" animation="shimmer"></veil-preset>
<veil-spinner type="arc-gradient" size="36" color="#38bdf8"></veil-spinner>`}</code>
                </pre>
              </div>
            </section>

            {/* 6. Catalogs & APIs */}
            <section id="presets" className="space-y-6 scroll-mt-24 pt-6 border-t border-white/[0.08]">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-sky-400 font-semibold tracking-wider">UI Catalog</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">45+ Built-in Skeleton Presets</h2>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Veilkit provides 45 production-tested responsive preset templates covering every application UI category:
              </p>
              <div className="p-4 rounded-2xl border border-white/[0.08] bg-[#0c121e] grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono text-slate-300">
                <span>• product-card</span>
                <span>• card</span>
                <span>• product-grid</span>
                <span>• product-detail</span>
                <span>• e-commerce-checkout</span>
                <span>• dashboard</span>
                <span>• kpi-card</span>
                <span>• chart-bar</span>
                <span>• chart-line</span>
                <span>• chart-pie</span>
                <span>• kanban</span>
                <span>• timeline</span>
                <span>• calendar</span>
                <span>• table</span>
                <span>• list</span>
                <span>• list-item</span>
                <span>• inbox-list</span>
                <span>• notification-list</span>
                <span>• order-list</span>
                <span>• search-results</span>
                <span>• profile</span>
                <span>• profile-header</span>
                <span>• feed-post</span>
                <span>• stories-row</span>
                <span>• reels</span>
                <span>• social-story</span>
                <span>• comment-thread</span>
                <span>• chat</span>
                <span>• article</span>
                <span>• news-feed</span>
                <span>• media-card</span>
                <span>• video-player</span>
                <span>• music-player</span>
                <span>• code-block</span>
                <span>• file-explorer</span>
                <span>• form</span>
                <span>• navbar</span>
                <span>• sidebar</span>
                <span>• tabs</span>
                <span>• settings-page</span>
                <span>• faq-accordion</span>
                <span>• pricing-card</span>
                <span>• testimonial</span>
                <span>• map-card</span>
                <span>• hero-banner</span>
              </div>
              <div className="pt-2">
                <a
                  href="/presets"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-300 font-mono"
                >
                  Explore and test all 45 presets live in the Presets Gallery →
                </a>
              </div>
            </section>

            {/* Custom Layout Builder API */}
            <section id="custom-builder" className="space-y-6 scroll-mt-24">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">Custom Layout Engine</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Fluent Skeleton Builder & JSON Engine</h2>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Design custom skeletons matching your website&apos;s exact layout without writing repetitive CSS:
              </p>
              <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] overflow-hidden shadow-xl">
                <pre className="p-4 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{`import { SkeletonBuilder } from 'veilkit';

// Fluent programmatic builder:
const builder = new SkeletonBuilder({ shape: 'rounded', animation: 'shimmer' })
  .card((card) => {
    card.row((row) => {
      row.avatar(44);
      row.col((col) => {
        col.heading('65%');
        col.lines(2);
      });
    });
    card.rect('100%', 160);
    card.button(120, 36);
  });

// Render in React:
import { CustomSkeleton } from 'veilkit/react';
<CustomSkeleton layout={builder.toJSON()} />`}</code>
                </pre>
              </div>
            </section>

            {/* 30 Spinners Catalog */}
            <section id="spinners" className="space-y-6 scroll-mt-24">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-indigo-400 font-semibold tracking-wider">Spinners</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">30 Hardware-Accelerated Spinners</h2>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                30 unique spinner animations with real-time controls for size, multiplier speed (0.5x, 1x, 2x), custom hex/currentColor palettes, and glassmorphic glow:
              </p>
              <div className="p-4 rounded-2xl border border-white/[0.08] bg-[#0c121e] grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-slate-300">
                <span>• arc-gradient</span>
                <span>• ring</span>
                <span>• dual-ring</span>
                <span>• dots</span>
                <span>• bars</span>
                <span>• pulse</span>
                <span>• orbit</span>
                <span>• wave</span>
                <span>• bounce</span>
                <span>• ios-activity</span>
                <span>• glass-orb</span>
                <span>• morph</span>
                <span>• progress-circle</span>
                <span>• pulse-ring</span>
                <span>• dots-circle</span>
                <span>• grid-dots</span>
                <span>• square-flip</span>
                <span>• cube-fold</span>
                <span>• hourglass</span>
                <span>• infinity</span>
                <span>• heartbeat-line</span>
                <span>• equalizer</span>
                <span>• chasing-dots</span>
                <span>• typing</span>
                <span>• liquid-fill</span>
                <span>• atom</span>
                <span>• clock</span>
                <span>• radar</span>
                <span>• ellipsis</span>
                <span>• flower</span>
              </div>
            </section>

            {/* 16 Loading Buttons */}
            <section id="buttons" className="space-y-6 scroll-mt-24">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-sky-400 font-semibold tracking-wider">Buttons</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">16 Button Loading Animations & State Machine</h2>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Transform any regular button into an interactive state machine handling asynchronous promises (<code className="text-sky-300">idle → loading → success | error → idle</code>):
              </p>
              <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] overflow-hidden shadow-xl">
                <pre className="p-4 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{`import { LoadingButton } from 'veilkit/react';

<LoadingButton
  styleType="shimmer-surface"         // 16 styles available
  resultAnimation="checkmark"          // checkmark | cross | shake | success-burst
  pressFeedback="press-scale"          // press-scale | ripple | none
  loadingText="Saving..."
  successText="Profile Saved!"
  errorText="Connection Failed"
  resetAfter={2000}                    // Auto resets to idle after 2s
  onClick={async () => {
    await updateProfile();             // Native Promise handling
  }}
>
  Save Profile
</LoadingButton>`}</code>
                </pre>
              </div>
            </section>

            {/* Route Progress Bar */}
            <section id="progress" className="space-y-6 scroll-mt-24">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">Top Bar</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Route Navigation Progress Bar</h2>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] overflow-hidden shadow-xl">
                <pre className="p-4 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{`import { ProgressBar } from 'veilkit/react';

// Place in Next.js layout.tsx:
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ProgressBar color="#38bdf8" height={3} trickleSpeed={200} />
        {children}
      </body>
    </html>
  );
}`}</code>
                </pre>
              </div>
            </section>

            {/* CLI Layout Capture */}
            <section id="cli" className="space-y-6 scroll-mt-24">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-purple-400 font-semibold tracking-wider">Developer Tooling</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">CLI Layout Capture</h2>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Generate skeleton code automatically by inspecting any live website layout:
              </p>
              <div className="p-4 rounded-xl bg-[#080d16] border border-white/[0.08] font-mono text-xs sm:text-sm text-sky-400">
                npx veilkit capture https://myapp.com --selector &quot;.product-card&quot; --out ProductSkeleton.tsx
              </div>
            </section>
          </article>
        </div>
      </div>

      <Footer />
    </>
  );
}
