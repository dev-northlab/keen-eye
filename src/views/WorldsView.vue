<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import BackButton from '../components/BackButton.vue'
import KeyBadge from '../components/KeyBadge.vue'
import LevelId from '../components/LevelId.vue'
import PhotoBanner from '../components/PhotoBanner.vue'
import { CHAPTERS, chapterLevels, type Chapter } from '../levels/chapters.ts'
import { useBackButton } from '../services/backButton.ts'
import { preloadBackdrop } from '../services/backdrops.ts'
import { useProgressStore } from '../stores/progress.ts'
import { usePurchaseStore } from '../stores/purchase.ts'

// "Spot the difference" worlds: one picture banner per world (PhotoBanner in the world's colour, its picture
// public/banners/world-<id>.avif); a banner opens the chapter's level grid (ChapterView), or the full-game offer for a
// world whose levels all need the purchase.
// Each card shows whether the world's hidden key is found (docs/hidden-item-feature.md); a tap on the key says so.

const router = useRouter()
const progress = useProgressStore()
const purchase = usePurchaseStore()
const baseUrl = import.meta.env.BASE_URL

/** The banner's gradient from the world's colour: lighter at the start, darker at the end. */
const bannerColors = (chapter: Chapter) => ({
  '--banner-from': `color-mix(in srgb, ${chapter.color} 70%, #fff)`,
  '--banner-mid': chapter.color,
  '--banner-to': `color-mix(in srgb, ${chapter.color} 70%, #000)`,
  '--banner-shadow': `color-mix(in srgb, ${chapter.color} 60%, transparent)`,
  '--banner-icon-bg': chapter.soft,
})

const cards = CHAPTERS.map((chapter) => {
  const levels = chapterLevels(chapter)
  return { chapter, levels, first: levels[0]?.id }
})

const done = (c: (typeof cards)[number]) => c.levels.filter((l) => progress.isCompleted(l.id)).length
const stars = (c: (typeof cards)[number]) => c.levels.reduce((s, l) => s + (progress.records[l.id]?.stars ?? 0), 0)

/** A world whose levels all need the purchase (every world but the farm, until bought) offers the full game
 * straight away: its grid would only hold gold tiles under the fog. */
function open(c: (typeof cards)[number]) {
  if (c.first !== undefined && progress.needsPurchase(c.first)) purchase.dialogOpen = true
  else router.push({ name: 'chapter', params: { chapter: c.chapter.id } })
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
          <PhotoBanner
            :class="{ soon: !c.first, locked: c.first !== undefined && !progress.isUnlocked(c.first) && !progress.needsPurchase(c.first) }"
            :style="bannerColors(c.chapter)"
            :photo="`${baseUrl}banners/world-${c.chapter.id}.avif`"
            :name="$t(`chapters.${c.chapter.id}`)"
            :disabled="!c.first"
            @pointerdown="preloadBackdrop(c.chapter.backdrop)"
            @click="open(c)"
          >
            <template #icon><img class="obj" :src="`${baseUrl}icons/${c.chapter.id}.webp`" alt="" /></template>
            <template v-if="!c.first">{{ $t('map.soon') }}</template>
            <template v-else-if="progress.needsPurchase(c.first)">{{ $t('map.paid') }}</template>
            <template v-else-if="!progress.isUnlocked(c.first)">{{ $t('map.locked') }}</template>
            <template v-else>
              {{ $t('map.doneCount', { n: done(c) }) }} · ★ {{ stars(c) }}
            </template>
            <template #end>
              <LevelId :id="c.levels.map((l) => l.id)" />
              <span class="key-space" aria-hidden="true" />
              <span v-if="c.first !== undefined && !progress.isUnlocked(c.first)" class="lock" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M7 10V8a5 5 0 0 1 10 0v2" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="5" y="10" width="14" height="11" rx="2" fill="currentColor"/></svg>
              </span>
            </template>
          </PhotoBanner>
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
  gap: 16px;
}

/* The world's key: a button of its own over the banner, in the place kept by `.key-space` (before the lock). */
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
  /* The banner's padding; with a lock, also the lock and the gap before it. */
  inset-inline-end: 16px;
}

.key.by-lock {
  inset-inline-end: 64px;
}

.key :deep(.key-button),
.lock {
  background: rgb(255 255 255 / 0.85);
}

.lock {
  position: relative;
  flex: none;
  width: 34px;
  height: 34px;
  padding: 6px;
  border-radius: 50%;
  color: #6b7280;
}

.lock svg {
  display: block;
  width: 100%;
  height: 100%;
}

/* Not reached yet (a paid world keeps its colours, only the lock), or no levels yet: greyed. */
.locked {
  filter: saturate(0.5);
}

.soon {
  filter: grayscale(1);
  opacity: 0.7;
}
</style>
