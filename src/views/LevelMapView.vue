<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import BackButton from '../components/BackButton.vue'
import KeyBadge from '../components/KeyBadge.vue'
import LevelId from '../components/LevelId.vue'
import {
  CHAPTERS,
  chapterLevels,
  chapterLevelsWithHidden,
  chapterSize,
  DETECTIVE_CHAPTER,
  KEY_CHAPTERS,
  MEMORY_CHAPTER,
  TIME_CHAPTER,
  TEST_CHAPTER,
  TRAVEL_CHAPTER,
  TREASURY_CHAPTER,
  type Chapter,
} from '../levels/chapters.ts'
import { treasuryLevel } from '../levels/index.ts'
import { timeTravelLevels } from '../levels/time-travel/index.ts'
import { useProgressStore } from '../stores/progress.ts'
import { usePurchaseStore } from '../stores/purchase.ts'
import { useSettingsStore } from '../stores/settings.ts'

// Game modes: one banner each with its totals. "Spot the difference" opens the worlds (WorldsView),
// "find the odd one out" (docs/anachronism-mode.md) its eras (TimeTravelView), "spot the difference
// in time" (docs/time-differences-mode.md) and "memory" (docs/memory-mode.md) their level grids
// (ChapterView of TIME_CHAPTER, MEMORY_CHAPTER), "travel" (docs/world-travel-mode.md) its world map (TravelView),
// "detective" (docs/detective-mode.md) its cases (DetectiveView). Category banners show whether their
// hidden key is found; the last banner, the treasury (docs/hidden-item-feature.md), counts the keys
// and opens its bonus level once all are found. Developer mode adds the "test" levels (TEST_CHAPTER) at the end.

const router = useRouter()
const purchase = usePurchaseStore()
const progress = useProgressStore()
const settings = useSettingsStore()

const levels = CHAPTERS.flatMap(chapterLevels)
const worlds = {
  ids: levels.map((l) => l.id),
  total: CHAPTERS.reduce((s, c) => s + chapterSize(c), 0),
  done: () => levels.filter((l) => progress.isCompleted(l.id)).length,
  stars: () => levels.reduce((s, l) => s + (progress.records[l.id]?.stars ?? 0), 0),
  hard: () => levels.reduce((s, l) => s + progress.hardStars(l.id), 0),
}

function category(chapter: Chapter) {
  const own = chapterLevels(chapter)
  return {
    ids: own.map((l) => l.id),
    total: chapterSize(chapter),
    done: () => own.filter((l) => progress.isCompleted(l.id)).length,
    stars: () => own.reduce((s, l) => s + (progress.records[l.id]?.stars ?? 0), 0),
    hard: () => own.reduce((s, l) => s + progress.hardStars(l.id), 0),
  }
}
const time = category(TIME_CHAPTER)
const memory = category(MEMORY_CHAPTER)
const travel = category(TRAVEL_CHAPTER)
const detective = category(DETECTIVE_CHAPTER)

/** Worlds whose key is found (the "spot the difference" banner stands for all of them). */
const worldKeys = () => CHAPTERS.filter((c) => progress.hasKey(c.id)).length
const keysFound = () => KEY_CHAPTERS.filter((c) => progress.hasKey(c.id)).length
/** All keys found (or every level opened for testing). */
const treasuryOpen = () => progress.allKeysFound || progress.devOpenAll

function openTreasury() {
  if (progress.needsPurchase(treasuryLevel.id)) purchase.dialogOpen = true
  else if (progress.isUnlocked(treasuryLevel.id)) router.push({ name: 'level', params: { id: treasuryLevel.id } })
}

/** "Test" levels: all hidden (levels/upcoming.ts), so counted with chapterLevelsWithHidden. */
const testLevels = chapterLevelsWithHidden(TEST_CHAPTER)
const test = {
  ids: testLevels.map((l) => l.id),
  done: () => testLevels.filter((l) => progress.isCompleted(l.id)).length,
}

