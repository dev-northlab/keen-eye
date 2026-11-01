<script setup lang="ts">
import { computed } from 'vue'
import type { Season } from '../stores/settings.ts'

// Home screen meadow for ScreenBackdrop's landscape strip (viewBox 0 0 1600 400). Wide windows cut the
// strip's top 60 units and phones show only about x 450–1150, so nothing reaches above y ≈ 70 and every
// kind of tree also stands in the middle. Three hills, a house, trees of five kinds and the ground of
// the season: flowers (spring, summer), fallen leaves and pumpkins (autumn), snow and a snowman (winter).
// Living scene: trees sway (harder in the autumn wind), flowers nod, butterflies fly in spring and
// summer, the house's chimney smokes and the snow sparkles in winter. Animals: rabbits hop (white in
// winter), a goat grazes, a sheep nods, a hen and her chick peck by the house. A river runs from the far
// hills (narrow) past the house into a lake on the front hill: it flows, the lake ripples, a duck and
// her ducklings swim among lily pads and reeds; in winter both are frozen.

/** `lights`: draw only the lit house windows (an unfiltered layer over the night-dimmed scene). */
const props = defineProps<{ season: Season; lights?: boolean }>()

type Kind = 'oak' | 'pine' | 'birch' | 'poplar' | 'apple' | 'house' | 'lamp'
/** Kinds that are not trees: no leaves, no swaying. */
const BUILT: Kind[] = ['house', 'lamp']
interface Item {
  kind: Kind
  x: number
  /** Base on the hill (a few units below its surface). */
  y: number
  s: number
  /** Houses: index into HOUSE_LOOKS. */
  look?: number
}
const item = (kind: Kind, x: number, y: number, s = 1, look?: number): Item => ({ kind, x, y, s, look })

const FAR_HILL = 'M0 170Q250 70 520 150T1050 130T1600 150V400H0Z'
const MID_HILL = 'M0 240Q300 150 640 220T1250 200T1600 230V400H0Z'
/** Front hill: both curves have evenly spaced x, so its height is easy to compute (frontY). */
const FRONT_HILL = 'M0 310Q400 250 800 300T1600 290V400H0Z'

function frontY(x: number): number {
  const [p0, c, p1, t] = x <= 800 ? [310, 250, 300, x / 800] : [300, 350, 290, (x - 800) / 800]
  return (1 - t) ** 2 * p0 + 2 * (1 - t) * t * c + t * t * p1
}

// Base heights come from the hill curves at each x.
const FAR_TREES = [
  item('pine', 90, 144, 0.55),
  item('oak', 170, 127, 0.6),
  item('poplar', 260, 119, 0.5),
  item('birch', 330, 120, 0.5),
  item('pine', 420, 130, 0.55),
  item('oak', 700, 187, 0.55),
  item('birch', 780, 189, 0.5),
  item('pine', 850, 184, 0.55),
  item('poplar', 1510, 122, 0.5),
]
const MID_TREES = [
  item('oak', 60, 228),
  item('pine', 150, 209, 1.05),
  item('apple', 230, 199, 0.9),
  item('birch', 380, 194),
  item('poplar', 460, 198, 0.95),
  item('oak', 540, 207, 1.05),
  item('apple', 610, 218, 0.85),
  item('house', 725, 238, 0.9, 1),
  item('lamp', 800, 247, 0.85),
  item('poplar', 860, 253, 0.8),
  item('lamp', 897, 252, 0.85),
  item('house', 1010, 250, 1, 0),
  item('lamp', 1075, 242, 0.85),
  item('apple', 1175, 226, 0.85),
  item('pine', 1250, 204),
  item('birch', 1330, 181, 0.95),
  item('oak', 1420, 166, 0.9),
  item('pine', 1510, 173),
]

const HILLS: Record<Season, { far: string; mid: string; front: string }> = {
  spring: { far: '#c3e6b0', mid: '#9fd88a', front: '#7cc96e' },
  summer: { far: '#b5dca5', mid: '#8cc97f', front: '#6db86a' },
  autumn: { far: '#e8d49c', mid: '#d8b966', front: '#c49f48' },
  winter: { far: '#f7fafc', mid: '#e9f1f6', front: '#dde8f0' },
}
const AUTUMN = ['#e98a2e', '#d9542b', '#f2c14e', '#c9662b']
const CROWNS: Record<'spring' | 'summer', Record<Exclude<Kind, 'house' | 'lamp'>, string>> = {
  spring: { oak: '#8fd47a', pine: '#3a8f62', birch: '#b5e08f', poplar: '#9bd67f', apple: '#a6dc8c' },
  summer: { oak: '#4caf6a', pine: '#2f7d55', birch: '#7cc46a', poplar: '#3f9a5a', apple: '#5cb85c' },
}

/** Leaf colour of a tree, or null when it stands bare (leafy trees in winter). */
function crown(kind: Exclude<Kind, 'house' | 'lamp'>, i: number): string | null {
  const season = props.season
  if (kind === 'pine') return season === 'spring' || season === 'summer' ? CROWNS[season].pine : '#2b6e4b'
  if (season === 'winter') return null
  if (season === 'autumn') return AUTUMN[i % AUTUMN.length]
  return CROWNS[season][kind]
}

/**
 * The river's centre line from its source on the far hill to the lake: x, y and width. It widens and
 * its bends grow toward the viewer (perspective); the last point lies inside the lake, which covers it.
 */
const RIVER_COURSE: [number, number, number][] = [
  [1121, 98, 2],
  [1119, 125, 3.5],
  [1124, 158, 5.5],
  [1116, 195, 8],
  [1128, 240, 12],
  [1110, 285, 17],
  [1120, 318, 22],
  [1094, 350, 28],
]

/** A smooth curve through the points (Catmull-Rom as cubic Béziers), starting with `start`. */
function smoothPath(pts: [number, number][], start: 'M' | 'L'): string {
  let d = `${start}${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const [p0, p1, p2, p3] = [pts[i - 1] ?? pts[i], pts[i], pts[i + 1], pts[i + 2] ?? pts[i + 1]]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`
  }
  return d
}

