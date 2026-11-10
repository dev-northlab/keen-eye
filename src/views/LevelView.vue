<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ClueList from '../components/ClueList.vue'
import FoundSlots from '../components/FoundSlots.vue'
import HudCounters from '../components/HudCounters.vue'
import LevelId from '../components/LevelId.vue'
import ModeChip from '../components/ModeChip.vue'
import PauseDialog from '../components/PauseDialog.vue'
import PictureStyleSwitch from '../components/PictureStyleSwitch.vue'
import SecretFound from '../components/SecretFound.vue'
import ResultDialog from '../components/ResultDialog.vue'
import SettingsOverlay from '../components/SettingsOverlay.vue'
import ToolButton from '../components/ToolButton.vue'
import ToyText from '../components/ToyText.vue'
import TransformChip from '../components/TransformChip.vue'
import TransformNotice from '../components/TransformNotice.vue'
import TravelFact from '../components/TravelFact.vue'
import TreasureChest from '../components/TreasureChest.vue'
import { MODE_RULES, type GameMode } from '../engine/rules.ts'
import { GameScene } from '../engine/scene.ts'
import type { LevelResult } from '../engine/types.ts'
import { levelNumber, levelsScreen, nextLevel as nextLevelOf, TINY_BOY_CHAPTER, TREASURY_CHAPTER } from '../levels/chapters.ts'
import { allLevels, levelById } from '../levels/index.ts'
import { styledLevel } from '../levels/picture-style.ts'
import { playMusic, playSfx } from '../services/audio.ts'
import { useBackButton } from '../services/backButton.ts'
import { vibrateFound, vibrateMiss } from '../services/haptics.ts'
import { askForReview } from '../services/review.ts'
import { useProgressStore } from '../stores/progress.ts'
import { useSettingsStore } from '../stores/settings.ts'

const props = defineProps<{ id: number }>()
const router = useRouter()
const progress = useProgressStore()
const settings = useSettingsStore()
const { t } = useI18n()

// The route guard guarantees the level exists and is unlocked.
const level = levelById(props.id)!
const nextLevel = nextLevelOf(level)
const number = levelNumber(level)
/** The screen listing this level: its chapter's grid, the world map of "travel" or the case of "detective". */
const grid = levelsScreen(level)
/** The bonus level for all the hidden keys: named instead of numbered, a chest opens after it. */
const treasury = level.chapter === TREASURY_CHAPTER.id
/**
 * "Tiny boy": the player is not told how many differences there are, so the HUD shows only that there are some; no
 * modes either — every attempt plays by calm mode's rules (no timer, mistakes, lock or stars) with one hint, a level
 * is just won.
 */
const uncounted = level.chapter === TINY_BOY_CHAPTER.id
const baseUrl = import.meta.env.BASE_URL
/** "Travel" levels: the first visit earns a passport stamp (shown with the place's fact). */
const newStamp = ref(false)

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
/** How picture B is shown in this attempt: the level's transform, unless the mode shows B as drawn (calm). */
const transformB = computed(() => (rules.value.transformB ? level.transformB : undefined))
/** Hard mode: lost on too many mistakes; `result` then holds the attempt's numbers. */
const failed = ref(false)
/**
 * "Play on hard" from the result: this level's attempts (retries included) are in hard mode until the
 * screen is left, whatever the settings say.
 */
const hardChallenge = ref(false)
/** The mode setting as this attempt started: changed in the pause menu's settings, the attempt starts over. */
let modeSetting: GameMode = 'normal'
const hintActive = ref(false)
/** Hints taken in this attempt (the mode gives a few, `ModeRules.hints`). */
const hintsUsed = ref(0)
const animationFrozen = ref(false)
/**
 * Shown for a moment over the pictures: on "time" levels the hint of the natural change just tapped,
 * on "detective" ones the clue just found.
 */
