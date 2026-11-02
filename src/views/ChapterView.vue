<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import BackButton from '../components/BackButton.vue'
import StarRating from '../components/StarRating.vue'
import type { Level } from '../engine/types.ts'
import { chapterById, chapterLevels, chapterSize } from '../levels/chapters.ts'
import { useBackButton } from '../services/backButton.ts'
import { useProgressStore } from '../stores/progress.ts'

// Level grid of one chapter. The router guard guarantees the chapter exists.

const props = defineProps<{ chapter: string }>()
const router = useRouter()
const progress = useProgressStore()
const { t } = useI18n()

const chapter = chapterById(props.chapter)!
const levels = chapterLevels(chapter)
const missing = chapterSize(chapter) - levels.length

const toWorlds = () => router.push({ name: 'worlds' })
useBackButton(toWorlds)

function open(level: Level) {
  if (progress.needsPurchase(level.id)) router.push({ name: 'purchase' })
  else if (progress.isUnlocked(level.id)) router.push({ name: 'level', params: { id: level.id } })
}

/** Paid levels stay tappable (they lead to the purchase screen); levels not reached yet are disabled. */
function tileLabel(level: Level) {
  const name = progress.needsPurchase(level.id)
    ? t('map.paid')
    : progress.isUnlocked(level.id)
      ? t(`levelTitles.${level.title}`)
      : t('map.locked')
  return `${t('map.level', { n: level.id })}: ${name}`
}
</script>

<template>
  <div class="screen">
    <ScreenBackdrop :theme="chapter.backdrop" />
    <main>
      <ul class="grid">
        <li v-for="level in levels" :key="level.id">
          <button
            class="tile"
            :class="{ done: progress.isCompleted(level.id), paid: progress.needsPurchase(level.id) }"
            :disabled="!progress.isUnlocked(level.id) && !progress.needsPurchase(level.id)"
            :aria-label="tileLabel(level)"
            @click="open(level)"
          >
            <span class="num">{{ level.id }}</span>
            <span v-if="!progress.isUnlocked(level.id)" class="lock" aria-hidden="true">🔒</span>
            <StarRating v-else :stars="progress.records[level.id]?.stars ?? 0" :size="14" />
          </button>
        </li>
      </ul>
      <p v-if="missing > 0" class="soon">{{ $t('map.soonLevels', { n: missing }) }}</p>
    </main>
    <BackButton :on-back="toWorlds" />
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
