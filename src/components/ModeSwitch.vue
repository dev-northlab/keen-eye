<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore, type GameMode } from '../stores/settings.ts'
import SegmentedSwitch from './SegmentedSwitch.vue'

const settings = useSettingsStore()
const { t } = useI18n()
const MODES: GameMode[] = ['normal', 'calm']
const options = computed(() => MODES.map((m) => ({ value: m, label: t(`mode.${m}`) })))
</script>

<template>
  <SegmentedSwitch v-model="settings.mode" :options="options" :label="$t('mode.label')" />
</template>