/** The course moved sideways by `k` × width (−0.5 and 0.5 are the banks). */
function offsetCourse(k: number, from = 0, to = RIVER_COURSE.length): [number, number][] {
  return RIVER_COURSE.map(([x, y, w], i): [number, number] => {
    const [ax, ay] = RIVER_COURSE[Math.max(0, i - 1)]
    const [bx, by] = RIVER_COURSE[Math.min(RIVER_COURSE.length - 1, i + 1)]
    const len = Math.hypot(bx - ax, by - ay)
    // Unit normal of the course direction.
    return [x + (-(by - ay) / len) * w * k, y + ((bx - ax) / len) * w * k]
  }).slice(from, to)
}

/** The river as one tapering shape: down the left bank, back up the right one. */
const RIVER = `${smoothPath(offsetCourse(-0.5), 'M')}${smoothPath(offsetCourse(0.5).reverse(), 'L')}Z`
/** Two thin glints off the centre where the river is wide enough; they run downstream. */
const RIVER_GLINTS = [smoothPath(offsetCourse(-0.18, 3, 8), 'M'), smoothPath(offsetCourse(0.2, 4, 8), 'M')]

/** The lake on the front hill, right of the house so phones show it with the river. */
const LAKE = { cx: 1040, cy: 358, rx: 92, ry: 22 }
const inLake = (x: number, y: number) =>
  ((x - LAKE.cx) / (LAKE.rx + 20)) ** 2 + ((y - LAKE.cy) / (LAKE.ry + 12)) ** 2 < 1 || (x > 1075 && x < 1150 && y < 350)

/** Water, its glints and its darker banks per season (winter: ice). */
const WATER: Record<Season, { water: string; light: string; edge: string }> = {
  spring: { water: '#5bb8e0', light: '#c6ecf8', edge: '#3f9fcc' },
  summer: { water: '#4fb0dc', light: '#c6ecf8', edge: '#3897c8' },
  autumn: { water: '#4b9cc2', light: '#a9d6ea', edge: '#3a83a8' },
  winter: { water: '#bcdcee', light: '#ffffff', edge: '#9cc3da' },
}
const water = computed(() => WATER[props.season])
const frozen = computed(() => props.season === 'winter')

const RIPPLES = [
  { x: 1005, y: 356, delay: 0 },
  { x: 1077, y: 364, delay: -1.4 },
  { x: 1033, y: 368, delay: -2.6 },
]
const LILIES = [
  { x: 977, y: 360, r: 6 },
  { x: 991, y: 368, r: 4.5 },
  { x: 1095, y: 356, r: 5 },
]
const REEDS = [
  { x: 955, y: 356, h: 24 },
  { x: 962, y: 362, h: 30 },
  { x: 969, y: 366, h: 21 },
  { x: 1123, y: 370, h: 26 },
  { x: 1130, y: 364, h: 20 },
]
/** Mother duck, then the ducklings following her. */
const DUCKS = [
  { dx: 0, s: 1, body: '#a07850', head: '#2e8b57' },
  { dx: -17, s: 0.55, body: '#ffd23f', head: '#ffd23f' },
  { dx: -29, s: 0.55, body: '#ffd23f', head: '#ffd23f' },
]

/** Far trees, then the middle hill hides their feet; the house stands among the middle trees. */
const layers = computed(() =>
  [
    { hill: FAR_HILL, fill: HILLS[props.season].far, items: FAR_TREES, road: null },
    { hill: MID_HILL, fill: HILLS[props.season].mid, items: MID_TREES, road: ROAD },
  ].map((layer, l) => ({
    ...layer,
    items: layer.items.map((t, i) => ({
      ...t,
      crown: t.kind === 'house' || t.kind === 'lamp' ? null : crown(t.kind, i + l * 3),
      paint: HOUSE_LOOKS[t.look ?? 0],
    })),
  })),
)

/** Bare branches of leafy trees in winter, drawn from the trunk base (0, 0). */
const BARE: Record<'oak' | 'apple' | 'birch' | 'poplar', string> = {
  oak: 'M0 4V-42M0-22L-20-44M-12-35L-24-38M0-30L18-52M10-41L24-44M0-42L-8-62M0-42L9-60',
  apple: 'M0 4V-34M0-18L-16-36M0-24L15-42M0-34L-6-50M0-34L7-48',
  birch: 'M0-40L-14-62M0-52L13-74M0-66L-7-84',
  poplar: 'M0 4V-86M0-30L-9-62M0-44L9-76M0-60L-5-88',
}
/** Fruit (summer, autumn) or blossom (spring) spots on an apple tree's crown. */
const APPLE_SPOTS = [
  [-12, -44],
  [8, -50],
  [15, -30],
  [-15, -28],
  [3, -34],
  [-3, -58],
  [12, -42],
]
const BIRCH_MARKS = [
  [-3.5, -46, 4],
  [0, -34, 3.5],
  [-3.5, -22, 3],
  [0, -10, 3.5],
  [-3.5, -64, 3],
  [0, -74, 3],
]

/** Flowers along the front hill, nearer (lower) ones drawn last. */
const PETALS = Array.from({ length: 5 }, (_, k) => {
  const a = (k * 2 * Math.PI) / 5 - Math.PI / 2
  return { cx: 3.6 * Math.cos(a), cy: 3.6 * Math.sin(a) }
})
const FLOWER_KINDS = ['dot', 'daisy', 'tulip', 'dot', 'daisy', 'tulip', 'dot'] as const
const ground = Array.from({ length: 140 }, (_, i) => {
  const x = ((i + 0.5) * 1600) / 140 + (((i * 37) % 10) - 5)
  const top = frontY(x) + 10
  return { i, x, y: top + ((i * 53) % Math.max(1, 392 - top)), kind: FLOWER_KINDS[i % FLOWER_KINDS.length] }
})
  .filter((g) => !inLake(g.x, g.y))
  .sort((a, b) => a.y - b.y)

