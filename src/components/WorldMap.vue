<script setup lang="ts">
import { useId } from 'vue'
import type { Level, TravelRegion } from '../engine/types.ts'
import { TRAVEL_REGIONS } from '../levels/travel/index.ts'

// Cartoon world map of the "travel" mode (docs/world-travel-mode.md): rough continents on a deep sea
// with a grid, shallows and a compass, a pin per place (a red map pin once visited; the places of the
// selected region stand out) and a badge per region with its visited / total places; tapping a badge
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

/** Ids of the gradients, unique per map. */
const uid = useId()
const ids = { sea: `${uid}-sea`, land: `${uid}-land`, pill: `${uid}-pill`, active: `${uid}-active` }

/** Grid: meridians every 30°, parallels every 30° (the equator stronger). */
const meridians = Array.from({ length: 11 }, (_, i) => project(0, -150 + i * 30)[0])
const parallels = [60, 30, 0, -30].map((lat) => ({ y: project(lat, 0)[1], equator: lat === 0 }))

/** Little waves in open sea and two clouds drifting over it ([lon, lat]). */
const waves = ([[-150, 28], [-128, -22], [-165, -8], [-42, 32], [-28, 6], [72, -12], [90, -38], [-112, 2]] as const).map(
  ([lon, lat], i) => ({ x: project(lat, lon)[0], y: project(lat, lon)[1], delay: `${-i * 0.9}s` }),
)
const clouds = ([[-150, 45], [72, -30]] as const).map(([lon, lat]) => project(lat, lon))
const compass = project(-38, -25)
</script>

<template>
  <svg class="world" viewBox="0 30 1000 360" role="img" :aria-label="$t('chapters.travel')">
    <defs>
      <linearGradient :id="ids.sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#a8e2f5" />
        <stop offset="1" stop-color="#58b3dc" />
      </linearGradient>
      <linearGradient :id="ids.land" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#bfe596" />
        <stop offset="1" stop-color="#84c266" />
      </linearGradient>
      <linearGradient :id="ids.pill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff" />
        <stop offset="1" stop-color="#e3f6fb" />
      </linearGradient>
      <linearGradient :id="ids.active" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3cc6e0" />
        <stop offset="1" stop-color="#1588a3" />
      </linearGradient>
    </defs>

    <!-- The sea: a gradient, the grid and little waves. -->
    <rect y="30" width="1000" height="360" :fill="`url(#${ids.sea})`" />
    <g class="grid">
      <line v-for="x in meridians" :key="`m${x}`" :x1="x" :x2="x" y1="30" y2="390" />
      <line v-for="p in parallels" :key="`p${p.y}`" :class="{ equator: p.equator }" x1="0" x2="1000" :y1="p.y" :y2="p.y" />
    </g>
    <path
      v-for="(w, i) in waves"
      :key="`w${i}`"
      class="wave"
      :style="{ animationDelay: w.delay }"
      :d="`M${w.x - 16} ${w.y}q8-7 16 0t16 0`"
    />

    <!-- Lands: a shadow on the sea, light shallows along the coasts, then the land. -->
    <g class="shadow"><path v-for="(d, i) in lands" :key="i" :d="d" /></g>
    <g class="shallows"><path v-for="(d, i) in lands" :key="i" :d="d" /></g>
    <g class="land" :fill="`url(#${ids.land})`"><path v-for="(d, i) in lands" :key="i" :d="d" /></g>

    <!-- Compass rose in the South Atlantic. -->
    <g class="compass" :transform="`translate(${compass[0]} ${compass[1]})`">
      <circle r="24" />
      <path d="M0-20 5-5 20 0 5 5 0 20-5 5-20 0-5-5Z" class="rose" />
      <path d="M0-20 5-5h-10Z" class="north" />
    </g>

    <g v-for="(c, i) in clouds" :key="`c${i}`" class="cloud" :style="{ animationDelay: `${-i * 5}s` }">
      <g :transform="`translate(${c[0]} ${c[1]})`">
        <ellipse cx="0" cy="4" rx="30" ry="11" />
        <circle cx="-10" cy="-2" r="12" />
        <circle cx="8" cy="-6" r="15" />
      </g>
    </g>

    <!-- Places: a red map pin once visited, a white dot before; the selected region's a little bigger. -->
    <g v-for="p in places" :key="p.id" :transform="`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`">
      <g class="place" :class="{ near: p.region === region }">
        <template v-if="visited(p.id)">
          <ellipse cy="1" rx="6" ry="2.5" class="pin-shadow" />
          <path d="M0 0C-2-6-11-11-11-20A11 11 0 1 1 11-20C11-11 2-6 0 0Z" class="pin" />
          <circle cy="-20" r="4.5" fill="#fff" />
        </template>
        <circle v-else r="7.5" class="dot" />
      </g>
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
      :transform="`translate(${b.x.toFixed(1)} ${b.y.toFixed(1)})`"
      @click="$emit('select', b.region)"
      @keydown.enter.prevent="$emit('select', b.region)"
    >
      <rect v-if="b.region === region" x="-60" y="-24" width="120" height="48" rx="24" class="halo" />
      <rect x="-60" y="-19" width="120" height="48" rx="24" class="pill-depth" />
      <rect x="-60" y="-24" width="120" height="48" rx="24" class="pill" :fill="`url(#${b.region === region ? ids.active : ids.pill})`" />
      <path d="M-38 8C-39 4-46 0-46-6A8 8 0 1 1-30-6C-30 0-37 4-38 8Z" class="badge-pin" />
      <circle cx="-38" cy="-6" r="3" class="badge-pin-hole" />
      <text x="12" y="11" text-anchor="middle">{{ b.ids.filter(visited).length }}/{{ b.ids.length }}</text>
    </g>

    <!-- A light inner frame, like a printed map. -->
    <rect x="3" y="33" width="994" height="354" rx="16" class="frame" />
  </svg>
