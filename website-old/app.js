// Veilkit Docs & Playground Engine

const state = {
  preset: 'product-card',
  animation: 'shimmer',
  theme: 'glass',
  shape: 'rounded',
  direction: 'ltr',
  speed: 1500,
  radius: 10,
  framework: 'react',
  siteTheme: 'dark',
};

// 40 Presets
const PRESETS = [
  'card',
  'product-card',
  'product-grid',
  'list',
  'list-item',
  'table',
  'profile',
  'profile-header',
  'feed-post',
  'article',
  'comment-thread',
  'chat',
  'dashboard',
  'form',
  'media-card',
  'navbar',
  'sidebar',
  'settings-page',
  'product-detail',
  'news-feed',
  'inbox-list',
  'notification-list',
  'order-list',
  'kpi-card',
  'chart-bar',
  'chart-line',
  'chart-pie',
  'search-results',
  'video-player',
  'music-player',
  'stories-row',
  'reels',
  'tabs',
  'calendar',
  'kanban',
  'timeline',
  'map-card',
  'pricing-card',
  'testimonial',
  'faq-accordion',
];

// 30 GPU Animations
const ANIMATIONS = [
  'shimmer',
  'wave',
  'pulse',
  'blink',
  'breathe',
  'glass-shine',
  'gradient-flow',
  'aurora',
  'scan-line',
  'sparkle',
  'neon-glow',
  'stagger',
  'ripple',
  'ping-pong',
  'wipe',
  'cascade',
  'spotlight',
  'rainbow',
  'heartbeat',
  'liquid',
  'stripes',
  'halftone',
  'border-glow',
  'typewriter',
  'glitch',
  'pixelate',
  'tilt',
  'diagonal-sweep',
  'bounce-in',
  'fade-slide',
];

// 30 Spinners
const SPINNERS = [
  'ring',
  'dual-ring',
  'dots',
  'bars',
  'pulse',
  'orbit',
  'wave',
  'bounce',
  'ios-activity',
  'glass-orb',
  'morph',
  'progress-circle',
  'arc-gradient',
  'pulse-ring',
  'dots-circle',
  'grid-dots',
  'square-flip',
  'cube-fold',
  'hourglass',
  'infinity',
  'heartbeat-line',
  'equalizer',
  'chasing-dots',
  'typing',
  'liquid-fill',
  'atom',
  'clock',
  'radar',
  'ellipsis',
  'flower',
];

// 16 Button Loading Styles
const BUTTON_STYLES = [
  'spinner-left',
  'spinner-right',
  'spinner-replace',
  'dots-after-text',
  'progress-fill',
  'shimmer-surface',
  'pulse-glow',
  'stripes-progress',
  'morph-circle',
  'slide-text',
  'border-trace',
  'liquid-fill',
  'bounce-dots',
  'glass-shine',
  'neon-pulse',
  'skeleton-button',
];

// 11 Themes
const THEMES = [
  'glass',
  'ios',
  'light',
  'dark',
  'auto',
  'material',
  'minimal',
  'mono',
  'neon',
  'sunset',
  'ocean',
];

function init() {
  populateControls();
  renderPreview();
  renderCode();
  renderPresetsGallery();
  renderAnimationsGallery();
  renderSpinnersGallery();
  renderButtonsGallery();
  renderThemesGallery();
  setupEventListeners();
}

function populateControls() {
  const presetSelect = document.getElementById('select-preset');
  PRESETS.forEach((p) => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    if (p === state.preset) opt.selected = true;
    presetSelect.appendChild(opt);
  });

  const animSelect = document.getElementById('select-anim');
  ANIMATIONS.forEach((a) => {
    const opt = document.createElement('option');
    opt.value = a;
    opt.textContent = a;
    if (a === state.animation) opt.selected = true;
    animSelect.appendChild(opt);
  });

  const themeSelect = document.getElementById('select-theme');
  THEMES.forEach((t) => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    if (t === state.theme) opt.selected = true;
    themeSelect.appendChild(opt);
  });
}

function renderPreview() {
  const viewport = document.getElementById('preview-viewport');
  if (!viewport || !window.Veilkit) return;

  viewport.innerHTML = '';
  const el = window.Veilkit.createPreset({
    name: state.preset,
    animation: state.animation,
    theme: state.theme,
    shape: state.shape,
    speed: `${state.speed}ms`,
  });

  viewport.appendChild(el);
}

