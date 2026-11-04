// Singapore: Marina Bay Sands with its sky park, the Supertrees, the observation wheel, the lotus-shaped
// museum, a bumboat on the bay, an orchid and the Merlion spouting water.
// Motion difference: the Merlion's water stream ripples quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { cloud, sky, sun, water } from './shapes.ts'

/** Observation wheel centered at (cx, cy), radius r; capsules separate. */
function wheel(cx: number, cy: number, r: number) {
  let s = `<path d="M${cx} ${cy}L${cx - 50} 330M${cx} ${cy}L${cx + 50} 330" stroke="#c9d6e3" stroke-width="6"/>`
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6
    s += `<path d="M${cx} ${cy}L${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}" stroke="#c9d6e3" stroke-width="1.2"/>`
  }
  return s + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#eef2f5" stroke-width="5"/>`
}
const capsule = (cx: number, cy: number, r: number, i: number) => {
  const a = (i * Math.PI) / 6
  return `<ellipse cx="${(cx + Math.cos(a) * r).toFixed(1)}" cy="${(cy + Math.sin(a) * r).toFixed(1)}" rx="8" ry="6" fill="#bde3f2" stroke="#7aa6d6" stroke-width="2"/>`
}

/** Supertree; (x, y) = foot, canopy at `top`. The canopy is separate. */
const supertree = (x: number, y: number, top: number) =>
  `<path d="M${x - 10} ${y}L${x - 4} ${top + 20}H${x + 4}L${x + 10} ${y}Z" fill="#7a5a8a"/>` +
  [0.25, 0.5, 0.75].map((k) => `<path d="M${x - 9} ${y - (y - top) * k}L${x + 9} ${y - (y - top) * k - 14}" stroke="#a87fbf" stroke-width="2"/>`).join('') +
  `<path d="M${x - 4} ${top + 20}L${x - 30} ${top + 2}H${x + 30}L${x + 4} ${top + 20}Z" fill="#8a6a9a"/>`
/** Canopy of a Supertree at (x, top). Bounds: x ±34, y from −8 to +10. */
const canopy = (x: number, top: number, color: string) =>
  `<ellipse cx="${x}" cy="${top}" rx="34" ry="9" fill="${color}"/>` +
  [-24, -8, 8, 24].map((dx) => `<circle cx="${x + dx}" cy="${top - 2}" r="3" fill="#ffffff" fill-opacity="0.6"/>`).join('')

/** Marina Bay Sands: three towers on the ground at 330, the sky park on top. The cantilever and a light band are separate. */
const marinaBay = () =>
  [470, 535, 600].map((x) => `<path d="M${x} 330L${x + 6} 124H${x + 34}L${x + 40} 330Z" fill="#c9d6e3"/><path d="M${x + 20} 124V330" stroke="#a9b8c9" stroke-width="2"/>`).join('') +
  `<path d="M456 112H650L656 124H462Z" fill="#8fa3bf"/><path d="M470 112Q540 98 640 106" fill="none" stroke="#3f9b4b" stroke-width="5"/>`
/** Cantilever end of the sky park. Bounds: x from 650 to 702, y from 106 to 124. */
const cantilever = () => `<path d="M650 112H698L702 118L656 124Z" fill="#8fa3bf"/>`
/** Light band across the middle tower. Bounds: x from 543 to 573, y from 216 to 224. */
const lightBand = (color: string) => `<rect x="543" y="216" width="30" height="8" fill="${color}"/>`

/** Lotus-shaped museum on the bank; (x, y) = middle of its base. Petal tips at the given points; the one at `last` is separate. */
const museum = (x: number, y: number, tips: [number, number][]) =>
  tips.map(([tx, ty]) => `<path d="M${x - 10} ${y}Q${tx - 14} ${ty + 24} ${tx} ${ty}Q${tx + 14} ${ty + 24} ${x + 10} ${y}Z" fill="#fbfbf7" stroke="#d6dde3" stroke-width="1.4"/>`).join('')
/** Glass end on a petal tip at (x, y). Bounds: circle of radius 6. */
const petalTip = (x: number, y: number) => `<circle cx="${x}" cy="${y + 2}" r="5" fill="#7aa6d6"/>`

/** Bumboat; (x, y) = waterline middle. Bounds: x ±40, y from −30 to +4. */
const bumboat = (x: number, y: number, color: string) =>
  `<path d="M${x - 40} ${y - 12}H${x + 40}L${x + 30} ${y + 4}H${x - 30}Z" fill="${color}"/><rect x="${x - 26}" y="${y - 30}" width="52" height="18" fill="#f4ead2"/>` +
  [-18, -2, 14].map((dx) => `<rect x="${x + dx}" y="${y - 26}" width="8" height="8" fill="#4b5d73"/>`).join('')

