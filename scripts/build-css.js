import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getStylesCSS } from '../src/core/css.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const css = getStylesCSS();
fs.writeFileSync(path.join(distDir, 'styles.css'), css.trim());
console.log('✓ Generated dist/styles.css (' + Buffer.byteLength(css, 'utf8') + ' bytes)');