const FLOWER_COLORS: Record<'spring' | 'summer', { tulip: string[]; petal: string[]; center: string; dot: string[] }> = {
  spring: {
    tulip: ['#ff6b8a', '#ffd23f', '#b07cff', '#ff9ec4'],
    petal: ['#ffffff', '#ffd1e0'],
    center: '#ffd23f',
    dot: ['#ffffff', '#ffd1e0', '#ffe680', '#c9b5ff'],
  },
  summer: {
    tulip: ['#e5484d', '#ffb02e', '#ff6b8a'],
    petal: ['#ffffff'],
    center: '#ffb02e',
    dot: ['#ff6b8a', '#ffd23f', '#ffffff', '#b07cff', '#5b8def'],
  },
}
const flowerColors = computed(() =>
  props.season === 'spring' || props.season === 'summer' ? FLOWER_COLORS[props.season] : null,
)
const pick = (list: string[], i: number) => list[i % list.length]

/** Butterflies over the front hill: spring shows the first three; `alt` flies the other loop. */
const BUTTERFLIES = [
  { x: 520, y: 268, c: '#ffb02e', dur: 13, delay: 0, alt: false },
  { x: 780, y: 276, c: '#b07cff', dur: 16, delay: -5, alt: true },
  { x: 1080, y: 286, c: '#ff6b8a', dur: 14, delay: -9, alt: false },
  { x: 300, y: 258, c: '#5b8def', dur: 15, delay: -3, alt: true },
  { x: 1360, y: 280, c: '#ffd23f', dur: 12, delay: -7, alt: false },
]
const SPRING_WINGS = ['#ffd1e0', '#fff4a8', '#c9e8ff']
const butterflies = computed(() =>
  props.season === 'summer'
    ? BUTTERFLIES
    : props.season === 'spring'
      ? BUTTERFLIES.slice(0, 3).map((b, i) => ({ ...b, c: SPRING_WINGS[i] }))
      : [],
)
/** Twinkling spots on the winter snow. */
const SPARKLES = ground.filter((g) => g.i % 9 === 0)
const SPARKLE = 'M0-4.5L1.1-1.1L4.5 0L1.1 1.1L0 4.5L-1.1 1.1L-4.5 0L-1.1-1.1Z'

const PUMPKINS = [
  { x: 690, y: 302, s: 1 },
  { x: 722, y: 306, s: 0.75 },
  { x: 1300, y: 338, s: 1.1 },
]

/** Animals stand on their feet at (x, y); `delay` shifts each one's animation. */
const RABBITS = [
  { x: 500, y: 290, s: 1, delay: 0 },
  { x: 1240, y: 333, s: 0.9, delay: -3.5 },
]
const GOAT = { x: 800, y: 310, s: 1 }
const SHEEP = { x: 900, y: 320, s: 1.05 }
/** Two houses in different colours; the second is mirrored (chimney on the left). */
const HOUSE_LOOKS = [
  {
    wall: '#f6e7c8', base: '#d9c29a', roof: '#c8553d', tiles: '#a9432f', edge: '#8f3a29',
    shutter: '#4f8f6a', chimney: '#9a4a3a', chimneyCap: '#7f3b2e', mirror: false,
  },
  {
    wall: '#dcecf7', base: '#b9c9d6', roof: '#4f6fa8', tiles: '#3f5d93', edge: '#33497a',
    shutter: '#d9734a', chimney: '#8a8f99', chimneyCap: '#6b707a', mirror: true,
  },
]
const HOUSES = MID_TREES.filter((t) => t.kind === 'house')
const LAMPS = MID_TREES.filter((t) => t.kind === 'lamp')
/** Dirt road between the two houses' doors; the lamps stand along it. */
const ROAD = 'M725 239Q870 262 1010 251'
const ROAD_COLORS: Record<Season, string> = { spring: '#e3cf9f', summer: '#e3cf9f', autumn: '#d4b47a', winter: '#cfd9e2' }

/** A house's windows and round attic window, relative to its foot (the day and the night layer share them). */
const HOUSE_WINDOWS = [
  { x: -36, y: -44, w: 18, h: 18 },
  { x: 18, y: -44, w: 18, h: 18 },
]
const ATTIC = { cx: 0, cy: -68, r: 5.5 }
const windowBars = (w: { x: number; y: number; w: number; h: number }) =>
  `M${w.x + w.w / 2} ${w.y}V${w.y + w.h}M${w.x} ${w.y + w.h / 2}H${w.x + w.w}`
const atticBars = `M${ATTIC.cx} ${ATTIC.cy - ATTIC.r}V${ATTIC.cy + ATTIC.r}M${ATTIC.cx - ATTIC.r} ${ATTIC.cy}H${ATTIC.cx + ATTIC.r}`
const BOX_FLOWERS: Record<Exclude<Season, 'winter'>, string[]> = {
  spring: ['#ff9ec4', '#ffffff', '#ffd23f', '#ff9ec4'],
  summer: ['#e5484d', '#ffd23f', '#ff6b8a', '#e5484d'],
  autumn: ['#e98a2e', '#d9542b', '#f2c14e', '#e98a2e'],
}

/** Hen and chick left of the house, on the middle hill. */
const HENS = [
  { x: 922, y: 255, s: 1.15, color: '#ffffff', comb: true, delay: 0 },
  { x: 940, y: 256, s: 0.65, color: '#ffd23f', comb: false, delay: -0.6 },
]
const rabbitColor = computed(() => (props.season === 'winter' ? '#f7f7f7' : '#b08a6a'))
</script>

