<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, toRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import FoundSlots from '../components/FoundSlots.vue'
import LockBadge from '../components/LockBadge.vue'
import MatchResultDialog from '../components/MatchResultDialog.vue'
import ModalDialog from '../components/ModalDialog.vue'
import PauseDialog from '../components/PauseDialog.vue'
import PlayerAvatar from '../components/PlayerAvatar.vue'
import PlayerChip from '../components/PlayerChip.vue'
import SettingsOverlay from '../components/SettingsOverlay.vue'
import ToolButton from '../components/ToolButton.vue'
import { Match, winnerOf, type MatchState, type PlayerId } from '../engine/match.ts'
import { MatchScene } from '../engine/match-scene.ts'
import { levelById } from '../levels/index.ts'
import { styledLevel } from '../levels/picture-style.ts'
import { playMusic, playSfx } from '../services/audio.ts'
import { useBackButton } from '../services/backButton.ts'
import { vibrateFound, vibrateMiss } from '../services/haptics.ts'
import { useDuoStore } from '../stores/duo.ts'
import { useSettingsStore } from '../stores/settings.ts'

// Two players on one device. The route guard guarantees the level exists and is available.

const props = defineProps<{ id: number }>()
const router = useRouter()
const duo = useDuoStore()
const settings = useSettingsStore()
const { t } = useI18n()

// The picture style is read as the screen opens (no switch inside a level), so retries keep it.
const level = styledLevel(levelById(props.id)!, settings.pictureStyle)
// The setup is read once: a rematch replays the same match.
const setup = structuredClone(toRaw(duo.setup))
const rules = duo.rules
const faceToFace = rules.mode === 'duel' && setup.faceToFace
/** Duels have no zoom (see MatchScene). */
const zoomable = rules.mode !== 'duel'
const still = computed(() => settings.effectiveReduceMotion)
const otherLevel = { name: 'duo', query: { step: 'level' } }

/** The shared board, or player 1's face to face. */
const near = ref<HTMLDivElement>()
/** Player 2's board face to face. */
const far = ref<HTMLDivElement>()
const state = ref<MatchState>()
const seconds = ref(0)
const zoom = ref(1)
const paused = ref(false)
const settingsOpen = ref(false)
/** A hint is shown on board 0 / 1. */
const hintShown = ref([false, false])
/** Hot-seat: waiting for this player to take the phone. */
const handOver = ref<{ playerId: PlayerId; first: boolean } | null>(null)
const result = ref<MatchState | null>(null)
let scene: MatchScene | undefined

