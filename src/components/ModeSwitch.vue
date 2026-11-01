<script setup lang="ts">
import { useSettingsStore, type GameMode } from '../stores/settings.ts'

const settings = useSettingsStore()
const MODES: GameMode[] = ['normal', 'calm']
</script>

<template>
  <div class="mode" role="radiogroup" :aria-label="$t('mode.label')">
    <button
      v-for="m in MODES"
      :key="m"
      role="radio"
      :aria-checked="settings.mode === m"
      :class="{ active: settings.mode === m }"
      @click="settings.mode = m"
    >
      {{ $t(`mode.${m}`) }}
    </button>
  </div>
</template>

<style scoped>
.mode {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  padding: 4px;
  border-radius: 14px;
  background: #dfe7e2;
}

button {
  padding: 10px 12px;
  background: transparent;
  color: var(--fg);
}

button.active {
  background: var(--panel);
  font-weight: 600;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.15);
}
</style>
