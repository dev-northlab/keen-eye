<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ClueList from '../components/ClueList.vue'
import ClueCounter from '../components/ClueCounter.vue'
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
import { preloadPictures } from '../services/images.ts'
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
const note = ref<{ title?: string; text: string; n: number } | null>(null)
let noteTimer = 0
let noteCount = 0
/** The note's 3D icon: the mode's own (public/icons/time.webp, detective.webp). */
const noteIcon = `${import.meta.env.BASE_URL}icons/${level.chapter}.webp`
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

function showNote(text: string, title?: string) {
  clearTimeout(noteTimer)
  note.value = { title, text, n: ++noteCount }
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
  modeSetting = settings.mode
  mode.value = uncounted ? 'calm' : settings.mode
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
        if (level.detective) showNote(t(`detective.clueTexts.${level.detective.clues[i]}`), t('detective.newClue'))
      },
      onMiss: (n) => {
        mistakes.value = n
        playSfx('miss')
        vibrateMiss()
      },
      onTrap: (i) => showNote(t(`timeMode.traps.${level.traps![i].hint}`)),
      onLock: (l) => (locked.value = l),
      onTick: (s) => (seconds.value = s),
      onZoom: (s) => (zoom.value = s),
      onHint: (active) => (hintActive.value = active),
      onSecret: collectSecret,
      onComplete: (r) => {
        newStamp.value = !!level.travel && !progress.isCompleted(level.id)
        result.value = r
        // While the result dialog is read, the next level's pictures get ready.
        if (nextLevel) preloadPictures(styledLevel(nextLevel, settings.pictureStyle))
        playMusic('complete')
        if (calm.value) progress.recordCalmCompletion(level.id)
        else progress.recordResult(level.id, r)
        if (calm.value || r.stars === 3) askForReview(Object.keys(progress.records).length)
      },
    },
    {
      // Calm mode and "reduce motion" both slow the scene down.
      animationSpeed: (settings.effectiveReduceMotion ? 0.5 : 1) * rules.value.animationSpeed,
      missLock: rules.value.missLock,
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

/** Hints this attempt can still take: "tiny boy" gives one, other levels their mode's few (calm 3, normal 1). */
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
    <header v-if="uncounted" class="hud uncounted">
      <svg class="sparkle" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.6 7.4L22 11l-7.4 2.6L12 21l-2.6-7.4L2 11l7.4-2.6Z" /></svg>
      <ToyText class="call" :text="$t('level.uncounted')" />
      <svg class="sparkle late" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.6 7.4L22 11l-7.4 2.6L12 21l-2.6-7.4L2 11l7.4-2.6Z" /></svg>
    </header>
    <header v-else class="hud">
      <span class="title">
        {{ treasury ? $t('chapters.treasury') : $t('level.level', { n: number }) }}
        <ModeChip :mode="mode" />
        <TransformChip v-if="transformB" :transform="transformB" :off="straightB" @click="toggleStraightB" />
        <span v-if="level.pair" class="pair">{{ $t(`timeMode.pairs.${level.pair}`) }}</span>
        <span v-if="level.travel" class="pair">{{ $t(`levelTitles.${level.title}`) }}</span>
      </span>
      <!-- A detective scene keeps the number of its clues to itself: only the ones found so far. -->
      <ClueCounter v-if="level.detective" class="found" :found="found" />
      <FoundSlots v-else class="found" :total="total" :found="found" />
      <HudCounters
        v-if="!calm"
        :time="time"
        :mistakes="mistakes"
        :locked="locked"
      />
    </header>

    <div class="board" :class="{ locked }">
      <!-- Filled by the engine; Vue must not render children here. -->
      <div ref="board" class="pictures" />
      <!-- Test levels: what each picture is, over its top corner (laid out like the pictures). -->
      <div v-if="level.testLabels" class="test-labels" aria-hidden="true">
        <div v-for="(label, i) in level.testLabels" :key="i" class="test-cell">
          <span class="test-label"><b>{{ i ? 'B' : 'A' }}</b> {{ label }}</span>
        </div>
      </div>
      <LevelId :id="level.id" boxed />
      <div v-if="locked" class="lock-note">{{ $t('level.locked') }}</div>
      <div class="note-slot" role="status">
        <Transition name="note">
          <div v-if="note" :key="note.n" class="note" :class="{ clue: !!level.detective }">
            <img class="note-icon" :src="noteIcon" alt="" />
            <span class="note-body">
              <span v-if="note.title" class="note-title">{{ note.title }}</span>
              <span class="note-text">{{ note.text }}</span>
            </span>
          </div>
        </Transition>
      </div>
      <SecretFound v-if="secretShown" />
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
      :portrait="uncounted ? `${baseUrl}banners/tiny-boy-smile.avif` : undefined"
      :time="time"
      :has-next="!!nextLevel"
      :share-text="treasury ? undefined : $t('share.level', { n: number })"
      @next="router.push({ name: 'level', params: { id: nextLevel!.id } })"
      @retry="start"
      @menu="router.push(grid)"
    >
      <TravelFact v-if="level.travel" :level="level" :new-stamp="newStamp" />
      <TreasureChest v-if="treasury" />
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

/* Over the pictures (same padding and gap), each label at the top of its half; taps go through. */
.test-labels {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
  pointer-events: none;
}

@media (orientation: landscape) {
  .test-labels {
    flex-direction: row;
  }
}

.test-cell {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.test-label {
  padding: 4px 10px;
  border-radius: 999px;
  background: rgb(0 0 0 / 0.62);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.test-label b {
  color: #ffd23f;
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

.note-slot {
  position: absolute;
  top: 12px;
  left: 50%;
  translate: -50% 0;
  width: max-content;
  max-width: min(92%, 440px);
  pointer-events: none;
  z-index: 2;
}

/* A natural change tapped on a "time" level, or a clue found on a "detective" one: the mode's 3D icon
   in a soft tinted bubble that drops in with a bounce. */
.note {
  --tone: var(--hint);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 18px 6px 6px;
  border-radius: 999px;
  border: 1.5px solid color-mix(in srgb, var(--tone) 45%, transparent);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--tone) 6%, var(--panel)),
    color-mix(in srgb, var(--tone) 16%, var(--panel))
  );
  color: var(--fg);
  box-shadow:
    0 8px 22px rgb(0 0 0 / 0.16),
    0 2px 4px rgb(0 0 0 / 0.08),
    inset 0 1px 0 rgb(255 255 255 / 0.3);
  animation: note-in 0.5s cubic-bezier(0.3, 1.5, 0.5, 1);
}

.note.clue {
  --tone: var(--twist);
}

.note-icon {
  flex: none;
  width: 42px;
  height: 42px;
  padding: 3px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--tone) 30%, var(--panel)) 0 55%, transparent 72%);
  filter: drop-shadow(0 2px 3px rgb(0 0 0 / 0.18));
  animation: note-wobble 0.9s ease-out 0.15s;
}

.note-body {
  display: flex;
  flex-direction: column;
  min-width: 0;
  text-align: start;
}

.note-title {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--tone) 75%, var(--fg));
}

.note-text {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  text-wrap: balance;
}

.note-leave-active {
  /* Out of the flow, so the next note pops in at the same place while this one fades. */
  position: absolute;
  top: 0;
  left: 50%;
  translate: -50% 0;
  width: max-content;
  max-width: min(92vw, 440px);
  transition:
    opacity 0.3s ease,
    translate 0.3s ease;
}

.note-leave-to {
  opacity: 0;
  translate: -50% -10px;
}

@keyframes note-in {
  from {
    opacity: 0;
    scale: 0.7;
    translate: 0 -14px;
  }
}

@keyframes note-wobble {
  0% {
    rotate: -18deg;
    scale: 0.6;
  }
  45% {
    rotate: 10deg;
    scale: 1.12;
  }
  75% {
    rotate: -4deg;
  }
  100% {
    rotate: 0deg;
    scale: 1;
  }
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
