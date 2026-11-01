<script setup lang="ts">
import { SEASONS, useSettingsStore, type Season } from '../stores/settings.ts'

// Season of the home screen's meadow: four icon buttons on a pill, the chosen one raised and coloured.

const settings = useSettingsStore()

const COLORS: Record<Season, string> = { spring: '#4caf6a', summer: '#f0a020', autumn: '#e0702a', winter: '#4a8fd0' }
</script>

<template>
  <div class="seasons" role="radiogroup" :aria-label="$t('season.label')">
    <button
      v-for="s in SEASONS"
      :key="s"
      role="radio"
      :aria-checked="settings.season === s"
      :aria-label="$t(`season.${s}`)"
      :title="$t(`season.${s}`)"
      :class="{ active: settings.season === s }"
      :style="{ '--season': COLORS[s] }"
      @click="settings.season = s"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <!-- Spring: a sprout. -->
        <g v-if="s === 'spring'" fill="currentColor">
          <path d="M11 21v-8h2v8Z" />
          <path d="M12 13c0-4.4 2.9-7 7.5-7 0 4.4-3 7-7.5 7Z" />
          <path d="M12 15c0-3.6-2.4-6-6.5-6 0 3.6 2.6 6 6.5 6Z" />
        </g>
        <!-- Summer: the sun. -->
        <g v-else-if="s === 'summer'" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="12" cy="12" r="4.2" fill="currentColor" />
          <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
        </g>
        <!-- Autumn: a falling leaf. -->
        <g v-else-if="s === 'autumn'">
          <path d="M4.5 19.5C4.5 10.5 10 4.5 19.5 4.5c0 9.5-6 15-15 15Z" fill="currentColor" />
          <path d="M4.5 19.5L14 10" stroke="#fff" stroke-width="1.6" stroke-linecap="round" />
        </g>
        <!-- Winter: a snowflake. -->
        <g v-else stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none">
          <path d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5" />
          <path d="M9.5 4.5L12 7l2.5-2.5M9.5 19.5L12 17l2.5 2.5" />
        </g>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.seasons {
  display: flex;
  gap: 2px;
  padding: 4px;
  border-radius: 999px;
  background: var(--glass);
  box-shadow: 0 2px 8px rgb(35 48 43 / 0.1);
}

button {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--faint);
  transition:
    background 0.15s ease,
    color 0.15s ease,
    transform 0.15s ease;
}

button:hover {
  color: var(--season);
}

button.active {
  background: var(--raised);
  color: var(--season);
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.18);
  transform: scale(1.06);
}

svg {
  width: 24px;
  height: 24px;
}
</style>
