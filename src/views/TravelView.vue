<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import BackButton from '../components/BackButton.vue'
import LevelId from '../components/LevelId.vue'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import StarRating from '../components/StarRating.vue'
import WorldMap from '../components/WorldMap.vue'
import type { Level, TravelRegion } from '../engine/types.ts'
import { levelNumber, TRAVEL_CHAPTER } from '../levels/chapters.ts'
import { FLAGS } from '../levels/travel/flags.ts'
import { TRAVEL_REGIONS, travelLevels } from '../levels/travel/index.ts'
import { useBackButton } from '../services/backButton.ts'
import { useProgressStore } from '../stores/progress.ts'
import { usePurchaseStore } from '../stores/purchase.ts'

// "Travel" (docs/world-travel-mode.md): the world map with the regions, the places of the chosen
// region (one level each, open one after another like a category's grid) and the passport button.

const route = useRoute()
const router = useRouter()
const purchase = usePurchaseStore()
const progress = useProgressStore()
const { t } = useI18n()

const toParent = () => router.push({ name: 'levels' })
useBackButton(toParent)

const placesOf = (region: TravelRegion) => travelLevels.filter((l) => l.travel!.region === region)
const visited = (levels: Level[]) => levels.filter((l) => progress.isCompleted(l.id)).length

/** The region a level came back to (`?region=`), else that of the next place to visit. */
const region = ref<TravelRegion>(
  TRAVEL_REGIONS.find((r) => r === route.query.region) ??
    travelLevels.find((l) => !progress.isCompleted(l.id))?.travel!.region ??
    TRAVEL_REGIONS[0],
)
const places = computed(() => placesOf(region.value))
const stamps = computed(() => visited(travelLevels))

function open(level: Level) {
  if (progress.needsPurchase(level.id)) purchase.dialogOpen = true
  else if (progress.isUnlocked(level.id)) router.push({ name: 'level', params: { id: level.id } })
}

/** Paid places stay tappable (they open the full-game dialog); places not reached yet are disabled. */
function placeLabel(level: Level) {
  const name = `${t(`levelTitles.${level.title}`)}, ${t(`worldTravel.countries.${level.travel!.country}`)}`
  const state = progress.needsPurchase(level.id) ? t('map.paid') : progress.isUnlocked(level.id) ? '' : t('map.locked')
  return [t('map.level', { n: levelNumber(level) }), name, state].filter(Boolean).join(': ')
}
</script>

<template>
  <div class="screen">
    <ScreenBackdrop theme="meadow" />
    <main>
      <p class="rules">{{ $t(TRAVEL_CHAPTER.rules!) }}</p>
      <WorldMap :levels="travelLevels" :region="region" :visited="progress.isCompleted" @select="region = $event" />
      <div class="tabs" role="tablist">
        <button
          v-for="r in TRAVEL_REGIONS"
          :key="r"
          class="tab"
          :class="{ active: r === region }"
          role="tab"
          :aria-selected="r === region"
          @click="region = r"
        >
          {{ $t(`worldTravel.regions.${r}`) }}
          <span class="count">{{ visited(placesOf(r)) }}/{{ placesOf(r).length }}</span>
        </button>
      </div>
      <ul class="places">
        <li v-for="level in places" :key="level.id">
          <button
            class="place"
            :class="{ done: progress.isCompleted(level.id), paid: progress.needsPurchase(level.id) }"
            :disabled="!progress.isUnlocked(level.id) && !progress.needsPurchase(level.id)"
            :aria-label="placeLabel(level)"
            @click="open(level)"
          >
            <LevelId :id="level.id" />
            <svg class="flag" viewBox="0 0 30 20" aria-hidden="true" v-html="FLAGS[level.travel!.country]" />
            <span class="text">
              <span class="name">{{ $t(`levelTitles.${level.title}`) }}</span>
              <span class="sub">{{ $t(`worldTravel.countries.${level.travel!.country}`) }} · {{ $t('map.level', { n: levelNumber(level) }) }}</span>
            </span>
            <span v-if="progress.needsPurchase(level.id)" class="state">{{ $t('map.paid') }}</span>
            <svg v-else-if="!progress.isUnlocked(level.id)" class="lock" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10" fill="none" stroke="currentColor" stroke-width="2.4" />
              <rect x="5" y="10" width="14" height="11" rx="2.5" fill="currentColor" />
            </svg>
            <StarRating v-else :stars="progress.records[level.id]?.stars ?? 0" :size="16" />
          </button>
        </li>
      </ul>
      <button class="passport" @click="router.push({ name: 'passport' })">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="2" width="16" height="20" rx="2.5" fill="currentColor" />
          <circle cx="12" cy="10" r="4" fill="none" stroke="#ffffff" stroke-width="1.6" />
          <path d="M8 10h8M12 6q-2 4 0 8q2-4 0-8M8 17h8" fill="none" stroke="#ffffff" stroke-width="1.2" />
        </svg>
        <span>{{ $t('worldTravel.passport') }}</span>
        <span class="count">{{ $t('worldTravel.stamps', { n: stamps, total: travelLevels.length }) }}</span>
      </button>
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

.rules {
  margin: 0 0 12px;
  padding: 10px 14px;
  border-radius: 14px;
  background: var(--panel);
  font-size: 15px;
  line-height: 1.4;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 12px 0;
}

.tab {
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--panel);
  color: var(--fg);
  border: 2px solid var(--soft);
  font-size: 15px;
}

.tab.active {
  background: #1f9bb5;
  border-color: #1f9bb5;
  color: #ffffff;
}

.tab .count {
  margin-inline-start: 4px;
  font-size: 13px;
  opacity: 0.8;
}

.places {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.place {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  text-align: start;
  background: var(--panel);
  color: var(--fg);
  border: 2px solid var(--soft);
  position: relative;
}

.place.done {
  border-color: var(--accent);
}

.place.paid {
  background: var(--gold-bg);
  border-color: #f5b301;
  color: var(--gold-fg);
}

.place:disabled {
  background: var(--disabled-bg);
  color: var(--faint);
  cursor: default;
}

.place:disabled .flag {
  opacity: 0.5;
}

.flag {
  flex: none;
  width: 48px;
  height: 32px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px var(--line);
}

.text {
  flex: 1;
  display: grid;
  gap: 2px;
  min-width: 0;
}

.name {
  font-size: 19px;
  font-weight: 700;
}

.sub {
  font-size: 14px;
  color: var(--muted);
}

.state {
  font-size: 13px;
  font-weight: 700;
}

.lock {
  flex: none;
  width: 22px;
  height: 22px;
}

.passport {
  width: 100%;
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 18px;
  background: linear-gradient(120deg, #2bb3cf, #1f9bb5 60%, #17768a);
  color: #ffffff;
  font-size: 19px;
  font-weight: 700;
}

.passport svg {
  flex: none;
  width: 30px;
  height: 30px;
  color: #6b2737;
}

.passport .count {
  margin-inline-start: auto;
  font-size: 14px;
  font-weight: 600;
  opacity: 0.9;
}
</style>