<template>
  <!-- Night: the house's windows glow (warm glass and a soft halo that flickers a little). -->
  <g v-if="lights">
  <g
    v-for="h in HOUSES"
    :key="h.x"
    :transform="`translate(${h.x} ${h.y}) scale(${HOUSE_LOOKS[h.look ?? 0].mirror ? -h.s : h.s} ${h.s})`"
  >
    <g class="lamp-glow">
      <rect
        v-for="w in HOUSE_WINDOWS"
        :key="`halo${w.x}`"
        :x="w.x - 7"
        :y="w.y - 7"
        :width="w.w + 14"
        :height="w.h + 14"
        rx="8"
        fill="#ffcf5a"
        fill-opacity="0.22"
      />
      <circle :cx="ATTIC.cx" :cy="ATTIC.cy" :r="ATTIC.r + 7" fill="#ffcf5a" fill-opacity="0.22" />
    </g>
    <g v-for="w in HOUSE_WINDOWS" :key="w.x">
      <rect :x="w.x" :y="w.y" :width="w.w" :height="w.h" fill="#ffd86b" />
      <path :d="windowBars(w)" stroke="#9a6a2a" stroke-width="1.6" />
    </g>
    <circle :cx="ATTIC.cx" :cy="ATTIC.cy" :r="ATTIC.r" fill="#ffd86b" />
    <path :d="atticBars" stroke="#9a6a2a" stroke-width="1.5" />
  </g>
  <!-- Street lamps: a pool of light on the road, a halo and the bright lantern. -->
  <g v-for="(l, k) in LAMPS" :key="l.x" :transform="`translate(${l.x} ${l.y}) scale(${l.s})`">
    <g class="lamp-glow" :style="{ animationDelay: `${-k * 0.8}s` }">
      <ellipse cy="-1" rx="18" ry="4" fill="#ffcf5a" fill-opacity="0.2" />
      <circle cy="-46" r="16" fill="#ffcf5a" fill-opacity="0.22" />
    </g>
    <path d="M-5-50H5L3.5-42H-3.5Z" fill="#ffe08a" />
  </g>
  </g>

  <g v-else :class="season">
    <template v-for="(layer, l) in layers" :key="l">
      <path :d="layer.hill" :fill="layer.fill" />
      <path v-if="layer.road" :d="layer.road" fill="none" :stroke="ROAD_COLORS[season]" stroke-width="7" stroke-linecap="round" />
      <g v-for="(t, i) in layer.items" :key="t.x" :transform="`translate(${t.x} ${t.y}) scale(${t.s})`">
        <!-- Trees sway around their foot; the house stands still. Phase and speed vary per tree. -->
        <g
          :class="{ sway: !BUILT.includes(t.kind) }"
          :style="{
            animationDelay: `${-((i * 1.7) % 5)}s`,
            animationDuration: `${season === 'autumn' ? 2.6 : 4 + ((i * 3) % 3)}s`,
          }"
        >
        <!-- The house: chimney (smoking in winter), tiled roof, round attic window, two windows with
             shutters and flower boxes, an arched door. At night HOUSE_LIGHTS light its windows. -->
        <g v-if="t.kind === 'house'" :transform="t.paint.mirror ? 'scale(-1 1)' : undefined">
          <rect x="22" y="-100" width="12" height="30" :fill="t.paint.chimney" />
          <rect x="20" y="-104" width="16" height="5" rx="1" :fill="t.paint.chimneyCap" />
          <circle
            v-for="k in season === 'winter' ? 3 : 0"
            :key="k"
            class="smoke"
            cx="28"
            cy="-110"
            r="5"
            fill="#b9c6d1"
            :style="{ animationDelay: `${-k * 1.3}s` }"
          />
          <rect x="-44" y="-54" width="88" height="54" :fill="t.paint.wall" />
          <rect x="30" y="-54" width="14" height="54" fill="#000" fill-opacity="0.05" />
          <rect x="-44" y="-8" width="88" height="8" :fill="t.paint.base" />
          <path d="M-54-50L0-96L54-50Z" :fill="t.paint.roof" />
          <path d="M-42-60H42M-30-70H30M-18-80H18" :stroke="t.paint.tiles" stroke-width="2" stroke-linecap="round" />
          <path d="M-58-48L0-98L58-48" fill="none" :stroke="t.paint.edge" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
          <path v-if="season === 'winter'" d="M-60-47L0-100L60-47L53-44L0-90L-53-44Z" fill="#fff" />
          <circle :cx="ATTIC.cx" :cy="ATTIC.cy" :r="ATTIC.r + 2.5" fill="#fff" />
          <circle :cx="ATTIC.cx" :cy="ATTIC.cy" :r="ATTIC.r" fill="#9fd3ee" />
          <path :d="atticBars" stroke="#fff" stroke-width="1.5" />
          <g v-for="w in HOUSE_WINDOWS" :key="w.x">
            <rect :x="w.x - 6" :y="w.y" width="5" :height="w.h" rx="1" :fill="t.paint.shutter" />
            <rect :x="w.x + w.w + 1" :y="w.y" width="5" :height="w.h" rx="1" :fill="t.paint.shutter" />
            <rect :x="w.x - 1.5" :y="w.y - 1.5" :width="w.w + 3" :height="w.h + 3" rx="2" fill="#fff" />
            <rect :x="w.x" :y="w.y" :width="w.w" :height="w.h" fill="#9fd3ee" />
            <path :d="`M${w.x + 3} ${w.y + w.h - 4}L${w.x + w.w - 7} ${w.y + 3}`" stroke="#fff" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" />
            <path :d="windowBars(w)" stroke="#fff" stroke-width="1.6" />
            <rect :x="w.x - 3" :y="w.y + w.h + 2" :width="w.w + 6" height="5" rx="1" fill="#8a5a3b" />
            <rect v-if="season === 'winter'" :x="w.x - 3.5" :y="w.y + w.h" :width="w.w + 7" height="3.5" rx="1.75" fill="#fff" />
            <template v-else>
              <circle
                v-for="(c, k) in BOX_FLOWERS[season]"
                :key="k"
                :cx="w.x + 1 + k * 5.3"
                :cy="w.y + w.h + 1.5"
                r="2.3"
                :fill="c"
              />
            </template>
          </g>
          <rect x="-15" y="-2" width="30" height="3" rx="1" fill="#b7a07a" />
          <path d="M-10-1V-26A10 10 0 0 1 10-26V-1Z" fill="#8a5a3b" stroke="#6e4329" stroke-width="2" />
          <path d="M-5-4V-24M5-4V-24" stroke="#6e4329" stroke-width="1.2" stroke-linecap="round" />
          <circle cx="6.5" cy="-14" r="1.4" fill="#f2c14e" />
        </g>

        <!-- Street lamp by the road: a post and a lantern (lit at night by the lights layer). -->
        <g v-else-if="t.kind === 'lamp'">
          <rect x="-5" y="-3" width="10" height="3" rx="1" fill="#3d4752" />
          <rect x="-1.6" y="-40" width="3.2" height="38" fill="#3d4752" />
          <rect x="-3.5" y="-42" width="7" height="2.5" rx="1" fill="#3d4752" />
          <path d="M-5-50H5L3.5-42H-3.5Z" fill="#fff4c2" stroke="#3d4752" stroke-width="1.2" />
          <path d="M-7-50H7L0-56Z" fill="#3d4752" />
          <ellipse v-if="season === 'winter'" cy="-55" rx="5" ry="2" fill="#fff" />
        </g>

        <g v-else-if="t.kind === 'pine'">
          <rect x="-4" y="-12" width="8" height="14" fill="#7a4e33" />
          <path d="M0-80L-20-46H20ZM0-62L-26-26H26ZM0-42L-30-8H30Z" :fill="t.crown!" />
          <path
            v-if="season === 'winter'"
            d="M0-80L-8.8-65Q0-61 8.8-65ZM0-62L-10.1-48Q0-44 10.1-48ZM0-42L-11.5-29Q0-25 11.5-29Z"
            fill="#fff"
          />
        </g>

        <!-- Winter: bare branches with a line of snow on top. -->
        <g v-else-if="!t.crown">
          <template v-if="t.kind === 'birch'">
            <rect x="-3.5" y="-84" width="7" height="88" fill="#f2efe6" />
            <rect v-for="(m, k) in BIRCH_MARKS" :key="k" :x="m[0]" :y="m[1]" :width="m[2]" height="2" fill="#3b3b3b" />
          </template>
          <path :d="BARE[t.kind]" fill="none" :stroke="t.kind === 'birch' ? '#8a8378' : '#7a5236'" :stroke-width="t.kind === 'birch' ? 2.5 : 4" stroke-linecap="round" />
          <path :d="BARE[t.kind]" transform="translate(0 -2)" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" />
        </g>

        <g v-else-if="t.kind === 'oak'">
          <rect x="-5" y="-26" width="10" height="30" fill="#8a5a3b" />
          <circle cy="-50" r="26" :fill="t.crown" />
          <circle cx="-17" cy="-36" r="18" :fill="t.crown" />
          <circle cx="17" cy="-36" r="18" :fill="t.crown" />
          <circle cx="-9" cy="-58" r="8" fill="#fff" fill-opacity="0.18" />
        </g>

        <g v-else-if="t.kind === 'apple'">
          <rect x="-4" y="-22" width="8" height="26" fill="#8a5a3b" />
          <circle cy="-44" r="22" :fill="t.crown" />
          <circle cx="-14" cy="-32" r="15" :fill="t.crown" />
          <circle cx="14" cy="-32" r="15" :fill="t.crown" />
          <circle
            v-for="(p, k) in APPLE_SPOTS"
            :key="k"
            :cx="p[0]"
            :cy="p[1]"
            :r="season === 'spring' ? 3.2 : 3.6"
            :fill="season === 'spring' ? (k % 2 ? '#ffd1e0' : '#fff') : '#e5484d'"
          />
        </g>

        <g v-else-if="t.kind === 'birch'">
          <rect x="-3.5" y="-56" width="7" height="60" fill="#f2efe6" />
          <rect v-for="(m, k) in BIRCH_MARKS.slice(0, 4)" :key="k" :x="m[0]" :y="m[1]" :width="m[2]" height="2" fill="#3b3b3b" />
          <ellipse cy="-64" rx="20" ry="26" :fill="t.crown" />
          <ellipse cx="-7" cy="-72" rx="5" ry="8" fill="#fff" fill-opacity="0.2" />
        </g>

        <g v-else>
          <rect x="-3" y="-16" width="6" height="20" fill="#7a4e33" />
          <ellipse cy="-54" rx="14" ry="42" :fill="t.crown" />
          <ellipse cx="-5" cy="-66" rx="4" ry="10" fill="#fff" fill-opacity="0.18" />
        </g>
        </g>
      </g>
    </template>

    <!-- Hen and chick pecking by the house. -->
    <g v-for="(h, k) in HENS" :key="`hen${k}`" :transform="`translate(${h.x} ${h.y}) scale(${h.s})`">
      <g class="peck" :style="{ animationDelay: `${h.delay}s` }">
        <path d="M-1 0V-4M3 0V-4" stroke="#f08a24" stroke-width="1.6" stroke-linecap="round" />
        <path d="M-8-10L-13-17L-9-8Z" :fill="h.color" stroke="#d9d4cc" stroke-width="0.6" />
        <ellipse cy="-9" rx="8.5" ry="6.5" :fill="h.color" stroke="#d9d4cc" stroke-width="0.6" />
        <ellipse cx="-1" cy="-9" rx="4.5" ry="3" fill="#000" fill-opacity="0.08" />
        <circle cx="7" cy="-15" r="4.2" :fill="h.color" stroke="#d9d4cc" stroke-width="0.6" />
        <path v-if="h.comb" d="M5-19q1-3 2.5-1q1-3 2.5 0q1.5 1 0 2.5Z" fill="#e5484d" />
        <path d="M10.8-15.5l3.4 1.2-3.4 1.2Z" fill="#f08a24" />
        <circle cx="8.3" cy="-16" r="0.9" fill="#23302b" />
      </g>
    </g>

    <path :d="FRONT_HILL" :fill="HILLS[season].front" />

    <!-- The lake's shore, the river (over the hills: nothing of theirs stands on its course) and the lake. -->
    <ellipse :cx="LAKE.cx" :cy="LAKE.cy + 2" :rx="LAKE.rx + 8" :ry="LAKE.ry + 6" fill="#000" fill-opacity="0.08" />
    <path :d="RIVER" :fill="water.water" :stroke="water.edge" stroke-width="1.5" stroke-linejoin="round" />
    <!-- Glints: running downstream, or still on the winter ice. -->
    <path
      v-for="(g, k) in RIVER_GLINTS"
      :key="`glint${k}`"
      :class="{ flow: !frozen }"
      :d="g"
      fill="none"
      :stroke="water.light"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-opacity="0.8"
      :stroke-dasharray="k ? '6 16 8 10' : '10 14 4 12'"
      :style="{ animationDelay: `${-k * 0.9}s` }"
    />
    <ellipse :cx="LAKE.cx" :cy="LAKE.cy" :rx="LAKE.rx" :ry="LAKE.ry" :fill="water.water" />
    <ellipse :cx="LAKE.cx + 20" :cy="LAKE.cy - 8" :rx="LAKE.rx * 0.5" :ry="4" :fill="water.light" fill-opacity="0.45" />
    <template v-if="frozen">
      <path d="M975 352l26-6M1025 368l34-8M1075 350l22-5" stroke="#fff" stroke-width="2.5" stroke-linecap="round" />
    </template>
    <template v-else>
      <ellipse
        v-for="(r, k) in RIPPLES"
        :key="`ripple${k}`"
        class="ripple"
        :cx="r.x"
        :cy="r.y"
        rx="14"
        ry="3.5"
        fill="none"
        :stroke="water.light"
        stroke-width="1.5"
        :style="{ animationDelay: `${r.delay}s` }"
      />
      <g v-for="(l, k) in LILIES" :key="`lily${k}`" :transform="`translate(${l.x} ${l.y})`">
        <path :d="`M0 0L${l.r} -1.5A${l.r} ${l.r * 0.5} 0 1 1 ${l.r} 1.5Z`" fill="#4caf6a" />
        <circle v-if="season === 'summer' && k !== 1" cx="-1" cy="-1.5" r="2.2" fill="#ff9ec4" />
      </g>
      <!-- Duck family: swims across, turns and swims back, bobbing on the water. -->
      <g :transform="`translate(995 ${LAKE.cy + 2})`">
        <g class="swim">
          <g v-for="(d, k) in DUCKS" :key="`duck${k}`" :transform="`translate(${d.dx} 0) scale(${d.s})`">
            <g class="bob" :style="{ animationDelay: `${-k * 0.3}s` }">
              <path d="M-11 0Q-12-9 1-8Q9-8 11-2L11 0Z" :fill="d.body" />
              <path d="M-11-3L-15-8L-9-6Z" :fill="d.body" />
              <circle cx="8" cy="-12" r="4.6" :fill="d.head" />
              <path d="M12-12.5l5 1.5-5 1.5Z" fill="#f0a020" />
              <circle cx="9.3" cy="-13" r="0.9" fill="#23302b" />
            </g>
          </g>
        </g>
      </g>
    </template>
    <g v-for="(r, k) in REEDS" :key="`reed${k}`" :transform="`translate(${r.x} ${r.y})`">
      <g class="nod" :style="{ animationDelay: `${-k * 0.5}s` }">
        <path :d="`M0 0V${-r.h}`" :stroke="season === 'autumn' || frozen ? '#b39a5a' : '#4a8f45'" stroke-width="2" />
        <rect x="-2.2" :y="-r.h * 0.85" width="4.4" height="9" rx="2.2" fill="#7a4e33" />
      </g>
    </g>

    <template v-if="flowerColors">
      <g v-for="f in ground" :key="f.i" :transform="`translate(${f.x} ${f.y})`">
        <circle v-if="f.kind === 'dot'" r="4" :fill="pick(flowerColors.dot, f.i)" />
        <g v-else-if="f.kind === 'daisy'" class="nod" :style="{ animationDelay: `${-(f.i % 7) * 0.4}s` }">
          <circle v-for="(p, k) in PETALS" :key="k" :cx="p.cx" :cy="p.cy" r="3" :fill="pick(flowerColors.petal, f.i)" />
          <circle r="2.4" :fill="flowerColors.center" />
        </g>
        <g v-else class="nod" :style="{ animationDelay: `${-(f.i % 7) * 0.4}s` }">
          <path d="M0 0V9" stroke="#3f8f4a" stroke-width="1.6" />
          <path d="M-5-6Q-6 3 0 3Q6 3 5-6L2.5-3L0-7L-2.5-3Z" :fill="pick(flowerColors.tulip, f.i)" />
        </g>
      </g>
    </template>

    <template v-else-if="season === 'autumn'">
      <ellipse
        v-for="f in ground.filter((g) => g.i % 2 === 0)"
        :key="f.i"
        :cx="f.x"
        :cy="f.y"
        rx="6"
        ry="2.6"
        :fill="AUTUMN[f.i % AUTUMN.length]"
        :transform="`rotate(${((f.i * 47) % 70) - 35} ${f.x} ${f.y})`"
      />
      <g v-for="(p, k) in PUMPKINS" :key="k" :transform="`translate(${p.x} ${p.y}) scale(${p.s})`">
        <rect x="-2" y="-24" width="4" height="7" rx="1.5" fill="#5f7d2f" />
        <ellipse cy="-10" rx="15" ry="11" fill="#f08a24" />
        <ellipse cy="-10" rx="6" ry="11" fill="#e07a1a" />
        <ellipse cx="-6" cy="-14" rx="3" ry="4" fill="#fff" fill-opacity="0.25" />
      </g>
    </template>

    <template v-else>
      <path
        v-for="(g, k) in SPARKLES"
        :key="g.i"
        class="sparkle"
        :d="SPARKLE"
        :transform="`translate(${g.x} ${g.y})`"
        fill="#fff"
        :style="{ animationDelay: `${-((k * 0.7) % 3)}s` }"
      />
    </template>

    <!-- Winter: a snowman on the front hill, in the middle so phones show it too. -->
    <g v-if="season === 'winter'" transform="translate(640 300)">
      <ellipse cy="2" rx="30" ry="6" fill="#c9d8e4" />
      <circle cy="-20" r="22" fill="#fff" />
      <circle cy="-52" r="16" fill="#fff" />
      <circle cy="-77" r="11" fill="#fff" />
      <path d="M-14-56L-36-70M14-56L36-72M-30-66L-34-76M30-68L36-78" stroke="#7a5236" stroke-width="3" stroke-linecap="round" />
      <path d="M-13-66Q0-60 13-66" fill="none" stroke="#e5484d" stroke-width="6" stroke-linecap="round" />
      <path d="M7-66l4 12" stroke="#e5484d" stroke-width="5" stroke-linecap="round" />
      <path d="M0-76L14-73L0-72Z" fill="#f08a24" />
      <circle cx="-4" cy="-80" r="1.8" fill="#23302b" />
      <circle cx="4" cy="-80" r="1.8" fill="#23302b" />
      <circle cy="-50" r="1.8" fill="#23302b" />
      <circle cy="-42" r="1.8" fill="#23302b" />
      <rect x="-10" y="-96" width="20" height="10" rx="2" fill="#3d5a66" />
      <rect x="-14" y="-88" width="28" height="4" rx="2" fill="#3d5a66" />
    </g>

    <!-- Rabbits hop a few steps, sit, turn and hop back. -->
    <g v-for="(r, k) in RABBITS" :key="`rabbit${k}`" :transform="`translate(${r.x} ${r.y}) scale(${r.s})`">
      <g class="hop" :style="{ animationDelay: `${r.delay}s` }">
        <ellipse cx="4" cy="-1.5" rx="6" ry="2" :fill="rabbitColor" />
        <ellipse cy="-9" rx="11" ry="8" :fill="rabbitColor" />
        <circle cx="-11" cy="-11" r="3.6" fill="#fff" />
        <ellipse cx="7.5" cy="-27" rx="2.5" ry="7.5" :fill="rabbitColor" transform="rotate(-12 7.5 -27)" />
        <ellipse cx="12" cy="-27" rx="2.5" ry="7.5" :fill="rabbitColor" transform="rotate(10 12 -27)" />
        <ellipse cx="12" cy="-27" rx="1.1" ry="5" fill="#ffb3c4" transform="rotate(10 12 -27)" />
        <circle cx="10" cy="-17" r="6.2" :fill="rabbitColor" />
        <circle cx="12.6" cy="-18.2" r="1.2" fill="#23302b" />
        <circle cx="16" cy="-16.2" r="1.1" fill="#ff8fa8" />
      </g>
    </g>

    <!-- Goat: the head and neck bend down to the grass and back. -->
    <g :transform="`translate(${GOAT.x} ${GOAT.y}) scale(${GOAT.s})`">
      <g fill="#8a7a6a">
        <rect x="-13" y="-13" width="3.4" height="13" rx="1.5" />
        <rect x="-7" y="-13" width="3.4" height="13" rx="1.5" />
        <rect x="7" y="-13" width="3.4" height="13" rx="1.5" />
        <rect x="12.5" y="-13" width="3.4" height="13" rx="1.5" />
      </g>
      <path d="M-17-20l-4-7 6 3Z" fill="#e6dfd3" />
      <ellipse cy="-19" rx="18" ry="9.5" fill="#f3eee6" />
      <ellipse cx="-4" cy="-21" rx="7" ry="5" fill="#d9cbb5" />
      <g class="graze">
        <path d="M12-22L19-33" stroke="#f3eee6" stroke-width="8" stroke-linecap="round" />
        <path d="M19-38q-1-8 6-11" fill="none" stroke="#a08060" stroke-width="2.4" stroke-linecap="round" />
        <ellipse cx="22.5" cy="-35" rx="7.5" ry="5.2" fill="#f3eee6" transform="rotate(28 22.5 -35)" />
        <ellipse cx="16" cy="-36" rx="4" ry="1.8" fill="#e6dfd3" transform="rotate(-25 16 -36)" />
        <path d="M26-30l1.5 6-4-4Z" fill="#d9cbb5" />
        <circle cx="23" cy="-37" r="1.1" fill="#23302b" />
      </g>
    </g>

    <!-- Sheep: a woolly cloud that nods its head. -->
    <g :transform="`translate(${SHEEP.x} ${SHEEP.y}) scale(${SHEEP.s})`">
      <g fill="#4a4a4a">
        <rect x="-9" y="-12" width="3.2" height="12" rx="1.4" />
        <rect x="-3.5" y="-12" width="3.2" height="12" rx="1.4" />
        <rect x="4" y="-12" width="3.2" height="12" rx="1.4" />
        <rect x="9.5" y="-12" width="3.2" height="12" rx="1.4" />
      </g>
      <g fill="#fbfbfb" stroke="#d7dade" stroke-width="1">
        <circle cx="-10" cy="-19" r="8" />
        <circle cx="10" cy="-19" r="8" />
        <circle cx="-4" cy="-13" r="8" />
        <circle cx="5" cy="-13" r="8" />
        <circle cy="-23" r="9.5" />
      </g>
      <g class="nod-head">
        <ellipse cx="18" cy="-20" rx="5.6" ry="7.2" fill="#4a4a4a" transform="rotate(-25 18 -20)" />
        <ellipse cx="13" cy="-23" rx="3.6" ry="1.8" fill="#4a4a4a" transform="rotate(-20 13 -23)" />
        <circle cx="16" cy="-27" r="3.4" fill="#fbfbfb" />
        <circle cx="20" cy="-21.5" r="1.1" fill="#fff" />
      </g>
    </g>

    <!-- Butterflies: placed by the outer group, wandering by the middle one, flapping by the inner one. -->
    <g v-for="(b, k) in butterflies" :key="k" :transform="`translate(${b.x} ${b.y})`">
      <g
        class="flight"
        :class="{ alt: b.alt }"
        :style="{ animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }"
      >
        <g class="wings" :style="{ animationDelay: `${-k * 0.07}s` }">
          <ellipse cx="-4.5" cy="-2.5" rx="4.8" ry="3.8" :fill="b.c" />
          <ellipse cx="4.5" cy="-2.5" rx="4.8" ry="3.8" :fill="b.c" />
          <ellipse cx="-3.5" cy="2.5" rx="3.2" ry="2.6" :fill="b.c" />
          <ellipse cx="3.5" cy="2.5" rx="3.2" ry="2.6" :fill="b.c" />
        </g>
        <rect x="-0.9" y="-5" width="1.8" height="10" rx="0.9" fill="#3d3d3d" />
      </g>
    </g>
  </g>
