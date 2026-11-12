<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import FoundSlots from '../components/FoundSlots.vue'
import LevelId from '../components/LevelId.vue'
import ModalDialog from '../components/ModalDialog.vue'
import ModeChip from '../components/ModeChip.vue'
import PauseDialog from '../components/PauseDialog.vue'
import PictureStyleSwitch from '../components/PictureStyleSwitch.vue'
import SecretFound from '../components/SecretFound.vue'
import SettingsOverlay from '../components/SettingsOverlay.vue'
import StarRating from '../components/StarRating.vue'
import ToolButton from '../components/ToolButton.vue'
import { MemoryScene, type MemoryPhase, type MemoryResult } from '../engine/memory-scene.ts'
import { MODE_RULES, type GameMode } from '../engine/rules.ts'
import { levelNumber, levelsScreen, nextLevel as nextLevelOf } from '../levels/chapters.ts'
import { levelById } from '../levels/index.ts'
import { styledLevel } from '../levels/picture-style.ts'
import { playMusic, playSfx } from '../services/audio.ts'
import { useBackButton } from '../services/backButton.ts'
import { vibrateFound, vibrateMiss } from '../services/haptics.ts'
import { useProgressStore } from '../stores/progress.ts'
import { useSettingsStore } from '../stores/settings.ts'

// "Memory" level (docs/memory-mode.md): picture A for a few seconds, a curtain, then B alone — tap
// what changed. At the end A and B are shown together with every change outlined, and the result
// sits under them instead of a dialog, so the player sees what they missed. A round lost on misses
// keeps the answer hidden: B stays, under a dialog to try again.

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
    // The picture style of this attempt (levels/picture-style.ts): the same number of changes either way.
    styledLevel(level, settings.pictureStyle),
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
      maxMisses: maxMisses.value,
      peeks: peeksLeft.value,
      secretTaken: progress.hasKey(level.chapter),
    },
  )
}

