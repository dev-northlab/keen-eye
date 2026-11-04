// Motion differences: the middle crab waves its claw only on picture B; the little fish in the right pool darts faster on B.
import { svgLevel } from '../helpers.ts'
import { bucket, crab, flipFlops, gull, seaUrchin, seaweed, shell, snorkelMask, starfish, sunglasses, sunHat, waves } from './shapes.ts'

/** Crab body without its right claw; (x, y) = bottom center. Bounds: x ±20, y from −18 to 0. */
const crabBody = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-14 -4l-6 4M-10 -2l-4 2M10 -2l4 2M14 -4l6 4" stroke="${color}" stroke-width="2.5"/>` +
  `<ellipse cy="-8" rx="14" ry="8" fill="${color}"/><path d="M-12 -12l-6 -6" stroke="${color}" stroke-width="3"/><circle cx="-19" cy="-19" r="4" fill="${color}"/>` +
  `<circle cx="-4" cy="-17" r="2" fill="#222"/><circle cx="4" cy="-17" r="2" fill="#222"/></g>`
/** Right claw of `crabBody` at (x, y). Pivot (x + 12, y − 12). Bounds: x from +10 to +24, y from −24 to −10. */
const claw = (x: number, y: number, color: string) => `<path d="M${x + 12} ${y - 12}l6 -6" stroke="${color}" stroke-width="3"/><circle cx="${x + 19}" cy="${y - 19}" r="4" fill="${color}"/>`

/** Hermit crab in a spiral shell; (x, y) = bottom center. Bounds: x ±14, y from −20 to 0. */
const hermit = (x: number, y: number) =>
  `<circle cx="${x + 2}" cy="${y - 10}" r="10" fill="#e9c46a"/><path d="M${x + 2} ${y - 10}m-5 0a5 5 0 1 1 5 5" stroke="#c9a04a" stroke-width="2" fill="none"/>` +
  `<path d="M${x - 8} ${y - 4}l-6 2M${x - 8} ${y - 8}l-6 -4" stroke="#e05a47" stroke-width="2.5"/><circle cx="${x - 10}" cy="${y - 14}" r="2" fill="#222"/>`

/** Periwinkle snail with `stripes` stripes; (x, y) = bottom center. Bounds: x ±12, y from −14 to 0. */
const periwinkle = (x: number, y: number, stripes: number) => {
  let s = `<path d="M${x - 12} ${y}q0 -14 12 -14q10 0 10 10q0 4 -4 4Z" fill="#8a6a9a"/>`
  for (let i = 1; i <= stripes; i++) s += `<path d="M${x - 10 + i * 5} ${y - 12}q2 6 0 12" stroke="#f4ecd8" stroke-width="3" fill="none"/>`
  return s
}

/** Anemone; (x, y) = base, tentacle length h. */
const anemone = (x: number, y: number, h: number, color = '#ff6b8b') => {
  let d = ''
  for (let i = -3; i <= 3; i++) d += `M${x + i * 4} ${y}q${i * 2} ${-h * 0.6} ${i * 3.4} ${-h}`
  return `<path d="${d}" stroke="${color}" stroke-width="3.5" stroke-linecap="round" fill="none"/><ellipse cx="${x}" cy="${y}" rx="14" ry="4" fill="#c94a6a"/>`
}

const mussel = (x: number, y: number, a: number) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="5" fill="#2b3a5a" transform="rotate(${a} ${x} ${y})"/>`

const barnacle = (x: number, y: number) => `<path d="M${x - 5} ${y}l2 -7h6l2 7Z" fill="#e9e3d0"/>`

const snail = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-14 0q0 -6 6 -6h18v6Z" fill="#c9b79c"/><circle cx="2" cy="-9" r="8" fill="#b5803f"/><path d="M2 -9m-4 0a4 4 0 1 1 4 4" stroke="#8a5a33" stroke-width="1.5" fill="none"/></g>`

const minnow = (x: number, y: number) => `<g transform="translate(${x} ${y})"><ellipse rx="8" ry="3.5" fill="#f2a93b"/><path d="M-6 0l-6 -4v8Z" fill="#f2a93b"/><circle cx="5" cy="-1" r="1" fill="#222"/></g>`

const pool = (x: number, y: number, rx: number, ry: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx + 6}" ry="${ry + 5}" fill="#6f6a60"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#7cc4e4"/>` +
  `<path d="M${x - rx * 0.5} ${y - ry * 0.4}q${rx * 0.2} -6 ${rx * 0.4} 0" stroke="#d6eefa" stroke-width="2" fill="none"/>`

