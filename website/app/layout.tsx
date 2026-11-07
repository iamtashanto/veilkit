import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://veilkit.tashanto.com"),
  title: {
    default: "Veilkit — Every loading state, beautifully. One package, every framework.",
    template: "%s | Veilkit Loading & Skeleton UI Toolkit",
  },
  description:
    "Zero-dependency loading & skeleton UI toolkit for React, Next.js, Vue 3, Nuxt, Svelte 5, Angular 17-19, React Native & Web Components. 45+ responsive presets, 30 GPU-composited spinners, 30 animations, 16 stateful button styles, anti-flicker delay timers, and custom skeleton builder.",
  keywords: [
    "skeleton loading",
    "skeleton ui",
    "react skeleton loader",
    "nextjs skeleton component",
    "vue skeleton loading",
    "nuxt loading placeholder",
    "svelte skeleton loader",
    "angular skeleton loading",
    "react native skeleton",
    "expo skeleton loader",
    "web components skeleton",
    "loading spinner",
    "anti-flicker skeleton",
    "loading button state machine",
    "react-loading-skeleton alternative",
    "react-content-loader alternative",
    "nprogress alternative",
    "shadcn skeleton alternative",
    "zero dependency ui",
    "gpu animated skeleton",
  ],
  authors: [{ name: "Md Tanvir Ahamed Shanto", url: "https://github.com/iamtashanto" }],
  creator: "Md Tanvir Ahamed Shanto",
  publisher: "Veilkit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://veilkit.tashanto.com",
    title: "Veilkit — Every loading state, beautifully. One package, every framework.",
    description:
      "Production-grade, zero-dependency universal loading & skeleton UI toolkit. 45+ responsive presets, 30 GPU spinners, 30 animations, anti-flicker delay, and multi-framework parity.",
    siteName: "Veilkit",
    images: [
      {
        url: "/assets/demo-hero.gif",
        width: 1200,
        height: 630,
        alt: "Veilkit Live Skeleton & Loading Demo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veilkit — Every loading state, beautifully.",
    description:
      "Zero-dependency loading & skeleton UI toolkit. React, Vue, Svelte, Angular, Native, Web Components.",
    creator: "@iamtashanto",
    images: ["/assets/demo-hero.gif"],
  },
  alternates: {
    canonical: "https://veilkit.tashanto.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-[#f8fafc] font-sans selection:bg-sky-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
