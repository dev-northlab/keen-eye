// Paris: the Eiffel Tower between two Haussmann houses, a café and a painter at an easel.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { bike, cityTree, cloud, lampHead, lampPost, person, pigeon, sky, sun } from './shapes.ts'

/** Eiffel Tower; (x, y) = middle of the ground between the legs. Bounds: x ±82, y from −360 to 0. */
const tower = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-82 0Q-38 -80 -22 -160L-12 -250L-6 -320H6L12 -250L22 -160Q38 -80 82 0H44Q0 -70 -44 0Z" fill="#9b6b43"/>` +
  `<path d="M-30 -100L26 -162M30 -100L-26 -162M-14 -172L8 -250M14 -172L-8 -250" stroke="#7a5233" stroke-width="3"/>` +
  `<rect x="-50" y="-112" width="100" height="12" rx="2" fill="#7a5233"/><rect x="-27" y="-172" width="54" height="10" rx="2" fill="#7a5233"/>` +
  `<rect x="-12" y="-260" width="24" height="8" rx="2" fill="#7a5233"/><rect x="-6" y="-332" width="12" height="14" rx="3" fill="#7a5233"/>` +
  `<rect x="-2" y="-362" width="4" height="32" fill="#5c3d24"/></g>`

/** Haussmann house front from x to x + 230, top of the wall at y = 230, ground at 420. */
function house(x: number, wall: string) {
  let s =
    `<rect x="${x}" y="230" width="230" height="190" fill="${wall}"/>` +
    `<path d="M${x - 4} 232L${x + 16} 196H${x + 214}L${x + 234} 232Z" fill="#7d8ca3"/>`
  for (let i = 0; i < 4; i++) {
    const wx = x + 22 + i * 52
    s += `<rect x="${wx + 6}" y="204" width="16" height="20" rx="8" fill="#bde3f2"/>`
    for (const wy of [250, 306]) s += `<rect x="${wx}" y="${wy}" width="28" height="40" fill="#bde3f2"/><rect x="${wx - 3}" y="${wy + 40}" width="34" height="4" fill="#3d4a55"/>`
  }
  return s + `<rect x="${x}" y="362" width="230" height="6" fill="#e2cfa8"/>`
}

/** Café awning over x .. x + w at y. Bounds: y from 0 to +18. */
function awning(x: number, w: number, y: number) {
  let s = ''
  for (let i = 0; i * 20 < w; i++) s += `<path d="M${x + i * 20} ${y}h20v14q-10 8 -20 0Z" fill="${i % 2 ? '#ffffff' : '#e63946'}"/>`
  return s
}

/** Café table under a parasol; (x, y) = ground under the table. The parasol cloth is separate. */
const table = (x: number, y: number) =>
  `<rect x="${x - 2}" y="${y - 90}" width="4" height="90" fill="#3d4a55"/>` +
  `<ellipse cx="${x}" cy="${y - 26}" rx="30" ry="6" fill="#3d4a55"/><rect x="${x - 3}" y="${y - 26}" width="6" height="26" fill="#3d4a55"/>` +
  `<path d="M${x - 46} ${y}v-30h10v14h12v16M${x + 46} ${y}v-30h-10v14h-12v16" fill="none" stroke="#7a5233" stroke-width="4"/>` +
  `<rect x="${x - 10}" y="${y - 38}" width="7" height="10" rx="2" fill="#ffffff"/><circle cx="${x + 10}" cy="${y - 33}" r="5" fill="#f4a261"/>`
/** Parasol cloth over `table` at (x, y). Bounds: x ±44, y from −112 to −90. */
const parasol = (x: number, y: number, color: string) =>
  `<path d="M${x - 44} ${y - 90}Q${x} ${y - 134} ${x + 44} ${y - 90}Z" fill="${color}"/>` +
  `<path d="M${x} ${y - 112}L${x - 16} ${y - 90}M${x} ${y - 112}L${x + 16} ${y - 90}" stroke="#ffffff" stroke-opacity="0.6" stroke-width="3"/>`

/** Easel with a small picture of the tower; (x, y) = ground under the middle. Bounds: x ±22, y from −74 to 0. */
const easel = (x: number, y: number) =>
  `<path d="M${x - 15} ${y}L${x} ${y - 72}L${x + 15} ${y}M${x} ${y - 72}V${y}" fill="none" stroke="#8a5a33" stroke-width="3"/>` +
  `<rect x="${x - 22}" y="${y - 70}" width="44" height="34" fill="#ffffff" stroke="#c8b08a" stroke-width="2"/>` +
  `<path d="M${x - 8} ${y - 40}L${x} ${y - 66}L${x + 8} ${y - 40}Z" fill="#9b6b43"/><path d="M${x - 20} ${y - 44}h40" stroke="#7fc8a9" stroke-width="4"/>`

/** Painter's beret on a `person` standing at (x, y). Bounds: x ±11, y from −68 to −58. */
const beret = (x: number, y: number, color: string) =>
  `<ellipse cx="${x - 1}" cy="${y - 61}" rx="11" ry="4" fill="${color}"/><circle cx="${x - 1}" cy="${y - 66}" r="2" fill="${color}"/>`

/** Cat sitting on a window sill at (x, y). Bounds: x ±12, y from −30 to 0. */
const cat = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 9}" rx="9" ry="10" fill="#4a4a52"/><circle cx="${x}" cy="${y - 22}" r="7" fill="#4a4a52"/>` +
  `<path d="M${x - 6} ${y - 26}l1 -8l5 5ZM${x + 6} ${y - 26}l-1 -8l-5 5Z" fill="#4a4a52"/>` +
  `<path d="M${x + 8} ${y - 2}q8 0 6 -12" fill="none" stroke="#4a4a52" stroke-width="3" stroke-linecap="round"/>` +
  `<circle cx="${x - 3}" cy="${y - 23}" r="1.3" fill="#ffd166"/><circle cx="${x + 3}" cy="${y - 23}" r="1.3" fill="#ffd166"/>`

