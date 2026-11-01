<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ScreenHeader from '../components/ScreenHeader.vue'
import StarRating from '../components/StarRating.vue'
import type { Level } from '../engine/types.ts'
import { levels } from '../levels/index.ts'
import { useProgressStore } from '../stores/progress.ts'

const router = useRouter()
const progress = useProgressStore()
const { t } = useI18n()

/** Levels grouped by chapter, in level order. */
const chapters = computed(() => {
  const map = new Map<string, Level[]>()
  for (const l of levels) map.set(l.chapter, [...(map.get(l.chapter) ?? []), l])
  return [...map].map(([chapter, list]) => ({ chapter, levels: list }))
})

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
    <ScreenHeader :title="$t('map.title')" />
    <main>
      <section v-for="c in chapters" :key="c.chapter">
        <h2>{{ $t(`chapters.${c.chapter}`) }}</h2>
        <ul class="grid">
          <li v-for="level in c.levels" :key="level.id">
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
      </section>
    </main>
  </div>
</template>

<style scoped>
.screen {
  height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px 24px;
}

h2 {
  font-size: 18px;
  margin: 16px 0 10px;
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
  border: 2px solid #dfe7e2;
}

.tile.done {
  border-color: var(--accent);
}

.tile.paid {
  background: #fff4d6;
  border-color: #f5b301;
  color: #8a6400;
}

.tile:disabled {
  background: #e9ecea;
  color: #8a948f;
  cursor: default;
}

.num {
  font-size: 22px;
  font-weight: 700;
}

.lock {
  font-size: 14px;
}
</style>
