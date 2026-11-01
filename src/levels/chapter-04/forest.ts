// Chapter 4 "forest": pieces and the composer shared by levels 46–60.
import { definePieces, generatedLevel, type Piece, type SceneBuilder } from '../generator.ts'

const at = (x: number, y: number, s: number, body: string) => `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`

const pine: Piece = {
  bounds: [0, -60, 64],
  colors: ['#2d6a4f', '#40916c', '#1b4332'],
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<rect x="-6" y="-24" width="12" height="24" fill="#7f5539"/>` +
      `<path d="M0 -120L-30 -70H-14L-40 -40H-18L-46 -18H46L18 -40H40L14 -70H30Z" fill="${c}"/>`),
}

const oak: Piece = {
  bounds: [0, -62, 64],
  colors: ['#52b788', '#74c69d', '#95d5b2', '#e9c46a'],
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<rect x="-8" y="-50" width="16" height="50" rx="4" fill="#7f5539"/>` +
      `<circle cx="-24" cy="-62" r="26" fill="${c}"/><circle cx="24" cy="-64" r="26" fill="${c}"/><circle cx="0" cy="-86" r="34" fill="${c}"/>`),
}

const bush: Piece = {
  bounds: [0, -18, 32],
  colors: ['#40916c', '#52b788', '#2d6a4f'],
  draw: (x, y, s, c) =>
    at(x, y, s, `<circle cx="-16" cy="-14" r="14" fill="${c}"/><circle cx="16" cy="-14" r="14" fill="${c}"/><circle cx="0" cy="-24" r="18" fill="${c}"/>`),
}

const berryBush: Piece = {
  bounds: [0, -18, 32],
  colors: ['#d62839', '#3a0ca3', '#ff9f1c'],
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<circle cx="-16" cy="-14" r="14" fill="#40916c"/><circle cx="16" cy="-14" r="14" fill="#40916c"/><circle cx="0" cy="-24" r="18" fill="#52b788"/>` +
      [[-16, -16], [-4, -30], [10, -22], [18, -10], [-8, -8], [4, -14]].map(([bx, by]) => `<circle cx="${bx}" cy="${by}" r="3.5" fill="${c}"/>`).join('')),
}

const mushroom: Piece = {
  bounds: [1, -12, 17],
  colors: ['#e63946', '#a0522d', '#f4a261', '#9d4edd'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M-4 0q-2 -8 0 -14h8q2 6 0 14Z" fill="#fff3d6"/>` +
      `<path d="M-15 -12Q-12 -28 2 -28Q16 -26 15 -12Z" fill="${c}"/>` +
      `<circle cx="-6" cy="-19" r="2.5" fill="#ffffff"/><circle cx="5" cy="-22" r="2" fill="#ffffff"/>`),
}

const flower: Piece = {
  bounds: [0, -13, 15],
  colors: ['#ff6b8b', '#ffffff', '#b38cff', '#ffd23f', '#4dabf7'],
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M0 0V-16" stroke="#3f8f3a" stroke-width="2.5"/>` +
      `<g fill="${c}"><circle cx="0" cy="-24" r="4"/><circle cx="-5" cy="-19" r="4"/><circle cx="5" cy="-19" r="4"/>` +
      `<circle cx="-3" cy="-13" r="3.5"/><circle cx="3" cy="-13" r="3.5"/></g><circle cx="0" cy="-18" r="3" fill="#ffe36e"/>`),
  motion: (x, y) => ({ type: 'sway', angle: 6, pivot: [x, y], period: 2.8 }),
}

