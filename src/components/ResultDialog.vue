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
 * `shareText`: shows a "Share" button under the actions with this message. `plain`: a level without modes or stars
 * ("tiny boy"): just a tick for the win.
 */
const props = defineProps<{
  result: LevelResult
  mode: GameMode
  failed?: boolean
  time: string
  hasNext: boolean
  offerHard?: boolean
  shareText?: string
  plain?: boolean
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
    <svg v-if="plain" class="won" viewBox="0 0 48 48" role="img" :aria-label="$t('map.won')">
      <circle cx="24" cy="24" r="22" fill="#3ec46d" />
      <path d="M14 25l7 7 13-15" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <p v-else-if="mode === 'calm'">{{ $t('level.calmDone') }}</p>
    <!-- Lost: the crosses of the mistakes in place of the stars, then on to another try. -->
    <template v-else-if="failed">
      <span class="misses" role="img" :aria-label="$t('level.mistakes', { n: result.mistakes })">
        <svg v-for="i in result.mistakes" :key="i" viewBox="0 0 24 24" :style="{ animationDelay: `${i * 0.2}s` }" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="#ff5d5d" stroke="#de3b3b" stroke-width="1.4" />
          <ellipse cx="8.4" cy="7.4" rx="3.2" ry="1.7" fill="#fff" fill-opacity="0.4" transform="rotate(-35 8.4 7.4)" />
          <path d="M8.6 8.6l6.8 6.8M15.4 8.6l-6.8 6.8" stroke="#fff" stroke-width="2.8" stroke-linecap="round" />
        </svg>
      </span>
      <p class="failed-hint">{{ $t('level.failedHint', { n: MODE_RULES[mode].maxMistakes }) }}</p>
      <p class="stats">{{ $t('level.time', { t: time }) }}</p>
    </template>
    <template v-else>
      <StarRating :stars="result.stars" :size="48" :red="mode === 'hard'" animated />
      <p v-if="mode === 'hard'" class="hard-done">{{ $t('level.hardDone') }}</p>
      <p>{{ $t('level.time', { t: time }) }} · {{ $t('level.mistakes', { n: result.mistakes }) }}</p>
    </template>
    <!-- Extra content of a mode, e.g. the facts of "find the odd one out"; a lost level has none. -->
    <slot v-if="!failed" />
    <!-- The first button is the main one (and takes the focus): "Next" after a win, "Retry" after a loss. -->
    <div class="actions">
      <button v-if="failed" @click="$emit('retry')"><svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 3.5v4h4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>{{ $t('level.retry') }}</button>
      <button v-if="hasNext" :class="{ secondary: failed }" @click="$emit('next')">{{ $t('level.next') }}<svg class="btn-icon flip-rtl" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg></button>
      <button v-if="!failed" class="secondary" @click="$emit('retry')"><svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 3.5v4h4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>{{ $t('level.retry') }}</button>
      <button class="secondary" @click="$emit('menu')"><svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /><path d="M9 4v14M15 6v14" stroke="currentColor" stroke-width="2" /></svg>{{ $t('level.menu') }}</button>
    </div>
    <button v-if="offerHard" class="hard" @click="$emit('hard')"><span aria-hidden="true">★</span> {{ $t('level.playHard') }}</button>
    <ShareButton v-if="shareText && !failed" class="share" :text="shareText" />
  </ModalDialog>
</template>

<style scoped>
.won {
  width: 64px;
  height: 64px;
  margin: 4px auto 0;
  display: block;
}

.hard-done {
  margin: 0;
  font-weight: 700;
  color: var(--star-hard);
}

.misses {
  display: inline-flex;
  gap: 8px;
}

.misses svg {
  width: 44px;
  height: 44px;
  animation: pop 0.45s backwards cubic-bezier(0.3, 1.6, 0.6, 1);
}

.failed-hint {
  margin: 12px 0 4px;
  line-height: 1.4;
}

.stats {
  margin: 0 0 16px;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

@keyframes pop {
  from {
    transform: scale(0) rotate(-90deg);
  }
  to {
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .misses svg {
    animation: none;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

/* Each action with its icon: retry and menu before the label, next after it (pointing on). */
.actions button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-icon {
  width: 20px;
  height: 20px;
  flex: none;
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