</template>

<style scoped>
.world {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 18px;
  overflow: hidden;
  box-shadow:
    0 2px 0 rgb(255 255 255 / 0.6) inset,
    0 10px 24px -10px rgb(10 70 100 / 0.45);
}

.grid line {
  stroke: #fff;
  stroke-opacity: 0.28;
  stroke-width: 1.5;
  stroke-dasharray: 6 8;
}

.grid .equator {
  stroke-opacity: 0.45;
  stroke-width: 2;
}

.wave {
  fill: none;
  stroke: #fff;
  stroke-opacity: 0.55;
  stroke-width: 3;
  stroke-linecap: round;
  animation: wave 4s ease-in-out infinite alternate;
}

@keyframes wave {
  to {
    transform: translateX(8px);
    opacity: 0.4;
  }
}

.shadow {
  fill: #23739a;
  fill-opacity: 0.3;
  transform: translate(4px, 6px);
}

.shallows {
  fill: #d2f1fa;
  stroke: #d2f1fa;
  stroke-width: 12;
  stroke-linejoin: round;
  stroke-opacity: 0.8;
}

.land path {
  stroke: #5c9e4b;
  stroke-width: 2.5;
  stroke-linejoin: round;
}

.compass circle {
  fill: #fff;
  fill-opacity: 0.75;
  stroke: #1f6f80;
  stroke-opacity: 0.5;
  stroke-width: 2;
}

.compass .rose {
  fill: #1f6f80;
  fill-opacity: 0.7;
}

.compass .north {
  fill: #e5484d;
}

.cloud {
  fill: #fff;
  fill-opacity: 0.8;
  animation: drift 14s ease-in-out infinite alternate;
}

@keyframes drift {
  to {
    transform: translateX(26px);
  }
}

.place {
  transition: transform 0.3s cubic-bezier(0.3, 1.6, 0.5, 1);
}

.place.near {
  transform: scale(1.25);
}

.place.near .dot {
  stroke: #1588a3;
}

.pin {
  fill: #e5484d;
  stroke: #9e1f2a;
  stroke-width: 2;
}

.pin-shadow {
  fill: #000;
  fill-opacity: 0.25;
}

.dot {
  fill: #fff;
  stroke: #2a7f95;
  stroke-width: 3;
}

.badge {
  cursor: pointer;
  outline: none;
}

.pill-depth {
  fill: #0e6178;
  fill-opacity: 0.35;
}

.pill {
  stroke: #1f9bb5;
  stroke-width: 3;
}

.badge.active .pill {
  stroke: #fff;
}

.badge-pin {
  fill: #e5484d;
}

.badge-pin-hole {
  fill: #fff;
}

.badge text {
  font-size: 30px;
  font-weight: 800;
  fill: #1f6f80;
  pointer-events: none;
}

.badge.active text {
  fill: #fff;
  paint-order: stroke;
  stroke: #0e6178;
  stroke-width: 3;
}

/* The selected region's badge: a soft ring pulsing out of it. */
.halo {
  fill: none;
  stroke: #fff;
  stroke-width: 4;
  transform-box: fill-box;
  transform-origin: center;
  animation: halo 1.8s ease-out infinite;
}

@keyframes halo {
  from {
    transform: scale(1);
    opacity: 0.9;
  }
  to {
    transform: scale(1.25, 1.5);
    opacity: 0;
  }
}

.badge:focus-visible .pill {
  stroke: #23302b;
}

.frame {
  fill: none;
  stroke: #fff;
  stroke-opacity: 0.45;
  stroke-width: 3;
}
</style>
