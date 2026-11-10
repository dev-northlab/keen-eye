<script setup lang="ts">
import type { GameMode } from '../engine/rules.ts'
import type { LevelResult } from '../engine/types.ts'
import { onBeforeUnmount, onMounted } from 'vue'
import { playSfx } from '../services/audio.ts'
import FireworksShow from './FireworksShow.vue'
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
  <ModalDialog class="result" :class="{ still, calm: mode === 'calm' && !portrait, toy: portrait }" :title="$t('level.complete')">
    <!-- A glossy badge over the title: a golden cup (normal mode) or a green tick (calm), light rays turning behind
         it and confetti bursting out. "Tiny boy" has its hero's portrait instead, below. -->
    <template v-if="!still" #backdrop>
      <FireworksShow />
    </template>
    <template v-if="!portrait" #icon>
      <span class="rays" aria-hidden="true" />
      <span class="burst badge-burst" aria-hidden="true">
        <i v-for="(c, i) in confetti" :key="i" :style="c" />
      </span>
      <span class="coin">
        <svg v-if="mode === 'calm'" class="badge-icon" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M13 25l8 8 15-17" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg v-else class="badge-icon" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M15 8h18v11a9 9 0 0 1-18 0Z" fill="currentColor" />
          <path d="M15 11H9.5a5.5 5.5 0 0 0 6 7.5M33 11h5.5a5.5 5.5 0 0 1-6 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
          <path d="M21 27h6v6h-6Z" fill="currentColor" />
          <rect x="15" y="33" width="18" height="6" rx="2" fill="currentColor" />
        </svg>
      </span>
    </template>
    <div class="body">
      <div v-if="portrait" class="cheer">
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
      <p v-else-if="mode === 'calm'" class="chip calm-chip rise" style="--d: 0.3s">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4C11 4 5 9 5 17l-1.5 3M5 17c6 0 11-3 13-9M9 13h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        {{ $t('level.calmDone') }}
      </p>
      <template v-else>
        <StarRating class="result-stars" :stars="result.stars" :size="52" animated />
        <div class="stats">
          <span class="chip rise" style="--d: 0.45s">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8" fill="none" stroke="currentColor" stroke-width="2.2" /><path d="M12 9v4.5l3 2M9.5 2.5h5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" /></svg>
            {{ $t('level.time', { t: time }) }}
          </span>
          <span class="chip rise" style="--d: 0.55s">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2" /><path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" /></svg>
            {{ $t('level.mistakes', { n: result.mistakes }) }}
          </span>
        </div>
      </template>
      <!-- Extra content of a mode, e.g. the facts of "find the odd one out". -->
      <slot />
    </div>
    <div class="acts">
      <!-- The first button is the main one (and takes the focus). -->
      <div class="actions">
        <button v-if="hasNext" class="candy next rise" style="--d: 0.55s" @click="$emit('next')">
          {{ $t('level.next') }}<svg class="btn-icon flip-rtl" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
        <div class="pair">
          <button class="candy retry rise" style="--d: 0.65s" @click="$emit('retry')"><svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 3.5v4h4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>{{ $t('level.retry') }}</button>
          <button class="candy menu rise" style="--d: 0.72s" @click="$emit('menu')"><svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" /><path d="M9 4v14M15 6v14" stroke="currentColor" stroke-width="2.2" /></svg>{{ $t('level.menu') }}</button>
        </div>
      </div>
      <ShareButton v-if="shareText" class="share rise" style="--d: 0.8s" :text="shareText" />
    </div>
  </ModalDialog>
</template>

<style scoped>
/* The dialog comes in: the shade fades, the card pops up with a little bounce, then its parts rise one by one
   (`.rise` with its delay `--d`). */
/* A deeper shade than other dialogs, so the fireworks shine. */
.result.overlay {
  background: rgb(0 0 0 / 0.5);
  animation: shade 0.25s ease both;
}

.result :deep(.card) {
  position: relative;
  /* A warm glow at the top: golden for a normal win, green for calm mode. */
  --glow: #ffd23f;
  background: radial-gradient(120% 60% at 50% 0%, color-mix(in srgb, var(--glow) 24%, var(--panel)), var(--panel) 70%);
  box-shadow: 0 24px 48px -16px rgb(0 0 0 / 0.5);
  animation: card-in 0.55s cubic-bezier(0.3, 1.45, 0.5, 1) both;
}

.result.calm :deep(.card) {
  --glow: #3ec46d;
}

.result :deep(h2) {
  animation: rise 0.4s 0.15s ease-out both;
}

.rise {
  animation: rise 0.45s var(--d, 0s) cubic-bezier(0.3, 1.4, 0.5, 1) both;
}

@keyframes shade {
  from {
    background: rgb(0 0 0 / 0);
  }
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(28px) scale(0.8);
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}

/* The badge: a glossy coin with a white rim popping in with a turn, over its rays and confetti. */
.result :deep(.card > .icon) {
  position: relative;
  isolation: isolate;
  width: 72px;
  height: 72px;
  margin-bottom: 10px;
  overflow: visible;
  background: none;
  animation: badge-in 0.7s 0.1s cubic-bezier(0.3, 1.6, 0.5, 1) both;
}