function renderCode() {
  const codeEl = document.getElementById('generated-code');
  if (!codeEl) return;

  const pascalName = state.preset
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');

  let code = '';
  switch (state.framework) {
    case 'react':
      code = `import 'veilkit/styles.css';\nimport { SkeletonPreset } from 'veilkit/react';\n\nexport default function LoadingView() {\n  return (\n    <SkeletonPreset\n      name="${state.preset}"\n      animation="${state.animation}"\n      theme="${state.theme}"\n      shape="${state.shape}"\n    />\n  );\n}`;
      break;

    case 'vue':
      code = `<script setup>\nimport 'veilkit/styles.css';\nimport { VSkeletonPreset } from 'veilkit/vue';\n</script>\n\n<template>\n  <VSkeletonPreset\n    name="${state.preset}"\n    animation="${state.animation}"\n    theme="${state.theme}"\n    shape="${state.shape}"\n  />\n</template>`;
      break;

    case 'svelte':
      code = `<script>\n  import 'veilkit/styles.css';\n  import { presetAction } from 'veilkit/svelte';\n</script>\n\n<div use:presetAction={{ name: '${state.preset}', animation: '${state.animation}', theme: '${state.theme}', shape: '${state.shape}' }} />`;
      break;

    case 'angular':
      code = `import { Component } from '@angular/core';\nimport { VeilPresetComponent } from 'veilkit/angular';\n\n@Component({\n  standalone: true,\n  imports: [VeilPresetComponent],\n  template: \`\n    <veil-preset\n      name="${state.preset}"\n      animation="${state.animation}"\n      theme="${state.theme}"\n      shape="${state.shape}"\n    />\n  \`,\n})\nexport class LoadingComponent {}`;
      break;

    case 'element':
      code = `<!-- Universal Web Component (Solid, Qwik, HTMX, HTML) -->\n<script type="module" src="https://unpkg.com/veilkit/dist/element/index.js"></script>\n<link rel="stylesheet" href="https://unpkg.com/veilkit/dist/styles.css" />\n\n<veil-preset\n  name="${state.preset}"\n  animation="${state.animation}"\n  theme="${state.theme}"\n  shape="${state.shape}">\n</veil-preset>`;
      break;

    case 'native':
      code = `import React from 'react';\nimport { Skeleton } from 'veilkit/native';\n\nexport function LoadingScreen() {\n  return (\n    <Skeleton\n      animation="${state.animation}"\n      theme="${state.theme}"\n      radius={${state.radius}}\n    />\n  );\n}`;
      break;

    case 'vanilla':
      code = `<!-- Plain HTML & CDN -->\n<link rel="stylesheet" href="https://unpkg.com/veilkit/dist/styles.css" />\n<script src="https://unpkg.com/veilkit/dist/veilkit.min.js"></script>\n\n<div id="loading-target"></div>\n\n<script>\n  const preset = Veilkit.createPreset({\n    name: '${state.preset}',\n    animation: '${state.animation}',\n    theme: '${state.theme}',\n    shape: '${state.shape}',\n  });\n  document.getElementById('loading-target').appendChild(preset);\n</script>`;
      break;
  }

  codeEl.textContent = code;
}

function renderPresetsGallery() {
  const gallery = document.getElementById('presets-gallery');
  if (!gallery || !window.Veilkit) return;
  gallery.innerHTML = '';

  PRESETS.forEach((preset) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';

    const title = document.createElement('div');
    title.className = 'gallery-card-title';
    title.textContent = preset;

    const preview = document.createElement('div');
    preview.style.width = '100%';
    preview.style.minHeight = '100px';
    preview.style.display = 'flex';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';

    const pEl = window.Veilkit.createPreset({
      name: preset,
      animation: 'shimmer',
      theme: 'glass',
      width: '100%',
    });
    preview.appendChild(pEl);

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.style.marginTop = '12px';
    copyBtn.textContent = 'Copy Code';
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(`<SkeletonPreset name="${preset}" />`);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => (copyBtn.textContent = 'Copy Code'), 1500);
    };

    card.append(title, preview, copyBtn);
    gallery.appendChild(card);
  });
}

function renderAnimationsGallery() {
  const gallery = document.getElementById('animations-gallery');
  if (!gallery || !window.Veilkit) return;
  gallery.innerHTML = '';

  ANIMATIONS.forEach((anim) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';

    const title = document.createElement('div');
    title.className = 'gallery-card-title';
    title.textContent = anim;

    const preview = document.createElement('div');
    preview.style.width = '100%';
    preview.style.padding = '12px 0';

    const skel = window.Veilkit.createSkeletonElement({
      animation: anim,
      width: '100%',
      height: '32px',
      radius: '8px',
    });
    preview.appendChild(skel);

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.style.marginTop = '10px';
    copyBtn.textContent = 'Copy Code';
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(`<Skeleton animation="${anim}" />`);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => (copyBtn.textContent = 'Copy Code'), 1500);
    };

    card.append(title, preview, copyBtn);
    gallery.appendChild(card);
  });
}

