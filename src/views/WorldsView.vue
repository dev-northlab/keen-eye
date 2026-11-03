<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import BackButton from '../components/BackButton.vue'
import KeyBadge from '../components/KeyBadge.vue'
import LevelId from '../components/LevelId.vue'
import { CHAPTERS, chapterLevels, chapterSize, type Chapter } from '../levels/chapters.ts'
import { useBackButton } from '../services/backButton.ts'
import { useProgressStore } from '../stores/progress.ts'

// "Spot the difference" worlds: one card per world; a card opens the chapter's level grid (ChapterView).
// Each card shows whether the world's hidden key is found (docs/hidden-item-feature.md); a tap on the key says so.

const router = useRouter()
const progress = useProgressStore()

const cards = CHAPTERS.map((chapter) => {
  const levels = chapterLevels(chapter)
  return { chapter, levels, total: chapterSize(chapter), first: levels[0]?.id }
})

const done = (c: (typeof cards)[number]) => c.levels.filter((l) => progress.isCompleted(l.id)).length
const stars = (c: (typeof cards)[number]) => c.levels.reduce((s, l) => s + (progress.records[l.id]?.stars ?? 0), 0)

function open(chapter: Chapter) {
  router.push({ name: 'chapter', params: { chapter: chapter.id } })
}

const toModes = () => router.push({ name: 'levels' })
useBackButton(toModes)
</script>

<template>
  <div class="screen">
    <ScreenBackdrop theme="meadow" />
    <main>
      <h1 class="title">{{ $t('map.title') }}</h1>
      <ul class="list">
        <li v-for="c in cards" :key="c.chapter.id">
          <button
            class="card"
            :class="{ soon: !c.first, locked: c.first !== undefined && !progress.isUnlocked(c.first) }"
            :style="{ '--chapter': c.chapter.color, '--chapter-soft': c.chapter.soft }"
            :disabled="!c.first"
            @click="open(c.chapter)"
          >
            <LevelId :id="c.levels.map((l) => l.id)" />
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
            <span class="key-space" aria-hidden="true" />
            <span v-if="c.first !== undefined && !progress.isUnlocked(c.first)" class="lock" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M7 10V8a5 5 0 0 1 10 0v2" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="5" y="10" width="14" height="11" rx="2" fill="currentColor"/></svg>
            </span>
          </button>
          <KeyBadge
            class="key"
            :class="{ 'by-lock': c.first !== undefined && !progress.isUnlocked(c.first) }"
            :found="progress.hasKey(c.chapter.id)"
            :text="progress.hasKey(c.chapter.id) ? $t('secret.foundHere') : $t('secret.findHere')"
          />
        </li>
      </ul>
    </main>
    <BackButton :on-back="toModes" />
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

.title {
  width: fit-content;
  margin: 4px auto 14px;
  padding: 6px 18px;
  border-radius: 999px;
  background: var(--panel);
  font-size: 20px;
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
  position: relative;
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

/* The world's key: a button of its own over the card, in the place kept by `.key-space` (before the lock). */
.list li {
  position: relative;
}

.key-space {
  flex: none;
  width: 34px;
  height: 34px;
}

.key {
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  /* The card's right border and padding; with a lock, also the lock and the gap before it. */
  right: 18px;
}

.key.by-lock {
  right: 56px;
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
