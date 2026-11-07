'use client';

import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomSkeletonBuilder } from '../components/CustomSkeletonBuilder';
import { SkeletonPreset, Spinner, LoadingButton } from 'veilkit/react';

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<'preset' | 'spinner' | 'button' | 'builder'>('preset');

  // Presets state
  const [selectedPreset, setSelectedPreset] = useState<string>('product-card');
  const [selectedShape, setSelectedShape] = useState<'rounded' | 'pill' | 'square' | 'sharp' | 'glass'>('rounded');
  const [selectedAnim, setSelectedAnim] = useState<string>('shimmer');
  const [selectedTheme, setSelectedTheme] = useState<string>('dark');
  const [isSimulatingPreset, setIsSimulatingPreset] = useState<boolean>(false);
  const [presetViewMode, setPresetViewMode] = useState<'skeleton' | 'content'>('skeleton');

  // Spinners state
  const [selectedSpinner, setSelectedSpinner] = useState<string>('arc-gradient');
  const [spinnerSize, setSpinnerSize] = useState<number>(44);
  const [spinnerSpeed, setSpinnerSpeed] = useState<number>(1);
  const [spinnerColor, setSpinnerColor] = useState<string>('#38bdf8');
  const [spinnerGlass, setSpinnerGlass] = useState<boolean>(false);

  // Loading Buttons state
  const [buttonStyle, setButtonStyle] = useState<string>('spinner-left');
  const [buttonStatus, setButtonStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [resultAnim, setResultAnim] = useState<'checkmark' | 'cross' | 'shake' | 'success-burst'>('checkmark');
  const [pressFeedback, setPressFeedback] = useState<'press-scale' | 'ripple' | 'none'>('press-scale');
  const [buttonCodeFw, setButtonCodeFw] = useState<'react' | 'vue' | 'svelte' | 'html'>('react');

  // Snippet copy state
  const [copied, setCopied] = useState(false);

  const presets = [
    'product-card', 'card', 'product-grid', 'product-detail', 'e-commerce-checkout',
    'dashboard', 'kpi-card', 'chart-bar', 'chart-line', 'chart-pie',
    'kanban', 'timeline', 'calendar', 'table', 'list', 'list-item',
    'inbox-list', 'notification-list', 'order-list', 'search-results',
    'profile', 'profile-header', 'feed-post', 'stories-row', 'reels',
    'social-story', 'comment-thread', 'chat', 'article', 'news-feed',
    'media-card', 'video-player', 'music-player', 'code-block', 'file-explorer',
    'form', 'navbar', 'sidebar', 'tabs', 'settings-page',
    'faq-accordion', 'pricing-card', 'testimonial', 'map-card', 'hero-banner'
  ];

  const spinners = [
    'arc-gradient', 'ring', 'dual-ring', 'dots', 'bars', 'pulse',
    'orbit', 'wave', 'bounce', 'ios-activity', 'glass-orb', 'morph',
    'progress-circle', 'pulse-ring', 'dots-circle', 'grid-dots', 'square-flip',
    'cube-fold', 'hourglass', 'infinity', 'heartbeat-line', 'equalizer',
    'chasing-dots', 'typing', 'liquid-fill', 'atom', 'clock', 'radar',
    'ellipsis', 'flower'
  ];

  const buttonStyles = [
    'spinner-left', 'spinner-right', 'spinner-replace', 'dots-after-text',
    'progress-fill', 'shimmer-surface', 'pulse-glow', 'stripes-progress',
    'morph-circle', 'slide-text', 'border-trace', 'liquid-fill',
    'bounce-dots', 'glass-shine', 'neon-pulse', 'skeleton-button'
  ];

  const colorSwatches = [
    { label: 'Sky', value: '#38bdf8' },
    { label: 'Indigo', value: '#6366f1' },
    { label: 'Emerald', value: '#10b981' },
    { label: 'Rose', value: '#f43f5e' },
    { label: 'Amber', value: '#f59e0b' },
    { label: 'Violet', value: '#a855f7' },
    { label: 'White', value: '#f8fafc' },
  ];

  // Async simulation trigger
  const triggerSimulation = (targetResult: 'success' | 'error') => {
    setButtonStatus('loading');
    setTimeout(() => {
      setButtonStatus(targetResult);
      setTimeout(() => {
        setButtonStatus('idle');
      }, 2500);
    }, 1600);
  };

  const copySnippet = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPresetCode = () => {
    return `import { SkeletonPreset } from 'veilkit/react';\n\n<SkeletonPreset\n  name="${selectedPreset}"\n  shape="${selectedShape}"\n  animation="${selectedAnim}"\n  theme="${selectedTheme}"\n/>`;
  };

  const getSpinnerCode = () => {
    return `import { Spinner } from 'veilkit/react';\n\n<Spinner\n  type="${selectedSpinner}"\n  size={${spinnerSize}}\n  color="${spinnerColor}"\n  speed={${spinnerSpeed}}${spinnerGlass ? '\n  glass' : ''}\n/>`;
  };

  const getButtonCode = () => {
    switch (buttonCodeFw) {
      case 'react':
        return `import { LoadingButton } from 'veilkit/react';\n\n<LoadingButton\n  styleType="${buttonStyle}"\n  resultAnimation="${resultAnim}"\n  pressFeedback="${pressFeedback}"\n  loadingText="Saving..."\n  successText="Saved!"\n  onClick={async () => await saveProfile()}\n>\n  Save Profile\n</LoadingButton>`;
      case 'vue':
        return `<template>\n  <VLoadingButton\n    style-type="${buttonStyle}"\n    result-animation="${resultAnim}"\n    :on-click="handleSave"\n  >\n    Save Profile\n  </VLoadingButton>\n</template>`;
      case 'svelte':
        return `<script>\n  import { loadingButtonAction } from 'veilkit/svelte';\n</script>\n\n<button use:loadingButtonAction={{ styleType: '${buttonStyle}' }}>\n  Save Profile\n</button>`;
      case 'html':
        return `<button id="btn">Save Profile</button>\n<script type="module">\n  import { wrapLoadingButton } from 'veilkit';\n  wrapLoadingButton(document.getElementById('btn'), {\n    styleType: '${buttonStyle}',\n    resultAnimation: '${resultAnim}'\n  });\n</script>`;
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Interactive Studio
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Veilkit Live Playground
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Test and customize all 45 presets, 30 spinners, 16 button animations, and custom skeleton layouts live.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('preset')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'preset'
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 ring-2 ring-sky-400/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Presets (45)
          </button>
          <button
            onClick={() => setActiveTab('spinner')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'spinner'
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 ring-2 ring-sky-400/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Spinners (30)
          </button>
          <button
            onClick={() => setActiveTab('button')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'button'
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 ring-2 ring-sky-400/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Loading Buttons (16)
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'builder'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            ✦ Custom Layout Builder
          </button>
        </div>

        {/* ================= TAB 1: PRESETS (45) ================= */}
        {activeTab === 'preset' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-4 p-6 rounded-2xl border border-white/[0.08] bg-[#0c121e]/90 space-y-5 shadow-xl">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Preset Template ({presets.length})
                </label>
                <select
                  value={selectedPreset}
                  onChange={(e) => setSelectedPreset(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  {presets.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Shape Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['rounded', 'pill', 'square', 'sharp', 'glass'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedShape(s)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize border transition-all cursor-pointer ${
                        selectedShape === s
                          ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/20'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">GPU Animation</label>
                <select
                  value={selectedAnim}
                  onChange={(e) => setSelectedAnim(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  {[
                    'shimmer', 'wave', 'pulse', 'blink', 'breathe', 'glass-shine',
                    'gradient-flow', 'aurora', 'scan-line', 'sparkle', 'neon-glow',
                    'ripple', 'ping-pong', 'cascade', 'spotlight', 'rainbow',
                    'heartbeat', 'liquid', 'border-glow', 'typewriter'
                  ].map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Theme Palette</label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  {['dark', 'glass', 'neon', 'sunset', 'ocean', 'light', 'ios', 'material', 'minimal', 'mono', 'auto'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 border-t border-white/[0.08]">
                <button
                  onClick={() => {
                    setIsSimulatingPreset(true);
                    setPresetViewMode('skeleton');
                    setTimeout(() => {
                      setPresetViewMode('content');
                      setIsSimulatingPreset(false);
                    }, 1200);
                  }}
                  disabled={isSimulatingPreset}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-sky-500/20 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <span>{isSimulatingPreset ? 'Fetching (1.2s)...' : '⚡️ Simulate Async Load (1.2s)'}</span>
                </button>
              </div>
            </div>

            {/* Live Canvas Preview */}
            <div className="lg:col-span-8 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#0c121e]/90 min-h-[420px] flex flex-col justify-center relative shadow-xl">
                {/* Header Chrome */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-mono text-slate-300 font-bold">
                      {selectedPreset} ({selectedShape} • {selectedAnim} • {selectedTheme})
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                    <button
                      onClick={() => setPresetViewMode('skeleton')}
                      className={`px-2.5 py-1 rounded font-medium transition-all ${
                        presetViewMode === 'skeleton' ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Skeleton View
                    </button>
                    <button
                      onClick={() => setPresetViewMode('content')}
                      className={`px-2.5 py-1 rounded font-medium transition-all ${
                        presetViewMode === 'content' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Content View
                    </button>
                  </div>
                </div>

                {/* Stage Rendering */}
                <div className="max-w-xl mx-auto w-full">
                  {presetViewMode === 'skeleton' ? (
                    <div className="p-4 rounded-2xl border border-white/[0.08] bg-slate-900/60 shadow-inner">
                      {/* REAL LIVE VEILKIT PRESET COMPONENT */}
                      <SkeletonPreset
                        key={`${selectedPreset}-${selectedShape}-${selectedAnim}-${selectedTheme}`}
                        name={selectedPreset as any}
                        shape={selectedShape}
                        animation={selectedAnim as any}
                        theme={selectedTheme as any}
                      />
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/90 space-y-4 animate-blurIn">
                      <div className="w-full h-40 rounded-xl bg-gradient-to-tr from-sky-500/20 via-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                        <span className="text-4xl">✨</span>
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                          {selectedPreset}
                        </span>
                        <h3 className="text-lg font-bold text-white">Dynamic Content Fully Loaded</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          The skeleton matched this container with zero layout thrash and perfect subpixel dimension lock.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Code Snippet */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] overflow-hidden shadow-lg">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#05080e] border-b border-white/[0.08]">
                  <span className="text-xs font-mono text-slate-400">React / Next.js Component</span>
                  <button
                    onClick={() => copySnippet(getPresetCode())}
                    className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/30 transition-colors cursor-pointer"
                  >
                    {copied ? '✓ Copied' : 'Copy Code'}
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto">
                  <code>{getPresetCode()}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: SPINNERS (30) ================= */}
        {activeTab === 'spinner' && (
          <div className="space-y-8">
            {/* Controls Bar */}
            <div className="bg-[#0c121e]/90 p-5 rounded-2xl border border-white/[0.08] shadow-xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Size */}
                <div className="flex items-center justify-between bg-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-800">
                  <span className="text-xs font-semibold text-slate-300">Size:</span>
                  <div className="flex items-center gap-1.5">
                    {[24, 36, 48, 64].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSpinnerSize(s)}
                        className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                          spinnerSize === s ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {s}px
                      </button>
                    ))}
                  </div>
                </div>

                {/* Speed */}
                <div className="flex items-center justify-between bg-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-800">
                  <span className="text-xs font-semibold text-slate-300">Speed:</span>
                  <div className="flex items-center gap-1.5">
                    {[0.5, 1, 1.5, 2].map((sp) => (
                      <button
                        key={sp}
                        onClick={() => setSpinnerSpeed(sp)}
                        className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                          spinnerSpeed === sp ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {sp}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div className="flex items-center justify-between bg-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-800">
                  <span className="text-xs font-semibold text-slate-300">Color:</span>
                  <div className="flex items-center gap-1.5">
                    {colorSwatches.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setSpinnerColor(c.value)}
                        style={{ backgroundColor: c.value }}
                        title={c.label}
                        className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                          spinnerColor === c.value ? 'ring-2 ring-white scale-125' : 'hover:scale-110 opacity-70'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Glass Glow */}
                <div className="flex items-center justify-between bg-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-800">
                  <span className="text-xs font-semibold text-slate-300">Glass Glow:</span>
                  <button
                    onClick={() => setSpinnerGlass(!spinnerGlass)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      spinnerGlass ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {spinnerGlass ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>

            {/* Focused Preview Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 bg-[#080d16] p-8 rounded-2xl border border-white/[0.08] flex flex-col items-center justify-center min-h-[220px] text-center shadow-xl">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
                  Active Focused Spinner
                </span>
                {/* REAL LARGE SPINNER */}
                <div
                  className="p-4"
                  style={{ filter: spinnerGlass ? `drop-shadow(0 0 16px ${spinnerColor})` : undefined }}
                >
                  <Spinner
                    key={`${selectedSpinner}-${spinnerSize}-${spinnerColor}-${spinnerSpeed}-${spinnerGlass}`}
                    type={selectedSpinner as any}
                    size={spinnerSize}
                    color={spinnerColor}
                    speed={spinnerSpeed}
                    glass={spinnerGlass}
                  />
                </div>
                <div className="mt-4 font-mono font-bold text-white text-sm">
                  {selectedSpinner}
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#080d16] rounded-2xl border border-white/[0.08] overflow-hidden shadow-xl">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#05080e] border-b border-white/[0.08]">
                  <span className="text-xs font-mono text-slate-400">Code Generator</span>
                  <button
                    onClick={() => copySnippet(getSpinnerCode())}
                    className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/30 transition-colors cursor-pointer"
                  >
                    {copied ? '✓ Copied' : 'Copy Code'}
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto">
                  <code>{getSpinnerCode()}</code>
                </pre>
              </div>
            </div>

            {/* 30 Spinners Grid with REAL Dynamic Component on every single card */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {spinners.map((sp) => {
                const isSelected = selectedSpinner === sp;

                return (
                  <div
                    key={sp}
                    onClick={() => setSelectedSpinner(sp)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-4 text-center group ${
                      isSelected
                        ? 'border-sky-400 bg-sky-500/10 shadow-xl shadow-sky-500/20 scale-[1.03]'
                        : 'border-white/[0.08] bg-[#0c121e]/80 hover:border-sky-500/40 hover:bg-[#111827]'
                    }`}
                  >
                    {/* REAL LIVE SPINNER RENDERED VIA CREATE_SPINNER / SPINNER COMPONENT */}
                    <div
                      className="min-h-[50px] flex items-center justify-center"
                      style={{ filter: isSelected && spinnerGlass ? `drop-shadow(0 0 10px ${spinnerColor})` : undefined }}
                    >
                      <Spinner
                        key={`${sp}-${spinnerSpeed}-${isSelected ? spinnerColor : '#64748b'}`}
                        type={sp as any}
                        size={32}
                        color={isSelected ? spinnerColor : '#94a3b8'}
                        speed={spinnerSpeed}
                        glass={isSelected && spinnerGlass}
                      />
                    </div>
                    <span className={`text-xs font-mono transition-colors ${
                      isSelected ? 'text-sky-300 font-bold' : 'text-slate-400 group-hover:text-white'
                    }`}>
                      {sp}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 3: LOADING BUTTONS (16) ================= */}
        {activeTab === 'button' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl border border-white/[0.08] bg-[#0c121e]/90 shadow-2xl space-y-6">
              <div className="text-center space-y-1.5">
                <h3 className="text-2xl font-extrabold text-white">Loading Button State Machine</h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Test promise resolution, 16 distinct loading animation styles, press feedback, and result draw animations.
                </p>
              </div>

              {/* 16 Styles Grid Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Select Loading Animation Style ({buttonStyles.length})
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {buttonStyles.map((style) => (
                    <button
                      key={style}
                      onClick={() => setButtonStyle(style)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer text-left ${
                        buttonStyle === style
                          ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20 border border-sky-400'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status and Feedback Modifiers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
                {/* Result Anim */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Result Animation:</label>
                  <select
                    value={resultAnim}
                    onChange={(e) => setResultAnim(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  >
                    <option value="checkmark">checkmark (draw icon)</option>
                    <option value="cross">cross (error icon)</option>
                    <option value="shake">shake (error shudder)</option>
                    <option value="success-burst">success-burst (glow ring)</option>
                  </select>
                </div>

                {/* Press Feedback */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Press Feedback:</label>
                  <select
                    value={pressFeedback}
                    onChange={(e) => setPressFeedback(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  >
                    <option value="press-scale">press-scale (micro spring)</option>
                    <option value="ripple">ripple (material wave)</option>
                    <option value="none">none</option>
                  </select>
                </div>

                {/* Direct State Override */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Direct State Override:</label>
                  <div className="grid grid-cols-4 gap-1">
                    {(['idle', 'loading', 'success', 'error'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setButtonStatus(st)}
                        className={`px-1.5 py-2 rounded-lg text-xs font-mono uppercase font-bold cursor-pointer transition-all ${
                          buttonStatus === st
                            ? st === 'loading'
                              ? 'bg-amber-500 text-white'
                              : st === 'success'
                              ? 'bg-emerald-500 text-white'
                              : st === 'error'
                              ? 'bg-rose-500 text-white'
                              : 'bg-sky-500 text-white'
                            : 'bg-slate-900 text-slate-500 border border-slate-800'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* THE LIVE BUTTON STAGE */}
              <div className="py-8 px-4 bg-[#080d16] rounded-2xl border border-white/[0.08] flex flex-col items-center justify-center space-y-5">
                {/* REAL LIVE VEILKIT LOADING BUTTON */}
                <LoadingButton
                  key={`${buttonStyle}-${resultAnim}-${pressFeedback}`}
                  styleType={buttonStyle as any}
                  status={buttonStatus}
                  resultAnimation={resultAnim}
                  pressFeedback={pressFeedback}
                  loadingText="Processing..."
                  successText="✓ Transaction Confirmed!"
                  errorText="✕ Request Failed"
                  resetAfter={2500}
                  onStatusChange={(s) => setButtonStatus(s)}
                  onClick={async () => {
                    await new Promise((res) => setTimeout(res, 1800));
                  }}
                  className="px-8 py-3.5 rounded-xl font-bold text-sm bg-sky-500 hover:bg-sky-400 text-white shadow-xl shadow-sky-500/25 cursor-pointer min-w-[240px]"
                >
                  Confirm Order ({buttonStyle})
                </LoadingButton>

                {/* Simulation Action Triggers */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => triggerSimulation('success')}
                    disabled={buttonStatus !== 'idle'}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-500/20 border border-slate-700 hover:border-emerald-500/40 text-emerald-400 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                  >
                    ✓ Simulate Success Flow (1.6s)
                  </button>
                  <button
                    onClick={() => triggerSimulation('error')}
                    disabled={buttonStatus !== 'idle'}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/40 text-rose-400 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                  >
                    ✕ Simulate Error Flow (1.6s)
                  </button>
                  <button
                    onClick={() => setButtonStatus('idle')}
                    className="px-3 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs border border-slate-800 cursor-pointer"
                  >
                    Reset Idle
                  </button>
                </div>
              </div>

              {/* Status readout */}
              <div className="text-xs font-mono text-slate-400 text-center">
                Current state: <span className="text-sky-400 font-bold">{buttonStatus}</span> • styleType: <span className="text-cyan-400 font-bold">{buttonStyle}</span> • resultAnimation: <span className="text-purple-400">{resultAnim}</span>
              </div>

              {/* ALL 16 BUTTON STYLES INTERACTIVE SHOWCASE GRID */}
              <div className="pt-6 border-t border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">All 16 Button Styles Interactive Matrix</h4>
                    <p className="text-xs text-slate-400">Click any individual button to test its self-contained promise lifecycle.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {buttonStyles.map((st) => (
                    <LoadingButton
                      key={`grid-${st}-${resultAnim}-${pressFeedback}`}
                      styleType={st as any}
                      resultAnimation={resultAnim}
                      pressFeedback={pressFeedback}
                      loadingText="Loading..."
                      successText="✓ Success!"
                      errorText="✕ Error"
                      resetAfter={2000}
                      onClick={async () => {
                        await new Promise((res) => setTimeout(res, 1500));
                      }}
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-sky-500/50 text-slate-200 transition-all cursor-pointer flex items-center justify-center min-h-[42px]"
                    >
                      {st}
                    </LoadingButton>
                  ))}
                </div>
              </div>
            </div>

            {/* Framework Code Box */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] overflow-hidden shadow-xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#05080e] border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  {(['react', 'vue', 'svelte', 'html'] as const).map((fw) => (
                    <button
                      key={fw}
                      onClick={() => setButtonCodeFw(fw)}
                      className={`px-2.5 py-1 rounded text-xs font-mono uppercase transition-all ${
                        buttonCodeFw === fw ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {fw}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => copySnippet(getButtonCode())}
                  className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/30 transition-colors cursor-pointer"
                >
                  {copied ? '✓ Copied' : 'Copy Code'}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto">
                <code>{getButtonCode()}</code>
              </pre>
            </div>
          </div>
        )}

        {/* ================= TAB 4: CUSTOM BUILDER ================= */}
        {activeTab === 'builder' && (
          <div className="bg-[#0c121e]/80 rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl backdrop-blur-md">
            <CustomSkeletonBuilder />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