function renderSpinnersGallery() {
  const gallery = document.getElementById('spinners-gallery');
  if (!gallery || !window.Veilkit) return;
  gallery.innerHTML = '';

  SPINNERS.forEach((spinner) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';

    const title = document.createElement('div');
    title.className = 'gallery-card-title';
    title.textContent = spinner;

    const preview = document.createElement('div');
    preview.style.height = '60px';
    preview.style.display = 'flex';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';

    const spEl = window.Veilkit.createSpinner({
      type: spinner,
      size: 32,
      color: 'var(--accent, #38bdf8)',
    });
    preview.appendChild(spEl);

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.style.marginTop = '8px';
    copyBtn.textContent = 'Copy Code';
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(`<Spinner type="${spinner}" size={32} />`);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => (copyBtn.textContent = 'Copy Code'), 1500);
    };

    card.append(title, preview, copyBtn);
    gallery.appendChild(card);
  });
}

function renderButtonsGallery() {
  const gallery = document.getElementById('buttons-gallery');
  if (!gallery || !window.Veilkit) return;
  gallery.innerHTML = '';

  BUTTON_STYLES.forEach((styleType, idx) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';

    const title = document.createElement('div');
    title.className = 'gallery-card-title';
    title.textContent = styleType;

    const btn = document.createElement('button');
    btn.className = 'btn-primary';
    btn.textContent = 'Save Changes';
    btn.style.width = '170px';
    btn.style.margin = '14px 0';

    const controller = window.Veilkit.wrapLoadingButton(btn, {
      styleType,
      resetAfter: 2000,
      loadingText: 'Saving…',
      successText: 'Saved!',
      errorText: 'Failed',
    });

    // Simulate action click: idle -> loading -> success (or error every 3rd) -> idle
    btn.onclick = () => {
      if (controller.getStatus() !== 'idle') return;
      controller.setStatus('loading');
      setTimeout(() => {
        if (idx % 3 === 2) {
          controller.setStatus('error');
        } else {
          controller.setStatus('success');
        }
      }, 1500);
    };

    const hint = document.createElement('div');
    hint.className = 'gallery-card-desc';
    hint.textContent = 'Click button to simulate lifecycle';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.style.marginTop = '6px';
    copyBtn.textContent = 'Copy Code';
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(`<LoadingButton styleType="${styleType}" onClick={handleSave}>Save Changes</LoadingButton>`);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => (copyBtn.textContent = 'Copy Code'), 1500);
    };

    card.append(title, btn, hint, copyBtn);
    gallery.appendChild(card);
  });
}

function renderThemesGallery() {
  const gallery = document.getElementById('themes-gallery');
  if (!gallery || !window.Veilkit) return;
  gallery.innerHTML = '';

  THEMES.forEach((theme) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';

    const title = document.createElement('div');
    title.className = 'gallery-card-title';
    title.textContent = theme.toUpperCase();

    const preview = document.createElement('div');
    preview.style.width = '100%';
    preview.style.padding = '8px 0';

    const skel = window.Veilkit.createSkeletonElement({
      theme: theme,
      animation: 'shimmer',
      width: '100%',
      height: '36px',
      radius: '8px',
    });
    preview.appendChild(skel);

    card.append(title, preview);
    gallery.appendChild(card);
  });
}

function setupEventListeners() {
  document.getElementById('select-preset')?.addEventListener('change', (e) => {
    state.preset = e.target.value;
    renderPreview();
    renderCode();
  });

  document.getElementById('select-anim')?.addEventListener('change', (e) => {
    state.animation = e.target.value;
    renderPreview();
    renderCode();
  });

  document.getElementById('select-theme')?.addEventListener('change', (e) => {
    state.theme = e.target.value;
    renderPreview();
    renderCode();
  });

  document.getElementById('select-shape')?.addEventListener('change', (e) => {
    state.shape = e.target.value;
    renderPreview();
    renderCode();
  });

  document.getElementById('input-speed')?.addEventListener('input', (e) => {
    state.speed = parseInt(e.target.value, 10);
    document.getElementById('val-speed').textContent = `${state.speed}ms`;
    renderPreview();
  });

  document.getElementById('input-radius')?.addEventListener('input', (e) => {
    state.radius = parseInt(e.target.value, 10);
    document.getElementById('val-radius').textContent = `${state.radius}px`;
    renderPreview();
  });

  document.querySelectorAll('.framework-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.framework-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      state.framework = tab.getAttribute('data-fw');
      renderCode();
    });
  });

  document.getElementById('copy-code-btn')?.addEventListener('click', () => {
    const code = document.getElementById('generated-code').textContent;
    navigator.clipboard.writeText(code);
    const btn = document.getElementById('copy-code-btn');
    btn.textContent = 'Copied!';
    setTimeout(() => (btn.textContent = 'Copy Code'), 1500);
  });

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    state.siteTheme = state.siteTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-site-theme', state.siteTheme);
    document.getElementById('theme-toggle').textContent = state.siteTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
  });
}

window.addEventListener('DOMContentLoaded', init);