</template>

<style scoped>
/* Trees and flowers turn around their foot: fill-box makes the origin the element's own box. */
.sway,
.nod,
.wings,
.sparkle {
  transform-box: fill-box;
}

.sway {
  transform-origin: 50% 100%;
  animation: sway ease-in-out infinite alternate;
}

@keyframes sway {
  from {
    transform: rotate(-1.2deg);
  }
  to {
    transform: rotate(1.2deg);
  }
}

/* Autumn wind: the trees bend further (and faster, see the template), mostly one way. */
.autumn .sway {
  animation-name: wind;
}

@keyframes wind {
  from {
    transform: rotate(-0.5deg);
  }
  to {
    transform: rotate(3.2deg);
  }
}

/* Bare winter trees barely move. */
.winter .sway {
  animation-name: sway-small;
}

@keyframes sway-small {
  from {
    transform: rotate(-0.5deg);
  }
  to {
    transform: rotate(0.5deg);
  }
}

.nod {
  transform-origin: 50% 100%;
  animation: nod 2.8s ease-in-out infinite alternate;
}

@keyframes nod {
  from {
    transform: rotate(-7deg);
  }
  to {
    transform: rotate(7deg);
  }
}

.flight {
  animation: flight-a linear infinite;
}

.flight.alt {
  animation-name: flight-b;
}

