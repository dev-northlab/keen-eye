<script setup lang="ts">
// Icon of a mirrored (mirror-x) or turned picture B (docs/mirror-rotate-feature.md).
import type { PictureTransform } from '../engine/transform.ts'

defineProps<{ transform: PictureTransform }>()
</script>

<template>
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <template v-if="transform === 'mirror-x'">
      <path d="M12 3v18" stroke="currentColor" stroke-width="2" stroke-dasharray="2.5 2.5" />
      <path d="M9 7L3 17h6Z M15 7l6 10h-6Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
    </template>
    <template v-else>
      <path d="M19 12a7 7 0 1 1-2.05-4.95" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
      <path d="M18.5 3v5h-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
    </template>
  </svg>
</template>
