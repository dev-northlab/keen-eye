<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import BackButton from '../components/BackButton.vue'
import PlayerAvatar from '../components/PlayerAvatar.vue'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import SegmentedSwitch from '../components/SegmentedSwitch.vue'
import { MATCH_MODES, type MatchMode } from '../engine/match.ts'
import type { Level } from '../engine/types.ts'
import { CHAPTERS, chapterLevels } from '../levels/chapters.ts'
import { useBackButton } from '../services/backButton.ts'
import { AVATARS, DUEL_HINTS, NAME_MAX, PLAYER_COLORS, TIME_LIMITS, TURN_LENGTHS, useDuoStore } from '../stores/duo.ts'
import { useProgressStore } from '../stores/progress.ts'

// Two players: mode → players and rules → level, then the match. "Other level" after a match
// comes back straight to the level step (?step=level).

type Step = 'mode' | 'players' | 'level'
const STEPS: Step[] = ['mode', 'players', 'level']

const route = useRoute()
const router = useRouter()
const duo = useDuoStore()
const progress = useProgressStore()
const { t } = useI18n()

const step = ref<Step>(route.query.step === 'level' ? 'level' : 'mode')
const setup = computed(() => duo.setup)

function back() {
  const i = STEPS.indexOf(step.value)
  if (i === 0) router.push({ name: 'home' })
  else step.value = STEPS[i - 1]
}
useBackButton(back)

function chooseMode(mode: MatchMode) {
  duo.setup.mode = mode
  step.value = 'players'
}

const sections = CHAPTERS.map((chapter) => ({ chapter, levels: chapterLevels(chapter) })).filter((s) => s.levels.length)

function play(level: Level) {
  if (!duo.isAvailable(level)) router.push({ name: 'purchase' })
  else router.push({ name: 'match', params: { id: level.id } })
}

const timeOptions = computed(() =>
  TIME_LIMITS.map((v) => ({ value: v, label: v === null ? t('duo.noLimit') : t('duo.minutes', { n: v }) })),
)
const turnOptions = computed(() =>
  TURN_LENGTHS.map((v) => ({ value: v, label: v === null ? t('duo.untilMiss') : t('duo.seconds', { n: v }) })),
)
const hintOptions = computed(() => DUEL_HINTS.map((v) => ({ value: v, label: v ? t('duo.hintsOne') : t('duo.hintsNone') })))

/**
 * Mode card pictures (48×48 viewBox): two players with a spark between them (duel), a phone passed
 * round (hot seat), two players under one heart (co-op).
 */
const MODE_ICONS: Record<MatchMode, string> = {
  duel:
    '<circle cx="11" cy="19" r="5.5" fill="#3b82f6"/><path d="M2 41c0-7.5 4-11.5 9-11.5s9 4 9 11.5Z" fill="#3b82f6"/>' +
    '<circle cx="37" cy="19" r="5.5" fill="#ef4444"/><path d="M28 41c0-7.5 4-11.5 9-11.5s9 4 9 11.5Z" fill="#ef4444"/>' +
    '<path d="M26.5 5l-7.5 13h5.5l-3 12 8.5-14.5h-5.5Z" fill="#ffc933" stroke="#e0a100" stroke-width="1.4" stroke-linejoin="round"/>',
  hotseat:
    '<rect x="16" y="8" width="16" height="32" rx="3.5" fill="#3b82f6"/><rect x="18.5" y="12" width="11" height="22" rx="1.5" fill="#dbe8ff"/>' +
    '<circle cx="24" cy="37" r="1.4" fill="#dbe8ff"/>' +
    '<path d="M9 30A15 15 0 0 1 13 12M39 18a15 15 0 0 1-4 18" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M9.5 12.5L13 12l.8 3.6M38.5 35.5L35 36l-.8-3.6" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
  coop:
    '<path d="M24 16s-6.5-4-6.5-8.2a3.5 3.5 0 0 1 6.5-1.9 3.5 3.5 0 0 1 6.5 1.9C30.5 12 24 16 24 16Z" fill="#ef4444"/>' +
    '<circle cx="16" cy="25" r="5.5" fill="#f59e0b"/><path d="M6 45c0-8 4.5-12 10-12s10 4 10 12Z" fill="#f59e0b"/>' +
    '<circle cx="32" cy="25" r="5.5" fill="#22c55e"/><path d="M22 45c0-8 4.5-12 10-12s10 4 10 12Z" fill="#22c55e"/>',
}

