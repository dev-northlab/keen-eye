// Chapter 2 "city": pieces and the street composer shared by levels 16–30.
import { definePieces, generatedLevel, type Piece, type SceneBuilder } from '../generator.ts'

/** Wraps local markup (drawn around the anchor at 0,0) at (x, y) with scale s. */
const at = (x: number, y: number, s: number, body: string) => `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`

const BRIGHT = ['#e63946', '#3a86ff', '#ffb703', '#8ac926', '#ff006e', '#8338ec', '#fb8500']

/** Window, anchor at its center; `glass` depends on the time of day. */
const windowPiece = (glass: string, blink = false): Piece => ({
  bounds: [0, 1.5, 23],
  colors: ['#e63946', '#3a86ff', '#8ac926', '#ffb703', '#ff006e'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<rect x="-13" y="-16" width="26" height="32" fill="#f4efe6"/>` +
      `<rect x="-10" y="-13" width="20" height="26" fill="${glass}"/>` +
      `<path d="M-10 -13h9q-3 13 0 26h-9Z" fill="${c}"/>` +
      `<rect x="-14" y="15" width="28" height="4" fill="#d9d2c5"/>`),
  motion: blink ? () => ({ type: 'blink', period: 1.7, duty: 0.6 }) : undefined,
})

const door: Piece = {
  bounds: [0, -23, 28],
  colors: ['#6b4f3a', '#2a9d8f', '#e63946', '#3a86ff', '#264653'],
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<rect x="-16" y="-46" width="32" height="46" rx="3" fill="${c}"/>` +
      `<rect x="-11" y="-40" width="22" height="14" fill="#ffffff" fill-opacity="0.35"/>` +
      `<circle cx="9" cy="-20" r="2.5" fill="#ffd166"/>`),
}

/** Striped shop awning; anchor at the middle of its top edge. */
const awning: Piece = {
  bounds: [1, 13, 40],
  colors: ['#e63946', '#3a86ff', '#2a9d8f', '#fb8500', '#8338ec'],
  draw: (x, y, s, c) => {
    let stripes = ''
    for (let i = 0; i < 6; i++)
      stripes += `<path d="M${-36 + i * 12} 0h12l2 22h-16Z" fill="${i % 2 ? '#ffffff' : c}"/>`
    return at(x, y, s, stripes + `<path d="M-36 22q6 8 12 0q6 8 12 0q6 8 12 0q6 8 12 0q6 8 12 0q6 8 12 0" fill="${c}"/>`)
  },
}

/** Clock with hands; the whole face turns, so it reads as running hands. Anchor at its center. */
const clock: Piece = {
  bounds: [0, 0, 18],
  colors: ['#ffffff', '#fff3c4'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<circle r="16" fill="${c}" stroke="#333" stroke-width="3"/>` +
      `<path d="M0 0V-11M0 0H7" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>` +
      `<circle r="2" fill="#333"/>`),
  motion: (x, y) => ({ type: 'rotate', pivot: [x, y], period: 7 }),
}

/** Flag on a short pole, anchor at the pole's foot. Sways on the foot. */
const flag: Piece = {
  bounds: [16, -21, 28],
  colors: BRIGHT,
  asymmetric: true,
  draw: (x, y, s, c) => at(x, y, s, `<path d="M0 0V-42" stroke="#555" stroke-width="3"/><path d="M1 -42L34 -34L1 -24Z" fill="${c}"/>`),
  motion: (x, y) => ({ type: 'sway', angle: 7, pivot: [x, y], period: 1.6 }),
}

const lamp: Piece = {
  bounds: [12, -49, 52],
  colors: ['#2b2d42', '#3d5a80', '#6b4f3a'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<rect x="-3" y="-94" width="6" height="94" fill="${c}"/>` +
      `<path d="M0 -92q0 -6 20 -6" stroke="${c}" stroke-width="5" fill="none"/>` +
      `<path d="M14 -98h14l-3 10h-8Z" fill="${c}"/><circle cx="21" cy="-86" r="4" fill="#ffe066"/>`),
}

const pottedTree: Piece = {
  bounds: [0, -36, 44],
  colors: ['#4c9a3f', '#2d8a5a', '#7cb518'],
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M-12 0l-3 -16h30l-3 16Z" fill="#b5523b"/><rect x="-3" y="-40" width="6" height="26" fill="#8a5a33"/>` +
      `<circle cx="0" cy="-50" r="22" fill="${c}"/><circle cx="-12" cy="-40" r="12" fill="${c}"/><circle cx="12" cy="-42" r="12" fill="${c}"/>`),
  motion: (x, y, s) => ({ type: 'sway', angle: 3, pivot: [x, y - 14 * s], period: 3.2 }),
}

