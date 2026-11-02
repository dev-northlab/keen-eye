<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import BackButton from '../components/BackButton.vue'
import { CHAPTERS, chapterLevels, chapterSize } from '../levels/chapters.ts'
import { timeTravelLevels } from '../levels/time-travel/index.ts'
import { useProgressStore } from '../stores/progress.ts'

// Game modes: one banner each with its totals. "Spot the difference" opens the worlds (WorldsView),
// "find the odd one out" (docs/anachronism-mode.md) its eras (TimeTravelView).

const router = useRouter()
const progress = useProgressStore()

const levels = CHAPTERS.flatMap(chapterLevels)
const worlds = {
  total: CHAPTERS.reduce((s, c) => s + chapterSize(c), 0),
  done: () => levels.filter((l) => progress.isCompleted(l.id)).length,
  stars: () => levels.reduce((s, l) => s + (progress.records[l.id]?.stars ?? 0), 0),
}

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

/* A banner per game mode: "spot the difference" green, "find the odd one out" warm. */
.spot {
  --mode-from: #4cc38a;
  --mode-mid: #2f9e6e;
  --mode-to: #1f7a55;
  --mode-shadow: rgb(20 90 60 / 0.6);
  --mode-icon-bg: #e3f6ec;
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
