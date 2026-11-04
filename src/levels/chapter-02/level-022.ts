// Motion differences: the hanging sign swings only on picture B; the coffee steam rises faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { awning, ball, bike, cloud, door, flowerBox, manhole, newspaperBox, person, pigeon, shoppingBag, skateboard, street, window } from './shapes.ts'

/** Round table with two chairs; (x, y) = ground center. Bounds: x ±36, y from −40 to 0. */
const table = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-34" y="-34" width="10" height="34" fill="#3d4a55"/><rect x="24" y="-34" width="10" height="34" fill="#3d4a55"/>` +
  `<rect x="-36" y="-40" width="12" height="4" fill="#3d4a55"/><rect x="24" y="-40" width="12" height="4" fill="#3d4a55"/>` +
  `<rect x="-2" y="-28" width="4" height="28" fill="#3d4a55"/><ellipse cy="-28" rx="22" ry="6" fill="#ffffff"/></g>`

/** Parasol over a table; (x, y) = pole foot. Bounds: x ±40, y from −74 to −54 (pole down to 0). */
const parasol = (x: number, y: number, color: string) =>
  `<rect x="${x - 2}" y="${y - 60}" width="4" height="60" fill="#3d4a55"/>` +
  `<path d="M${x - 40} ${y - 56}q40 -24 80 0q-10 -4 -20 0q-10 -4 -20 0q-10 -4 -20 0q-10 -4 -20 0Z" fill="${color}"/>`
const parasolCanopy = (x: number, y: number, color: string) =>
  `<path d="M${x - 40} ${y - 56}q40 -24 80 0q-10 -4 -20 0q-10 -4 -20 0q-10 -4 -20 0q-10 -4 -20 0Z" fill="${color}"/>`

/** Cup; (x, y) = bottom center. Bounds: x ±9, y from −10 to 0. */
const cup = (x: number, y: number, color = '#ffffff') =>
  `<path d="M${x - 7} ${y - 10}h14l-2 10h-10Z" fill="${color}"/><path d="M${x + 7} ${y - 8}q6 0 4 6" stroke="${color}" stroke-width="2" fill="none"/>`

/** Steam over a cup at (x, y) = cup top. Bounds: x ±8, y from −26 to −4. */
const steam = (x: number, y: number) =>
  `<path d="M${x - 5} ${y - 4}q-4 -8 0 -12t0 -10M${x + 4} ${y - 6}q-4 -8 0 -12t0 -8" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linecap="round"/>`

/** Sitting cat; (x, y) = bottom center. Bounds: x from −14 to +20, y from −30 to 0. */
const cat = (x: number, y: number, color = '#2b2b3a') =>
  `<g transform="translate(${x} ${y})"><path d="M8 -2q14 -2 12 -16" stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
  `<ellipse cy="-9" rx="11" ry="10" fill="${color}"/><circle cx="-2" cy="-22" r="7" fill="${color}"/>` +
  `<path d="M-8 -26l1 -6l4 4ZM4 -26l-1 -6l-4 4Z" fill="${color}"/><circle cx="-4" cy="-23" r="1.2" fill="#8ac926"/><circle cx="0" cy="-23" r="1.2" fill="#8ac926"/></g>`

/** A-frame menu board; (x, y) = bottom center. Bounds: x ±20, y from −50 to 0. */
const menuBoard = (x: number, y: number, frame: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-20 0L-10 -50h20L20 0Z" fill="${frame}"/><path d="M-13 -6l8 -38h10l8 38Z" fill="#2b2b2b"/>` +
  `<path d="M-6 -36h12M-7 -28h14M-8 -20h16M-9 -12h18" stroke="#ffffff" stroke-width="2"/></g>`

/** Potted plant; (x, y) = bottom center, scale s. Bounds: x ±20·s, y from −50·s to 0. */
const plant = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 -18h28l-4 18h-20Z" fill="#c9823a"/>` +
  `<path d="M0 -18q-20 -14 -14 -32q12 4 14 20q2 -20 16 -24q4 20 -12 34Z" fill="#4caf6a"/><circle cy="-40" r="9" fill="#5fae4b"/></g>`

