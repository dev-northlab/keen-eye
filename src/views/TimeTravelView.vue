<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import BackButton from '../components/BackButton.vue'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import StarRating from '../components/StarRating.vue'
import { localized } from '../engine/anachronism.ts'
import { timeTravelLevels } from '../levels/time-travel/index.ts'
import { useBackButton } from '../services/backButton.ts'
import { useProgressStore } from '../stores/progress.ts'

// "Find the odd one out" (docs/anachronism-mode.md): one card per era with a thumbnail of its picture.
// Every era is open; a completed one gets a green border and its best stars.

const router = useRouter()
const { locale } = useI18n()
const progress = useProgressStore()

const base = import.meta.env.BASE_URL
const toMap = () => router.push({ name: 'levels' })
useBackButton(toMap)
</script>

<template>
  <div class="screen">
    <ScreenBackdrop theme="meadow" />
    <main>
      <h1 class="title">{{ $t('timeTravel.title') }}</h1>
      <ul class="list">
        <li v-for="level in timeTravelLevels" :key="level.id">
          <button
            class="card"
            :class="{ done: level.id in progress.timeTravel }"
            @click="router.push({ name: 'time-travel', params: { id: level.id } })"
          >
            <img class="thumb" :src="base + level.image" alt="" />
            <span class="text">
              <span class="name">{{ localized(level.era, locale) }}</span>
              <StarRating :stars="progress.timeTravel[level.id]?.stars ?? 0" :size="16" />
            </span>
          </button>
        </li>
      </ul>
    </main>
    <BackButton :on-back="toMap" />
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
  padding: 10px 14px 10px 10px;
  text-align: left;
  background: var(--panel);
  color: var(--fg);
  border: 2px solid var(--soft);
}

.card.done {
  border-color: var(--accent);
}

.thumb {
  flex: none;
  width: 112px;
  aspect-ratio: 8 / 5;
  border-radius: 10px;
  object-fit: cover;
}

.text {
  flex: 1;
  display: grid;
  gap: 4px;
  min-width: 0;
}

.name {
  font-size: 20px;
  font-weight: 700;
}
</style>
