// Lavender field: the farm's hardest scene (hidden until released, levels/upcoming.ts). New on the farm: a stone
// farmhouse with a stork's nest on its chimney, a stork, a copper still in a stone shed, a vintage camper van with
// a cat on its roof rack, lavender rows with a picker and her sickle, a cart of lavender bundles and a peacock.
// Motion differences: the stork flies only on picture A; the still steams and a butterfly flutters only on B.
import { butterfly, oak } from '../chapter-03/shapes.ts'
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bee, cloud } from '../shapes.ts'

/** Stork flying, faces right; (x, y) = body center. Bounds: x ±28, y ±10. */
const stork = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-6 -2Q-14 -12 -26 -8Q-14 -4 -6 2ZM6 -2Q14 -12 26 -8Q14 -4 6 2Z" fill="#f4f1e8"/>` +
  `<path d="M-26 -8l6 2M26 -8l-6 2" stroke="#2b2b2b" stroke-width="3"/><ellipse rx="10" ry="4" fill="#f4f1e8"/>` +
  `<path d="M8 -1l10 -2" stroke="#f4f1e8" stroke-width="3"/><path d="M18 -3l9 2" stroke="#e63946" stroke-width="2"/><path d="M-10 1l-12 3" stroke="#e63946" stroke-width="1.5"/></g>`

/** Stork chick's head peeking out of the nest at (x, y). Bounds: x ±5, y from −6 to +4. */
const storkChick = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="4.5" fill="#f4f1e8"/><path d="M${x + 3} ${y}l5 1" stroke="#2b2b2b" stroke-width="2"/>`

/** Provençal stone farmhouse with blue shutters and a chimney topped by a nest; (x, y) = bottom left, 220 wide. Bounds: y from −222 to 0. */
const farmhouse = (x: number, y: number) => {
  let stones = ''
  for (let i = 0; i < 18; i++) stones += `<ellipse cx="${x + 10 + ((i * 47) % 200)}" cy="${y - 10 - ((i * 31) % 130)}" rx="9" ry="5" fill="#d8c3a0"/>`
  const win = (cx: number, cy: number) =>
    `<rect x="${cx - 12}" y="${cy - 16}" width="24" height="32" fill="#4a3f36"/><rect x="${cx - 24}" y="${cy - 16}" width="11" height="32" fill="#5b8fc7"/>` +
    `<rect x="${cx + 13}" y="${cy - 16}" width="11" height="32" fill="#5b8fc7"/><rect x="${cx - 14}" y="${cy + 16}" width="28" height="4" fill="#c9b48e"/>`
  return (
    `<rect x="${x + 160}" y="${y - 210}" width="22" height="50" fill="#c9b48e"/>` +
    `<rect x="${x}" y="${y - 150}" width="220" height="150" fill="#e6d5b8"/>${stones}` +
    win(x + 60, y - 110) + win(x + 160, y - 110) + win(x + 160, y - 44) +
    `<path d="M${x + 44} ${y}V${y - 52}a16 16 0 0 1 32 0V${y}Z" fill="#5b8fc7"/>` +
    `<path d="M${x - 12} ${y - 146}L${x + 110} ${y - 200}L${x + 232} ${y - 146}Z" fill="#c8623b"/>` +
    `<path d="M${x + 156} ${y - 212}Q${x + 171} ${y - 222} ${x + 186} ${y - 212}Q${x + 171} ${y - 206} ${x + 156} ${y - 212}Z" fill="#8a6a4a"/>`
  )
}

/** Stone shed with a copper still, without the gauge's needle; (x, y) = bottom left, 130 wide. Bounds: y from −108 to 0. */
const stillShed = (x: number, y: number) =>
  `<rect x="${x}" y="${y - 96}" width="130" height="96" fill="#d8c3a0"/><rect x="${x + 12}" y="${y - 80}" width="106" height="80" fill="#5e4a3a"/>` +
  `<path d="M${x - 8} ${y - 94}L${x + 65} ${y - 108}L${x + 138} ${y - 94}Z" fill="#c8623b"/>` +
  `<rect x="${x + 86}" y="${y - 120}" width="8" height="30" fill="#b06a3b"/>` +
  `<path d="M${x + 24} ${y}V${y - 36}Q${x + 24} ${y - 58} ${x + 50} ${y - 58}Q${x + 76} ${y - 58} ${x + 76} ${y - 36}V${y}Z" fill="#c8743b"/>` +
  `<path d="M${x + 50} ${y - 58}V${y - 68}Q${x + 50} ${y - 74} ${x + 90} ${y - 74}V${y - 90}" stroke="#c8743b" stroke-width="5" fill="none"/>` +
  `<path d="M${x + 84} ${y - 40}h20M${x + 84} ${y - 30}h20M${x + 84} ${y - 20}h20" stroke="#c8743b" stroke-width="4"/>` +
  `<circle cx="${x + 46}" cy="${y - 42}" r="8" fill="#f4f1e8" stroke="#3d4a55" stroke-width="2"/>`

/** Vintage camper van, faces right, without its headlight, suitcase or cat; (x, y) = ground under its back. Bounds: x from 0 to +184, y from −104 to 0. */
const camperVan = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="20" y="-104" width="120" height="6" fill="#3d4a55"/><path d="M28 -98v-6M132 -98v-6" stroke="#3d4a55" stroke-width="3"/>` +
  `<path d="M0 -20V-82Q0 -96 16 -96H150Q172 -96 180 -60L184 -20Z" fill="#9ed6c4"/><path d="M0 -50H184" stroke="#ffffff" stroke-width="26"/>` +
  `<rect x="18" y="-88" width="30" height="24" rx="4" fill="#bde3f2"/><rect x="58" y="-88" width="30" height="24" rx="4" fill="#bde3f2"/><rect x="98" y="-88" width="30" height="24" rx="4" fill="#bde3f2"/>` +
  `<path d="M140 -88H160Q170 -88 174 -64H140Z" fill="#bde3f2"/><path d="M168 -44h10" stroke="#3d4a55" stroke-width="2"/>` +
  `<rect x="0" y="-24" width="186" height="6" fill="#c9d1d9"/>` +
  `<circle cx="38" cy="-12" r="14" fill="#2b2b2b"/><circle cx="38" cy="-12" r="6" fill="#f4f1e8"/><circle cx="150" cy="-12" r="14" fill="#2b2b2b"/><circle cx="150" cy="-12" r="6" fill="#f4f1e8"/></g>`

