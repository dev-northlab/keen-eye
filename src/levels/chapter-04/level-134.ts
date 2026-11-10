// Motion differences: the lifeguard flag flaps faster on picture B; the swimmer bobs faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level134Redesign } from './level-134-redesign.ts'
import { castleFlag, cloud, coconut, crab, flipFlops, gull, person, sailboat, sandcastle, shell, snorkelMask, sunglasses, sunHat, towel, waves } from './shapes.ts'

/** Parasol with four colored panels; (x, y) = pole foot. Bounds: x ±44, y from −76 to 0. */
const panelParasol = (x: number, y: number, colors: [string, string, string, string]) =>
  `<rect x="${x - 2}" y="${y - 62}" width="4" height="62" fill="#3d4a55"/>` +
  colors.map((c, i) => `<path d="M${x} ${y - 76}L${x - 44 + i * 22} ${y - 54}h22Z" fill="${c}"/>`).join('') +
  `<circle cx="${x}" cy="${y - 76}" r="3" fill="#3d4a55"/>`

/** Towel, 50 × 22, with `stripes` stripes; (x, y) = center. */
const stripedTowel = (x: number, y: number, color: string, stripes: number) => {
  let s = `<rect x="${x - 25}" y="${y - 11}" width="50" height="22" rx="2" fill="${color}"/>`
  for (let i = 1; i <= stripes; i++) s += `<path d="M${x - 25 + (50 * i) / (stripes + 1)} ${y - 11}v22" stroke="#fff" stroke-width="3"/>`
  return s
}

/** Beach ball; (x, y) = center. Bounds: radius 12. */
const ball = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="12" fill="#f4f4f4"/><path d="M${x} ${y - 12}a12 12 0 0 1 12 12h-12Z" fill="#e63946"/><path d="M${x} ${y + 12}a12 12 0 0 1 -12 -12h12Z" fill="#3a86ff"/>` +
  `<path d="M${x - 12} ${y}a12 12 0 0 1 12 -12v12Z" fill="#ffd23f"/>`

/** Spade stuck in the sand; (x, y) = blade tip. Bounds: x ±6, y from −34 to 0. */
const spade = (x: number, y: number) => `<path d="M${x} ${y - 10}V${y - 32}" stroke="#ff9f1c" stroke-width="4" stroke-linecap="round"/><path d="M${x - 6} ${y - 12}h12l-2 10l-4 2l-4 -2Z" fill="#e63946"/>`

/** Swimmer's head and arm in the water; (x, y) = waterline. Bounds: x ±14, y from −14 to +2. */
const swimmer = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y - 6}" r="7" fill="#f2d29b"/><path d="M${x - 7} ${y - 9}a7 7 0 0 1 14 0Z" fill="#e63946"/><path d="M${x + 6} ${y}q6 -10 8 -12" stroke="#f2d29b" stroke-width="4" stroke-linecap="round" fill="none"/>`

const lifeguardFlag = (x: number, y: number) => `<path d="M${x} ${y}h26v18h-26Z" fill="#e63946"/><path d="M${x} ${y + 9}h26" stroke="#ffd23f" stroke-width="5"/>`