const fern: Piece = {
  bounds: [0, -18, 24],
  colors: ['#52b788', '#40916c', '#74c69d'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M0 0Q-4 -20 -18 -32M0 0Q2 -22 4 -38M0 0Q6 -18 18 -28" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round"/>`),
  motion: (x, y) => ({ type: 'sway', angle: 5, pivot: [x, y], period: 3.4 }),
}

const stump: Piece = {
  bounds: [0, -12, 24],
  colors: ['#9c6644', '#7f5539', '#b08968'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M-18 0l4 -22h28l4 22Z" fill="${c}"/><ellipse cx="0" cy="-22" rx="14" ry="5" fill="#ddb892"/>` +
      `<path d="M-6 -22a6 2 0 1 0 12 0" stroke="#b08968" fill="none"/><path d="M14 -10q8 -6 10 2" stroke="${c}" stroke-width="4" fill="none"/>`),
}

const log: Piece = {
  bounds: [0, -11, 34],
  colors: ['#9c6644', '#7f5539'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<rect x="-30" y="-20" width="56" height="20" rx="8" fill="${c}"/><ellipse cx="26" cy="-10" rx="6" ry="10" fill="#ddb892"/>` +
      `<circle cx="26" cy="-10" r="4" fill="none" stroke="#b08968"/><path d="M-18 -20l-4 -8" stroke="#52b788" stroke-width="3"/>`),
}

const stone: Piece = {
  bounds: [0, -9, 22],
  colors: ['#adb5bd', '#8d99ae', '#ced4da'],
  asymmetric: true,
  draw: (x, y, s, c) => at(x, y, s, `<path d="M-20 0Q-18 -16 -4 -18Q12 -20 20 0Z" fill="${c}"/>`),
}

const fox: Piece = {
  bounds: [2, -16, 39],
  colors: ['#f77f00', '#e76f51', '#bc6c25'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M-14 -16Q-36 -24 -30 -6Q-24 4 -10 -8Z" fill="${c}"/><path d="M-30 -8q-4 4 0 6" stroke="#ffffff" stroke-width="5"/>` +
      `<path d="M-8 -2v-4M8 -2v-4" stroke="#3d2c22" stroke-width="5" stroke-linecap="round"/>` +
      `<ellipse cx="0" cy="-14" rx="16" ry="10" fill="${c}"/>` +
      `<path d="M12 -20l4 -14l6 10l6 -10l2 14q-4 10 -18 0Z" fill="${c}"/><path d="M26 -16l10 4l-10 2Z" fill="#ffffff"/>` +
      `<circle cx="36" cy="-12" r="2" fill="#222"/><circle cx="22" cy="-18" r="1.8" fill="#222"/>`),
}

const hedgehog: Piece = {
  bounds: [2, -9, 22],
  colors: ['#6f4e37', '#8d6e63', '#5c4033'],
  asymmetric: true,
  draw: (x, y, s, c) => {
    let spikes = ''
    for (let i = 0; i < 7; i++) spikes += `<path d="M${-16 + i * 4} -6l-4 -12l8 6Z" fill="${c}"/>`
    return at(x, y, s, spikes + `<ellipse cx="0" cy="-8" rx="18" ry="9" fill="${c}"/><path d="M14 -12l10 6l-10 4Z" fill="#e9c9a8"/><circle cx="23" cy="-6" r="1.8" fill="#222"/><circle cx="16" cy="-10" r="1.5" fill="#222"/>`)
  },
}

/** Owl on a branch stub, anchor at its feet; turns its head (sways). */
const owl: Piece = {
  bounds: [0, -20, 22],
  colors: ['#a0522d', '#8d99ae', '#ddb892'],
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<ellipse cx="0" cy="-18" rx="14" ry="18" fill="${c}"/><path d="M-12 -32l2 -8l6 6M12 -32l-2 -8l-6 6" fill="${c}"/>` +
      `<circle cx="-6" cy="-24" r="5.5" fill="#fff3c4"/><circle cx="6" cy="-24" r="5.5" fill="#fff3c4"/>` +
      `<circle cx="-6" cy="-24" r="2.5" fill="#222"/><circle cx="6" cy="-24" r="2.5" fill="#222"/><path d="M-2 -18h4l-2 4Z" fill="#ffb703"/>`),
  motion: (x, y) => ({ type: 'sway', angle: 10, pivot: [x, y], period: 2.6 }),
}

const squirrel: Piece = {
  bounds: [-5, -18, 23],
  colors: ['#bc6c25', '#dda15e', '#9c6644'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M-6 -6Q-26 -10 -18 -30Q-10 -38 -8 -24" stroke="${c}" stroke-width="10" fill="none" stroke-linecap="round"/>` +
      `<ellipse cx="2" cy="-10" rx="9" ry="11" fill="${c}"/><circle cx="8" cy="-24" r="7" fill="${c}"/>` +
      `<path d="M6 -30l2 -6l3 5Z" fill="${c}"/><circle cx="11" cy="-25" r="1.5" fill="#222"/><circle cx="8" cy="-8" r="3" fill="#7f5539"/>`),
}

