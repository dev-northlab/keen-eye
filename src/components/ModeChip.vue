<script setup lang="ts">
// The mode of a level attempt in its HUD (docs/difficulty-modes.md), in the colour of the mode switch.
import type { GameMode } from '../engine/rules.ts'

defineProps<{ mode: GameMode }>()
</script>

<template>
  <span class="mode-chip" :style="{ background: `var(--mode-${mode})` }">{{ $t(`mode.${mode}`) }}</span>
</template>

<style scoped>
.mode-chip {
  margin-inline-start: 6px;
  padding: 2px 8px;
  border-radius: 999px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  vertical-align: 1px;
}
</style>
