<script setup lang="ts">
import type { GameMode } from '../engine/rules.ts'
import type { LevelResult } from '../engine/types.ts'
import { onBeforeUnmount, onMounted } from 'vue'
import { playSfx } from '../services/audio.ts'
import ModalDialog from './ModalDialog.vue'
import ShareButton from './ShareButton.vue'
import StarRating from './StarRating.vue'
import ToyText from './ToyText.vue'
import { useSettingsStore } from '../stores/settings.ts'

/**
 * `mode` of the attempt: stars in normal mode, none in calm mode.
 * `shareText`: shows a "Share" button under the actions with this message. `portrait`: a level without modes or stars
 * ("tiny boy"): instead of stars its hero's portrait with a tick, a burst of confetti and a cheer in toy letters.
 */
const props = defineProps<{
  result: LevelResult
  mode: GameMode
  time: string
  hasNext: boolean
  shareText?: string
  portrait?: string
}>()
defineEmits<{ next: []; retry: []; menu: [] }>()

// A chime per star, in step with StarRating's pop-in (0.25 s apart).
const timers: number[] = []
const still = useSettingsStore().effectiveReduceMotion

/** Confetti round the portrait: angle (deg), distance (px), size, colour, delay (s) — the same every time. */
const CONFETTI_COLORS = ['#ff5a5f', '#ff9f1c', '#ffd23f', '#3ec46d', '#2fa8ff', '#9b6bff', '#ff6bb5']
const confetti = Array.from({ length: 18 }, (_, i) => ({
  '--a': `${i * 20 + ((i * 7) % 11)}deg`,
  '--d': `${70 + ((i * 13) % 30)}px`,
  '--s': `${7 + ((i * 5) % 6)}px`,
  '--c': CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  '--t': `${((i * 3) % 5) * 0.04}s`,
}))

onMounted(() => {
  // The hero's win: three rising chimes with the confetti.
  if (props.portrait) {
    for (let i = 0; i < 3; i++) timers.push(window.setTimeout(() => playSfx('star', i), 250 + i * 200))
    return
  }
  if (props.mode === 'calm') return
  for (let i = 0; i < props.result.stars; i++) timers.push(window.setTimeout(() => playSfx('star', i), 300 + i * 250))
})
onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<template>
  <ModalDialog :title="$t('level.complete')">
    <div v-if="portrait" class="cheer" :class="{ still }">
      <span class="burst" aria-hidden="true">
        <i v-for="(c, i) in confetti" :key="i" :style="c" />
      </span>
      <svg class="sparkle s1" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.6 7.4L22 11l-7.4 2.6L12 21l-2.6-7.4L2 11l7.4-2.6Z" /></svg>
      <svg class="sparkle s2" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.6 7.4L22 11l-7.4 2.6L12 21l-2.6-7.4L2 11l7.4-2.6Z" /></svg>
      <svg class="sparkle s3" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.6 7.4L22 11l-7.4 2.6L12 21l-2.6-7.4L2 11l7.4-2.6Z" /></svg>
      <span class="portrait">
        <img :src="portrait" alt="" />
        <svg class="tick" viewBox="0 0 48 48" role="img" :aria-label="$t('map.won')">
          <circle cx="24" cy="24" r="21" fill="#3ec46d" stroke="#fff" stroke-width="4" />
          <path d="M14 25l7 7 13-15" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <ToyText class="cheer-text" :text="$t('level.tinyWon')" :still="still" />
    </div>
    <p v-else-if="mode === 'calm'">{{ $t('level.calmDone') }}</p>
    <template v-else>
      <StarRating :stars="result.stars" :size="48" animated />
      <p>{{ $t('level.time', { t: time }) }} · {{ $t('level.mistakes', { n: result.mistakes }) }}</p>
    </template>
    <!-- Extra content of a mode, e.g. the facts of "find the odd one out". -->
    <slot />
    <!-- The first button is the main one (and takes the focus). -->
    <div class="actions" :class="{ toy: portrait }">
      <button v-if="hasNext" class="next" @click="$emit('next')">{{ $t('level.next') }}<svg class="btn-icon flip-rtl" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg></button>
      <button class="secondary retry" @click="$emit('retry')"><svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 3.5v4h4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>{{ $t('level.retry') }}</button>
      <button class="secondary menu" @click="$emit('menu')"><svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /><path d="M9 4v14M15 6v14" stroke="currentColor" stroke-width="2" /></svg>{{ $t('level.menu') }}</button>
    </div>
    <ShareButton v-if="shareText" class="share" :class="{ toy: portrait }" :text="shareText" />
  </ModalDialog>
</template>

<style scoped>
/* "Tiny boy": the hero's portrait pops up with a tick, confetti bursts out of it, stars twinkle round it, and the
   cheer below in toy letters. */
