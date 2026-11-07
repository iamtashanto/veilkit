<script setup lang="ts">
import { ref } from 'vue';
import { VSkeleton, VSpinner } from 'veilkit/vue';

const loading = ref(true);
</script>

<template>
  <div style="max-width: 800px; margin: 40px auto; font-family: system-ui; padding: 20px;">
    <h1>Veilkit + Nuxt 3 SSR Example</h1>
    <p>Zero hydration mismatch with server-rendered markup.</p>

    <div style="display: flex; gap: 16px; align-items: center; margin-top: 24px;">
      <VSkeleton circle width="48px" height="48px" animation="pulse" />
      <VSkeleton type="heading" width="220px" height="24px" animation="wave" />
      <VSpinner type="glass-orb" size="32px" />
    </div>
  </div>
</template>
