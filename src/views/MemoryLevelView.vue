<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import FoundSlots from '../components/FoundSlots.vue'
import LevelId from '../components/LevelId.vue'
import ModeChip from '../components/ModeChip.vue'
import PauseDialog from '../components/PauseDialog.vue'
import SecretFound from '../components/SecretFound.vue'
import SettingsOverlay from '../components/SettingsOverlay.vue'
import StarRating from '../components/StarRating.vue'
import ToolButton from '../components/ToolButton.vue'
import { MemoryScene, type MemoryPhase, type MemoryResult } from '../engine/memory-scene.ts'
import { MODE_RULES, type GameMode } from '../engine/rules.ts'
import { levelNumber, levelsScreen, nextLevel as nextLevelOf } from '../levels/chapters.ts'
import { levelById } from '../levels/index.ts'
import { playMusic, playSfx } from '../services/audio.ts'
import { useBackButton } from '../services/backButton.ts'
import { vibrateFound, vibrateMiss } from '../services/haptics.ts'
import { useProgressStore } from '../stores/progress.ts'
import { useSettingsStore } from '../stores/settings.ts'

// "Memory" level (docs/memory-mode.md): picture A for a few seconds, a curtain, then B alone — tap
// what changed. At the end A and B are shown together with every change outlined, and the result
// sits under them instead of a dialog, so the player sees what they missed.

const props = defineProps<{ id: number }>()
const router = useRouter()
const progress = useProgressStore()
const settings = useSettingsStore()

// The route guard guarantees a "memory" level that is unlocked.
const level = levelById(props.id)!
const nextLevel = nextLevelOf(level)
const number = levelNumber(level)
const grid = levelsScreen(level)
const total = level.differences.length

const board = ref<HTMLDivElement>()
const phase = ref<MemoryPhase>('show')
/** Length of a timed phase (show, peek), for the countdown bar; restarts with `phaseKey`. */
const phaseMs = ref(0)
const phaseKey = ref(0)
const found = ref(0)
const mistakes = ref(0)
const peeksLeft = ref(0)
const paused = ref(false)
/** Settings opened from the pause menu, over the paused level. */
const settingsOpen = ref(false)
/** Mode of the current attempt (read when the level starts). */
const mode = ref<GameMode>('normal')
const rules = computed(() => MODE_RULES[mode.value])
const calm = computed(() => mode.value === 'calm')
/** The mode setting as this attempt started: changed in the pause menu's settings, the attempt starts over. */
let modeSetting: GameMode = 'normal'
/** Misses that end the round; the hearts of the HUD. */
const maxMisses = computed(() => rules.value.memoryMaxMisses)
/** The mode allows looks at A. */
const hasPeeks = computed(() => rules.value.memoryPeeks(level.memory!.peeks) > 0)
const result = ref<MemoryResult | null>(null)
let scene: MemoryScene | undefined
const starTimers: number[] = []
/** "Secret key found!" is shown (docs/hidden-item-feature.md). */
const secretShown = ref(false)
let secretTimer = 0
/** How long "Secret key found!" stays on screen. */
const SECRET_MS = 2600

/** The category's hidden key on B was tapped: it is kept for good, whatever the round's result. */
function collectSecret() {
  progress.collectKey(level.chapter)
  playSfx('secret')
  vibrateFound()
  clearTimeout(secretTimer)
  secretShown.value = true
  secretTimer = window.setTimeout(() => (secretShown.value = false), SECRET_MS)
}

/** The status line: what to do now (the curtain keeps the line of the phase before it). */
const status = ref('show')
const timed = computed(() => phase.value === 'show' || phase.value === 'peek')
const canPeek = computed(() => phase.value === 'search' && !result.value && peeksLeft.value > 0)
/** "Next" once this level counts as completed (a failed round does not open the next one). */
const hasNext = computed(() => !!nextLevel && progress.isCompleted(level.id))
/** The round counts: stars in normal mode, every change found in calm mode. */
const passed = computed(() => !!result.value && (calm.value ? result.value.found === total : result.value.stars > 0))

