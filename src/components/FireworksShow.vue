<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { playSfx } from '../services/audio.ts'

/**
 * A fireworks show on a canvas over its parent (the result dialog's shade and card; taps go through), played once:
 * rockets climb with a sparkling trail, slowing down, and burst at the top of their climb. The sparks fly out with
 * air drag and fall under gravity, leave glowing trails, start white-hot and cool into their colour; each burst
 * lights the sky for a moment. Shells: a "peony" (a sphere of sparks, often with a core of another colour), a tilted
 * "ring", a golden "willow" with long drooping trails, and a "crackle" whose sparks twinkle out in glitter. Each
 * burst pops (`playSfx('firework')`). Everything is in CSS pixels scaled to the screen, so it looks the same on a
 * phone and a tablet.
 */

type Kind = 'peony' | 'ring' | 'willow' | 'crackle'

/** Where (fractions of the screen) and when (s) a shell bursts, its kind and colours (a second one: its core). */
interface Shell {
  x: number
  y: number
  t: number
  kind: Kind
  colors: string[]
}

// Round the card in both orientations, two waves over about four seconds.
const SHOW: Shell[] = [
  { x: 0.25, y: 0.2, t: 0, kind: 'peony', colors: ['#ff4d4d', '#ffd34d'] },
  { x: 0.76, y: 0.15, t: 0.35, kind: 'ring', colors: ['#4db2ff'] },
  { x: 0.5, y: 0.1, t: 0.75, kind: 'willow', colors: ['#ffc65c'] },
  { x: 0.16, y: 0.45, t: 1.15, kind: 'crackle', colors: ['#b77dff'] },
  { x: 0.84, y: 0.4, t: 1.45, kind: 'peony', colors: ['#46e07a', '#ff7ad9'] },
  { x: 0.35, y: 0.13, t: 1.9, kind: 'peony', colors: ['#ff9a3d', '#fff2c4'] },
  { x: 0.66, y: 0.27, t: 2.2, kind: 'crackle', colors: ['#ff5fa2'] },
  { x: 0.2, y: 0.7, t: 2.6, kind: 'ring', colors: ['#ffe14d'] },
  { x: 0.8, y: 0.68, t: 2.9, kind: 'peony', colors: ['#4dd8ff', '#b77dff'] },
  { x: 0.5, y: 0.18, t: 3.3, kind: 'willow', colors: ['#ffd27a'] },
  { x: 0.3, y: 0.34, t: 3.6, kind: 'peony', colors: ['#ff4d4d', '#46e07a'] },
  { x: 0.7, y: 0.11, t: 3.9, kind: 'crackle', colors: ['#ffd34d'] },
]

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  /** Air drag (1/s): the speed falls by e^(−k·t). */
  k: number
  /** Gravity's share: willow sparks hang and droop, rocket sparks barely fall. */
  g: number
  age: number
  life: number
  color: string
  size: number
  /** Last positions, newest first (x, y pairs), and how many to keep. */
  trail: number[]
  trailLen: number
  crackle: boolean
}

interface Rocket {
  x: number
  y: number
  vx: number
  vy: number
  /** Deceleration of the climb (px/s²), reaching speed 0 at the burst point. */
  a: number
  age: number
  flight: number
  shell: Shell
  index: number
}

interface Flash {
  x: number
  y: number
  r: number
  age: number
  color: string
}

const canvas = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null
let w = 0
let h = 0
/** Scale of distances: 1 on a 400 px wide phone. */
let s = 1
let raf = 0
let start = 0
let last = 0
let next = 0
const rockets: Rocket[] = []
const particles: Particle[] = []
const flashes: Flash[] = []

const rand = (a: number, b: number) => a + Math.random() * (b - a)

function measure(): void {
  const c = canvas.value
  if (!c) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = c.clientWidth
  h = c.clientHeight
  s = Math.min(w, h) / 400
  c.width = Math.round(w * dpr)
  c.height = Math.round(h * dpr)
  ctx = c.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function launch(shell: Shell, index: number): void {
  const tx = shell.x * w
  const ty = shell.y * h
  const x = tx + rand(-0.06, 0.06) * w
  const y = h + 10
  const flight = rand(0.75, 0.95)
  const climb = y - ty
  rockets.push({ x, y, vx: (tx - x) / flight, vy: (-2 * climb) / flight, a: (2 * climb) / flight ** 2, age: 0, flight, shell, index })
}

function spark(p: Omit<Particle, 'age' | 'trail'>): void {
  particles.push({ ...p, age: 0, trail: [p.x, p.y] })
}

function burst(r: Rocket): void {
  const { shell } = r
  const [main, core = main] = shell.colors
  const reach = rand(125, 170) * s
  flashes.push({ x: r.x, y: r.y, r: reach * 1.3, age: 0, color: main })
  playSfx('firework', r.index)
  if (shell.kind === 'willow') {
    for (let i = 0; i < 70; i++) {
      const a = rand(0, Math.PI * 2)
      const v = reach * 1.6 * Math.sqrt(Math.random())
      spark({ x: r.x, y: r.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 20 * s, k: 1.6, g: 1.1, life: rand(2.4, 3.2), color: main, size: 2.2, trailLen: 24, crackle: false })
    }
    return
  }
  if (shell.kind === 'ring') {
    // A circle seen at a slant: squashed and turned.
    const tilt = rand(0.35, 0.75)
    const turn = rand(0, Math.PI)
    const n = 56
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2
      const v = reach * 2.3 * rand(0.97, 1.03)
      const ex = Math.cos(a) * v
      const ey = Math.sin(a) * v * tilt
      spark({ x: r.x, y: r.y, vx: ex * Math.cos(turn) - ey * Math.sin(turn), vy: ex * Math.sin(turn) + ey * Math.cos(turn), k: 2.3, g: 0.6, life: rand(1.4, 1.8), color: main, size: 2.6, trailLen: 10, crackle: false })
    }
    return
  }
  // A sphere of sparks seen from the side: denser at its rim; the inner part in the core colour.
  const n = shell.kind === 'crackle' ? 90 : 110
  for (let i = 0; i < n; i++) {
    const a = rand(0, Math.PI * 2)
    const z = rand(-1, 1)
    const flat = Math.sqrt(1 - z * z)
    const v = reach * 2.3 * flat * rand(0.92, 1.05)
    const inner = flat < 0.55
    spark({
      x: r.x,
      y: r.y,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v,
      k: 2.3,
      g: 0.7,
      life: rand(1.3, 1.9),
      color: inner ? core : main,
      size: 2.6,
      trailLen: 8,
      crackle: shell.kind === 'crackle',
    })
  }
}

