'use client';

import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ComparisonMatrix } from '../components/ComparisonMatrix';
import Link from 'next/link';

export default function ComparisonPage() {
  const [activeTab, setActiveTab] = useState<'table' | 'code-comparison' | 'benchmarks'>('table');

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Architectural Benchmark & Evaluation
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Veilkit vs The Alternatives
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Why modern engineering teams choose Veilkit over legacy single-purpose packages like react-loading-skeleton, react-content-loader, and nprogress.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex justify-center">
          <div className="flex items-center gap-1 bg-[#0c121e] p-1.5 rounded-2xl border border-white/[0.08] shadow-lg">
            <button
              onClick={() => setActiveTab('table')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'table' ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Full Feature Matrix
            </button>
            <button
              onClick={() => setActiveTab('code-comparison')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'code-comparison' ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Code Comparison
            </button>
            <button
              onClick={() => setActiveTab('benchmarks')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'benchmarks' ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Performance Benchmarks
            </button>
          </div>
        </div>

        {/* Tab 1: Feature Matrix */}
        {activeTab === 'table' && (
          <div className="space-y-6">
            <ComparisonMatrix />
          </div>
        )}

        {/* Tab 2: Code Comparison */}
        {activeTab === 'code-comparison' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="bg-[#0c121e]/90 rounded-2xl border border-rose-500/20 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-sm font-bold text-white">Legacy Skeleton Libraries (e.g. react-loading-skeleton / shadcn)</span>
                </div>
                <span className="text-xs font-mono text-rose-400">~38 lines boilerplate</span>
              </div>
              <p className="text-xs text-slate-400">
                Requires manually calculating heights, nesting divs, managing responsive breakpoints, and recreating loading spinners separately.
              </p>
              <pre className="text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 overflow-x-auto leading-relaxed">
{`// Requires building every wireframe manually:
<div className="border rounded-2xl p-4 space-y-3">
  {/* Hero image */}
  <Skeleton height={200} className="w-full rounded-xl" />
  
  {/* Category badge */}
  <Skeleton width={80} height={20} className="rounded-full" />
  
  {/* Title & lines */}
  <Skeleton height={24} width="85%" />
  <Skeleton count={2} height={14} />
  
  {/* Price + Buy Button */}
  <div className="flex justify-between items-center pt-2">
    <Skeleton width={60} height={24} />
    <Skeleton width={100} height={36} className="rounded-lg" />
  </div>
</div>
// Plus: no anti-flicker delay, no SSR shape styling,
// no automatic glass themes, React only.`}
              </pre>
            </div>

            {/* The Veilkit Way */}
            <div className="bg-[#0c121e]/90 rounded-2xl border border-sky-500/40 p-6 space-y-4 shadow-xl shadow-sky-500/5">
              <div className="flex items-center justify-between pb-3 border-b border-sky-500/20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <span className="text-sm font-bold text-white">The Veilkit Way</span>
                </div>
                <span className="text-xs font-mono text-emerald-400">1 declarative line</span>
              </div>
              <p className="text-xs text-slate-400">
                Canonical, pixel-perfect, responsive layouts out-of-the-box. Includes built-in anti-flicker delay, 30 animations, and full multi-framework compatibility.
              </p>
              <pre className="text-xs font-mono bg-slate-950 p-4 rounded-xl border border-sky-500/20 text-slate-200 overflow-x-auto leading-relaxed">
{`import { SkeletonPreset } from 'veilkit/react';

// Ready-to-go, responsive, 60fps GPU animated
<SkeletonPreset
  name="product-card"
  shape="rounded"
  animation="shimmer"
  delay={200}
/>

// Or use the fluent custom layout builder:
// SkeletonBuilder.row().avatar().col().heading().lines(2).build()`}
              </pre>
              <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/20 text-xs text-sky-300">
                🚀 <strong>Works Everywhere:</strong> Identical syntax in React, Next.js (RSC-safe), Vue, Nuxt, Svelte, Angular, Web Components, and React Native!
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Performance Benchmarks */}
        {activeTab === 'benchmarks' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0c121e]/90 p-6 rounded-2xl border border-white/[0.08] space-y-3">
              <div className="text-3xl font-extrabold text-sky-400 font-mono">18.8 kB</div>
              <h3 className="text-base font-bold text-white">Full Bundle (Core + 45 Presets)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Contains all 45 layouts, 30 spinners, 30 animations, and the anti-flicker orchestrator. When tree-shaken with modern bundlers, individual components weigh &lt; 2 kB.
              </p>
            </div>

            <div className="bg-[#0c121e]/90 p-6 rounded-2xl border border-white/[0.08] space-y-3">
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">60 FPS</div>
              <h3 className="text-base font-bold text-white">Compositor Only Animation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Veilkit animations run strictly on <code className="text-slate-300">transform</code> and <code className="text-slate-300">opacity</code>. Zero layout recalculations, zero paint thrashing, zero scroll stutters on mobile devices.
              </p>
            </div>

            <div className="bg-[#0c121e]/90 p-6 rounded-2xl border border-white/[0.08] space-y-3">
              <div className="text-3xl font-extrabold text-amber-400 font-mono">0 ms</div>
              <h3 className="text-base font-bold text-white">Hydration Mismatch</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Built-in SSR and React Server Components (RSC) safety. Generates deterministic DOM nodes that match server-rendered markup with zero hydration errors.
              </p>
            </div>
          </div>
        )}

        {/* Deep Dive Reviews */}
        <div className="space-y-8 pt-8">
          <h2 className="text-2xl font-bold text-white">Detailed Competitor Deep Dives</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* React Loading Skeleton */}
            <div className="bg-[#0c121e]/80 rounded-2xl p-6 border border-white/[0.08] space-y-3">
              <h3 className="text-base font-bold text-white">Veilkit vs react-loading-skeleton</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                <code className="text-slate-200">react-loading-skeleton</code> has been a staple in React for years, but it is strictly single-framework, has zero presets (you have to manually build every wireframe), does not include spinners or button loaders, and lacks modern shape theming or anti-flicker delay timers. Veilkit is a complete universal toolkit supporting 7 platforms.
              </p>
            </div>

            {/* React Content Loader */}
            <div className="bg-[#0c121e]/80 rounded-2xl p-6 border border-white/[0.08] space-y-3">
              <h3 className="text-base font-bold text-white">Veilkit vs react-content-loader</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                <code className="text-slate-200">react-content-loader</code> uses SVG <code className="text-slate-200">&lt;clipPath&gt;</code> elements with hardcoded coordinate values (x, y, rx, ry). When container dimensions resize, SVG coordinates often distort or break responsive breakpoints. Veilkit uses native CSS flexbox/grid containers that scale naturally with your app&apos;s fluid grid.
              </p>
            </div>

            {/* NProgress */}
            <div className="bg-[#0c121e]/80 rounded-2xl p-6 border border-white/[0.08] space-y-3">
              <h3 className="text-base font-bold text-white">Veilkit vs NProgress</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                <code className="text-slate-200">nprogress</code> is an unmaintained vanilla script from 2013 that directly mutates global <code className="text-slate-200">document.body</code> DOM. Veilkit provides state-of-the-art route transition loaders with trickling physics, gradient glow options, and full framework lifecycle integration.
              </p>
            </div>

            {/* Shadcn UI Skeleton */}
            <div className="bg-[#0c121e]/80 rounded-2xl p-6 border border-white/[0.08] space-y-3">
              <h3 className="text-base font-bold text-white">Veilkit vs shadcn/ui Skeleton</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Shadcn&apos;s skeleton component is simply a single line: <code className="text-slate-200">&lt;div className=&quot;animate-pulse rounded-md bg-muted&quot; /&gt;</code>. While elegant for basic blocks, developers spend hours hand-crafting complex layout wireframes. Veilkit provides 45 pre-crafted canonical layouts plus a visual custom skeleton generator.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 p-10 rounded-3xl border border-sky-500/20 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Ready to Upgrade Your Loading States?</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Zero runtime dependencies, works across every framework, under 19 kB. Install Veilkit in seconds.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/docs"
              className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-sky-500/25 transition-all"
            >
              Get Started in Docs →
            </Link>
            <Link
              href="/playground"
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all"
            >
              Try Live Playground
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
