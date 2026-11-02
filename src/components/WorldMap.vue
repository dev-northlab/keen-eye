<script setup lang="ts">
import type { Level, TravelRegion } from '../engine/types.ts'
import { TRAVEL_REGIONS } from '../levels/travel/index.ts'

// Cartoon world map of the "travel" mode (docs/world-travel-mode.md): rough continents, a dot per place
// (red once visited) and a badge per region with its visited / total places; tapping a badge
// selects the region. Equirectangular projection, 1000×500 for the whole globe.

const props = defineProps<{ levels: Level[]; region: TravelRegion; visited: (id: number) => boolean }>()
defineEmits<{ select: [region: TravelRegion] }>()

const project = (lat: number, lon: number) => [((lon + 180) / 360) * 1000, ((90 - lat) / 180) * 500]

/** Coastlines as [lon, lat] points, drawn as smooth closed curves. */
const LANDS: [number, number][][] = [
  // North America
  [[-168, 66], [-160, 70], [-140, 70], [-120, 72], [-95, 72], [-80, 73], [-70, 63], [-60, 57], [-55, 50], [-66, 45], [-70, 42], [-76, 38], [-80, 32], [-81, 26], [-82, 30], [-90, 29], [-97, 26], [-97, 20], [-90, 16], [-84, 14], [-80, 8], [-78, 8], [-86, 12], [-92, 15], [-105, 20], [-110, 24], [-115, 30], [-118, 34], [-124, 40], [-125, 48], [-132, 55], [-140, 60], [-152, 58], [-160, 58], [-165, 62]],
  // Greenland
  [[-55, 60], [-44, 60], [-22, 70], [-20, 80], [-60, 82], [-70, 77], [-58, 70]],
  // South America
  [[-78, 8], [-72, 12], [-62, 10], [-50, 0], [-35, -5], [-35, -10], [-40, -22], [-48, -28], [-58, -38], [-65, -42], [-68, -50], [-72, -53], [-75, -48], [-73, -40], [-71, -30], [-70, -18], [-76, -12], [-81, -5], [-80, 0]],
  // Eurasia
  [[-10, 36], [-9, 43], [-2, 44], [-4, 48], [2, 51], [8, 54], [8, 57], [5, 62], [12, 66], [20, 70], [30, 71], [45, 68], [60, 70], [80, 73], [100, 76], [120, 73], [140, 72], [160, 70], [180, 68], [180, 64], [170, 60], [160, 58], [155, 52], [142, 47], [135, 43], [130, 42], [126, 38], [122, 40], [121, 32], [120, 25], [115, 22], [108, 21], [106, 12], [104, 9], [100, 13], [100, 8], [103, 1], [98, 8], [97, 16], [92, 22], [88, 22], [80, 15], [77, 8], [73, 18], [70, 22], [66, 25], [57, 26], [59, 22], [56, 18], [52, 16], [44, 13], [42, 17], [38, 22], [34, 28], [32, 31], [35, 34], [36, 36], [30, 37], [26, 40], [22, 37], [20, 40], [16, 38], [12, 42], [8, 44], [3, 43], [0, 39], [-6, 37]],
  // Africa
  [[-17, 21], [-16, 14], [-12, 8], [-5, 5], [5, 5], [9, 4], [10, -2], [12, -6], [13, -12], [12, -18], [15, -27], [18, -34], [22, -34], [28, -33], [33, -26], [35, -20], [40, -15], [40, -10], [40, -3], [42, 2], [51, 11], [44, 11], [38, 18], [34, 27], [32, 31], [25, 32], [20, 31], [15, 32], [10, 34], [10, 37], [2, 37], [-5, 36], [-10, 30], [-13, 27]],
  // Madagascar, Great Britain, Iceland, Japan
  [[44, -25], [47, -25], [50, -15], [49, -12], [44, -17]],
  [[-5, 50], [1, 51], [2, 53], [-1, 55], [-3, 58], [-6, 58], [-5, 55], [-3, 54], [-5, 52]],
  [[-24, 64], [-14, 65], [-16, 66.5], [-22, 66.5]],
  [[130, 31], [132, 34], [136, 35], [140, 36], [141, 40], [141, 45], [144, 43], [142, 39], [140, 35], [135, 33]],
  // Sumatra, Borneo, New Guinea
  [[95, 5], [98, 4], [106, -6], [102, -4]],
  [[109, 1], [117, 7], [119, 1], [116, -4], [110, -3]],
  [[131, -1], [141, -3], [150, -10], [141, -9], [137, -5]],
  // Australia, New Zealand
  [[114, -22], [115, -34], [123, -34], [130, -32], [135, -35], [140, -38], [146, -39], [150, -37], [153, -28], [153, -25], [146, -18], [145, -14], [142, -11], [136, -12], [136, -15], [130, -12], [125, -15], [122, -18]],
  [[173, -35], [176, -37], [178, -38], [175, -41.5], [174, -39], [173, -36.5]],
  [[174, -41], [172, -44], [170, -46], [167, -46], [168, -44], [172, -41]],
]

