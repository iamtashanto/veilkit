'use client';

import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function PresetsPage() {
  const [search, setSearch] = useState('');
  const [selectedShape, setSelectedShape] = useState<'rounded' | 'pill' | 'square' | 'sharp' | 'glass'>('rounded');

  const allPresets = [
    { name: 'product-card', category: 'Cards & E-Commerce', desc: 'Product thumbnail, category badge, title, price line, buy button' },
    { name: 'card', category: 'Cards & Content', desc: 'Hero media, title heading, 2 paragraph lines, and action button' },
    { name: 'product-grid', category: 'Cards & E-Commerce', desc: 'Multi-column responsive grid of product cards' },
    { name: 'product-detail', category: 'Cards & E-Commerce', desc: 'Large hero gallery, title, SKU badge, specs table, dual action buttons' },
    { name: 'e-commerce-checkout', category: 'Cards & E-Commerce', desc: 'Multi-step address/payment form with order total sidebar summary' },
    { name: 'dashboard', category: 'Analytics & Admin', desc: 'Metric counter cards, performance gauge, and responsive chart blocks' },
    { name: 'kpi-card', category: 'Analytics & Admin', desc: 'Metric headline, delta percent badge, and mini sparkline chart' },
    { name: 'chart-bar', category: 'Analytics & Admin', desc: 'Multi-bar vertical chart placeholder with axis guides' },
    { name: 'chart-line', category: 'Analytics & Admin', desc: 'Continuous curve line chart with data point vertices' },
    { name: 'chart-pie', category: 'Analytics & Admin', desc: 'Circular donut segment breakdown with legend labels' },
    { name: 'kanban', category: 'Analytics & Admin', desc: 'Multi-column project board with draggable card blocks' },
    { name: 'timeline', category: 'Analytics & Admin', desc: 'Vertical chronological milestone event node track' },
    { name: 'calendar', category: 'Analytics & Admin', desc: '7-column month grid with event indicator pills' },
    { name: 'table', category: 'Data & Lists', desc: 'Header column bar followed by N zebra data rows' },
    { name: 'list', category: 'Data & Lists', desc: 'Multi-item list container with avatar icons and trailing actions' },
    { name: 'list-item', category: 'Data & Lists', desc: 'Single avatar circle, primary title, subtitle, and chevron' },
    { name: 'inbox-list', category: 'Data & Lists', desc: 'Email/message rows with sender, subject snippet, and timestamp' },
    { name: 'notification-list', category: 'Data & Lists', desc: 'Alert rows with notification bell, message, and time badge' },
    { name: 'order-list', category: 'Data & Lists', desc: 'E-commerce order numbers, status chips, price, and tracking link' },
    { name: 'search-results', category: 'Data & Lists', desc: 'Web search result items with URL breadcrumb, title, and excerpt' },
    { name: 'profile', category: 'User & Social', desc: 'Centered user avatar, name line, biography, and follow button' },
    { name: 'profile-header', category: 'User & Social', desc: 'Wide cover photo banner with overlapping avatar circle' },
    { name: 'feed-post', category: 'User & Social', desc: 'Author avatar, timestamp, post text, media embed, and 3 reaction buttons' },
    { name: 'stories-row', category: 'User & Social', desc: 'Horizontal scroll row of circular story avatars with gradient borders' },
    { name: 'reels', category: 'User & Social', desc: 'Vertical 9:16 mobile video container with right-side action rail' },
    { name: 'social-story', category: 'User & Social', desc: 'Full screen story view with multi-segment top progress bars' },
    { name: 'comment-thread', category: 'User & Social', desc: 'Nested discussion comments with reply indentation levels' },
    { name: 'chat', category: 'User & Social', desc: 'Alternating left and right conversation message bubbles' },
    { name: 'article', category: 'Editorial & Media', desc: 'Wide hero banner, headline, author byline, and rich text blocks' },
    { name: 'news-feed', category: 'Editorial & Media', desc: 'Editorial article cards with thumbnail, category, and date line' },
    { name: 'media-card', category: 'Editorial & Media', desc: 'Video player thumbnail with play button overlay and channel meta' },
    { name: 'video-player', category: 'Editorial & Media', desc: '16:9 widescreen player frame with bottom scrubber bar and play controls' },
    { name: 'music-player', category: 'Editorial & Media', desc: 'Square album artwork, song title, scrubber timeline, and playback controls' },
    { name: 'code-block', category: 'Developer & Code', desc: 'Code editor frame with window dots, line numbers, and token lines' },
    { name: 'file-explorer', category: 'Developer & Code', desc: 'Hierarchical file tree with folder icons and indented files' },
    { name: 'form', category: 'Forms & Settings', desc: 'Form title heading, 3 labeled input fields, and submit button' },
    { name: 'navbar', category: 'Forms & Settings', desc: 'Brand logo block, horizontal link tabs, search input, and avatar' },
    { name: 'sidebar', category: 'Forms & Settings', desc: 'Logo block, vertical menu items with icons, and profile footer' },
    { name: 'tabs', category: 'Forms & Settings', desc: 'Horizontal tab bar with active indicator and container placeholder' },
    { name: 'settings-page', category: 'Forms & Settings', desc: 'Section headers, toggle rows with descriptions, and action buttons' },
    { name: 'faq-accordion', category: 'Forms & Settings', desc: 'Expandable question header cards with chevron indicators' },
    { name: 'pricing-card', category: 'Marketing & Sales', desc: 'Tier badge, price line, 4 feature bullet points, and checkout button' },
    { name: 'testimonial', category: 'Marketing & Sales', desc: 'Customer quote block with avatar, name, and 5-star rating placeholder' },
    { name: 'map-card', category: 'Marketing & Sales', desc: 'Interactive map container with pin locator and address card' },
    { name: 'hero-banner', category: 'Marketing & Sales', desc: 'Large centered headline, subtitle, badge, and dual CTA buttons' },
  ];

  const filtered = allPresets.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Presets Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            45+ Canonical Skeleton Presets
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Ready-made, responsive, responsive layouts for every common UI pattern. Fully customizable with 5 shape styles.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#0c121e]/90 p-4 rounded-2xl border border-white/[0.08]">
          <input
            type="text"
            placeholder="Search 45+ presets (e.g. checkout, dashboard, chat)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Shape:</span>
            {(['rounded', 'pill', 'square', 'sharp', 'glass'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSelectedShape(s)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                  selectedShape === s
                    ? 'bg-sky-500 text-white font-semibold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((preset) => (
            <div
              key={preset.name}
              className="p-5 rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-semibold text-sky-400">{preset.category}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {selectedShape}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  {preset.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{preset.desc}</p>
              </div>

              {/* Skeleton Mockup Box */}
              <div
                className={`p-4 rounded-xl border border-white/[0.06] bg-slate-900/60 space-y-2.5 overflow-hidden relative ${
                  selectedShape === 'glass' ? 'backdrop-blur-md bg-white/[0.02]' : ''
                }`}
              >
                <div className="w-full h-16 rounded bg-slate-800 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                </div>
                <div className="w-3/5 h-4 rounded bg-slate-800 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                </div>
                <div className="w-4/5 h-3 rounded bg-slate-800 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                </div>
              </div>

              {/* Code snippet line */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                <code>&lt;SkeletonPreset name=&quot;{preset.name}&quot; /&gt;</code>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
