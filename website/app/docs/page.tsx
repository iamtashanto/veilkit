import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata = {
  title: 'Veilkit Documentation — Quickstart, API Reference & Framework Guides',
  description:
    'Comprehensive documentation for Veilkit: zero-dependency loading & skeleton UI toolkit for React, Next.js, Vue, Svelte, Angular, React Native, and Web Components.',
};

export default function DocsPage() {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar Nav */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6 text-sm">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 mb-3">
                Getting Started
              </h4>
              <ul className="space-y-2 text-slate-400 font-medium">
                <li><a href="#installation" className="hover:text-white transition-colors">Installation</a></li>
                <li><a href="#quickstart" className="hover:text-white transition-colors">Quickstart</a></li>
                <li><a href="#architecture" className="hover:text-white transition-colors">GPU & Sync Clocks</a></li>
                <li><a href="#anti-flicker" className="hover:text-white transition-colors">Anti-Flicker Timing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3">
                Framework Guides
              </h4>
              <ul className="space-y-2 text-slate-400 font-medium">
                <li><a href="#react" className="hover:text-white transition-colors">React & Next.js</a></li>
                <li><a href="#vue" className="hover:text-white transition-colors">Vue 3 & Nuxt</a></li>
                <li><a href="#svelte" className="hover:text-white transition-colors">Svelte 5 & Kit</a></li>
                <li><a href="#angular" className="hover:text-white transition-colors">Angular 17-19</a></li>
                <li><a href="#native" className="hover:text-white transition-colors">React Native & Expo</a></li>
                <li><a href="#element" className="hover:text-white transition-colors">Web Components</a></li>
                <li><a href="#cdn" className="hover:text-white transition-colors">Vanilla CDN</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 mb-3">
                Catalogs & API
              </h4>
              <ul className="space-y-2 text-slate-400 font-medium">
                <li><a href="#presets" className="hover:text-white transition-colors">45+ Presets</a></li>
                <li><a href="#custom-builder" className="hover:text-white transition-colors">Custom Builder</a></li>
                <li><a href="#spinners" className="hover:text-white transition-colors">30 Spinners</a></li>
                <li><a href="#button" className="hover:text-white transition-colors">Loading Buttons</a></li>
                <li><a href="#theming" className="hover:text-white transition-colors">Theming & Glass</a></li>
                <li><a href="#cli" className="hover:text-white transition-colors">CLI Capture</a></li>
              </ul>
            </div>
          </aside>

          {/* Main Docs Content */}
          <article className="lg:col-span-9 space-y-12 text-slate-300">
            {/* Header */}
            <div className="space-y-4 border-b border-white/[0.08] pb-8">
              <span className="text-xs font-mono text-sky-400 uppercase font-semibold">Documentation</span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Veilkit Guide & Reference</h1>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                Learn how to implement high-performance, GPU-composited loading states, skeleton screens, and loading buttons across any framework with zero dependencies.
              </p>
            </div>

            {/* Installation */}
            <section id="installation" className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Installation</h2>
              <p className="text-sm text-slate-400">Install Veilkit with your preferred package manager. The core package is 0-dependency:</p>
              <div className="p-4 rounded-xl bg-[#080d16] border border-white/[0.08] font-mono text-xs sm:text-sm text-sky-400">
                npm install veilkit
              </div>
            </section>

            {/* Quickstart */}
            <section id="quickstart" className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Quickstart in React & Next.js</h2>
              <p className="text-sm text-slate-400">
                Import presets, primitives, spinners, or buttons directly from <code className="text-sky-300">veilkit/react</code>:
              </p>
              <pre className="p-5 rounded-xl bg-[#080d16] border border-white/[0.08] font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                <code>{`import { SkeletonPreset, LoadingButton } from 'veilkit/react';

export function ProductPage({ loading }) {
  if (loading) {
    return <SkeletonPreset name="product-card" shape="glass" animation="aurora" />;
  }

  return (
    <LoadingButton
      loadingStyle="morph-circle"
      loadingText="Adding..."
      onClick={async () => await addToCart()}
    >
      Add to Cart
    </LoadingButton>
  );
}`}</code>
              </pre>
            </section>

            {/* Architecture: GPU & Timeline */}
            <section id="architecture" className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Zero Layout Thrashing & Synced Clocks</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Traditional skeleton libraries animate properties like <code className="text-rose-400">background-position</code> or <code className="text-rose-400">width</code>, forcing the browser to perform constant reflows on every single frame. Veilkit moves motion strictly to the GPU compositor thread using <code className="text-emerald-400">transform</code> and <code className="text-emerald-400">opacity</code>.
              </p>
              <div className="p-5 rounded-xl border border-sky-500/20 bg-sky-500/5 space-y-2">
                <span className="text-xs font-bold font-mono text-sky-400">✦ Global Clock Phase Math:</span>
                <p className="text-xs text-slate-300 font-mono">
                  negativeDelay = -1 * (performance.now() % durationMs) + &apos;ms&apos;
                </p>
                <p className="text-xs text-slate-400">
                  This guarantees that every card or text shimmer on the page moves in synchronized rhythm, even if rendered dynamically seconds apart.
                </p>
              </div>
            </section>

            {/* Anti-Flicker */}
            <section id="anti-flicker" className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Anti-Flicker Controller</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Veilkit includes an anti-flicker state controller that avoids jarring flashes on fast network responses:
              </p>
              <pre className="p-5 rounded-xl bg-[#080d16] border border-white/[0.08] font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                <code>{`import { AntiFlickerController } from 'veilkit';

const controller = new AntiFlickerController({
  delay: 150,       // Suppress skeleton if request finishes under 150ms
  minVisible: 300,  // Keep loader visible for at least 300ms once rendered
  onShow: () => setVisible(true),
  onHide: () => setVisible(false),
});`}</code>
              </pre>
            </section>

            {/* Custom Builder */}
            <section id="custom-builder" className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Custom Skeleton Builder</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Create custom skeletons matching your website’s exact layout with the fluent <code className="text-sky-300">SkeletonBuilder</code> API:
              </p>
              <pre className="p-5 rounded-xl bg-[#080d16] border border-white/[0.08] font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                <code>{`import { SkeletonBuilder } from 'veilkit';

const myCustomSkeleton = new SkeletonBuilder({ animation: 'shimmer', shape: 'rounded' })
  .card((card) => {
    card.row((row) => {
      row.avatar(48);
      row.col((col) => {
        col.heading('60%');
        col.lines(2);
      });
    });
    card.rect('100%', 150);
    card.button(120, 38);
  })
  .build();`}</code>
              </pre>
            </section>

            {/* Frameworks List */}
            <section id="frameworks" className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Subpath Framework Exports</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c121e]">
                  <h4 className="text-sm font-bold text-sky-400 font-mono">veilkit/react</h4>
                  <p className="text-xs text-slate-400 mt-1">Client & Server Components, Suspense support, hooks.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c121e]">
                  <h4 className="text-sm font-bold text-emerald-400 font-mono">veilkit/vue</h4>
                  <p className="text-xs text-slate-400 mt-1">Vue 3 & Nuxt 3 composables, directive <code className="text-emerald-300">v-veil</code>.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c121e]">
                  <h4 className="text-sm font-bold text-amber-400 font-mono">veilkit/svelte</h4>
                  <p className="text-xs text-slate-400 mt-1">Svelte 5 runes and action <code className="text-amber-300">use:veil</code>.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c121e]">
                  <h4 className="text-sm font-bold text-rose-400 font-mono">veilkit/angular</h4>
                  <p className="text-xs text-slate-400 mt-1">Angular 17-19 standalone components and VeilService.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c121e]">
                  <h4 className="text-sm font-bold text-purple-400 font-mono">veilkit/element</h4>
                  <p className="text-xs text-slate-400 mt-1">Web Components for Solid, Qwik, HTMX, and static HTML.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c121e]">
                  <h4 className="text-sm font-bold text-cyan-400 font-mono">veilkit/native</h4>
                  <p className="text-xs text-slate-400 mt-1">React Native & Expo with expo-linear-gradient & haptics.</p>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>

      <Footer />
    </>
  );
}
