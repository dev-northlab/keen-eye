<script setup lang="ts">
import ScreenHeader from '../components/ScreenHeader.vue'
import SettingsPanel from '../components/SettingsPanel.vue'
</script>

<template>
  <div class="screen">
    <ScreenHeader :title="$t('settings.title')" />
    <SettingsPanel />
  </div>
</template>

<style scoped>
.screen {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