/** Merlion on its pedestal, facing left; (x, y) = foot of the pedestal. */
const merlion = (x: number, y: number) =>
  `<rect x="${x - 34}" y="${y - 60}" width="68" height="60" fill="#a3aab3"/>` +
  `<path d="M${x - 20} ${y - 60}Q${x - 26} ${y - 96} ${x - 6} ${y - 110}Q${x + 30} ${y - 100} ${x + 22} ${y - 60}Z" fill="#f4f4f4"/>` +
  `<path d="M${x + 18} ${y - 64}Q${x + 44} ${y - 70} ${x + 40} ${y - 96}Q${x + 30} ${y - 80} ${x + 14} ${y - 80}" fill="#f4f4f4"/>` +
  `<circle cx="${x - 10}" cy="${y - 118}" r="22" fill="#e8e8e8"/><circle cx="${x - 16}" cy="${y - 118}" r="15" fill="#f4f4f4"/>` +
  `<circle cx="${x - 22}" cy="${y - 124}" r="2" fill="#3d4a55"/><path d="M${x - 30} ${y - 110}h8" stroke="#3d4a55" stroke-width="2"/>`
/** Water stream from the Merlion's mouth arcing into the bay. Bounds: x from 610 to 700, y from 340 to 424. */
const stream = () =>
  `<path d="M700 372Q648 334 612 420" fill="none" stroke="#bde3f2" stroke-width="7" stroke-linecap="round"/>` +
  [[640, 362], [624, 384], [616, 404]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#e8f6fc"/>`).join('')

/** Orchid in a pot; (x, y) = bottom of the pot. The flowers are separate. */
const pot = (x: number, y: number) =>
  `<path d="M${x} ${y - 20}Q${x - 4} ${y - 44} ${x + 10} ${y - 56}" fill="none" stroke="#3f8f3a" stroke-width="3"/><path d="M${x - 12} ${y - 20}h24l-4 20h-16Z" fill="#c96b4f"/>`
const flowers = (x: number, y: number, color: string) =>
  [[2, -44], [8, -54], [14, -60]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="5.5" fill="${color}"/><circle cx="${x + dx}" cy="${y + dy}" r="2" fill="#ffd23f"/>`).join('')

const PETALS: [number, number][] = [[64, 268], [92, 252], [130, 246], [168, 252]]

export default travelLevel({
  id: 423,
  title: 'singapore',
  parTimeSec: 116,
  place: { region: 'asia', country: 'sg', lat: 1.29, lon: 103.85 },
  scene: ({ diff, anim, rand, extra }) => {
    const ripple = (period: number) => anim({ id: 'spout', type: 'bob', dx: 0, dy: 3, period }, stream())
    return (
      sky('#a3d6f0') +
      sun(380, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 44 }, cloud(420, 150, 0.45)) +
      wheel(130, 160, 90) +
      [...Array(12).keys()].filter((i) => i !== 0).map((i) => capsule(130, 160, 90, i)).join('') +
      diff(220, 160, 18, capsule(130, 160, 90, 0), '') +
      // Gardens by the Bay
      supertree(260, 330, 180) +
      canopy(260, 180, '#c2589a') +
      supertree(320, 330, 150) +
      diff(320, 151, 36, canopy(320, 150, '#c2589a'), canopy(320, 150, '#f28c28')) +
      supertree(380, 330, 196) +
      canopy(380, 196, '#c2589a') +
      diff(290, 217, 26, `<path d="M266 214H314" stroke="#d6dde3" stroke-width="4"/><path d="M266 220H314" stroke="#a9b8c9" stroke-width="2"/>`, '') +
      // Marina Bay Sands
      marinaBay() +
      diff(676, 118, 28, cantilever(), '') +
      diff(558, 220, 18, lightBand('#ffd23f'), lightBand('#c9d6e3')) +
      // The bay
      water(330, '#3a8fbf', rand, 14) +
      `<rect y="318" width="230" height="16" fill="#cfc8ba"/>` +
      museum(120, 320, PETALS) +
      museum(120, 320, [[198, 268]]) +
      PETALS.map(([x, y]) => petalTip(x, y)).join('') +
      diff(198, 270, 18, petalTip(198, 268), '') +
      diff(300, 419, 44, bumboat(300, 432, '#d62828'), bumboat(300, 432, '#3a86ff')) +
      `<rect y="466" width="420" height="34" fill="#cfc8ba"/>` +
      pot(80, 496) +
      diff(88, 444, 22, flowers(80, 496, '#b04fbf'), flowers(80, 496, '#ffffff')) +
      merlion(724, 470) +
      diff(654, 390, 62, ripple(0.8), ripple(2), 'spout') +
      // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
      decor({ anim }, [
        ['buoy', 536, 364, '#ffd23f'],
        ['bottle', 168, 412],
        ['buoy', 368, 364, '#e63946'],
        ['bottle', 464, 480],
        ['balloon', 552, 40, '#ffd23f'],
        ['birds', 288, 52],
        ['cloud', 708, 228],
      ]) +
      extras({ extra, anim }, [
        ['bollard', 228, 492],
        ['lifeRing', 72, 372],
        ['buoy', 568, 472, '#ffd23f'],
        ['bottle', 240, 356],
        ['balloon', 432, 224, '#ffd23f'],
      ])
    )
  },
})
