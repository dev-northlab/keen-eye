<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PauseDialog from '../components/PauseDialog.vue'
import ResultDialog from '../components/ResultDialog.vue'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import ScreenHeader from '../components/ScreenHeader.vue'
import SettingsPanel from '../components/SettingsPanel.vue'
import { GameScene } from '../engine/scene.ts'
import type { LevelResult } from '../engine/types.ts'
import { levelById, levels } from '../levels/index.ts'
import { playMusic, playSfx } from '../services/audio.ts'
import { useBackButton } from '../services/backButton.ts'
import { vibrateFound, vibrateMiss } from '../services/haptics.ts'
import { useProgressStore } from '../stores/progress.ts'
import { useSettingsStore } from '../stores/settings.ts'

const props = defineProps<{ id: number }>()
const router = useRouter()
const progress = useProgressStore()
const settings = useSettingsStore()

// The route guard guarantees the level exists and is unlocked.
const level = levelById(props.id)!
const nextLevel = levels[levels.indexOf(level) + 1]

const board = ref<HTMLDivElement>()
const found = ref(0)
const seconds = ref(0)
const mistakes = ref(0)
const locked = ref(false)
const zoom = ref(1)
const paused = ref(false)
/** Settings opened from the pause menu, over the paused level. */
const settingsOpen = ref(false)
/** Mode of the current attempt (read when the level starts). */
const calm = ref(false)
const hintActive = ref(false)
const animationFrozen = ref(false)
const result = ref<LevelResult | null>(null)
let scene: GameScene | undefined
const isDev = import.meta.env.DEV

const total = level.differences.length

const formatTime = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
const time = computed(() => formatTime(result.value?.timeSec ?? seconds.value))

function start() {
  scene?.destroy()
  found.value = 0
  seconds.value = 0
  mistakes.value = 0
  locked.value = false
  zoom.value = 1
  paused.value = false
  settingsOpen.value = false
  hintActive.value = false
  animationFrozen.value = false
  result.value = null
  calm.value = settings.calm
  playMusic(calm.value ? 'calm' : 'level')
  scene = new GameScene(
    board.value!,
    level,
    {
      onFound: (n) => {
        found.value = n
        playSfx('found')
        vibrateFound()
      },
      onMiss: (n) => {
        mistakes.value = n
        playSfx('miss')
        vibrateMiss()
      },
      onLock: (l) => (locked.value = l),
      onTick: (s) => (seconds.value = s),
      onZoom: (s) => (zoom.value = s),
      onHint: (active) => (hintActive.value = active),
      onComplete: (r) => {
        result.value = r
        playMusic('complete')
        if (calm.value) progress.recordCalmCompletion(level.id)
        else progress.recordResult(level.id, r)
      },
    },
    {
      // Calm mode and "reduce motion" both slow the scene down.
      animationSpeed: (settings.effectiveReduceMotion ? 0.5 : 1) * (calm.value ? 0.6 : 1),
      missLock: !calm.value,
    },
  )
}

const canHint = computed(() => !result.value && !hintActive.value && (calm.value || progress.hints > 0))

/** Calm mode hints are free; normal mode takes one from the shared pool. */
async function showHint() {
  if (!canHint.value || !scene?.hint()) return
  playSfx('hint')
  if (!calm.value) await progress.spendHint()
}

function toggleAnimation() {
  animationFrozen.value = !animationFrozen.value
  scene?.setAnimationFrozen(animationFrozen.value)
}

function pause() {
  if (result.value || paused.value) return
  paused.value = true
  scene?.pause()
}

function resume() {
  paused.value = false
  scene?.resume()
}

// Android back: pause first; back again on the pause dialog leaves to the menu (from its settings, back
// to the dialog); after the level, to the map.
useBackButton(() => {
  if (result.value) router.push({ name: 'levels' })
  else if (settingsOpen.value) settingsOpen.value = false
  else if (paused.value) router.push({ name: 'home' })
  else pause()
})

// Leaving the app (home button, switching tabs) pauses the level.
function onVisibility() {
  if (document.hidden) pause()
}

onMounted(() => {
  start()
  document.addEventListener('visibilitychange', onVisibility)
})
onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', onVisibility)
  scene?.destroy()
})
</script>

