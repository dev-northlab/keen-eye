// Lifeguard tower: a guarded beach among the sea's ten hardest (hidden until released, levels/upcoming.ts). New in
// the sea: a lifeguard tower with its lookout and roof flag, a rescue board and life ring, a warning flag, a
// rescue jet ski with its rider, a swimmer waving, a kite, a dog leaping for a frisbee, a hermit crab and plovers
// at the water's edge. Motion differences: the tower flag flies and the kite dances only on picture B; the
// swimmer waves only on A.
import { dog, person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { castleFlag, cloud, lifeRing, parasol, sandcastle, sun, sunglasses, towel } from './shapes.ts'

/** Rescue jet ski facing right, without its rider's vest; (x, y) = waterline at its stern. Bounds: x from −4 to +90, y from −54 to +6. */
const jetSki = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-4 0H70Q84 -4 86 -12L60 -16L40 -24H12Q0 -16 -4 0Z" fill="#f4f1e8"/><path d="M2 -6H80" stroke="#e63946" stroke-width="4"/>` +
  `<path d="M52 -18L60 -30M56 -30h10" stroke="#3d4a55" stroke-width="3"/><circle cx="36" cy="-48" r="8" fill="#e0b48a"/><path d="M28 -52q8 -10 16 0" fill="#3d2616"/>` +
  `<path d="M42 -34L58 -28" stroke="#e0b48a" stroke-width="4" stroke-linecap="round"/><path d="M-4 2q-20 -6 -34 4q16 -2 34 2Z" fill="#ffffff" fill-opacity="0.7"/></g>`

/** Hermit crab in its spiral shell, faces left; (x, y) = feet. Bounds: x from −14 to +14, y from −22 to 0. */
const hermitCrab = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-8 0l-4 -6M-3 0l-2 -6M2 0l0 -6" stroke="#e63946" stroke-width="2"/><ellipse cx="4" cy="-10" rx="10" ry="9" fill="#f4a261"/>` +
  `<path d="M4 -10m-5 0a5 5 0 1 0 5 -5a3 3 0 1 0 2 3" stroke="#c97b3a" stroke-width="1.5" fill="none"/><circle cx="-8" cy="-8" r="4" fill="#e63946"/>` +
  `<path d="M-10 -11l-2 -6M-7 -11l0 -6" stroke="#e63946" stroke-width="1.2"/><circle cx="-12" cy="-17" r="1.2" fill="#222"/><circle cx="-7" cy="-17" r="1.2" fill="#222"/></g>`

/** Plover at the water's edge, faces left; (x, y) = feet. Bounds: x ±10, y from −14 to 0. */
const plover = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-1 0v-4M2 0v-4" stroke="#f4a261" stroke-width="1.2"/><ellipse cx="1" cy="-7" rx="8" ry="4.5" fill="#c9b48e"/>` +
  `<path d="M-6 -6q6 4 12 0" fill="#ffffff"/><circle cx="-5" cy="-10" r="3.5" fill="#c9b48e"/><path d="M-8 -10l-3 1l3 1Z" fill="#2b2b2b"/></g>`

export default svgLevel({
  id: 189,
  chapter: 'sea',
  title: 'lifeguardTower',
  parTimeSec: 108,
  scene: ({ diff, anim, extra }) => {
    const towerFlag = `<rect x="220" y="206" width="24" height="14" fill="#e63946"/><path d="M232 206v14M220 213h24" stroke="#ffd23f" stroke-width="3"/>`
    const arm = `<path d="M706 258L714 244" stroke="#e0b48a" stroke-width="5" stroke-linecap="round"/>`
    const kite = `<path d="M620 80L636 102L620 124L604 102Z" fill="#8338ec"/><path d="M620 80V124M604 102H636" stroke="#ffffff" stroke-width="1.5"/><path d="M620 124q-6 6 0 10q6 4 -2 8" stroke="#ff006e" stroke-width="2" fill="none"/>`
    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` + sun(100, 80) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(420, 70, 0.6)) +
      // The sea, its swimmer and the jet ski
      `<rect y="200" width="800" height="134" fill="#2fa3c7"/><path d="M0 200H800" stroke="#7ec4dc" stroke-width="3"/>` +
      anim({ type: 'path', points: [[0, 0], [30, 0]], period: 5 }, `<path d="M40 230q10 -6 20 0t20 0M300 250q10 -6 20 0t20 0M620 300q10 -6 20 0t20 0M440 300q10 -6 20 0t20 0" stroke="#ffffff" stroke-opacity="0.6" stroke-width="3" fill="none"/>`) +
      jetSki(520, 282) +
      diff(556, 254, 22, `<rect x="548" y="242" width="16" height="24" rx="4" fill="#ff9f43"/>`, `<rect x="548" y="242" width="16" height="24" rx="4" fill="#ffd23f"/>`) +
      `<ellipse cx="700" cy="270" rx="14" ry="4" fill="#ffffff" fill-opacity="0.6"/><circle cx="700" cy="262" r="8" fill="#e0b48a"/><path d="M692 260a8 8 0 0 1 16 0Z" fill="#3a86ff"/>` +
      diff(708, 252, 24, anim({ type: 'sway', angle: 16, pivot: [706, 258], period: 1 }, arm), arm) +
      // Wet sand, the plovers, the beach
      `<path d="M0 330Q400 318 800 330V500H0Z" fill="#f3d9a4"/><path d="M0 332Q400 320 800 332" stroke="#e2c088" stroke-width="6" fill="none"/>` +
      plover(300, 346) + plover(322, 350) +
      // Warning flag
      `<path d="M380 344V272" stroke="#5c677d" stroke-width="3"/>` +
      diff(392, 283, 22, `<rect x="380" y="274" width="24" height="18" fill="#e63946"/><path d="M380 292L404 274V292Z" fill="#ffd23f"/>`, `<rect x="380" y="274" width="24" height="18" fill="#e63946"/>`) +
      // The tower: roof flag, lookout with binoculars, life ring, rescue board
      `<path d="M150 470L160 330M250 470L240 330M156 400L246 430M156 430L246 400" stroke="#f4f1e8" stroke-width="6"/>` +
      `<rect x="140" y="252" width="120" height="80" fill="#ffd23f"/><rect x="136" y="326" width="128" height="8" fill="#f4f1e8"/><rect x="160" y="266" width="76" height="38" fill="#1d3557"/>` +
      `<circle cx="206" cy="292" r="9" fill="#e0b48a"/><path d="M196 304q10 -8 20 0" fill="#e63946"/><path d="M130 254L200 234L270 254Z" fill="#e63946"/><path d="M220 240V204" stroke="#5c677d" stroke-width="2"/>` +
      diff(232, 213, 22, towerFlag, anim({ type: 'sway', angle: 12, pivot: [220, 213], period: 1.2 }, towerFlag)) +
      diff(196, 287, 22, `<rect x="186" y="282" width="18" height="10" rx="3" fill="#2b2b2b"/><circle cx="189" cy="287" r="3" fill="#5c677d"/><circle cx="199" cy="287" r="3" fill="#5c677d"/>`, '') +
      diff(150, 388, 22, lifeRing(150, 388, '#e63946'), '') +
      `<path d="M268 470L282 372Q288 360 292 372L282 470Z" fill="#e63946"/>` +
      diff(284, 402, 22, `<path d="M278 404H289L290 398H279Z" fill="#ffffff"/>`, `<path d="M278 404H289L290 398H279Z" fill="#1d3557"/>`) +
      // Hermit crab, the towel and its sunglasses, the sandcastle flag
      diff(361, 464, 22, hermitCrab(361, 474), '') +
      parasol(440, 452, '#ff6b8b') + towel(470, 458, '#3a86ff') +
      diff(480, 456, 22, sunglasses(480, 456), '') +
      sandcastle(570, 482) + diff(588, 424, 22, castleFlag(570, 482, '#8ac926'), castleFlag(570, 482, '#e63946')) +
      // Kid flying the kite, the dog and its frisbee
      person(670, 482, '#ff9f43', true, '#e0b48a', '#5a3d2b') + `<path d="M657 448L620 124" stroke="#3d4a55" stroke-width="1"/>` +
      diff(620, 111, 34, kite, anim({ type: 'sway', angle: 8, pivot: [620, 124], period: 2.2 }, kite)) +
      dog(740, 482, '#c48a5a') +
      diff(770, 420, 22, `<ellipse cx="770" cy="420" rx="12" ry="4" fill="#ff006e"/>`, `<ellipse cx="770" cy="420" rx="12" ry="4" fill="#3a86ff"/>`) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['gull', 400, 110],
        ['buoy', 460, 236],
        ['crab', 80, 474],
        ['shell', 250, 488],
        ['flipFlops', 520, 380],
      ])
    )
  },
})
