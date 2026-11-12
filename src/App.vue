<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import LockedLevelDialog from './components/LockedLevelDialog.vue'
import PurchaseDialog from './components/PurchaseDialog.vue'
import { playMusic } from './services/audio.ts'
import { useProgressStore } from './stores/progress.ts'
import { usePurchaseStore } from './stores/purchase.ts'

const route = useRoute()
const purchase = usePurchaseStore()
const progress = useProgressStore()
// Menu screens share the menu track ("tiny boy" has its own); the level and match screens pick their own music.
watch(
  () => route.name,
  (name) => {
    if (name !== 'level' && name !== 'match') playMusic(name === 'tiny-boy' ? 'tinyBoy' : 'menu')
  },
  { immediate: true },
)
</script>

<template>
  <!-- Keyed by path so that switching levels remounts the level screen. -->
  <RouterView :key="$route.fullPath" />
  <!-- The full-game offer opens over any screen: a locked level, settings, the pause menu. -->
  <!-- "Complete … first": a tap on a level not reached yet, in any level list. -->
  <LockedLevelDialog v-if="progress.lockedLevelId !== null" />
  <PurchaseDialog v-if="purchase.dialogOpen" />
</template>
