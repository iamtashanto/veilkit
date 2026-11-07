import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veilkit — Every loading state, beautifully. One package, every framework.",
  description: "Production-grade, zero-dependency loading & skeleton UI toolkit. 45+ presets, 30 spinners, 30 GPU animations, 16 button styles, anti-flicker timing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-[#f8fafc] font-sans">
        {children}
      </body>
    </html>
  );
}
