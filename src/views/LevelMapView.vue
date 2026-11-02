<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import BackButton from '../components/BackButton.vue'
import {
  CHAPTERS,
  chapterLevels,
  chapterSize,
  DETECTIVE_CHAPTER,
  MEMORY_CHAPTER,
  TIME_CHAPTER,
  TRAVEL_CHAPTER,
  type Chapter,
} from '../levels/chapters.ts'
import { timeTravelLevels } from '../levels/time-travel/index.ts'
import { useProgressStore } from '../stores/progress.ts'

// Game modes: one banner each with its totals. "Spot the difference" opens the worlds (WorldsView),
// "find the odd one out" (docs/anachronism-mode.md) its eras (TimeTravelView), "spot the difference
// in time" (docs/time-differences-mode.md) and "memory" (docs/memory-mode.md) their level grids
// (ChapterView of TIME_CHAPTER, MEMORY_CHAPTER), "travel" (docs/world-travel-mode.md) its world map (TravelView),
// "detective" (docs/detective-mode.md) its cases (DetectiveView).

const router = useRouter()
const progress = useProgressStore()

const levels = CHAPTERS.flatMap(chapterLevels)
const worlds = {
  total: CHAPTERS.reduce((s, c) => s + chapterSize(c), 0),
  done: () => levels.filter((l) => progress.isCompleted(l.id)).length,
  stars: () => levels.reduce((s, l) => s + (progress.records[l.id]?.stars ?? 0), 0),
}

function category(chapter: Chapter) {
  const own = chapterLevels(chapter)
  return {
    total: chapterSize(chapter),
    done: () => own.filter((l) => progress.isCompleted(l.id)).length,
    stars: () => own.reduce((s, l) => s + (progress.records[l.id]?.stars ?? 0), 0),
  }
}
const time = category(TIME_CHAPTER)
const memory = category(MEMORY_CHAPTER)
const travel = category(TRAVEL_CHAPTER)
const detective = category(DETECTIVE_CHAPTER)

const timeTravel = {
  total: timeTravelLevels.length,
  done: () => timeTravelLevels.filter((l) => l.id in progress.timeTravel).length,
  stars: () => timeTravelLevels.reduce((s, l) => s + (progress.timeTravel[l.id]?.stars ?? 0), 0),
}
</script>

<template>
  <div class="screen">
    <ScreenBackdrop theme="meadow" />
    <main>
      <ul class="list">
        <li>
          <button class="mode spot" @click="router.push({ name: 'worlds' })">
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
              </span>
            </span>
          </button>
        </li>
        <li>
          <button class="mode time" @click="router.push({ name: 'chapter', params: { chapter: TIME_CHAPTER.id } })">
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
              </span>
            </span>
          </button>
        </li>
        <li>
          <button class="mode memory" @click="router.push({ name: 'chapter', params: { chapter: MEMORY_CHAPTER.id } })">
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
              </span>
            </span>
          </button>
        </li>
        <li>
          <button class="mode world" @click="router.push({ name: 'travel' })">
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
              </span>
            </span>
          </button>
        </li>
        <li>
          <button class="mode detective" @click="router.push({ name: 'detective' })">
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
              </span>
            </span>
          </button>
        </li>
        <li>
          <button class="mode travel" @click="router.push({ name: 'eras' })">
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
              </span>
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

.mode {
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 16px;
  text-align: left;
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
</style>
