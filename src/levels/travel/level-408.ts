// Baku: the Flame Towers on the hill, the Maiden Tower and the old city walls, a carpet stall on the
// seaside boulevard and a sailing boat on the Caspian Sea.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { cloud, gull, lampPost, person, sky, sun, water } from './shapes.ts'

const STONE = '#d8b98a'

/** Flame-shaped glass tower from x0 to x1 standing at `base`, its tip at (tx, ty). */
function flameTower(x0: number, x1: number, base: number, tx: number, ty: number) {
  const mid = ty + (base - ty) * 0.4
  let floors = ''
  for (let y = base - 12; y > mid - 30; y -= 12) floors += `<path d="M${x0} ${y}H${x1}" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.6"/>`
  return `<path d="M${x0} ${base}L${x0} ${mid}Q${x0} ${ty + 40} ${tx} ${ty}Q${x1 + 6} ${ty + 46} ${x1} ${mid}L${x1} ${base}Z" fill="#4f7fbf"/>${floors}`
}

/** Old city wall from x0 to x1, top at y, with battlement teeth every 22 except at `skip`. */
function wall(x0: number, x1: number, y: number, skip: number) {
  let teeth = ''
  for (let x = x0 + 4; x + 12 <= x1; x += 22) if (x !== skip) teeth += tooth(x, y)
  return `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="${400 - y}" fill="${STONE}"/><path d="M${x0} ${y + 30}H${x1}M${x0} ${y + 60}H${x1}" stroke="#c4a372" stroke-width="2"/>${teeth}`
}
/** Battlement tooth; (x, y) = bottom left on the wall top. Bounds: 12 × 14 above y. */
const tooth = (x: number, y: number) => `<rect x="${x}" y="${y - 14}" width="12" height="14" fill="${STONE}"/>`

/** Maiden Tower: a round stone tower with a buttress; (x, y) = foot in the middle. Bounds: x from −38 to +58, y from −210 to 0. */
const maidenTower = (x: number, y: number) =>
  `<rect x="${x + 30}" y="${y - 170}" width="28" height="170" fill="#c9a874"/>` +
  `<rect x="${x - 38}" y="${y - 200}" width="76" height="200" fill="${STONE}"/><rect x="${x - 40}" y="${y - 210}" width="80" height="12" rx="3" fill="#c4a372"/>` +
  [-160, -120, -80, -40].map((dy) => `<path d="M${x - 38} ${y + dy}H${x + 38}" stroke="#c4a372" stroke-width="2"/>`).join('') +
  [-56, -140].map((dy) => slit(x, y + dy)).join('') +
  `<path d="M${x - 14} ${y}V${y - 26}a14 14 0 0 1 28 0V${y}Z" fill="#6b4a3a"/>`
/** Narrow window of the Maiden Tower centered at (x, y). Bounds: x ±3, y ±10. */
const slit = (x: number, y: number) => `<rect x="${x - 3}" y="${y - 10}" width="6" height="20" rx="3" fill="#6b4a3a"/>`

/** Hanging carpet with a medallion; (x, y) = top left, 72 × 96. The medallion is separate. */
function carpet(x: number, y: number, field: string) {
  let fringe = ''
  for (let fx = x + 4; fx < x + 72; fx += 6) fringe += `<path d="M${fx} ${y + 96}v6" stroke="#f4ead2" stroke-width="2"/>`
  return (
    `<rect x="${x}" y="${y}" width="72" height="96" fill="${field}"/><rect x="${x + 5}" y="${y + 5}" width="62" height="86" fill="none" stroke="#f2c94c" stroke-width="3"/>` +
    `<rect x="${x + 11}" y="${y + 11}" width="50" height="74" fill="none" stroke="#1d3557" stroke-width="2" stroke-dasharray="4 3"/>${fringe}`
  )
}
/** Diamond medallion in the middle of a carpet at (x, y) (its top left). Bounds: x from +20 to +52, y from +30 to +66. */
const medallion = (x: number, y: number, color: string) =>
  `<path d="M${x + 36} ${y + 30}L${x + 52} ${y + 48}L${x + 36} ${y + 66}L${x + 20} ${y + 48}Z" fill="${color}"/><circle cx="${x + 36}" cy="${y + 48}" r="5" fill="#f4ead2"/>`

