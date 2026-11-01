<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PauseDialog from '../components/PauseDialog.vue'
import ResultDialog from '../components/ResultDialog.vue'
import { GameScene } from '../engine/scene.ts'
import type { LevelResult } from '../engine/types.ts'
import { levelById, levels } from '../levels/index.ts'
import { playMusic, playSfx } from '../services/audio.ts'
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
/** Mode of the current attempt (read when the level starts). */
const calm = ref(false)
const hintActive = ref(false)
const animationFrozen = ref(false)
const result = ref<LevelResult | null>(null)
let scene: GameScene | undefined

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
    <header class="hud">
      <span class="title">{{ $t('level.level', { n: level.id }) }}</span>
      <span>{{ $t('level.found', { found, total: level.differences.length }) }}</span>
      <template v-if="!calm">
        <span>⏱ {{ time }}</span>
        <span>{{ $t('level.mistakes', { n: mistakes }) }}</span>
      </template>
    </header>

    <div class="board" :class="{ locked }">
      <!-- Filled by the engine; Vue must not render children here. -->
      <div ref="board" class="pictures" />
      <div v-if="locked" class="lock-note">{{ $t('level.locked') }}</div>
    </div>

    <footer class="toolbar">
      <button class="secondary" :disabled="!canHint" @click="showHint">
        <span aria-hidden="true">💡</span>
        {{ $t('level.hint') }} {{ calm ? '∞' : progress.hints }}
      </button>
      <button class="secondary" :disabled="zoom === 1" @click="scene?.resetZoom()">
        <span aria-hidden="true">⤢</span>
        {{ $t('level.resetZoom') }}
      </button>
      <button v-if="calm" class="secondary" :aria-pressed="animationFrozen" @click="toggleAnimation">
        <span aria-hidden="true">{{ animationFrozen ? '▶' : '⏹' }}</span>
        {{ animationFrozen ? $t('level.animPlay') : $t('level.animPause') }}
      </button>
      <button class="secondary" :disabled="!!result" @click="pause">
        <span aria-hidden="true">⏸</span>
        {{ $t('level.pause') }}
      </button>
    </footer>

    <PauseDialog v-if="paused" @resume="resume" @restart="start" @exit="router.push({ name: 'home' })" />
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

.hud {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: var(--panel);
  font-size: 15px;
  white-space: nowrap;
  overflow-x: auto;
}

.hud .title {
  font-weight: 600;
  margin-right: auto;
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

.toolbar button span {
  font-size: 20px;
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
