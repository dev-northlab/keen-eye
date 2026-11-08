// Motion differences: a hand strap in the train swings only on picture B; a dot on the departure board blinks only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level115Redesign } from './level-115-redesign.ts'
import { bench, bin, coffeeCup, newspaperBox, person, scooter, shoppingBag, skateboard } from './shapes.ts'

/** Ceiling light tube; (x, y) = center. Bounds: x ±18, y ±4. */
const tube = (x: number, y: number) => `<rect x="${x - 18}" y="${y - 4}" width="36" height="8" rx="4" fill="#fff8d6"/>`

/** Station clock with hands at `h` and `m` degrees; (x, y) = center. Bounds: radius 17. */
const clock = (x: number, y: number, h: number, m: number) =>
  `<circle cx="${x}" cy="${y}" r="16" fill="#fffaf0" stroke="#3d4a55" stroke-width="3"/>` +
  `<path d="M${x} ${y}v-8" stroke="#3d4a55" stroke-width="3" stroke-linecap="round" transform="rotate(${h} ${x} ${y})"/>` +
  `<path d="M${x} ${y}v-12" stroke="#3d4a55" stroke-width="2" stroke-linecap="round" transform="rotate(${m} ${x} ${y})"/>`

/** Metro roundel; (x, y) = center, ring radius r. */
const roundel = (x: number, y: number, r: number) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#e63946" stroke-width="${r * 0.32}"/>` +
  `<rect x="${x - r * 1.25}" y="${y - r * 0.24}" width="${r * 2.5}" height="${r * 0.48}" fill="#1d3f8a"/>`

/** Poster, 34 × 46; (x, y) = center; `stripes` stripes on a colored field. */
const stripedPoster = (x: number, y: number, stripes: number) => {
  let s = `<rect x="${x - 17}" y="${y - 23}" width="34" height="46" fill="#ffd166" stroke="#3d4a55" stroke-width="2"/>`
  for (let i = 0; i < stripes; i++) s += `<rect x="${x - 12}" y="${y - 18 + (i * 36) / stripes}" width="24" height="${18 / stripes}" fill="#2a9d8f"/>`
  return s
}

/** Poster with a sun over hills; (x, y) = center; `sunColor` of the circle. */
const sunPoster = (x: number, y: number, sunColor: string) =>
  `<rect x="${x - 17}" y="${y - 23}" width="34" height="46" fill="#bde3f2" stroke="#3d4a55" stroke-width="2"/>` +
  `<circle cx="${x}" cy="${y - 6}" r="7" fill="${sunColor}"/><path d="M${x - 16} ${y + 22}v-12q8 -8 16 0t16 0v12Z" fill="#6aa84f"/>`

/** Hand strap hanging from (x, y). Bounds: x ±6, y from 0 to +22. */
const strap = (x: number, y: number) => `<path d="M${x} ${y}v12" stroke="#3d4a55" stroke-width="2"/><circle cx="${x}" cy="${y + 17}" r="5" fill="none" stroke="#e9c46a" stroke-width="2.5"/>`

/** Suitcase on wheels; (x, y) = bottom center. Bounds: x ±12, y from −40 to 0. */
const suitcase = (x: number, y: number) =>
  `<path d="M${x - 5} ${y - 28}v-12h10v12" stroke="#3d4a55" stroke-width="2.5" fill="none"/><rect x="${x - 12}" y="${y - 30}" width="24" height="26" rx="4" fill="#3a86ff"/>` +
  `<path d="M${x - 6} ${y - 30}v26M${x + 6} ${y - 30}v26" stroke="#2a6fd6" stroke-width="2"/><circle cx="${x - 8}" cy="${y - 2}" r="2.5" fill="#2b2b2b"/><circle cx="${x + 8}" cy="${y - 2}" r="2.5" fill="#2b2b2b"/>`

