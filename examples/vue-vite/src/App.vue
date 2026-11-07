<script setup lang="ts">
import { ref } from 'vue';
import { useProgress } from 'veilkit/vue';

const loading = ref(true);
const btnLoading = ref(false);
const progress = useProgress();

function handleAsync() {
  btnLoading.value = true;
  setTimeout(() => {
    btnLoading.value = false;
  }, 1500);
}
</script>

<template>
  <div style="max-width: 800px; margin: 40px auto; font-family: sans-serif; padding: 20px;">
    <h1>Veilkit + Vue 3 Example</h1>

    <div style="display: flex; gap: 12px; margin-bottom: 24px;">
      <button @click="loading = !loading">Toggle v-veil</button>
      <button @click="progress.start()">Start Route Progress</button>
      <VLoadingButton :loading="btnLoading" loading-text="Saving…" @click="handleAsync">
        Submit Action
      </VLoadingButton>
    </div>

    <h2>1. Skeleton Primitives</h2>
    <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 24px;">
      <VSkeleton circle width="50px" height="50px" animation="aurora" />
      <VSkeleton type="line" width="200px" height="20px" animation="shimmer" />
      <VSpinner type="ios-activity" size="32px" />
    </div>

    <h2>2. v-veil Directive (Auto-Measure)</h2>
    <div v-veil="loading" style="padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h3>Dynamic Vue Dashboard Card</h3>
      <p>This content is automatically measured and covered using <code>v-veil="loading"</code>.</p>
      <button style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px;">
        Action
      </button>
    </div>
  </div>
</template>