export default svgLevel({
  id: 138,
  chapter: 'sea',
  title: 'crabPools',
  parTimeSec: 100,
  scene: ({ diff, anim, rand }) => {
    let speckles = ''
    for (let i = 0; i < 50; i++) speckles += `<circle cx="${(rand() * 800).toFixed(1)}" cy="${(160 + rand() * 340).toFixed(1)}" r="${(1 + rand() * 2).toFixed(1)}" fill="#6f6a60"/>`
    let barnacles = ''
    for (const [x, y] of [[40, 200], [52, 204], [64, 198], [420, 176], [432, 180], [744, 186], [756, 190], [768, 186], [260, 330], [272, 334]]) barnacles += barnacle(x, y)
    const waving = (moving: boolean) => (moving ? anim({ type: 'sway', angle: 26, pivot: [312, 336], period: 1.2 }, claw(300, 348, '#e63946')) : claw(300, 348, '#e63946'))
    const darting = (period: number) => anim({ type: 'bob', dx: 10, dy: 2, period }, minnow(540, 234))

    return (
      `<rect width="800" height="500" fill="#cfe9fb"/>` + gull(200, 50) + anim({ type: 'path', points: [[0, 0], [-140, 16]], period: 14 }, gull(620, 40)) +
      `<rect y="90" width="800" height="70" fill="#3a9fd0"/>` + waves(120, 13, 64, '#5cb8e0', 160) +
      // Rocks
      `<path d="M0 160Q120 140 260 170T520 160T800 166V500H0Z" fill="#a39b8a"/>` + speckles +
      `<path d="M0 300Q80 270 160 300T360 290M400 360Q520 330 640 360T800 350" stroke="#8d8577" stroke-width="5" fill="none"/>` +
      barnacles +
      // Pools
      pool(180, 250, 120, 50) + pool(560, 230, 140, 46) + pool(360, 412, 150, 50) + pool(680, 424, 90, 36) +
      anim({ type: 'sway', angle: 10, pivot: [100, 270], period: 2.6 }, seaweed(100, 270, 1, '#2a9d8f')) +
      anim({ type: 'sway', angle: 10, pivot: [640, 250], period: 3 }, seaweed(640, 250, 0.9, '#4caf6a')) +
      diff(206, 246, 22, starfish(206, 250, '#ff9f43'), starfish(206, 250, '#f28a4a')) + starfish(260, 266, '#ff6b8b') +
      minnow(470, 220) + diff(540, 234, 26, darting(2), darting(0.8)) +
      anemone(420, 420, 22, '#ffb3d9') + diff(300, 404, 26, anemone(300, 420, 20), anemone(300, 420, 26)) +
      diff(420, 456, 26, snail(414, 462), snail(426, 462)) +
      diff(622, 422, 22, periwinkle(622, 428, 2), periwinkle(622, 428, 3)) + periwinkle(700, 434, 2) +
      // Crabs and the hermit
      diff(120, 334, 26, crab(120, 344, '#e63946'), crab(120, 344, '#e2603a')) +
      crabBody(300, 348, '#e63946') + diff(316, 326, 22, waving(false), waving(true)) +
      diff(470, 330, 22, '', hermit(470, 340)) +
      // Mussels and shells
      mussel(664, 320, 20) + mussel(676, 312, -10) + diff(690, 324, 22, mussel(690, 324, 30), '') + mussel(702, 316, -20) +
      shell(560, 330, '#ffd1dc') + diff(760, 470, 22, shell(760, 476, '#ffb84d'), `<g transform="rotate(40 760 470)">${shell(760, 476, '#ffb84d')}</g>`) +
      shell(220, 470, '#f4f1e8') + bucket(60, 480, '#ff006e') +
      `<path d="M500 490l40 -40" stroke="#a0703f" stroke-width="3"/><circle cx="548" cy="442" r="12" fill="none" stroke="#3d4a55" stroke-width="2"/><path d="M540 434l16 16M556 434l-16 16" stroke="#3d4a55" stroke-width="1"/>` +
      flipFlops(110, 420) +
      sunHat(380, 302) +
      snorkelMask(580, 362) +
      seaUrchin(680, 464) +
      sunglasses(150, 470)
    )
  },
})