const timeTravel = {
  ids: timeTravelLevels.map((l) => l.number),
  total: timeTravelLevels.length,
  done: () => timeTravelLevels.filter((l) => l.id in progress.timeTravel).length,
  stars: () => timeTravelLevels.reduce((s, l) => s + (progress.timeTravel[l.id]?.stars ?? 0), 0),
  hard: () => timeTravelLevels.reduce((s, l) => s + progress.hardStars(l.id), 0),
}
</script>

<template>
  <div class="screen">
    <ScreenBackdrop theme="meadow" />
    <main>
      <ul class="list">
        <li>
          <button class="mode spot" @click="router.push({ name: 'worlds' })">
            <LevelId :id="worlds.ids" />
            <!-- A big faint magnifier behind the text. -->
            <svg class="art" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="42" cy="42" r="30" fill="none" stroke="#fff" stroke-width="7" />
              <path d="M64 64l24 24" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" />
            </svg>
            <!-- Two pictures, the second with a red sun, and a magnifier over it. -->
            <svg class="icon" viewBox="0 0 48 48" aria-hidden="true">
              <rect x="2" y="9" width="20" height="24" rx="3" fill="#bfe6cf" />
              <path d="M2 26l6-5 5 4 9-6v11a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3Z" fill="#3fa46f" />
              <circle cx="15" cy="15" r="3" fill="#f2b04a" />
              <rect x="26" y="9" width="20" height="24" rx="3" fill="#bfe6cf" />
              <path d="M26 26l6-5 5 4 9-6v11a3 3 0 0 1-3 3h-14a3 3 0 0 1-3-3Z" fill="#3fa46f" />
              <circle cx="39" cy="15" r="3" fill="#e5484d" />
              <circle cx="38" cy="16" r="7" fill="#fff" fill-opacity="0.35" stroke="#1f7a55" stroke-width="2.6" />
              <path d="M33 21l-6 6" fill="none" stroke="#1f7a55" stroke-width="3.4" stroke-linecap="round" />
            </svg>
            <span class="text">
              <span class="tag">{{ $t('map.task') }}</span>
              <span class="name">{{ $t('map.title') }}</span>
              <span class="sub">
                {{ $t('map.progress', { done: worlds.done(), total: worlds.total }) }} · ★ {{ worlds.stars() }}
                <template v-if="worlds.hard() > 0"> · <span class="star-hard">★</span> {{ worlds.hard() }}</template>
              </span>
            </span>
            <span class="key-space" aria-hidden="true" />
          </button>
          <!-- Golden once the key of every world is found. -->
          <KeyBadge
            class="key"
            :found="worldKeys() === CHAPTERS.length"
            :text="worldKeys() === CHAPTERS.length ? $t('secret.foundWorlds') : $t('secret.findWorlds', { n: worldKeys(), total: CHAPTERS.length })"
          />
        </li>
        <li>
          <button class="mode time" @click="router.push({ name: 'chapter', params: { chapter: TIME_CHAPTER.id } })">
            <LevelId :id="time.ids" />
            <!-- A big faint half sun, half moon behind the text. -->
            <svg class="art" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#fff" stroke-width="6" />
              <path d="M50 10a40 40 0 0 0 0 80Z" fill="#fff" />
            </svg>
            <svg class="icon" viewBox="0 0 48 48" aria-hidden="true" v-html="TIME_CHAPTER.icon" />
            <span class="text">
              <span class="tag">{{ $t('timeMode.task') }}</span>
              <span class="name">{{ $t('chapters.time') }}</span>
              <span class="sub">
                {{ $t('map.progress', { done: time.done(), total: time.total }) }} · ★ {{ time.stars() }}
                <template v-if="time.hard() > 0"> · <span class="star-hard">★</span> {{ time.hard() }}</template>
              </span>
            </span>
            <span class="key-space" aria-hidden="true" />
          </button>
          <KeyBadge class="key" :found="progress.hasKey(TIME_CHAPTER.id)" :text="progress.hasKey(TIME_CHAPTER.id) ? $t('secret.foundHere') : $t('secret.findHere')" />
        </li>
        <li>
          <button class="mode memory" @click="router.push({ name: 'chapter', params: { chapter: MEMORY_CHAPTER.id } })">
            <LevelId :id="memory.ids" />
            <!-- A big faint eye behind the text. -->
            <svg class="art" viewBox="0 0 100 100" aria-hidden="true">
              <path d="M8 50s16-28 42-28 42 28 42 28-16 28-42 28S8 50 8 50Z" fill="none" stroke="#fff" stroke-width="6" stroke-linejoin="round" />
              <circle cx="50" cy="50" r="13" fill="#fff" />
            </svg>
            <svg class="icon" viewBox="0 0 48 48" aria-hidden="true" v-html="MEMORY_CHAPTER.icon" />
            <span class="text">
              <span class="tag">{{ $t('memoryMode.task') }}</span>
              <span class="name">{{ $t('chapters.memory') }}</span>
              <span class="sub">
                {{ $t('map.progress', { done: memory.done(), total: memory.total }) }} · ★ {{ memory.stars() }}
                <template v-if="memory.hard() > 0"> · <span class="star-hard">★</span> {{ memory.hard() }}</template>
              </span>
            </span>
            <span class="key-space" aria-hidden="true" />
          </button>
          <KeyBadge class="key" :found="progress.hasKey(MEMORY_CHAPTER.id)" :text="progress.hasKey(MEMORY_CHAPTER.id) ? $t('secret.foundHere') : $t('secret.findHere')" />
        </li>
        <li>
          <button class="mode world" @click="router.push({ name: 'travel' })">
            <LevelId :id="travel.ids" />
            <!-- A big faint globe behind the text. -->
            <svg class="art" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#fff" stroke-width="6" />
              <path d="M10 50h80M50 10q-24 40 0 80M50 10q24 40 0 80" fill="none" stroke="#fff" stroke-width="5" />
            </svg>
            <svg class="icon" viewBox="0 0 48 48" aria-hidden="true" v-html="TRAVEL_CHAPTER.icon" />
            <span class="text">
              <span class="tag">{{ $t('worldTravel.task') }}</span>
              <span class="name">{{ $t('chapters.travel') }}</span>
              <span class="sub">
                {{ $t('map.progress', { done: travel.done(), total: travel.total }) }} · ★ {{ travel.stars() }}
                <template v-if="travel.hard() > 0"> · <span class="star-hard">★</span> {{ travel.hard() }}</template>
              </span>
            </span>
            <span class="key-space" aria-hidden="true" />
          </button>
          <KeyBadge class="key" :found="progress.hasKey(TRAVEL_CHAPTER.id)" :text="progress.hasKey(TRAVEL_CHAPTER.id) ? $t('secret.foundHere') : $t('secret.findHere')" />
        </li>
        <li>
          <button class="mode detective" @click="router.push({ name: 'detective' })">
            <LevelId :id="detective.ids" />
            <!-- Big faint footprints behind the text. -->
            <svg class="art" viewBox="0 0 100 100" aria-hidden="true">
              <g fill="#fff">
                <ellipse cx="34" cy="70" rx="11" ry="16" /><ellipse cx="66" cy="34" rx="11" ry="16" />
                <circle cx="26" cy="46" r="5" /><circle cx="36" cy="44" r="5" /><circle cx="44" cy="50" r="5" />
                <circle cx="58" cy="10" r="5" /><circle cx="68" cy="8" r="5" /><circle cx="76" cy="14" r="5" />
              </g>
            </svg>
            <svg class="icon" viewBox="0 0 48 48" aria-hidden="true" v-html="DETECTIVE_CHAPTER.icon" />
            <span class="text">
              <span class="tag">{{ $t('detective.task') }}</span>
              <span class="name">{{ $t('chapters.detective') }}</span>
              <span class="sub">
                {{ $t('map.progress', { done: detective.done(), total: detective.total }) }} · ★ {{ detective.stars() }}
                <template v-if="detective.hard() > 0"> · <span class="star-hard">★</span> {{ detective.hard() }}</template>
              </span>
            </span>
            <span class="key-space" aria-hidden="true" />
          </button>
          <KeyBadge class="key" :found="progress.hasKey(DETECTIVE_CHAPTER.id)" :text="progress.hasKey(DETECTIVE_CHAPTER.id) ? $t('secret.foundHere') : $t('secret.findHere')" />
        </li>
        <li>
          <button class="mode travel" @click="router.push({ name: 'eras' })">
            <LevelId :id="timeTravel.ids" />
            <!-- A big faint clock face behind the text. -->
            <svg class="art" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#fff" stroke-width="6" />
              <path
                d="M50 14v8M50 78v8M14 50h8M78 50h8M50 50V28M50 50l15 10"
                fill="none"
                stroke="#fff"
                stroke-width="6"
                stroke-linecap="round"
              />
            </svg>
            <!-- A pyramid and a clock. -->
            <svg class="icon" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M4 42L22 12l18 30Z" fill="#e8b85a" />
              <path d="M22 12l18 30H24Z" fill="#c9953f" />
              <circle cx="35" cy="14" r="10" fill="#fff" stroke="#d98a1c" stroke-width="3" />
              <path d="M35 8.5V14l4 2.5" fill="none" stroke="#d98a1c" stroke-width="2.6" stroke-linecap="round" />
            </svg>
            <span class="text">
              <span class="tag">{{ $t('timeTravel.task') }}</span>
              <span class="name">{{ $t('timeTravel.title') }}</span>
              <span class="sub">
                {{ $t('map.progress', { done: timeTravel.done(), total: timeTravel.total }) }} · ★ {{ timeTravel.stars() }}
                <template v-if="timeTravel.hard() > 0"> · <span class="star-hard">★</span> {{ timeTravel.hard() }}</template>
              </span>
            </span>
          </button>
        </li>
        <li>
          <button class="mode treasury" :class="{ closed: !treasuryOpen() }" :aria-disabled="!treasuryOpen()" @click="treasuryOpen() && openTreasury()">
            <LevelId :id="treasuryLevel.id" />
            <!-- A big faint key behind the text. -->
            <svg class="art" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="28" cy="50" r="18" fill="none" stroke="#fff" stroke-width="8" />
              <path d="M46 50h46M80 50v16M66 50v12" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" />
            </svg>
            <svg class="icon" viewBox="0 0 48 48" aria-hidden="true" v-html="TREASURY_CHAPTER.icon" />
            <span class="text">
              <span class="tag">{{ $t('treasury.tag') }}</span>
              <span class="name">{{ $t('chapters.treasury') }}</span>
              <span class="sub">{{ $t('secret.keys', { n: keysFound(), total: KEY_CHAPTERS.length }) }}</span>
              <span v-if="!treasuryOpen()" class="sub">{{ $t('treasury.locked') }}</span>
            </span>
            <span v-if="!treasuryOpen()" class="key lock" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M7 10V8a5 5 0 0 1 10 0v2" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="5" y="10" width="14" height="11" rx="2" fill="currentColor"/></svg>
            </span>
          </button>
        </li>
        <li v-if="settings.developer">
          <button class="mode test" @click="router.push({ name: 'chapter', params: { chapter: TEST_CHAPTER.id } })">
            <LevelId :id="test.ids" />
            <svg class="icon" viewBox="0 0 48 48" aria-hidden="true" v-html="TEST_CHAPTER.icon" />
            <span class="text">
              <span class="tag">{{ $t('settings.dev') }}</span>
              <span class="name">{{ $t('chapters.test') }}</span>
              <span class="sub">{{ $t('map.progress', { done: test.done(), total: test.ids.length }) }}</span>
            </span>
          </button>
        </li>
      </ul>
    </main>
    <BackButton />
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
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 16px;
}

