<script setup lang="ts">
// Developer mode's testing tools, opened from Settings.
import ModalDialog from './ModalDialog.vue'
import { useBackButton } from '../services/backButton.ts'
import { useProgressStore } from '../stores/progress.ts'
import { usePurchaseStore } from '../stores/purchase.ts'
import { useSettingsStore } from '../stores/settings.ts'

const emit = defineEmits<{ close: [] }>()
const progress = useProgressStore()
const purchase = usePurchaseStore()
const settings = useSettingsStore()
/** The stub "store" exists only in `npm run dev` (services/purchases.ts). */
const isDev = import.meta.env.DEV

// Android back closes the dialog.
useBackButton(() => emit('close'))

function turnOff() {
  settings.developer = false
  emit('close')
}
</script>

<template>
  <ModalDialog :title="$t('settings.dev')">
    <div class="dev-tools">
      <label class="dev">
        <input v-model="progress.devOpenAll" type="checkbox" />
        {{ $t('home.devOpenAll') }}
      </label>
      <button class="secondary" @click="progress.unlockAll()">{{ $t('settings.unlockAll') }}</button>
      <button class="secondary" @click="purchase.resetForDev(false)">{{ $t('settings.resetPurchaseCache') }}</button>
      <button v-if="isDev" class="secondary" @click="purchase.resetForDev(true)">{{ $t('settings.resetPurchaseStore') }}</button>
      <button class="secondary" @click="progress.reset()">{{ $t('settings.resetProgress') }}</button>
      <!-- The hidden keys show on the pictures again. -->
      <button class="secondary" @click="progress.resetKeys()">{{ $t('settings.resetKeys') }}</button>
      <button class="secondary" @click="turnOff">{{ $t('settings.devOff') }}</button>
      <button @click="emit('close')">{{ $t('common.close') }}</button>
    </div>
  </ModalDialog>
</template>

<style scoped>
.dev-tools {
  display: grid;
  gap: 8px;
}

.dev-tools button {
  width: 100%;
  font-size: 18px;
}

.dev {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
}

.dev input {
  width: 22px;
  height: 22px;
  accent-color: var(--accent);
}
</style>