/** Cat lying on a roof rack, faces left; (x, y) = bottom center. Bounds: x ±16, y from −16 to 0. */
const lyingCat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#2b2b2b"><ellipse cy="-6" rx="13" ry="6"/><circle cx="-12" cy="-10" r="5"/>` +
  `<path d="M-15 -14l1 -4l3 3ZM-10 -15l2 -3l1 4Z"/><path d="M12 -4q6 2 4 -8" stroke="#2b2b2b" stroke-width="3" fill="none"/><circle cx="-14" cy="-10" r="1" fill="#ffd23f"/></g>`

/** Lavender bundle tied with a ribbon; (x, y) = bottom center. Bounds: x ±12, y from −26 to 0. */
const bundle = (x: number, y: number) =>
  `<path d="M${x - 6} ${y}L${x - 10} ${y - 24}M${x} ${y}V${y - 26}M${x + 6} ${y}L${x + 10} ${y - 24}" stroke="#4c9a3f" stroke-width="2"/>` +
  `<path d="M${x - 12} ${y - 26}l4 -0v10h-4ZM${x - 3} ${y - 28}h6v12h-6ZM${x + 8} ${y - 26}h4v10h-4Z" fill="#8e6cc4"/>`
const ribbon = (x: number, y: number, color: string) => `<rect x="${x - 6}" y="${y - 10}" width="12" height="4" fill="${color}"/><path d="M${x} ${y - 8}l-5 6M${x} ${y - 8}l5 6" stroke="${color}" stroke-width="2"/>`

/** Peacock walking left, its tail closed, without the crest; (x, y) = feet. Bounds: x from −30 to +64, y from −54 to 0. */
const peacock = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M10 -16Q40 -14 64 -4Q40 -2 8 -8Z" fill="#2f7d55"/>` +
  [24, 38, 52].map((d) => `<circle cx="${d}" cy="${-8 + d * 0.06}" r="3" fill="#1d5fbf"/>`).join('') +
  `<path d="M-2 -8V0M6 -8V0" stroke="#8d99ae" stroke-width="2"/><ellipse cx="0" cy="-18" rx="14" ry="10" fill="#1d5fbf"/>` +
  `<path d="M-8 -24Q-14 -36 -18 -42" stroke="#1d5fbf" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="-19" cy="-43" r="5" fill="#1d5fbf"/>` +
  `<path d="M-23 -43l-5 1l5 2Z" fill="#c9b48e"/><circle cx="-20" cy="-44" r="1.3" fill="#fff"/></g>`
const crest = (x: number, y: number) =>
  `<path d="M${x - 19} ${y - 48}l-3 -8M${x - 18} ${y - 48}v-9M${x - 17} ${y - 48}l3 -8" stroke="#1d5fbf" stroke-width="1.2"/>` +
  `<circle cx="${x - 22}" cy="${y - 56}" r="1.8" fill="#1d5fbf"/><circle cx="${x - 18}" cy="${y - 57}" r="1.8" fill="#1d5fbf"/><circle cx="${x - 14}" cy="${y - 56}" r="1.8" fill="#1d5fbf"/>`