const dot = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="4" fill="#ffb703"/>`

export default svgLevel({
  id: 115,
  chapter: 'city',
  title: 'metroStation',
  parTimeSec: 95,
  redesign: level115Redesign,
  scene: ({ diff, anim, extra }) => {
    let tiles = ''
    for (let y = 70; y < 360; y += 16) tiles += `<path d="M0 ${y}H800" stroke="#d6dde2" stroke-width="1.5"/>`
    for (let x = 12; x < 800; x += 24) tiles += `<path d="M${x} 60V360" stroke="#d6dde2" stroke-width="1.5"/>`
    let tubes = ''
    for (let x = 60; x < 800; x += 100) if (x !== 460) tubes += tube(x, 30)
    let windows = ''
    const heads = [[60, '#5a3d2b'], [110, '#2b2b2b'], [230, '#c68b5e'], [280, '#8a5a33'], [330, '#2b2b2b']] as const
    for (const x of [40, 120, 220, 300]) windows += `<rect x="${x}" y="176" width="64" height="70" rx="6" fill="#cfe8f2"/>`
    for (const [x, c] of heads) windows += `<circle cx="${x}" cy="224" r="10" fill="${c}"/><rect x="${x - 12}" y="234" width="24" height="12" fill="#7aa6d6"/>`
    let dots = ''
    for (let i = 0; i < 9; i++) if (i !== 4) dots += dot(604 + i * 9, 82)
    let platform = ''
    for (let x = 0; x < 800; x += 40) platform += `<path d="M${x} 380l-24 120" stroke="#a9a29a" stroke-width="1.5"/>`

    return (
      `<rect width="800" height="500" fill="#eef2f4"/>` + tiles +
      `<rect y="140" width="800" height="22" fill="#2a9d8f"/><rect y="150" width="800" height="4" fill="#f4f4f4"/>` +
      `<rect width="800" height="60" fill="#3d4a55"/>` + tubes + diff(460, 30, 22, tube(460, 30), '') +
      // Departure board and the clock
      `<path d="M610 60v10M690 60v10" stroke="#2b2b2b" stroke-width="2"/><rect x="598" y="70" width="84" height="24" rx="3" fill="#1f2430"/>` + dots +
      diff(640, 82, 22, dot(640, 82), anim({ type: 'blink', duty: 0.5, period: 1 }, dot(640, 82))) +
      `<path d="M520 60v32" stroke="#3d4a55" stroke-width="3"/>` +
      diff(520, 108, 24, clock(520, 108, 60, 0), clock(520, 108, 90, 200)) +
      // Wall: roundel, posters, map
      diff(600, 196, 26, roundel(600, 196, 16), roundel(600, 196, 19)) +
      diff(480, 244, 22, sunPoster(480, 244, '#ffb703'), sunPoster(480, 244, '#f28c3a')) +
      diff(700, 240, 24, stripedPoster(700, 240, 3), stripedPoster(700, 240, 4)) +
      `<rect x="530" y="222" width="40" height="46" fill="#ff6b8b" stroke="#3d4a55" stroke-width="2"/><circle cx="550" cy="240" r="9" fill="#fff"/><rect x="538" y="254" width="24" height="5" fill="#fff"/>` +
      `<rect x="740" y="212" width="50" height="70" fill="#f4f4f4" stroke="#3d4a55" stroke-width="2"/>` +
      `<path d="M748 230h34M750 246q14 -10 30 4M748 262h20" stroke="#e63946" stroke-width="3" fill="none"/><path d="M760 222v52" stroke="#3a86ff" stroke-width="3"/>` +
      // Train
      `<rect x="0" y="150" width="420" height="230" rx="18" fill="#c9d1da"/><rect x="0" y="260" width="420" height="16" fill="#e63946"/>` +
      windows +
      `<rect x="180" y="176" width="34" height="140" fill="#9aa5b1"/><path d="M197 176v140" stroke="#7d8894" stroke-width="2"/>` +
      `<rect x="390" y="180" width="22" height="60" rx="4" fill="#cfe8f2"/><circle cx="401" cy="300" r="6" fill="#ffd166"/>` +
      `<path d="M40 180h64M220 180h44" stroke="#3d4a55" stroke-width="2"/>` +
      strap(64, 180) + strap(84, 180) + strap(240, 180) +
      diff(144, 194, 22, strap(144, 180), anim({ type: 'sway', angle: 18, pivot: [144, 180], period: 1.4 }, strap(144, 180))) +
      `<path d="M120 180h44" stroke="#3d4a55" stroke-width="2"/>` +
      // Pillars
      `<rect x="440" y="60" width="26" height="320" fill="#b8c4cc"/><rect x="430" y="60" width="46" height="14" fill="#9aa5b1"/>` +
      // Platform
      `<rect y="370" width="800" height="130" fill="#c4bdb4"/>` + platform +
      `<rect y="372" width="800" height="10" fill="#ffd23f"/>` +
      bench(560, 470, '#3a86ff') + bench(650, 470, '#3a86ff') + bin(740, 470, '#5c677d') +
      `<rect x="760" y="290" width="40" height="90" fill="#e63946"/><rect x="766" y="300" width="28" height="40" fill="#cfe8f2"/><rect x="766" y="346" width="28" height="8" fill="#2b2b2b"/>` +
      person(80, 470, '#8338ec') + person(130, 460, '#ffb703', true) + person(250, 480, '#2a9d8f', false, '#a86b4c', '#2b2b2b') +
      person(330, 456, '#e63946', true) + person(400, 470, '#3a86ff') +
      diff(428, 454, 28, suitcase(422, 474), suitcase(434, 474)) +
      person(520, 446, '#fb8500') + person(610, 456, '#8ac926', true, '#c68b5e', '#2b2b2b') + person(690, 486, '#ff006e') +
      newspaperBox(25, 430) +
      coffeeCup(575, 440) +
      shoppingBag(185, 462) +
      scooter(472, 482) +
      skateboard(775, 492) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['bollard', 219, 422],
        ['coffeeCup', 705, 398],
        ['ball', 379, 405, '#3a86ff'],
        ['coffeeCup', 52, 447],
        ['skateboard', 322, 478],
      ])
    )
  },
})