/* A banner per game mode: "spot the difference" green, "in time" violet, "memory" pink, "travel" sea blue,
   "detective" brown, "find the odd one out" warm. */
.spot {
  --mode-from: #4cc38a;
  --mode-mid: #2f9e6e;
  --mode-to: #1f7a55;
  --mode-shadow: rgb(20 90 60 / 0.6);
  --mode-icon-bg: #e3f6ec;
}

.time {
  --mode-from: #9b7bff;
  --mode-mid: #7a5af5;
  --mode-to: #4b3bb0;
  --mode-shadow: rgb(60 40 150 / 0.6);
  --mode-icon-bg: #ece6ff;
}

.memory {
  --mode-from: #ff8fb1;
  --mode-mid: #e8457a;
  --mode-to: #b8235a;
  --mode-shadow: rgb(150 20 70 / 0.6);
  --mode-icon-bg: #ffe6ee;
}

.world {
  --mode-from: #4cc9e0;
  --mode-mid: #1f9bb5;
  --mode-to: #17768a;
  --mode-shadow: rgb(20 100 120 / 0.6);
  --mode-icon-bg: #ddf4f8;
}

.test {
  --mode-from: #9ca3af;
  --mode-mid: #6b7280;
  --mode-to: #4b5563;
  --mode-shadow: rgb(55 65 81 / 0.6);
  --mode-icon-bg: #eceef2;
}