/** Sailing boat; (x, y) = waterline middle. The sail is separate. Bounds of the sail: x from +2 to +30, y from −62 to −12. */
const boat = (x: number, y: number) =>
  `<path d="M${x - 30} ${y - 8}H${x + 32}L${x + 24} ${y + 4}H${x - 22}Z" fill="#ffffff"/><path d="M${x} ${y - 8}V${y - 64}" stroke="#3d4a55" stroke-width="2"/>`
const sail = (x: number, y: number, color: string) => `<path d="M${x + 2} ${y - 62}L${x + 30} ${y - 12}H${x + 2}Z" fill="${color}"/>`

/** Gull standing; (x, y) = feet. Bounds: x ±12, y from −16 to 0. */
const standingGull = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 8}" rx="10" ry="6" fill="#ffffff"/><circle cx="${x - 8}" cy="${y - 12}" r="4" fill="#ffffff"/>` +
  `<path d="M${x - 12} ${y - 12}l-3 1l3 1Z" fill="#f2b33d"/><path d="M${x + 2} ${y - 10}l10 -2l-4 5Z" fill="#8d99ae"/><path d="M${x - 2} ${y - 2}v2M${x + 2} ${y - 2}v2" stroke="#f2b33d" stroke-width="1.6"/>`

export default travelLevel({
  id: 408,
  title: 'baku',
  parTimeSec: 76,
  place: { region: 'caucasus', country: 'az', lat: 40.41, lon: 49.87 },
  scene: ({ diff, anim, rand, extra }) =>
    sky('#a9d6ef') +
    sun(90, 80) +
    anim({ type: 'path', points: [[0, 0], [70, 0]], period: 46 }, cloud(380, 80, 0.55)) +
    gull(470, 130) +
    // Hill with the Flame Towers
    `<path d="M480 380Q600 250 800 262V380Z" fill="#8fae6a"/>` +
    flameTower(580, 626, 320, 600, 168) +
    flameTower(644, 700, 300, 672, 118) +
    diff(672, 166, 42, '', `<path d="M652 200Q652 160 672 132Q694 162 692 200Z" fill="#f28c28"/>`) +
    flameTower(716, 762, 320, 738, 178) +
    // Old city walls and the Maiden Tower
    wall(0, 520, 300, 334) +
    diff(340, 293, 22, tooth(334, 300), '') +
    maidenTower(190, 400) +
    diff(190, 304, 22, slit(190, 304), '') +
    // Seaside boulevard with the carpet stall
    `<rect y="400" width="800" height="26" fill="#d9cdb8"/><path d="M0 426H800" stroke="#8d99ae" stroke-width="3"/>` +
    water(428, '#3f8fb5', rand, 10) +
    `<path d="M30 400V312M120 400V312M24 314H126" stroke="#7a5233" stroke-width="5"/>` +
    carpet(39, 318, '#b23a48') +
    diff(75, 366, 26, medallion(39, 318, '#2b59c3'), medallion(39, 318, '#2a9d8f')) +
    person(156, 412, '#2a9d8f', true, '#e0b48a', '#1d1d1d') +
    lampPost(440, 412) +
    `<rect x="432" y="316" width="16" height="6" rx="2" fill="#3d4a55"/>` +
    diff(440, 308, 22, standingGull(440, 316), '') +
    person(560, 414, '#f28fb1', false, '#e0b48a', '#3a2a1c') +
    boat(640, 476) +
    diff(656, 440, 30, sail(640, 476, '#ffffff'), sail(640, 476, '#ffd23f')) +
    // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
    decor({ anim }, [
      ['buoy', 96, 480, '#ffd23f'],
      ['bottle', 524, 472],
      ['buoy', 304, 472, '#e63946'],
      ['butterfly', 676, 336, '#ffd23f'],
      ['birds', 276, 144],
      ['cloud', 584, 60],
      ['birds', 88, 236],
    ]) +
    extras({ extra, anim }, [
      ['bottle', 728, 476],
      ['lifeRing', 420, 456],
      ['stones', 596, 348],
      ['balloon', 464, 208, '#ffd23f'],
      ['birds', 180, 52],
    ]),
})
