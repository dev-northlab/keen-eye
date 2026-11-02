<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { playMusic } from './services/audio.ts'

const route = useRoute()
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
</template>
