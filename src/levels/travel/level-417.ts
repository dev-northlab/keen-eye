// Barcelona: the spires of the Sagrada Família with a construction crane, a palm with a parakeet, the
// mosaic bench and the mosaic lizard of Park Güell.
// Motion difference: the load on the crane hook swings quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { cloud, palm, person, sky, sun } from './shapes.ts'

/** Spire of the basilica; (x, tip) = top, foot at y = 300. The pinnacle and windows are separate. */
const spire = (x: number, tip: number) =>
  `<path d="M${x - 15} 300L${x - 10} ${tip + 40}Q${x} ${tip - 4} ${x + 10} ${tip + 40}L${x + 15} 300Z" fill="#c9a27a"/>` +
  `<path d="M${x - 6} ${tip + 30}L${x + 6} ${tip + 30}" stroke="#a8825c" stroke-width="2"/>`
/** Colored pinnacle on top of a spire with its tip at (x, tip). Bounds: circle of radius 8 around (x, tip + 12). */
const pinnacle = (x: number, tip: number, color: string) =>
  `<circle cx="${x}" cy="${tip + 12}" r="7" fill="${color}"/><circle cx="${x - 2}" cy="${tip + 10}" r="2" fill="#ffffff" fill-opacity="0.7"/>`
/** Window hole in a spire at (x, y). Bounds: x ±4, y ±6. */
const hole = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="6" fill="#6b4a3a"/>`

const SPIRES: [number, number][] = [[230, 76], [272, 52], [314, 52], [356, 76], [410, 30]]

/** Tower crane with its mast at x; the counterweight and the hook are separate. */
const crane = (x: number) =>
  `<rect x="${x - 6}" y="100" width="12" height="290" fill="#f2b33d"/>` +
  [...Array(14).keys()].map((i) => `<path d="M${x - 6} ${110 + i * 20}l12 20" stroke="#c98f1c" stroke-width="2"/>`).join('') +
  `<rect x="${x - 70}" y="96" width="230" height="8" fill="#f2b33d"/><path d="M${x} 70L${x - 66} 96M${x} 70L${x + 150} 96" stroke="#c98f1c" stroke-width="2"/>` +
  `<rect x="${x - 4}" y="70" width="8" height="28" fill="#f2b33d"/><rect x="${x + 6}" y="104" width="16" height="14" fill="#3d4a55"/>`
/** Counterweight at the short end of the crane at x. Bounds: x from −70 to −46, y from 104 to 120. */
const counterweight = (x: number, color: string) => `<rect x="${x - 70}" y="104" width="24" height="16" fill="${color}"/>`
/** Hook with a load hanging from (x, y). Bounds: x ±14, y from 0 to +98. */
const hook = (x: number, y: number) =>
  `<path d="M${x} ${y}V${y + 82}" stroke="#3d4a55" stroke-width="1.6"/><path d="M${x - 12} ${y + 84}L${x} ${y + 76}L${x + 12} ${y + 84}" fill="none" stroke="#3d4a55" stroke-width="1.6"/>` +
  `<rect x="${x - 14}" y="${y + 84}" width="28" height="12" fill="#8a6f45"/>`

/** Wavy mosaic bench from x = 0 to 520 at y; tiles placed by `rand`. */
function bench(y: number, rand: () => number) {
  let tiles = ''
  const colors = ['#2b59c3', '#e63946', '#ffd23f', '#3fa46f', '#ffffff', '#f28c28']
  for (let x = 8; x < 512; x += 12) {
    const ty = y + 10 + Math.sin(x / 40) * 8
    tiles += `<rect x="${x}" y="${ty.toFixed(1)}" width="9" height="9" rx="2" fill="${colors[Math.floor(rand() * colors.length)]}"/>`
  }
  let top = `M0 ${y}`
  for (let x = 0; x <= 520; x += 20) top += `L${x} ${(y + Math.sin(x / 40) * 8).toFixed(1)}`
  return `<path d="${top}V${y + 40}H0Z" fill="#f4ead2"/>${tiles}`
}
/** Three tiles of the bench at (x, y), in `color`. Bounds: x ±14, y ±6. */
const tiles = (x: number, y: number, color: string) =>
  [-10, 0, 10].map((dx) => `<rect x="${x + dx - 4.5}" y="${y - 4.5}" width="9" height="9" rx="2" fill="${color}"/>`).join('')

/** Mosaic lizard facing right; (x, y) = body center. The spots are separate. Bounds: x ±48, y ±16. */
const lizard = (x: number, y: number) =>
  `<path d="M${x - 48} ${y + 4}Q${x - 30} ${y - 6} ${x - 14} ${y}Q${x} ${y - 14} ${x + 28} ${y - 6}Q${x + 48} ${y - 4} ${x + 46} ${y + 4}Q${x + 30} ${y + 10} ${x} ${y + 10}Q${x - 30} ${y + 14} ${x - 48} ${y + 4}Z" fill="#7ac74f"/>` +
  `<path d="M${x - 12} ${y + 8}l-6 8M${x + 18} ${y + 8}l6 8" stroke="#7ac74f" stroke-width="5" stroke-linecap="round"/><circle cx="${x + 36}" cy="${y - 4}" r="2" fill="#1d1d1d"/>`
const spots = (x: number, y: number, color: string) =>
  [[-24, 2], [-6, 2], [10, -2], [24, 0]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="4" fill="${color}"/>`).join('')

