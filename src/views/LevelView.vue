<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { GameScene } from '../engine/scene.ts'
import type { LevelResult } from '../engine/types.ts'
import { levelById } from '../levels/index.ts'

const props = defineProps<{ id: number }>()
const router = useRouter()

// The route guard guarantees the level exists.
const level = levelById(props.id)!
const nextLevel = levelById(props.id + 1)

const board = ref<HTMLDivElement>()
const found = ref(0)
const seconds = ref(0)
const mistakes = ref(0)
const locked = ref(false)
const zoom = ref(1)
const result = ref<LevelResult | null>(null)
let scene: GameScene | undefined

// System "reduce motion": softer (slower) scene animation.
const animationSpeed = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.5 : 1

const formatTime = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
const time = computed(() => formatTime(result.value?.timeSec ?? seconds.value))

function start() {
  scene?.destroy()
  found.value = 0
  seconds.value = 0
  mistakes.value = 0
  locked.value = false
  zoom.value = 1
  result.value = null
  scene = new GameScene(board.value!, level, {
    onFound: (n) => (found.value = n),
    onMiss: (n) => (mistakes.value = n),
    onLock: (l) => (locked.value = l),
    onTick: (s) => (seconds.value = s),
    onZoom: (s) => (zoom.value = s),
    onComplete: (r) => (result.value = r),
  }, { animationSpeed })
}

onMounted(start)
onBeforeUnmount(() => scene?.destroy())
</script>

<template>
  <div class="level">
    <header class="hud">
      <RouterLink :to="{ name: 'home' }" class="back" aria-label="menu">‹</RouterLink>
      <span class="title">{{ $t('level.level', { n: level.id }) }}</span>
      <span>{{ $t('level.found', { found, total: level.differences.length }) }}</span>
      <span>⏱ {{ time }}</span>
      <span>{{ $t('level.mistakes', { n: mistakes }) }}</span>
    </header>

    <div class="board" :class="{ locked }">
      <!-- Filled by the engine; Vue must not render children here. -->
      <div ref="board" class="pictures" />
      <div v-if="locked" class="lock-note">{{ $t('level.locked') }}</div>
    </div>

    <footer class="toolbar">
      <button class="secondary" :disabled="zoom === 1" @click="scene?.resetZoom()">
        {{ $t('level.resetZoom') }}
      </button>
    </footer>

    <div v-if="result" class="result">
      <div class="dialog">
        <h2>{{ $t('level.complete') }}</h2>
        <div class="stars" :aria-label="`${result.stars}/3`">
          <span v-for="i in 3" :key="i" :class="{ on: i <= result.stars }">★</span>
        </div>
        <p>{{ $t('level.time', { t: time }) }} · {{ $t('level.mistakes', { n: result.mistakes }) }}</p>
        <div class="actions">
          <button v-if="nextLevel" @click="router.push({ name: 'level', params: { id: nextLevel.id } })">
            {{ $t('level.next') }}
          </button>
          <button class="secondary" @click="start">{{ $t('level.retry') }}</button>
          <button class="secondary" @click="router.push({ name: 'home' })">{{ $t('level.menu') }}</button>
        </div>
      </div>
    </div>
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
  padding: 8px 12px;
  background: var(--panel);
  font-size: 15px;
  white-space: nowrap;
  overflow-x: auto;
}

.hud .title {
  font-weight: 600;
  margin-right: auto;
}

.back {
  color: var(--fg);
  text-decoration: none;
  font-size: 28px;
  line-height: 1;
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
  gap: 8px;
  padding: 6px 12px 10px;
  background: var(--panel);
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

.result {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgb(0 0 0 / 0.35);
}

.dialog {
  background: var(--panel);
  border-radius: 20px;
  padding: 24px;
  text-align: center;
  min-width: 260px;
}

.dialog h2 {
  margin: 0 0 8px;
}

.stars {
  font-size: 44px;
  color: #d6d6d6;
}

.stars .on {
  color: #f5b301;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}
</style>
