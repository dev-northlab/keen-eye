<script setup lang="ts">
// Animation benchmark (developer mode only, /dev/bench): the cartoon level 802 played by SVG (the game's way) and
// Canvas 2D, each for a while, to see which keeps the frame rate on a weak phone. Its labels are technical names, the
// same in every language.
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import BackButton from '../components/BackButton.vue'
import { buildLayers, type GroupLayer, type LayerStats } from '../bench/layers.ts'
import { canvasRenderer, svgRenderer, type Renderer, type RendererKind } from '../bench/renderers.ts'
import { levelById } from '../levels/index.ts'

const LEVEL_ID = 802
/** Each run: a second to settle, then this long measured. */
const WARMUP_MS = 1000
const MEASURE_MS = 10000

const NAMES: Record<RendererKind, string> = { svg: 'SVG', canvas: 'Canvas 2D' }
const KINDS: RendererKind[] = ['svg', 'canvas']

interface Result {
  kind: RendererKind
  setupMs: number
  fps: number
  p95: number
  worst: number
  /** Share of frames slower than 20 ms (under 50 fps). */
  slow: number
  /** Our own JavaScript per frame (posing), ms. */
  js: number
}

const level = levelById(LEVEL_ID)!
const boxA = ref<HTMLElement>()
const boxB = ref<HTMLElement>()
const running = ref<RendererKind | null>(null)
const status = ref('')
const live = ref('')
const results = ref<Result[]>([])
const layerStats = shallowRef<LayerStats | null>(null)
const device = `${navigator.userAgent.match(/Android [\d.]+|iPhone OS [\d_]+|Chrome\/[\d]+/g)?.join(' · ') ?? navigator.userAgent} · dpr ${window.devicePixelRatio}`

let layers: Promise<{ roots: GroupLayer[]; stats: LayerStats }> | null = null
let renderer: Renderer | null = null
let raf = 0
let stopped = false

const prepareLayers = () => {
  layers ??= buildLayers([level.build!(0), level.build!(1)]).then((l) => {
    layerStats.value = l.stats
    return l
  })
  return layers
}

async function create(kind: RendererKind): Promise<Renderer> {
  const boxes = [boxA.value!, boxB.value!]
  if (kind === 'svg') return svgRenderer(level, boxes)
  const { roots } = await prepareLayers()
  return canvasRenderer(level, boxes, roots)
}

function clear() {
  cancelAnimationFrame(raf)
  renderer?.destroy()
  renderer = null
  running.value = null
}

/** Plays one renderer; with `measure`, for WARMUP + MEASURE and returns its numbers. */
async function play(kind: RendererKind, measure: boolean): Promise<Result | null> {
  clear()
  status.value = `${NAMES[kind]}: preparing…`
  const t0 = performance.now()
  renderer = await create(kind)
  const setupMs = performance.now() - t0
  if (stopped) return null
  running.value = kind
  status.value = measure ? `${NAMES[kind]}: measuring…` : NAMES[kind]
  return new Promise((resolve) => {
    const start = performance.now()
    const intervals: number[] = []
    let jsTotal = 0
    let last = start
    let window1s = { frames: 0, since: start }
    const tick = (now: number) => {
      const j0 = performance.now()
      renderer?.frame((now - start) / 1000)
      const js = performance.now() - j0
      const elapsed = now - start
      if (elapsed > WARMUP_MS) {
        intervals.push(now - last)
        jsTotal += js
      }
      last = now
      window1s.frames++
      if (now - window1s.since >= 1000) {
        live.value = `${Math.round((window1s.frames * 1000) / (now - window1s.since))} fps`
        window1s = { frames: 0, since: now }
      }
      if (measure && elapsed >= WARMUP_MS + MEASURE_MS) {
        const sorted = [...intervals].sort((a, b) => a - b)
        const total = intervals.reduce((s, v) => s + v, 0)
        resolve({
          kind,
          setupMs,
          fps: (intervals.length * 1000) / total,
          p95: sorted[Math.floor(sorted.length * 0.95)] ?? 0,
          worst: sorted[sorted.length - 1] ?? 0,
          slow: intervals.filter((v) => v > 20).length / Math.max(1, intervals.length),
          js: jsTotal / Math.max(1, intervals.length),
        })
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
  })
}

async function watch(kind: RendererKind) {
  await play(kind, false)
}

async function autoTest() {
  results.value = []
  for (const kind of KINDS) {
    const r = await play(kind, true)
    if (!r) return
    results.value = [...results.value, r]
  }
  clear()
  status.value = 'Done'
  live.value = ''
}

onMounted(() => {
  status.value = 'Pick a renderer, or run all three'
})
onBeforeUnmount(() => {
  stopped = true
  clear()
})

const ms = (v: number) => `${v.toFixed(1)} ms`
</script>

<template>
  <div class="bench">
    <header>
      <h1>Animation benchmark · level {{ LEVEL_ID }}</h1>
      <p class="device">{{ device }}</p>
    </header>
    <div class="area">
      <div ref="boxA" class="box" />
      <div ref="boxB" class="box" />
      <span v-if="live" class="live">{{ live }}</span>
    </div>
    <div class="controls">
      <button v-for="k in KINDS" :key="k" :class="{ secondary: running !== k }" @click="watch(k)">{{ NAMES[k] }}</button>
      <button class="run" @click="autoTest">Run all ({{ (WARMUP_MS + MEASURE_MS) / 1000 }} s each)</button>
    </div>
    <p class="status">{{ status }}</p>
    <table v-if="results.length">
      <thead>
        <tr><th /><th>fps</th><th>p95</th><th>worst</th><th>&gt;20 ms</th><th>JS/frame</th><th>setup</th></tr>
      </thead>
      <tbody>
        <tr v-for="r in results" :key="r.kind">
          <th>{{ NAMES[r.kind] }}</th>
          <td>{{ r.fps.toFixed(1) }}</td>
          <td>{{ ms(r.p95) }}</td>
          <td>{{ ms(r.worst) }}</td>
          <td>{{ Math.round(r.slow * 100) }}%</td>
          <td>{{ ms(r.js) }}</td>
          <td>{{ Math.round(r.setupMs) }} ms</td>
        </tr>
      </tbody>
    </table>
    <p v-if="layerStats" class="note">Canvas 2D layers: {{ layerStats.bitmaps }} bitmaps, {{ layerStats.megabytes.toFixed(1) }} MB</p>
    <BackButton />
  </div>
</template>

<style scoped>
.bench {
  /* Scrolls like the other screens: the results table may reach past a short phone's screen. */
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: calc(env(safe-area-inset-top) + 8px) 12px calc(env(safe-area-inset-bottom) + 8px);
  background: var(--bg);
  color: var(--fg);
}

h1 {
  margin: 0;
  font-size: 18px;
}

.device,
.note,
.status {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
}

.area {
  position: relative;
  flex: none;
  height: 42vh;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.box {
  position: relative;
  flex: 1 1 0;
  min-height: 0;
  border-radius: 8px;
  overflow: hidden;
  background: var(--soft);
}

.live {
  position: absolute;
  z-index: 1;
  top: 6px;
  inset-inline-end: 6px;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--panel);
  font-weight: 700;
  font-size: 13px;
}

.controls {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.controls button {
  font-size: 14px;
  padding: 8px 4px;
}

.controls .run {
  grid-column: 1 / -1;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

th,
td {
  padding: 4px;
  text-align: end;
  border-bottom: 1px solid var(--soft);
}

tbody th {
  text-align: start;
}
</style>
