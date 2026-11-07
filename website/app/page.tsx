import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DemoTabs } from './components/DemoTabs';
import { CustomSkeletonBuilder } from './components/CustomSkeletonBuilder';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { FrameworkShowcase } from './components/FrameworkShowcase';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import Link from 'next/link';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Veilkit',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web, Node.js, iOS, Android, Electron',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Universal, zero-dependency loading & skeleton UI toolkit with 45+ presets, 30 spinners, 30 GPU animations, and 16 button styles for React, Next.js, Vue, Svelte, Angular, and React Native.',
    author: {
      '@type': 'Person',
      name: 'Md Tanvir Ahamed Shanto',
      url: 'https://github.com/iamtashanto',
    },
    downloadUrl: 'https://www.npmjs.com/package/veilkit',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-1">
        <HeroSection />

        <DemoTabs />

        {/* Feature Grid */}
        <section className="py-20 border-t border-white/[0.08] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                Engineered for Modern Web
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Everything You Need for Loading States
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Built from the ground up to solve layout thrashing, phase desynchronization, and micro-flicker.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 hover:border-sky-500/40 transition-all space-y-3 group">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold group-hover:scale-110 transition-transform">
                  ⚡️
                </div>
                <h3 className="text-lg font-bold text-white">Pure GPU Compositor Motion</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Animations strictly manipulate hardware-accelerated <code className="text-sky-300">transform</code> and <code className="text-sky-300">opacity</code>. Zero layout recalculations, zero paint thrash, and 60 FPS buttery smoothness.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 hover:border-cyan-500/40 transition-all space-y-3 group">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold group-hover:scale-110 transition-transform">
                  ⏱️
                </div>
                <h3 className="text-lg font-bold text-white">Synchronized Global Clock</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Every shimmer on the page synchronizes to a shared timeline phase using negative animation-delay offsets. No matter when elements mount, all light sweeps move in perfect unison.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 hover:border-indigo-500/40 transition-all space-y-3 group">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold group-hover:scale-110 transition-transform">
                  🛡️
                </div>
                <h3 className="text-lg font-bold text-white">Anti-Flicker Timing Controller</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Fast API calls under 150ms never trigger skeletons, eliminating annoying visual micro-flashes. When loaders do appear, they stay visible for at least 300ms for a serene transition.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 hover:border-purple-500/40 transition-all space-y-3 group">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold group-hover:scale-110 transition-transform">
                  🎨
                </div>
                <h3 className="text-lg font-bold text-white">45+ Canonical Presets & 5 Shapes</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Instant responsive layouts for e-commerce, cards, feeds, dashboards, code blocks, chat, checkouts, and trees with <code className="text-purple-300">rounded</code>, <code className="text-purple-300">pill</code>, <code className="text-purple-300">glass</code>, <code className="text-purple-300">square</code>, and <code className="text-purple-300">sharp</code> borders.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 hover:border-emerald-500/40 transition-all space-y-3 group">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold group-hover:scale-110 transition-transform">
                  🔘
                </div>
                <h3 className="text-lg font-bold text-white">Loading Button State Machine</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Zero layout-shift button with 16 animation styles (<code className="text-emerald-300">morph-circle</code>, <code className="text-emerald-300">stripes</code>, <code className="text-emerald-300">border-trace</code>), promise tracking, animated checkmark draws, and mobile haptics.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 hover:border-rose-500/40 transition-all space-y-3 group">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 font-bold group-hover:scale-110 transition-transform">
                  📦
                </div>
                <h3 className="text-lg font-bold text-white">Zero Runtime Dependencies</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Pure TypeScript runtime engine. Sub-6 kB core gzip footprint. Framework packages are optional peer dependencies. Compatible with tree-shaking and strict Content Security Policies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Skeleton Builder Section */}
        <CustomSkeletonBuilder />

        {/* Framework Parity Code Showcase */}
        <FrameworkShowcase />

        {/* Comparison Matrix */}
        <ComparisonMatrix />

        {/* FAQ Section */}
        <FaqSection />

        {/* Final CTA Banner */}
        <section className="py-20 border-t border-white/[0.08] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-600/10 via-indigo-600/10 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              Ready to elevate your loading experience?
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
              Get started with Veilkit in less than two minutes. Zero dependencies, instant setup, every platform.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/playground"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 transition-transform hover:scale-105"
              >
                Launch Playground
              </Link>
              <Link
                href="/docs"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
              >
                Read the Docs
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