/** Closed curve through the midpoints of the projected points, the points as control points. */
function smooth(points: [number, number][]) {
  const p = points.map(([lon, lat]) => project(lat, lon))
  const mid = (a: number[], b: number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2].map((v) => v.toFixed(1)).join(' ')
  let d = `M${mid(p[p.length - 1], p[0])}`
  p.forEach((pt, i) => (d += `Q${pt.map((v) => v.toFixed(1)).join(' ')} ${mid(pt, p[(i + 1) % p.length])}`))
  return d + 'Z'
}
const lands = LANDS.map(smooth)

const places = props.levels.map((l) => {
  const [x, y] = project(l.travel!.lat, l.travel!.lon)
  return { id: l.id, region: l.travel!.region, x, y }
})

/** Region badges, placed by hand in open sea or empty land near their places ([lon, lat]). */
const LABELS: Record<TravelRegion, [number, number]> = {
  europe: [-2, 64],
  caucasus: [40, 56],
  asia: [102, 52],
  americas: [-95, 8],
  africa: [18, 6],
  oceania: [150, -14],
}
const badges = TRAVEL_REGIONS.map((region) => {
  const [x, y] = project(LABELS[region][1], LABELS[region][0])
  return { region, x, y, ids: places.filter((p) => p.region === region).map((p) => p.id) }
}).filter((b) => b.ids.length > 0)
</script>

<template>
  <svg class="world" viewBox="0 30 1000 360" role="img" :aria-label="$t('chapters.travel')">
    <rect y="30" width="1000" height="360" fill="#8fd0ec" />
    <path v-for="(d, i) in lands" :key="i" :d="d" fill="#9ed37a" stroke="#6fae58" stroke-width="2" />
    <g v-for="p in places" :key="p.id">
      <circle :cx="p.x" :cy="p.y" r="9" :fill="visited(p.id) ? '#e5484d' : '#ffffff'" stroke="#3d4a55" stroke-width="3" />
    </g>
    <g
      v-for="b in badges"
      :key="b.region"
      class="badge"
      :class="{ active: b.region === region }"
      role="button"
      tabindex="0"
      :aria-label="$t(`worldTravel.regions.${b.region}`)"
      :aria-pressed="b.region === region"
      @click="$emit('select', b.region)"
      @keydown.enter.prevent="$emit('select', b.region)"
    >
      <rect :x="b.x - 50" :y="b.y - 24" width="100" height="48" rx="24" class="pill" />
      <text :x="b.x" :y="b.y + 11" text-anchor="middle">
        {{ b.ids.filter(visited).length }}/{{ b.ids.length }}
      </text>
    </g>
  </svg>
</template>

<style scoped>
.world {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 18px;
  box-shadow: 0 4px 14px rgb(0 0 0 / 0.12);
}

.badge {
  cursor: pointer;
  outline: none;
}

.pill {
  fill: #ffffff;
  stroke: #1f9bb5;
  stroke-width: 4;
}

.badge.active .pill {
  fill: #1f9bb5;
}

.badge text {
  font-size: 32px;
  font-weight: 700;
  fill: #1f6f80;
  pointer-events: none;
}

.badge.active text {
  fill: #ffffff;
}

.badge:focus-visible .pill {
  stroke: #23302b;
}
</style>
