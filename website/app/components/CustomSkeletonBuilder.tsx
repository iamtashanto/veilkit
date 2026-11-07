'use client';

import { useState } from 'react';

type ElementType = 'avatar' | 'heading' | 'lines' | 'image' | 'button' | 'badge';

interface CustomElement {
  id: string;
  type: ElementType;
  width: string;
  height: string;
}

export function CustomSkeletonBuilder() {
  const [elements, setElements] = useState<CustomElement[]>([
    { id: '1', type: 'image', width: '100%', height: '160px' },
    { id: '2', type: 'heading', width: '65%', height: '24px' },
    { id: '3', type: 'lines', width: '90%', height: '14px' },
    { id: '4', type: 'button', width: '120px', height: '40px' },
  ]);

  const [shape, setShape] = useState<'rounded' | 'pill' | 'square' | 'sharp' | 'glass'>('rounded');
  const [animation, setAnimation] = useState<string>('shimmer');
  const [theme, setTheme] = useState<string>('glass');
  const [copied, setCopied] = useState(false);

  const addElement = (type: ElementType) => {
    const id = Math.random().toString(36).substring(2, 7);
    let defaultWidth = '100%';
    let defaultHeight = '16px';

    if (type === 'avatar') {
      defaultWidth = '48px';
      defaultHeight = '48px';
    } else if (type === 'heading') {
      defaultWidth = '70%';
      defaultHeight = '24px';
    } else if (type === 'image') {
      defaultWidth = '100%';
      defaultHeight = '140px';
    } else if (type === 'button') {
      defaultWidth = '120px';
      defaultHeight = '40px';
    } else if (type === 'badge') {
      defaultWidth = '70px';
      defaultHeight = '22px';
    }

    setElements([...elements, { id, type, width: defaultWidth, height: defaultHeight }]);
  };

  const removeElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id));
  };

  const loadTemplate = (name: string) => {
    if (name === 'profile') {
      setElements([
        { id: 'p1', type: 'avatar', width: '64px', height: '64px' },
        { id: 'p2', type: 'heading', width: '50%', height: '22px' },
        { id: 'p3', type: 'lines', width: '80%', height: '14px' },
        { id: 'p4', type: 'button', width: '110px', height: '36px' },
      ]);
    } else if (name === 'product') {
      setElements([
        { id: 'pr1', type: 'image', width: '100%', height: '180px' },
        { id: 'pr2', type: 'badge', width: '80px', height: '22px' },
        { id: 'pr3', type: 'heading', width: '75%', height: '24px' },
        { id: 'pr4', type: 'lines', width: '50%', height: '14px' },
        { id: 'pr5', type: 'button', width: '100%', height: '42px' },
      ]);
    } else if (name === 'article') {
      setElements([
        { id: 'a1', type: 'image', width: '100%', height: '200px' },
        { id: 'a2', type: 'heading', width: '85%', height: '32px' },
        { id: 'a3', type: 'lines', width: '100%', height: '14px' },
        { id: 'a4', type: 'lines', width: '90%', height: '14px' },
        { id: 'a5', type: 'lines', width: '70%', height: '14px' },
      ]);
    }
  };

  const getRadiusClass = () => {
    if (shape === 'pill') return 'rounded-full';
    if (shape === 'square') return 'rounded';
    if (shape === 'sharp') return 'rounded-none';
    return 'rounded-xl';
  };

  const generatedReactCode = `import { CustomSkeleton, SkeletonBuilder } from 'veilkit/react';

// Option A: Declarative Custom Layout Component
export function MyWebsiteSkeleton() {
  const config = {
    animation: '${animation}',
    theme: '${theme}',
    shape: '${shape}',
    gap: 12,
    nodes: [
${elements
  .map(
    (el) =>
      `      { type: '${el.type === 'lines' ? 'line' : el.type}', width: '${el.width}', height: '${el.height}' }`
  )
  .join(',\n')}
    ],
  };

  return <CustomSkeleton config={config} />;
}

// Option B: Fluent SkeletonBuilder API
export const builderSkeleton = new SkeletonBuilder({ animation: '${animation}', shape: '${shape}' })
${elements
  .map((el) => {
    if (el.type === 'avatar') return `  .avatar('${el.width}')`;
    if (el.type === 'heading') return `  .heading('${el.width}', '${el.height}')`;
    if (el.type === 'lines') return `  .lines(2)`;
    if (el.type === 'button') return `  .button('${el.width}', '${el.height}')`;
    if (el.type === 'badge') return `  .badge('${el.width}', '${el.height}')`;
    return `  .rect('${el.width}', '${el.height}')`;
  })
  .join('\n')}
  .build();`;

  const copyCode = () => {
    navigator.clipboard.writeText(generatedReactCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="custom-builder" className="py-20 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Interactive Custom Builder
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Build Skeletons Matching Your Exact Website Layout
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Add elements, tweak dimensions, select animations and shapes. Copy the production code directly into your
            project in seconds.
          </p>
        </div>

        {/* Builder Workspace: Left Controls, Middle Preview, Right Code */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-4 p-6 rounded-2xl border border-white/[0.08] bg-[#0c121e]/90 space-y-6">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Preset Templates</label>
              <div className="flex flex-wrap gap-2">
                {['profile', 'product', 'article'].map((tpl) => (
                  <button
                    key={tpl}
                    onClick={() => loadTemplate(tpl)}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white capitalize transition-colors"
                  >
                    {tpl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Add UI Elements</label>
              <div className="grid grid-cols-3 gap-2">
                {(['avatar', 'heading', 'lines', 'image', 'button', 'badge'] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => addElement(item)}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-sky-500/50 text-xs text-slate-300 hover:text-white capitalize flex items-center justify-center gap-1 transition-all"
                  >
                    <span>+</span>
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Shape & Theme */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Shape Style</label>
                <select
                  value={shape}
                  onChange={(e) => setShape(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
                >
                  <option value="rounded">Rounded (8px)</option>
                  <option value="pill">Pill (9999px)</option>
                  <option value="square">Square (4px)</option>
                  <option value="sharp">Sharp (0px)</option>
                  <option value="glass">Glass (Frosted)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Animation</label>
                <select
                  value={animation}
                  onChange={(e) => setAnimation(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
                >
                  <option value="shimmer">shimmer</option>
                  <option value="wave">wave</option>
                  <option value="pulse">pulse</option>
                  <option value="aurora">aurora</option>
                  <option value="glass-shine">glass-shine</option>
                  <option value="neon-glow">neon-glow</option>
                </select>
              </div>
            </div>

            {/* Elements List */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Active Elements ({elements.length})
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {elements.map((el, i) => (
                  <div
                    key={el.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-mono">#{i + 1}</span>
                      <span className="font-semibold text-slate-200 capitalize">{el.type}</span>
                    </div>
                    <button
                      onClick={() => removeElement(el.id)}
                      className="text-rose-400 hover:text-rose-300 text-xs px-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview Column */}
          <div className="lg:col-span-4 p-6 rounded-2xl border border-white/[0.08] bg-[#0c121e]/90 flex flex-col justify-between min-h-[460px]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <span className="text-xs font-semibold text-slate-300">Live Visual Preview</span>
                <span className="text-[11px] font-mono text-cyan-400">shape: {shape}</span>
              </div>

              {/* Live Rendered Canvas */}
              <div
                className={`p-6 rounded-2xl border border-white/[0.08] space-y-4 ${
                  shape === 'glass' ? 'backdrop-blur-xl bg-white/[0.03] border-white/[0.15]' : 'bg-slate-900/80'
                }`}
              >
                {elements.map((el) => {
                  if (el.type === 'avatar') {
                    return (
                      <div
                        key={el.id}
                        style={{ width: el.width, height: el.height }}
                        className="rounded-full bg-slate-800 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
                      </div>
                    );
                  }
                  if (el.type === 'heading') {
                    return (
                      <div
                        key={el.id}
                        style={{ width: el.width, height: el.height }}
                        className={`${getRadiusClass()} bg-slate-800 relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
                      </div>
                    );
                  }
                  if (el.type === 'button') {
                    return (
                      <div
                        key={el.id}
                        style={{ width: el.width, height: el.height }}
                        className={`${getRadiusClass()} bg-slate-800 relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
                      </div>
                    );
                  }
                  if (el.type === 'badge') {
                    return (
                      <div
                        key={el.id}
                        style={{ width: el.width, height: el.height }}
                        className="rounded-full bg-slate-800 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
                      </div>
                    );
                  }
                  return (
                    <div
                      key={el.id}
                      style={{ width: el.width, height: el.height }}
                      className={`${getRadiusClass()} bg-slate-800 relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 pt-4">
              ✦ GPU-accelerated motion matching layout leaf elements.
            </p>
          </div>

          {/* Generated Code Column */}
          <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-[#080d16] overflow-hidden flex flex-col justify-between min-h-[460px]">
            <div>
              <div className="flex items-center justify-between px-4 py-3 bg-[#05080e] border-b border-white/[0.08]">
                <span className="text-xs font-mono text-slate-300">Generated Code</span>
                <button
                  onClick={copyCode}
                  className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-400 hover:bg-sky-500/30 text-xs font-medium cursor-pointer transition-colors"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto max-h-[380px] leading-relaxed">
                <code>{generatedReactCode}</code>
              </pre>
            </div>
            <div className="p-3 bg-[#05080e] border-t border-white/[0.08] text-[11px] text-slate-400">
              Compatible with React 18/19, Next.js App Router & SSR.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
