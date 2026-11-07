'use client';

import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface SpinnerItem {
  name: string;
  category: string;
  desc: string;
  badge?: string;
}

export default function SpinnersCatalogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [size, setSize] = useState<number>(36);
  const [speed, setSpeed] = useState<number>(1);
  const [color, setColor] = useState<string>('#38bdf8');
  const [glass, setGlass] = useState<boolean>(false);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [activeFramework, setActiveFramework] = useState<'react' | 'vue' | 'svelte' | 'angular' | 'html'>('react');

  const allSpinners: SpinnerItem[] = [
    // Circular & Rings
    { name: 'arc-gradient', category: 'Rings & Arcs', desc: 'Conic gradient arc with high-speed GPU spinning tail', badge: 'Popular' },
    { name: 'ring', category: 'Rings & Arcs', desc: 'Minimal border ring with 3/4 stroke and smooth acceleration' },
    { name: 'dual-ring', category: 'Rings & Arcs', desc: 'Opposing counter-rotating dual circular borders', badge: 'Fast' },
    { name: 'pulse-ring', category: 'Rings & Arcs', desc: 'Expanding sonar radar ring that fades into infinity' },
    { name: 'progress-circle', category: 'Rings & Arcs', desc: 'Determinate/indeterminate SVG dash offset loader' },

    // Glass & Modern
    { name: 'glass-orb', category: 'Modern & 3D', desc: 'Backdrop blurred translucent frosted orb with glowing core', badge: 'Modern' },
    { name: 'morph', category: 'Modern & 3D', desc: 'Smooth organic blob morphing between circle and rounded squircle' },
    { name: 'square-flip', category: 'Modern & 3D', desc: '3D perspective axis isometric flip animation' },
    { name: 'cube-fold', category: 'Modern & 3D', desc: 'Isometric folding origami 4-quadrant cube' },
    { name: 'atom', category: 'Modern & 3D', desc: '3-axis orbital electron paths rotating around nucleus center' },

    // Dots & Grids
    { name: 'dots', category: 'Dots & Bars', desc: 'Classic horizontal triple dots with wave stagger phase' },
    { name: 'dots-circle', category: 'Dots & Bars', desc: '12 circular orbital dots arranged in a clock pattern' },
    { name: 'grid-dots', category: 'Dots & Bars', desc: '3x3 grid matrix of pulsating synced micro dots' },
    { name: 'chasing-dots', category: 'Dots & Bars', desc: 'Dual chasing orbs orbiting on a shared elliptical path' },
    { name: 'typing', category: 'Dots & Bars', desc: 'Subtle iMessage style chat typing bubble indicator' },
    { name: 'ellipsis', category: 'Dots & Bars', desc: 'Inline expanding/contracting text ellipsis loader' },

    // Waves & Audio
    { name: 'bars', category: 'Audio & Waves', desc: '5 vertical equalizer spectrum sound bars' },
    { name: 'wave', category: 'Audio & Waves', desc: 'Fluid sinusoidal wave ribbon motion' },
    { name: 'equalizer', category: 'Audio & Waves', desc: 'Dynamic acoustic studio sound-meter visualizer bars' },
    { name: 'heartbeat-line', category: 'Audio & Waves', desc: 'EKG ECG cardiogram electrocardiograph pulse spike' },

    // Motion & Geometry
    { name: 'bounce', category: 'Physics & Motion', desc: 'Bouncing spherical orb with ground squish physics' },
    { name: 'orbit', category: 'Physics & Motion', desc: 'Satellite sphere orbiting a glowing gravitational core' },
    { name: 'hourglass', category: 'Physics & Motion', desc: 'Double triangular sandglass rotating 180 degrees' },
    { name: 'infinity', category: 'Physics & Motion', desc: 'Continuous figure-8 lemniscate geometric motion loop' },
    { name: 'radar', category: 'Physics & Motion', desc: '360 degree sweeping sonar radar detection beam' },
    { name: 'clock', category: 'Physics & Motion', desc: 'Minimalist clock face with high speed sweeping hour and minute hands' },
    { name: 'flower', category: 'Physics & Motion', desc: '8-petal blooming rotating blossom icon' },
    { name: 'liquid-fill', category: 'Physics & Motion', desc: 'Wave reservoir container filling with liquid surface ripples' },
    { name: 'pulse', category: 'Physics & Motion', desc: 'Breathing glowing beacon orb' },
    { name: 'ios-activity', category: 'Apple Style', desc: 'Apple iOS Cupertino system activity indicator with fading spokes', badge: 'iOS' },
  ];

  const categories = ['all', 'Rings & Arcs', 'Modern & 3D', 'Dots & Bars', 'Audio & Waves', 'Physics & Motion', 'Apple Style'];

  const colors = [
    { label: 'Sky', value: '#38bdf8' },
    { label: 'Indigo', value: '#6366f1' },
    { label: 'Emerald', value: '#10b981' },
    { label: 'Rose', value: '#f43f5e' },
    { label: 'Amber', value: '#f59e0b' },
    { label: 'Violet', value: '#a855f7' },
    { label: 'White', value: '#f8fafc' },
  ];

  const filtered = allSpinners.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCodeSnippet = (name: string) => {
    switch (activeFramework) {
      case 'react':
        return `import { Spinner } from 'veilkit/react';\n\n<Spinner type="${name}" size={${size}} color="${color}" speed={${speed}}${glass ? ' glass' : ''} />`;
      case 'vue':
        return `<script setup>\nimport { VeilSpinner } from 'veilkit/vue';\n</script>\n\n<template>\n  <VeilSpinner type="${name}" :size="${size}" color="${color}" :speed="${speed}"${glass ? ' :glass="true"' : ''} />\n</template>`;
      case 'svelte':
        return `<script>\n  import { Spinner } from 'veilkit/svelte';\n</script>\n\n<Spinner type="${name}" size={${size}} color="${color}" speed={${speed}}${glass ? ' glass' : ''} />`;
      case 'angular':
        return `import { VeilSpinnerComponent } from 'veilkit/angular';\n\n<veil-spinner type="${name}" [size]="${size}" color="${color}" [speed]="${speed}"${glass ? ' [glass]="true"' : ''} />`;
      case 'html':
        return `<!-- CDN or Vanilla DOM -->\n<div class="veil-spinner" data-type="${name}" style="--veil-spinner-size: ${size}px; --veil-progress-color: ${color};"></div>\n<script type="module">\n  import { createSpinner } from 'veilkit';\n  createSpinner({ type: '${name}', size: ${size}, color: '${color}' });\n</script>`;
    }
  };

  const copyCode = (name: string) => {
    const code = getCodeSnippet(name);
    navigator.clipboard.writeText(code);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEO Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            30 Zero-Dependency Loaders
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            GPU-Accelerated Spinners Catalog
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Every loading indicator you will ever need. Smooth 60 FPS compositor animations, tree-shakeable, fully customizable size, speed, and themes.
          </p>
        </div>

        {/* Global Toolbar & Controls */}
        <div className="bg-[#0c121e]/90 p-5 rounded-2xl border border-white/[0.08] shadow-xl backdrop-blur-md mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search 30 spinners (e.g. arc, glass, ring)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Framework switcher for code snippets */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              {(['react', 'vue', 'svelte', 'angular', 'html'] as const).map((fw) => (
                <button
                  key={fw}
                  onClick={() => setActiveFramework(fw)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all cursor-pointer ${
                    activeFramework === fw ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {fw}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-white/[0.06]">
            {/* Size selector */}
            <div className="flex items-center justify-between bg-slate-900/60 px-3 py-2 rounded-xl border border-slate-800">
              <span className="text-xs font-medium text-slate-400">Size:</span>
              <div className="flex items-center gap-1">
                {[24, 32, 44, 60].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-2 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                      size === s ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}px
                  </button>
                ))}
              </div>
            </div>

            {/* Speed selector */}
            <div className="flex items-center justify-between bg-slate-900/60 px-3 py-2 rounded-xl border border-slate-800">
              <span className="text-xs font-medium text-slate-400">Speed:</span>
              <div className="flex items-center gap-1">
                {[0.5, 1, 1.5, 2].map((sp) => (
                  <button
                    key={sp}
                    onClick={() => setSpeed(sp)}
                    className={`px-2 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                      speed === sp ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {sp}x
                  </button>
                ))}
              </div>
            </div>

            {/* Color swatches */}
            <div className="flex items-center justify-between bg-slate-900/60 px-3 py-2 rounded-xl border border-slate-800">
              <span className="text-xs font-medium text-slate-400">Color:</span>
              <div className="flex items-center gap-1.5">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setColor(c.value)}
                    style={{ backgroundColor: c.value }}
                    title={c.label}
                    className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                      color === c.value ? 'ring-2 ring-white scale-125' : 'hover:scale-110 opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Glass effect toggle */}
            <div className="flex items-center justify-between bg-slate-900/60 px-3 py-2 rounded-xl border border-slate-800">
              <span className="text-xs font-medium text-slate-400">Glass Glow:</span>
              <button
                onClick={() => setGlass(!glass)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  glass ? 'bg-emerald-500 text-white font-bold shadow-md shadow-emerald-500/20' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {glass ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Category Pill Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                    : 'bg-slate-900/70 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Spinners (30)' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Spinners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((item) => {
            const isCopied = copiedName === item.name;

            return (
              <div
                key={item.name}
                className="group relative bg-[#0c121e]/80 hover:bg-[#111827] rounded-2xl p-6 border border-white/[0.08] hover:border-sky-500/40 transition-all flex flex-col justify-between items-center text-center shadow-lg hover:shadow-sky-500/10"
              >
                {/* Header & Badges */}
                <div className="w-full flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/30">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Animated Spinner Stage */}
                <div
                  className="my-6 min-h-[90px] flex items-center justify-center relative w-full"
                  style={{
                    filter: glass ? 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.5))' : undefined,
                  }}
                >
                  <div
                    className={`veil-spinner veil-spinner-${item.name}`}
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      color: color,
                      animationDuration: `${1 / speed}s`,
                    }}
                  />
                </div>

                {/* Info & Copy */}
                <div className="w-full space-y-2 mt-auto">
                  <h3 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors font-mono">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 h-8">
                    {item.desc}
                  </p>

                  <button
                    onClick={() => copyCode(item.name)}
                    className={`w-full mt-3 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-900 hover:bg-sky-500 text-slate-300 hover:text-white border border-slate-800 hover:border-sky-500'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Copied {activeFramework}!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* SEO Structured Content */}
        <div className="mt-16 bg-[#0c121e]/80 border border-white/[0.08] rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">Why GPU Composited Spinners Matter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300">
            <div className="space-y-2">
              <h4 className="font-semibold text-sky-400">Zero Main Thread Jank</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Traditional CSS spinners frequently animate layout properties like width, height, or margin, forcing the browser engine to perform expensive reflows. Veilkit animates strictly on transform and opacity running on the GPU compositor thread.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-emerald-400">Strict Zero Dependencies</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                No Lottie runtimes, no framer-motion peer baggage, no canvas engines. Each spinner weighs under 0.3 kB and tree-shakes completely when bundled into production apps.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-amber-400">Accessible Fallbacks</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Veilkit honors system-level <code className="text-slate-200">prefers-reduced-motion</code> media queries by switching high-frequency rotations to graceful static pulses or opacity states.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
