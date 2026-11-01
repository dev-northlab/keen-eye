// Chapter 3 "sea": underwater pieces and the composer shared by levels 31–45.
import { definePieces, generatedLevel, type Piece, type SceneBuilder } from '../generator.ts'

const at = (x: number, y: number, s: number, body: string) => `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`

const FISH_COLORS = ['#ff9f1c', '#ffbf69', '#e63946', '#3a86ff', '#ffd23f', '#8338ec', '#06d6a0']

/** Fish facing right, anchor at its middle; swims back and forth over `range`. */
const fish = (range: number): Piece => ({
  bounds: [-2, 0, 24],
  colors: FISH_COLORS,
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M-14 0L-26 -10V10Z" fill="${c}"/>` +
      `<ellipse cx="0" cy="0" rx="18" ry="11" fill="${c}"/>` +
      `<path d="M-4 -10q4 -8 10 -2" fill="${c}"/>` +
      `<path d="M-2 -9v18" stroke="#ffffff" stroke-width="3" stroke-opacity="0.6"/>` +
      `<circle cx="9" cy="-3" r="3" fill="#ffffff"/><circle cx="10" cy="-3" r="1.6" fill="#222"/>`),
  motion: (x, _y, s) => ({ type: 'path', points: [[0, 0], [range * s, 0]], flipX: x, period: 7 + range / 40 }),
})

const jellyfish: Piece = {
  bounds: [0, 4, 26],
  colors: ['#ff8fab', '#c77dff', '#90e0ef', '#ffafcc'],
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M-12 0q-4 14 0 26M-4 0q4 14 0 28M4 0q-4 14 0 28M12 0q4 14 0 26" stroke="${c}" stroke-width="2.5" fill="none"/>` +
      `<path d="M-18 2Q-18 -20 0 -20Q18 -20 18 2Q9 6 0 2Q-9 6 -18 2Z" fill="${c}" fill-opacity="0.9"/>` +
      `<circle cx="-6" cy="-9" r="3" fill="#ffffff" fill-opacity="0.6"/>`),
  motion: (_x, _y, s) => ({ type: 'bob', dx: 0, dy: 9 * s, period: 3.4 }),
}

/** Seaweed rising from the anchor; sways on its foot. */
const seaweed: Piece = {
  bounds: [0, -36, 38],
  colors: ['#2a9d8f', '#52b788', '#40916c', '#95d5b2'],
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M0 0C-12 -20 12 -40 0 -70" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/>` +
      `<path d="M-8 0C-18 -14 -4 -30 -12 -48" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
      `<path d="M8 0C16 -16 4 -28 12 -44" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>`),
  motion: (x, y) => ({ type: 'sway', angle: 7, pivot: [x, y], period: 3 }),
}

const coral: Piece = {
  bounds: [0, -28, 32],
  colors: ['#ff6b6b', '#ff9f1c', '#c77dff', '#ff8fab', '#f15bb5'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M0 0V-30M0 -18L-16 -34V-48M0 -24L14 -40V-52M-16 -34L-24 -42M14 -40L22 -46" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
}

const rock: Piece = {
  bounds: [0, -12, 30],
  colors: ['#8d99ae', '#6c757d', '#a3a3a3'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s, `<path d="M-28 0Q-26 -20 -10 -24Q4 -30 16 -18Q28 -12 26 0Z" fill="${c}"/><path d="M-14 -16q8 -4 14 0" stroke="#ffffff" stroke-opacity="0.35" stroke-width="3" fill="none"/>`),
}

const shell: Piece = {
  bounds: [0, -8, 13],
  colors: ['#ffcad4', '#f4a261', '#ffe5d9', '#e9c46a'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M-11 0Q-12 -16 0 -18Q12 -16 11 0Z" fill="${c}" stroke="#c9a28a" stroke-width="1"/>` +
      `<path d="M0 0V-16M-6 0L-4 -15M6 0L4 -15" stroke="#c9a28a" stroke-width="1.2"/><path d="M-4 0h8l-1 3h-6Z" fill="${c}"/>`),
}

const starfish: Piece = {
  bounds: [0, -12, 15],
  colors: ['#ff6b6b', '#ff9f1c', '#ffd23f', '#c77dff'],
  draw: (x, y, s, c) => {
    let pts = ''
    for (let i = 0; i < 10; i++) {
      const a = (i * Math.PI) / 5 - Math.PI / 2
      const r = i % 2 ? 5.5 : 13
      pts += `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r - 12).toFixed(1)} `
    }
    return at(x, y, s, `<polygon points="${pts}" fill="${c}" stroke-linejoin="round" stroke="${c}" stroke-width="2"/>`)
  },
}

