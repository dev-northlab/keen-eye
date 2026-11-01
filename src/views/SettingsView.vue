<script setup lang="ts">
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import BackButton from '../components/BackButton.vue'
import SettingsPanel from '../components/SettingsPanel.vue'
</script>

<template>
  <div class="screen">
    <ScreenBackdrop theme="sea" />
    <SettingsPanel />
    <BackButton />
  </div>
</template>

<style scoped>
.screen {
  /* Own stacking context: the backdrop (z-index -1) stays behind the content. */
  position: relative;
  isolation: isolate;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
