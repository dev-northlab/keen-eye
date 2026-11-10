<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BackButton from '../components/BackButton.vue'
import PhotoBanner from '../components/PhotoBanner.vue'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import type { Level } from '../engine/types.ts'
import { chapterLevels, chapterLevelsWithHidden, chapterSize, levelNumber, TINY_BOY_CHAPTER } from '../levels/chapters.ts'
import { isUpcoming } from '../levels/upcoming.ts'
import { useBackButton } from '../services/backButton.ts'
import { useProgressStore } from '../stores/progress.ts'
import { usePurchaseStore } from '../stores/purchase.ts'
import { useSettingsStore } from '../stores/settings.ts'

// "Tiny boy": its levels as picture banners, each with the photo of its scene (public/banners/tiny-boy-<id>.webp,
// levels/tiny-boy/index.ts). Opens like a level grid (ChapterView): paid levels offer the full game, levels not
// reached yet are disabled; developer mode also lists the hidden ones (levels/upcoming.ts), marked with a crossed-out eye.

const router = useRouter()
const purchase = usePurchaseStore()
const progress = useProgressStore()
const settings = useSettingsStore()
const baseUrl = import.meta.env.BASE_URL

const levels = computed(() => (settings.developer ? chapterLevelsWithHidden(TINY_BOY_CHAPTER) : chapterLevels(TINY_BOY_CHAPTER)))
const missing = chapterSize(TINY_BOY_CHAPTER) - chapterLevels(TINY_BOY_CHAPTER).length

const toParent = () => router.push({ name: 'levels' })
useBackButton(toParent)

function open(level: Level) {
  if (progress.needsPurchase(level.id)) purchase.dialogOpen = true
  else if (progress.isUnlocked(level.id)) router.push({ name: 'level', params: { id: level.id } })
}
</script>

<template>
  <div class="screen">
    <ScreenBackdrop :theme="TINY_BOY_CHAPTER.backdrop" />
    <main>
      <ul class="list">
        <li v-for="level in levels" :key="level.id">
          <PhotoBanner
            :class="{ locked: !progress.isUnlocked(level.id) }"
            :photo="`${baseUrl}banners/tiny-boy-${level.id}.webp`"
            :name="$t(`levelTitles.${level.title}`)"
            :tag="progress.needsPurchase(level.id) ? $t('map.paid') : $t('map.level', { n: levelNumber(level) })"
            :disabled="!progress.isUnlocked(level.id) && !progress.needsPurchase(level.id)"
            @click="open(level)"
          >
            <template #icon>
              <svg v-if="!progress.isUnlocked(level.id)" viewBox="-6 -6 36 36" aria-hidden="true">
                <rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2.4" />
              </svg>
              <template v-else>{{ levelNumber(level) }}</template>
            </template>
            <!-- No stars here: a level is won or not yet. -->
            <span class="state" :class="{ won: progress.isCompleted(level.id) }">
              <svg v-if="progress.isCompleted(level.id)" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="11" fill="#3ec46d" stroke="#fff" stroke-width="1.5" />
                <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ progress.isCompleted(level.id) ? $t('map.won') : $t('map.notWon') }}
            </span>
          </PhotoBanner>
          <svg v-if="isUpcoming(level.id)" class="hidden-mark" viewBox="0 0 24 24" :aria-label="$t('map.hidden')">
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
            <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2" />
            <path d="M4 20 20 4" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
          </svg>
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
  padding: 12px max(16px, (100% - var(--menu-width)) / 2) 24px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 16px;
}

.list li {
  position: relative;
}

/* Won or not yet: a green tick with "won", else a faint "not yet". */
.state {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  opacity: 0.85;
}

.state.won {
  opacity: 1;
}

.state svg {
  width: 20px;
  height: 20px;
}

/* Not reached yet: greyed like the closed treasury. */
.locked {
  filter: saturate(0.45);
}

/* A hidden level (developer mode only): a crossed-out eye in the top corner, over the picture. */
.hidden-mark {
  position: absolute;
  top: 8px;
  inset-inline-end: 10px;
  width: 26px;
  height: 26px;
  padding: 3px;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.85);
  color: #2563eb;
}

.soon {
  margin: 16px 0 0;
  text-align: center;
  color: var(--muted);
}
</style>