const crab: Piece = {
  bounds: [0, -11, 28],
  colors: ['#e63946', '#ff9f1c', '#f15bb5'],
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M-10 -4l-8 4M-8 -2l-6 6M10 -4l8 4M8 -2l6 6" stroke="${c}" stroke-width="2.5"/>` +
      `<path d="M-12 -12l-6 -8M12 -12l6 -8" stroke="${c}" stroke-width="3"/>` +
      `<circle cx="-19" cy="-23" r="5" fill="${c}"/><circle cx="19" cy="-23" r="5" fill="${c}"/>` +
      `<ellipse cx="0" cy="-8" rx="14" ry="9" fill="${c}"/>` +
      `<path d="M-4 -16v-5M4 -16v-5" stroke="#222" stroke-width="1.5"/><circle cx="-4" cy="-22" r="2" fill="#222"/><circle cx="4" cy="-22" r="2" fill="#222"/>`),
  motion: (x, y) => ({ type: 'sway', angle: 6, pivot: [x, y], period: 1.2 }),
}

const bubbles: Piece = {
  bounds: [1, -21, 23],
  colors: ['#e0fbfc'],
  draw: (x, y, s) =>
    at(x, y, s,
      `<g fill="none" stroke="#e0fbfc" stroke-width="1.5"><circle cx="0" cy="-6" r="5"/><circle cx="6" cy="-22" r="4"/><circle cx="-2" cy="-36" r="6"/></g>`),
  motion: (_x, _y, s) => ({ type: 'bob', dx: 2 * s, dy: -8 * s, period: 2.2 }),
}

const chest: Piece = {
  bounds: [0, -24, 35],
  colors: ['#8a5a33', '#a0522d', '#6b4f3a'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<rect x="-24" y="-24" width="48" height="24" fill="${c}" stroke="#4a3220" stroke-width="2"/>` +
      `<path d="M-24 -24L-20 -42H24L24 -24Z" fill="${c}" stroke="#4a3220" stroke-width="2"/>` +
      `<path d="M-16 -42L-18 -24M16 -42V-24" stroke="#ffd166" stroke-width="3"/><rect x="-4" y="-28" width="8" height="9" fill="#ffd166"/>` +
      `<circle cx="-6" cy="-44" r="3" fill="#ffd166"/><circle cx="2" cy="-46" r="3.5" fill="#ffd166"/>`),
}

const turtle = (range: number): Piece => ({
  bounds: [4, 0, 38],
  colors: ['#52b788', '#2a9d8f', '#95d5b2'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M-14 8l-10 10M14 8l10 10M-14 -8l-10 -10M14 -8l10 -10" stroke="#74c69d" stroke-width="7" stroke-linecap="round"/>` +
      `<circle cx="28" cy="0" r="8" fill="#74c69d"/><circle cx="31" cy="-2" r="1.6" fill="#222"/>` +
      `<ellipse cx="0" cy="0" rx="22" ry="16" fill="${c}"/>` +
      `<path d="M-10 -8l6 8l-6 8M10 -8l-6 8l6 8M-4 0h8" stroke="#1b4332" stroke-width="2" fill="none"/>`),
  motion: (x, _y, s) => ({ type: 'path', points: [[0, 0], [range * s, -20 * s]], flipX: x, period: 12 + range / 40 }),
})

const octopus: Piece = {
  bounds: [0, -9, 35],
  colors: ['#f15bb5', '#c77dff', '#ff9f1c', '#e63946'],
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M-14 -6q-12 12 -8 20M-6 -2q-4 14 -2 18M6 -2q4 14 2 18M14 -6q12 12 8 20" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
      `<ellipse cx="0" cy="-20" rx="16" ry="18" fill="${c}"/>` +
      `<circle cx="-6" cy="-18" r="3.5" fill="#ffffff"/><circle cx="6" cy="-18" r="3.5" fill="#ffffff"/>` +
      `<circle cx="-6" cy="-18" r="1.8" fill="#222"/><circle cx="6" cy="-18" r="1.8" fill="#222"/>`),
  motion: (_x, _y, s) => ({ type: 'bob', dx: 0, dy: 7 * s, period: 2.6 }),
}

const seahorse: Piece = {
  bounds: [4, -17, 27],
  colors: ['#ffd23f', '#ff9f1c', '#f15bb5', '#06d6a0'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M0 -36q12 -4 10 6q-4 4 -2 12q4 14 -6 20q-10 4 -8 -6q2 -4 6 -2" stroke="${c}" stroke-width="8" fill="none" stroke-linecap="round"/>` +
      `<path d="M8 -38l10 -2l-2 6Z" fill="${c}"/><circle cx="4" cy="-34" r="1.8" fill="#222"/>`),
  motion: (_x, _y, s) => ({ type: 'bob', dx: 0, dy: 6 * s, period: 2.9 }),
}

