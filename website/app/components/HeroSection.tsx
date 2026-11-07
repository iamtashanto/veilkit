'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SkeletonPreset } from 'veilkit/react';

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');
  const [copied, setCopied] = useState(false);
  const [isSkeleton, setIsSkeleton] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateFetch = () => {
    setIsSimulating(true);
    setIsSkeleton(true);
    setTimeout(() => {
      setIsSkeleton(false);
      setIsSimulating(false);
    }, 850);
  };

  const installCmds = {
    npm: 'npm install veilkit',
    pnpm: 'pnpm add veilkit',
    yarn: 'yarn add veilkit',
    bun: 'bun add veilkit',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmds[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background ambient glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-sky-600/15 via-indigo-600/15 to-cyan-500/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 left-10 w-72 h-72 bg-sky-500/10 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Release Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-lg shadow-sky-500/10 text-xs text-slate-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="font-semibold text-white">Veilkit v0.3.0</span>
            <span className="text-slate-500">•</span>
            <span>45+ Presets, 30 Spinners, 16 Button Styles, Zero Dependencies</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Every loading state,{' '}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              beautifully.
            </span>
            <br />
            <span className="text-3xl sm:text-5xl lg:text-6xl text-slate-400 font-semibold">
              One package, every framework.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Production-grade, zero-dependency loading UI toolkit. Pure 60 FPS GPU motion, synchronized
            timeline clocks, anti-flicker timing, auto-measure DOM wrapping, and frosted glass themes.
          </p>

          {/* Package Manager Install Bar */}
          <div className="max-w-md mx-auto pt-2">
            <div className="flex items-center justify-between bg-slate-950/80 border border-slate-800 rounded-xl p-1.5 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-1">
                {(['npm', 'pnpm', 'yarn', 'bun'] as const).map((pm) => (
                  <button
                    key={pm}
                    onClick={() => setActiveTab(pm)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                      activeTab === pm
                        ? 'bg-slate-800 text-sky-400 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 text-xs font-mono font-medium transition-colors cursor-pointer border border-sky-500/20"
              >
                <span>{installCmds[activeTab]}</span>
                <span className="text-slate-300 text-[11px] font-sans">
                  {copied ? '✓' : 'Copy'}
                </span>
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              href="/playground"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-sky-500/25 transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              <span>Launch Live Playground</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/docs"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all hover:border-slate-600"
            >
              Explore Documentation
            </Link>
            <Link
              href="/presets"
              className="px-5 py-3 rounded-xl bg-slate-950/70 hover:bg-slate-900 text-slate-300 font-medium text-sm border border-slate-800 transition-colors"
            >
              View 45+ Presets
            </Link>
            <a
              href="https://www.supportkori.com/iamtashanto"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-sm font-semibold flex items-center gap-1.5 transition-all hover:scale-[1.02]"
              title="Support Creator on SupportKori"
            >
              <span>☕ Support Creator</span>
            </a>
          </div>
        </div>

        {/* Live Interactive Hero Demo Container */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/[0.1] bg-[#0c121e]/90 shadow-2xl backdrop-blur-xl overflow-hidden">
            {/* macOS window chrome */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#080d16] border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-3 text-xs font-mono text-slate-400">veilkit.tashanto.com</span>
              </div>

              {/* State Toggle Switch */}
              <div className="flex items-center gap-3">
                <button
                  onClick={simulateFetch}
                  disabled={isSimulating}
                  className="hidden sm:flex px-3 py-1 rounded-lg text-xs font-semibold bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition-all items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  title="Run simulated async network request"
                >
                  <span className={`w-1.5 h-1.5 rounded-full bg-cyan-400 ${isSimulating ? 'animate-ping' : ''}`} />
                  <span>{isSimulating ? 'Fetching (850ms)...' : '⚡️ Simulate Load'}</span>
                </button>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  60.0 FPS GPU
                </span>
                <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-700/80 text-xs">
                  <button
                    onClick={() => setIsSkeleton(true)}
                    className={`px-3 py-1 rounded-md font-medium transition-all ${
                      isSkeleton ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Skeleton View
                  </button>
                  <button
                    onClick={() => setIsSkeleton(false)}
                    className={`px-3 py-1 rounded-md font-medium transition-all ${
                      !isSkeleton ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Content View
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Preview Canvas */}
            <div className="p-6 sm:p-8 transition-all duration-300">
              {isSkeleton ? (
                /* Skeleton State */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn items-start">
                  {/* Left Skeleton: Real Veilkit Preset */}
                  <div className="p-4 rounded-2xl border border-white/[0.08] bg-slate-900/60 shadow-inner">
                    <SkeletonPreset name="product-card" shape="rounded" animation="shimmer" />
                  </div>

                  {/* Right Skeleton: Real Veilkit Preset */}
                  <div className="p-4 rounded-2xl border border-white/[0.08] bg-slate-900/60 shadow-inner">
                    <SkeletonPreset name="chart-bar" shape="rounded" animation="shimmer" />
                  </div>
                </div>
              ) : (
                /* Revealed Content State */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                  {/* Left Content Card */}
                  <div className="p-5 rounded-xl border border-white/[0.1] bg-slate-900/90 space-y-4">
                    <div className="w-full h-44 rounded-lg bg-gradient-to-tr from-sky-950 via-slate-900 to-indigo-950 border border-sky-500/20 flex flex-col items-center justify-center relative overflow-hidden">
                      <div className="w-20 h-20 rounded-full border-2 border-sky-400/40 flex items-center justify-center text-3xl">
                        🎧
                      </div>
                      <span className="text-xs font-mono text-sky-400 mt-2 font-medium">STUDIO AUDIO PRO</span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                        PREMIUM
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white">Veil Acoustic Pro Wireless</h3>
                      <p className="text-xs text-slate-400">Spatial Audio • Active Noise Cancelling • 40h Battery</p>
                    </div>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xl font-extrabold text-white">$349.00</span>
                      <button className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-md shadow-sky-500/20 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Right Content Stats */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-white/[0.1] bg-slate-900/90 space-y-1">
                        <span className="text-xs text-slate-400 uppercase font-mono">ACTIVE USERS</span>
                        <div className="text-2xl font-bold text-white">128,420</div>
                        <span className="text-xs text-emerald-400 font-medium">↑ +18.4% this mo</span>
                      </div>
                      <div className="p-4 rounded-xl border border-white/[0.1] bg-slate-900/90 space-y-1">
                        <span className="text-xs text-slate-400 uppercase font-mono">FRAME RATE</span>
                        <div className="text-2xl font-bold text-sky-400">60.0 FPS</div>
                        <span className="text-xs text-emerald-400 font-medium">0 Layout Thrash</span>
                      </div>
                    </div>
                    {/* Live Chart Block */}
                    <div className="p-4 rounded-xl border border-white/[0.1] bg-slate-900/90 h-44 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span className="font-semibold">Performance Latency</span>
                        <span className="text-sky-400 font-mono">0.12ms render</span>
                      </div>
                      <div className="flex items-end gap-3 h-28 pt-2">
                        {[40, 65, 50, 85, 70, 95, 60, 80].map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className="flex-1 rounded-t bg-gradient-to-t from-sky-600 to-cyan-400 hover:brightness-125 transition-all"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Ribbon */}
            <div className="px-6 py-3 bg-[#080d16] border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="text-sky-400">✦</span>
                <span>All shimmers across page remain synchronized via global timeline clock</span>
              </span>
              <button
                onClick={() => setIsSkeleton(!isSkeleton)}
                className="text-sky-400 hover:text-white font-medium hover:underline cursor-pointer"
              >
                Click to switch state ↻
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
