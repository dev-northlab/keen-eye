<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import BackButton from '../components/BackButton.vue'
import KeyBadge from '../components/KeyBadge.vue'
import LevelId from '../components/LevelId.vue'
import PhotoBanner from '../components/PhotoBanner.vue'
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
  TINY_BOY_CHAPTER,
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
// "detective" (docs/detective-mode.md) its cases (DetectiveView), "tiny boy" its picture banners (TinyBoyView). Category banners show whether their
// hidden key is found; the last banner, the treasury (docs/hidden-item-feature.md), counts the keys
// and opens its bonus level once all are found. Developer mode adds the "test" levels (TEST_CHAPTER) at the end.

const router = useRouter()
const baseUrl = import.meta.env.BASE_URL
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
/** Category banners in order: the chapter (its id names the banner's class and picture), task text and screen. */
const categories = [
  { chapter: TIME_CHAPTER, task: 'timeMode.task', to: { name: 'chapter', params: { chapter: TIME_CHAPTER.id } } },
  { chapter: MEMORY_CHAPTER, task: 'memoryMode.task', to: { name: 'chapter', params: { chapter: MEMORY_CHAPTER.id } } },
  { chapter: TRAVEL_CHAPTER, task: 'worldTravel.task', to: { name: 'travel' } },
  { chapter: DETECTIVE_CHAPTER, task: 'detective.task', to: { name: 'detective' } },
].map((c) => ({ ...c, totals: category(c.chapter) }))
const tinyBoy = category(TINY_BOY_CHAPTER)

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
          <PhotoBanner
            class="spot"
            :photo="`${baseUrl}banners/worlds.webp`"
            :tag="$t('map.task')"
            :name="$t('map.title')"
            @click="router.push({ name: 'worlds' })"
          >
            <!-- Two pictures, the second with a red sun, and a magnifier over it. -->
            <template #icon>
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <rect x="2" y="9" width="20" height="24" rx="3" fill="#bfe6cf" />
                <path d="M2 26l6-5 5 4 9-6v11a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3Z" fill="#3fa46f" />
                <circle cx="15" cy="15" r="3" fill="#f2b04a" />
                <rect x="26" y="9" width="20" height="24" rx="3" fill="#bfe6cf" />
                <path d="M26 26l6-5 5 4 9-6v11a3 3 0 0 1-3 3h-14a3 3 0 0 1-3-3Z" fill="#3fa46f" />
                <circle cx="39" cy="15" r="3" fill="#e5484d" />
                <circle cx="38" cy="16" r="7" fill="#fff" fill-opacity="0.35" stroke="#1f7a55" stroke-width="2.6" />
                <path d="M33 21l-6 6" fill="none" stroke="#1f7a55" stroke-width="3.4" stroke-linecap="round" />
              </svg>
            </template>
            {{ $t('map.progress', { done: worlds.done(), total: worlds.total }) }} · ★ {{ worlds.stars() }}
            <template v-if="worlds.hard() > 0"> · <span class="star-hard">★</span> {{ worlds.hard() }}</template>
            <template #end><LevelId :id="worlds.ids" /><span class="key-space" aria-hidden="true" /></template>
          </PhotoBanner>
          <!-- Golden once the key of every world is found. -->
          <KeyBadge
            class="key"
            :found="worldKeys() === CHAPTERS.length"
            :text="worldKeys() === CHAPTERS.length ? $t('secret.foundWorlds') : $t('secret.findWorlds', { n: worldKeys(), total: CHAPTERS.length })"
          />
        </li>
        <li>
          <!-- "Tiny boy": its levels as picture banners (TinyBoyView). Hidden until released, so players see
               "coming soon" and only developer mode opens it. -->
          <PhotoBanner
            :photo="`${baseUrl}banners/tiny-boy.webp`"
            :name="$t('chapters.tinyBoy')"
            :tag="tinyBoy.total > 0 ? $t('map.task') : $t('map.soon')"
            :disabled="tinyBoy.total === 0 && !settings.developer"
            @click="router.push({ name: 'tiny-boy' })"
          >
            <template #icon><img :src="`${baseUrl}banners/tiny-boy-face.webp`" alt="" /></template>
            <template v-if="tinyBoy.total > 0">
              <!-- No stars in "tiny boy": only how many levels are won. -->
              {{ $t('map.progress', { done: tinyBoy.done(), total: tinyBoy.total }) }}
            </template>
            <template v-else>{{ $t('map.tinyBoyText') }}</template>
          </PhotoBanner>
        </li>
        <li v-for="c in categories" :key="c.chapter.id">
          <PhotoBanner
            :class="c.chapter.id"
            :photo="`${baseUrl}banners/${c.chapter.id}.webp`"
            :tag="$t(c.task)"
            :name="$t(`chapters.${c.chapter.id}`)"
            @click="router.push(c.to)"
          >
            <template #icon><svg viewBox="0 0 48 48" aria-hidden="true" v-html="c.chapter.icon" /></template>
            {{ $t('map.progress', { done: c.totals.done(), total: c.totals.total }) }} · ★ {{ c.totals.stars() }}
            <template v-if="c.totals.hard() > 0"> · <span class="star-hard">★</span> {{ c.totals.hard() }}</template>
            <template #end><LevelId :id="c.totals.ids" /><span class="key-space" aria-hidden="true" /></template>
          </PhotoBanner>
          <KeyBadge class="key" :found="progress.hasKey(c.chapter.id)" :text="progress.hasKey(c.chapter.id) ? $t('secret.foundHere') : $t('secret.findHere')" />
        </li>
        <li>
          <PhotoBanner
            class="eras"
            :photo="`${baseUrl}banners/eras.webp`"
            :tag="$t('timeTravel.task')"
            :name="$t('timeTravel.title')"
            @click="router.push({ name: 'eras' })"
          >
            <!-- A pyramid and a clock. -->
            <template #icon>
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path d="M4 42L22 12l18 30Z" fill="#e8b85a" />
                <path d="M22 12l18 30H24Z" fill="#c9953f" />
                <circle cx="35" cy="14" r="10" fill="#fff" stroke="#d98a1c" stroke-width="3" />
                <path d="M35 8.5V14l4 2.5" fill="none" stroke="#d98a1c" stroke-width="2.6" stroke-linecap="round" />
              </svg>
            </template>
            {{ $t('map.progress', { done: timeTravel.done(), total: timeTravel.total }) }} · ★ {{ timeTravel.stars() }}
            <template v-if="timeTravel.hard() > 0"> · <span class="star-hard">★</span> {{ timeTravel.hard() }}</template>
            <template #end><LevelId :id="timeTravel.ids" /></template>
          </PhotoBanner>
        </li>
        <li>
          <PhotoBanner
            class="treasury"
            :class="{ closed: !treasuryOpen() }"
            :photo="`${baseUrl}banners/treasury.webp`"
            :tag="$t('treasury.tag')"
            :name="$t('chapters.treasury')"
            :disabled="!treasuryOpen()"
            @click="openTreasury"
          >
            <template #icon><svg viewBox="0 0 48 48" aria-hidden="true" v-html="TREASURY_CHAPTER.icon" /></template>
            {{ $t('secret.keys', { n: keysFound(), total: KEY_CHAPTERS.length }) }}
            <span v-if="!treasuryOpen()" class="line">{{ $t('treasury.locked') }}</span>
            <template #end>
              <LevelId :id="treasuryLevel.id" />
              <span v-if="!treasuryOpen()" class="key lock" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M7 10V8a5 5 0 0 1 10 0v2" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="5" y="10" width="14" height="11" rx="2" fill="currentColor"/></svg>
              </span>
            </template>
          </PhotoBanner>
        </li>
        <li v-if="settings.developer">
          <PhotoBanner
            class="test"
            :tag="$t('settings.dev')"
            :name="$t('chapters.test')"
            @click="router.push({ name: 'chapter', params: { chapter: TEST_CHAPTER.id } })"
          >
            <template #icon><svg viewBox="0 0 48 48" aria-hidden="true" v-html="TEST_CHAPTER.icon" /></template>
            {{ $t('map.progress', { done: test.done(), total: test.ids.length }) }}
            <template #end><LevelId :id="test.ids" /></template>
          </PhotoBanner>
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

