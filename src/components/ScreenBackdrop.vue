<script setup lang="ts">
import { computed } from 'vue'
import type { BackdropTheme } from '../levels/chapters.ts'
import { useSettingsStore } from '../stores/settings.ts'
import MeadowScene from './MeadowScene.vue'

// Screen backdrops, one world per screen: sky, sun, drifting clouds and a landscape strip at the bottom
// (space: stars, a moon and a planet surface). Covers the whole window (also under the system bars)
// behind the screen's content; decorative only. The parent needs its own stacking context
// (`isolation: isolate`), the backdrop sits at z-index -1.

const props = defineProps<{ theme: BackdropTheme }>()
const settings = useSettingsStore()

/** Dark theme: every world at night (dark sky, moon, stars, dimmed landscape); space already is. */
const night = computed(() => settings.theme === 'dark')

/** The meadow follows the season chosen on the home screen (sky colours, falling petals/leaves/snow). */
const season = computed(() => (props.theme === 'meadow' ? settings.season : null))

/**
 * The meadow in the redesigned picture style (levels/picture-style.ts): one ready picture per season, day and night
 * (public/backdrops/), cut to the window like the strip, instead of the drawn sky and landscape.
 */
const picture = computed(() =>
  season.value && settings.pictureStyle === 'redesign'
    ? `${import.meta.env.BASE_URL}backdrops/meadow-${season.value}-${night.value ? 'night' : 'day'}.webp`
    : null,
)

const FALLING = {
  spring: { count: 14, size: 9, colors: ['#ffd1e0', '#ffffff', '#ffb3cb'] },
  summer: { count: 0, size: 0, colors: [] },
  autumn: { count: 18, size: 11, colors: ['#e98a2e', '#d9542b', '#f2c14e', '#c9662b'] },
  winter: { count: 46, size: 4, colors: ['#ffffff'] },
}
/** Deterministic spread: left (%), size (px), fall time and start offset (s), sideways drift (px). */
const falling = computed(() => {
  if (!season.value) return []
  const { count, size, colors } = FALLING[season.value]
  return Array.from({ length: count }, (_, i) => ({
    left: (i * 37 + 11) % 100,
    size: size + ((i * 7) % 5),
    duration: 9 + ((i * 13) % 8),
    delay: -((i * 7.3) % 16),
    drift: ((i * 29) % 90) - 45,
    color: colors[i % colors.length],
  }))
})

/** Deterministic jitter: the pictures are the same on every start. */
const jitter = (i: number, a: number, m: number) => ((i * a) % m) - m / 2

const FLOWER_COLORS = ['#ff6b8a', '#ffd23f', '#ffffff', '#b07cff']
const flowers = Array.from({ length: 60 }, (_, i) => ({
  x: ((i + 0.5) * 1600) / 60 + jitter(i, 37, 22),
  y: 322 + ((i * 53) % 30),
  color: FLOWER_COLORS[i % FLOWER_COLORS.length],
}))

/** Sun rays around the disc (r = 32): long and short ones in turn, from r = 40 to r = 60 or 52. */
const rays = Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI) / 6
  const r2 = i % 2 ? 52 : 60
  return { x1: 50 + 40 * Math.cos(a), y1: 50 + 40 * Math.sin(a), x2: 50 + r2 * Math.cos(a), y2: 50 + r2 * Math.sin(a) }
})

/** Width (px), top (% of the window), seconds per pass, start offset (s), opacity. */
const clouds = [
  { w: 120, top: 9, dur: 70, delay: -20, opacity: 1 },
  { w: 80, top: 20, dur: 95, delay: -60, opacity: 0.85 },
  { w: 150, top: 4, dur: 120, delay: -90, opacity: 0.7 },
]

// Farm: crop rows on a field, a fence, hay bales, sunflowers and a windmill.
const cropRows = Array.from({ length: 7 }, (_, i) => 262 + i * 14)
const bales = [
  { x: 560, y: 330, s: 1 },
  { x: 630, y: 338, s: 0.8 },
  { x: 1060, y: 334, s: 1.1 },
]
const sunflowers = [500, 540, 1090, 1130].map((x, i) => ({ x, h: 60 + (i % 2) * 14 }))