.detective {
  --mode-from: #c08a55;
  --mode-mid: #8a5a2b;
  --mode-to: #5e3b1a;
  --mode-shadow: rgb(90 50 20 / 0.6);
  --mode-icon-bg: #f6eadc;
}

.travel {
  --mode-from: #f2b04a;
  --mode-mid: #d9771c;
  --mode-to: #b8561a;
  --mode-shadow: rgb(150 70 0 / 0.6);
  --mode-icon-bg: #fff3dd;
}

/* The treasury: gold, dimmed until every key is found. */
.treasury {
  --mode-from: #ffd66b;
  --mode-mid: #e0a100;
  --mode-to: #a86b00;
  --mode-shadow: rgb(140 90 0 / 0.6);
  --mode-icon-bg: #fff3cf;
}

.treasury.closed {
  filter: saturate(0.45);
  cursor: default;
}

.mode {
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 16px;
  text-align: start;
  border-radius: 20px;
  background: linear-gradient(120deg, var(--mode-from), var(--mode-mid) 60%, var(--mode-to));
  color: #fff;
  box-shadow: 0 8px 18px -8px var(--mode-shadow);
}

.art {
  position: absolute;
  right: -18px;
  top: 50%;
  height: 150%;
  translate: 0 -50%;
  opacity: 0.18;
  pointer-events: none;
}