/** A color is taken when the other player has it. */
const takenBy = (i: number, color: string) => setup.value.players[1 - i].color === color
</script>

<template>
  <div class="screen">
    <ScreenBackdrop theme="meadow" />
    <main>
      <template v-if="step === 'mode'">
        <h1>{{ $t('duo.modeTitle') }}</h1>
        <ul class="modes">
          <li v-for="m in MATCH_MODES" :key="m">
            <button class="mode" :class="[m, { current: setup.mode === m }]" @click="chooseMode(m)">
              <svg class="mode-icon" viewBox="0 0 48 48" aria-hidden="true" v-html="MODE_ICONS[m]" />
              <span class="text">
                <span class="name">{{ $t(`duo.modes.${m}`) }}</span>
                <small>{{ $t(`duo.modeHints.${m}`) }}</small>
              </span>
              <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </li>
        </ul>
        <section v-if="duo.wins.length" class="panel wins">
          <h2>
            <!-- A golden cup. -->
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 4h10v5a5 5 0 0 1-10 0Z" fill="#ffc933" stroke="#e0a100" stroke-width="1.4" stroke-linejoin="round" />
              <path d="M7 6H4.5v1.5A3.5 3.5 0 0 0 8 11M17 6h2.5v1.5A3.5 3.5 0 0 1 16 11" fill="none" stroke="#e0a100" stroke-width="1.6" stroke-linecap="round" />
              <path d="M12 14v3M8.5 20h7l-1-3h-5Z" fill="#e0a100" stroke="#e0a100" stroke-width="1.4" stroke-linejoin="round" />
            </svg>
            {{ $t('duo.wins') }}
          </h2>
          <ol>
            <li v-for="(w, i) in duo.wins.slice(0, 5)" :key="w.name" :class="`place-${i + 1}`">
              <span class="place">{{ i + 1 }}</span>
              <span class="name">{{ w.name }}</span>
              <span class="count">{{ w.wins }}</span>
            </li>
          </ol>
        </section>
      </template>

      <template v-else-if="step === 'players'">
        <h1>{{ $t(`duo.modes.${setup.mode}`) }}</h1>
        <section v-for="(p, i) in setup.players" :key="i" class="panel player" :style="{ '--player': p.color }">
          <div class="name-row">
            <div class="avatars" role="radiogroup" :aria-label="$t('duo.avatar', { n: i + 1 })">
              <button
                v-for="a in AVATARS"
                :key="a"
                class="avatar-option"
                role="radio"
                :aria-checked="p.avatar === a"
                :aria-label="$t(`duo.avatars.${a}`)"
                :class="{ active: p.avatar === a }"
                @click="p.avatar = a"
              >
                <PlayerAvatar :avatar="a" :color="p.color" />
              </button>
            </div>
            <input v-model="p.name" type="text" :maxlength="NAME_MAX" :placeholder="$t('duo.player', { n: i + 1 })" :aria-label="$t('duo.name', { n: i + 1 })" />
          </div>
          <div class="colors" role="radiogroup" :aria-label="$t('duo.color', { n: i + 1 })">
            <button
              v-for="c in PLAYER_COLORS"
              :key="c.id"
              class="swatch"
              role="radio"
              :aria-checked="p.color === c.value"
              :aria-label="$t(`duo.colors.${c.id}`)"
              :class="{ active: p.color === c.value }"
              :style="{ background: c.value }"
              :disabled="takenBy(i, c.value)"
              @click="p.color = c.value"
            />
          </div>
        </section>

        <section class="panel rules">
          <h2>{{ $t('duo.rules') }}</h2>
          <template v-if="setup.mode === 'duel'">
            <label class="row">
              <span>
                {{ $t('duo.faceToFace') }}
                <small>{{ $t('duo.faceToFaceHint') }}</small>
              </span>
              <input v-model="setup.faceToFace" type="checkbox" role="switch" />
            </label>
            <span class="label">{{ $t('duo.hints') }}</span>
            <SegmentedSwitch v-model="setup.duelHints" :options="hintOptions" :label="$t('duo.hints')" />
          </template>
          <template v-if="setup.mode === 'hotseat'">
            <span class="label">
              {{ $t('duo.turn') }}
              <small>{{ $t('duo.turnHint') }}</small>
            </span>
            <SegmentedSwitch v-model="setup.turnSec" :options="turnOptions" :label="$t('duo.turn')" />
          </template>
          <template v-else>
            <span class="label">{{ $t('duo.timeLimit') }}</span>
            <SegmentedSwitch v-model="setup.timeLimitMin" :options="timeOptions" :label="$t('duo.timeLimit')" />
          </template>
          <p v-if="setup.mode === 'coop'" class="note">{{ $t('duo.coopHints') }}</p>
        </section>

        <button class="next" @click="step = 'level'">{{ $t('duo.next') }}</button>
      </template>

      <template v-else>
        <h1>{{ $t('duo.levelTitle') }}</h1>
        <button class="next" @click="play(duo.randomLevel())">{{ $t('duo.random') }}</button>
        <section v-for="s in sections" :key="s.chapter.id" class="chapter" :style="{ '--chapter': s.chapter.color }">
          <h2>{{ $t(`chapters.${s.chapter.id}`) }}</h2>
          <ul class="grid">
            <li v-for="level in s.levels" :key="level.id">
              <button
                class="tile"
                :class="{ paid: progress.needsPurchase(level.id), ready: level.multiplayerReady }"
                :aria-label="`${$t('map.level', { n: level.id })}: ${progress.needsPurchase(level.id) ? $t('map.paid') : $t(`levelTitles.${level.title}`)} · ${$t('duo.differences', { n: level.differences.length })}`"
                @click="play(level)"
              >
                <span class="num">{{ level.id }}</span>
                <span class="diffs" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
                  {{ level.differences.length }}
                </span>
              </button>
            </li>
          </ul>
        </section>
      </template>
    </main>
    <BackButton :on-back="back" />
  </div>
