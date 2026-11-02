<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import BackButton from '../components/BackButton.vue'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import SegmentedSwitch from '../components/SegmentedSwitch.vue'
import { MATCH_MODES, type MatchMode } from '../engine/match.ts'
import type { Level } from '../engine/types.ts'
import { CHAPTERS, chapterLevels } from '../levels/chapters.ts'
import { useBackButton } from '../services/backButton.ts'
import { DUEL_HINTS, isMultiplayerReady, NAME_MAX, PLAYER_COLORS, TIME_LIMITS, TURN_LENGTHS, useDuoStore } from '../stores/duo.ts'
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
            <button class="mode" :class="{ current: setup.mode === m }" @click="chooseMode(m)">
              <span class="name">{{ $t(`duo.modes.${m}`) }}</span>
              <small>{{ $t(`duo.modeHints.${m}`) }}</small>
            </button>
          </li>
        </ul>
        <section v-if="duo.wins.length" class="panel wins">
          <h2>{{ $t('duo.wins') }}</h2>
          <ol>
            <li v-for="w in duo.wins.slice(0, 5)" :key="w.name">
              <span class="name">{{ w.name }}</span>
              <span class="count">{{ w.wins }}</span>
            </li>
          </ol>
        </section>
      </template>

      <template v-else-if="step === 'players'">
        <h1>{{ $t(`duo.modes.${setup.mode}`) }}</h1>
        <section v-for="(p, i) in setup.players" :key="i" class="panel player" :style="{ '--player': p.color }">
          <label class="name-row">
            <span class="dot" aria-hidden="true" />
            <input v-model="p.name" type="text" :maxlength="NAME_MAX" :placeholder="$t('duo.player', { n: i + 1 })" :aria-label="$t('duo.name', { n: i + 1 })" />
          </label>
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
                :class="{ paid: progress.needsPurchase(level.id), ready: isMultiplayerReady(level) }"
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
  padding: 12px max(16px, (100% - 560px) / 2) 24px;
  display: grid;
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

.mode {
  width: 100%;
  display: grid;
  gap: 4px;
  padding: 16px 20px;
  background: var(--panel);
  color: var(--fg);
  text-align: left;
  border: 2px solid var(--soft);
  border-radius: 16px;
}

.mode.current {
  border-color: var(--accent);
}

.mode .name {
  font-size: 20px;
  font-weight: 700;
}

.mode small,
.row small,
.label small {
  display: block;
  font-size: 13px;
  color: var(--muted);
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
  justify-content: space-between;
  gap: 12px;
}

.wins .count {
  font-weight: 700;
  color: var(--gold-fg);
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

.dot {
  flex: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--player);
}

.name-row input {
  flex: 1;
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

/* More differences: a longer, better match. */
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