function step(dt: number, time: number): void {
  while (next < SHOW.length && SHOW[next].t <= time) launch(SHOW[next], next++)
  const gravity = 140 * s
  for (let i = rockets.length - 1; i >= 0; i--) {
    const r = rockets[i]
    r.age += dt
    r.x += r.vx * dt
    r.y += r.vy * dt
    r.vy += r.a * dt
    // Its trail: a few small sparks shed every frame, hot gold, short-lived.
    for (let j = 0; j < 2; j++) {
      spark({ x: r.x, y: r.y, vx: rand(-25, 25) * s, vy: rand(10, 50) * s, k: 3, g: 0.3, life: rand(0.25, 0.5), color: '#ffd9a0', size: 1.4, trailLen: 3, crackle: false })
    }
    if (r.age >= r.flight) {
      burst(r)
      rockets.splice(i, 1)
    }
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.age += dt
    if (p.age >= p.life) {
      particles.splice(i, 1)
      continue
    }
    const damp = Math.exp(-p.k * dt)
    p.vx *= damp
    p.vy = p.vy * damp + gravity * p.g * dt
    p.x += p.vx * dt
    p.y += p.vy * dt
    p.trail.unshift(p.x, p.y)
    if (p.trail.length > p.trailLen * 2) p.trail.length = p.trailLen * 2
  }
  for (let i = flashes.length - 1; i >= 0; i--) {
    flashes[i].age += dt
    if (flashes[i].age > 0.4) flashes.splice(i, 1)
  }
}

function draw(): void {
  if (!ctx) return
  ctx.clearRect(0, 0, w, h)
  ctx.globalCompositeOperation = 'lighter'
  // The sky lit by a burst.
  for (const f of flashes) {
    const glow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r)
    glow.addColorStop(0, '#fff')
    glow.addColorStop(0.25, f.color)
    glow.addColorStop(1, 'transparent')
    ctx.globalAlpha = 0.28 * (1 - f.age / 0.4)
    ctx.fillStyle = glow
    ctx.fillRect(f.x - f.r, f.y - f.r, f.r * 2, f.r * 2)
  }
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  for (const p of particles) {
    const left = 1 - p.age / p.life
    let alpha = left ** 1.4
    // Crackle: the last third twinkles out in glitter.
    if (p.crackle && left < 0.35) alpha *= Math.random() < 0.45 ? 1.4 : 0.1
    // White-hot at first, then its colour.
    ctx.strokeStyle = p.age < 0.12 ? '#fff' : p.crackle && left < 0.35 ? '#fff6d8' : p.color
    const t = p.trail
    // The whole trail faint, its newest part bright.
    ctx.globalAlpha = alpha * 0.3
    ctx.lineWidth = p.size * s
    ctx.beginPath()
    ctx.moveTo(t[0], t[1])
    for (let j = 2; j < t.length; j += 2) ctx.lineTo(t[j], t[j + 1])
    ctx.stroke()
    ctx.globalAlpha = Math.min(1, alpha)
    ctx.lineWidth = p.size * 1.15 * s
    ctx.beginPath()
    ctx.moveTo(t[0], t[1])
    const end = Math.min(t.length, 6)
    for (let j = 2; j < end; j += 2) ctx.lineTo(t[j], t[j + 1])
    if (end <= 2) ctx.lineTo(t[0] + 0.1, t[1])
    ctx.stroke()
  }
  ctx.globalAlpha = 1
}

function frame(now: number): void {
  // A long pause (the app in the background) does not jump the show.
  const dt = Math.min(0.05, (now - last) / 1000)
  last = now
  step(dt, (now - start) / 1000)
  draw()
  if (next < SHOW.length || rockets.length || particles.length || flashes.length) raf = requestAnimationFrame(frame)
  else ctx?.clearRect(0, 0, w, h)
}

onMounted(() => {
  measure()
  window.addEventListener('resize', measure)
  start = last = performance.now()
  raf = requestAnimationFrame(frame)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', measure)
})
</script>

<template>
  <canvas ref="canvas" class="fireworks" aria-hidden="true" />
</template>

<style scoped>
.fireworks {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
