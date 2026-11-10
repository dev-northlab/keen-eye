<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import FactCard from '../components/FactCard.vue'
import FoundSlots from '../components/FoundSlots.vue'
import HudCounters from '../components/HudCounters.vue'
import LevelId from '../components/LevelId.vue'
import ModeChip from '../components/ModeChip.vue'
import PauseDialog from '../components/PauseDialog.vue'
import ResultDialog from '../components/ResultDialog.vue'
import SettingsOverlay from '../components/SettingsOverlay.vue'
import ToolButton from '../components/ToolButton.vue'
import { localized } from '../engine/anachronism.ts'
import { AnachronismScene } from '../engine/anachronism-scene.ts'
import { MODE_RULES, type GameMode } from '../engine/rules.ts'
import type { LevelResult, LocalizedText } from '../engine/types.ts'
import { timeTravelLevelById, timeTravelLevels } from '../levels/time-travel/index.ts'
import { playMusic, playSfx } from '../services/audio.ts'
import { useBackButton } from '../services/backButton.ts'
import { vibrateFound, vibrateMiss } from '../services/haptics.ts'
import { useProgressStore } from '../stores/progress.ts'
import { useSettingsStore } from '../stores/settings.ts'

// "Find the odd one out" level (docs/anachronism-mode.md): one picture of an era, tap what does not
// belong there; every find shows a fact. Same HUD, toolbar, pause and result dialogs as LevelView.

const props = defineProps<{ id: string }>()
const router = useRouter()
const { locale } = useI18n()
const progress = useProgressStore()
const settings = useSettingsStore()

// The route guard guarantees the level exists.
const level = timeTravelLevelById(props.id)!
const nextLevel = timeTravelLevels[timeTravelLevels.indexOf(level) + 1]
const imageUrl = import.meta.env.BASE_URL + level.image
const text = (t: LocalizedText) => localized(t, locale.value)

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
const mode = ref<GameMode>('normal')
const rules = computed(() => MODE_RULES[mode.value])
const calm = computed(() => mode.value === 'calm')
/** The mode setting as this attempt started: changed in the pause menu's settings, the attempt starts over. */
let modeSetting: GameMode = 'normal'
const hintActive = ref(false)
/** Hints taken in this attempt (the mode gives a few, `ModeRules.hints`). */
const hintsUsed = ref(0)
const animationFrozen = ref(false)
/** Item whose fact card is shown, with a counter so that every find restarts the card. */
const fact = ref<{ index: number; n: number } | null>(null)
const result = ref<LevelResult | null>(null)
let scene: AnachronismScene | undefined
/** Source of the level's SVG picture, loaded once when the screen opens. */
let source = ''
const total = level.items.length

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
  hintsUsed.value = 0
  animationFrozen.value = false
  fact.value = null
  result.value = null
  modeSetting = settings.mode
  mode.value = settings.mode
  playMusic(calm.value ? 'calm' : 'level')
  scene = new AnachronismScene(
    board.value!,
    level,
    source,
    {
      onFound: (index, n) => {
        found.value = n
        fact.value = { index, n }
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
        // The result dialog lists every fact.
        fact.value = null
        result.value = r
        playMusic('complete')
        progress.recordTimeTravel(level.id, calm.value ? null : r)
      },
    },
    {
      // Calm mode and "reduce motion" both slow the background down.
      animationSpeed: (settings.effectiveReduceMotion ? 0.5 : 1) * rules.value.animationSpeed,
      reduceMotion: settings.effectiveReduceMotion,
      missLock: rules.value.missLock,
    },
  )
}

/** Hints this attempt can still take (calm mode 3, normal 1). */
const hintsLeft = computed(() => rules.value.hints - hintsUsed.value)
const canHint = computed(() => !result.value && !hintActive.value && hintsLeft.value > 0)

function showHint() {
  if (!canHint.value || !scene?.hint()) return
  playSfx('hint')
  hintsUsed.value++
}

