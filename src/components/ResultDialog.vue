<script setup lang="ts">
import { MODE_RULES, type GameMode } from '../engine/rules.ts'
import type { LevelResult } from '../engine/types.ts'
import { onBeforeUnmount, onMounted } from 'vue'
import { playSfx } from '../services/audio.ts'
import ModalDialog from './ModalDialog.vue'
import ShareButton from './ShareButton.vue'
import StarRating from './StarRating.vue'

/**
 * `mode` of the attempt: yellow stars in normal mode, red ones in hard mode, none in calm mode. `failed`: lost
 * on too many mistakes (hard mode). `offerHard`: a "Play on hard" button (the level has fewer than 3 red stars).
 * `shareText`: shows a "Share" button under the actions with this message.
 */
const props = defineProps<{
  result: LevelResult
  mode: GameMode
  failed?: boolean
  time: string
  hasNext: boolean
  offerHard?: boolean
  shareText?: string
}>()
defineEmits<{ next: []; retry: []; menu: []; hard: [] }>()

// A chime per star, in step with StarRating's pop-in (0.25 s apart).
const timers: number[] = []
onMounted(() => {
  if (props.mode === 'calm' || props.failed) return
  for (let i = 0; i < props.result.stars; i++) timers.push(window.setTimeout(() => playSfx('star', i), 300 + i * 250))
})
onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<template>
  <ModalDialog :title="failed ? $t('level.failed') : $t('level.complete')">
    <p v-if="mode === 'calm'">{{ $t('level.calmDone') }}</p>
    <template v-else>
      <p v-if="failed">{{ $t('level.failedHint', { n: MODE_RULES[mode].maxMistakes }) }}</p>
      <template v-else>
        <StarRating :stars="result.stars" :size="48" :red="mode === 'hard'" animated />
        <p v-if="mode === 'hard'" class="hard-done">{{ $t('level.hardDone') }}</p>
      </template>
      <p>{{ $t('level.time', { t: time }) }} · {{ $t('level.mistakes', { n: result.mistakes }) }}</p>
    </template>
    <!-- Extra content of a mode, e.g. the facts of "find the odd one out"; a lost level has none. -->
    <slot v-if="!failed" />
    <div class="actions">
      <button v-if="hasNext" @click="$emit('next')">{{ $t('level.next') }}</button>
      <button class="secondary" @click="$emit('retry')">{{ $t('level.retry') }}</button>
      <button class="secondary" @click="$emit('menu')">{{ $t('level.menu') }}</button>
    </div>
    <button v-if="offerHard" class="hard" @click="$emit('hard')"><span aria-hidden="true">★</span> {{ $t('level.playHard') }}</button>
    <ShareButton v-if="shareText && !failed" class="share" :text="shareText" />
  </ModalDialog>
</template>

<style scoped>
.hard-done {
  margin: 0;
  font-weight: 700;
  color: var(--star-hard);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

/* The same level again in hard mode, for its red stars. */
.hard {
  margin-top: 10px;
  background: var(--mode-hard);
  color: #fff;
}

/* Below the actions and lighter than them, so it never takes "Next"'s place. */
.share {
  margin-top: 16px;
}
</style>