.icon {
  position: relative;
  flex: none;
  width: 60px;
  height: 60px;
  padding: 6px;
  border-radius: 16px;
  background: var(--mode-icon-bg);
}

.text {
  position: relative;
  flex: 1;
  display: grid;
  gap: 2px;
  min-width: 0;
}

.tag {
  justify-self: start;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  background: rgb(255 255 255 / 0.25);
}

.name {
  font-size: 22px;
  font-weight: 700;
  text-shadow: 0 1px 2px rgb(0 0 0 / 0.25);
}

.sub {
  font-size: 14px;
  opacity: 0.9;
}

/* The banner's hidden key (grey or gold): a button of its own over the banner, in the place kept by
   `.key-space`; the treasury's lock in the same light badge. */
.list li {
  position: relative;
}

.key-space {
  flex: none;
  width: 34px;
  height: 34px;
}

li > .key {
  position: absolute;
  right: 16px;
  top: 50%;
  translate: 0 -50%;
}

.key :deep(.key-button),
.key.lock {
  background: rgb(255 255 255 / 0.85);
}

.key.lock {
  position: relative;
  flex: none;
  width: 34px;
  height: 34px;
  padding: 5px;
  border-radius: 50%;
}

.lock {
  display: grid;
  color: #8a6400;
}
</style>