const formatTime = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`

/** Countdown of the time limit or the hot-seat turn, else the elapsed time. */
const time = computed(() => {
  const s = state.value
  if (s?.mode === 'hotseat' && rules.turnSec !== null) return formatTime(Math.max(0, rules.turnSec - (seconds.value - Math.floor(s.turnStartedAt))))
  if (s?.mode !== 'hotseat' && rules.timeLimitSec !== null) return formatTime(Math.max(0, rules.timeLimitSec - seconds.value))
  return formatTime(seconds.value)
})
const showTime = computed(() => rules.mode !== 'hotseat' || rules.turnSec !== null)

const foundColors = computed(() => state.value?.found.map((f) => state.value!.players[f.byPlayer - 1].color) ?? [])
const isLocked = (id: PlayerId) => (state.value?.players[id - 1].lockedUntil ?? 0) > 0
const player = (id: PlayerId) => state.value!.players[id - 1]
const playerName = (i: number) => setup.players[i].name.trim() || t('duo.player', { n: i + 1 })

function start() {
  scene?.destroy()
  seconds.value = 0
  zoom.value = 1
  paused.value = false
  settingsOpen.value = false
  hintShown.value = [false, false]
  handOver.value = null
  result.value = null
  // Reduce motion slows the scene down; the match places moving zones on the same clock.
  const animationSpeed = settings.effectiveReduceMotion ? 0.5 : 1
  const players = setup.players.map((p, i) => ({ name: playerName(i), color: p.color }))
  const match = new Match(level, players, rules, { animationSpeed })
  state.value = structuredClone(match.state)
  playMusic('level')
  scene = new MatchScene(
    faceToFace ? [near.value!, far.value!] : [near.value!],
    level,
    match,
    {
      onChange: (s) => (state.value = s),
      onFound: () => {
        playSfx('found')
        vibrateFound()
      },
      onMiss: () => {
        playSfx('miss')
        vibrateMiss()
      },
      onTurn: (playerId) => (handOver.value = { playerId, first: false }),
      onTick: (s) => (seconds.value = s),
      onZoom: (s) => (zoom.value = s),
      onHint: (board, active) => (hintShown.value[board] = active),
      onComplete: (s) => {
        result.value = s
        playMusic('complete')
        duo.recordMatch({
          at: Date.now(),
          mode: s.mode,
          levelId: s.levelId,
          players: s.players.map((p) => ({ name: p.name, score: p.score })),
          winner: winnerOf(s) ?? 0,
        })
      },
    },
    { animationSpeed, reduceMotion: settings.effectiveReduceMotion },
  )
  // Hot-seat starts with the first player taking the phone.
  if (rules.mode === 'hotseat') {
    scene.pause()
    handOver.value = { playerId: 1, first: true }
  }
}

function canHint(id: PlayerId) {
  return !result.value && player(id).hints > 0 && !hintShown.value[scene?.boardOf(id) ?? 0]
}

function hint(id: PlayerId) {
  if (canHint(id) && scene?.hint(id)) playSfx('hint')
}

function ready() {
  handOver.value = null
  scene?.resume()
}

function pause() {
  if (result.value || paused.value) return
  paused.value = true
  scene?.pause()
}

function resume() {
  paused.value = false
  // Hot-seat: the clock stays stopped until the next player is ready.
  if (!handOver.value) scene?.resume()
}

// Android back: pause first; back again on the pause dialog leaves to the menu; after the match, too.
useBackButton(() => {
  if (result.value) router.push({ name: 'home' })
  else if (settingsOpen.value) settingsOpen.value = false
  else if (paused.value) router.push({ name: 'home' })
  else pause()
})

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
  <div
    class="match"
    :class="[rules.mode, { face: faceToFace }]"
    :style="{ '--p1': setup.players[0].color, '--p2': setup.players[1].color }"
  >
    <template v-if="faceToFace">
      <!-- Player 2 sits at the far side: their bar and pictures are turned to them. -->
      <section class="half far" :class="{ locked: isLocked(2) }">
        <div v-if="state" class="bar turned">
          <PlayerChip :player="player(2)" :avatar="setup.players[1].avatar" :locked="isLocked(2)" :still="still" :hint="rules.hints > 0" :hint-disabled="!canHint(2)" @hint="hint(2)" />
        </div>
        <div class="area">
          <!-- Filled by the engine; Vue must not render children here. -->
          <div ref="far" class="pictures flipped" />
          <LockBadge v-if="isLocked(2)" :still="still" />
        </div>
      </section>
      <div class="middle">
        <FoundSlots :total="level.differences.length" :found="state?.found.length ?? 0" :colors="foundColors" :still="settings.effectiveReduceMotion" />
        <span v-if="showTime" class="chip time">{{ time }}</span>
        <button class="secondary pause" :disabled="!!result" :aria-label="$t('level.pause')" @click="pause">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>
        </button>
      </div>
      <section class="half near" :class="{ locked: isLocked(1) }">
        <div class="area">
          <div ref="near" class="pictures" />
          <LockBadge v-if="isLocked(1)" :still="still" />
        </div>
        <div v-if="state" class="bar">
          <PlayerChip :player="player(1)" :avatar="setup.players[0].avatar" :locked="isLocked(1)" :still="still" :hint="rules.hints > 0" :hint-disabled="!canHint(1)" @hint="hint(1)" />
        </div>
      </section>
    </template>

    <template v-else>
      <header v-if="state" class="hud">
        <PlayerChip
          :player="player(1)"
          :avatar="setup.players[0].avatar"
          :locked="isLocked(1)"
          :still="still"
          :active="rules.mode === 'hotseat' && state.currentTurn === 1"
          :hint="rules.mode === 'duel' && rules.hints > 0"
          :hint-disabled="!canHint(1)"
          @hint="hint(1)"
        />
        <span class="center">
          <FoundSlots :total="level.differences.length" :found="state.found.length" :colors="foundColors" :still="settings.effectiveReduceMotion" />
          <span v-if="showTime" class="chip time">{{ time }}</span>
        </span>
        <PlayerChip
          :player="player(2)"
          :avatar="setup.players[1].avatar"
          :locked="isLocked(2)"
          :still="still"
          :active="rules.mode === 'hotseat' && state.currentTurn === 2"
          :hint="rules.mode === 'duel' && rules.hints > 0"
          :hint-disabled="!canHint(2)"
          @hint="hint(2)"
        />
      </header>

      <div class="board" :class="{ 'lock-1': isLocked(1), 'lock-2': isLocked(2) }">
        <!-- Filled by the engine; Vue must not render children here. -->
        <div ref="near" class="pictures" />
        <template v-if="rules.mode === 'duel'">
          <LockBadge v-if="isLocked(1)" class="side-1" :still="still" />
          <LockBadge v-if="isLocked(2)" class="side-2" :still="still" />
          <p class="rotate-note">{{ $t('duo.rotate') }}</p>
        </template>
        <LockBadge v-else-if="isLocked(1)" :label="$t('level.locked')" :still="still" />
        <!-- Hot-seat: the character of the player on turn, under their chip; keyed so it jumps in every turn. -->
        <PlayerAvatar
          v-if="rules.mode === 'hotseat' && state"
          :key="state.currentTurn"
          class="turn-badge"
          :class="[`at-${state.currentTurn}`, { still }]"
          :style="{ '--player': player(state.currentTurn).color }"
          :avatar="setup.players[state.currentTurn - 1].avatar"
          :color="player(state.currentTurn).color"
        />
      </div>

      <footer class="toolbar">
        <ToolButton
          v-if="rules.mode === 'coop'"
          tone="hint"
          :label="`${$t('level.hint')} ${state?.players[0].hints ?? ''}`"
          :disabled="!state || !canHint(1)"
          @click="hint(1)"
        >
          <svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </ToolButton>
        <ToolButton v-if="zoomable" :label="$t('level.resetZoom')" :disabled="zoom === 1" @click="scene?.resetZoom()">
          <svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </ToolButton>
        <ToolButton :label="$t('level.pause')" :disabled="!!result" @click="pause">
          <svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>
        </ToolButton>
      </footer>
    </template>

    <ModalDialog v-if="handOver && !result" :title="$t('duo.turnOf', { name: player(handOver.playerId).name })">
      <!-- The dialog mounts anew every turn, so the character jumps in each time. -->
      <PlayerAvatar
        class="turn-avatar"
        :class="{ still }"
        :style="{ '--player': player(handOver.playerId).color }"
        :avatar="setup.players[handOver.playerId - 1].avatar"
        :color="player(handOver.playerId).color"
      />
      <p v-if="!handOver.first" class="hand-over">{{ $t('duo.handOver') }}</p>
      <button class="ready" :style="{ background: player(handOver.playerId).color }" @click="ready">{{ $t('duo.ready') }}</button>
    </ModalDialog>
    <SettingsOverlay v-if="settingsOpen" @close="settingsOpen = false" />
    <PauseDialog
      v-else-if="paused"
      @resume="resume"
      @restart="start"
      @levels="router.push(otherLevel)"
      @settings="settingsOpen = true"
      @exit="router.push({ name: 'home' })"
    />
    <MatchResultDialog
      v-if="result"
      :state="result"
      :time="formatTime(seconds)"
      @rematch="start"
      @other="router.push(otherLevel)"
      @menu="router.push({ name: 'home' })"
    />
  </div>
</template>

<style scoped>
.match {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.hud {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  background: var(--panel);
  box-shadow: 0 1px 6px rgb(0 0 0 / 0.06);
  font-size: 15px;
}

.hud .center,
.middle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}

/* Narrow screens: the circles and the time get their own row under the players. */
@media (max-width: 720px) {
  .hud {
    flex-wrap: wrap;
    row-gap: 6px;
  }

  .hud .center {
    order: 1;
    width: 100%;
  }
}

.chip {
  padding: 4px 12px;
  border-radius: 999px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.time {
  background: var(--gold-bg);
  color: var(--gold-fg);
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

/* A duel is always side by side: the left half is player 1's, the right half player 2's. */
@media (orientation: landscape) {
  .pictures {
    flex-direction: row;
  }
}

.duel .pictures {
  flex-direction: row;
}

.rotate-note {
  display: none;
}

/* Portrait phone: the side-by-side pictures are small, ask to turn the device. */
@media (orientation: portrait) {
  .rotate-note {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    margin: 0;
    padding: 4px 14px;
    border-radius: 999px;
    background: var(--panel);
    color: var(--muted);
    font-size: 14px;
    white-space: nowrap;
    pointer-events: none;
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

/* Shared duel board: picture A is player 1's side, B player 2's. */
.duel:not(.face) .pictures :deep(.ke-picture:first-child) {
  outline: 3px solid var(--p1);
  outline-offset: -3px;
}

.duel:not(.face) .pictures :deep(.ke-picture:last-child) {
  outline: 3px solid var(--p2);
  outline-offset: -3px;
}

.board.lock-1 :deep(.ke-picture:first-child),
.board.lock-2 :deep(.ke-picture:last-child),
.half.locked :deep(.ke-picture) {
  opacity: 0.5;
}

/* Shared duel board: each lock over its own half. */
.side-1 {
  right: 50%;
}

.side-2 {
  left: 50%;
}

/* Face to face: two halves, each with its own pair; both pairs side by side in a row. */
.half {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.half .area {
  position: relative;
  flex: 1;
  min-height: 0;
}

.half .pictures {
  flex-direction: row;
}

/* The far copy is turned inside the svg; reversing the order puts A on its player's left. */
.half .pictures.flipped {
  flex-direction: row-reverse;
}

.bar {
  display: flex;
  justify-content: center;
  padding: 6px;
}

.bar.turned {
  transform: rotate(180deg);
}

.middle {
  padding: 4px 8px;
  background: var(--panel);
}

.middle .pause {
  display: grid;
  place-items: center;
  padding: 6px 10px;
}

.middle .pause svg {
  width: 20px;
  height: 20px;
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

/* Whose turn: the player's character jumps in, then sways, in a pulsing ring of their color. */
.turn-avatar,
.turn-badge {
  --gap: 5px;
  --ring: 10px;
  border-radius: 50%;
  box-shadow:
    0 0 0 var(--gap) var(--panel),
    0 0 0 var(--ring) var(--player);
  animation:
    jump-in 0.6s cubic-bezier(0.3, 1.6, 0.6, 1),
    sway 1.6s ease-in-out 0.6s infinite,
    ring 1.6s ease-in-out 0.6s infinite;
}

.turn-avatar {
  width: 140px;
  height: 140px;
  margin: 4px auto 18px;
}

/* In play: over the board's top corner under the chip; taps pass through to the pictures. */
.turn-badge {
  --gap: 3px;
  --ring: 6px;
  position: absolute;
  top: 12px;
  z-index: 1;
  width: 64px;
  height: 64px;
  pointer-events: none;
}

.turn-badge.at-1 {
  left: 16px;
}

.turn-badge.at-2 {
  right: 16px;
}

.turn-avatar.still,
.turn-badge.still {
  animation: none;
}

@keyframes jump-in {
  from {
    transform: scale(0.2) rotate(-25deg);
    opacity: 0;
  }
}

@keyframes sway {
  0%,
  100% {
    transform: translateY(0) rotate(0);
  }
  25% {
    transform: translateY(-6px) rotate(-5deg);
  }
  75% {
    transform: translateY(-6px) rotate(5deg);
  }
}

@keyframes ring {
  50% {
    box-shadow:
      0 0 0 var(--gap) var(--panel),
      0 0 0 calc(var(--ring) + 4px) var(--player);
  }
}

.hand-over {
  margin: 0 0 16px;
  color: var(--muted);
}

.ready {
  width: 100%;
  font-size: 20px;
  font-weight: 600;
}
</style>
