'use client';

import { useState } from 'react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why should I choose Veilkit over react-loading-skeleton or react-content-loader?',
      a: 'Most skeleton libraries animate background-position or CSS width, which triggers continuous layout recalculations (layout thrashing) and drains device battery. Furthermore, when skeletons mount at different times, their shimmers animate out of sync, creating visual jitter. Veilkit solves both: animations strictly use transform and opacity on the GPU compositor thread, and all elements share a single global clock phase so all shimmers stay in perfect harmony across the entire page. Plus, Veilkit has zero runtime dependencies and supports React, Vue, Svelte, Angular, Native, and Web Components.',
    },
    {
      q: 'How does Veilkit eliminate layout thrashing and maintain 60 FPS?',
      a: 'Veilkit never animates layout-triggering properties like width, height, margin, or background-position. Shimmers are rendered as pseudo-elements translated exclusively via hardware-accelerated transform: translate3d(...) and opacity. Additionally, Veilkit uses IntersectionObserver and the Page Visibility API to automatically pause animations when elements are offscreen or when the browser tab is hidden.',
    },
    {
      q: 'What is the Anti-Flicker Timing Controller and how does it prevent jarring flashes?',
      a: 'When an API response returns extremely quickly (e.g., under 150ms), showing a skeleton for a fraction of a second causes an annoying visual flash. Veilkit features built-in anti-flicker timing: `delay` (default 150ms) suppresses the skeleton if data loads quickly, while `minVisible` (default 300ms) guarantees that once a loader is shown, it stays visible long enough for a calm, professional transition.',
    },
    {
      q: 'How can I create a custom skeleton matching my website’s exact layout?',
      a: 'Veilkit offers 3 effortless ways to create custom skeletons: 1) The interactive Custom Builder right on this website, which generates production code; 2) The declarative `createCustomSkeleton({ nodes: [...] })` and fluent `SkeletonBuilder` API; 3) The DOM Auto-Measure engine (`<Veil loading>` or `v-veil="loading"`) which automatically measures your real component leaf elements and renders placeholders with zero hydration divergence.',
    },
    {
      q: 'Does Veilkit support React 19, Next.js 16 App Router, and Server Components (RSC)?',
      a: 'Yes! Veilkit provides separate client-component entries (`"use client"`) and SSR-safe exports. It never accesses `window` or `document` during module evaluation. CSS styles are injected only when mounted on the client or can be imported statically via `veilkit/styles.css` with strict CSP nonce support.',
    },
    {
      q: 'Can I use Veilkit in React Native and Expo applications?',
      a: 'Absolutely. The `veilkit/native` subpath provides native components (Skeleton, SkeletonGroup, LoadingButton, Spinner) that automatically leverage `expo-linear-gradient` or `react-native-linear-gradient` when installed, and gracefully falls back to native animated opacity pulses if gradient libraries are absent. It also supports `expo-haptics` for tactile button feedback.',
    },
  ];

  return (
    <section className="py-20 border-t border-white/[0.08] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Everything You Need to Know
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Quick answers to common questions about performance, architecture, and framework integration.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 overflow-hidden backdrop-blur-md transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-sky-400 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-slate-400 text-lg ml-4">
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.04] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