const bench: Piece = {
  bounds: [0, -13, 31],
  colors: ['#8a5a33', '#2a9d8f', '#e63946', '#3a86ff'],
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M-22 0v-12M22 0v-12" stroke="#333" stroke-width="3"/>` +
      `<rect x="-28" y="-14" width="56" height="5" rx="2" fill="${c}"/><rect x="-28" y="-26" width="56" height="5" rx="2" fill="${c}"/>`),
}

const hydrant: Piece = {
  bounds: [0, -12, 16],
  colors: ['#e63946', '#ffb703', '#3a86ff'],
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<rect x="-6" y="-20" width="12" height="20" rx="3" fill="${c}"/><rect x="-10" y="-14" width="20" height="5" rx="2" fill="${c}"/>` +
      `<path d="M-6 -20q6 -8 12 0Z" fill="${c}"/>`),
}

const mailbox: Piece = {
  bounds: [4, -21, 27],
  colors: ['#3a86ff', '#e63946', '#2a9d8f'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<rect x="-2" y="-20" width="4" height="20" fill="#555"/>` +
      `<path d="M-12 -20v-12a8 8 0 0 1 8 -8h8a8 8 0 0 1 8 8v12Z" fill="${c}"/>` +
      `<path d="M12 -32v-10h8v5h-8" fill="#e63946"/>`),
}

const bicycle: Piece = {
  bounds: [0, -16, 31],
  colors: ['#e63946', '#3a86ff', '#8ac926', '#ffb703'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<circle cx="-15" cy="-10" r="10" fill="none" stroke="#333" stroke-width="2.5"/><circle cx="15" cy="-10" r="10" fill="none" stroke="#333" stroke-width="2.5"/>` +
      `<path d="M-15 -10L-4 -26H10L15 -10M-4 -26L2 -10L10 -26M-8 -30h8M10 -26l-2 -6h6" stroke="${c}" stroke-width="3" fill="none" stroke-linejoin="round"/>`),
}

const cat: Piece = {
  bounds: [5, -14, 21],
  colors: ['#2b2b3a', '#f4a261', '#ffffff', '#8d99ae'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M8 -4q12 0 10 -16" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round"/>` +
      `<ellipse cx="0" cy="-8" rx="9" ry="8" fill="${c}" stroke="#555" stroke-width="0.8"/>` +
      `<circle cx="-2" cy="-19" r="6" fill="${c}" stroke="#555" stroke-width="0.8"/>` +
      `<path d="M-7 -22l1 -6l4 4ZM3 -22l-1 -6l-4 4Z" fill="${c}"/>`),
}

const pigeon: Piece = {
  bounds: [-1, -8, 16],
  colors: ['#8d99ae', '#6c757d', '#adb5bd'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M-2 0v-3M2 0v-3" stroke="#e76f51" stroke-width="1.5"/>` +
      `<path d="M-10 -8l-4 -2l4 -1Z" fill="${c}"/><ellipse cx="0" cy="-7" rx="8" ry="5" fill="${c}"/>` +
      `<circle cx="6" cy="-12" r="3.5" fill="${c}"/><path d="M9 -12l3 1l-3 1Z" fill="#f4a261"/>`),
  // Pecking: leans forward on its feet.
  motion: (x, y) => ({ type: 'sway', angle: 18, pivot: [x, y], period: 1.4 }),
}

const flowerPot: Piece = {
  bounds: [0, -13, 17],
  colors: ['#ff006e', '#ffb703', '#8338ec', '#e63946', '#ffffff'],
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<circle cx="-5" cy="-17" r="4" fill="${c}"/><circle cx="5" cy="-18" r="4" fill="${c}"/><circle cx="0" cy="-22" r="4" fill="${c}"/>` +
      `<path d="M-8 0l-2 -12h20l-2 12Z" fill="#b5523b"/>`),
}

const balloon: Piece = {
  bounds: [0, -20, 23],
  colors: BRIGHT,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M0 0q-4 -10 0 -16" stroke="#777" stroke-width="1.2" fill="none"/>` +
      `<ellipse cx="0" cy="-28" rx="10" ry="12" fill="${c}"/><path d="M-2 -16h4l-2 3Z" fill="${c}"/>`),
  motion: (_x, _y, s) => ({ type: 'bob', dx: 2 * s, dy: 7 * s, period: 2.4 }),
}