<template>
  <div class="level">
    <header class="hud" :class="{ still: settings.effectiveReduceMotion }">
      <span class="title">{{ $t('level.level', { n: level.id }) }}</span>
      <!-- One empty circle per difference; a found one fills and gets a check drawn in. -->
      <span class="found" :class="{ done: found === total }" role="img" :aria-label="$t('level.found', { found, total })">
        <svg v-for="i in total" :key="i" class="icon slot" :class="{ hit: i <= found }" viewBox="0 0 24 24" aria-hidden="true">
          <circle class="disc" cx="12" cy="12" r="10" />
          <template v-if="i <= found">
            <ellipse class="shine" cx="8.4" cy="7.4" rx="3.2" ry="1.7" transform="rotate(-35 8.4 7.4)" />
            <path class="check" d="M7 12.5l3.2 3.2 6.8-7" />
          </template>
        </svg>
      </span>
      <template v-if="!calm">
        <span class="chip time" role="img" :aria-label="$t('level.time', { t: time })">
          <!-- Yellow stopwatch. -->
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="10" y="1" width="4" height="3.4" rx="1.2" fill="#e8a400" />
            <rect x="17.4" y="3.6" width="3.2" height="2.6" rx="1" fill="#e8a400" transform="rotate(45 19 4.9)" />
            <circle cx="12" cy="13.5" r="9" fill="#ffc933" stroke="#e8a400" stroke-width="1.4" />
            <circle cx="12" cy="13.5" r="6.4" fill="#fffaf0" />
            <ellipse cx="6.5" cy="8.3" rx="1.7" ry="0.9" fill="#fff" fill-opacity="0.75" transform="rotate(-45 6.5 8.3)" />
            <path d="M12 13.5V9.4M12 13.5l2.7 1.6" fill="none" stroke="#a86b00" stroke-width="1.9" stroke-linecap="round" />
            <circle cx="12" cy="13.5" r="1.2" fill="#a86b00" />
          </svg>
          <span class="value">{{ time }}</span>
        </span>
        <span
          :key="mistakes"
          class="chip miss"
          :class="{ shake: mistakes > 0, locked }"
          role="img"
          :aria-label="$t('level.mistakes', { n: mistakes })"
        >
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="#ff5d5d" stroke="#de3b3b" stroke-width="1.4" />
            <ellipse cx="8.4" cy="7.4" rx="3.2" ry="1.7" fill="#fff" fill-opacity="0.4" transform="rotate(-35 8.4 7.4)" />
            <path d="M8.6 8.6l6.8 6.8M15.4 8.6l-6.8 6.8" stroke="#fff" stroke-width="2.8" stroke-linecap="round" />
          </svg>
          <span class="value">{{ mistakes }}</span>
        </span>
      </template>
    </header>

    <div class="board" :class="{ locked }">
      <!-- Filled by the engine; Vue must not render children here. -->
      <div ref="board" class="pictures" />
      <div v-if="locked" class="lock-note">{{ $t('level.locked') }}</div>
    </div>

    <footer class="toolbar">
      <button class="secondary" :disabled="!canHint" @click="showHint">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        {{ $t('level.hint') }} {{ calm ? '∞' : progress.hints }}
      </button>
      <!-- Development only: outlines all differences in red. -->
      <button v-if="isDev" class="secondary" :disabled="!!result" @click="scene?.revealAll()">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
        {{ $t('level.revealAll') }}
      </button>
      <button class="secondary" :disabled="zoom === 1" @click="scene?.resetZoom()">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        {{ $t('level.resetZoom') }}
      </button>
      <button v-if="calm" class="secondary" :aria-pressed="animationFrozen" @click="toggleAnimation">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path v-if="animationFrozen" d="M8 5v14l11-7Z" fill="currentColor" />
          <rect v-else x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
        </svg>
        {{ animationFrozen ? $t('level.animPlay') : $t('level.animPause') }}
      </button>
      <button class="secondary" :disabled="!!result" @click="pause">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>
        {{ $t('level.pause') }}
      </button>
    </footer>

    <div v-if="settingsOpen" class="settings-screen">
      <ScreenBackdrop theme="sea" under-header />
      <ScreenHeader :title="$t('settings.title')" @back="settingsOpen = false" />
      <SettingsPanel />
    </div>
    <PauseDialog
      v-else-if="paused"
      @resume="resume"
      @restart="start"
      @levels="router.push({ name: 'levels' })"
      @settings="settingsOpen = true"
      @exit="router.push({ name: 'home' })"
    />
    <ResultDialog
      v-if="result"
      :result="result"
      :calm="calm"
      :time="time"
      :has-next="!!nextLevel"
      @next="router.push({ name: 'level', params: { id: nextLevel!.id } })"
      @retry="start"
      @menu="router.push({ name: 'levels' })"
    />
  </div>
