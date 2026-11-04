<script setup lang="ts">
// Before the first level with a mirrored or turned picture B (docs/mirror-rotate-feature.md): the level waits,
// its clock stopped, until the player closes this.
import type { PictureTransform } from '../engine/transform.ts'
import { useBackButton } from '../services/backButton.ts'
import ModalDialog from './ModalDialog.vue'
import TransformIcon from './TransformIcon.vue'

defineProps<{ transform: PictureTransform }>()
const emit = defineEmits<{ close: [] }>()

// Android back starts the level too.
useBackButton(() => emit('close'))
</script>

<template>
  <ModalDialog :title="$t(`level.transformNotice.${transform}`)">
    <template #icon><span class="coin"><TransformIcon :transform="transform" /></span></template>
    <button class="play" @click="emit('close')">{{ $t('home.play') }}</button>
  </ModalDialog>
</template>

<style scoped>
.play {
  width: 100%;
}

/* The badge's colours (TransformChip) over the dialog's round icon place. */
.coin {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--twist-bg);
  box-shadow: inset 0 0 0 2px var(--twist-line);
  color: var(--twist);
}

.coin :deep(svg) {
  width: 34px;
  height: 34px;
}
</style>