/** Car facing right, anchor on the road under its middle. Drives back and forth. */
const car = (range: number): Piece => ({
  bounds: [0, -16, 36],
  colors: BRIGHT,
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M-32 -8v-10q0 -4 4 -4h8l8 -10h22l10 10h8q4 0 4 4v10Z" fill="${c}"/>` +
      `<path d="M-9 -22l6 -8h8v8ZM9 -30h7l7 8h-14Z" fill="#cfe8f6"/>` +
      `<circle cx="-18" cy="-6" r="7" fill="#2b2b2b"/><circle cx="20" cy="-6" r="7" fill="#2b2b2b"/>` +
      `<circle cx="-18" cy="-6" r="2.5" fill="#ccc"/><circle cx="20" cy="-6" r="2.5" fill="#ccc"/>`),
  motion: (x, _y, s) => ({ type: 'path', points: [[0, 0], [range * s, 0]], flipX: x, period: 9 + range / 40 }),
})

const cloud: Piece = {
  bounds: [0, -8, 47],
  colors: ['#ffffff'],
  draw: (x, y, s) =>
    at(x, y, s, `<g fill="#ffffff"><ellipse rx="40" ry="16"/><circle cx="-14" cy="-10" r="16"/><circle cx="12" cy="-14" r="19"/></g>`),
  motion: (_x, _y, s) => ({ type: 'path', points: [[0, 0], [60 * s, 0]], period: 26 }),
}

const bird: Piece = {
  bounds: [0, -3, 14],
  colors: ['#2b2d42'],
  draw: (x, y, s, c) =>
    at(x, y, s, `<path d="M-12 0q6 -7 12 0q6 -7 12 0" stroke="${c}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  motion: () => ({ type: 'path', points: [[0, 0], [-90, 12], [-170, -6]], period: 11 }),
}

/** Traffic light with a blinking amber lamp; anchor at the pole's foot. */
const trafficLight: Piece = {
  bounds: [0, -42, 44],
  colors: ['#2b2d42', '#264653'],
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<rect x="-2.5" y="-50" width="5" height="50" fill="#555"/>` +
      `<rect x="-10" y="-84" width="20" height="40" rx="4" fill="${c}"/>` +
      `<circle cy="-76" r="5" fill="#e63946"/><circle cy="-64" r="5" fill="#ffb703"/><circle cy="-52" r="5" fill="#8ac926"/>`),
}

definePieces('city', {
  window: windowPiece('#bde3f2'),
  door,
  awning,
  clock,
  flag,
  lamp,
  pottedTree,
  bench,
  hydrant,
  mailbox,
  bicycle,
  cat,
  pigeon,
  flowerPot,
  balloon,
  car: car(100),
  cloud,
  bird,
  trafficLight,
})

const SKIES = {
  day: { sky: ['#a9daf2', '#bfe6f7'], glass: '#bde3f2', disc: '#ffd23f', far: '#c9d6df' },
  evening: { sky: ['#f6a57b', '#fcd29f'], glass: '#ffe9a8', disc: '#ff7b54', far: '#d9a5a0' },
  night: { sky: ['#1d2b53', '#2e3f73'], glass: '#ffd166', disc: '#fff3c4', far: '#3c4a78' },
}

export interface CityOptions {
  id: number
  title: string
  parTimeSec: number
  differences: number
  motion: number
  sky: keyof typeof SKIES
  /** Facade colors of the street, left to right (3–5 buildings). */
  facades: string[]
  /** Shop awnings over the doors. */
  shops?: boolean
  cars?: number
  /** Extra pieces on the sidewalk (benches, trees, bicycles…). */
  busy?: number
}

