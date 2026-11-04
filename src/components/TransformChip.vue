<script setup lang="ts">
// Picture B of the level is shown mirrored or turned (docs/mirror-rotate-feature.md): a badge in the HUD for
// the whole level.
import type { PictureTransform } from '../engine/transform.ts'
import TransformIcon from './TransformIcon.vue'

defineProps<{ transform: PictureTransform }>()
</script>

<template>
  <span class="transform-chip">
    <span class="badge"><TransformIcon :transform="transform" /></span>
    {{ $t(`level.transformB.${transform}`) }}
  </span>
</template>

<style scoped>
.transform-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-inline-start: 6px;
  padding: 1px 9px 1px 2px;
  border-radius: 999px;
  border: 1px solid var(--twist-line);
  background: var(--twist-bg);
  color: var(--twist);
  font-size: 13px;
  font-weight: 700;
  vertical-align: 1px;
}

/* The icon in a round coin of the badge's colour. */
.badge {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--twist);
  color: var(--twist-bg);
}

.badge :deep(svg) {
  width: 12px;
  height: 12px;
}
</style>
