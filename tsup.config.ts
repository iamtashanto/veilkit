import { defineConfig } from 'tsup';

export default defineConfig([
  // Main library subpath entries (ESM + CJS + DTS)
  {
    entry: {
      index: 'src/index.ts',
      'react/index': 'src/react/index.ts',
      'vue/index': 'src/vue/index.ts',
      'svelte/index': 'src/svelte/index.ts',
      'angular/index': 'src/angular/index.ts',
      'element/index': 'src/element/index.ts',
      'native/index': 'src/native/index.tsx',
      'themes/index': 'src/themes/index.ts',
      'cli/index': 'src/cli/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    sourcemap: true,
    treeshake: true,
    splitting: false,
    minify: true,
    external: [
      'react',
      'react-dom',
      'vue',
      'svelte',
      '@angular/core',
      '@angular/common',
      '@angular/router',
      'rxjs',
      'react-native',
      'expo-linear-gradient',
      'react-native-reanimated',
    ],
  },
  // Standalone IIFE / CDN build with global `Veilkit`
  {
    entry: {
      veilkit: 'src/index.ts',
    },
    format: ['iife'],
    globalName: 'Veilkit',
    minify: true,
    sourcemap: false,
    outDir: 'dist',
    outExtension() {
      return {
        js: '.min.js',
      };
    },
  },
]);
