// Motion differences: the right hanging lamp swings only on picture B; the platform signal blinks only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bench, coffeeCup, mailbox, newspaperBox, person, pigeon, scooter, shoppingBag } from './shapes.ts'

/** Station clock with hands at `h` and `m` degrees; (x, y) = center. Bounds: radius 20. */
const clock = (x: number, y: number, h: number, m: number) =>
  `<circle cx="${x}" cy="${y}" r="19" fill="#fffaf0" stroke="#2f3a45" stroke-width="4"/>` +
  `<path d="M${x} ${y}v-9" stroke="#2f3a45" stroke-width="3" stroke-linecap="round" transform="rotate(${h} ${x} ${y})"/>` +
  `<path d="M${x} ${y}v-14" stroke="#2f3a45" stroke-width="2" stroke-linecap="round" transform="rotate(${m} ${x} ${y})"/>`

/** Hanging lamp from (x, y). Bounds: x ±12, y from 0 to +40. */
const lamp = (x: number, y: number) =>
  `<path d="M${x} ${y}v24" stroke="#2f3a45" stroke-width="2"/><path d="M${x - 12} ${y + 36}l4 -12h16l4 12Z" fill="#2a6f5a"/><circle cx="${x}" cy="${y + 37}" r="4" fill="#ffd166"/>`

/** Carriage door with `panels` window panels; (x, y) = door top-left, 30 × 70. */
const carDoor = (x: number, y: number, panels: number) => {
  let s = `<rect x="${x}" y="${y}" width="30" height="70" fill="#1d5c4a" stroke="#14463a" stroke-width="2"/>`
  for (let i = 0; i < panels; i++) s += `<rect x="${x + 6}" y="${y + 6 + (i * 30) / panels}" width="18" height="${30 / panels - 3}" fill="#cfe8f2"/>`
  return s + `<circle cx="${x + 24}" cy="${y + 48}" r="2" fill="#f2c14e"/>`
}

/** Suitcase; (x, y) = bottom center, w × h. */
const suitcase = (x: number, y: number, w: number, h: number, color: string) =>
  `<rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" rx="3" fill="${color}"/><path d="M${x - 5} ${y - h}v-4h10v4" stroke="#3d3d3d" stroke-width="2" fill="none"/>`

