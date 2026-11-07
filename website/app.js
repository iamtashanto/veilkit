// Veilkit Docs & Playground Engine

const state = {
  preset: 'product-card',
  animation: 'shimmer',
  theme: 'glass',
  direction: 'ltr',
  speed: 1500,
  radius: 10,
  framework: 'react',
  siteTheme: 'dark',
};

// Available options
const PRESETS = [
  'product-card',
  'card',
  'product-grid',
  'feed-post',
  'article',
  'profile',
  'profile-header',
  'dashboard',
  'form',
  'list',
  'list-item',
  'table',
  'chat',
  'media-card',
  'navbar',
  'sidebar',
  'settings-page',
];

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
];

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
];

function init() {
  populateControls();
  renderPreview();
  renderCode();
  renderSpinnersGallery();
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
  viewport.innerHTML = '';

  if (typeof Veilkit !== 'undefined') {
    const el = Veilkit.createPreset({
      name: state.preset,
      animation: state.animation,
      theme: state.theme,
      direction: state.direction,
      speed: state.speed,
      radius: state.radius,
    });
    viewport.appendChild(el);
  }
}

function generateCode() {
  const { preset, animation, theme, speed, radius, framework } = state;

  switch (framework) {
    case 'react':
      return `import { SkeletonPreset } from 'veilkit/react';

export default function MyComponent() {
  return (
    <SkeletonPreset
      name="${preset}"
      animation="${animation}"
      theme="${theme}"
      speed="${speed}ms"
      radius="${radius}px"
    />
  );
}`;

    case 'vue':
      return `<script setup>
import { VSkeletonPreset } from 'veilkit/vue';
</script>

<template>
  <VSkeletonPreset
    name="${preset}"
    animation="${animation}"
    theme="${theme}"
    speed="${speed}ms"
    radius="${radius}px"
  />
</template>`;

    case 'svelte':
      return `<script>
  import { createPreset } from 'veilkit';
  import { onMount } from 'svelte';

  let container;
  onMount(() => {
    container.appendChild(createPreset({
      name: '${preset}',
      animation: '${animation}',
      theme: '${theme}'
    }));
  });
</script>

<div bind:this={container} />`;

    case 'angular':
      return `import { Component } from '@angular/core';
import { VeilSkeletonComponent } from 'veilkit/angular';

@Component({
  standalone: true,
  imports: [VeilSkeletonComponent],
  template: \`
    <veil-skeleton
      [name]="'${preset}'"
      animation="${animation}"
      theme="${theme}"
    ></veil-skeleton>
  \`
})
export class MyComponent {}`;

    case 'element':
      return `<!-- Web Component: Zero wrappers, works in Solid, Qwik, HTMX, HTML -->
<veil-skeleton
  preset="${preset}"
  animation="${animation}"
  theme="${theme}"
  speed="${speed}ms"
  radius="${radius}px"
></veil-skeleton>

<script type="module" src="https://unpkg.com/veilkit/dist/element/index.js"></script>`;

    case 'native':
      return `import { Skeleton, SkeletonGroup } from 'veilkit/native';

export default function CardSkeleton() {
  return (
    <SkeletonGroup>
      <Skeleton height={180} radius={${radius}} animation="${animation}" theme="${theme}" />
      <Skeleton height={20} width="80%" radius={4} style={{ marginTop: 12 }} />
      <Skeleton height={14} width="50%" radius={4} style={{ marginTop: 8 }} />
    </SkeletonGroup>
  );
}`;

    case 'vanilla':
    default:
      return `<!-- HTML + Vanilla JS -->
<div id="loader"></div>

<script src="https://unpkg.com/veilkit/dist/veilkit.min.js"></script>
<script>
  const el = Veilkit.createPreset({
    name: '${preset}',
    animation: '${animation}',
    theme: '${theme}',
    speed: '${speed}ms',
    radius: '${radius}px'
  });
  document.getElementById('loader').appendChild(el);
</script>`;
  }
}

function renderCode() {
  const codeBlock = document.getElementById('generated-code');
  if (codeBlock) {
    codeBlock.textContent = generateCode();
  }
}

function renderSpinnersGallery() {
  const gallery = document.getElementById('spinners-gallery');
  if (!gallery || typeof Veilkit === 'undefined') return;
  gallery.innerHTML = '';

  SPINNERS.forEach((type) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';

    const spinner = Veilkit.createSpinner({ type, size: 38, color: '#38bdf8' });
    const title = document.createElement('div');
    title.className = 'gallery-card-title';
    title.textContent = type;

    card.append(spinner, title);
    gallery.appendChild(card);
  });
}

function renderThemesGallery() {
  const gallery = document.getElementById('themes-gallery');
  if (!gallery || typeof Veilkit === 'undefined') return;
  gallery.innerHTML = '';

  THEMES.forEach((theme) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';

    const preview = Veilkit.createSkeletonElement({
      type: 'rect',
      width: '100%',
      height: 60,
      radius: 8,
      theme,
      animation: 'shimmer',
    });

    const title = document.createElement('div');
    title.className = 'gallery-card-title';
    title.textContent = theme;

    card.append(preview, title);
    gallery.appendChild(card);
  });
}

function setupEventListeners() {
  document.getElementById('select-preset').addEventListener('change', (e) => {
    state.preset = e.target.value;
    renderPreview();
    renderCode();
  });

  document.getElementById('select-anim').addEventListener('change', (e) => {
    state.animation = e.target.value;
    renderPreview();
    renderCode();
  });

  document.getElementById('select-theme').addEventListener('change', (e) => {
    state.theme = e.target.value;
    renderPreview();
    renderCode();
  });

  document.getElementById('input-speed').addEventListener('input', (e) => {
    state.speed = parseInt(e.target.value, 10);
    document.getElementById('val-speed').textContent = `${state.speed}ms`;
    renderPreview();
    renderCode();
  });

  document.getElementById('input-radius').addEventListener('input', (e) => {
    state.radius = parseInt(e.target.value, 10);
    document.getElementById('val-radius').textContent = `${state.radius}px`;
    renderPreview();
    renderCode();
  });

  // Framework tabs
  document.querySelectorAll('.framework-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.framework-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      state.framework = tab.dataset.fw;
      renderCode();
    });
  });

  // Copy button
  const copyBtn = document.getElementById('copy-code-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(generateCode()).then(() => {
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy Code';
        }, 2000);
      });
    });
  }

  // Site theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      state.siteTheme = state.siteTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-site-theme', state.siteTheme);
      themeToggle.textContent = state.siteTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
    });
  }
}

window.addEventListener('DOMContentLoaded', init);