function start() {
  scene?.destroy()
  starTimers.forEach(clearTimeout)
  found.value = 0
  mistakes.value = 0
  paused.value = false
  settingsOpen.value = false
  result.value = null
  clearTimeout(secretTimer)
  secretShown.value = false
  modeSetting = settings.mode
  mode.value = settings.mode
  peeksLeft.value = rules.value.memoryPeeks(level.memory!.peeks)
  playMusic(calm.value ? 'calm' : 'level')
  scene = new MemoryScene(
    board.value!,
    level,
    {
      onPhase: (p, ms) => {
        phase.value = p
        phaseMs.value = ms
        phaseKey.value++
        if (p !== 'curtain') status.value = p
      },
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
      onSecret: collectSecret,
      onComplete: (r) => {
        result.value = r
        playMusic('complete')
        if (calm.value) {
          if (r.found === r.total) progress.recordCalmCompletion(level.id)
          return
        }
        for (let i = 0; i < r.stars; i++) starTimers.push(window.setTimeout(() => playSfx('star', i), 300 + i * 250))
        if (r.stars === 0) return
        progress.recordResult(level.id, { timeSec: r.timeSec, mistakes: r.mistakes, hintsUsed: r.peeks, stars: r.stars })
      },
    },
    {
      // Calm mode and "reduce motion" both slow the scene down; the mode sets the miss and peek limits.
      animationSpeed: (settings.effectiveReduceMotion ? 0.5 : 1) * rules.value.animationSpeed,
      reduceMotion: settings.effectiveReduceMotion,
      maxMisses: maxMisses.value,
      peeks: peeksLeft.value,
      secretTaken: progress.hasKey(level.chapter),
    },
  )
}

/** The settings are closed: another mode chosen in them starts the level over in that mode. */
function closeSettings() {
  settingsOpen.value = false
  if (settings.mode === modeSetting) return
  start()
}

function peek() {
  if (!canPeek.value || !scene?.peek()) return
  peeksLeft.value = scene.peeksLeft
  playSfx('hint')
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
// to the dialog); after the round, to the level grid.
useBackButton(() => {
  if (result.value) router.push(grid)
  else if (settingsOpen.value) closeSettings()
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
  starTimers.forEach(clearTimeout)
  clearTimeout(secretTimer)
  scene?.destroy()
})
</script>

<template>
  <div class="level">
    <header class="hud" :class="{ still: settings.effectiveReduceMotion }">
      <span class="title">{{ $t('level.level', { n: number }) }} <ModeChip :mode="mode" /></span>
      <FoundSlots class="found" :total="total" :found="found" :still="settings.effectiveReduceMotion" />
      <span v-if="!calm" class="lives" role="img" :aria-label="$t('memoryMode.misses', { n: mistakes, max: maxMisses })">
        <svg v-for="i in maxMisses" :key="i" class="heart" :class="{ lost: i > maxMisses - mistakes }" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3.1A4.6 4.6 0 0 1 20 10c0 5.8-8 11-8 11Z" />
        </svg>
      </span>
    </header>

    <div class="status" role="status">
      <span class="text">{{ $t(`memoryMode.phases.${status}`) }}</span>
      <span class="bar">
        <span
          v-if="timed"
          :key="phaseKey"
          class="fill"
          :style="{ animationDuration: `${phaseMs}ms`, animationPlayState: paused ? 'paused' : 'running' }"
        />
      </span>
    </div>

    <!-- A paused round hides the pictures: no studying A behind the pause menu. -->
    <div class="board" :class="{ hidden: paused }">
      <!-- Filled by the engine; Vue must not render children here. -->
      <div ref="board" class="pictures" />
      <LevelId :id="level.id" boxed />
      <div v-if="phase === 'curtain'" :key="phaseKey" class="curtain" :class="{ still: settings.effectiveReduceMotion }" />
      <SecretFound v-if="secretShown" :still="settings.effectiveReduceMotion" />
    </div>

    <section v-if="result" class="result" :aria-label="$t('level.complete')">
      <h2>{{ passed ? $t('level.complete') : $t('memoryMode.failed') }}</h2>
      <StarRating v-if="!calm" :stars="result.stars" :size="36" animated />
      <p>
        {{ $t('memoryMode.foundOf', { found: result.found, total }) }}
        <template v-if="!calm"> · {{ $t('level.mistakes', { n: result.mistakes }) }}</template>
      </p>
      <p v-if="result.found < total" class="legend">{{ $t('memoryMode.legend') }}</p>
      <div class="actions">
        <button v-if="hasNext" @click="router.push({ name: 'memory', params: { id: nextLevel!.id } })">{{ $t('level.next') }}</button>
        <button :class="{ secondary: hasNext }" @click="start">{{ $t('level.retry') }}</button>
        <button class="secondary" @click="router.push(grid)">{{ $t('level.menu') }}</button>
      </div>
    </section>

    <footer v-else class="toolbar">
      <ToolButton
        v-if="hasPeeks"
        tone="hint"
        :label="`${$t('memoryMode.peek')} ${peeksLeft}`"
        :disabled="!canPeek"
        @click="peek"
      >
        <svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
      </ToolButton>
      <ToolButton :label="$t('memoryMode.finish')" :disabled="phase !== 'search'" @click="scene?.finish()">
        <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </ToolButton>
      <ToolButton :label="$t('level.pause')" @click="pause">
        <svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>
      </ToolButton>
    </footer>

    <SettingsOverlay v-if="settingsOpen" @close="closeSettings" />
    <PauseDialog
      v-else-if="paused"
      @resume="resume"
      @restart="start"
      @levels="router.push(grid)"
      @settings="settingsOpen = true"
      @exit="router.push({ name: 'home' })"
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
  margin-inline-end: auto;
}

