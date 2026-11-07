<script lang="ts">
  import { veil, skeletonAction, spinnerAction } from 'veilkit/svelte';

  let loading = true;
</script>

<main style="max-width: 800px; margin: 40px auto; font-family: sans-serif; padding: 20px;">
  <h1>Veilkit + Svelte 4/5 Example</h1>

  <button on:click={() => (loading = !loading)} style="margin-bottom: 24px; padding: 8px 16px;">
    Toggle use:veil
  </button>

  <h2>1. Svelte Action (use:veil)</h2>
  <div use:veil={{ loading, reveal: 'fade' }} style="padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
    <h3>Svelte User Card</h3>
    <p>This box is measured and masked with synchronized shimmers while loading.</p>
    <button>Action</button>
  </div>

  <h2>2. Svelte Elements</h2>
  <div style="display: flex; gap: 16px; align-items: center; margin-top: 24px;">
    <div use:skeletonAction={{ width: 180, height: 24, animation: 'pulse' }}></div>
    <div use:spinnerAction={{ type: 'orbit', size: 32 }}></div>
  </div>
</main>
