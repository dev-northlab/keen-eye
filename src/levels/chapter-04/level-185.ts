// Icebreaker: an arctic shore among the sea's ten hardest (hidden until released, levels/upcoming.ts). New in the
// sea: an icebreaker with its crane, funnel and ensign, a polar station hut with an anemometer, a snowmobile
// towing a sled, walruses on an ice floe and a narwhal. Motion differences: the anemometer spins and one walrus
// nods only on picture A; the ensign flies only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud } from './shapes.ts'

/** Walrus lying on the ice, faces left, without its head (`walrusHead`); (x, y) = belly bottom center. Bounds: x from −40 to +56, y from −40 to +6. */
const walrus = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-40 0Q-44 -30 -20 -34Q20 -40 44 -10L56 -2L44 4Q0 6 -40 0Z" fill="#a0705a"/>` +
  `<path d="M-24 0l-12 6h16Z" fill="#8a5a46"/><path d="M-6 -24q14 -6 26 2" stroke="#8a5a46" stroke-width="2" fill="none"/></g>`
/** Walrus head with tusks, long or short, for a walrus at (x, y). Bounds: x from −48 to −16, y from −40 to +4. */
const walrusHead = (x: number, y: number, long = true) =>
  `<g transform="translate(${x} ${y})"><circle cx="-30" cy="-26" r="14" fill="#a0705a"/><path d="M-40 -14V${long ? 4 : -6}M-34 -14V${long ? 4 : -6}" stroke="#f4f1e8" stroke-width="3" stroke-linecap="round"/>` +
  `<ellipse cx="-37" cy="-18" rx="11" ry="7" fill="#c9967a"/><circle cx="-34" cy="-31" r="1.6" fill="#222"/><path d="M-44 -18h-4M-44 -15h-4" stroke="#6b4a3a" stroke-width="1"/></g>`

/** Snowmobile facing right, without its whip flag; (x, y) = ground under its center. Bounds: x from −36 to +40, y from −70 to 0. */
const snowmobile = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-36 0H30Q40 0 40 -6" stroke="#2b2b2b" stroke-width="4" fill="none"/><path d="M-20 0V-8M20 0V-8" stroke="#2b2b2b" stroke-width="3"/>` +
  `<path d="M-34 -8H24L36 -18L20 -30H-10L-34 -18Z" fill="#ffd23f"/><path d="M20 -30L28 -42L32 -40L26 -26Z" fill="#8ecae6"/><rect x="-26" y="-34" width="22" height="6" rx="3" fill="#2b2b2b"/>` +
  `<path d="M-30 -20V-70" stroke="#3d4a55" stroke-width="1.5"/></g>`

