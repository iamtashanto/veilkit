import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "veilkit/react": path.resolve(__dirname, "../src/react/index.ts"),
      "veilkit/vue": path.resolve(__dirname, "../src/vue/index.ts"),
      "veilkit/svelte": path.resolve(__dirname, "../src/svelte/index.ts"),
      "veilkit/angular": path.resolve(__dirname, "../src/angular/index.ts"),
      "veilkit/element": path.resolve(__dirname, "../src/element/index.ts"),
      "veilkit/themes": path.resolve(__dirname, "../src/themes/index.ts"),
      "veilkit/styles.css": path.resolve(__dirname, "../dist/styles.css"),
      "veilkit": path.resolve(__dirname, "../src/index.ts"),
    };
    return config;
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