const note = ref<string | null>(null)
let noteTimer = 0
/** The player tapped the transform badge: picture B is shown as drawn until tapped again. */
const straightB = ref(false)
/** The warning that picture B is mirrored or turned is open: the scene waits, its clock stopped. */
const transformNotice = ref(false)
/** The warning was shown on this visit: a retry starts at once. */
let transformWarned = false
/** "Secret key found!" is shown (docs/hidden-item-feature.md). */
const secretShown = ref(false)
let secretTimer = 0
const result = ref<LevelResult | null>(null)
let scene: GameScene | undefined
const total = level.differences.length

/** How long a note stays on screen. */
const NOTE_MS = 2600
/**
 * Picture B is mirrored or turned (docs/mirror-rotate-feature.md) and the player has not finished a level
 * shown this way yet: warn them as the level starts.
 */
const warnTransform = () =>
  !!transformB.value && !allLevels.some((l) => l.transformB === transformB.value && progress.isCompleted(l.id))

/** The chapter's hidden key was tapped: it is kept for good, even if the level is not finished. */
function collectSecret() {
  progress.collectKey(level.chapter)
  playSfx('secret')
  vibrateFound()
  clearTimeout(secretTimer)
  secretShown.value = true
  secretTimer = window.setTimeout(() => (secretShown.value = false), NOTE_MS)
}

function showNote(text: string) {
  clearTimeout(noteTimer)
  note.value = text
  noteTimer = window.setTimeout(() => (note.value = null), NOTE_MS)
}

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
  straightB.value = false
  clearTimeout(noteTimer)
  note.value = null
  clearTimeout(secretTimer)
  secretShown.value = false
  result.value = null
  failed.value = false
  modeSetting = settings.mode
  mode.value = uncounted ? 'calm' : hardChallenge.value ? 'hard' : settings.mode
  playMusic(uncounted ? 'tinyBoy' : calm.value ? 'calm' : 'level')
  scene = new GameScene(
    board.value!,
    // The picture style of this attempt (levels/picture-style.ts): the same number of differences either way.
    styledLevel(level, settings.pictureStyle),
    {
      onFound: (n, _total, i) => {
        found.value = n
        playSfx('found')
        vibrateFound()
        if (level.detective) showNote(`${t('detective.newClue')}: ${t(`detective.clueTexts.${level.detective.clues[i]}`)}`)
      },
      onMiss: (n) => {
        mistakes.value = n
        playSfx('miss')
        vibrateMiss()
      },
      onTrap: (i) => rules.value.trapNotes && showNote(t(`timeMode.traps.${level.traps![i].hint}`)),
      onLock: (l) => (locked.value = l),
      onTick: (s) => (seconds.value = s),
      onZoom: (s) => (zoom.value = s),
      onHint: (active) => (hintActive.value = active),
      onSecret: collectSecret,
      onComplete: (r) => {
        newStamp.value = !!level.travel && !progress.isCompleted(level.id)
        result.value = r
        playMusic('complete')
        if (mode.value === 'calm') progress.recordCalmCompletion(level.id)
        else if (mode.value === 'hard') progress.recordHardPass(level.id, r.stars)
        else progress.recordResult(level.id, r)
        if (mode.value !== 'normal' || r.stars === 3) askForReview(Object.keys(progress.records).length)
      },
      onFail: (r) => {
        failed.value = true
        result.value = r
      },
    },
    {
      // Calm mode and "reduce motion" both slow the scene down.
      animationSpeed: (settings.effectiveReduceMotion ? 0.5 : 1) * rules.value.animationSpeed,
      missLock: rules.value.missLock,
      maxMistakes: rules.value.maxMistakes,
      stars: rules.value.stars,
      extras: rules.value.extras,
      secretTaken: progress.hasKey(level.chapter),
      transformB: transformB.value,
    },
  )
  transformNotice.value = !transformWarned && warnTransform()
  if (transformNotice.value) {
    transformWarned = true
    scene.pause()
  }
}

/** The warning is closed: the level starts (unless the pause menu opened over it). */
function closeTransformNotice() {
  transformNotice.value = false
  if (!paused.value) scene?.resume()
}

