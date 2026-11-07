<script lang="ts">
  import { veil } from 'veilkit/svelte';
  let loading = false;
</script>

<main style="max-width: 800px; margin: 40px auto; padding: 20px; font-family: system-ui;">
  <h1>Veilkit SvelteKit Route Progress & Skeleton Demo</h1>
  <button on:click={() => (loading = !loading)}>Toggle Loader</button>
  <div use:veil={{ loading }} style="margin-top: 20px; padding: 20px; border: 1px solid #ccc;">
    <h2>Data from load() function</h2>
    <p>Navigating between pages automatically triggers top route progress.</p>
  </div>
</main>
