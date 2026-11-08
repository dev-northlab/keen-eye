// Motion differences: the chimney smoke rises faster on picture B; the well bucket swings only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level046Redesign } from './level-046-redesign.ts'
import { acorn, anthill, backpack, bush, cabin, cloud, floor, fox, lantern, pine, pineCone, stump, sun } from './shapes.ts'
import { dog, person } from '../chapter-02/shapes.ts'

/** Smoke over the chimney top at (x, y). Bounds: x from −12 to +14, y from −44 to +4. */
const smoke = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y - 6}" r="7" fill="#e3e3ec"/><circle cx="${x + 5}" cy="${y - 20}" r="9" fill="#ededf3"/><circle cx="${x - 1}" cy="${y - 34}" r="10" fill="#f4f4f8"/>`

/** Wood pile of `rows` rows; (x, y) = bottom center. Bounds: x ±30, y from −12·rows to 0. */
const woodpile = (x: number, y: number, rows: number) => {
  let out = ''
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < 4 - r; c++) out += `<circle cx="${x - 22 + r * 7 + c * 14}" cy="${y - 6 - r * 12}" r="6" fill="#c9a06c" stroke="#8a5a3b" stroke-width="2"/>`
  return out
}

/** Axe stuck in the stump at (x, y) = stump bottom center. Bounds: x from −4 to +24, y from −50 to −14. */
const axe = (x: number, y: number) =>
  `<path d="M${x + 2} ${y - 18}l18 -28" stroke="#8a5a3b" stroke-width="3"/><path d="M${x - 2} ${y - 20}l8 -6l6 4l-4 8Z" fill="#8d99ae"/>`

/** Ranger hat on the person at (x, y) = feet. Bounds: x ±13, y from −68 to −56. */
const hat = (x: number, y: number, color: string) =>
  `<path d="M${x - 8} ${y - 58}h16v-8h-16Z" fill="${color}"/><rect x="${x - 13}" y="${y - 60}" width="26" height="4" rx="2" fill="${color}"/>`

/** Birdhouse on a pole; (x, y) = pole foot. The box is separate. */
const pole = (x: number, y: number) => `<rect x="${x - 2}" y="${y - 100}" width="4" height="100" fill="#8a5a3b"/>`
/** Birdhouse box at (x, y) = pole foot. Bounds: x ±14, y from −126 to −96. */
const box = (x: number, y: number, color: string) =>
  `<rect x="${x - 10}" y="${y - 118}" width="20" height="22" fill="${color}"/><path d="M${x - 14} ${y - 116}L${x} ${y - 126}L${x + 14} ${y - 116}Z" fill="#5a3d2b"/><circle cx="${x}" cy="${y - 108}" r="3.5" fill="#2b2b2b"/>`

/** Well; (x, y) = ground center. The bucket is separate. Bounds: x ±26, y from −80 to 0. */
const well = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-22 0v-30h44v30Z" fill="#8d99ae"/><path d="M-22 -10h44M-22 -20h44" stroke="#5c677d" stroke-width="2"/>` +
  `<rect x="-20" y="-70" width="4" height="40" fill="#8a5a3b"/><rect x="16" y="-70" width="4" height="40" fill="#8a5a3b"/><path d="M-26 -68h52l-26 -12Z" fill="#5a3d2b"/><rect x="-20" y="-66" width="40" height="3" fill="#8a5a3b"/></g>`
/** Bucket hanging from the well beam at (x, y) = well ground center. Bounds: x ±8, y from −66 to −40. */
const bucket = (x: number, y: number) =>
  `<path d="M${x} ${y - 66}v12" stroke="#555" stroke-width="1.5"/><path d="M${x - 7} ${y - 54}h14l-2 14h-10Z" fill="#8d99ae"/>`

export default svgLevel({
  id: 46,
  chapter: 'forest',
  title: 'rangerCabin',
  parTimeSec: 120,
  redesign: level046Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    const puffing = (period: number) => anim({ id: 'smoke', type: 'path', points: [[0, 0], [0, -22]], period }, smoke(460, 190))
    const pail = bucket(680, 440)

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(120, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(600, 60, 0.8)) +
      `<path d="M0 270Q200 240 400 260T800 250V500H0Z" fill="#a9d3a0"/>` +
      pine(40, 290, 1.3, '#2f7d55') +
      pine(150, 280, 1, '#3b9467') +
      pine(620, 280, 1.1, '#3b9467') +
      pine(740, 290, 1.4, '#2f7d55') +
      // Cabin
      `<rect x="450" y="190" width="20" height="40" fill="#8d99ae"/>` +
      diff(461, 168, 38, puffing(5), puffing(2), 'smoke') +
      cabin(400, 400, 200, 120) +
      `<rect x="370" y="330" width="40" height="40" fill="#5a3d2b"/>` +
      diff(390, 350, 22, `<rect x="374" y="334" width="32" height="32" fill="#ffd166"/>`, `<rect x="374" y="334" width="32" height="32" fill="#2d3a55"/>`) +
      `<rect x="430" y="330" width="40" height="40" fill="#5a3d2b"/><rect x="434" y="334" width="32" height="32" fill="#bde3f2"/>` +
      `<rect x="330" y="340" width="40" height="60" fill="#5a3d2b"/>` +
      `<rect y="400" width="800" height="100" fill="#8fca68"/>` +
      // Yard
      diff(150, 432, 32, woodpile(150, 450, 3), woodpile(150, 450, 2)) +
      stump(240, 470) +
      diff(254, 438, 22, axe(240, 470), '') +
      person(560, 470, '#2a9d8f') +
      diff(560, 408, 18, hat(560, 470, '#6b4f3a'), hat(560, 470, '#8ac926')) +
      diff(620, 457, 26, dog(620, 470, '#c48a5a'), dog(620, 470, '#c48a5a', true)) +
      pole(60, 420) +
      diff(60, 310, 20, box(60, 420, '#e63946'), box(60, 420, '#3a86ff')) +
      well(680, 440) +
      diff(680, 387, 18, pail, anim({ type: 'sway', angle: 14, pivot: [680, 374], period: 1.4 }, pail)) +
      fox(740, 490, true) +
      bush(320, 470, 1.1) +
      floor(rand, 410, 490, 8) +
      lantern(285, 402) +
      backpack(470, 428) +
      pineCone(95, 486) +
      acorn(360, 478) +
      anthill(760, 426) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['pineCone', 396, 429],
        ['bluebells', 657, 341],
        ['hedgehog', 257, 353],
        ['acorn', 86, 382],
        ['wildStrawberry', 517, 370],
        ['leafPile', 749, 456],
        ['butterfly', 123, 290],
        ['butterfly', 571, 121],
        ['cloud', 389, 72],
        ['birds', 264, 153],
      ])
    )
  },
})