/** A level with redesigned pictures shows the picture style switch. */
const styleSwitch = !!level.redesign
// Another picture style has other zones: the attempt starts over in it.
watch(
  () => settings.pictureStyle,
  () => start(),
)

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
    <header class="hud">
      <span class="title">{{ $t('level.level', { n: number }) }} <ModeChip :mode="mode" /></span>
      <FoundSlots class="found" :total="total" :found="found" />
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
      <div v-if="phase === 'curtain'" :key="phaseKey" class="curtain" />
      <SecretFound v-if="secretShown" />
    </div>

    <!-- The result under the revealed pictures, in the look of the level result dialog: a glossy coin by the title
         (a cup for a win, a tick in calm mode, an eye for "look what you missed"), stars, pills, candy buttons. -->
    <section v-if="result?.revealed" class="result" :class="passed ? (calm ? 'calm' : 'won') : 'lost'" :aria-label="$t('level.complete')">
      <div class="head">
        <span class="coin" aria-hidden="true">
          <svg v-if="!passed" viewBox="0 0 48 48">
            <path d="M5 24s7-12 19-12 19 12 19 12-7 12-19 12S5 24 5 24Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
            <circle cx="24" cy="24" r="6" fill="currentColor" />
          </svg>
          <svg v-else-if="calm" viewBox="0 0 48 48">
            <path d="M13 25l8 8 15-17" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg v-else viewBox="0 0 48 48">
            <path d="M15 8h18v11a9 9 0 0 1-18 0Z" fill="currentColor" />
            <path d="M15 11H9.5a5.5 5.5 0 0 0 6 7.5M33 11h5.5a5.5 5.5 0 0 1-6 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
            <path d="M21 27h6v6h-6Z" fill="currentColor" />
            <rect x="15" y="33" width="18" height="6" rx="2" fill="currentColor" />
          </svg>
        </span>
        <h2>{{ passed ? $t('level.complete') : $t('memoryMode.failed') }}</h2>
      </div>
      <StarRating v-if="!calm" class="result-stars" :stars="result.stars" :size="40" animated />
      <div class="stats">
        <span class="chip rise" style="--delay: 0.35s">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2" /><path d="M8 12.5l2.8 2.8L16.5 9.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          {{ $t('memoryMode.foundOf', { found: result.found, total }) }}
        </span>
        <span v-if="!calm" class="chip rise" style="--delay: 0.45s">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2" /><path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" /></svg>
          {{ $t('level.mistakes', { n: result.mistakes }) }}
        </span>
        <span v-if="result.found < total" class="legend rise" style="--delay: 0.55s">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-dasharray="4 3" /></svg>
          {{ $t('memoryMode.legend') }}
        </span>
      </div>
      <div class="actions">
        <button v-if="hasNext" class="candy next rise" style="--delay: 0.6s" @click="router.push({ name: 'memory', params: { id: nextLevel!.id } })">
          {{ $t('level.next') }}<svg class="btn-icon flip-rtl" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
        <button class="candy retry rise" style="--delay: 0.68s" @click="start">
          <svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 3.5v4h4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>{{ $t('level.retry') }}
        </button>
        <button class="candy menu rise" style="--delay: 0.75s" @click="router.push(grid)">
          <svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" /><path d="M9 4v14M15 6v14" stroke="currentColor" stroke-width="2.2" /></svg>{{ $t('level.menu') }}
        </button>
      </div>
    </section>

    <footer v-else-if="!result" class="toolbar">
      <PictureStyleSwitch v-if="styleSwitch" class="style-switch" />
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
    <!-- Lost on misses: no answer, only what came of it and a way to try again. -->
    <ModalDialog v-if="result && !result.revealed" class="fail" :title="$t('memoryMode.failed')">
      <template #icon>
        <span class="coin" aria-hidden="true">
          <svg viewBox="0 0 48 48">
            <path d="M24 41S6 30 6 17.5A9.5 9.5 0 0 1 24 12a9.5 9.5 0 0 1 18 5.5C42 30 24 41 24 41Z" fill="currentColor" />
            <path d="M24 12l-4 8.5 6 4.5-4 9" fill="none" stroke="var(--coin-lo)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </template>
      <div class="stats">
        <span class="chip rise" style="--delay: 0.3s">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2" /><path d="M8 12.5l2.8 2.8L16.5 9.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          {{ $t('memoryMode.foundOf', { found: result.found, total }) }}
        </span>
        <span class="chip rise" style="--delay: 0.4s">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2" /><path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" /></svg>
          {{ $t('level.mistakes', { n: result.mistakes }) }}
        </span>
      </div>
      <div class="actions">
        <!-- The first button is the main one (and takes the focus). -->
        <button class="candy retry wide rise" style="--delay: 0.5s" @click="start">
          <svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 3.5v4h4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>{{ $t('level.retry') }}
        </button>
        <button v-if="hasNext" class="candy rise" style="--delay: 0.58s" @click="router.push({ name: 'memory', params: { id: nextLevel!.id } })">
          {{ $t('level.next') }}<svg class="btn-icon flip-rtl" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
        <button class="candy menu rise" style="--delay: 0.65s" @click="router.push(grid)">
          <svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" /><path d="M9 4v14M15 6v14" stroke="currentColor" stroke-width="2.2" /></svg>{{ $t('level.menu') }}
        </button>
      </div>
    </ModalDialog>
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

.style-switch {
  align-self: center;
}

/* The result card slides up under the pictures with a little bounce, a glow at its top in the result's colour
   (`--glow`: gold for a win, green in calm mode, the mode's pink when it did not work out), then its parts rise one by
   one (`.rise` with its delay `--delay`). */
.result,
.fail {
  --glow: #e8457a;
  --coin-hi: #ffd0df;
  --coin-lo: #b8285a;
}

.result {
  display: grid;
  justify-items: center;
  gap: 8px;
  margin: 0 10px max(10px, env(safe-area-inset-bottom));
  padding: 14px 16px 18px;
  border-radius: 24px;
  background: radial-gradient(120% 80% at 50% 0%, color-mix(in srgb, var(--glow) 22%, var(--panel)), var(--panel) 70%);
  box-shadow:
    0 0 0 2px color-mix(in srgb, var(--glow) 30%, transparent),
    0 14px 30px -12px rgb(0 0 0 / 0.4);
  text-align: center;
  animation: card-in 0.5s cubic-bezier(0.3, 1.45, 0.5, 1) both;
}

.result.won {
  --glow: #ffd23f;
  --coin-hi: #fff3b0;
  --coin-lo: #e09a00;
}

.result.calm {
  --glow: #3ec46d;
  --coin-hi: #c8f7d8;
  --coin-lo: #22914c;
}

.head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.result h2 {
  margin: 0;
  font-size: 22px;
  animation: rise 0.4s 0.15s ease-out both;
}