const submarine = (range: number): Piece => ({
  bounds: [-3, -11, 48],
  colors: ['#ffd23f', '#ff9f1c', '#e63946'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M-4 -24v-14h10v4" stroke="#555" stroke-width="3" fill="none"/>` +
      `<rect x="-12" y="-28" width="22" height="12" rx="4" fill="${c}"/>` +
      `<ellipse cx="0" cy="0" rx="40" ry="18" fill="${c}"/>` +
      `<path d="M-40 0l-6 -10v20Z" fill="#555"/>` +
      `<circle cx="-12" cy="0" r="6" fill="#bde3f2" stroke="#555" stroke-width="2"/><circle cx="8" cy="0" r="6" fill="#bde3f2" stroke="#555" stroke-width="2"/>`),
  motion: (x, _y, s) => ({ type: 'path', points: [[0, 0], [range * s, 0]], flipX: x, period: 14 + range / 40 }),
})

definePieces('sea', {
  fish: fish(100),
  jellyfish,
  seaweed,
  coral,
  rock,
  shell,
  starfish,
  crab,
  bubbles,
  chest,
  turtle: turtle(100),
  octopus,
  seahorse,
  submarine: submarine(100),
})

const WATERS = {
  shallow: { bands: ['#7fdbda', '#5fc9d3', '#43b3c8', '#3399b8'], sand: '#f2d8a7', far: '#4fa7b9' },
  reef: { bands: ['#48cae4', '#00b4d8', '#0096c7', '#0077b6'], sand: '#f4e1b5', far: '#2f8fb5' },
  deep: { bands: ['#1d6fa3', '#185d8c', '#144b75', '#103a5e'], sand: '#c9b38a', far: '#1a4f78' },
}

export interface SeaOptions {
  id: number
  title: string
  parTimeSec: number
  differences: number
  motion: number
  water: keyof typeof WATERS
  fish?: number
  /** Featured piece of the level. */
  feature?: 'chest' | 'turtle' | 'submarine' | 'octopus'
}

function composeSea(o: SeaOptions, b: SceneBuilder) {
  const { rand, pick } = b
  const w = WATERS[o.water]
  let rays = ''
  for (let i = 0; i < 4; i++) {
    const x = 80 + i * 200 + rand() * 60
    rays += `<path d="M${x} 0L${x + 40} 0L${x + 140} 420L${x + 60} 420Z" fill="#ffffff" fill-opacity="0.08"/>`
  }
  let dunes = ''
  for (let x = -40; x < 800; x += 160) dunes += `<ellipse cx="${x + 80}" cy="${430 + rand() * 10}" rx="120" ry="26" fill="${w.sand}"/>`
  b.backdrop(
    w.bands.map((c, i) => `<rect y="${i * 110}" width="800" height="${i === 3 ? 170 : 110}" fill="${c}"/>`).join('') +
      rays +
      `<path d="M0 400Q120 330 240 380T480 360T800 370V430H0Z" fill="${w.far}"/>` +
      dunes +
      `<rect y="440" width="800" height="60" fill="${w.sand}"/>`,
  )

  // Bottom: seaweed and corals in the back, rocks, then the feature
  for (let i = 0; i < 9; i++) b.add(pick([seaweed, seaweed, coral]), 30 + i * 90 + rand() * 40, 440 + rand() * 6, { s: 0.8 + rand() * 0.5 })
  for (let i = 0; i < 3; i++) b.add(rock, 100 + i * 260 + rand() * 100, 470 + rand() * 10, { s: 0.9 + rand() * 0.4 })
  if (o.feature === 'chest') b.add(chest, 300 + rand() * 200, 478)
  if (o.feature === 'octopus') b.add(octopus, 300 + rand() * 200, 470)

  // Small things on the sand
  const sand: Piece[] = [shell, starfish, crab, shell, starfish]
  for (let i = 0; i < 7; i++) b.add(pick(sand), 40 + i * 110 + rand() * 50, 488 + rand() * 6)

  // Water: bubbles, jellyfish, seahorses, swimming fish
  for (let i = 0; i < 3; i++) b.add(bubbles, 60 + i * 260 + rand() * 120, 330 + rand() * 60)
  for (let i = 0; i < 2; i++) b.add(jellyfish, 120 + i * 420 + rand() * 120, 70 + rand() * 60, { s: 0.9 + rand() * 0.3 })
  b.add(seahorse, 40 + rand() * 720, 250 + rand() * 60)
  if (o.feature === 'turtle') b.add(turtle(180), 120 + rand() * 300, 200 + rand() * 60)
  if (o.feature === 'submarine') b.add(submarine(160), 120 + rand() * 300, 120 + rand() * 40)
  const lanes = o.fish ?? 4
  for (let i = 0; i < lanes; i++) {
    const range = 120 + Math.round(rand() * 160)
    b.add(fish(range), 40 + rand() * (720 - range), 150 + (i * 220) / lanes + rand() * 30, { s: 0.7 + rand() * 0.5 })
  }
}

export const seaLevel = (o: SeaOptions) =>
  generatedLevel({
    id: o.id,
    chapter: 'sea',
    title: o.title,
    parTimeSec: o.parTimeSec,
    differences: o.differences,
    motion: o.motion,
    compose: (b) => composeSea(o, b),
  })