// Forest: a row of small far pines, then big near ones (both rows cover the whole width).
const farPines = Array.from({ length: 22 }, (_, i) => ({
  x: i * 76 + 20 + jitter(i, 29, 24),
  y: 190 + jitter(i, 41, 26),
  s: 0.7 + ((i * 7) % 4) / 10,
}))
const nearPines = [90, 300, 470, 590, 1060, 1180, 1390, 1530].map((x, i) => ({
  x,
  y: 280 + jitter(i, 17, 20),
  s: 1.3 + ((i * 3) % 4) / 5,
  c: i % 2 ? '#2f7d55' : '#256b47',
}))
const mushrooms = [
  { x: 700, y: 330, s: 1.2 },
  { x: 760, y: 340, s: 0.8 },
  { x: 950, y: 335, s: 1 },
  { x: 230, y: 345, s: 0.9 },
  { x: 1300, y: 338, s: 1.1 },
]

// Sea: waves are one repeated crest.
const crest = (y: number, n: number, w: number) =>
  `M0 ${y}` + `q${w / 4} -14 ${w / 2} 0t${w / 2} 0`.repeat(n) + `V400H0Z`
/** One palm frond (base at 0,0, drooping to the right); the crown turns and mirrors it. */
const PALM_LEAF = 'M0 0Q30-26 70 4Q60-2 50 0Q40-4 30 2Q18-4 0 0Z'
const palmLeaves = [
  { t: 'rotate(-8)', c: '#3f9a5a' },
  { t: 'scale(-1 1) rotate(-8)', c: '#3f9a5a' },
  { t: 'rotate(-38) scale(0.85)', c: '#4fb26a' },
  { t: 'scale(-1 1) rotate(-38) scale(0.85)', c: '#4fb26a' },
  { t: 'rotate(28) scale(0.8)', c: '#358a4e' },
  { t: 'scale(-1 1) rotate(28) scale(0.8)', c: '#358a4e' },
]
/** Position, size and flap offset (s) of each gull. */
const gulls = [
  { x: 500, y: 130, s: 1, delay: 0 },
  { x: 548, y: 108, s: 0.7, delay: -0.35 },
  { x: 1250, y: 112, s: 0.85, delay: -0.6 },
]
const shells = [
  { x: 520, y: 360, c: '#ff8f6b' },
  { x: 880, y: 372, c: '#ffb84d' },
  { x: 1240, y: 358, c: '#ff6b8a' },
  { x: 160, y: 370, c: '#ffb84d' },
]

// City: far skyline silhouettes, near houses with windows, a street with trees.
const farTowers = Array.from({ length: 20 }, (_, i) => ({
  x: i * 82 - 10,
  w: 70,
  h: 120 + ((i * 47) % 90),
}))
const HOUSE_COLORS = ['#f2cc8f', '#e07a5f', '#81b29a', '#f4d6a0', '#7aa6d6', '#c98bb9']
const houses = Array.from({ length: 16 }, (_, i) => {
  const w = 80 + ((i * 23) % 30)
  const h = 110 + ((i * 61) % 80)
  const x = i * 102 + jitter(i, 13, 10)
  const rows = Math.floor((h - 30) / 34)
  const windows = Array.from({ length: rows * 2 }, (_, k) => ({
    x: x + (k % 2 ? w - 30 : 14),
    y: 300 - h + 18 + Math.floor(k / 2) * 34,
  }))
  return { x, w, h, color: HOUSE_COLORS[i % HOUSE_COLORS.length], windows }
})
const streetTrees = [140, 420, 700, 980, 1260, 1520]