/** Hints this attempt can still take (calm mode 3, normal 1, hard none). */
/** "Tiny boy" gives one hint per attempt; other levels get their mode's few. */
const hintsLeft = computed(() => (uncounted ? 1 : rules.value.hints) - hintsUsed.value)
const canHint = computed(() => !result.value && !hintActive.value && hintsLeft.value > 0)

function showHint() {
  if (!canHint.value || !scene?.hint()) return
  playSfx('hint')
  hintsUsed.value++
}

/** A level with redesigned pictures shows the picture style switch. */
const styleSwitch = computed(() => !!level.redesign)
// Another picture style has other zones: the attempt starts over in it.
watch(
  () => settings.pictureStyle,
  () => start(),
)

/** The settings are closed: another mode chosen in them starts the level over in that mode. */
function closeSettings() {
  settingsOpen.value = false
  if (uncounted || settings.mode === modeSetting) return
  hardChallenge.value = false
  start()
}

/** The same level again, in hard mode. */
function playHard() {
  hardChallenge.value = true
  start()
}

/** The transform badge: picture B as drawn, or mirrored/turned again. */
function toggleStraightB() {
  if (!transformB.value) return
  straightB.value = !straightB.value
  scene?.setTransformB(straightB.value ? 'none' : transformB.value)
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
  // The warning about picture B is still open: the level starts when it is closed.
  if (!transformNotice.value) scene?.resume()
}

// Android back: pause first; back again on the pause dialog leaves to the menu (from its settings, back
// to the dialog); after the level, to the map.
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
  clearTimeout(noteTimer)
  clearTimeout(secretTimer)
  scene?.destroy()
})
</script>

<template>
  <div class="level">
    <header v-if="uncounted" class="hud uncounted" :class="{ still: settings.effectiveReduceMotion }">
      <svg class="sparkle" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.6 7.4L22 11l-7.4 2.6L12 21l-2.6-7.4L2 11l7.4-2.6Z" /></svg>
      <ToyText class="call" :text="$t('level.uncounted')" :still="settings.effectiveReduceMotion" />
      <svg class="sparkle late" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.6 7.4L22 11l-7.4 2.6L12 21l-2.6-7.4L2 11l7.4-2.6Z" /></svg>
    </header>
    <header v-else class="hud" :class="{ still: settings.effectiveReduceMotion }">
      <span class="title">
        {{ treasury ? $t('chapters.treasury') : $t('level.level', { n: number }) }}
        <ModeChip :mode="mode" />
        <TransformChip v-if="transformB" :transform="transformB" :off="straightB" @click="toggleStraightB" />
        <span v-if="level.pair" class="pair">{{ $t(`timeMode.pairs.${level.pair}`) }}</span>
        <span v-if="level.travel" class="pair">{{ $t(`levelTitles.${level.title}`) }}</span>
      </span>
      <FoundSlots class="found" :total="total" :found="found" :still="settings.effectiveReduceMotion" />
      <HudCounters
        v-if="!calm"
        :time="time"
        :mistakes="mistakes"
        :max-mistakes="rules.maxMistakes"
        :locked="locked"
        :still="settings.effectiveReduceMotion"
      />
    </header>

    <div class="board" :class="{ locked }">
      <!-- Filled by the engine; Vue must not render children here. -->
      <div ref="board" class="pictures" />
      <LevelId :id="level.id" boxed />
      <div v-if="locked" class="lock-note">{{ $t('level.locked') }}</div>
      <div class="note" role="status">{{ note }}</div>
      <SecretFound v-if="secretShown" :still="settings.effectiveReduceMotion" />
    </div>

    <footer class="toolbar">
      <PictureStyleSwitch v-if="styleSwitch" class="style-switch" />
      <ToolButton
        v-if="rules.hints !== 0"
        tone="hint"
        :label="`${$t('level.hint')} ${hintsLeft}`"
        :disabled="!canHint"
        @click="showHint"
      >
        <svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </ToolButton>
      <!-- Developer mode (a checkbox in the developer tools): outlines all differences in red. -->
      <ToolButton v-if="settings.showPlaces" tone="danger" :label="$t('level.revealAll')" :disabled="!!result" @click="scene?.revealAll()">
        <svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
      </ToolButton>
      <ToolButton :label="$t('level.resetZoom')" :disabled="zoom === 1" @click="scene?.resetZoom()">
        <svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </ToolButton>
      <ToolButton
        v-if="calm && !uncounted"
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
      @levels="router.push(grid)"
      @settings="settingsOpen = true"
      @exit="router.push({ name: 'home' })"
    />
    <TransformNotice v-else-if="transformNotice && transformB" :transform="transformB" @close="closeTransformNotice" />
    <ResultDialog
      v-if="result"
      :result="result"
      :mode="mode"
      :portrait="uncounted ? `${baseUrl}banners/tiny-boy-smile.webp` : undefined"
      :failed="failed"
      :offer-hard="mode === 'normal' && progress.hardStars(level.id) < 3"
      :time="time"
      :has-next="!!nextLevel && (!failed || progress.isCompleted(level.id))"
      :share-text="treasury ? undefined : $t('share.level', { n: number })"
      @next="router.push({ name: 'level', params: { id: nextLevel!.id } })"
      @retry="start"
      @hard="playHard"
      @menu="router.push(grid)"
    >
      <TravelFact v-if="level.travel" :level="level" :new-stamp="newStamp" />
      <TreasureChest v-if="treasury" :still="settings.effectiveReduceMotion" />
      <template v-if="level.detective">
        <ClueList class="clues" :title="$t('detective.notebook')" :clues="level.detective.clues" />
        <!-- The case's last scene: on to naming the culprit. -->
        <button v-if="!nextLevel" class="solve" @click="router.push(grid)">{{ $t('detective.solveCase') }}</button>
      </template>
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

