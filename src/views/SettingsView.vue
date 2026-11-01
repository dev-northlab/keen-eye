<script setup lang="ts">
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import ScreenHeader from '../components/ScreenHeader.vue'
import SettingsPanel from '../components/SettingsPanel.vue'
</script>

<template>
  <div class="screen">
    <ScreenBackdrop theme="sea" under-header />
    <ScreenHeader :title="$t('settings.title')" />
    <SettingsPanel />
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
