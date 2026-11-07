import React, { useState } from 'react';
import {
  Skeleton,
  Veil,
  SkeletonPreset,
  Spinner,
  ProgressBar,
  Overlay,
  LoadingButton,
  useProgress,
} from 'veilkit/react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const progress = useProgress();

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', fontFamily: 'sans-serif', padding: 20 }}>
      <h1>Veilkit + React Vite Example</h1>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button onClick={() => setLoading(!loading)}>Toggle Loading State</button>
        <button onClick={() => progress.start()}>Trigger Route Progress</button>
        <button onClick={() => setOverlayVisible(!overlayVisible)}>Toggle Overlay</button>
        <LoadingButton
          loading={btnLoading}
          loadingText="Submitting..."
          onClick={() => {
            setBtnLoading(true);
            setTimeout(() => setBtnLoading(false), 2000);
          }}
        >
          Click Async Button
        </LoadingButton>
      </div>

      <h2>1. Ready-Made Presets (Card Grid)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <SkeletonPreset name="product-card" animation="shimmer" theme="glass" />
        <SkeletonPreset name="product-card" animation="wave" theme="ios" />
        <SkeletonPreset name="product-card" animation="aurora" theme="neon" />
      </div>

      <h2>2. Auto-Measure Wrapper</h2>
      <Veil loading={loading} reveal="fade" cacheKey="profile-preview">
        <div style={{ padding: 24, border: '1px solid #e2e8f0', borderRadius: 12 }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
            alt="Profile"
            style={{ width: 64, height: 64, borderRadius: '50%' }}
          />
          <h3>Jane Doe</h3>
          <p>Staff UI Systems Engineer & Motion Designer</p>
          <button style={{ padding: '8px 16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6 }}>
            Follow
          </button>
        </div>
      </Veil>

      <h2>3. Spinners & Progress</h2>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
        <Spinner type="ring" size={28} />
        <Spinner type="ios-activity" size={28} />
        <Spinner type="glass-orb" size={28} />
        <Spinner type="morph" size={28} />
      </div>
      <ProgressBar value={72} showPercentage />

      <Overlay visible={overlayVisible} message="Please wait, updating server…" blur />
    </div>
  );
}