/** The settings are closed: another mode chosen in them starts the level over in that mode. */
function closeSettings() {
  settingsOpen.value = false
  if (settings.mode === modeSetting) return
  start()
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

const toEras = () => router.push({ name: 'eras' })

// Android back: pause first; back again on the pause dialog leaves to the menu (from its settings, back
// to the dialog); after the level, to the eras.
useBackButton(() => {
  if (result.value) toEras()
  else if (settingsOpen.value) closeSettings()
  else if (paused.value) router.push({ name: 'home' })
  else pause()
})

// Leaving the app (home button, switching tabs) pauses the level.
function onVisibility() {
  if (document.hidden) pause()
}

let mounted = true
onMounted(async () => {
  document.addEventListener('visibilitychange', onVisibility)
  // A bundled asset: the picture is inlined (not an <img>) so that its background can move.
  source = await (await fetch(imageUrl)).text()
  if (mounted) start()
})
onBeforeUnmount(() => {
  mounted = false
  document.removeEventListener('visibilitychange', onVisibility)
  scene?.destroy()
})
</script>

<template>
  <div class="level">
    <header class="hud" :class="{ still: settings.effectiveReduceMotion }">
      <span class="title">
        {{ text(level.era) }}
        <ModeChip :mode="mode" />
        <small>{{ $t('timeTravel.task') }}</small>
      </span>
      <FoundSlots class="found" :total="total" :found="found" :still="settings.effectiveReduceMotion" />
      <HudCounters
        v-if="!calm"
        :time="time"
        :mistakes="mistakes"
        :locked="locked"
        :still="settings.effectiveReduceMotion"
      />
    </header>

    <div class="board" :class="{ locked }">
      <!-- Filled by the engine; Vue must not render children here. -->
      <div ref="board" class="pictures" />
      <LevelId :id="level.number" boxed />
      <div v-if="locked" class="lock-note">{{ $t('level.locked') }}</div>
      <FactCard
        v-if="fact"
        :key="fact.n"
        :label="text(level.items[fact.index].label)"
        :fact="text(level.items[fact.index].fact)"
        :still="settings.effectiveReduceMotion"
        @close="fact = null"
      />
    </div>

    <footer class="toolbar">
      <ToolButton
        v-if="rules.hints !== 0"
        tone="hint"
        :label="`${$t('level.hint')} ${hintsLeft}`"
        :disabled="!canHint"
        @click="showHint"
      >
        <svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </ToolButton>
      <!-- Developer mode (a checkbox in the developer tools): outlines all items in red. -->
      <ToolButton v-if="settings.showPlaces" tone="danger" :label="$t('level.revealAll')" :disabled="!!result" @click="scene?.revealAll()">
        <svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
      </ToolButton>
      <ToolButton :label="$t('level.resetZoom')" :disabled="zoom === 1" @click="scene?.resetZoom()">
        <svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </ToolButton>
      <ToolButton
        v-if="calm"
        :label="animationFrozen ? $t('level.animPlay') : $t('level.animPause')"
        :aria-pressed="animationFrozen"
        @click="toggleAnimation"
      >
        <svg viewBox="0 0 24 24">
          <path v-if="animationFrozen" d="M8 5v14l11-7Z" fill="currentColor" />
          <rect v-else x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
        </svg>
      </ToolButton>
      <ToolButton :label="$t('level.pause')" :disabled="!!result" @click="pause">
        <svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>
      </ToolButton>
    </footer>

    <SettingsOverlay v-if="settingsOpen" @close="closeSettings" />
    <PauseDialog
      v-else-if="paused"
      @resume="resume"
      @restart="start"
      @levels="toEras"
      @settings="settingsOpen = true"
      @exit="router.push({ name: 'home' })"
    />
    <ResultDialog
      v-if="result"
      :result="result"
      :mode="mode"
      :time="time"
      :has-next="!!nextLevel"
      @next="router.push({ name: 'time-travel', params: { id: nextLevel!.id } })"
      @retry="start"
      @menu="toEras"
    >
      <h3 class="facts-title">{{ $t('timeTravel.facts') }}</h3>
      <ul class="facts">
        <li v-for="item in level.items" :key="item.id">
          <strong>{{ text(item.label) }}</strong>
          {{ text(item.fact) }}
        </li>
      </ul>
    </ResultDialog>
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
  display: grid;
  font-weight: 700;
  margin-inline-end: auto;
}

.hud .title small {
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
}

/* Narrow screens: the circles get their own row under the title, time and mistakes. */
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
  padding: 6px;
}

/* The picture is created by the engine, hence :deep. */
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
  padding: 6px 10px 10px;
}

@media (max-width: 480px) {
  .toolbar {
    gap: 5px;
    padding: 6px 6px 10px;
  }
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

.facts-title {
  margin: 4px 0 6px;
  font-size: 16px;
}

.facts {
  max-height: 34vh;
  overflow-y: auto;
  margin: 0 0 14px;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
  text-align: start;
  font-size: 14px;
  line-height: 1.35;
}

.facts strong {
  display: block;
}
</style>