/* "Tiny boy": the call to find the differences in bright toy letters — each word its colour, a white rim and a
   darker depth under it, bobbing one after another between two twinkling stars. */
.hud.uncounted {
  flex-wrap: nowrap;
  justify-content: center;
  gap: 10px;
  padding: 8px 12px 12px;
  white-space: normal;
}

.call {
  font-size: clamp(17px, 4.2vw, 26px);
}

.sparkle {
  flex: none;
  width: 22px;
  height: 22px;
  fill: #ffc531;
  stroke: #fff;
  stroke-width: 1.5;
  filter: drop-shadow(0 2px 2px rgb(184 138 0 / 0.5));
  animation: twinkle 1.6s ease-in-out infinite;
}

.sparkle.late {
  animation-delay: 0.8s;
}

@keyframes twinkle {
  0%,
  100% {
    transform: scale(0.8) rotate(0deg);
    opacity: 0.75;
  }
  50% {
    transform: scale(1.15) rotate(20deg);
    opacity: 1;
  }
}

.hud .title {
  font-weight: 700;
  margin-inline-end: auto;
}

.hud .pair {
  margin-inline-start: 4px;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--soft);
  font-size: 13px;
  font-weight: 600;
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
  gap: 8px;
  padding: 6px 10px 10px;
}

.style-switch {
  align-self: center;
}

@media (max-width: 480px) {
  .toolbar {
    gap: 5px;
    padding: 6px 6px 10px;
  }
}

.note {
  position: absolute;
  top: 12px;
  left: 50%;
  translate: -50% 0;
  max-width: min(90%, 420px);
  padding: 8px 16px;
  border-radius: 14px;
  background: var(--panel);
  color: var(--fg);
  box-shadow: 0 4px 14px rgb(0 0 0 / 0.18);
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  pointer-events: none;
  z-index: 2;
}

.note:empty {
  display: none;
}

.clues {
  margin: 4px 0 12px;
}

.solve {
  width: 100%;
  margin-bottom: 8px;
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
