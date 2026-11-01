<script setup lang="ts">
import ModalDialog from './ModalDialog.vue'

defineEmits<{ resume: []; restart: []; settings: []; exit: [] }>()
</script>

<template>
  <ModalDialog :title="$t('pause.title')">
    <div class="actions">
      <button @click="$emit('resume')">{{ $t('pause.resume') }}</button>
      <button class="secondary" @click="$emit('restart')">{{ $t('pause.restart') }}</button>
      <button class="secondary" @click="$emit('settings')">{{ $t('settings.title') }}</button>
      <button class="secondary" @click="$emit('exit')">{{ $t('pause.exit') }}</button>
    </div>
  </ModalDialog>
</template>

<style scoped>
.actions {
  display: grid;
  gap: 8px;
}
</style>