@keyframes flight-a {
  0%,
  100% {
    transform: translate(0, 0);
  }
  20% {
    transform: translate(36px, -26px);
  }
  45% {
    transform: translate(84px, -8px);
  }
  70% {
    transform: translate(44px, -44px);
  }
  85% {
    transform: translate(10px, -20px);
  }
}

@keyframes flight-b {
  0%,
  100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-40px, -30px);
  }
  50% {
    transform: translate(-90px, -6px);
  }
  75% {
    transform: translate(-36px, -48px);
  }
}

.wings {
  transform-origin: 50% 50%;
  animation: flap 0.22s ease-in-out infinite alternate;
}

@keyframes flap {
  to {
    transform: scaleX(0.25);
  }
}

.smoke {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  opacity: 0;
  animation: smoke 3.9s ease-out infinite;
}

@keyframes smoke {
  0% {
    opacity: 0.85;
    transform: translate(0, 0) scale(0.6);
  }
  100% {
    opacity: 0;
    transform: translate(-14px, -44px) scale(1.8);
  }
}

.sparkle {
  transform-origin: 50% 50%;
  animation: twinkle 3s ease-in-out infinite;
}

/* Water: glints run downstream (dash patterns are 40 long); rings spread and fade on the lake. */
.flow {
  animation: flow 2.4s linear infinite;
}

