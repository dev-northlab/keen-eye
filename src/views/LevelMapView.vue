<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import BackButton from '../components/BackButton.vue'
import { CHAPTERS, chapterLevels, type Chapter } from '../levels/chapters.ts'
import { useProgressStore } from '../stores/progress.ts'

// Chapter map: one card per world; a card opens the chapter's level grid (ChapterView).

const router = useRouter()
const progress = useProgressStore()

const cards = CHAPTERS.map((chapter) => {
  const levels = chapterLevels(chapter)
  return { chapter, levels, total: chapter.to - chapter.from + 1, first: levels[0]?.id }
})

const done = (c: (typeof cards)[number]) => c.levels.filter((l) => progress.isCompleted(l.id)).length
const stars = (c: (typeof cards)[number]) => c.levels.reduce((s, l) => s + (progress.records[l.id]?.stars ?? 0), 0)

function open(chapter: Chapter) {
  router.push({ name: 'chapter', params: { chapter: chapter.id } })
}
</script>

<template>
  <div class="screen">
    <ScreenBackdrop theme="meadow" />
    <main>
      <ul class="list">
        <li v-for="c in cards" :key="c.chapter.id">
          <button
            class="card"
            :class="{ soon: !c.first, locked: c.first !== undefined && !progress.isUnlocked(c.first) }"
            :style="{ '--chapter': c.chapter.color, '--chapter-soft': c.chapter.soft }"
            :disabled="!c.first"
            @click="open(c.chapter)"
          >
            <svg class="icon" viewBox="0 0 48 48" aria-hidden="true" v-html="c.chapter.icon" />
            <span class="text">
              <span class="name">{{ $t(`chapters.${c.chapter.id}`) }}</span>
              <span class="sub">
                <template v-if="!c.first">{{ $t('map.soon') }}</template>
                <template v-else-if="progress.needsPurchase(c.first)">{{ $t('map.paid') }}</template>
                <template v-else-if="!progress.isUnlocked(c.first)">{{ $t('map.locked') }}</template>
                <template v-else>{{ $t('map.progress', { done: done(c), total: c.total }) }} · ★ {{ stars(c) }}</template>
              </span>
            </span>
            <span v-if="c.first !== undefined && !progress.isUnlocked(c.first)" class="lock" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M7 10V8a5 5 0 0 1 10 0v2" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="5" y="10" width="14" height="11" rx="2" fill="currentColor"/></svg>
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
  gap: 12px;
}

.card {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  text-align: left;
  background: var(--panel);
  color: var(--fg);
  border: 2px solid var(--chapter);
  border-left-width: 10px;
}

.icon {
  flex: none;
  width: 48px;
  height: 48px;
  padding: 4px;
  border-radius: 12px;
  background: var(--chapter-soft);
}

.text {
  flex: 1;
  display: grid;
  gap: 2px;
  min-width: 0;
}

.name {
  font-size: 20px;
  font-weight: 700;
}

.sub {
  font-size: 14px;
  color: var(--muted);
}

.lock {
  flex: none;
  width: 24px;
  height: 24px;
  color: var(--faint);
}

.lock svg {
  width: 100%;
  height: 100%;
}

.card.locked {
  border-color: var(--line);
}

.card.soon,
.card:disabled {
  background: var(--disabled-bg);
  color: var(--faint);
  border-color: var(--line);
  cursor: default;
}

.card.soon .icon {
  filter: grayscale(1);
  opacity: 0.6;
}
</style>
