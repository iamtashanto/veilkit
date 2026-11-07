import 'veilkit/styles.css';
import { RouteProgress } from 'veilkit/react';

export const metadata = {
  title: 'Veilkit Next.js App Router Example',
  description: 'Production loading states and skeletons in Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RouteProgress color="#3b82f6" />
        {children}
      </body>
    </html>
  );
}