export default svgLevel({
  id: 160,
  chapter: 'farm',
  title: 'lavenderField',
  parTimeSec: 92,
  scene: ({ diff, anim, extra }) => {
    const flying = anim({ id: 'stork', type: 'path', points: [[0, 0], [80, -20], [160, 0], [80, 20]], period: 9 }, stork(330, 90))
    const steam = `<circle cx="350" cy="210" r="8" fill="#ffffff" fill-opacity="0.8"/><circle cx="356" cy="198" r="6" fill="#ffffff" fill-opacity="0.7"/>`
    let rows = ''
    for (let i = 0; i < 9; i++) {
      const y = 372 + i * 15
      for (let x = (i % 2) * 14; x < 800; x += 28) rows += `<ellipse cx="${x}" cy="${y}" rx="15" ry="7" fill="${i % 2 ? '#8e6cc4' : '#7a58b3'}"/>`
    }
    return (
      `<rect width="800" height="500" fill="#cde6f4"/>` +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(600, 60, 0.6)) +
      `<path d="M0 260Q200 220 420 246T800 230V370H0Z" fill="#b9d58a"/>` +
      oak(640, 340, 0.7, '#8aa37a') + oak(760, 330, 0.6, '#8aa37a') +
      // Farmhouse: the nest with its chicks, the flower pot; the stork in the sky
      farmhouse(26, 340) + storkChick(196, 124) +
      diff(208, 120, 22, storkChick(208, 124), '') +
      diff(330, 90, 30, flying, stork(330, 90), 'stork') +
      diff(86, 238, 22, `<path d="M78 236h16l-3 10h-10Z" fill="#c8623b"/><g fill="#e63946"><circle cx="82" cy="232" r="4"/><circle cx="90" cy="231" r="4"/></g>`, `<path d="M78 236h16l-3 10h-10Z" fill="#c8623b"/><g fill="#ffd23f"><circle cx="82" cy="232" r="4"/><circle cx="90" cy="231" r="4"/></g>`) +
      // Still shed: the steam, the gauge
      stillShed(262, 340) +
      diff(352, 206, 22, steam, anim({ type: 'bob', dx: 2, dy: -5, period: 1.6 }, steam)) +
      diff(308, 298, 22, `<path d="M308 298l5 -5" stroke="#e63946" stroke-width="2" stroke-linecap="round"/>`, `<path d="M308 298l-5 -5" stroke="#e63946" stroke-width="2" stroke-linecap="round"/>`) +
      // Camper van: suitcase, cat, headlight
      camperVan(414, 362) +
      diff(470, 252, 22, `<rect x="458" y="244" width="26" height="14" rx="2" fill="#a0632b"/><path d="M466 244v-4h10v4" stroke="#5e3b1a" stroke-width="2" fill="none"/>`, `<rect x="458" y="244" width="26" height="14" rx="2" fill="#e63946"/><path d="M466 244v-4h10v4" stroke="#5e3b1a" stroke-width="2" fill="none"/>`) +
      diff(536, 250, 22, lyingCat(536, 258), '') +
      diff(586, 322, 22, `<circle cx="586" cy="320" r="7" fill="#fff3b0" stroke="#3d4a55" stroke-width="2"/>`, '') +
      // Lavender rows, the picker, the cart of bundles, the peacock, the butterfly
      `<rect y="364" width="800" height="136" fill="#9a7bc9"/>` + rows +
      person(690, 446, '#ffffff', true, '#e0b48a', '#5a3d2b') +
      diff(712, 404, 22, `<path d="M704 410l6 -6" stroke="#6b4a2b" stroke-width="3"/><path d="M710 404q12 -10 6 -20" stroke="#adb5bd" stroke-width="3" fill="none"/>`, '') +
      `<rect x="196" y="440" width="112" height="22" rx="3" fill="#a0703f"/><circle cx="216" cy="468" r="12" fill="#5e3b1a"/><circle cx="288" cy="468" r="12" fill="#5e3b1a"/>` +
      bundle(214, 442) + bundle(238, 442) + bundle(262, 442) + bundle(286, 442) +
      ribbon(214, 442, '#ffd23f') + ribbon(238, 442, '#ffd23f') + ribbon(286, 442, '#ffd23f') +
      diff(262, 432, 22, ribbon(262, 442, '#ffd23f'), ribbon(262, 442, '#e63946')) +
      peacock(118, 446) + diff(98, 394, 22, crest(118, 446), '') +
      diff(450, 420, 22, butterfly(450, 420, '#ffd23f'), anim({ type: 'bob', dx: 4, dy: 5, period: 0.9 }, butterfly(450, 420, '#ffd23f'))) +
      anim({ type: 'bob', dx: 3, dy: 3, period: 1.2 }, bee(560, 400)) + anim({ type: 'bob', dx: -3, dy: 3, period: 1.4 }, bee(380, 470)) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['bee', 620, 450],
        ['butterfly', 350, 400, '#ff6b8b'],
        ['ladybug', 30, 470],
        ['snail', 760, 480],
        ['bird', 740, 250],
      ])
    )
  },
})
