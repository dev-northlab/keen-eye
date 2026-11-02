<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BackButton from '../components/BackButton.vue'
import ModalDialog from '../components/ModalDialog.vue'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import StarRating from '../components/StarRating.vue'
import TravelFact from '../components/TravelFact.vue'
import type { Level } from '../engine/types.ts'
import { FLAGS } from '../levels/travel/flags.ts'
import { travelLevels } from '../levels/travel/index.ts'
import { useBackButton } from '../services/backButton.ts'
import { useProgressStore } from '../stores/progress.ts'

// The traveller's passport of the "travel" mode (docs/world-travel-mode.md): a stamp per visited place,
// an empty slot for the others. Tapping a stamp shows the place's fact again.

const router = useRouter()
const progress = useProgressStore()

/** Stamp whose fact is open. */
const shown = ref<Level | null>(null)
const stamps = computed(() => travelLevels.filter((l) => progress.isCompleted(l.id)).length)

const toMap = () => router.push({ name: 'travel' })
useBackButton(() => (shown.value ? (shown.value = null) : toMap()))

/** A slight tilt per stamp, as if stamped by hand. */
const tilt = (i: number) => `${((i * 37) % 13) - 6}deg`
</script>

<template>
  <div class="screen">
    <ScreenBackdrop theme="meadow" />
    <main>
      <section class="book">
        <h1>{{ $t('worldTravel.passportTitle') }}</h1>
        <p class="total">{{ $t('worldTravel.stamps', { n: stamps, total: travelLevels.length }) }}</p>
        <ul class="stamps">
          <li v-for="(level, i) in travelLevels" :key="level.id">
            <button
              v-if="progress.isCompleted(level.id)"
              class="stamp"
              :style="{ rotate: tilt(i) }"
              :aria-label="$t(`levelTitles.${level.title}`)"
              @click="shown = level"
            >
              <svg class="flag" viewBox="0 0 30 20" aria-hidden="true" v-html="FLAGS[level.travel!.country]" />
              <span class="name">{{ $t(`levelTitles.${level.title}`) }}</span>
              <StarRating :stars="progress.records[level.id]?.stars ?? 0" :size="11" />
            </button>
            <span v-else class="slot" :aria-label="$t('worldTravel.notVisited')">?</span>
          </li>
        </ul>
      </section>
    </main>
    <BackButton :on-back="toMap" />
    <ModalDialog v-if="shown" :title="$t('worldTravel.passport')">
      <TravelFact :level="shown" />
      <button @click="shown = null">{{ $t('common.close') }}</button>
    </ModalDialog>
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

.book {
  padding: 18px 14px 20px;
  border-radius: 20px;
  background: var(--panel);
  border: 3px solid #6b2737;
  box-shadow: 0 6px 16px rgb(0 0 0 / 0.14);
}

h1 {
  margin: 0;
  text-align: center;
  font-size: 22px;
  color: var(--fg);
}

.total {
  margin: 4px 0 16px;
  text-align: center;
  color: var(--muted);
}

.stamps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  gap: 12px;
}

.stamp,
.slot {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
}

.stamp {
  display: grid;
  place-items: center;
  align-content: center;
  gap: 4px;
  padding: 8px;
  background: var(--panel);
  color: #c0392b;
  border: 3px double #c0392b;
  box-shadow: inset 0 0 0 4px var(--panel), inset 0 0 0 6px rgb(192 57 43 / 0.35);
}

.flag {
  width: 34px;
  height: 23px;
  border-radius: 3px;
}

.name {
  font-size: 12px;
  font-weight: 700;
  line-height: 1.15;
  text-align: center;
  text-transform: uppercase;
}

.slot {
  display: grid;
  place-items: center;
  border: 2px dashed var(--line);
  color: var(--faint);
  font-size: 26px;
  font-weight: 700;
}
</style>
