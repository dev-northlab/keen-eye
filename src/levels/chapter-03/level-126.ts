// Motion differences: the ant on the grass blade runs faster on picture B; the caterpillar wiggles only on B.
import { svgLevel } from '../helpers.ts'
import { snail } from '../shapes.ts'
import { acorn, feather, leafPile, pineCone } from './shapes.ts'

/** Ant, faces right (or left with `flip`); (x, y) = middle. Bounds: x ±11, y ±6. */
const ant = (x: number, y: number, flip = false, load = '') =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><path d="M-4 1l-4 5M0 1v6M4 1l4 5M-4 -1l-4 -5M4 -1l5 -4M8 -2l4 -4" stroke="#2b1d14" stroke-width="1.2" fill="none"/>` +
  `<ellipse cx="-6" rx="4.5" ry="3.5" fill="#3a2414"/><circle r="2.5" fill="#3a2414"/><circle cx="6" cy="-1" r="3" fill="#3a2414"/>${load}</g>`

/** Grass blade from (x, y) curving to (x + dx, y − h). */
const blade = (x: number, y: number, dx: number, h: number, color: string, w = 14) =>
  `<path d="M${x - w / 2} ${y}Q${x} ${y - h * 0.6} ${x + dx} ${y - h}Q${x + w * 0.2} ${y - h * 0.5} ${x + w / 2} ${y}Z" fill="${color}"/>`

/** Ladybug; (x, y) = center. Bounds: x ±11, y ±9. */
const ladybug = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y}) rotate(-30)"><circle cx="9" r="4" fill="#222"/><ellipse rx="9" ry="8" fill="${color}"/><path d="M0 -8v16" stroke="#222" stroke-width="1.5"/>` +
  `<circle cx="-4" cy="-3" r="2" fill="#222"/><circle cx="4" cy="3" r="2" fill="#222"/><circle cx="-3" cy="4" r="1.6" fill="#222"/><circle cx="4" cy="-4" r="1.6" fill="#222"/></g>`

/** Dandelion seed head; (x, y) = center, radius r. */
const dandelion = (x: number, y: number, r: number) => {
  let d = ''
  for (let a = 0; a < 360; a += 20) {
    const t = (a * Math.PI) / 180
    d += `M${x} ${y}L${(x + Math.cos(t) * r).toFixed(1)} ${(y + Math.sin(t) * r).toFixed(1)}`
  }
  return `<path d="${d}" stroke="#ffffff" stroke-width="1.8"/><circle cx="${x}" cy="${y}" r="${r * 0.18}" fill="#c9b79c"/>`
}

/** Clover leaf of three hearts; (x, y) = center. Bounds: radius 18. */
const clover = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#4f9a3f">` +
  [0, 120, 240].map((a) => `<path d="M0 0C-12 -6 -12 -18 -3 -18C0 -18 0 -16 0 -14C0 -16 0 -18 3 -18C12 -18 12 -6 0 0Z" transform="rotate(${a})"/>`).join('') +
  `<circle r="2" fill="#3f7a2f"/></g>`

/** Caterpillar, segments to the right of (x, y). Bounds: x from −6 to +40, y ±8. */
const caterpillar = (x: number, y: number) =>
  [0, 8, 16, 24, 32].map((d, i) => `<circle cx="${x + d}" cy="${y - (i % 2) * 2}" r="${i === 0 ? 7 : 6}" fill="${i === 0 ? '#5a9a2a' : '#7fbf3a'}"/>`).join('') +
  `<circle cx="${x - 2}" cy="${y - 2}" r="1.4" fill="#222"/><path d="M${x - 2} ${y - 7}l-3 -4M${x + 2} ${y - 7}l1 -4" stroke="#3a5a1a" stroke-width="1.5"/>`

const pebble = (x: number, y: number, rx: number, color: string) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * 0.65}" fill="${color}"/><ellipse cx="${x - rx * 0.3}" cy="${y - rx * 0.25}" rx="${rx * 0.3}" ry="${rx * 0.15}" fill="#fff" fill-opacity="0.3"/>`

