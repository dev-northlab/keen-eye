<script setup lang="ts">
// "What's inside" on the About screen: totals, a tile per game mode (colors and icons of the game modes
// screen, LevelMapView) and the game's perks.
import { LOCALES } from '../i18n/index.ts'
import { DETECTIVE_CHAPTER, MEMORY_CHAPTER, TIME_CHAPTER, TRAVEL_CHAPTER } from '../levels/chapters.ts'
import { allLevels } from '../levels/index.ts'
import { timeTravelLevels } from '../levels/time-travel/index.ts'

// Two pictures, the second with a red sun, and a magnifier over it; a pyramid and a clock (as on the banners).
const SPOT_ICON =
  '<rect x="2" y="9" width="20" height="24" rx="3" fill="#bfe6cf"/><path d="M2 26l6-5 5 4 9-6v11a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3Z" fill="#3fa46f"/><circle cx="15" cy="15" r="3" fill="#f2b04a"/><rect x="26" y="9" width="20" height="24" rx="3" fill="#bfe6cf"/><path d="M26 26l6-5 5 4 9-6v11a3 3 0 0 1-3 3h-14a3 3 0 0 1-3-3Z" fill="#3fa46f"/><circle cx="39" cy="15" r="3" fill="#e5484d"/><circle cx="38" cy="16" r="7" fill="#fff" fill-opacity="0.35" stroke="#1f7a55" stroke-width="2.6"/><path d="M33 21l-6 6" fill="none" stroke="#1f7a55" stroke-width="3.4" stroke-linecap="round"/>'
const ERAS_ICON =
  '<path d="M4 42L22 12l18 30Z" fill="#e8b85a"/><path d="M22 12l18 30H24Z" fill="#c9953f"/><circle cx="35" cy="14" r="10" fill="#fff" stroke="#d98a1c" stroke-width="3"/><path d="M35 8.5V14l4 2.5" fill="none" stroke="#d98a1c" stroke-width="2.6" stroke-linecap="round"/>'

const modes = [
  { key: 'spot', icon: SPOT_ICON, name: 'map.title', tag: 'map.task' },
  { key: 'time', icon: TIME_CHAPTER.icon, name: 'chapters.time', tag: 'timeMode.task' },
  { key: 'memory', icon: MEMORY_CHAPTER.icon, name: 'chapters.memory', tag: 'memoryMode.task' },
  { key: 'world', icon: TRAVEL_CHAPTER.icon, name: 'chapters.travel', tag: 'worldTravel.task' },
  { key: 'detective', icon: DETECTIVE_CHAPTER.icon, name: 'chapters.detective', tag: 'detective.task' },
  { key: 'eras', icon: ERAS_ICON, name: 'timeTravel.title', tag: 'timeTravel.task' },
]

// Icons inside a 24×24 viewBox, drawn in the perk's color (currentColor).
const perks = [
  {
    key: 'duo',
    label: 'home.duo',
    color: '#3b82f6',
    icon: '<circle cx="8" cy="8" r="3.4"/><circle cx="16.5" cy="9" r="3"/><path d="M1.8 20c0-3.8 2.8-6.6 6.2-6.6s6.2 2.8 6.2 6.6Z"/><path d="M14.6 20c0-1.9-.5-3.6-1.5-5 1-.8 2.2-1.2 3.4-1.2 3 0 5.6 2.5 5.6 6.2Z" fill-opacity="0.7"/>',
  },
  {
    key: 'calm',
    label: 'about.perks.calm',
    color: '#2f9e6e',
    icon: '<path d="M20 3.5C10 3.5 4 8.6 4 15c0 1.5.4 2.9 1 4 1.6-4 4.6-7 9-9-3.6 2.3-6 5.4-7.3 9.6 1.2.6 2.6.9 4 .9 6.5 0 9.6-6.4 9.3-17Z"/>',
  },
  {
    key: 'living',
    label: 'about.perks.living',
    color: '#e8457a',
    icon: '<path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9Z"/><path d="M19 14.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9Z" fill-opacity="0.75"/><path d="M5 15.5l.7 1.8 1.8.7-1.8.7L5 20.5l-.7-1.8-1.8-.7 1.8-.7Z" fill-opacity="0.6"/>',
  },
  {
    key: 'keys',
    label: 'about.perks.keys',
    color: '#d99a0b',
    icon: '<path d="M7 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm0 3.6a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8Z" fill-rule="evenodd"/><path d="M12 10.3h10v3.4h-1.6v3.5h-2.6v-3.5h-1.4v2.5H14v-2.5h-2Z"/>',
  },
]