/* A banner per game mode (PhotoBanner, its picture in public/banners/): "spot the difference" green, "tiny boy" sky
   blue (the default), "in time" violet, "memory" pink, "travel" sea blue, "detective" brown, "find the odd one out"
   warm, the treasury gold. */
.spot {
  --banner-from: #4cc38a;
  --banner-mid: #2f9e6e;
  --banner-to: #1f7a55;
  --banner-shadow: rgb(20 90 60 / 0.6);
  --banner-icon-bg: #e3f6ec;
}

.time {
  --banner-from: #9b7bff;
  --banner-mid: #7a5af5;
  --banner-to: #4b3bb0;
  --banner-shadow: rgb(60 40 150 / 0.6);
  --banner-icon-bg: #ece6ff;
}

.memory {
  --banner-from: #ff8fb1;
  --banner-mid: #e8457a;
  --banner-to: #b8235a;
  --banner-shadow: rgb(150 20 70 / 0.6);
  --banner-icon-bg: #ffe6ee;
}

.travel {
  --banner-from: #4cc9e0;
  --banner-mid: #1f9bb5;
  --banner-to: #17768a;
  --banner-shadow: rgb(20 100 120 / 0.6);
  --banner-icon-bg: #ddf4f8;
}

.detective {
  --banner-from: #c08a55;
  --banner-mid: #8a5a2b;
  --banner-to: #5e3b1a;
  --banner-shadow: rgb(90 50 20 / 0.6);
  --banner-icon-bg: #f6eadc;
}

.eras {
  --banner-from: #f2b04a;
  --banner-mid: #d9771c;
  --banner-to: #b8561a;
  --banner-shadow: rgb(150 70 0 / 0.6);
  --banner-icon-bg: #fff3dd;
}

.treasury {
  --banner-from: #ffd66b;
  --banner-mid: #e0a100;
  --banner-to: #a86b00;
  --banner-shadow: rgb(140 90 0 / 0.6);
  --banner-icon-bg: #fff3cf;
}

.test {
  --banner-from: #9ca3af;
  --banner-mid: #6b7280;
  --banner-to: #4b5563;
  --banner-shadow: rgb(55 65 81 / 0.6);
  --banner-icon-bg: #eceef2;
}

/* The treasury is dimmed until every key is found. */
.treasury.closed {
  filter: saturate(0.45);
}

/* The treasury's second line under the key count. */
.line {
  display: block;
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
  inset-inline-end: 16px;
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
