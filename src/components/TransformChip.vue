<script setup lang="ts">
// Picture B of the level is shown mirrored or turned (docs/mirror-rotate-feature.md): a badge in the HUD for
// the whole level. Tapping it shows B as drawn (`off`) and back.
import type { PictureTransform } from '../engine/transform.ts'
import TransformIcon from './TransformIcon.vue'

defineProps<{ transform: PictureTransform; off?: boolean }>()
defineEmits<{ click: [] }>()
</script>

<template>
  <button type="button" class="transform-chip" :class="{ off }" :aria-pressed="!off" @click="$emit('click')">
    <span class="badge"><TransformIcon :transform="transform" /></span>
    <span class="label">{{ $t(`level.transformB.${transform}`) }}</span>
  </button>
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
  line-height: inherit;
  vertical-align: 1px;
  transition: opacity 0.15s;
}

.transform-chip:active {
  transform: scale(0.95);
}

/* Picture B is shown as drawn: the badge fades and its name is crossed out. */
.transform-chip.off {
  opacity: 0.55;
}

.transform-chip.off .label {
  text-decoration: line-through;
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