</template>

<style scoped>
.screen {
  /* Own stacking context: the backdrop (z-index -1) stays behind the content. */
  position: relative;
  isolation: isolate;
  height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  overflow-y: auto;
  /* A centered column on wide screens; the padding (not a margin) keeps the scrollbar at the window edge. */
  padding: 12px max(16px, (100% - var(--menu-width)) / 2) 24px;
  display: grid;
  /* One column no wider than the screen, whatever the content's minimum width. */
  grid-template-columns: minmax(0, 1fr);
  grid-auto-rows: max-content;
  gap: 12px;
}

h1 {
  width: fit-content;
  margin: 0 auto;
  padding: 4px 18px;
  border-radius: 999px;
  background: var(--glass);
  font-size: 24px;
}

h2 {
  margin: 0 0 8px;
  font-size: 16px;
}

.panel {
  background: var(--panel);
  border-radius: 16px;
  padding: 14px 16px;
}

.modes {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}

/* A card per mode: a picture on a tinted tile, the name and hint, a chevron; the last chosen mode is outlined. */
.duel {
  --mode: #e5484d;
  --mode-soft: #ffe6e6;
}

.hotseat {
  --mode: #3b82f6;
  --mode-soft: #e3eeff;
}

.coop {
  --mode: #22a35a;
  --mode-soft: #dcf5e5;
}

.mode {
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 14px 14px 16px;
  background: var(--panel);
  color: var(--fg);
  text-align: left;
  border: 2px solid transparent;
  border-radius: 20px;
  box-shadow: 0 6px 16px rgb(35 48 43 / 0.12);
  transition: transform 0.12s ease;
}

/* A colored stripe along the left edge. */
.mode::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 6px;
  background: var(--mode);
}

.mode:active {
  transform: scale(0.98);
}

.mode.current {
  border-color: var(--mode);
}

.mode-icon {
  flex: none;
  width: 64px;
  height: 64px;
  padding: 8px;
  border-radius: 18px;
  background: var(--mode-soft);
}

