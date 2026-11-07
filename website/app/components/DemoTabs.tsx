'use client';

import { useState } from 'react';
import Image from 'next/image';

export function DemoTabs() {
  const [tab, setTab] = useState<'hero' | 'presets' | 'spinners' | 'button'>('hero');

  const demoItems = [
    {
      id: 'hero',
      title: 'Hero Shimmer & Reveal',
      src: '/assets/demo-hero.gif',
      desc: 'Synchronized 60 FPS skeleton shimmer with smooth anti-flicker reveal into content.',
    },
    {
      id: 'presets',
      title: '45+ Ready Presets',
      src: '/assets/demo-presets.gif',
      desc: 'Responsive layout templates across cards, feeds, dashboards, chat, checkouts, and trees.',
    },
    {
      id: 'spinners',
      title: '30 GPU Spinners',
      src: '/assets/demo-spinners.gif',
      desc: 'CSS & SVG high-speed indicators with frosted glass variants and speed multiplier.',
    },
    {
      id: 'button',
      title: '16 Loading Button Styles',
      src: '/assets/demo-button.gif',
      desc: 'Zero layout shift state machine: idle → loading → success | error → idle with haptics.',
    },
  ] as const;

  const current = demoItems.find((d) => d.id === tab)!;

  return (
    <section className="py-20 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Live Visual Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            See Veilkit in Action
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Inspect the smoothness of pure GPU motion. Zero layout thrashing, zero battery drain.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {demoItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                tab === item.id
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Display Container */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.1] bg-[#0c121e]/90 shadow-2xl p-4 sm:p-6 backdrop-blur-xl">
          <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#05080e] flex items-center justify-center">
            {/* Standard img tag to allow gif loop without next/image caching freeze */}
            <img
              src={current.src}
              alt={current.title}
              className="w-full h-auto object-contain max-h-[460px] rounded-lg"
            />
          </div>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <p className="font-medium text-slate-300">{current.desc}</p>
            <span className="text-sky-400 font-mono text-[11px] whitespace-nowrap">
              60 FPS Compositor Animation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