const rabbit: Piece = {
  bounds: [0, -20, 24],
  colors: ['#f8f9fa', '#ced4da', '#d4a373'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<ellipse cx="-2" cy="-10" rx="13" ry="10" fill="${c}" stroke="#adb5bd" stroke-width="0.8"/><circle cx="-14" cy="-12" r="4" fill="#ffffff"/>` +
      `<circle cx="10" cy="-20" r="7" fill="${c}" stroke="#adb5bd" stroke-width="0.8"/>` +
      `<ellipse cx="8" cy="-32" rx="2.5" ry="8" fill="${c}" stroke="#adb5bd" stroke-width="0.8"/><ellipse cx="13" cy="-31" rx="2.5" ry="8" fill="${c}" stroke="#adb5bd" stroke-width="0.8"/>` +
      `<circle cx="13" cy="-21" r="1.5" fill="#222"/>`),
}

const snail = (range: number): Piece => ({
  bounds: [2, -9, 20],
  colors: ['#e9c46a', '#f4a261', '#c77dff'],
  asymmetric: true,
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<path d="M-14 0H14q4 -4 2 -10l2 -8M14 -10l-4 -8" stroke="#d4a373" stroke-width="3" fill="none" stroke-linecap="round"/>` +
      `<circle cx="-2" cy="-10" r="10" fill="${c}"/><path d="M-2 -10m-5 0a5 5 0 1 0 5 -5" stroke="#9c6644" stroke-width="2" fill="none"/>`),
  motion: (x, _y, s) => ({ type: 'path', points: [[0, 0], [range * s, 0]], flipX: x, period: 16 + range / 10 }),
})

const butterfly: Piece = {
  bounds: [0, -2, 13],
  colors: ['#ff8fab', '#ffd23f', '#4dabf7', '#c77dff'],
  draw: (x, y, s, c) =>
    at(x, y, s,
      `<ellipse cx="-6" cy="-3" rx="6" ry="9" fill="${c}" transform="rotate(-25 -6 -3)"/><ellipse cx="6" cy="-3" rx="6" ry="9" fill="${c}" transform="rotate(25 6 -3)"/>` +
      `<rect x="-1" y="-9" width="2" height="15" rx="1" fill="#333"/>`),
  motion: (_x, _y, s) => ({ type: 'path', points: [[0, 0], [-50 * s, -26 * s], [-96 * s, 0], [-50 * s, 22 * s]], period: 6.5 }),
}

const firefly: Piece = {
  bounds: [0, 0, 8],
  colors: ['#fff3a3', '#d8f3dc'],
  draw: (x, y, s, c) => at(x, y, s, `<circle r="7" fill="${c}" fill-opacity="0.35"/><circle r="3" fill="${c}"/>`),
  motion: () => ({ type: 'blink', period: 1.8, duty: 0.55 }),
}

