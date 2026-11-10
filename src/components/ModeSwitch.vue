<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { GAME_MODES, useSettingsStore } from '../stores/settings.ts'
import SegmentedSwitch from './SegmentedSwitch.vue'

const settings = useSettingsStore()
const { t } = useI18n()
const options = computed(() => GAME_MODES.map((m) => ({ value: m, label: t(`mode.${m}`), tone: `var(--mode-${m})` })))
</script>

<template>
  <SegmentedSwitch v-model="settings.mode" :options="options" :label="$t('mode.label')">
    <!-- Calm: a feather; normal: a star. White on the chosen button, in the mode's colour otherwise. -->
    <template #icon="{ value, active }">
      <svg class="mode-icon" :class="{ active }" :style="{ color: active ? '#fff' : `var(--mode-${value})` }" viewBox="0 0 24 24" aria-hidden="true">
        <template v-if="value === 'calm'">
          <path d="M20 4C12 4 6.5 9 6 16.5L4.5 19.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <path d="M20 4c.5 7.5-4.5 13-12.5 13 1-6 5-10.5 12.5-13Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
        </template>
        <path
          v-else
          d="M12 2.8l2.8 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17l-5.7 3.1 1.2-6.3-4.6-4.4 6.3-.8Z"
          fill="currentColor"
          fill-opacity="0.25"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linejoin="round"
        />
      </svg>
    </template>
  </SegmentedSwitch>
</template>

<style scoped>
.mode-icon {
  flex: none;
  width: 20px;
  height: 20px;
}

.mode-icon.active {
  filter: drop-shadow(0 1px 0 rgb(0 0 0 / 0.25));
}
</style>
