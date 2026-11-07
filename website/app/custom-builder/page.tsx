'use client';

import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomSkeletonBuilder } from '../components/CustomSkeletonBuilder';
import Link from 'next/link';

export default function CustomBuilderPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Visual Studio
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Custom Skeleton Layout Builder
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Build pixel-perfect loading wireframes tailored precisely to your own website layout. Pick components, customize shapes, and copy clean code for React, Vue, Svelte, Angular, Web Components, and HTML.
          </p>
        </div>

        {/* Builder Studio Component */}
        <div className="bg-[#0c121e]/80 rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl backdrop-blur-md">
          <CustomSkeletonBuilder />
        </div>

        {/* Explanatory Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-[#0c121e]/60 p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold">
              1
            </div>
            <h3 className="text-base font-bold text-white">Fluent Builder API</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prefer code over UI? Veilkit ships with a fluent <code className="text-slate-300">SkeletonBuilder</code> API:
              <br />
              <code className="text-sky-300 font-mono text-[11px] block mt-1.5">
                SkeletonBuilder.row().avatar().col().heading().lines(2).build()
              </code>
            </p>
          </div>

          <div className="bg-[#0c121e]/60 p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              2
            </div>
            <h3 className="text-base font-bold text-white">Declarative JSON Config</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Store skeleton layouts in clean JSON configs. Load them dynamically or share them across micro-frontends and mobile apps without rewriting layout logic.
            </p>
          </div>

          <div className="bg-[#0c121e]/60 p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
              3
            </div>
            <h3 className="text-base font-bold text-white">Shape & Theme Adaptive</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Any custom layout automatically adapts to your current shape tokens (<code className="text-slate-300">rounded</code>, <code className="text-slate-300">pill</code>, <code className="text-slate-300">square</code>, <code className="text-slate-300">glass</code>) and all 11 themes.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link href="/presets" className="text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors">
            ← Or explore all 45+ ready-made presets in the Presets Gallery
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
