import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#05070b] py-14 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0c1322] border border-white/10 p-1 flex items-center justify-center shadow-md shadow-sky-500/10">
              <img src="/icon.svg" alt="Veilkit Icon" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">veilkit</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              MIT License
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            Every loading state, beautifully. Zero runtime dependencies. Pure GPU compositor motion, synchronized
            timeline clocks, and multi-framework parity.
          </p>
          <div className="pt-2 text-xs text-slate-500 space-y-1">
            <p>
              Maintained by{' '}
              <a
                href="https://github.com/iamtashanto"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-sky-400 transition-colors font-medium"
              >
                Md Tanvir Ahamed Shanto (@iamtashanto)
              </a>
            </p>
            <p>
              Support creator:{' '}
              <a
                href="https://www.supportkori.com/iamtashanto"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                ☕ supportkori.com/iamtashanto
              </a>
            </p>
            <p>
              npm package:{' '}
              <a
                href="https://www.npmjs.com/package/veilkit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:underline font-mono"
              >
                veilkit@0.3.0
              </a>
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase mb-4">Frameworks</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/docs#react" className="hover:text-white transition-colors">React & Next.js</Link></li>
            <li><Link href="/docs#vue" className="hover:text-white transition-colors">Vue 3 & Nuxt</Link></li>
            <li><Link href="/docs#svelte" className="hover:text-white transition-colors">Svelte 5 & SvelteKit</Link></li>
            <li><Link href="/docs#angular" className="hover:text-white transition-colors">Angular 17-19</Link></li>
            <li><Link href="/docs#native" className="hover:text-white transition-colors">React Native & Expo</Link></li>
            <li><Link href="/docs#element" className="hover:text-white transition-colors">Web Components</Link></li>
            <li><Link href="/docs#cdn" className="hover:text-white transition-colors">Vanilla CDN</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase mb-4">Features</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/presets" className="hover:text-white transition-colors">45+ Ready Presets</Link></li>
            <li><Link href="/spinners" className="hover:text-white transition-colors">30 GPU Spinners</Link></li>
            <li><Link href="/custom-builder" className="hover:text-white transition-colors">Custom Skeleton Builder</Link></li>
            <li><Link href="/docs#button" className="hover:text-white transition-colors">16 Button Styles</Link></li>
            <li><Link href="/docs#timing" className="hover:text-white transition-colors">Anti-Flicker Controller</Link></li>
            <li><Link href="/comparison" className="hover:text-white transition-colors">Feature Comparison</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase mb-4">Ecosystem</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="https://www.supportkori.com/iamtashanto" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium"><span>☕ Support on SupportKori</span></a></li>
            <li><a href="https://github.com/iamtashanto/veilkit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
            <li><a href="https://www.npmjs.com/package/veilkit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">npm Package</a></li>
            <li><a href="https://bundlephobia.com/package/veilkit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Bundlephobia (<span className="text-emerald-400 font-mono">18kB</span>)</a></li>
            <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
            <li><a href="https://veilkit.tashanto.com/sitemap.xml" className="hover:text-white transition-colors">Sitemap XML</a></li>
            <li><a href="https://veilkit.tashanto.com/llms.txt" className="hover:text-white transition-colors">llms.txt (AI Index)</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 Veilkit by Md Tanvir Ahamed Shanto. Distributed under MIT License.</p>
        <p className="flex items-center gap-2">
          <span>Zero layout thrashing</span>
          <span>•</span>
          <span>60 FPS GPU Motion</span>
          <span>•</span>
          <span>100% TypeScript</span>
        </p>
      </div>
    </footer>
  );
}
