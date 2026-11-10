// Cable car hill: a hillside town among the city's ten hardest (hidden until released, levels/upcoming.ts). New in
// the city: a cable car with its two stations and gondolas, houses climbing a hill, a domed church, a stairway with
// a lamp and flower pots, a paraglider, a café terrace, a coin telescope and a cat on the parapet. Motion
// differences: the gondola climbs only on picture A; the paraglider drifts only on B; washing flaps only on A.
import { person } from './shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cat } from '../shapes.ts'

/** Height of the hill at x: from (0, 420) to (800, 180). */
const hillY = (x: number) => 420 - 0.3 * x
/** Height of the cable at x: from the lower station (60, 340) to the upper one (740, 70). */
const cableY = (x: number) => 340 - (270 / 680) * (x - 60)

/** Gondola hanging from the cable at x; (x, cableY(x)) = its pulley. Bounds: x ±16, y from 0 to +44. */
const gondola = (x: number, color: string) => {
  const y = cableY(x)
  return `<path d="M${x} ${y}V${y + 16}" stroke="#3d4a55" stroke-width="2.5"/><circle cx="${x}" cy="${y}" r="3" fill="#3d4a55"/>` +
    `<rect x="${x - 16}" y="${y + 16}" width="32" height="28" rx="6" fill="${color}"/><rect x="${x - 11}" y="${y + 21}" width="22" height="10" rx="2" fill="#bde3f2"/>`
}

/** House on the hill; (x, y) = bottom left, w × h, with a pitched roof and a stone base down to the slope. */
const hillHouse = (x: number, y: number, w: number, h: number, wall: string, roof: string) =>
  `<path d="M${x} ${y - 2}H${x + w}V${hillY(x + w) + 2}L${x} ${hillY(x) + 2}Z" fill="#b8b2a6"/>` +
  `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${wall}"/><path d="M${x - 6} ${y - h + 2}L${x + w / 2} ${y - h - 22}L${x + w + 6} ${y - h + 2}Z" fill="${roof}"/>` +
  `<rect x="${x + w / 2 - 8}" y="${y - 26}" width="16" height="26" fill="#6b4a2b"/>`

/** Window with two shutters; (x, y) = center. Bounds: x ±16, y ±10. */
const shuttered = (x: number, y: number, shutter: string) =>
  `<rect x="${x - 7}" y="${y - 10}" width="14" height="20" fill="#bde3f2"/><rect x="${x - 16}" y="${y - 10}" width="8" height="20" fill="${shutter}"/><rect x="${x + 8}" y="${y - 10}" width="8" height="20" fill="${shutter}"/>`

/** Paraglider; (x, y) = pilot. Bounds: x ±30, y from −40 to +8. */
const paraglider = (x: number, y: number) =>
  `<path d="M${x - 28} ${y - 30}Q${x} ${y - 48} ${x + 28} ${y - 30}L${x + 22} ${y - 26}Q${x} ${y - 40} ${x - 22} ${y - 26}Z" fill="#fb8500"/>` +
  `<path d="M${x - 22} ${y - 26}L${x} ${y}L${x + 22} ${y - 26}M${x - 8} ${y - 34}L${x} ${y}L${x + 8} ${y - 34}" stroke="#3d4a55" stroke-width="0.8" fill="none"/>` +
  `<circle cx="${x}" cy="${y - 2}" r="4" fill="#3a86ff"/><rect x="${x - 3}" y="${y + 1}" width="6" height="7" fill="#3a86ff"/>`

/** Washing on a line under a balcony, hanging from (x, y). Bounds: x ±20, y from 0 to +18. */
const washing = (x: number, y: number) =>
  `<path d="M${x - 20} ${y}H${x + 20}" stroke="#8d99ae" stroke-width="1.2"/><rect x="${x - 17}" y="${y}" width="10" height="14" fill="#ff006e"/>` +
  `<path d="M${x - 3} ${y}h10l-2 18h-6Z" fill="#3a86ff"/><rect x="${x + 10}" y="${y}" width="8" height="10" fill="#ffd23f"/>`

/** Coin telescope on its post; (x, y) = foot. Bounds: x from −12 to +16, y from −52 to 0. */
const telescope = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y}V${y - 30}M${x - 10} ${y}h20" stroke="#3d4a55" stroke-width="4"/>` +
  `<rect x="${x - 10}" y="${y - 46}" width="24" height="16" rx="5" fill="${color}" transform="rotate(-14 ${x} ${y - 38})"/><circle cx="${x + 12}" cy="${y - 44}" r="4" fill="#3d4a55"/>`

