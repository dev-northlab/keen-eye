// Seoul: the palace gate with curved roofs, N Seoul Tower on its mountain, the golden statue of King
// Sejong on the square, a gate guard, a woman in hanbok and a magpie in a pine.
// Motion difference: the banner by the gate waves quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { level424Redesign } from './level-424-redesign.ts'
import { cloud, lantern, person, sky, sun } from './shapes.ts'

/** Curved tiled roof from x0 to x1 with its ridge at `top` and eaves at `eave`. */
const roof = (x0: number, x1: number, top: number, eave: number) =>
  `<path d="M${x0} ${eave}Q${x0 + 30} ${eave - 6} ${x0 + 50} ${top}H${x1 - 50}Q${x1 - 30} ${eave - 6} ${x1} ${eave}L${x1 - 20} ${eave + 10}H${x0 + 20}Z" fill="#4a5a52"/>` +
  `<rect x="${x0 + 20}" y="${eave + 10}" width="${x1 - x0 - 40}" height="6" fill="#3f9b6b"/>`

/** The palace gate: stone base with three arches and a two-roofed pavilion. The middle door is separate. */
const gate = () =>
  `<rect x="120" y="270" width="300" height="90" fill="#b8b2a6"/>` +
  [190, 350].map((x) => `<path d="M${x - 22} 360V320a22 22 0 0 1 44 0V360Z" fill="#7a2f2a"/>`).join('') +
  `<rect x="160" y="226" width="220" height="44" fill="#a0302a"/>` +
  [170, 214, 258, 302, 346].map((x) => `<rect x="${x}" y="226" width="8" height="44" fill="#7a2f2a"/>`).join('') +
  roof(110, 430, 202, 226) +
  `<rect x="190" y="184" width="160" height="22" fill="#a0302a"/>` +
  roof(160, 380, 156, 180)
const door = (color: string) => `<path d="M246 360V316a24 24 0 0 1 48 0V360Z" fill="${color}"/>`

/** N Seoul Tower on the mountain top at (x, y) (its foot). Deck and antenna top are separate. */
const seoulTower = (x: number, y: number) =>
  `<rect x="${x - 6}" y="${y - 130}" width="12" height="130" fill="#e8e8e8"/><rect x="${x - 10}" y="${y - 20}" width="20" height="20" fill="#d6dde3"/>` +
  `<rect x="${x - 2}" y="${y - 160}" width="4" height="30" fill="#c9d6e3"/>`
/** Observation deck of `seoulTower`. Bounds: x ±22, y from −110 to −90. */
const deck = (x: number, y: number, color: string) => `<rect x="${x - 22}" y="${y - 110}" width="44" height="20" rx="8" fill="${color}"/><rect x="${x - 18}" y="${y - 104}" width="36" height="5" fill="#bde3f2"/>`
/** Top of the antenna. Bounds: x ±2, y from −184 to −160. */
const antennaTop = (x: number, y: number) => `<rect x="${x - 1.5}" y="${y - 184}" width="3" height="24" fill="#c9d6e3"/><circle cx="${x}" cy="${y - 184}" r="2.5" fill="#e63946"/>`

/** Banner on the pole top at (x, y). Bounds: x from 0 to +26, y from 0 to +34. */
const banner = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M0 0H26V34L13 28L0 34Z" fill="#ffd23f"/><circle cx="13" cy="14" r="7" fill="#e63946"/><path d="M6 14a7 7 0 0 0 14 0Z" fill="#2b59c3"/></g>`

/** King Sejong's golden statue seated on its plinth; (x, y) = foot of the plinth. Bounds: x ±46, y from −130 to 0. */
const sejong = (x: number, y: number) =>
  `<rect x="${x - 46}" y="${y - 40}" width="92" height="40" fill="#8d8a86"/>` +
  `<path d="M${x - 30} ${y - 40}V${y - 70}H${x + 30}V${y - 40}Z" fill="#c9a227"/><path d="M${x - 24} ${y - 70}L${x - 18} ${y - 110}H${x + 18}L${x + 24} ${y - 70}Z" fill="#d8b23a"/>` +
  `<circle cx="${x}" cy="${y - 118}" r="11" fill="#d8b23a"/><rect x="${x - 9}" y="${y - 134}" width="18" height="8" fill="#c9a227"/>` +
  `<rect x="${x + 4}" y="${y - 96}" width="18" height="12" fill="#e6c24a" transform="rotate(-10 ${x + 13} ${y - 90})"/>`
/** Flower bed in front of the plinth at (x, y). Bounds: x ±40, y ±10. */
const flowerBed = (x: number, y: number, color: string) =>
  `<ellipse cx="${x}" cy="${y}" rx="40" ry="10" fill="#3f8f3a"/>` + [-28, -14, 0, 14, 28].map((dx) => `<circle cx="${x + dx}" cy="${y - 2}" r="5" fill="${color}"/>`).join('')

/** Wide-brimmed hat of the gate guard (a `person` at (x, y)). Bounds: x ±16, y from −72 to −58. */
const guardHat = (x: number, y: number, color: string) =>
  `<ellipse cx="${x}" cy="${y - 60}" rx="16" ry="3" fill="${color}"/><rect x="${x - 7}" y="${y - 72}" width="14" height="12" rx="3" fill="${color}"/>`