function composeStreet(o: CityOptions, b: SceneBuilder) {
  const { rand, pick } = b
  const t = SKIES[o.sky]
  // Sky, far skyline, street
  let skyline = ''
  for (let x = 0; x < 800; x += 40 + Math.round(rand() * 30)) {
    const h = 60 + Math.round(rand() * 90)
    skyline += `<rect x="${x}" y="${300 - h}" width="${36 + Math.round(rand() * 20)}" height="${h}" fill="${t.far}"/>`
  }
  b.backdrop(
    `<rect width="800" height="500" fill="${t.sky[0]}"/><rect y="150" width="800" height="150" fill="${t.sky[1]}"/>` +
      `<circle cx="${620 + Math.round(rand() * 120)}" cy="70" r="30" fill="${t.disc}"/>` +
      skyline +
      `<rect y="330" width="800" height="45" fill="#cfcfcf"/><rect y="372" width="800" height="5" fill="#9e9e9e"/>` +
      `<rect y="377" width="800" height="78" fill="#4a4e57"/>` +
      `<path d="M0 416H800" stroke="#f4f1ea" stroke-width="4" stroke-dasharray="30 24"/>` +
      `<rect y="455" width="800" height="45" fill="#d9d9d9"/><rect y="455" width="800" height="4" fill="#9e9e9e"/>`,
  )
  if (o.sky !== 'night') for (let i = 0; i < 2; i++) b.add(cloud, 80 + i * 330 + rand() * 120, 50 + rand() * 50, { s: 0.7 + rand() * 0.4 })

  // Buildings with windows, doors, shop awnings, clocks and flags
  const n = o.facades.length
  const width = 800 / n
  o.facades.forEach((color, i) => {
    const x0 = i * width + 4
    const w = width - 8
    const top = 120 + Math.round(rand() * 60)
    b.add(
      {
        bounds: [x0 + w / 2, (top + 330) / 2, 0],
        colors: [color],
        draw: () =>
          `<rect x="${x0}" y="${top}" width="${w}" height="${330 - top}" fill="${color}"/>` +
          `<rect x="${x0 - 4}" y="${top - 8}" width="${w + 8}" height="10" fill="#000000" fill-opacity="0.18"/>`,
      },
      0,
      0,
      { fixed: true },
    )
    const cols = Math.max(2, Math.floor(w / 48))
    const rows = Math.floor((250 - top) / 50)
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const wx = x0 + (w / cols) * (c + 0.5)
        const wy = top + 38 + r * 50
        b.add(windowPiece(t.glass, o.sky === 'night' && rand() < 0.12), wx, wy, { still: rand() < 0.5 })
      }
    const doorX = x0 + w * (0.3 + rand() * 0.4)
    b.add(door, doorX, 330)
    if (o.shops) b.add(awning, doorX + (doorX < x0 + w / 2 ? 50 : -50), 272, { s: 0.8 })
    if (rand() < 0.35) b.add(clock, x0 + w / 2, top + 14, { s: 0.9 })
    else if (rand() < 0.6) b.add(flag, x0 + w * 0.2, top - 6, { s: 0.8 })
  })

  b.add(bird, 450 + rand() * 250, 90 + rand() * 40)

  // Sidewalk furniture along the back sidewalk (feet at y ≈ 368), spread out
  const props: Piece[] = [lamp, pottedTree, bench, hydrant, mailbox, bicycle, flowerPot, cat, trafficLight]
  const count = 6 + (o.busy ?? 0)
  for (let i = 0; i < count; i++) {
    const x = 40 + ((i + rand() * 0.6) * 720) / count
    b.add(pick(props), x, 368 + Math.round(rand() * 4))
  }
  // Traffic
  for (let i = 0; i < (o.cars ?? 1); i++) {
    const range = 160 + Math.round(rand() * 200)
    b.add(car(range), 60 + rand() * (700 - range), i % 2 ? 446 : 408)
  }
  // Front sidewalk: pigeons, balloons, flower pots
  const front: Piece[] = [pigeon, pigeon, flowerPot, balloon, hydrant]
  for (let i = 0; i < 5; i++) b.add(pick(front), 50 + i * 160 + rand() * 80, 490)
}

export const cityLevel = (o: CityOptions) =>
  generatedLevel({
    id: o.id,
    chapter: 'city',
    title: o.title,
    parTimeSec: o.parTimeSec,
    differences: o.differences,
    motion: o.motion,
    compose: (b) => composeStreet(o, b),
  })