// Space: stars over the whole window (% positions), craters on the planet surface.
const stars = Array.from({ length: 40 }, (_, i) => ({
  x: ((i * 37) % 100) + jitter(i, 7, 6),
  y: ((i * 53) % 100) + jitter(i, 11, 6),
  r: 1 + ((i * 3) % 3) * 0.6,
  opacity: 0.5 + ((i * 7) % 5) / 10,
}))
const craters = [
  { x: 180, y: 330, r: 22 },
  { x: 520, y: 360, r: 14 },
  { x: 900, y: 335, r: 28 },
  { x: 1240, y: 365, r: 12 },
  { x: 1460, y: 330, r: 18 },
]
</script>

<template>
  <div
    class="backdrop"
    :class="[theme, season, { night }]"
    aria-hidden="true"
  >
    <img v-if="picture" class="picture" :src="picture" alt="" />
    <template v-else>
      <svg v-if="theme === 'space' || night" class="stars" preserveAspectRatio="none">
        <circle v-for="(s, i) in stars" :key="i" :cx="`${s.x}%`" :cy="`${s.y}%`" :r="s.r" fill="#fff" :fill-opacity="s.opacity" />
      </svg>
      <div class="sky">
        <!-- The glow pulses and the rays turn slowly. Backdrops always move: "reduce motion" is for levels only. -->
        <div class="sun">
          <div class="glow" />
          <svg viewBox="-20 -20 140 140">
            <g class="rays">
              <line v-for="(r, i) in rays" :key="i" v-bind="r" />
            </g>
            <circle cx="50" cy="50" r="38" fill="#fff" fill-opacity="0.5" />
            <circle class="disc" cx="50" cy="50" r="32" />
            <circle cx="40" cy="40" r="9" fill="#fff" fill-opacity="0.35" />
          </svg>
        </div>

        <svg
          v-for="(c, i) in clouds"
          :key="i"
          class="cloud"
          viewBox="0 0 120 50"
          :style="{
            top: `${c.top}%`,
            width: `${c.w}px`,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
            opacity: c.opacity,
          }"
        >
          <g fill="#fff">
            <circle cx="35" cy="30" r="18" />
            <circle cx="60" cy="22" r="22" />
            <circle cx="85" cy="30" r="16" />
            <rect x="20" y="30" width="80" height="18" rx="9" />
          </g>
        </svg>
      </div>

      <!-- Wide strip cut to the window: on a phone its middle part stays visible. -->
      <svg class="strip" viewBox="0 0 1600 400" preserveAspectRatio="xMidYMax slice">
        <MeadowScene v-if="theme === 'meadow'" :season="settings.season" />

        <template v-else-if="theme === 'farm'">
          <path d="M0 180Q300 120 640 170T1600 150V400H0Z" fill="#c7dd8f" />
          <path d="M0 250Q400 220 800 250T1600 240V400H0Z" fill="#e9c46a" />
          <path v-for="y in cropRows" :key="y" :d="`M0 ${y}Q400 ${y - 14} 800 ${y}T1600 ${y - 6}`" fill="none" stroke="#d9a43a" stroke-width="3" />
          <g transform="translate(700 236)">
            <path d="M-28 0L-18-90h36L28 0Z" fill="#f4efe6" />
            <path d="M-32 0h64v10h-64Z" fill="#a0703f" />
            <rect x="-8" y="-40" width="16" height="22" fill="#5a3d2b" />
            <g class="sails">
              <path d="M0-96L-56-52M0-96L56-52M0-96L-56-140M0-96L56-140" stroke="#6b4f3a" stroke-width="5" stroke-linecap="round" />
              <path d="M-50-56l-6-40 24 10ZM50-56l6-40-24 10ZM-50-136l-6 40 24-10ZM50-136l6 40-24-10Z" fill="#fff" fill-opacity="0.9" />
              <circle cy="-96" r="6" fill="#6b4f3a" />
            </g>
          </g>
          <path d="M0 340Q400 310 800 335T1600 325V400H0Z" fill="#8fca68" />
          <g v-for="(b, i) in bales" :key="i" :transform="`translate(${b.x} ${b.y}) scale(${b.s})`">
            <ellipse rx="34" ry="26" fill="#f2c14e" />
            <path d="M-20-10q8-6 16 0M2-14q8-6 16 0M-12 10q8-6 16 0M10 6q8-6 14 0" stroke="#d9a43a" stroke-width="3" fill="none" />
          </g>
          <g v-for="(f, i) in sunflowers" :key="i" :transform="`translate(${f.x} 372)`">
            <path :d="`M0 0V-${f.h}`" stroke="#3f8f3a" stroke-width="4" />
            <g :transform="`translate(0 -${f.h})`">
              <circle v-for="k in 8" :key="k" :cx="12 * Math.cos((k * Math.PI) / 4)" :cy="12 * Math.sin((k * Math.PI) / 4)" r="6" fill="#ffc300" />
              <circle r="8" fill="#6b3f1d" />
            </g>
          </g>
          <rect x="320" y="344" width="960" height="6" fill="#d8bd8a" />
          <rect x="320" y="362" width="960" height="6" fill="#d8bd8a" />
          <rect v-for="k in 13" :key="k" :x="320 + (k - 1) * 80" y="334" width="12" height="44" rx="3" fill="#e9d3a7" />
          <g transform="translate(900 372)">
            <path d="M-10 0h-6v-10M10 0h6v-10M-14-10h28" stroke="#ff9f1c" stroke-width="3" />
            <ellipse cy="-20" rx="18" ry="13" fill="#fff" />
            <circle cx="14" cy="-32" r="8" fill="#fff" />
            <path d="M22-34l6 2-6 3Z" fill="#ff9f1c" />
            <circle cx="12" cy="-42" r="3" fill="#e63946" />
            <circle cx="17" cy="-41" r="3" fill="#e63946" />
          </g>
        </template>

        <template v-else-if="theme === 'forest'">
          <path d="M0 200Q300 120 640 180T1300 160T1600 180V400H0Z" fill="#a9d3a0" />
          <g v-for="(p, i) in farPines" :key="i" :transform="`translate(${p.x} ${p.y}) scale(${p.s})`">
            <rect x="-4" y="0" width="8" height="16" fill="#8a6a4e" />
            <path d="M0-70L-26-20h12L-32 4h64L14-20h12Z" fill="#7fb88a" />
          </g>
          <path d="M0 270Q350 220 800 260T1600 250V400H0Z" fill="#7cbf7a" />
          <g v-for="(p, i) in nearPines" :key="i" :transform="`translate(${p.x} ${p.y}) scale(${p.s})`">
            <rect x="-5" y="0" width="10" height="20" fill="#7a4e33" />
            <path d="M0-70L-26-20h12L-32 4h64L14-20h12Z" :fill="p.c" />
            <path d="M0-70L-13-45" stroke="#fff" stroke-opacity="0.2" stroke-width="4" stroke-linecap="round" />
          </g>
          <path d="M0 320Q400 290 800 315T1600 305V400H0Z" fill="#5fae6a" />
          <g v-for="(m, i) in mushrooms" :key="i" :transform="`translate(${m.x} ${m.y}) scale(${m.s})`">
            <rect x="-5" y="-4" width="10" height="16" rx="3" fill="#fff4e0" />
            <path d="M-18 -2a18 16 0 0 1 36 0Z" fill="#e05a47" />
            <circle cx="-7" cy="-9" r="3" fill="#fff" />
            <circle cx="6" cy="-11" r="2.5" fill="#fff" />
          </g>
          <circle
            v-for="(f, i) in flowers.filter((_, k) => k % 3 === 0)"
            :key="i"
            :cx="f.x"
            :cy="f.y + 10"
            r="3.5"
            :fill="f.color"
          />
        </template>

        <template v-else-if="theme === 'sea'">
          <path :d="crest(190, 16, 100)" fill="#8fd8ec" />
          <rect y="200" width="1600" height="200" fill="#5cc0de" />
          <!-- Sun glints on the water. -->
          <path
            d="M260 222h28M300 232h14M520 244h30M900 226h22M1290 236h30M1330 226h14M1480 246h24"
            stroke="#fff"
            stroke-opacity="0.6"
            stroke-width="3"
            stroke-linecap="round"
          />
          <!-- Island on the near water, behind the front wave; everything stays below y = 70
               (wide windows cut the strip's top 60 units). -->
          <g transform="translate(1010 262)">
            <path d="M-150 0Q-80-50 0-52Q86-52 150 0Z" fill="#e3bf7d" />
            <path d="M-128 0Q-66-40 6-42Q76-40 128 0Z" fill="#f4dca4" />
            <path d="M-60-30q16-6 30-4M24-36q18-2 30 4" stroke="#fff" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" fill="none" />
            <!-- Small palm leaning left. -->
            <g transform="translate(-52 -30)">
              <path d="M0 0Q4-34-26-62" fill="none" stroke="#9a6b43" stroke-width="8" stroke-linecap="round" />
              <path d="M0 0Q4-34-26-62" fill="none" stroke="#7d5434" stroke-width="8" stroke-dasharray="2 7" />
              <g transform="translate(-26 -62) scale(0.7)">
                <path v-for="(l, i) in palmLeaves" :key="i" :d="PALM_LEAF" :fill="l.c" :transform="l.t" />
              </g>
            </g>
            <!-- Tall palm. -->
            <g transform="translate(12 -40)">
              <path d="M0 0Q-8-52 20-104" fill="none" stroke="#9a6b43" stroke-width="11" stroke-linecap="round" />
              <path d="M0 0Q-8-52 20-104" fill="none" stroke="#7d5434" stroke-width="11" stroke-dasharray="2.5 9" />
              <g transform="translate(20 -104)">
                <path v-for="(l, i) in palmLeaves" :key="i" :d="PALM_LEAF" :fill="l.c" :transform="l.t" />
                <circle cx="-5" cy="6" r="6" fill="#7a4e33" />
                <circle cx="6" cy="7" r="6" fill="#6b4329" />
                <circle cx="0" cy="13" r="5.5" fill="#7a4e33" />
              </g>
            </g>
            <path d="M-160 4q20-8 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" fill="none" stroke="#fff" stroke-opacity="0.8" stroke-width="4" stroke-linecap="round" />
          </g>
          <g transform="translate(640 222)">
            <path d="M-56 0h112l-20 26h-72Z" fill="#e05a47" />
            <path d="M4-4V-96L52-10Z" fill="#fff" />
            <path d="M-4-4V-76L-42-10Z" fill="#ffe08a" />
            <rect x="-1" y="-100" width="4" height="98" fill="#7a4e33" />
          </g>
          <!-- Gulls: two arched wings; the outer group places them, the inner one flaps. -->
          <g v-for="(g, i) in gulls" :key="i" :transform="`translate(${g.x} ${g.y}) scale(${g.s})`">
            <path
              class="gull"
              :style="{ animationDelay: `${g.delay}s` }"
              d="M-18 2Q-10-10 0 0Q10-10 18 2"
              fill="none"
              stroke="#3d5a66"
              stroke-width="3.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <path :d="crest(270, 10, 160)" fill="#3ba7cc" />
          <path d="M0 330Q200 300 400 325T800 320T1200 325T1600 318V400H0Z" fill="#f2d79e" />
          <g v-for="(s, i) in shells" :key="i" :transform="`translate(${s.x} ${s.y})`">
            <path d="M0-12l3.5 7.5 8 1-6 5.5 1.6 8L0 6l-7 4 1.5-8-6-5.5 8-1Z" :fill="s.c" />
          </g>
          <ellipse cx="1040" cy="366" rx="18" ry="9" fill="#d8b07a" />
        </template>

        <template v-else-if="theme === 'space'">
          <g transform="translate(1180 120)">
            <circle r="44" fill="#9b7bff" />
            <circle cx="-14" cy="-10" r="10" fill="#fff" fill-opacity="0.2" />
            <ellipse rx="78" ry="18" fill="none" stroke="#d9ccff" stroke-width="7" transform="rotate(-18)" />
          </g>
          <path d="M0 300Q400 250 800 290T1600 280V400H0Z" fill="#c3b8e6" />
          <g v-for="(c, i) in craters" :key="i">
            <circle :cx="c.x" :cy="c.y" :r="c.r" fill="#a99bd6" />
            <circle :cx="c.x - c.r * 0.15" :cy="c.y - c.r * 0.15" :r="c.r * 0.7" fill="#b7aae0" />
          </g>
          <g transform="translate(380 290)">
            <path d="M0-120q26 30 26 90v30H-26v-30q0-60 26-90Z" fill="#f4f1de" />
            <path d="M-26-20l-22 28v24l22-10ZM26-20l22 28v24l-22-10Z" fill="#e05a47" />
            <circle cy="-48" r="9" fill="#3ba7cc" stroke="#fff" stroke-width="3" />
            <path d="M-12 0h24l-12 26Z" fill="#ff9e5e" />
          </g>
        </template>

        <template v-else>
          <rect
            v-for="(t, i) in farTowers"
            :key="i"
            :x="t.x"
            :y="300 - t.h - 40"
            :width="t.w"
            :height="t.h + 40"
            fill="#d9c3dc"
          />
          <g v-for="(h, i) in houses" :key="i">
            <rect :x="h.x" :y="300 - h.h" :width="h.w" :height="h.h" :fill="h.color" />
            <rect :x="h.x - 4" :y="300 - h.h - 8" :width="h.w + 8" height="10" fill="#fff" fill-opacity="0.35" />
            <rect
              v-for="(w, k) in h.windows"
              :key="k"
              :x="w.x"
              :y="w.y"
              width="16"
              height="20"
              rx="2"
              fill="#fff8e1"
              fill-opacity="0.85"
            />
          </g>
          <rect y="300" width="1600" height="24" fill="#cfd5da" />
          <g v-for="(x, i) in streetTrees" :key="i" :transform="`translate(${x} 304)`">
            <rect x="-4" y="-30" width="8" height="30" fill="#8a5a3b" />
            <circle cy="-44" r="22" fill="#4caf6a" />
            <circle cx="-7" cy="-52" r="7" fill="#fff" fill-opacity="0.2" />
          </g>
          <rect y="324" width="1600" height="76" fill="#4a5058" />
          <path d="M0 362H1600" stroke="#fff" stroke-width="5" stroke-dasharray="34 24" />
        </template>
      </svg>
      <!-- Night lights of the meadow's house, over the dimmed strip (same box, so they line up). -->
      <svg v-if="night && theme === 'meadow'" class="strip lit" viewBox="0 0 1600 400" preserveAspectRatio="xMidYMax slice">
        <MeadowScene :season="settings.season" lights />
      </svg>

      <div v-if="falling.length" class="falling">
        <span
          v-for="(f, i) in falling"
          :key="i"
          :style="{
            left: `${f.left}%`,
            '--size': `${f.size}px`,
            '--drift': `${f.drift}px`,
            '--color': f.color,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background: linear-gradient(var(--sky) 0%, var(--sky-mid) 55%, var(--bg) 100%);
}