/** Woman in hanbok facing right; (x, y) = feet. The skirt is separate. */
const hanbokTop = (x: number, y: number) =>
  `<path d="M${x - 10} ${y - 66}h20l2 14h-24Z" fill="#f4ead2"/><path d="M${x - 10} ${y - 60}l12 8" stroke="#d6338a" stroke-width="3"/>` +
  `<circle cx="${x}" cy="${y - 74}" r="8" fill="#f2d29b"/><path d="M${x - 8} ${y - 76}q8 -10 16 0" fill="#1d1d1d"/><circle cx="${x - 8}" cy="${y - 74}" r="4" fill="#1d1d1d"/>`
/** Bell-shaped hanbok skirt of the woman at (x, y). Bounds: x ±24, y from −54 to 0. */
const skirt = (x: number, y: number, color: string) => `<path d="M${x - 12} ${y - 54}H${x + 12}Q${x + 26} ${y - 20} ${x + 24} ${y}H${x - 24}Q${x - 26} ${y - 20} ${x - 12} ${y - 54}Z" fill="${color}"/>`

/** Magpie perched, facing left; (x, y) = feet. Bounds: x from −12 to +22, y from −16 to 0. */
const magpie = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 8}" rx="9" ry="6" fill="#1d1d1d"/><ellipse cx="${x + 1}" cy="${y - 6}" rx="5" ry="3.5" fill="#ffffff"/><circle cx="${x - 7}" cy="${y - 12}" r="4" fill="#1d1d1d"/>` +
  `<path d="M${x - 11} ${y - 12}l-3 1l3 1Z" fill="#3d4a55"/><path d="M${x + 7} ${y - 9}l15 -5" stroke="#1d3557" stroke-width="3"/>`

export default travelLevel({
  id: 424,
  redesign: level424Redesign,
  title: 'seoul',
  parTimeSec: 118,
  place: { region: 'asia', country: 'kr', lat: 37.57, lon: 126.98 },
  scene: ({ diff, anim, extra }) => {
    const wave = (period: number) => anim({ id: 'banner', type: 'sway', angle: 8, pivot: [470, 236], period }, banner(470, 236))
    return (
      sky('#a6d5ef') +
      sun(90, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 46 }, cloud(320, 70, 0.5)) +
      // Namsan with the tower, the city below
      `<path d="M430 300Q590 190 790 290Z" fill="#6f9a5a"/>` +
      seoulTower(595, 222) +
      diff(595, 50, 18, antennaTop(595, 222), '') +
      diff(595, 122, 26, deck(595, 222, '#f4f4f4'), deck(595, 222, '#e8762e')) +
      [...Array(10).keys()].map((i) => `<rect x="${430 + i * 37}" y="${262 - (i % 4) * 14}" width="30" height="${100 + (i % 4) * 14}" fill="${['#b7cde0', '#c9d3dd', '#a9b6c6', '#d6dde3'][i % 4]}"/>`).join('') +
      // The palace gate
      gate() +
      diff(270, 326, 42, door('#7a2f2a'), door('#2b59c3')) +
      lantern(150, 242) +
      diff(390, 257, 20, lantern(390, 242), lantern(390, 242, '#2b59c3')) +
      `<path d="M470 360V230" stroke="#5c3d24" stroke-width="3"/>` +
      diff(484, 254, 24, wave(1), wave(2.4), 'banner') +
      // The square
      `<rect y="360" width="800" height="140" fill="#d9d2c5"/><path d="M0 366H800" stroke="#bfb3a0" stroke-width="4"/>` +
      sejong(600, 440) +
      diff(600, 452, 44, flowerBed(600, 452, '#e63946'), flowerBed(600, 452, '#ffd23f')) +
      person(120, 476, '#2b59c3', false, '#f2d29b', '#1d1d1d') +
      diff(120, 410, 20, guardHat(120, 476, '#1d1d1d'), guardHat(120, 476, '#c9302c')) +
      hanbokTop(360, 488) +
      diff(360, 461, 38, skirt(360, 488, '#d6338a'), skirt(360, 488, '#2a9d8f')) +
      // Pine with the magpie
      `<rect x="752" y="330" width="12" height="150" fill="#6b4a3a"/><ellipse cx="740" cy="330" rx="46" ry="16" fill="#2f6b45"/><ellipse cx="770" cy="296" rx="36" ry="14" fill="#2f6b45"/><ellipse cx="748" cy="266" rx="28" ry="12" fill="#3f7d4f"/>` +
      diff(722, 306, 22, magpie(716, 314), '') +
      // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
      decor({ anim }, [
        ['ball', 704, 472, '#ffd23f'],
        ['bollard', 408, 400],
        ['skateboard', 212, 416, '#e63946'],
        ['suitcase', 68, 476, '#ffd23f'],
        ['birds', 436, 104],
        ['cloud', 708, 140],
        ['birds', 184, 56],
      ]) +
      extras({ extra, anim }, [
        ['newspaperBox', 512, 488, '#e63946'],
        ['pigeon', 152, 476],
        ['suitcase', 276, 488, '#3a86ff'],
        ['cloud', 92, 192],
        ['birds', 276, 116],
      ])
    )
  },
})
