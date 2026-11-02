<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, toRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import FoundSlots from '../components/FoundSlots.vue'
import MatchResultDialog from '../components/MatchResultDialog.vue'
import ModalDialog from '../components/ModalDialog.vue'
import PauseDialog from '../components/PauseDialog.vue'
import PlayerChip from '../components/PlayerChip.vue'
import SettingsOverlay from '../components/SettingsOverlay.vue'
import { Match, winnerOf, type MatchState, type PlayerId } from '../engine/match.ts'
import { MatchScene } from '../engine/match-scene.ts'
import { levelById } from '../levels/index.ts'
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

const level = levelById(props.id)!
// The setup is read once: a rematch replays the same match.
const setup = structuredClone(toRaw(duo.setup))
const rules = duo.rules
const faceToFace = rules.mode === 'duel' && setup.faceToFace
/** Zoom is off on a shared duel board (see MatchScene). */
const zoomable = faceToFace || rules.mode !== 'duel'
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
  const match = new Match(level.id, level.differences.length, setup.players.map((p, i) => ({ name: playerName(i), color: p.color })), rules)
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
    { animationSpeed: settings.effectiveReduceMotion ? 0.5 : 1 },
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
          <PlayerChip :player="player(2)" :locked="isLocked(2)" :hint="rules.hints > 0" :hint-disabled="!canHint(2)" @hint="hint(2)" />
        </div>
        <!-- Filled by the engine; Vue must not render children here. -->
        <div ref="far" class="pictures flipped" />
      </section>
      <div class="middle">
        <FoundSlots :total="level.differences.length" :found="state?.found.length ?? 0" :colors="foundColors" :still="settings.effectiveReduceMotion" />
        <span v-if="showTime" class="chip time">{{ time }}</span>
        <button class="secondary pause" :disabled="!!result" :aria-label="$t('level.pause')" @click="pause">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>
        </button>
      </div>
      <section class="half near" :class="{ locked: isLocked(1) }">
        <div ref="near" class="pictures" />
        <div v-if="state" class="bar">
          <PlayerChip :player="player(1)" :locked="isLocked(1)" :hint="rules.hints > 0" :hint-disabled="!canHint(1)" @hint="hint(1)" />
        </div>
      </section>
    </template>

    <template v-else>
      <header v-if="state" class="hud">
        <PlayerChip
          :player="player(1)"
          :locked="isLocked(1)"
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
          :locked="isLocked(2)"
          :active="rules.mode === 'hotseat' && state.currentTurn === 2"
          :hint="rules.mode === 'duel' && rules.hints > 0"
          :hint-disabled="!canHint(2)"
          @hint="hint(2)"
        />
      </header>

      <div class="board" :class="{ 'lock-1': isLocked(1), 'lock-2': isLocked(2) }">
        <!-- Filled by the engine; Vue must not render children here. -->
        <div ref="near" class="pictures" />
        <div v-if="rules.mode === 'coop' && isLocked(1)" class="lock-note">{{ $t('level.locked') }}</div>
      </div>

      <footer class="toolbar">
        <button v-if="rules.mode === 'coop'" class="secondary" :disabled="!state || !canHint(1)" @click="hint(1)">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          {{ $t('level.hint') }} {{ state?.players[0].hints }}
        </button>
        <button v-if="zoomable" class="secondary" :disabled="zoom === 1" @click="scene?.resetZoom()">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          {{ $t('level.resetZoom') }}
        </button>
        <button class="secondary" :disabled="!!result" @click="pause">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>
          {{ $t('level.pause') }}
        </button>
      </footer>
    </template>

    <ModalDialog v-if="handOver && !result" :title="$t('duo.turnOf', { name: player(handOver.playerId).name })">
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

/* Face to face: two halves, each with its own pair; both pairs side by side in a row. */
.half {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.half .pictures {
  flex: 1;
  min-height: 0;
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