const stats = [
  { value: allLevels.length + timeTravelLevels.length, label: 'about.stats.levels' },
  { value: modes.length, label: 'about.stats.modes' },
  { value: LOCALES.length, label: 'about.stats.languages' },
]
</script>

<template>
  <section class="features">
    <h2>{{ $t('about.features') }}</h2>

    <dl class="stats">
      <div v-for="s in stats" :key="s.label" class="stat">
        <dt>{{ $t(s.label) }}</dt>
        <dd>{{ s.value }}</dd>
      </div>
    </dl>

    <ul class="modes">
      <li v-for="m in modes" :key="m.key" class="mode" :class="m.key">
        <svg class="icon" viewBox="0 0 48 48" aria-hidden="true" v-html="m.icon" />
        <span class="name">{{ $t(m.name) }}</span>
        <span class="tag">{{ $t(m.tag) }}</span>
      </li>
    </ul>

    <ul class="perks">
      <li v-for="p in perks" :key="p.key" class="perk" :style="{ '--perk': p.color }">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" v-html="p.icon" />
        <span>{{ $t(p.label) }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.features {
  background: var(--panel);
  border-radius: 20px;
  padding: 16px 14px 14px;
  box-shadow: 0 6px 16px rgb(35 48 43 / 0.12);
  display: grid;
  gap: 14px;
}

h2 {
  margin: 0;
  font-size: 18px;
  text-align: center;
}

ul,
dl {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Totals: big numbers in a row. */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.stat {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  padding: 10px 4px;
  border-radius: 14px;
  background: var(--soft-2);
}

.stat dd {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.1;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
}

.stat dt {
  font-size: 12px;
  color: var(--muted);
  text-align: center;
}

/* A tile per game mode, colored like its banner. */
.modes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.mode {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: 10px;
  align-items: center;
  padding: 10px;
  border-radius: 16px;
  color: #fff;
  background: linear-gradient(145deg, var(--mode-from), var(--mode-mid) 55%, var(--mode-to));
  box-shadow: inset 0 -3px 0 rgb(0 0 0 / 0.12);
}

/* A soft light in the corner. */
.mode::after {
  content: '';
  position: absolute;
  top: -30px;
  right: -30px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #fff;
  opacity: 0.12;
  pointer-events: none;
}

.icon {
  grid-row: 1 / 3;
  width: 44px;
  height: 44px;
  padding: 5px;
  border-radius: 12px;
  background: var(--mode-icon-bg);
}

.name {
  align-self: end;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 1px 2px rgb(0 0 0 / 0.25);
  overflow-wrap: anywhere;
}

.tag {
  align-self: start;
  font-size: 12px;
  line-height: 1.25;
  opacity: 0.92;
  overflow-wrap: anywhere;
}

.spot {
  --mode-from: #4cc38a;
  --mode-mid: #2f9e6e;
  --mode-to: #1f7a55;
  --mode-icon-bg: #e3f6ec;
}

.time {
  --mode-from: #9b7bff;
  --mode-mid: #7a5af5;
  --mode-to: #4b3bb0;
  --mode-icon-bg: #ece6ff;
}

.memory {
  --mode-from: #ff8fb1;
  --mode-mid: #e8457a;
  --mode-to: #b8235a;
  --mode-icon-bg: #ffe6ee;
}

.world {
  --mode-from: #4cc9e0;
  --mode-mid: #1f9bb5;
  --mode-to: #17768a;
  --mode-icon-bg: #ddf4f8;
}

.detective {
  --mode-from: #c08a55;
  --mode-mid: #8a5a2b;
  --mode-to: #5e3b1a;
  --mode-icon-bg: #f6eadc;
}

.eras {
  --mode-from: #f2b04a;
  --mode-mid: #d9771c;
  --mode-to: #b8561a;
  --mode-icon-bg: #fff3dd;
}

/* Perks: an icon in a tinted circle and a short label. */
.perks {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.perk {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 14px;
  background: var(--soft-2);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
}

.perk svg {
  flex: none;
  width: 34px;
  height: 34px;
  padding: 7px;
  border-radius: 50%;
  color: var(--perk);
  background: color-mix(in srgb, var(--perk) 16%, transparent);
}
</style>
