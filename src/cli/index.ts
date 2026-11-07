#!/usr/bin/env node

/**
 * Veilkit CLI
 * `npx veilkit capture <url> [--out .veil.json] [--selector "#app"]`
 * Records real DOM layouts with Playwright into static .veil.json files for zero-runtime measurement
 */

import fs from 'node:fs';
import path from 'node:path';

async function run() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '--help' || command === '-h') {
    console.log(`
Veilkit CLI - Zero-Runtime Static Skeleton Capture

Usage:
  npx veilkit capture <url> [options]

Options:
  --out <file>        Output file path (default: .veil.json)
  --selector <sel>    Target container CSS selector (default: body)
  --width <px>        Browser viewport width (default: 1280)
  --height <px>       Browser viewport height (default: 800)
  --help, -h          Show this help message

Example:
  npx veilkit capture https://example.com/dashboard --out ./dashboard.veil.json
`);
    process.exit(0);
  }

  if (command !== 'capture') {
    console.error(`Unknown command: "${command}". Try "npx veilkit capture --help"`);
    process.exit(1);
  }

  const targetUrl = args[1];
  if (!targetUrl || targetUrl.startsWith('--')) {
    console.error('Error: Please provide a URL to capture. Example: npx veilkit capture https://myapp.com');
    process.exit(1);
  }

  let outFile = '.veil.json';
  let selector = 'body';
  let width = 1280;
  let height = 800;

  for (let i = 2; i < args.length; i++) {
    if (args[i] === '--out' && args[i + 1]) {
      outFile = args[++i]!;
    } else if (args[i] === '--selector' && args[i + 1]) {
      selector = args[++i]!;
    } else if (args[i] === '--width' && args[i + 1]) {
      width = parseInt(args[++i]!, 10);
    } else if (args[i] === '--height' && args[i + 1]) {
      height = parseInt(args[++i]!, 10);
    }
  }

  console.log(`\n🕸️  Veilkit Capture: Launching browser for ${targetUrl}...`);

  let playwright: any;
  try {
    const pkgName = 'playwright';
    playwright = await import(/* @vite-ignore */ pkgName);
  } catch {
    console.error(`
[Veilkit CLI] Playwright is required for headless layout capture.
Please run:
  pnpm add -D playwright
and try again.
`);
    process.exit(1);
  }

  try {
    const browser = await playwright.chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width, height } });

    console.log(`Navigating to ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'networkidle' });

    console.log(`Analyzing leaf layouts on "${selector}"...`);
    const layout = await page.evaluate((targetSelector: string) => {
      const container = document.querySelector(targetSelector) || document.body;
      const cRect = container.getBoundingClientRect();
      const boxes: any[] = [];

      function walk(el: HTMLElement) {
        if (el.hasAttribute('data-veil-ignore')) return;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

        const tag = el.tagName.toLowerCase();
        const isLeaf = ['img', 'svg', 'button', 'input'].includes(tag) ||
          (Array.from(el.childNodes).some((n) => n.nodeType === Node.TEXT_NODE && (n.textContent || '').trim().length > 0) && el.children.length === 0);

        if (el !== container && isLeaf) {
          const r = el.getBoundingClientRect();
          if (r.width > 2 && r.height > 2) {
            const rad = style.borderRadius || '6px';
            const shape = (rad === '50%' || parseFloat(rad) >= r.width / 2) ? 'circle' : (['p', 'span', 'h1', 'h2', 'h3'].includes(tag) ? 'line' : 'rect');
            boxes.push({
              x: Math.round(r.left - cRect.left),
              y: Math.round(r.top - cRect.top),
              width: Math.round(r.width),
              height: Math.round(r.height),
              radius: rad,
              shape,
            });
          }
          return;
        }

        for (const child of Array.from(el.children)) {
          walk(child as HTMLElement);
        }
      }

      walk(container as HTMLElement);

      return {
        url: window.location.href,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        container: { width: Math.round(cRect.width), height: Math.round(cRect.height) },
        boxes,
      };
    }, selector);

    await browser.close();

    const resolvedPath = path.resolve(process.cwd(), outFile);
    fs.writeFileSync(resolvedPath, JSON.stringify(layout, null, 2), 'utf8');

    console.log(`✓ Successfully captured ${layout.boxes.length} layout elements!`);
    console.log(`📁 Saved layout map to: ${resolvedPath}\n`);
  } catch (err: any) {
    console.error(`[Veilkit CLI] Capture failed:`, err.message);
    process.exit(1);
  }
}

run();