.mode .text {
  flex: 1;
  min-width: 0;
  display: grid;
  gap: 3px;
}

.mode .name {
  font-size: 20px;
  font-weight: 700;
}

.chevron {
  flex: none;
  width: 34px;
  height: 34px;
  padding: 7px;
  border-radius: 50%;
  background: var(--mode-soft);
  fill: none;
  stroke: var(--mode);
  stroke-width: 2.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.mode small,
.row small,
.label small {
  display: block;
  font-size: 13px;
  color: var(--muted);
}

.wins {
  border-radius: 20px;
  box-shadow: 0 6px 16px rgb(35 48 43 / 0.12);
}

.wins h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.wins h2 svg {
  width: 26px;
  height: 26px;
}

.wins ol {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
}

.wins li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px 8px 8px;
  border-radius: 14px;
  background: var(--soft-2);
}

.wins .name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
}

/* Gold, silver and bronze for the first three places. */
.place {
  flex: none;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--soft);
  color: var(--muted);
  font-size: 14px;
  font-weight: 800;
}

.place-1 .place {
  background: linear-gradient(145deg, #ffe07a, #e0a100);
  color: #6b4a00;
}

.place-2 .place {
  background: linear-gradient(145deg, #eef1f4, #a9b3bd);
  color: #3f4952;
}

.place-3 .place {
  background: linear-gradient(145deg, #f3c39a, #b86a35);
  color: #5a2e10;
}

.wins .count {
  flex: none;
  min-width: 36px;
  padding: 2px 10px;
  border-radius: 999px;
  background: var(--gold-bg);
  color: var(--gold-fg);
  font-weight: 800;
  text-align: center;
}

.player {
  display: grid;
  gap: 12px;
  box-shadow: inset 0 0 0 3px var(--player);
}

.name-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatars {
  flex: none;
  display: flex;
  gap: 6px;
}

/* The unchosen character is dimmed; the chosen one gets a ring in the player's color. */
.avatar-option {
  width: 60px;
  height: 60px;
  padding: 0;
  border-radius: 50%;
  background: none;
  opacity: 0.45;
  transition:
    opacity 0.15s,
    transform 0.15s;
}

.avatar-option.active {
  opacity: 1;
  box-shadow:
    0 0 0 3px var(--panel),
    0 0 0 6px var(--player);
}

.avatar-option:active {
  transform: scale(0.94);
}

.avatar-option svg {
  width: 100%;
  height: 100%;
}

.name-row input {
  flex: 1;
  width: 0;
  min-width: 0;
  font: inherit;
  font-size: 18px;
  padding: 10px 12px;
  border: 2px solid var(--line);
  border-radius: 12px;
  background: var(--soft-2);
  color: var(--fg);
}

.colors {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.swatch {
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 0 3px rgb(255 255 255 / 0.5);
}

.swatch.active {
  box-shadow:
    0 0 0 3px var(--panel),
    0 0 0 6px var(--fg);
}

.swatch:disabled {
  opacity: 0.2;
  cursor: default;
}

.rules {
  display: grid;
  gap: 10px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.row input {
  width: 24px;
  height: 24px;
  accent-color: var(--accent);
}

.note {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
}

.next {
  font-size: 20px;
  font-weight: 600;
  padding: 14px 20px;
}

.chapter h2 {
  width: fit-content;
  padding: 2px 12px;
  border-radius: 999px;
  background: var(--panel);
  color: var(--chapter);
}

.grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  gap: 8px;
}

.tile {
  width: 100%;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 2px;
  padding: 4px;
  background: var(--panel);
  color: var(--fg);
  border: 2px solid var(--soft);
}

/* Multiplayer-ready: a longer, better match. */
.tile.ready {
  border-color: var(--chapter);
}

.tile.paid {
  background: var(--gold-bg);
  border-color: #f5b301;
  color: var(--gold-fg);
}

.num {
  font-size: 20px;
  font-weight: 700;
}

.diffs {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 13px;
  color: var(--muted);
}

.tile.paid .diffs {
  color: inherit;
}

.diffs svg {
  width: 14px;
  height: 14px;
}
</style>