.picture {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.meadow {
  --sky: #9fd8f0;
  --sky-mid: #d6eef3;
  --sun: #ffd45c;
  --glow: rgb(255 248 214 / 0.8);
}

/* Meadow seasons (home screen). */
.meadow.spring {
  --sky: #a7def2;
  --sky-mid: #e3f5ea;
}

.meadow.autumn {
  --sky: #9ccbe6;
  --sky-mid: #e2eef0;
  --sun: #ffc85c;
}

.meadow.winter {
  --sky: #a9c6dc;
  --sky-mid: #d4e2ec;
  --sun: #fff1c4;
  --glow: rgb(255 255 255 / 0.6);
}

.falling {
  position: absolute;
  inset: 0;
}

.falling span {
  position: absolute;
  top: -24px;
  width: var(--size);
  height: var(--size);
  background: var(--color);
  animation: fall linear infinite;
}

/* Snowflakes, petals and leaves differ only in shape. */
.winter .falling span {
  border-radius: 50%;
  opacity: 0.9;
}

.spring .falling span {
  height: calc(var(--size) * 0.7);
  border-radius: 80% 0 80% 0;
}

.autumn .falling span {
  border-radius: 0 80% 0 80%;
}

@keyframes fall {
  to {
    transform: translate(var(--drift), calc(100vh + 48px)) rotate(540deg);
  }
}

.farm {
  --sky: #a9dcf5;
  --sky-mid: #e0f0f6;
  --sun: #ffd45c;
  --glow: rgb(255 248 214 / 0.8);
}

.farm .sails {
  transform-origin: 0 -96px;
  animation: spin 24s linear infinite;
}

.forest {
  --sky: #bfe6d3;
  --sky-mid: #e3f1e4;
  --sun: #ffe27a;
  --glow: rgb(255 226 122 / 0.55);
}

.sea {
  --sky: #8fd3ee;
  --sky-mid: #cdeef6;
  --sun: #ffd45c;
  --glow: rgb(255 248 214 / 0.8);
}

.city {
  --sky: #ffc9a0;
  --sky-mid: #ffe6cc;
  --sun: #ff9e5e;
  --glow: rgb(255 158 94 / 0.55);
}

/* Night sky; the "sun" is a pale moon without clouds. */
.space {
  --sky: #1d1b4b;
  --sky-mid: #3b2f73;
  --sun: #f4f1de;
  --glow: rgb(244 241 222 / 0.35);
  background: linear-gradient(var(--sky) 0%, var(--sky-mid) 70%, #5b4bd6 100%);
}

.space .cloud {
  display: none;
}

/* Night (dark theme) for the daytime worlds: the sun turns into the moon, clouds and land darken. */
.night:not(.space) {
  --sky: #0e1433;
  --sky-mid: #1f2b5a;
  --sun: #f4f1de;
  --glow: rgb(244 241 222 / 0.3);
}

.night:not(.space) .rays {
  display: none;
}

.night:not(.space) .cloud {
  filter: brightness(0.45) saturate(0.6);
}

.night:not(.space) .strip {
  filter: brightness(0.55) saturate(0.85);
}

.night .strip.lit {
  filter: none;
}

.stars {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.sky {
  position: absolute;
  inset: env(safe-area-inset-top) 0 0;
}

/* 154 px box: the 110 px sun of the 100-unit disc area plus 22 px of rays on each side. */
.sun {
  position: absolute;
  top: calc(5% - 22px);
  right: calc(6% - 22px);
  width: 154px;
  height: 154px;
}

.forest .sun,
.city .sun {
  right: auto;
  left: calc(6% - 22px);
}

.sun svg {
  position: relative;
  width: 100%;
  height: 100%;
}

.sun .glow {
  position: absolute;
  inset: -40%;
  border-radius: 50%;
  background: radial-gradient(circle, var(--glow) 0%, transparent 62%);
  animation: glow 4s ease-in-out infinite alternate;
}

.sun .rays {
  stroke: var(--sun);
  stroke-width: 6;
  stroke-linecap: round;
  stroke-opacity: 0.85;
  transform-origin: 50px 50px;
  animation: spin 40s linear infinite;
}

.sun .disc {
  fill: var(--sun);
}

@keyframes glow {
  from {
    opacity: 0.6;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1.08);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.cloud {
  position: absolute;
  left: 0;
  animation: drift linear infinite;
}

.strip {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  /* Phones: a fixed strip, cut at the sides. Wide windows: tall enough (21.25vw = 340 of 400 units)
     that the slice never cuts the far layer flat. */
  height: max(min(30%, 230px), min(21.25vw, 60%));
}

@keyframes drift {
  from {
    transform: translateX(-160px);
  }
  to {
    transform: translateX(100vw);
  }
}

.gull {
  transform-box: fill-box;
  transform-origin: center bottom;
  animation: flap 0.9s ease-in-out infinite alternate;
}

@keyframes flap {
  to {
    transform: scaleY(0.45);
  }
}
</style>