const signal = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="6" fill="#7dff6a"/><circle cx="${x}" cy="${y}" r="10" fill="#7dff6a" fill-opacity="0.3"/>`

export default svgLevel({
  id: 119,
  chapter: 'city',
  title: 'railwayStation',
  parTimeSec: 85,
  scene: ({ diff, anim, rand, extra }) => {
    let ribs = ''
    for (let i = 0; i <= 12; i++) {
      const a = Math.PI - (i * Math.PI) / 12
      ribs += `<path d="M400 230L${(400 + Math.cos(a) * 420).toFixed(1)} ${(230 - Math.sin(a) * 210).toFixed(1)}" stroke="#4a5866" stroke-width="3"/>`
    }
    for (const k of [0.45, 0.7, 0.9]) ribs += `<path d="M${400 - 420 * k} 230A${420 * k} ${210 * k} 0 0 1 ${400 + 420 * k} 230" stroke="#4a5866" stroke-width="2" fill="none"/>`
    let windows = ''
    for (let x = 352; x < 800; x += 60) if (x !== 472) windows += `<rect x="${x}" y="286" width="40" height="30" rx="4" fill="#cfe8f2"/>`
    let sleepers = ''
    for (let x = 0; x < 800; x += 22) sleepers += `<rect x="${x}" y="378" width="12" height="8" fill="#6b4a3a"/>`
    let tiles = ''
    for (let i = 0; i < 30; i++) tiles += `<rect x="${(rand() * 780).toFixed(1)}" y="${(400 + rand() * 96).toFixed(1)}" width="18" height="2" fill="#b3aaa0"/>`
    const smoke = anim(
      { type: 'path', points: [[0, 0], [-10, -40]], period: 3 },
      `<circle cx="120" cy="226" r="10" fill="#e3e3e3" fill-opacity="0.8"/><circle cx="132" cy="214" r="13" fill="#e3e3e3" fill-opacity="0.6"/>`,
    )

    return (
      `<rect width="800" height="500" fill="#a9b6c2"/>` +
      // Glass roof
      `<path d="M-20 230A420 210 0 0 1 820 230Z" fill="#d8eef7"/>` + ribs +
      `<path d="M-20 230A420 210 0 0 1 820 230" stroke="#2f3a45" stroke-width="8" fill="none"/>` +
      diff(200, 106, 22, '', pigeon(200, 116, false, '#6b7480')) +
      `<path d="M400 20v110" stroke="#2f3a45" stroke-width="3"/>` + diff(400, 150, 24, clock(400, 150, 300, 60), clock(400, 150, 330, 240)) +
      lamp(200, 160) + lamp(300, 140) + lamp(500, 140) +
      diff(600, 186, 26, lamp(600, 160), anim({ type: 'sway', angle: 10, pivot: [600, 160], period: 2 }, lamp(600, 160))) +
      `<rect y="230" width="800" height="150" fill="#b5735a"/><path d="M0 250H800M0 270H800" stroke="#9a5f48" stroke-width="2"/>` +
      // Locomotive
      smoke +
      `<rect x="40" y="276" width="190" height="84" rx="10" fill="#2b2b2b"/><rect x="170" y="240" width="90" height="120" rx="6" fill="#c0392b"/>` +
      `<rect x="186" y="256" width="58" height="36" fill="#cfe8f2"/><rect x="110" y="232" width="22" height="46" fill="#2b2b2b"/><rect x="104" y="228" width="34" height="8" fill="#3d3d3d"/>` +
      `<path d="M40 330h190" stroke="#c9a227" stroke-width="4"/><path d="M24 360l16 -24v24Z" fill="#c0392b"/>` +
      diff(52, 298, 22, `<circle cx="52" cy="298" r="9" fill="#ffd166" stroke="#c9a227" stroke-width="3"/>`, `<circle cx="52" cy="298" r="12" fill="#ffd166" stroke="#c9a227" stroke-width="3"/>`) +
      [80, 140, 200].map((x) => `<circle cx="${x}" cy="360" r="20" fill="#3d3d3d"/><circle cx="${x}" cy="360" r="7" fill="#c0392b"/>`).join('') +
      // Carriages
      `<rect x="270" y="270" width="540" height="96" rx="8" fill="#2a6f5a"/><rect x="270" y="330" width="540" height="6" fill="#f2c14e"/>` +
      windows + carDoor(310, 290, 2) +
      diff(472, 320, 26, carDoor(457, 290, 2), carDoor(457, 290, 3)) +
      diff(662, 301, 22, `<rect x="654" y="286" width="16" height="30" fill="#e07a5f"/>`, `<rect x="654" y="286" width="16" height="30" fill="#d4906a"/>`) +
      `<circle cx="316" cy="366" r="10" fill="#3d3d3d"/><circle cx="430" cy="366" r="10" fill="#3d3d3d"/><circle cx="600" cy="366" r="10" fill="#3d3d3d"/><circle cx="720" cy="366" r="10" fill="#3d3d3d"/>` +
      `<rect y="374" width="800" height="16" fill="#6b6b70"/>` + sleepers +
      // Platform
      `<rect y="390" width="800" height="110" fill="#cbc3b8"/><rect y="390" width="800" height="8" fill="#f4f4f4"/>` + tiles +
      `<path d="M770 470V330" stroke="#2f3a45" stroke-width="4"/><rect x="760" y="304" width="20" height="30" rx="4" fill="#2b2b2b"/>` +
      diff(770, 318, 22, signal(770, 318), anim({ type: 'blink', duty: 0.5, period: 1.1 }, signal(770, 318))) +
      // Luggage cart
      `<rect x="200" y="446" width="100" height="10" fill="#8d99ae"/><circle cx="214" cy="462" r="7" fill="#3d3d3d"/><circle cx="286" cy="462" r="7" fill="#3d3d3d"/>` +
      `<path d="M300 446l18 -28" stroke="#8d99ae" stroke-width="4"/>` +
      suitcase(226, 446, 40, 26, '#e63946') + suitcase(276, 446, 40, 32, '#3a86ff') +
      diff(250, 410, 22, suitcase(250, 420, 34, 16, '#ffb703'), '') +
      bench(420, 470, '#a0703f') + bench(640, 470, '#a0703f') +
      person(70, 470, '#8338ec') + person(130, 486, '#2a9d8f', true) + person(340, 470, '#fb8500') +
      person(470, 456, '#e63946', true, '#c68b5e', '#2b2b2b') + person(700, 480, '#3a86ff') +
      `<rect x="504" y="420" width="64" height="46" rx="4" fill="#ffb703"/><path d="M500 420h72l-6 -14h-60Z" fill="#e63946"/><rect x="514" y="432" width="44" height="18" fill="#fff6dc"/>` +
      diff(560, 474, 26, pigeon(552, 486), pigeon(566, 486)) + pigeon(600, 492, true) +
      newspaperBox(25, 445) +
      coffeeCup(408, 440) +
      shoppingBag(375, 472) +
      scooter(745, 482) +
      mailbox(588, 440) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['birds', 68, 51],
        ['cone', 185, 443],
        ['bin', 638, 431],
        ['ball', 379, 440, '#e63946'],
        ['shoppingBag', 728, 438],
      ])
    )
  },
})