@keyframes flow {
  from {
    stroke-dashoffset: 40;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.ripple {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  animation: ripple 4s ease-out infinite;
}

@keyframes ripple {
  from {
    opacity: 0.9;
    transform: scale(0.3);
  }
  to {
    opacity: 0;
    transform: scale(1.4);
  }
}

/* Duck family: across the lake, a turn, and back. */
.swim {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  animation: swim 18s ease-in-out infinite;
}

@keyframes swim {
  0%,
  6% {
    transform: translate(0, 0);
  }
  44%,
  50% {
    transform: translate(90px, 0);
  }
  50.1%,
  56% {
    transform: translate(90px, 0) scaleX(-1);
  }
  94%,
  100% {
    transform: translate(0, 0) scaleX(-1);
  }
}

.bob {
  animation: bob 1.4s ease-in-out infinite alternate;
}

@keyframes bob {
  to {
    transform: translateY(1.5px);
  }
}

/* Rabbit: two hops right, a rest, a turn, two hops back. */
.hop {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  animation: hop 7s ease-in-out infinite;
}

@keyframes hop {
  0% {
    transform: translate(0, 0);
  }
  8% {
    transform: translate(12px, -14px);
  }
  16% {
    transform: translate(24px, 0);
  }
  24% {
    transform: translate(36px, -14px);
  }
  32%,
  50% {
    transform: translate(48px, 0);
  }
  50.1% {
    transform: translate(48px, 0) scaleX(-1);
  }
  58% {
    transform: translate(36px, -14px) scaleX(-1);
  }
  66% {
    transform: translate(24px, 0) scaleX(-1);
  }
  74% {
    transform: translate(12px, -14px) scaleX(-1);
  }
  82%,
  100% {
    transform: translate(0, 0) scaleX(-1);
  }
}

/* Goat: the neck turns at its foot (the box's lower left corner). */
.graze {
  transform-box: fill-box;
  transform-origin: 0% 100%;
  animation: graze 6s ease-in-out infinite;
}

@keyframes graze {
  0%,
  35%,
  92%,
  100% {
    transform: rotate(0deg);
  }
  48%,
  80% {
    transform: rotate(72deg);
  }
  64% {
    transform: rotate(64deg);
  }
}

.nod-head {
  transform-box: fill-box;
  transform-origin: 0% 60%;
  animation: nod-head 3.4s ease-in-out infinite alternate;
}

@keyframes nod-head {
  to {
    transform: rotate(14deg);
  }
}

/* Hen and chick: quick pecks with pauses, tipping over their feet. */
.peck {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  animation: peck 2.4s ease-in-out infinite;
}

@keyframes peck {
  0%,
  30%,
  60%,
  100% {
    transform: rotate(0deg);
  }
  40%,
  70% {
    transform: rotate(28deg);
  }
}

.lamp-glow {
  animation: lamp-glow 3.2s ease-in-out infinite alternate;
}

@keyframes lamp-glow {
  from {
    opacity: 0.7;
  }
  to {
    opacity: 1;
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
