<script setup lang="ts">
import ModalDialog from './ModalDialog.vue'
import SettingsPanel from './SettingsPanel.vue'

// Settings opened from a pause menu: a dialog over the paused game, so the attempt survives.
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <ModalDialog class="settings-dialog" :title="$t('settings.title')">
    <SettingsPanel class="panel" />
    <button class="close" @click="emit('close')">{{ $t('common.close') }}</button>
  </ModalDialog>
</template>

<style scoped>
/* Wider than other dialogs (the volume sliders and the mode switch need room); the list scrolls, the title and Close stay. */
.settings-dialog :deep(.card) {
  width: min(100%, 440px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* Less room around the list than other dialogs: the rows have their own padding. */
  padding: 20px 14px 14px;
}

.panel {
  min-height: 0;
  /* The list's own column padding is the dialog's here; a little room keeps focus rings unclipped. */
  margin: 0 -8px;
  padding: 0 8px;
  text-align: start;
}

/* Rows of the list stand out from the dialog's own panel colour, a little tighter than on the Settings screen. */
.panel :deep(.row) {
  background: var(--soft-2);
  padding: 10px 12px;
}

.close {
  flex: none;
  margin-top: 14px;
}
</style>