/** Monk parakeet perched; (x, y) = feet. Bounds: x ±10, y from −18 to 0. */
const parakeet = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 8}" rx="6" ry="9" fill="#5fbf4a"/><circle cx="${x - 2}" cy="${y - 15}" r="4.5" fill="#c9d6d0"/><path d="M${x - 7} ${y - 15}l-3 2l3 1Z" fill="#f2b33d"/><path d="M${x + 4} ${y - 2}l6 6" stroke="#4f9f3a" stroke-width="3"/>`

/** Balloon on a string held at (x, y). Bounds: x ±13, y from −96 to −68. */
const balloon = (x: number, y: number, color: string) =>
  `<ellipse cx="${x}" cy="${y - 82}" rx="12" ry="14" fill="${color}"/><path d="M${x - 2} ${y - 68}h4l-2 4Z" fill="${color}"/>`

export default travelLevel({
  id: 417,
  title: 'barcelona',
  parTimeSec: 102,
  place: { region: 'europe', country: 'es', lat: 41.4, lon: 2.17 },
  scene: ({ diff, anim, rand, extra }) => {
    const swing = (period: number) => anim({ id: 'hook', type: 'sway', angle: 6, pivot: [640, 104], period }, hook(640, 104))
    return (
      sky('#9fd3ee') +
      sun(90, 80) +
      anim({ type: 'path', points: [[0, 0], [-60, 0]], period: 44 }, cloud(700, 60, 0.5)) +
      // The basilica
      SPIRES.map(([x, tip]) => spire(x, tip)).join('') +
      SPIRES.filter(([x]) => x !== 272).map(([x, tip]) => pinnacle(x, tip, '#e63946')).join('') +
      diff(272, 64, 20, pinnacle(272, 52, '#e63946'), pinnacle(272, 52, '#ffd23f')) +
      [[272, 130], [272, 170], [314, 130], [314, 170], [356, 160], [410, 110], [410, 150], [230, 190]].map(([x, y]) => hole(x, y)).join('') +
      diff(230, 150, 18, hole(230, 150), '') +
      `<rect x="196" y="250" width="270" height="140" fill="#b58d64"/>` +
      [226, 290, 354, 418].map((x) => `<path d="M${x - 18} 390V318a18 18 0 0 1 36 0V390Z" fill="#6b4a3a"/>`).join('') +
      `<path d="M196 250L230 226L264 250M270 250L314 216L358 250" fill="#c9a27a"/>` +
      // Crane
      crane(520) +
      diff(462, 112, 20, counterweight(520, '#8d99ae'), counterweight(520, '#e8762e')) +
      diff(640, 152, 58, swing(1.2), swing(2.8), 'hook') +
      // Park terrace with the bench, the lizard and the palm
      `<rect y="390" width="800" height="110" fill="#e8d2a6"/>` +
      palm(720, 470, 1.25, -6) +
      diff(700, 338, 18, parakeet(700, 344), '') +
      bench(420, rand) +
      diff(300, 442, 20, tiles(300, 442, '#2b59c3'), tiles(300, 442, '#e63946')) +
      lizard(140, 466) +
      diff(140, 467, 30, spots(140, 466, '#2b59c3'), spots(140, 466, '#f28c28')) +
      person(560, 488, '#3fa46f') +
      `<path d="M568 460L575 412" stroke="#3d4a55" stroke-width="1.2"/>` +
      diff(575, 406, 22, balloon(575, 488, '#e63946'), balloon(575, 488, '#8338ec')) +
      person(620, 486, '#f28c28', true, '#e0b48a', '#1d1d1d') +
      // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
      decor({ anim }, [
        ['newspaperBox', 660, 480, '#e63946'],
        ['pigeon', 692, 420],
        ['bin', 644, 424, '#2a9d8f'],
        ['coffeeCup', 412, 408],
        ['balloon', 464, 184, '#ffd23f'],
        ['birds', 172, 216],
        ['cloud', 596, 288],
      ]) +
      extras({ extra, anim }, [
        ['shoppingBag', 592, 488, '#ff6b8b'],
        ['ball', 220, 488, '#ffd23f'],
        ['bollard', 68, 420],
        ['birds', 188, 52],
        ['cloud', 140, 344],
      ])
    )
  },
})
