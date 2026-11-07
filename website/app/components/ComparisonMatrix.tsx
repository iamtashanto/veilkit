'use client';

export function ComparisonMatrix() {
  const comparisonData = [
    {
      feature: 'Zero Runtime Dependencies',
      veilkit: true,
      rls: false,
      rcl: false,
      nprogress: true,
      shadcn: false,
      mantine: false,
      note: 'All framework adapters are strictly optional peer dependencies',
    },
    {
      feature: 'Universal Multi-Framework Parity',
      veilkit: 'React, Vue, Svelte, Angular, Native, Elements, CDN',
      rls: 'React only',
      rcl: 'React & React Native',
      nprogress: 'Vanilla only',
      shadcn: 'React only',
      mantine: 'React only',
      highlight: true,
    },
    {
      feature: 'Pure GPU Compositor Motion',
      veilkit: 'Yes (transform & opacity only)',
      rls: 'No (animates background-position)',
      rcl: 'No (SVG clipPath repaint)',
      nprogress: 'No (CSS width transitions)',
      shadcn: 'No (CSS animation)',
      mantine: 'No (background-position)',
      highlight: true,
    },
    {
      feature: 'Synchronized Global Timeline Clocks',
      veilkit: 'Built-in (Zero Phase Jitter)',
      rls: 'No (elements desync)',
      rcl: 'No (independent phases)',
      nprogress: 'N/A',
      shadcn: 'No',
      mantine: 'No',
      highlight: true,
    },
    {
      feature: 'Anti-Flicker Timing Controller',
      veilkit: 'Built-in (delay & minVisible)',
      rls: 'Manual user logic',
      rcl: 'Manual user logic',
      nprogress: 'No',
      shadcn: 'No',
      mantine: 'No',
    },
    {
      feature: 'DOM Auto-Measure Engine',
      veilkit: 'Built-in (<Veil loading>, v-veil)',
      rls: 'No',
      rcl: 'No',
      nprogress: 'N/A',
      shadcn: 'No',
      mantine: 'No',
    },
    {
      feature: 'Ready-Made Responsive Presets',
      veilkit: '45+ Presets (5 shape styles)',
      rls: '0 (Primitives only)',
      rcl: 'Community SVGs',
      nprogress: '0',
      shadcn: '0',
      mantine: '0',
      highlight: true,
    },
    {
      feature: 'GPU Spinner Loaders',
      veilkit: '30 Spinners (Glass & Speed)',
      rls: '0',
      rcl: '0',
      nprogress: '1 basic spinner',
      shadcn: '0',
      mantine: '1 loader',
    },
    {
      feature: 'Loading Button State Machine',
      veilkit: '16 Styles (Promises & Haptics)',
      rls: 'None',
      rcl: 'None',
      nprogress: 'None',
      shadcn: 'Button + manual spinner',
      mantine: 'Button + loading prop',
      highlight: true,
    },
    {
      feature: 'Built-in Design Themes',
      veilkit: '11 Themes (Glass, iOS, Neon) + createTheme',
      rls: 'Light / Dark only',
      rcl: 'Custom SVG colors',
      nprogress: '1 theme color',
      shadcn: 'Tailwind muted',
      mantine: 'Mantine theme',
    },
    {
      feature: 'Route Progress Loader',
      veilkit: 'Built-in (Top trickle bar)',
      rls: 'None',
      rcl: 'None',
      nprogress: 'Yes',
      shadcn: 'None',
      mantine: 'Mantine NProgress addon',
    },
    {
      feature: 'Static CLI Pre-rendering',
      veilkit: 'npx veilkit capture (Zero-runtime)',
      rls: 'No',
      rcl: 'No',
      nprogress: 'No',
      shadcn: 'No',
      mantine: 'No',
    },
  ];

  return (
    <section className="py-20 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Unrivaled Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            How Veilkit compares to the alternatives
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Compare Veilkit against traditional loading libraries. Built from the ground up for modern
            cross-framework applications without compromises.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#0c121e]/90 shadow-2xl backdrop-blur-xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#080d16]/90">
                <th className="py-4 px-4 sm:px-6 font-semibold text-slate-300 w-1/3">Core Feature</th>
                <th className="py-4 px-3 font-bold text-sky-400 bg-sky-500/10 border-x border-sky-500/20">
                  ✦ veilkit
                </th>
                <th className="py-4 px-3 font-medium text-slate-400">react-loading-skeleton</th>
                <th className="py-4 px-3 font-medium text-slate-400">react-content-loader</th>
                <th className="py-4 px-3 font-medium text-slate-400">nprogress</th>
                <th className="py-4 px-3 font-medium text-slate-400">shadcn/ui</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-slate-300">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className={`hover:bg-white/[0.02] transition-colors ${row.highlight ? 'bg-sky-500/[0.02]' : ''}`}>
                  <td className="py-4 px-4 sm:px-6 font-medium text-slate-200">
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">{row.feature}</span>
                      {row.note && <span className="text-[11px] text-slate-400">{row.note}</span>}
                    </div>
                  </td>
                  <td className="py-4 px-3 font-semibold text-sky-400 bg-sky-500/5 border-x border-sky-500/20">
                    {typeof row.veilkit === 'boolean' ? (
                      row.veilkit ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                          ✓ Yes
                        </span>
                      ) : (
                        '—'
                      )
                    ) : (
                      <span className="font-bold text-sky-300">{row.veilkit}</span>
                    )}
                  </td>
                  <td className="py-4 px-3 text-slate-400">
                    {typeof row.rls === 'boolean' ? (row.rls ? '✓ Yes' : '✕ No') : row.rls}
                  </td>
                  <td className="py-4 px-3 text-slate-400">
                    {typeof row.rcl === 'boolean' ? (row.rcl ? '✓ Yes' : '✕ No') : row.rcl}
                  </td>
                  <td className="py-4 px-3 text-slate-400">
                    {typeof row.nprogress === 'boolean' ? (row.nprogress ? '✓ Yes' : '✕ No') : row.nprogress}
                  </td>
                  <td className="py-4 px-3 text-slate-400">
                    {typeof row.shadcn === 'boolean' ? (row.shadcn ? '✓ Yes' : '✕ No') : row.shadcn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