/* A glossy coin with a white rim, popping in with a turn. */
.coin {
  flex: none;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: #fff;
  background: radial-gradient(circle at 35% 28%, var(--coin-hi), var(--glow) 45%, var(--coin-lo));
  box-shadow:
    0 0 0 3px #fff,
    0 0 0 5px var(--glow),
    0 8px 14px -6px color-mix(in srgb, var(--coin-lo) 70%, transparent);
  animation: badge-in 0.7s 0.1s cubic-bezier(0.3, 1.6, 0.5, 1) both;
}

.coin svg {
  width: 28px;
  height: 28px;
  filter: drop-shadow(0 2px 0 rgb(0 0 0 / 0.18));
}

/* Stars bigger and glossier than on the level tiles. */
.result-stars {
  display: grid;
  margin: -4px 0 0;
}

.result-stars :deep(.on) {
  text-shadow:
    0 3px 0 #c98a00,
    0 6px 10px rgb(200 140 0 / 0.35);
}

/* Found and mistakes: soft pills with an icon. */
.stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.chip,
.legend {
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

.chip svg,
.legend svg {
  width: 20px;
  height: 20px;
  flex: none;
  color: var(--accent);
}

/* What the red rings on the pictures mean. */
.legend {
  background: var(--danger-bg);
  color: var(--danger-fg);
  font-size: 14px;
}

.legend svg {
  color: var(--danger);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: min(100%, 520px);
  margin-top: 6px;
}

/* Candy buttons as in the result dialog: a light top fading into the colour (`--b`), a shine line, a darker depth
   (`--d`) they sink into when pressed. "Next" leads, with a gleam sweeping across now and then. */
.candy {
  --b: var(--accent);
  --d: color-mix(in srgb, var(--accent) 60%, #000);
  position: relative;
  overflow: hidden;
  flex: 1 1 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: max-content;
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

.candy:active {
  transform: translateY(4px);
  box-shadow:
    inset 0 2px 0 rgb(255 255 255 / 0.45),
    0 1px 0 var(--d),
    0 3px 6px -3px rgb(0 0 0 / 0.35);
}

.candy:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--b) 45%, #fff);
  outline-offset: 3px;
}

.candy:focus:not(:focus-visible) {
  outline: none;
}

.next {
  flex-basis: 100%;
  font-size: 19px;
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

.rise {
  animation: rise 0.45s var(--delay, 0s) cubic-bezier(0.3, 1.4, 0.5, 1) both;
}

/* The dialog of a round lost on misses: the result card's pink look, bigger coin, Retry leading. */
.fail :deep(.card) {
  background: radial-gradient(120% 60% at 50% 0%, color-mix(in srgb, var(--glow) 22%, var(--panel)), var(--panel) 70%);
  box-shadow: 0 24px 48px -16px rgb(0 0 0 / 0.5);
  animation: card-in 0.5s cubic-bezier(0.3, 1.45, 0.5, 1) both;
}

.fail :deep(.card > .icon) {
  width: 68px;
  height: 68px;
  margin-bottom: 14px;
  background: none;
}

.fail :deep(h2) {
  animation: rise 0.4s 0.15s ease-out both;
}

.fail .coin {
  width: 68px;
  height: 68px;
}

.fail .coin svg {
  width: 40px;
  height: 40px;
}

.fail .actions {
  margin-top: 18px;
}

.wide {
  flex-basis: 100%;
  min-height: 56px;
  font-size: 19px;
}

/* A short landscape screen (a phone on its side): the result on the start side, the buttons on the end side, so the
   pictures keep their height. */
@media (max-height: 600px) and (min-width: 600px) {
  .result {
    grid-template-columns: auto auto minmax(0, 300px);
    grid-template-areas:
      'head stars actions'
      'stats stats actions';
    justify-content: center;
    column-gap: 20px;
    row-gap: 6px;
    padding: 10px 18px 14px;
  }

  .head {
    grid-area: head;
  }

  .result-stars {
    grid-area: stars;
  }

  .result-stars {
    justify-self: start;
    margin: 0;
  }

  .stats {
    grid-area: stats;
  }

  .actions {
    grid-area: actions;
    align-self: center;
    margin-top: 0;
  }

  .coin {
    width: 36px;
    height: 36px;
  }

  .coin svg {
    width: 22px;
    height: 22px;
  }

  .result h2 {
    font-size: 20px;
  }
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}

@keyframes badge-in {
  from {
    transform: scale(0) rotate(-40deg);
  }
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
</style>
