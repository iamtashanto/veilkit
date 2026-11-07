'use client';

import { useState } from 'react';

export function FrameworkShowcase() {
  const [activeFw, setActiveFw] = useState<'react' | 'vue' | 'svelte' | 'angular' | 'element' | 'native' | 'cdn'>('react');
  const [copied, setCopied] = useState(false);

  const snippets = {
    react: `// Next.js & React 19 Client Component
import { Skeleton, SkeletonPreset, LoadingButton, Spinner } from 'veilkit/react';

export function UserDashboard({ user, loading }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {/* Preset Skeleton with glass theme */}
        <SkeletonPreset name="dashboard" shape="glass" animation="aurora" />
      </div>
    );
  }

  return (
    <LoadingButton
      loadingStyle="morph-circle"
      loadingText="Saving Changes..."
      successText="Saved!"
      onClick={async () => await saveSettings()}
    >
      Update Profile
    </LoadingButton>
  );
}`,
    vue: `<!-- Vue 3 & Nuxt 3 Composition API -->
<script setup>
import { VSkeleton, VSkeletonPreset, VLoadingButton } from 'veilkit/vue';
const loading = ref(true);
</script>

<template>
  <div v-if="loading">
    <VSkeletonPreset name="product-card" shape="rounded" animation="shimmer" />
  </div>
  <VLoadingButton
    v-else
    loading-style="shimmer-surface"
    loading-text="Processing..."
    :on-click="handleCheckout"
  >
    Checkout Now
  </VLoadingButton>
</template>`,
    svelte: `<!-- Svelte 5 & SvelteKit Runes -->
<script>
  import { presetAction, loadingButtonAction } from 'veilkit/svelte';
  let loading = $state(true);
</script>

{#if loading}
  <div use:presetAction={{ name: 'feed-post', shape: 'square', animation: 'wave' }} />
{:else}
  <button use:loadingButtonAction={{ loadingStyle: 'stripes-progress' }}>
    Post Comment
  </button>
{/if}`,
    angular: `// Angular 17/18/19 Standalone Component
import { Component } from '@angular/core';
import { VeilPresetComponent, VeilLoadingButtonComponent } from 'veilkit/angular';

@Component({
  standalone: true,
  imports: [VeilPresetComponent, VeilLoadingButtonComponent],
  template: \`
    @if (loading) {
      <veil-preset name="article" shape="rounded" animation="aurora" />
    } @else {
      <veil-loading-button loadingStyle="morph-circle" (btnClick)="onSave()">
        Publish Article
      </veil-loading-button>
    }
  \`,
})
export class ArticleComponent {
  loading = true;
}`,
    element: `<!-- Web Components (Solid, Qwik, HTMX, HTML) -->
<link rel="stylesheet" href="https://unpkg.com/veilkit/dist/styles.css" />
<script type="module" src="https://unpkg.com/veilkit/dist/element/index.js"></script>

<!-- Render Any Preset Directly in HTML -->
<veil-preset name="product-card" shape="glass" animation="shimmer"></veil-preset>

<!-- Interactive Native Spinner -->
<veil-spinner type="arc-gradient" size="32px" color="#38bdf8"></veil-spinner>

<!-- Native Loading Button Custom Element -->
<veil-loading-button loading-style="border-trace" text="Save Changes"></veil-loading-button>`,
    native: `// React Native & Expo Mobile
import { Skeleton, SkeletonGroup, LoadingButton, Spinner } from 'veilkit/native';

export function ProfileScreen({ loading }) {
  return (
    <SkeletonGroup animation="shimmer" theme="auto">
      {/* Circle Avatar */}
      <Skeleton circle width={56} height={56} />
      
      {/* Text Lines */}
      <Skeleton height={20} width="70%" radius={4} style={{ marginTop: 10 }} />
      <Skeleton height={14} width="40%" radius={4} style={{ marginTop: 6 }} />

      {/* Loading Button with Native Haptics */}
      <LoadingButton
        title="Sync Cloud"
        haptics={true}
        onPress={async () => await syncDatabase()}
      />
    </SkeletonGroup>
  );
}`,
    cdn: `<!-- Drop-in Vanilla JS & CDN -->
<link rel="stylesheet" href="https://unpkg.com/veilkit/dist/styles.css" />
<script src="https://unpkg.com/veilkit/dist/veilkit.min.js"></script>

<div id="skeleton-target"></div>

<script>
  // 1. Create Preset via Global Veilkit Engine
  const card = Veilkit.createPreset({ name: 'card', theme: 'glass', animation: 'shimmer' });
  document.getElementById('skeleton-target').appendChild(card);

  // 2. Start Top Route Progress
  Veilkit.progress.start();
  setTimeout(() => Veilkit.progress.done(), 800);
</script>`,
  };

  const frameworks = [
    { id: 'react', name: 'React / Next.js', badge: 'Client & RSC' },
    { id: 'vue', name: 'Vue 3 / Nuxt', badge: 'Composables' },
    { id: 'svelte', name: 'Svelte 5 / Kit', badge: 'Runes & Actions' },
    { id: 'angular', name: 'Angular 17-19', badge: 'Standalone' },
    { id: 'element', name: 'Web Components', badge: 'HTMX & Solid' },
    { id: 'native', name: 'React Native', badge: 'Expo Ready' },
    { id: 'cdn', name: 'Vanilla & CDN', badge: 'No Bundler' },
  ] as const;

  const copyCode = () => {
    navigator.clipboard.writeText(snippets[activeFw]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Write Once, Run Everywhere
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            100% Feature Parity Across Every Platform
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Switch frameworks without rewriting loading architecture. Same tokens, same synchronized clocks,
            same animations, everywhere.
          </p>
        </div>

        {/* Framework Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {frameworks.map((fw) => (
            <button
              key={fw.id}
              onClick={() => setActiveFw(fw.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeFw === fw.id
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20 font-semibold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{fw.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                activeFw === fw.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {fw.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Code Snippet Box */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.1] bg-[#080d16] shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#05080e] border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400">
                {activeFw === 'react' ? 'Dashboard.tsx' : activeFw === 'vue' ? 'Dashboard.vue' : activeFw === 'svelte' ? 'Dashboard.svelte' : activeFw === 'angular' ? 'dashboard.component.ts' : activeFw === 'element' ? 'index.html' : activeFw === 'native' ? 'MobileScreen.tsx' : 'app.js'}
              </span>
            </div>
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-sky-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>{copied ? '✓ Copied' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="p-6 text-xs sm:text-sm font-mono text-slate-300 overflow-x-auto leading-relaxed">
            <code>{snippets[activeFw]}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