const dew = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="6" fill="#d8f2ff" fill-opacity="0.85"/><circle cx="${x - 2}" cy="${y - 2}" r="2" fill="#fff"/>`

export default svgLevel({
  id: 126,
  chapter: 'forest',
  title: 'anthill',
  parTimeSec: 105,
  scene: ({ diff, anim, rand }) => {
    let far = ''
    for (let i = 0; i < 30; i++) far += blade(rand() * 800, 340, -20 + rand() * 40, 120 + rand() * 120, '#a3c98c', 18)
    let grains = ''
    for (let i = 0; i < 110; i++) {
      const a = rand() * Math.PI
      const d = rand()
      grains += `<circle cx="${(400 + Math.cos(a) * 160 * d).toFixed(1)}" cy="${(390 - Math.sin(a) * 100 * d).toFixed(1)}" r="${(1.5 + rand() * 2).toFixed(1)}" fill="${rand() < 0.5 ? '#8a5a33' : '#d9b07a'}"/>`
    }
    let trail = ''
    const trailAnts: [number, number, string][] = [[40, 470, ''], [110, 466, `<circle cx="10" cy="-6" r="4" fill="#fff6dc"/>`], [250, 450, `<path d="M6 -4l10 -8l2 6Z" fill="#7fbf3a"/>`], [300, 436, ''], [478, 420, ''], [520, 408, '']]
    for (const [x, y, load] of trailAnts) trail += ant(x, y, false, load)
    const running = (period: number) => anim({ type: 'bob', dx: 5, dy: -10, period }, ant(330, 262, false))
    const wiggle = (moving: boolean) => (moving ? anim({ type: 'sway', angle: 10, pivot: [586, 304], period: 1 }, caterpillar(586, 304)) : caterpillar(586, 304))

    return (
      `<rect width="800" height="500" fill="#bfdcae"/><circle cx="560" cy="80" r="70" fill="#fff8d6" fill-opacity="0.5"/>` + far +
      // Anthill mound
      `<ellipse cx="400" cy="420" rx="200" ry="130" fill="#b98a5a"/><ellipse cx="400" cy="440" rx="240" ry="80" fill="#a87a4a"/>` + grains +
      `<ellipse cx="400" cy="320" rx="14" ry="8" fill="#3a2414"/><ellipse cx="330" cy="380" rx="10" ry="6" fill="#3a2414"/><ellipse cx="470" cy="372" rx="11" ry="6" fill="#3a2414"/>` +
      `<rect y="460" width="800" height="40" fill="#8f6a44"/>` +
      trail + diff(180, 460, 22, ant(180, 462), '') +
      ant(390, 334, true) + ant(440, 350, false, `<rect x="6" y="-10" width="6" height="6" fill="#f4f1e8"/>`) + ant(350, 360, true) +
      // Tall blades with visitors
      blade(120, 500, 30, 360, '#5fae4b', 22) + blade(160, 500, -40, 300, '#4c9a3f', 18) + blade(330, 500, 10, 300, '#6fbf5a', 18) +
      blade(620, 500, -30, 260, '#4c9a3f', 20) + blade(700, 500, 20, 420, '#5fae4b', 16) + blade(760, 500, -10, 220, '#6fbf5a', 18) +
      blade(260, 500, 20, 340, '#5fae4b', 16) + blade(40, 500, 10, 200, '#6fbf5a', 20) +
      diff(124, 222, 22, ladybug(124, 222, '#d62828'), ladybug(124, 222, '#e2502a')) +
      dew(150, 340) + diff(272, 196, 22, '', dew(272, 196)) +
      diff(330, 262, 24, running(2.4), running(1)) +
      `<path d="M700 500Q690 300 700 160" stroke="#7fae5a" stroke-width="4" fill="none"/>` +
      diff(700, 150, 30, dandelion(700, 150, 22), dandelion(700, 150, 27)) +
      diff(604, 300, 28, wiggle(false), wiggle(true)) +
      // Ground bits
      diff(60, 420, 26, clover(60, 420), `<g transform="rotate(40 60 420)">${clover(60, 420)}</g>`) +
      pebble(220, 484, 16, '#9aa39a') + diff(522, 474, 24, pebble(514, 480, 14, '#b3aaa0'), pebble(528, 480, 14, '#b3aaa0')) +
      pebble(600, 488, 18, '#8d99ae') + pebble(760, 480, 12, '#b3aaa0') +
      `<circle cx="660" cy="470" r="8" fill="#c1121f"/><circle cx="672" cy="476" r="7" fill="#c1121f"/><path d="M664 462q4 -8 10 -6" stroke="#4c7a2f" stroke-width="2" fill="none"/>` +
      acorn(390, 492) +
      feather(455, 482) +
      pineCone(115, 492) +
      leafPile(728, 494) +
      snail(280, 494)
    )
  },
})