export default svgLevel({
  id: 134,
  chapter: 'sea',
  title: 'umbrellaBeach',
  parTimeSec: 110,
  redesign: level134Redesign,
  scene: ({ diff, anim, rand, secret, extra }) => {
    let sand = ''
    for (let i = 0; i < 24; i++) sand += `<ellipse cx="${(rand() * 800).toFixed(1)}" cy="${(280 + rand() * 214).toFixed(1)}" rx="5" ry="2" fill="#e0c47e"/>`
    let prints = ''
    for (let i = 0; i < 6; i++) prints += `<ellipse cx="${520 + i * 16}" cy="${300 + i * 22 + (i % 2) * 6}" rx="3" ry="5" fill="#e0c47e"/>`
    const flapping = (period: number) => anim({ type: 'sway', angle: 12, pivot: [740, 176], period }, lifeguardFlag(740, 176))
    const bobbing = (period: number) => anim({ type: 'bob', dx: 0, dy: 4, period }, swimmer(200, 220))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      `<circle cx="80" cy="60" r="34" fill="#ffd23f"/>` + cloud(300, 60, 0.6) + anim({ type: 'path', points: [[0, 0], [70, 0]], period: 30 }, cloud(560, 80, 0.5)) +
      gull(420, 90) + anim({ type: 'path', points: [[0, 0], [-120, 20]], period: 14 }, gull(700, 60)) +
      `<rect y="140" width="800" height="130" fill="#2f9fd0"/>` + waves(180, 13, 64, '#46b2dc', 270) + waves(220, 13, 64, '#5cc0e4', 270) +
      anim({ type: 'bob', dx: 6, dy: -3, period: 4 }, sailboat(600, 200, '#e63946')) +
      diff(200, 214, 22, bobbing(2.4), bobbing(0.9)) + swimmer(440, 236) +
      // Sand and the shore
      `<path d="M0 262q100 -12 200 0t200 0t200 0t200 0V500H0Z" fill="#f2dca2"/><path d="M0 264q100 -12 200 0t200 0t200 0t200 0" stroke="#ffffff" stroke-width="5" fill="none"/>` +
      sand + prints +
      // Lifeguard tower
      `<path d="M716 330L730 240M772 330L758 240M720 300h48" stroke="#f4f4f4" stroke-width="6"/><rect x="718" y="214" width="52" height="30" fill="#e63946"/><path d="M712 214h64l-6 -12h-52Z" fill="#f4f4f4"/>` +
      `<path d="M740 202V170" stroke="#3d4a55" stroke-width="3"/>` + diff(752, 186, 24, flapping(2.2), flapping(0.8)) +
      // Parasols and towels
      panelParasol(120, 340, ['#ff6b8b', '#ffffff', '#ff6b8b', '#ffffff']) + towel(150, 352, '#3a86ff') + person(170, 352, '#ffb703') +
      `<g transform="translate(110 360)"><rect x="-26" y="-6" width="40" height="10" rx="5" fill="#f2d29b"/><circle cx="18" cy="-1" r="7" fill="#f2d29b"/><rect x="-14" y="-7" width="16" height="12" fill="#2a9d8f"/></g>` +
      panelParasol(290, 326, ['#ffd23f', '#3a86ff', '#ffd23f', '#3a86ff']) +
      diff(282, 264, 22, `<path d="M290 250L268 272h22Z" fill="#3a86ff"/>`, `<path d="M290 250L268 272h22Z" fill="#4a6fe6"/>`) +
      diff(470, 360, 28, stripedTowel(470, 360, '#8ac926', 2), stripedTowel(470, 360, '#9cc93a', 2)) +
      panelParasol(470, 336, ['#2a9d8f', '#ffffff', '#2a9d8f', '#ffffff']) +
      panelParasol(640, 330, ['#ff9f1c', '#ffffff', '#ff9f1c', '#ffffff']) +
      diff(640, 352, 28, stripedTowel(640, 352, '#e63946', 2), stripedTowel(640, 352, '#e63946', 3)) +
      person(320, 340, '#ff006e') + person(600, 392, '#3a86ff', true, '#c68b5e', '#2b2b2b') +
      // The chapter's hidden key in the sand, behind the surfboard
      secret(68, 418, 0) +
      // Surfboard, sandcastle, ball, crab
      `<g transform="rotate(-10 60 450)"><ellipse cx="60" cy="400" rx="12" ry="50" fill="#ffb703"/><path d="M60 352v96" stroke="#e63946" stroke-width="4"/></g>` +
      sandcastle(380, 450) + diff(398, 390, 22, castleFlag(380, 450, '#e63946'), '') +
      diff(560, 444, 26, ball(554, 446), ball(566, 442)) +
      diff(468, 464, 24, spade(468, 482), `<g transform="rotate(22 468 482)">${spade(468, 482)}</g>`) +
      shell(260, 486, '#ffd1dc') + diff(304, 476, 22, shell(304, 484, '#ffb84d'), `<g transform="translate(304 484) scale(1.35) translate(-304 -484)">${shell(304, 484, '#ffb84d')}</g>`) +
      diff(200, 470, 22, '', crab(200, 480, '#e05a47')) +
      `<path d="M710 470h20l-3 18h-14Z" fill="#3a86ff"/><path d="M711 470q9 -10 18 0" stroke="#3a86ff" stroke-width="2" fill="none"/>` +
      shell(760, 490) + shell(560, 488, '#f4f1e8') +
      flipFlops(240, 415) +
      sunHat(522, 388) +
      sunglasses(680, 422) +
      coconut(530, 302) +
      snorkelMask(145, 442) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['clam', 734, 428],
        ['flipFlops', 209, 394],
        ['sunglasses', 570, 325],
        ['fish', 270, 201, '#ff9f43'],
        ['gull', 473, 88],
      ])
    )
  },
})
