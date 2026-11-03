<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import PurchaseDialog from './components/PurchaseDialog.vue'
import { playMusic } from './services/audio.ts'
import { usePurchaseStore } from './stores/purchase.ts'

const route = useRoute()
const purchase = usePurchaseStore()
// Menu screens share the menu track; the level and match screens pick their own music.
watch(
  () => route.name,
  (name) => {
    if (name !== 'level' && name !== 'match') playMusic('menu')
  },
  { immediate: true },
)
</script>

<template>
  <!-- Keyed by path so that switching levels remounts the level screen. -->
  <RouterView :key="$route.fullPath" />
  <!-- The full-game offer opens over any screen: a locked level, settings, the pause menu. -->
  <PurchaseDialog v-if="purchase.dialogOpen" />
</template>