.coin {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: radial-gradient(circle at 35% 28%, #fff3b0, #ffc531 45%, #e09a00);
  box-shadow:
    0 0 0 4px #fff,
    0 0 0 6px #ffd23f,
    0 10px 18px -6px rgb(160 100 0 / 0.6);
}

.calm .coin {
  background: radial-gradient(circle at 35% 28%, #c8f7d8, #3ec46d 45%, #22914c);
  box-shadow:
    0 0 0 4px #fff,
    0 0 0 6px #3ec46d,
    0 10px 18px -6px rgb(20 110 60 / 0.55);
}

.badge-icon {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 2px 0 rgb(0 0 0 / 0.18));
}

@keyframes badge-in {
  from {
    transform: scale(0) rotate(-40deg);
  }
}

/* Soft rays turning slowly behind the badge. */
.rays {
  position: absolute;
  inset: -34px;
  z-index: -1;
  border-radius: 50%;
  background: repeating-conic-gradient(color-mix(in srgb, var(--glow, #ffd23f) 55%, transparent) 0deg 9deg, transparent 9deg 24deg);
  -webkit-mask: radial-gradient(circle, #000 30%, transparent 70%);
  mask: radial-gradient(circle, #000 30%, transparent 70%);
  animation:
    fade-in 0.6s 0.3s both,
    spin 14s linear infinite;
}

.result.calm .rays {
  --glow: #3ec46d;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Stars bigger and glossier than on the level tiles. */
.result-stars {
  display: grid;
  margin: -4px 0 6px;
}

.result-stars :deep(.on) {
  text-shadow:
    0 3px 0 #c98a00,
    0 6px 10px rgb(200 140 0 / 0.35);
}

/* Time and mistakes, and calm mode's note: soft pills with an icon. */
.stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 4px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 6px 14px 6px 10px;
  border-radius: 999px;
  background: var(--soft-2);
  font-weight: 600;
  font-size: 15px;
}

.chip svg {
  width: 20px;
  height: 20px;
  flex: none;
  color: var(--accent);
}

.calm-chip {
  margin: 0 auto 4px;
  background: var(--ok-bg);
}

.body {
  display: grid;
  justify-items: center;
  gap: 8px;
}

.acts {
  display: grid;
  justify-items: center;
  margin-top: 18px;
}

.actions {
  display: grid;
  gap: 12px;
  width: 100%;
}

.pair {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Candy buttons like the home screen's "Play": a light top fading into the colour (`--b`), a shine line, a darker
   depth (`--d`) they sink into when pressed. "Next" is the big one, with a gleam sweeping across now and then. */
.candy,
.share :deep(button) {
  --b: var(--accent);
  --d: color-mix(in srgb, var(--accent) 60%, #000);
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 10px 16px;
  border-radius: 16px;
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

.candy:active,
.share :deep(button:active) {
  transform: translateY(4px);
  box-shadow:
    inset 0 2px 0 rgb(255 255 255 / 0.45),
    0 1px 0 var(--d),
    0 3px 6px -3px rgb(0 0 0 / 0.35);
}

.candy:focus-visible,
.share :deep(button:focus-visible) {
  outline: 3px solid color-mix(in srgb, var(--b) 45%, #fff);
  outline-offset: 3px;
}

.candy:focus:not(:focus-visible) {
  outline: none;
}

.next {
  min-height: 56px;
  font-size: 20px;
  border-radius: 18px;
}

.next::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 35%, rgb(255 255 255 / 0.4) 50%, transparent 65%);
  transform: translateX(-120%);
  animation: gleam 3.5s ease-in-out 1.4s infinite;
  pointer-events: none;
}

@keyframes gleam {
  0% {
    transform: translateX(-120%);
  }
  35%,
  100% {
    transform: translateX(120%);
  }
}

.pair .candy {
  flex: 1 1 0;
}

.retry {
  --b: #ff9f1c;
  --d: #b86a00;
}

.menu {
  --b: #2fa8ff;
  --d: #1665a8;
}

.btn-icon {
  width: 20px;
  height: 20px;
  flex: none;
  filter: drop-shadow(0 1px 0 var(--d));
}

.next .btn-icon {
  width: 24px;
  height: 24px;
}

/* "Share": a pink candy pill under the actions, lighter than them. */
.share {
  margin-top: 18px;
}

.share :deep(button) {
  --b: #ff6bb5;
  --d: #b8336f;
  min-height: 44px;
  padding-inline: 8px 20px;
  border-radius: 999px;
}

.share :deep(.icon) {
  background: #fff;
  color: #e8458f;
}

/* "Tiny boy": round pill buttons like its toy letters. */
.toy .candy {
  border-radius: 999px;
}

/* A short landscape screen (a phone on its side): the celebration on the left, the buttons on the right, so the
   card does not have to scroll. */
@media (max-height: 540px) and (min-width: 600px) {
  .result :deep(.card) {
    width: min(100%, 620px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'icon acts'
      'title acts'
      'body acts';
    grid-template-rows: auto auto 1fr;
    column-gap: 28px;
    align-items: start;
    padding: 20px 24px;
  }

  .result :deep(.card > .icon) {
    grid-area: icon;
    width: 60px;
    height: 60px;
  }

  .result :deep(h2) {
    grid-area: title;
  }

  .body {
    grid-area: body;
  }

  .acts {
    grid-area: acts;
    align-self: center;
    margin-top: 0;
  }

  .badge-icon {
    width: 34px;
    height: 34px;
  }
}

/* "Reduce motion" (the setting, which follows the system's by default): everything simply there. */
.still.overlay,
.still :deep(.card),
.still :deep(h2),
.still :deep(.card > .icon),
.still .rise,
.still .rays,
.still .next::after,
.still .portrait,
.still .tick,
.still .sparkle {
  animation: none;
}

.still .next::after,
.still .burst {
  display: none;
}

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

/* The badge's confetti flies out from behind it once it has popped in. */
.burst.badge-burst {
  top: 50%;
  z-index: -1;
}

.badge-burst i {
  animation-delay: calc(var(--t) + 0.4s);
}
</style>
