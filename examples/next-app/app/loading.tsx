import { SkeletonPreset } from 'veilkit/react';

export default function Loading() {
  return (
    <div style={{ maxWidth: 960, margin: '40px auto', padding: 20 }}>
      <SkeletonPreset name="dashboard" animation="shimmer" theme="glass" />
    </div>
  );
}