const bird: Piece = {
  bounds: [0, -3, 14],
  colors: ['#2b2d42'],
  draw: (x, y, s, c) => at(x, y, s, `<path d="M-12 0q6 -7 12 0q6 -7 12 0" stroke="${c}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  motion: () => ({ type: 'path', points: [[0, 0], [-110, 14], [-200, -8]], period: 12 }),
}

definePieces('forest', {
  pine,
  oak,
  bush,
  berryBush,
  mushroom,
  flower,
  fern,
  stump,
  log,
  stone,
  fox,
  hedgehog,
  owl,
  squirrel,
  rabbit,
  snail: snail(60),
  butterfly,
  firefly,
  bird,
})

const TIMES = {
  morning: { sky: ['#cdeffd', '#e8f7fd'], hills: ['#a7d7a0', '#8cc98a'], ground: '#7cbf6b', disc: '#ffe066' },
  autumn: { sky: ['#fde2c5', '#fcefdc'], hills: ['#e9c46a', '#d4a373'], ground: '#b5c96a', disc: '#ffb703' },
  night: { sky: ['#14213d', '#22305a'], hills: ['#28406b', '#1f3357'], ground: '#2f5d50', disc: '#fff3c4' },
}

export interface ForestOptions {
  id: number
  title: string
  parTimeSec: number
  differences: number
  motion: number
  time: keyof typeof TIMES
  /** Small pieces on the forest floor (flowers, mushrooms, ferns): 20–100. */
  density: number
  /** Subtle differences (levels 51+). */
  subtle?: boolean
}

function composeForest(o: ForestOptions, b: SceneBuilder) {
  const { rand, pick } = b
  const t = TIMES[o.time]
  let far = ''
  for (let x = -20; x < 820; x += 34 + Math.round(rand() * 20)) {
    const h = 50 + Math.round(rand() * 60)
    far += `<path d="M${x} 290L${x + 18} ${290 - h}L${x + 36} 290Z" fill="${t.hills[1]}"/>`
  }
  b.backdrop(
    `<rect width="800" height="500" fill="${t.sky[0]}"/><rect y="120" width="800" height="180" fill="${t.sky[1]}"/>` +
      `<circle cx="${90 + Math.round(rand() * 160)}" cy="70" r="30" fill="${t.disc}"/>` +
      `<ellipse cx="200" cy="300" rx="380" ry="80" fill="${t.hills[0]}"/><ellipse cx="640" cy="300" rx="320" ry="70" fill="${t.hills[0]}"/>` +
      far +
      `<rect y="290" width="800" height="210" fill="${t.ground}"/>`,
  )
  // Tree line
  for (let i = 0; i < 7; i++) b.add(pick([pine, pine, oak]), 30 + i * 120 + rand() * 40, 300 + rand() * 20, { s: 0.9 + rand() * 0.3, fixed: rand() < 0.6 })
  // Middle ground: bushes, stumps, logs, stones and animals, spread across
  const middle: Piece[] = [bush, berryBush, stump, log, stone, fox, hedgehog, squirrel, rabbit, owl]
  for (let i = 0; i < 9; i++) b.add(pick(middle), 40 + i * 85 + rand() * 40, 360 + rand() * 40, { s: 0.9 + rand() * 0.3 })
  // Forest floor: many small things
  const floor: Piece[] = [flower, flower, mushroom, fern, stone, mushroom]
  for (let i = 0; i < o.density; i++) b.add(pick(floor), 15 + rand() * 770, 420 + (i % 4) * 20 + rand() * 12, { s: 0.6 + rand() * 0.3, still: rand() < 0.6 })
  b.add(snail(60), 60 + rand() * 600, 494)
  // Air
  if (o.time === 'night')
    for (let i = 0; i < 6; i++) b.add(firefly, 40 + rand() * 720, 180 + rand() * 200)
  else {
    b.add(bird, 450 + rand() * 300, 70 + rand() * 50)
    for (let i = 0; i < 2; i++) b.add(butterfly, 200 + rand() * 500, 200 + rand() * 100)
  }
}

export const forestLevel = (o: ForestOptions) =>
  generatedLevel({
    id: o.id,
    chapter: 'forest',
    title: o.title,
    parTimeSec: o.parTimeSec,
    differences: o.differences,
    motion: o.motion,
    subtle: o.subtle,
    compose: (b) => composeForest(o, b),
  })