export default svgLevel({
  id: 185,
  chapter: 'sea',
  title: 'icebreaker',
  parTimeSec: 104,
  scene: ({ diff, anim, extra }) => {
    const cups = `<path d="M122 150H146M134 138V162" stroke="#3d4a55" stroke-width="2"/><circle cx="122" cy="150" r="4" fill="#e63946"/><circle cx="146" cy="150" r="4" fill="#e63946"/><circle cx="134" cy="138" r="4" fill="#e63946"/><circle cx="134" cy="162" r="4" fill="#e63946"/>`
    const ensign = `<rect x="716" y="262" width="22" height="14" fill="#ffffff"/><rect x="716" y="267" width="22" height="4" fill="#3a86ff"/>`
    return (
      `<rect width="800" height="500" fill="#dcecf5"/>` +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 32 }, cloud(320, 90, 0.7)) +
      `<path d="M260 232L330 196L380 222L450 186L540 232Z" fill="#f4f8fb"/><path d="M330 196l-14 18h22ZM450 186l-18 22h28Z" fill="#cfe2ee"/>` +
      `<rect y="230" width="800" height="270" fill="#2c6e9b"/>` +
      anim({ type: 'path', points: [[0, 0], [20, 0]], period: 7 }, `<path d="M300 380h40M560 380h50M720 370h40M330 250h30" stroke="#ffffff" stroke-opacity="0.35" stroke-width="3" stroke-linecap="round"/>`) +
      // Snowy shore, the station hut with its window and anemometer
      `<path d="M0 290Q120 280 240 300L250 500H0Z" fill="#f1f6fa"/><path d="M240 300L250 500" stroke="#cfe2ee" stroke-width="6"/>` +
      `<rect x="30" y="250" width="120" height="62" fill="#c0392b"/><path d="M22 252Q90 228 158 252V258H22Z" fill="#ffffff"/>` +
      `<rect x="104" y="270" width="26" height="42" fill="#7a2a20"/><rect x="50" y="266" width="34" height="26" fill="#f4f1e8"/>` +
      diff(67, 279, 22, `<rect x="53" y="269" width="28" height="20" fill="#ffd166"/>`, `<rect x="53" y="269" width="28" height="20" fill="#1d3557"/>`) +
      `<path d="M134 244V150" stroke="#5c677d" stroke-width="3"/>` +
      diff(134, 150, 22, anim({ type: 'rotate', pivot: [134, 150], period: 1.2 }, cups), cups) +
      // Sled with its box, the snowmobile's whip flag
      `<path d="M66 440H144Q152 440 152 432" stroke="#5c677d" stroke-width="3" fill="none"/><rect x="72" y="424" width="70" height="10" fill="#a0703f"/><path d="M80 434v6M134 434v6" stroke="#5c677d" stroke-width="2"/><path d="M144 430H166" stroke="#3d4a55" stroke-width="2"/>` +
      diff(104, 412, 22, `<rect x="88" y="400" width="32" height="24" rx="2" fill="#2a9d8f"/><path d="M88 410h32" stroke="#1d6b62" stroke-width="2"/>`, '') +
      snowmobile(200, 440) +
      diff(178, 375, 22, `<path d="M170 370h16l-4 5l4 5h-16Z" fill="#ff9f43"/>`, `<path d="M170 370h16l-4 5l4 5h-16Z" fill="#8338ec"/>`) +
      // The icebreaker: crane load, funnel band, a bridge window, the ensign
      `<path d="M316 296H724L716 340H350Q330 330 316 296Z" fill="#c0392b"/><path d="M322 310H722" stroke="#ffffff" stroke-width="3"/>` +
      `<path d="M330 340l14 -10l12 10ZM700 340l10 -8l8 8Z" fill="#eef5fa"/>` +
      `<rect x="540" y="252" width="150" height="44" fill="#ffffff"/><rect x="600" y="226" width="90" height="26" fill="#ffffff"/><rect x="596" y="222" width="98" height="5" fill="#3d4a55"/>` +
      `<rect x="610" y="234" width="12" height="10" fill="#1d3557"/><rect x="628" y="234" width="12" height="10" fill="#1d3557"/><rect x="646" y="234" width="12" height="10" fill="#1d3557"/>` +
      diff(670, 239, 22, `<rect x="664" y="234" width="12" height="10" fill="#1d3557"/>`, '') +
      `<rect x="550" y="200" width="30" height="52" fill="#ffd23f"/><rect x="550" y="198" width="30" height="6" fill="#2b2b2b"/>` +
      diff(565, 217, 22, `<rect x="550" y="212" width="30" height="10" fill="#1d3557"/>`, `<rect x="550" y="212" width="30" height="10" fill="#e63946"/>`) +
      `<rect x="518" y="200" width="4" height="52" fill="#5c677d"/><rect x="504" y="198" width="32" height="4" rx="2" fill="#3d4a55"/>` +
      `<rect x="416" y="250" width="8" height="46" fill="#ffd23f"/><path d="M420 256L470 220" stroke="#ffd23f" stroke-width="5"/><path d="M470 220V268" stroke="#3d4a55" stroke-width="1.5"/>` +
      diff(470, 277, 22, `<rect x="458" y="268" width="24" height="18" fill="#3a86ff"/><path d="M466 268v18M474 268v18" stroke="#1d5e8c" stroke-width="2"/>`, '') +
      `<path d="M716 296V262" stroke="#5c677d" stroke-width="2"/>` +
      diff(727, 269, 22, ensign, anim({ type: 'sway', angle: 12, pivot: [716, 269], period: 1.4 }, ensign)) +
      // The narwhal's tusk
      `<ellipse cx="300" cy="462" rx="30" ry="10" fill="#9aa5b1"/><path d="M272 462l-12 -10v20Z" fill="#9aa5b1"/><circle cx="318" cy="458" r="1.6" fill="#222"/><path d="M290 456h4M300 466h4M284 464h3" stroke="#6c757d" stroke-width="2"/>` +
      diff(349, 452, 22, `<path d="M330 458L368 446" stroke="#f4f1e8" stroke-width="3" stroke-linecap="round"/>`, '') +
      // Ice floe and its walruses: the tusks, the nodding head
      `<path d="M430 470Q440 404 520 410Q640 396 760 414Q800 420 800 430V474Q620 484 430 470Z" fill="#eef5fa"/><path d="M440 466Q620 476 800 464" stroke="#cfe2ee" stroke-width="6" fill="none"/>` +
      walrus(560, 446) + diff(523, 438, 22, walrusHead(560, 446, true), walrusHead(560, 446, false)) +
      walrus(680, 446) + diff(648, 428, 28, anim({ type: 'bob', dx: 0, dy: -4, period: 1.6 }, walrusHead(680, 446)), walrusHead(680, 446)) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['gull', 300, 110],
        ['birds', 680, 110],
        ['fish', 420, 372],
        ['rock', 210, 320],
        ['buoy', 760, 362],
      ])
    )
  },
})
