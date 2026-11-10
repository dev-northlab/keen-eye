<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import BackButton from '../components/BackButton.vue'
import PhotoBanner from '../components/PhotoBanner.vue'
import PlayerAvatar from '../components/PlayerAvatar.vue'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import SegmentedSwitch from '../components/SegmentedSwitch.vue'
import { MATCH_MODES, type MatchMode } from '../engine/match.ts'
import type { Level } from '../engine/types.ts'
import { CHAPTERS, chapterLevels } from '../levels/chapters.ts'
import { useBackButton } from '../services/backButton.ts'
import { AVATARS, DUEL_HINTS, NAME_MAX, PLAYER_COLORS, TIME_LIMITS, TURN_LENGTHS, useDuoStore } from '../stores/duo.ts'
import { useProgressStore } from '../stores/progress.ts'
import { usePurchaseStore } from '../stores/purchase.ts'

// Two players: mode → players and rules → level, then the match. "Other level" after a match
// comes back straight to the level step (?step=level).

type Step = 'mode' | 'players' | 'level'
const STEPS: Step[] = ['mode', 'players', 'level']

const route = useRoute()
const router = useRouter()
const purchase = usePurchaseStore()
const duo = useDuoStore()
const progress = useProgressStore()
const { t } = useI18n()
const baseUrl = import.meta.env.BASE_URL

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
  if (!duo.isAvailable(level)) purchase.dialogOpen = true
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
 * Mode card pictures: the boy and the girl, their shirts in the given colors, under a spark (duel),
 * the phone the boy passes to the girl (hot seat) or a heart (co-op); badges are 30×20.
 */
const MODE_PAIRS: Record<MatchMode, { colors: [string, string]; badge: string }> = {
  duel: {
    colors: [PLAYER_COLORS[0].value, PLAYER_COLORS[1].value],
    badge: '<path d="M18.5 0.8 11 11.8h4.8l-2.2 7.6 8-11.4h-4.8Z" fill="#ffc933" stroke="#e0a100" stroke-width="1.3" stroke-linejoin="round"/>',
  },
  hotseat: {
    colors: [PLAYER_COLORS[0].value, PLAYER_COLORS[5].value],
    badge:
      '<path d="M2 11.5q2.5-5.5 8-7.5M3.5 15.5q1.5-2.5 4-4" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-opacity="0.75"/>' +
      '<g transform="rotate(18 15 10)"><rect x="10.5" y="1.5" width="9" height="17" rx="2" fill="#3b82f6"/>' +
      '<rect x="12" y="3.5" width="6" height="11" rx="0.8" fill="#dbe8ff"/><circle cx="15" cy="16.6" r="0.9" fill="#dbe8ff"/></g>' +
      '<path d="M22 3.5q4.5 2 6 7.5" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round"/>' +
      '<path d="M25.4 9.6l2.6 1.6 1.2-2.9" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  coop: {
    colors: [PLAYER_COLORS[3].value, PLAYER_COLORS[2].value],
    badge: '<path d="M15 19s-8.5-5.1-8.5-10.6A4.5 4.5 0 0 1 15 6a4.5 4.5 0 0 1 8.5 2.4C23.5 13.9 15 19 15 19Z" fill="#ef4444"/>',
  },
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
            <!-- Like the level banners: the mode's colour with a 3D picture at the end side (public/banners/duo-<mode>.webp). -->
            <PhotoBanner
              class="mode"
              :class="[m, { current: setup.mode === m }]"
              :photo="`${baseUrl}banners/duo-${m}.webp`"
              :name="$t(`duo.modes.${m}`)"
              @click="chooseMode(m)"
            >
              <template #icon>
                <span class="mode-icon" aria-hidden="true">
                  <PlayerAvatar class="kid boy" avatar="boy" :color="MODE_PAIRS[m].colors[0]" />
                  <PlayerAvatar class="kid girl" avatar="girl" :color="MODE_PAIRS[m].colors[1]" />
                  <svg class="badge" viewBox="0 0 30 20" v-html="MODE_PAIRS[m].badge" />
                </span>
              </template>
              {{ $t(`duo.modeHints.${m}`) }}
              <template #end>
                <svg class="chevron flip-rtl" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
              </template>
            </PhotoBanner>
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
        <button class="next" @click="play(duo.randomLevel())">{{ $t('map.random') }}</button>
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

/* A banner per mode, like the level banners (PhotoBanner): the mode's colour (`--mode`) under a 3D picture, the two
   kids on its icon tile, a candy chevron; the last chosen mode wears a white ring. */
.duel {
  --mode: #e5484d;
  --mode-soft: #ffe6e6;
  --banner-from: #ff7a7e;
  --banner-mid: #e5484d;
  --banner-to: #b8323a;
  --banner-shadow: rgb(184 50 58 / 0.6);
  --banner-icon-bg: #ffe6e6;
}

.hotseat {
  --mode: #3b82f6;
  --mode-soft: #e3eeff;
  --banner-from: #6aa6ff;
  --banner-mid: #3b82f6;
  --banner-to: #2459c4;
  --banner-shadow: rgb(36 89 196 / 0.6);
  --banner-icon-bg: #e3eeff;
}

.coop {
  --mode: #22a35a;
  --mode-soft: #dcf5e5;
  --banner-from: #4cc98a;
  --banner-mid: #22a35a;
  --banner-to: #187a42;
  --banner-shadow: rgb(24 122 66 / 0.6);
  --banner-icon-bg: #dcf5e5;
}

.mode.current {
  box-shadow:
    0 0 0 3px #fff,
    0 0 0 6px color-mix(in srgb, var(--mode) 55%, transparent),
    0 8px 18px -8px var(--banner-shadow);
}

.mode:active {
  transform: scale(0.98);
}

.mode-icon {
  position: relative;
  width: 100%;
  height: 100%;
}

.mode-icon .kid {
  position: absolute;
  bottom: 0;
  width: 31px;
  height: 31px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px #fff;
}

.mode-icon .boy {
  left: -3px;
}

.mode-icon .girl {
  right: -3px;
}

.mode-icon .badge {
  position: absolute;
  top: 0;
  left: 50%;
  width: 33px;
  height: 22px;
  transform: translateX(-50%);
}

/* A white candy button with the mode's arrow, over the picture; it sinks in when the banner is pressed. */
.chevron {
  position: relative;
  flex: none;
  width: 38px;
  height: 38px;
  padding: 8px;
  border-radius: 50%;
  background: #fff;
  fill: none;
  stroke: var(--mode);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  box-shadow:
    0 3px 0 color-mix(in srgb, var(--banner-to) 80%, #000),
    0 6px 10px -4px rgb(0 0 0 / 0.35);
}

.mode:active .chevron {
  translate: 0 2px;
  box-shadow: 0 1px 0 color-mix(in srgb, var(--banner-to) 80%, #000);
}

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
