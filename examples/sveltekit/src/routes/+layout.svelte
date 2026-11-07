<script lang="ts">
  import 'veilkit/styles.css';
  import { setupSvelteKitProgress } from 'veilkit/svelte';
  import { beforeNavigate, afterNavigate } from '$app/navigation';

  setupSvelteKitProgress(beforeNavigate, afterNavigate);
</script>

<slot />