/** Pink blossoms on the crown of a `cityTree` at (x, y), scale 1.2. Bounds: circle of radius 22 around (x, y − 53). */
const blossoms = (x: number, y: number) =>
  [[-12, -62], [10, -58], [-2, -44], [14, -44], [-14, -46]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="4" fill="#ff9ec4"/><circle cx="${x + dx}" cy="${y + dy}" r="1.5" fill="#fff3b0"/>`).join('')

/** Flower basket hanging from a `lampPost` at (x, y). Bounds: x from +3 to +22, y from −84 to −62. */
const hangingBasket = (x: number, y: number) =>
  `<path d="M${x + 3} ${y - 82}h10v10" fill="none" stroke="#3d4a55" stroke-width="2"/>` +
  `<circle cx="${x + 8}" cy="${y - 72}" r="4" fill="#e63946"/><circle cx="${x + 18}" cy="${y - 72}" r="4" fill="#ff9ec4"/><circle cx="${x + 13}" cy="${y - 75}" r="4" fill="#e63946"/>` +
  `<path d="M${x + 4} ${y - 70}h18l-3 8h-12Z" fill="#8a5a33"/>`

/** French flag on the tower's antenna top at (x, y). Bounds: x from 0 to +21, y from 0 to +12. */
const flag = (x: number, y: number) =>
  `<rect x="${x}" y="${y}" width="7" height="12" fill="#2b59c3"/><rect x="${x + 7}" y="${y}" width="7" height="12" fill="#ffffff"/>` +
  `<rect x="${x + 14}" y="${y}" width="7" height="12" fill="#e63946"/>`

/** Baguette sticking out of the bike basket. Bounds: circle of radius 20 around (x, y). */
const baguette = (x: number, y: number) =>
  `<path d="M${x - 7} ${y + 14}L${x + 7} ${y - 14}" stroke="#d9a35b" stroke-width="8" stroke-linecap="round"/>` +
  `<path d="M${x - 4} ${y + 2}l5 3M${x} ${y - 6}l5 3" stroke="#a8743f" stroke-width="1.6"/>`

export default travelLevel({
  id: 401,
  title: 'paris',
  parTimeSec: 84,
  place: { region: 'europe', country: 'fr', lat: 48.86, lon: 2.35 },
  scene: ({ diff, anim, extra }) =>
    sky() +
    sun(690, 80) +
    anim({ type: 'path', points: [[0, 0], [70, 0]], period: 40 }, cloud(150, 90, 0.7)) +
    anim({ type: 'path', points: [[0, 0], [-60, 0]], period: 46 }, cloud(560, 140, 0.55)) +
    // Far roofs
    `<path d="M240 420V330h40v-20h50v30h60v-26h40v26h50v-34h50v24h40V420Z" fill="#c9d6e3"/>` +
    tower(400, 400) +
    diff(412, 44, 24, flag(402, 38), '') +
    house(20, '#f3e3c3') +
    diff(212, 274, 24, cat(212, 290), '') +
    awning(30, 200, 368) +
    `<rect x="40" y="384" width="180" height="36" fill="#bde3f2"/>` +
    house(550, '#efd9b4') +
    diff(
      636,
      300,
      24,
      `<rect x="619" y="296" width="34" height="8" rx="2" fill="#8a5a33"/>` +
        [624, 636, 648].map((fx) => `<circle cx="${fx}" cy="${292}" r="5" fill="#e63946"/>`).join(''),
      '',
    ) +
    `<rect x="572" y="372" width="60" height="48" fill="#5c7a99"/><rect x="660" y="372" width="96" height="48" fill="#bde3f2"/>` +
    // Street
    `<rect y="420" width="800" height="80" fill="#d8cfc0"/><rect y="420" width="800" height="6" fill="#bfb3a0"/>` +
    lampPost(300, 470) +
    lampHead(300, 470) +
    diff(313, 395, 24, hangingBasket(300, 470), '') +
    cityTree(600, 470, 1.2) +
    diff(601, 417, 24, blossoms(601, 470), '') +
    table(150, 480) +
    diff(150, 372, 48, parasol(150, 480, '#e63946'), parasol(150, 480, '#2a9d8f')) +
    person(500, 480, '#5b7fd6') +
    diff(499, 416, 24, beret(500, 480, '#1d1d1d'), beret(500, 480, '#e63946')) +
    easel(548, 480) +
    bike(700, 484, '#2a9d8f') +
    diff(716, 436, 24, baguette(716, 436), '') +
    `<rect x="704" y="446" width="20" height="12" rx="2" fill="#c8935a"/>` +
    pigeon(380, 476) +
    pigeon(428, 488, true) +
    // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
    decor({ anim }, [
      ['pigeon', 648, 468],
      ['ball', 272, 476, '#ffd23f'],
      ['bollard', 68, 480],
      ['skateboard', 460, 476, '#e63946'],
      ['cloud', 280, 172],
      ['birds', 580, 64],
      ['cloud', 484, 264],
    ]) +
    extras({ extra, anim }, [
      ['suitcase', 348, 468, '#ffd23f'],
      ['newspaperBox', 224, 464, '#e63946'],
      ['pigeon', 416, 456],
      ['birds', 88, 56],
      ['balloon', 324, 32, '#ffd23f'],
    ]),
})
