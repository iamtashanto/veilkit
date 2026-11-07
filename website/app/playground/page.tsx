'use client';

import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomSkeletonBuilder } from '../components/CustomSkeletonBuilder';

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<'preset' | 'spinner' | 'button' | 'builder'>('preset');
  const [selectedPreset, setSelectedPreset] = useState('product-card');
  const [selectedShape, setSelectedShape] = useState<'rounded' | 'pill' | 'square' | 'sharp' | 'glass'>('rounded');
  const [selectedAnim, setSelectedAnim] = useState('shimmer');
  const [selectedTheme, setSelectedTheme] = useState('auto');
  const [selectedSpinner, setSelectedSpinner] = useState('arc-gradient');
  const [buttonStatus, setButtonStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [buttonStyle, setButtonStyle] = useState('morph-circle');
  const [copied, setCopied] = useState(false);

  const presets = [
    'card', 'product-card', 'product-grid', 'list', 'list-item', 'table', 'profile',
    'profile-header', 'feed-post', 'article', 'comment-thread', 'chat', 'dashboard',
    'form', 'media-card', 'navbar', 'sidebar', 'settings-page', 'product-detail',
    'news-feed', 'inbox-list', 'notification-list', 'order-list', 'kpi-card',
    'chart-bar', 'chart-line', 'chart-pie', 'search-results', 'video-player',
    'music-player', 'stories-row', 'reels', 'tabs', 'calendar', 'kanban',
    'timeline', 'map-card', 'pricing-card', 'testimonial', 'faq-accordion',
    'file-explorer', 'code-block', 'e-commerce-checkout', 'social-story', 'hero-banner'
  ];

  const spinners = [
    'ring', 'dual-ring', 'dots', 'bars', 'pulse', 'orbit', 'wave', 'bounce',
    'ios-activity', 'glass-orb', 'morph', 'progress-circle', 'arc-gradient',
    'pulse-ring', 'dots-circle', 'grid-dots', 'square-flip', 'cube-fold',
    'hourglass', 'infinity', 'heartbeat-line', 'equalizer', 'chasing-dots',
    'typing', 'liquid-fill', 'atom', 'clock', 'radar', 'ellipsis', 'flower'
  ];

  const buttonStyles = [
    'spinner-left', 'spinner-right', 'spinner-replace', 'dots-after-text',
    'progress-fill', 'shimmer-surface', 'pulse-glow', 'stripes-progress',
    'morph-circle', 'slide-text', 'border-trace', 'liquid-fill', 'bounce-dots',
    'glass-shine', 'neon-pulse', 'skeleton-button'
  ];

  const triggerButtonSimulation = () => {
    setButtonStatus('loading');
    setTimeout(() => {
      setButtonStatus('success');
      setTimeout(() => {
        setButtonStatus('idle');
      }, 2000);
    }, 1800);
  };

  const generatedCode = `<SkeletonPreset
  name="${selectedPreset}"
  shape="${selectedShape}"
  animation="${selectedAnim}"
  theme="${selectedTheme}"
/>`;

  const copySnippet = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
              activeTab === 'preset' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Presets (45)
          </button>
          <button
            onClick={() => setActiveTab('spinner')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'spinner' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Spinners (30)
          </button>
          <button
            onClick={() => setActiveTab('button')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'button' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Loading Buttons (16)
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'builder' ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            ✦ Custom Layout Builder
          </button>
        </div>

        {activeTab === 'builder' ? (
          <CustomSkeletonBuilder />
        ) : activeTab === 'preset' ? (
          /* Preset Playground */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-4 p-6 rounded-2xl border border-white/[0.08] bg-[#0c121e]/90 space-y-5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Preset Template</label>
                <select
                  value={selectedPreset}
                  onChange={(e) => setSelectedPreset(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
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
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize border transition-all ${
                        selectedShape === s
                          ? 'bg-sky-500 text-white border-sky-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Animation</label>
                <select
                  value={selectedAnim}
                  onChange={(e) => setSelectedAnim(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
                >
                  {['shimmer', 'wave', 'pulse', 'aurora', 'glass-shine', 'neon-glow', 'scan-line', 'ripple', 'cascade'].map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Theme Palette</label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
                >
                  {['auto', 'light', 'dark', 'glass', 'ios', 'material', 'neon', 'sunset', 'ocean', 'minimal'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Live Canvas Preview */}
            <div className="lg:col-span-8 space-y-6">
              <div className="p-8 rounded-2xl border border-white/[0.08] bg-[#0c121e]/90 min-h-[380px] flex flex-col justify-center">
                <div className="p-6 rounded-xl border border-white/[0.08] bg-slate-900/60 max-w-lg mx-auto w-full space-y-4">
                  <div className="w-full h-40 rounded-lg bg-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
                  </div>
                  <div className="w-3/5 h-6 rounded bg-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
                  </div>
                  <div className="w-4/5 h-4 rounded bg-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <div className="w-20 h-5 rounded bg-slate-800" />
                    <div className="w-24 h-8 rounded-lg bg-slate-800" />
                  </div>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#080d16] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#05080e] border-b border-white/[0.08]">
                  <span className="text-xs font-mono text-slate-400">React / Next.js Component</span>
                  <button
                    onClick={copySnippet}
                    className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/30 transition-colors"
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-300">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            </div>
          </div>
        ) : activeTab === 'spinner' ? (
          /* Spinners Playground */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {spinners.map((sp) => (
              <div
                key={sp}
                onClick={() => setSelectedSpinner(sp)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-3 text-center ${
                  selectedSpinner === sp
                    ? 'border-sky-400 bg-sky-500/10 shadow-lg shadow-sky-500/20'
                    : 'border-white/[0.08] bg-[#0c121e]/80 hover:border-slate-600'
                }`}
              >
                <div className="w-10 h-10 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
                <span className="text-xs font-mono text-slate-200">{sp}</span>
              </div>
            ))}
          </div>
        ) : (
          /* Loading Button Playground */
          <div className="max-w-2xl mx-auto p-8 rounded-2xl border border-white/[0.08] bg-[#0c121e]/90 space-y-6 text-center">
            <h3 className="text-xl font-bold text-white">Loading Button State Machine</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Click the button below to test the promise simulation (<code className="text-sky-300">idle → loading → success → idle</code>).
            </p>

            <div className="flex flex-wrap justify-center gap-2 max-h-36 overflow-y-auto p-2 bg-slate-900 rounded-xl border border-slate-800">
              {buttonStyles.map((style) => (
                <button
                  key={style}
                  onClick={() => setButtonStyle(style)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono ${
                    buttonStyle === style ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={triggerButtonSimulation}
                disabled={buttonStatus !== 'idle'}
                className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-xl cursor-pointer ${
                  buttonStatus === 'loading'
                    ? 'bg-sky-700 text-white'
                    : buttonStatus === 'success'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/25 hover:scale-105'
                }`}
              >
                {buttonStatus === 'loading' ? 'Saving changes...' : buttonStatus === 'success' ? '✓ Saved Successfully!' : 'Click to Simulate Promise'}
              </button>
            </div>

            <div className="text-xs font-mono text-slate-400 pt-2">
              Current state: <span className="text-sky-400 font-bold">{buttonStatus}</span> • style: <span className="text-cyan-400">{buttonStyle}</span>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
