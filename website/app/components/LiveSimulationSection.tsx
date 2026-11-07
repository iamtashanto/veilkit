'use client';

import { useState, useEffect } from 'react';
import { SkeletonPreset } from 'veilkit/react';

interface ProductData {
  title: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  description: string;
}

export function LiveSimulationSection() {
  const [latency, setLatency] = useState<number>(800);
  const [presetName, setPresetName] = useState<any>('product-card');
  const [shape, setShape] = useState<any>('rounded');
  const [animation, setAnimation] = useState<any>('shimmer');
  const [theme, setTheme] = useState<any>('dark');
  const [transition, setTransition] = useState<'fade' | 'blur-in' | 'slide-up'>('blur-in');

  // Simulation state machine
  const [stage, setStage] = useState<'idle' | 'buffering-delay' | 'loading-skeleton' | 'revealing' | 'content-ready'>('idle');
  const [elapsed, setElapsed] = useState<number>(0);
  const [explanation, setExplanation] = useState<string>('Click "Simulate Fetch Request" below to see Veilkit manage the loading lifecycle.');

  const realProduct: ProductData = {
    title: 'Apple Studio Display Pro XDR',
    category: 'Displays & Creative Hardware',
    price: '$1,599.00',
    rating: 4.9,
    reviews: 1420,
    description: '27-inch 5K Retina display with 12MP Ultra Wide camera, studio-quality mics, and six-speaker sound system with Spatial Audio.',
  };

  const runSimulation = () => {
    setStage('buffering-delay');
    setElapsed(0);
    setExplanation('Initiating fetch... Waiting anti-flicker delay threshold (150ms).');

    const startTime = performance.now();

    // 1. Anti-flicker delay threshold (150ms)
    const delayTimer = setTimeout(() => {
      const currentElapsed = Math.round(performance.now() - startTime);

      if (latency <= 150) {
        // Fast API! Anti-flicker skips skeleton
        setStage('content-ready');
        setElapsed(latency);
        setExplanation(`⚡️ Anti-flicker win! API resolved in ${latency}ms (< 150ms). Veilkit suppressed the skeleton to prevent visual micro-flash!`);
        return;
      }

      // Latency > 150ms: Show skeleton
      setStage('loading-skeleton');
      setExplanation(`Network latency is ${latency}ms (> 150ms). Rendering synchronized 60 FPS GPU skeleton.`);
    }, 150);

    // 2. Network Response Resolves
    const resolveTimer = setTimeout(() => {
      clearTimeout(delayTimer);

      if (latency <= 150) {
        return; // Handled above
      }

      setStage('revealing');
      setExplanation(`Data received at ${latency}ms. Enforcing minVisible (300ms) and executing smooth "${transition}" reveal!`);

      // 3. Reveal transition
      setTimeout(() => {
        setStage('content-ready');
        setElapsed(latency);
        setExplanation(`✅ Content revealed seamlessly. Zero layout shift, zero hydration error.`);
      }, 350);
    }, latency);
  };

  return (
    <section className="py-20 border-t border-white/[0.08] relative bg-[#070b13]/60 overflow-hidden" id="simulation">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Real-Time Engine Test
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Live Production Lifecycle Simulation
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Experience how Veilkit eliminates layout shifts, synchronizes timeline clocks, and prevents annoying micro-flashes on fast networks.
          </p>
        </div>

        {/* Studio Shell */}
        <div className="bg-[#0c121e]/90 border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 border-b border-white/[0.08]">
            {/* Latency Presets */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Network Speed / Latency:</label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { label: '80ms Fast', val: 80, hint: 'Tests Anti-Flicker' },
                  { label: '800ms Normal', val: 800, hint: 'Smooth Shimmer' },
                  { label: '2.2s 3G', val: 2200, hint: 'Long Fetch' },
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => {
                      setLatency(item.val);
                      setStage('idle');
                    }}
                    className={`px-2 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer text-center ${
                      latency === item.val
                        ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Shape Style */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Shape Token:</label>
              <select
                value={shape}
                onChange={(e) => setShape(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="rounded">rounded (8px modern)</option>
                <option value="pill">pill (9999px capsule)</option>
                <option value="glass">glass (frosted 12px blur)</option>
                <option value="square">square (4px soft)</option>
                <option value="sharp">sharp (0px geometric)</option>
              </select>
            </div>

            {/* Animation Style */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">GPU Animation:</label>
              <select
                value={animation}
                onChange={(e) => setAnimation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="shimmer">shimmer (classic linear sweep)</option>
                <option value="aurora">aurora (multi-chroma organic)</option>
                <option value="neon-glow">neon-glow (pulsing edges)</option>
                <option value="glass-shine">glass-shine (frosted glint)</option>
                <option value="wave">wave (sinusoidal ribbon)</option>
                <option value="pulse">pulse (calm opacity)</option>
                <option value="spotlight">spotlight (moving cone)</option>
              </select>
            </div>

            {/* Reveal Transition */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Reveal Effect:</label>
              <select
                value={transition}
                onChange={(e) => setTransition(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="blur-in">blur-in (Apple style)</option>
                <option value="fade">fade (smooth opacity)</option>
                <option value="slide-up">slide-up (micro lift)</option>
              </select>
            </div>
          </div>

          {/* Action & Explanation Status Banner */}
          <div className="py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={runSimulation}
                disabled={stage === 'buffering-delay' || stage === 'loading-skeleton' || stage === 'revealing'}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                <span>Simulate Fetch ({latency}ms)</span>
              </button>

              <button
                onClick={() => setStage('idle')}
                className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-white transition-colors"
              >
                Reset State
              </button>
            </div>

            {/* Status Pill Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500">Lifecycle State:</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${
                  stage === 'idle'
                    ? 'bg-slate-900 text-slate-400 border-slate-800'
                    : stage === 'buffering-delay'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
                    : stage === 'loading-skeleton'
                    ? 'bg-sky-500/10 text-sky-400 border-sky-500/30 animate-pulse'
                    : stage === 'revealing'
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                }`}
              >
                {stage}
              </span>
            </div>
          </div>

          {/* Explanation Live Banner */}
          <div className="p-3 bg-slate-950/70 rounded-xl border border-white/[0.06] text-xs text-slate-300 flex items-start gap-2.5">
            <span className="text-sky-400 text-sm mt-0.5">ℹ️</span>
            <p className="leading-relaxed font-mono">{explanation}</p>
          </div>

          {/* Simulation Stage Display */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Stage Canvas */}
            <div className="bg-[#080d16] p-6 rounded-2xl border border-white/[0.08] min-h-[380px] flex items-center justify-center relative">
              {stage === 'loading-skeleton' ? (
                <div className="w-full max-w-sm">
                  <SkeletonPreset
                    name="product-card"
                    shape={shape}
                    animation={animation}
                    theme={theme}
                  />
                </div>
              ) : stage === 'content-ready' ? (
                /* Real Content Card */
                <div
                  className={`w-full max-w-sm bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl ${
                    transition === 'blur-in' ? 'animate-blurIn' : transition === 'slide-up' ? 'animate-slideUp' : 'animate-fadeIn'
                  }`}
                >
                  <div className="w-full h-44 rounded-xl bg-gradient-to-tr from-sky-500/20 via-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center relative overflow-hidden">
                    <span className="text-4xl">🖥️</span>
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold font-mono">
                      In Stock
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                      {realProduct.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5 leading-snug">
                      {realProduct.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {realProduct.description}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                    <div>
                      <div className="text-lg font-extrabold text-white font-mono">{realProduct.price}</div>
                      <div className="text-[10px] text-amber-400">★ {realProduct.rating} ({realProduct.reviews})</div>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs shadow-md shadow-sky-500/20 transition-all cursor-pointer">
                      Buy Now
                    </button>
                  </div>
                </div>
              ) : (
                /* Idle state */
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-xl text-slate-500">
                    ⚡️
                  </div>
                  <h4 className="text-sm font-semibold text-slate-300">Ready to Simulate</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Choose network latency above and click &quot;Simulate Fetch&quot; to test lifecycle and transitions.
                  </p>
                </div>
              )}
            </div>

            {/* Architecture Explanation Card */}
            <div className="space-y-4 text-xs text-slate-400">
              <h3 className="text-base font-bold text-white">How Veilkit Handles Loading Lifecycle</h3>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-mono text-[10px]">
                    1
                  </span>
                  <span className="font-bold text-slate-200">150ms Anti-Flicker Threshold</span>
                </div>
                <p className="text-slate-400 leading-relaxed pl-7">
                  When user navigates, cached queries or fast fiber connections return in 50-120ms. Showing a skeleton for 80ms creates annoying flickering. Veilkit holds off until 150ms before showing any wireframe.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold font-mono text-[10px]">
                    2
                  </span>
                  <span className="font-bold text-slate-200">300ms Minimum Visible Duration</span>
                </div>
                <p className="text-slate-400 leading-relaxed pl-7">
                  If the skeleton renders, it guarantees at least 300ms display time. This prevents visual shudder and gives human perception a serene, polished rhythm.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold font-mono text-[10px]">
                    3
                  </span>
                  <span className="font-bold text-slate-200">GPU Compositor Reveal Transition</span>
                </div>
                <p className="text-slate-400 leading-relaxed pl-7">
                  Content reveals using hardware-accelerated <code className="text-sky-300">blur-in</code> or <code className="text-sky-300">fade</code> animations without triggering browser reflow or layout thrash.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
