<script setup lang="ts">
import BackButton from './BackButton.vue'
import ScreenBackdrop from './ScreenBackdrop.vue'
import SettingsPanel from './SettingsPanel.vue'

// Settings opened from a pause menu, over the paused game, so the attempt survives.
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <div class="settings-screen">
    <ScreenBackdrop theme="meadow" />
    <SettingsPanel />
    <BackButton :on-back="() => emit('close')" />
  </div>
</template>

<style scoped>
.settings-screen {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  /* Fixed, so the #app safe-area padding does not apply. */
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  background: var(--bg);
}
</style>
