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
  <SegmentedSwitch v-model="settings.mode" :options="options" :label="$t('mode.label')" />
</template>
