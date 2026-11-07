import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "veilkit/react": path.resolve(__dirname, "veilkit/react/index.ts"),
      "veilkit/themes": path.resolve(__dirname, "veilkit/themes/index.ts"),
      "veilkit/styles.css": path.resolve(__dirname, "app/veilkit.css"),
      "veilkit": path.resolve(__dirname, "veilkit/index.ts"),
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
