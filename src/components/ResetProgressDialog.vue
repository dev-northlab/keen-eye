<script setup lang="ts">
// Asks before forgetting the player's progress: stars, records, keys, eras, solved cases and the match history.
// The purchase and the settings stay.
import ModalDialog from './ModalDialog.vue'
import { useBackButton } from '../services/backButton.ts'
import { useDuoStore } from '../stores/duo.ts'
import { useProgressStore } from '../stores/progress.ts'

const emit = defineEmits<{ close: [] }>()
const progress = useProgressStore()
const duo = useDuoStore()

// Android back closes the dialog.
useBackButton(() => emit('close'))

async function reset() {
  await Promise.all([progress.reset(), duo.clearHistory()])
  emit('close')
}
</script>

<template>
  <ModalDialog :title="$t('settings.resetProgress')">
    <p>{{ $t('settings.resetProgressText') }}</p>
    <!-- Cancel comes first: the dialog focuses its first button. -->
    <div class="actions">
      <button class="secondary" @click="emit('close')">{{ $t('common.cancel') }}</button>
      <button class="danger" @click="reset">{{ $t('settings.resetProgressConfirm') }}</button>
    </div>
  </ModalDialog>
</template>

<style scoped>
p {
  margin: 0 0 18px;
  line-height: 1.45;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.danger {
  background: var(--danger);
}
</style>