/** Hanging sign under a bracket; (x, y) = bracket pivot. Bounds: x ±24, y from 0 to +40. */
const hangingSign = (x: number, y: number) =>
  `<path d="M${x} ${y}v10" stroke="#3d4a55" stroke-width="3"/><rect x="${x - 22}" y="${y + 10}" width="44" height="28" rx="4" fill="#6b4f3a"/>` +
  `<path d="M${x - 8} ${y + 20}h12l-2 10h-8Z" fill="#ffffff"/><path d="M${x + 4} ${y + 22}q6 0 4 6" stroke="#ffffff" stroke-width="2" fill="none"/>`

export default svgLevel({
  id: 22,
  chapter: 'city',
  title: 'cafe',
  parTimeSec: 110,
  scene: ({ diff, anim, rand, extra }) => {
    let bulbs = ''
    for (let i = 0; i < 12; i++) bulbs += `<circle cx="${160 + i * 44}" cy="${230 + Math.sin((i / 11) * Math.PI) * 14}" r="4" fill="#ffe08a"/>`
    const sign = hangingSign(400, 232)
    const rising = (period: number) => anim({ id: 'steam', type: 'path', points: [[0, 0], [0, -8]], period }, steam(360, 362))
    const curb = rand() > 2 ? '' : ''

    return (
      `<rect width="800" height="500" fill="#ffe6cc"/>` +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 34 }, cloud(600, 70, 0.7)) +
      // Cafe front
      `<rect x="100" y="140" width="600" height="200" fill="#f4d6a0"/>` +
      `<rect x="100" y="140" width="600" height="14" fill="#c98bb9"/>` +
      `<rect x="140" y="190" width="520" height="36" rx="6" fill="#6b4f3a"/>` +
      `<rect x="200" y="200" width="400" height="16" rx="8" fill="#ffffff" fill-opacity="0.7"/>` +
      window(180, 290) +
      window(620, 290) +
      flowerBox(180, 309, '#ff6b8b') +
      flowerBox(620, 309, '#ff6b8b') +
      `<rect x="260" y="240" width="280" height="100" fill="#bde3f2"/><path d="M400 240v100M260 290h280" stroke="#f4d6a0" stroke-width="6"/>` +
      door(560, 340, '#2a9d8f') +
      awning(400, 226, 300, '#e63946') +
      `<path d="M400 226h-40l0 6" stroke="#3d4a55" stroke-width="3" fill="none"/>` +
      diff(400, 254, 30, sign, anim({ type: 'sway', angle: 12, pivot: [400, 232], period: 1.5 }, sign)) +
      `<path d="M160 230Q400 262 644 230" stroke="#555" stroke-width="2" fill="none"/>` +
      bulbs +
      street(380, 120) +
      // Terrace
      diff(90, 325, 34, menuBoard(90, 350, '#a0703f'), menuBoard(90, 350, '#3a86ff')) +
      parasol(200, 400, '#000000').replace(parasolCanopy(200, 400, '#000000'), '') +
      diff(200, 336, 44, parasolCanopy(200, 400, '#e63946'), parasolCanopy(200, 400, '#8ac926')) +
      table(200, 400) +
      cup(188, 372) +
      cup(212, 372, '#ffd166') +
      table(360, 400) +
      cup(360, 372) +
      diff(360, 346, 20, rising(2.5), rising(1), 'steam') +
      table(520, 400) +
      cup(505, 372) +
      diff(535, 365, 18, cup(535, 372, '#3a86ff'), '') +
      person(290, 400, '#ffb703', true) +
      person(440, 400, '#8338ec') +
      diff(643, 325, 24, cat(640, 340), '') +
      diff(720, 307, 44, plant(720, 340), plant(720, 340, 1.3)) +
      bike(60, 400, '#3a86ff') +
      pigeon(760, 380, true) +
      curb +
      skateboard(110, 380) +
      newspaperBox(262, 380) +
      shoppingBag(600, 382) +
      ball(705, 380) +
      manhole(420, 470) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['flowerBox', 127, 253, '#ffb703'],
        ['birds', 344, 78],
        ['cloud', 180, 66],
        ['balloon', 744, 130, '#3a86ff'],
        ['pigeon', 724, 424],
        ['pigeon', 498, 470],
        ['cone', 245, 479],
        ['pigeon', 83, 477],
      ])
    )
  },
})
