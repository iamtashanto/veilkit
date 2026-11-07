'use client';

import { useState } from 'react';
import { SkeletonPreset, Spinner, LoadingButton, Overlay, Veil } from 'veilkit/react';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <main style={{ maxWidth: 960, margin: '40px auto', padding: 20, fontFamily: 'system-ui' }}>
      <h1>Veilkit in Next.js 14/15 App Router</h1>
      <p>Works with Server Components, Suspense fallbacks, and client-side hydration.</p>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button onClick={() => setLoading(!loading)}>Toggle Skeleton</button>
        <LoadingButton
          loading={btnLoading}
          loadingText="Saving Server Action…"
          onClick={() => {
            setBtnLoading(true);
            setTimeout(() => setBtnLoading(false), 1500);
          }}
        >
          Server Action Button
        </LoadingButton>
      </div>

      <Veil loading={loading} reveal="blur-in">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <div style={{ padding: 20, border: '1px solid #ddd', borderRadius: 10 }}>
            <h3>Revenue</h3>
            <p style={{ fontSize: 28, fontWeight: 'bold' }}>$48,250</p>
          </div>
          <div style={{ padding: 20, border: '1px solid #ddd', borderRadius: 10 }}>
            <h3>Active Users</h3>
            <p style={{ fontSize: 28, fontWeight: 'bold' }}>1,420</p>
          </div>
          <div style={{ padding: 20, border: '1px solid #ddd', borderRadius: 10 }}>
            <h3>Conversion</h3>
            <p style={{ fontSize: 28, fontWeight: 'bold' }}>4.8%</p>
          </div>
        </div>
      </Veil>
    </main>
  );
}