.cheer {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 16px;
  padding: 8px 0 4px;
}

.portrait {
  position: relative;
  width: 112px;
  height: 112px;
  animation: pop 0.6s cubic-bezier(0.3, 1.6, 0.5, 1) both;
}

.portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid #fff;
  box-shadow:
    0 0 0 4px #ffd23f,
    0 10px 22px -8px rgb(0 0 0 / 0.45);
}

.tick {
  position: absolute;
  right: -6px;
  bottom: -2px;
  width: 44px;
  height: 44px;
  filter: drop-shadow(0 3px 4px rgb(0 0 0 / 0.25));
  animation: pop 0.5s 0.45s cubic-bezier(0.3, 1.8, 0.5, 1) both;
}

@keyframes pop {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

/* The confetti flies out from behind the portrait's middle and fades. */
.burst {
  position: absolute;
  top: 64px;
  left: 50%;
  width: 0;
  height: 0;
  pointer-events: none;
}

.burst i {
  position: absolute;
  width: var(--s);
  height: calc(var(--s) * 0.55);
  margin: calc(var(--s) * -0.28) 0 0 calc(var(--s) * -0.5);
  border-radius: 2px;
  background: var(--c);
  opacity: 0;
  animation: fly 1.3s var(--t) ease-out forwards;
}

@keyframes fly {
  0% {
    opacity: 1;
    transform: rotate(var(--a)) translateX(10px) rotate(0deg);
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(var(--a)) translateX(var(--d)) translateY(28px) rotate(260deg);
  }
}

.sparkle {
  position: absolute;
  width: 22px;
  height: 22px;
  fill: #ffc531;
  stroke: #fff;
  stroke-width: 1.5;
  filter: drop-shadow(0 2px 2px rgb(184 138 0 / 0.5));
  animation: twinkle 1.6s ease-in-out infinite;
}

.s1 {
  top: 6px;
  left: calc(50% - 92px);
}

.s2 {
  top: 26px;
  left: calc(50% + 74px);
  width: 16px;
  height: 16px;
  animation-delay: 0.5s;
}

.s3 {
  top: 92px;
  left: calc(50% - 84px);
  width: 14px;
  height: 14px;
  animation-delay: 1s;
}

@keyframes twinkle {
  0%,
  100% {
    transform: scale(0.75) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.15) rotate(20deg);
    opacity: 1;
  }
}

.cheer-text {
  font-size: 24px;
}

.still .portrait,
.still .tick,
.still .sparkle {
  animation: none;
}

.still .burst {
  display: none;
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

/* Below the actions and lighter than them, so it never takes "Next"'s place. */
.share {
  margin-top: 16px;
}

/* "Tiny boy": candy buttons like its toy letters — each its own colour (`--b`) over a darker depth (`--d`) that it
   sinks into when pressed: "Next" green, "Retry" orange, "Menu" sky blue, "Share" pink. */
.actions.toy {
  gap: 12px;
  margin-top: 4px;
}

.actions.toy button,
.share.toy :deep(button) {
  --b: #3ec46d;
  --d: #1f7f43;
  min-height: 50px;
  padding: 10px 22px;
  border-radius: 999px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--b) 70%, #fff), var(--b) 55%);
  color: #fff;
  font-weight: 800;
  text-shadow: 0 1px 0 var(--d);
  box-shadow:
    inset 0 2px 0 rgb(255 255 255 / 0.45),
    0 5px 0 var(--d),
    0 10px 14px -6px rgb(0 0 0 / 0.35);
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;
}

.actions.toy button:active,
.share.toy :deep(button:active) {
  transform: translateY(4px);
  box-shadow:
    inset 0 2px 0 rgb(255 255 255 / 0.45),
    0 1px 0 var(--d),
    0 3px 6px -3px rgb(0 0 0 / 0.35);
}

.actions.toy button:focus-visible,
.share.toy :deep(button:focus-visible) {
  outline: 3px solid color-mix(in srgb, var(--b) 45%, #fff);
  outline-offset: 3px;
}

.actions.toy button:focus:not(:focus-visible) {
  outline: none;
}

.actions.toy .retry {
  --b: #ff9f1c;
  --d: #b86a00;
}

.actions.toy .menu {
  --b: #2fa8ff;
  --d: #1665a8;
}

.actions.toy .btn-icon {
  filter: drop-shadow(0 1px 0 var(--d));
}

.share.toy {
  margin-top: 20px;
}

.share.toy :deep(button) {
  --b: #ff6bb5;
  --d: #b8336f;
  padding-inline-start: 8px;
}

.share.toy :deep(.icon) {
  background: #fff;
  color: #e8458f;
}
</style>
