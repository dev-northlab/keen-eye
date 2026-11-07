<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import BackButton from '../components/BackButton.vue'
import LevelId from '../components/LevelId.vue'
import StarRating from '../components/StarRating.vue'
import type { Level } from '../engine/types.ts'
import { CHAPTERS, chapterById, chapterLevels, chapterLevelsWithHidden, chapterSize, levelNumber, TEST_CHAPTER } from '../levels/chapters.ts'
import { isUpcoming } from '../levels/upcoming.ts'
import { useBackButton } from '../services/backButton.ts'
import { useProgressStore } from '../stores/progress.ts'
import { usePurchaseStore } from '../stores/purchase.ts'
import { useSettingsStore } from '../stores/settings.ts'

// Level grid of one chapter, or of a category ("time", "memory"). The router guard guarantees the chapter exists.
// Developer mode also shows the hidden levels (levels/upcoming.ts) at their place, marked with a crossed-out eye.

const props = defineProps<{ chapter: string }>()
const router = useRouter()
const purchase = usePurchaseStore()
const progress = useProgressStore()
const settings = useSettingsStore()
const { t } = useI18n()

const chapter = chapterById(props.chapter)!
const levels = computed(() => (settings.developer ? chapterLevelsWithHidden(chapter) : chapterLevels(chapter)))
/** Levels still to come ("coming soon"); the "test" chapter's range is only room for test levels. */
/** Levels the "random level" button picks from: the playable ones (reached and, if paid, bought). */
const playable = computed(() => levels.value.filter((l) => progress.isUnlocked(l.id)))
const missing = chapter === TEST_CHAPTER ? 0 : chapterSize(chapter) - chapterLevels(chapter).length

/** A world's grid goes back to the worlds, a category to the game modes. */
const toParent = () => router.push({ name: CHAPTERS.includes(chapter) ? 'worlds' : 'levels' })
useBackButton(toParent)

function open(level: Level) {
  if (progress.needsPurchase(level.id)) purchase.dialogOpen = true
  else if (progress.isUnlocked(level.id)) router.push({ name: level.memory ? 'memory' : 'level', params: { id: level.id } })
}

function openRandom() {
  const pool = playable.value
  open(pool[Math.floor(Math.random() * pool.length)])
}

/** Paid levels stay tappable (they open the full-game dialog); levels not reached yet are disabled. */
function tileLabel(level: Level) {
  const name = progress.needsPurchase(level.id)
    ? t('map.paid')
    : progress.isUnlocked(level.id)
      ? t(`levelTitles.${level.title}`)
      : t('map.locked')
  const hidden = isUpcoming(level.id) ? ` (${t('map.hidden')})` : ''
  return `${t('map.level', { n: levelNumber(level) })}: ${name}${hidden}`
}
</script>

<template>
  <div class="screen">
    <ScreenBackdrop :theme="chapter.backdrop" />
    <main>
      <button
        v-if="playable.length > 1"
        class="random"
        :aria-label="$t('map.random')"
        :title="$t('map.random')"
        @click="openRandom"
      >
        <!-- A die showing five. -->
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="2.2" />
          <g fill="currentColor">
            <circle cx="8" cy="8" r="1.7" />
            <circle cx="16" cy="8" r="1.7" />
            <circle cx="12" cy="12" r="1.7" />
            <circle cx="8" cy="16" r="1.7" />
            <circle cx="16" cy="16" r="1.7" />
          </g>
        </svg>
      </button>
      <p v-if="chapter.rules" class="rules">{{ $t(chapter.rules) }}</p>
      <ul class="grid">
        <li v-for="level in levels" :key="level.id">
          <button
            class="tile"
            :class="{ done: progress.isCompleted(level.id), paid: progress.needsPurchase(level.id), hidden: isUpcoming(level.id) }"
            :disabled="!progress.isUnlocked(level.id) && !progress.needsPurchase(level.id)"
            :aria-label="tileLabel(level)"
            @click="open(level)"
          >
            <LevelId :id="level.id" />
            <svg v-if="isUpcoming(level.id)" class="hidden-mark" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
              <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2" />
              <path d="M4 20 20 4" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
            </svg>
            <span class="num">{{ levelNumber(level) }}</span>
            <span v-if="!progress.isUnlocked(level.id)" class="lock" aria-hidden="true">🔒</span>
            <StarRating v-else :stars="progress.records[level.id]?.stars ?? 0" :hard="progress.hardStars(level.id)" :size="14" />
          </button>
        </li>
      </ul>
      <p v-if="missing > 0" class="soon">{{ $t('map.soonLevels', { n: missing }) }}</p>
    </main>
    <BackButton :on-back="toParent" />
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
  padding: 16px max(16px, (100% - var(--menu-width)) / 2) 24px;
}

.random {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin: 0 0 14px auto;
  padding: 0;
  border-radius: 50%;
  background: var(--glass);
  color: #3a86ff;
  box-shadow: 0 2px 8px rgb(35 48 43 / 0.1);
  transition: transform 0.15s ease;
}

.random:active {
  transform: scale(0.94);
}

.random svg {
  width: 26px;
  height: 26px;
}

.rules {
  margin: 0 0 14px;
  padding: 10px 14px;
  border-radius: 14px;
  background: var(--panel);
  font-size: 15px;
  line-height: 1.4;
}

.grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
  gap: 10px;
}

.tile {
  width: 100%;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 4px;
  padding: 6px;
  background: var(--panel);
  color: var(--fg);
  border: 2px solid var(--soft);
  position: relative;
}

.tile.done {
  border-color: var(--accent);
}

.tile.paid {
  background: var(--gold-bg);
  border-color: #f5b301;
  color: var(--gold-fg);
}

.tile:disabled {
  background: var(--disabled-bg);
  color: var(--faint);
  cursor: default;
}

/* A hidden level (developer mode only): dashed border and a crossed-out eye in the top corner. */
.tile.hidden {
  border-style: dashed;
}

.hidden-mark {
  position: absolute;
  top: 4px;
  inset-inline-start: 5px;
  width: 16px;
  height: 16px;
  color: var(--muted);
}

.num {
  font-size: 22px;
  font-weight: 700;
}

.lock {
  font-size: 14px;
}

.soon {
  width: fit-content;
  margin: 16px auto 0;
  padding: 4px 14px;
  border-radius: 999px;
  background: var(--panel);
  color: var(--muted);
}
</style>