export default svgLevel({
  id: 167,
  chapter: 'city',
  title: 'cableCarHill',
  parTimeSec: 96,
  scene: ({ diff, anim, extra }) => {
    const climbing = anim({ id: 'gondola', type: 'path', points: [[0, 0], [100, -40]], period: 8 }, gondola(300, '#e63946'))
    const drifting = anim({ id: 'glider', type: 'path', points: [[0, 0], [110, -16]], period: 9 }, paraglider(180, 96))
    const flapping = anim({ type: 'sway', angle: 10, pivot: [200, 318], period: 1.2 }, washing(200, 318))
    let houses = ''
    for (const [x, w, h, wall, roof] of [[250, 60, 50, '#f2cc8f', '#c8623b'], [330, 70, 56, '#81b29a', '#8e2c27'], [430, 56, 48, '#e07a5f', '#5e3b1a'], [560, 50, 46, '#f4d6a0', '#c8623b'], [700, 60, 50, '#bdb2ff', '#8e2c27']] as const)
      houses += hillHouse(x, hillY(x + w), w, h, wall, roof)
    return (
      `<rect width="800" height="500" fill="#cfe8f7"/>` +
      `<path d="M0 420L800 180V500H0Z" fill="#a9cf7a"/>` +
      diff(180, 76, 34, paraglider(180, 96), drifting, 'glider') +
      houses +
      // House with the shutters, church with its finial, house with the washing
      hillHouse(610, hillY(670), 60, 56, '#ffd6a5', '#8e2c27') + diff(640, 200, 22, shuttered(640, 200, '#2a9d8f'), shuttered(640, 200, '#e63946')) +
      `<path d="M496 ${hillY(544)}H544V${hillY(544) + 2}L496 ${hillY(496) + 2}Z" fill="#b8b2a6"/>` +
      `<rect x="496" y="${hillY(544) - 36}" width="48" height="40" fill="#f4f1e8"/><path d="M500 ${hillY(544) - 36}a20 20 0 0 1 40 0Z" fill="#5b8fc7"/>` +
      diff(520, 192, 22, `<path d="M520 200V184M514 190h12" stroke="#ffd23f" stroke-width="3"/>`, '') +
      hillHouse(160, hillY(240), 80, 64, '#e9c46a', '#5e3b1a') + `<rect x="176" y="314" width="48" height="5" fill="#5e3b1a"/>` +
      diff(200, 326, 24, flapping, washing(200, 318)) +
      // Cable, stations, gondolas, the bird on the cable
      `<path d="M60 340L740 70" stroke="#3d4a55" stroke-width="2"/>` +
      `<rect x="20" y="330" width="70" height="56" fill="#c9d1d9"/><rect x="14" y="322" width="82" height="10" fill="#5c677d"/>` +
      `<rect x="712" y="60" width="80" height="56" fill="#c9d1d9"/><rect x="706" y="52" width="92" height="10" fill="#5c677d"/>` +
      diff(722, 116, 22, `<rect x="708" y="104" width="28" height="24" rx="6" fill="#3a86ff"/><rect x="712" y="108" width="20" height="8" rx="2" fill="#bde3f2"/>`, `<rect x="708" y="104" width="28" height="24" rx="6" fill="#8ac926"/><rect x="712" y="108" width="20" height="8" rx="2" fill="#bde3f2"/>`) +
      diff(300, 266, 30, climbing, gondola(300, '#e63946'), 'gondola') +
      diff(600, 118, 22, `<g transform="translate(600 ${cableY(600)})"><ellipse cy="-5" rx="7" ry="4.5" fill="#5e4630"/><circle cx="5" cy="-9" r="3.5" fill="#5e4630"/><path d="M8 -9l3 1l-3 1Z" fill="#ffb703"/></g>`, '') +
      // Stairway with its lamp and flower pots
      `<path d="M40 500L150 400H180L70 500Z" fill="#d6cdb8"/>` +
      Array.from({ length: 8 }, (_, i) => `<path d="M${54 + i * 14} ${490 - i * 12.5}h28" stroke="#b8b2a6" stroke-width="2"/>`).join('') +
      `<path d="M150 400V370" stroke="#3d4a55" stroke-width="3"/>` +
      diff(150, 362, 22, `<path d="M142 370h16l-3 -14h-10Z" fill="#3d4a55"/><circle cx="150" cy="364" r="4" fill="#ffd166"/>`, '') +
      `<path d="M50 466h16l-2 10h-12Z" fill="#c8623b"/><circle cx="58" cy="462" r="5" fill="#ff006e"/>` +
      diff(86, 444, 22, `<path d="M78 440h16l-2 10h-12Z" fill="#c8623b"/><circle cx="86" cy="436" r="5" fill="#ffd23f"/>`, '') +
      // Café terrace: umbrella, the cat on the parapet, the coin telescope
      `<rect x="330" y="420" width="470" height="80" fill="#d6cdb8"/><rect x="330" y="412" width="470" height="12" fill="#b8b2a6"/>` +
      `<path d="M480 470V412" stroke="#6c757d" stroke-width="3"/>` +
      diff(480, 406, 30, `<path d="M452 414Q480 386 508 414Z" fill="#e63946"/>`, `<path d="M452 414Q480 386 508 414Z" fill="#2a9d8f"/>`) +
      `<rect x="460" y="460" width="40" height="5" fill="#8a5a33"/><path d="M470 465v20M490 465v20" stroke="#8a5a33" stroke-width="3"/>` +
      person(430, 492, '#8338ec', false, '#c68b5e', '#2b2b2b') + person(530, 492, '#ffb703', true) +
      diff(590, 400, 22, cat(590, 412, '#6c757d'), '') +
      telescope(690, 470, '#ffd23f') + diff(690, 428, 22, `<rect x="680" y="424" width="24" height="16" rx="5" fill="#3a86ff" transform="rotate(-14 690 432)"/>`, `<rect x="680" y="424" width="24" height="16" rx="5" fill="#e63946" transform="rotate(-14 690 432)"/>`) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['pigeon', 760, 470],
        ['flowerBox', 380, 404, '#ff006e'],
        ['coffeeCup', 380, 470],
        ['balloon', 270, 400, '#3a86ff'],
        ['ball', 620, 490, '#ffb703'],
      ])
    )
  },
})