.hud.still * {
  animation: none !important;
  transition: none !important;
}

.lives {
  display: inline-flex;
  gap: 2px;
}

.heart {
  width: 24px;
  height: 24px;
  fill: var(--danger);
  transition: fill 0.3s;
}

.heart.lost {
  fill: var(--soft);
}

/* What to do now, and the countdown of A on screen. */
.status {
  display: grid;
  gap: 6px;
  padding: 8px 16px 2px;
  text-align: center;
  font-size: 17px;
  font-weight: 700;
}

.bar {
  height: 6px;
  border-radius: 999px;
  background: var(--soft);
  overflow: hidden;
}

.fill {
  display: block;
  height: 100%;
  background: #e8457a;
  transform-origin: left;
  animation-name: drain;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes drain {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

.board {
  position: relative;
  flex: 1;
  min-height: 0;
}

.board.hidden .pictures {
  visibility: hidden;
}

.pictures {
  height: 100%;
  /* Portrait pictures (MEMORY_VIEWBOX): A and B of the reveal side by side on any screen. */
  display: flex;
  gap: 6px;
  padding: 6px;
}

/* Pictures are created by the engine, hence :deep. */
.pictures :deep(.ke-picture) {
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  width: 100%;
  height: 100%;
}

/* Between A and B: a dark curtain that opens again. */
.curtain {
  position: absolute;
  inset: 6px;
  border-radius: 14px;
  background: #2a2140;
  animation: curtain 0.5s ease-out both;
}

.curtain.still {
  animation: none;
}

@keyframes curtain {
  0%,
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.toolbar {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 6px 10px 10px;
}

.result {
  display: grid;
  justify-items: center;
  gap: 6px;
  margin: 0 10px 10px;
  padding: 12px 16px 14px;
  border-radius: 20px;
  background: var(--panel);
  box-shadow: 0 4px 14px rgb(0 0 0 / 0.12);
  text-align: center;
}

.result h2 {
  margin: 0;
  font-size: 20px;
}

.result p {
  margin: 0;
}

.legend {
  color: var(--muted);
  font-size: 14px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 4px;
}
</style>
