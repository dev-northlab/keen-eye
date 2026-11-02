<script setup lang="ts">
import type { LevelResult } from '../engine/types.ts'
import { onBeforeUnmount, onMounted } from 'vue'
import { playSfx } from '../services/audio.ts'
import ModalDialog from './ModalDialog.vue'
import StarRating from './StarRating.vue'

const props = defineProps<{ result: LevelResult; calm: boolean; time: string; hasNext: boolean }>()
defineEmits<{ next: []; retry: []; menu: [] }>()

// A chime per star, in step with StarRating's pop-in (0.25 s apart).
const timers: number[] = []
onMounted(() => {
  if (props.calm) return
  for (let i = 0; i < props.result.stars; i++) timers.push(window.setTimeout(() => playSfx('star', i), 300 + i * 250))
})
onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<template>
  <ModalDialog :title="$t('level.complete')">
    <p v-if="calm">{{ $t('level.calmDone') }}</p>
    <template v-else>
      <StarRating :stars="result.stars" :size="48" animated />
      <p>{{ $t('level.time', { t: time }) }} · {{ $t('level.mistakes', { n: result.mistakes }) }}</p>
    </template>
    <!-- Extra content of a mode, e.g. the facts of "find the odd one out". -->
    <slot />
    <div class="actions">
      <button v-if="hasNext" @click="$emit('next')">{{ $t('level.next') }}</button>
      <button class="secondary" @click="$emit('retry')">{{ $t('level.retry') }}</button>
      <button class="secondary" @click="$emit('menu')">{{ $t('level.menu') }}</button>
    </div>
  </ModalDialog>
</template>

<style scoped>
.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}
</style>