</template>

<style scoped>
.level {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Settings over the paused level, so the attempt survives. */
.settings-screen {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  /* Fixed, so the #app safe-area padding does not apply. */
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  background: var(--bg);
}

.hud {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--panel);
  box-shadow: 0 1px 6px rgb(0 0 0 / 0.06);
  font-size: 15px;
  white-space: nowrap;
  overflow-x: auto;
}

.hud .title {
  font-weight: 700;
  margin-right: auto;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px 4px 5px;
  border-radius: 999px;
  background: #eef3f0;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.hud .icon {
  width: 28px;
  height: 28px;
  flex: none;
}

.chip .value {
  display: inline-block;
}

/* Found: a row of circles, filled with a check as differences are found. */
.found {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.slot .disc {
  fill: #f6f9f7;
  stroke: #c5d1cb;
  stroke-width: 1.6;
  transition:
    fill 0.25s,
    stroke 0.25s;
}

.slot.hit {
  animation: pop 0.45s cubic-bezier(0.3, 1.6, 0.6, 1);
}

.slot.hit .disc {
  fill: #3cc47f;
  stroke: #239a5f;
}

.slot .shine {
  fill: #fff;
  fill-opacity: 0.4;
}

.slot .check {
  fill: none;
  stroke: #fff;
  stroke-width: 2.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16;
  animation: draw 0.4s ease-out;
}

.found.done {
  animation: pop 0.5s cubic-bezier(0.3, 1.6, 0.6, 1);
}

/* Narrow screens: the circles get their own row under level, time and mistakes. */
@media (max-width: 720px) {
  .hud {
    flex-wrap: wrap;
    row-gap: 6px;
  }

  .found {
    order: 1;
    width: 100%;
    justify-content: center;
  }
}

/* Time: yellow chip with a stopwatch. */
.time {
  background: #fff3c2;
  color: #8a5a00;
}

/* Mistakes: red cross; the chip shakes and flashes on every miss. */
.miss.shake {
  background: #fde8e8;
  color: #b42318;
  animation:
    shake 0.45s ease-in-out,
    flash 0.8s ease-out;
}

.miss.locked .icon {
  animation: pulse 0.7s ease-in-out infinite alternate;
}

@keyframes pop {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes draw {
  from {
    stroke-dashoffset: 16;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-5px);
  }
  40% {
    transform: translateX(5px);
  }
  60% {
    transform: translateX(-3px);
  }
  80% {
    transform: translateX(3px);
  }
}

@keyframes flash {
  from {
    background: #ffb4b4;
  }
}

@keyframes pulse {
  to {
    transform: scale(1.2);
  }
}

.hud.still * {
  animation: none !important;
  transition: none !important;
}

.board {
  position: relative;
  flex: 1;
  min-height: 0;
}

.pictures {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px;
}

@media (orientation: landscape) {
  .pictures {
    flex-direction: row;
  }
}

/* Pictures are created by the engine, hence :deep. */
.pictures :deep(.ke-picture) {
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.2s;
}

.board.locked :deep(.ke-picture) {
  opacity: 0.5;
}

.toolbar {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 6px 8px 10px;
  background: var(--panel);
}

.toolbar button {
  flex: 1 1 0;
  max-width: 120px;
  display: grid;
  justify-items: center;
  gap: 2px;
  padding: 6px 4px;
  font-size: 12px;
  line-height: 1.2;
}

.toolbar .icon {
  width: 22px;
  height: 22px;
}

.toolbar button:disabled {
  opacity: 0.45;
  cursor: default;
}

.lock-note {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 22px;
  font-weight: 600;
  pointer-events: none;
  z-index: 1;
}
</style>
