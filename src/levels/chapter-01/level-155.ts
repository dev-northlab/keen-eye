// Farm workshop: repair day among the farm's ten hardest (hidden until released, levels/upcoming.ts). New on the
// farm: a workshop with a tool board, a workbench and vise, an anvil, an oil drum, a fuel tank, a spare tyre, a
// combine harvester, a swallows' nest and a cat on a stack of tyres. Motion differences: a swallow flies only on
// picture A; the combine's reel turns only on B; the cat swishes its tail only on A.
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { chick, cloud, hen, tractor } from '../shapes.ts'

/** Swallow in flight; (x, y) = body center. Bounds: x ±18, y ±8. */
const swallow = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-2 0Q-10 -8 -18 -4Q-10 -2 -2 2ZM2 0Q10 -8 18 -4Q10 -2 2 2Z" fill="#1d2b53"/>` +
  `<ellipse rx="6" ry="3.5" fill="#1d2b53"/><path d="M-6 0l-6 6M-6 1l-3 7" stroke="#1d2b53" stroke-width="1.5"/><circle cx="5" cy="0" r="2" fill="#c0392b"/></g>`

/** Chick's head peeking out of the nest; (x, y) = center. Bounds: x ±5, y from −5 to +4. */
const nestling = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="4.5" fill="#3d3d3d"/><path d="M${x - 3} ${y - 3}l3 -2l3 2" fill="#ffd23f"/>`

/** Tools on the board: a hammer or pliers hanging at (x, y). Bounds: x ±8, y ±14. */
const hammer = (x: number, y: number) =>
  `<rect x="${x - 1.5}" y="${y - 6}" width="3" height="20" fill="#a0703f"/><rect x="${x - 8}" y="${y - 12}" width="16" height="7" rx="1" fill="#6c757d"/>`
const pliers = (x: number, y: number) =>
  `<path d="M${x - 2} ${y - 12}L${x + 2} ${y}L${x - 5} ${y + 14}M${x + 2} ${y - 12}L${x - 2} ${y}L${x + 5} ${y + 14}" stroke="#6c757d" stroke-width="3" fill="none" stroke-linecap="round"/>` +
  `<path d="M${x - 2} ${y + 2}L${x - 5} ${y + 14}M${x + 2} ${y + 2}L${x + 5} ${y + 14}" stroke="#e63946" stroke-width="4" stroke-linecap="round"/>`

/** Vise's handle bar through (x, y), lying or upright. Bounds: x ±10, y ±10. */
const viseBar = (x: number, y: number, upright: boolean) =>
  upright
    ? `<path d="M${x} ${y - 10}V${y + 10}" stroke="#3d4a55" stroke-width="2.5" stroke-linecap="round"/>`
    : `<path d="M${x - 10} ${y}H${x + 10}" stroke="#3d4a55" stroke-width="2.5" stroke-linecap="round"/>`

/** Combine harvester without its reel and side mirror; (x, y) = ground at the header's left. Bounds: x from 0 to +270, y from −176 to 0. */
const combine = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="0" y="-70" width="44" height="50" rx="4" fill="#f4d35e"/><path d="M2 -20h40" stroke="#c9a227" stroke-width="4" stroke-dasharray="4 3"/>` +
  `<rect x="40" y="-110" width="210" height="90" rx="8" fill="#4c9a3f"/><rect x="160" y="-150" width="80" height="40" fill="#3f8f3a"/>` +
  `<rect x="180" y="-156" width="90" height="6" fill="#2f6e2f"/>` +
  `<rect x="90" y="-170" width="60" height="60" fill="#3f8f3a"/><rect x="96" y="-164" width="48" height="44" fill="#bde3f2"/>` +
  `<rect x="114" y="-176" width="10" height="6" rx="2" fill="#fb8500"/><rect x="220" y="-176" width="6" height="26" fill="#3d4a55"/>` +
  `<rect x="40" y="-60" width="210" height="6" fill="#f4d35e"/>` +
  `<circle cx="110" cy="-30" r="34" fill="#2b2b2b"/><circle cx="110" cy="-30" r="14" fill="#f4d35e"/>` +
  `<circle cx="220" cy="-18" r="20" fill="#2b2b2b"/><circle cx="220" cy="-18" r="8" fill="#f4d35e"/></g>`

/** The combine's reel; (x, y) = hub. Bounds: radius 28. */
const reel = (x: number, y: number) => {
  let bats = ''
  for (let a = 0; a < 360; a += 60) bats += `<g transform="rotate(${a})"><path d="M0 0V-22" stroke="#c9a227" stroke-width="2.5"/><rect x="-6" y="-26" width="12" height="4" fill="#e63946"/></g>`
  return `<g transform="translate(${x} ${y})">${bats}<circle r="4" fill="#3d4a55"/></g>`
}

/** Cat sitting with its back to us, without its tail (`catTail`); (x, y) = bottom center. Bounds: x ±10, y from −30 to 0. */
const catBody = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#f08c2e"><ellipse cy="-9" rx="9" ry="10"/><circle cx="2" cy="-21" r="7"/>` +
  `<path d="M-3 -25l0 -6l4 3ZM5 -27l4 -3v6Z"/><path d="M-4 -12q4 3 8 0" stroke="#c96a1f" stroke-width="2" fill="none"/></g>`

/** The cat's tail for a cat at (x, y). Bounds: x from −15 to −7, y from −13 to −1. */
const catTail = (x: number, y: number) =>
  `<path d="M${x - 8} ${y - 2}Q${x - 16} ${y - 2} ${x - 13} ${y - 12}" stroke="#f08c2e" stroke-width="3.5" fill="none" stroke-linecap="round"/>`

/** Tyre seen from the side lying flat; (x, y) = center. Bounds: x ±26, y ±10. */
const flatTyre = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="26" ry="10" fill="#2b2b2b"/><ellipse cx="${x}" cy="${y - 2}" rx="13" ry="4" fill="#4a4a4a"/>`

export default svgLevel({
  id: 155,
  chapter: 'farm',
  title: 'farmWorkshop',
  parTimeSec: 82,
  scene: ({ diff, anim, extra }) => {
    const flying = anim({ id: 'swallow', type: 'path', points: [[0, 0], [70, -20], [140, 10], [70, 30]], period: 7 }, swallow(150, 140))
    return (
      `<rect width="800" height="500" fill="#cfe6f5"/>` +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 28 }, cloud(440, 70, 0.7)) +
      anim({ type: 'path', points: [[0, 0], [-40, 0]], period: 34 }, cloud(720, 110, 0.5)) +
      `<path d="M0 300Q260 270 520 290T800 280V500H0Z" fill="#a9cf7a"/>` +
      `<path d="M80 340H380L470 500H10Z" fill="#d6cdb8"/>` +
      // Workshop: swallows' nest under the eave, tool board, workbench with the vise, tractor
      `<rect x="40" y="170" width="380" height="170" fill="#b5793f"/><path d="M40 200H420M40 240H420M40 280H420M40 320H420" stroke="#a0683a" stroke-width="2"/>` +
      `<path d="M24 176L230 108L436 176Z" fill="#8e2c27"/><path d="M24 176L230 108L436 176" stroke="#5e1f1b" stroke-width="5" fill="none"/>` +
      `<path d="M44 178Q56 196 72 178Z" fill="#8a6a4a"/>` + nestling(50, 180) + nestling(58, 178) +
      diff(66, 178, 22, nestling(66, 179), '') +
      diff(150, 140, 24, flying, swallow(150, 140), 'swallow') +
      `<rect x="90" y="200" width="280" height="140" fill="#4a3f36"/>` +
      `<rect x="108" y="212" width="86" height="56" fill="#c68b4e"/>` +
      `<path d="M122 222l-4 26M118 222h8" stroke="#8d99ae" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M134 226h6v28h-6Z" fill="#8d99ae"/><rect x="133" y="218" width="8" height="8" fill="#a0703f"/>` +
      diff(152, 240, 22, hammer(152, 240), pliers(152, 240)) +
      `<path d="M170 222v22" stroke="#e63946" stroke-width="5" stroke-linecap="round"/><path d="M170 244v12" stroke="#6c757d" stroke-width="2"/>` +
      `<path d="M184 222v18" stroke="#3a86ff" stroke-width="5" stroke-linecap="round"/><path d="M184 240v12" stroke="#6c757d" stroke-width="2"/>` +
      `<rect x="100" y="286" width="118" height="8" fill="#8a5a33"/><path d="M106 294v46M212 294v46" stroke="#6b4a2b" stroke-width="5"/>` +
      `<rect x="196" y="272" width="16" height="14" fill="#3d4a55"/>` +
      diff(204, 278, 22, viseBar(204, 278, false), viseBar(204, 278, true)) +
      tractor(300, 336, '#d62828') + `<path d="M318 336v-12h16v12Z" fill="#e63946"/>` +
      // Spare tyre leaning by the door, oil drum, anvil with its hammer
      `<circle cx="395" cy="310" r="28" fill="#2b2b2b"/><circle cx="395" cy="310" r="16" fill="#4a4a4a"/>` +
      diff(395, 310, 22, `<circle cx="395" cy="310" r="10" fill="#f4d35e"/>`, `<circle cx="395" cy="310" r="10" fill="#c9d1d9"/>`) +
      `<rect x="236" y="330" width="28" height="44" rx="3" fill="#3a86ff"/><path d="M236 338H264M236 366H264" stroke="#1d5fbf" stroke-width="2"/>` +
      diff(250, 352, 22, `<rect x="236" y="348" width="28" height="8" fill="#ffffff"/>`, `<rect x="236" y="348" width="28" height="8" fill="#ffd23f"/>`) +
      `<path d="M126 356H178L172 362H162V372H174V378H128V372H140V362H134ZM126 356Q110 356 104 352H126Z" fill="#4a4f57"/>` +
      diff(152, 348, 22, `<rect x="152" y="342" width="16" height="7" rx="1" fill="#8d99ae"/><path d="M152 346H136" stroke="#a0703f" stroke-width="3"/>`, '') +
      // Fuel tank with its nozzle
      `<path d="M434 256V340M486 256V340M434 300H486" stroke="#6c757d" stroke-width="4"/>` +
      `<rect x="426" y="220" width="68" height="36" rx="18" fill="#e63946"/><path d="M490 244Q500 270 484 290" stroke="#2b2b2b" stroke-width="3" fill="none"/>` +
      diff(482, 298, 22, `<path d="M478 288h12l-4 14h-8Z" fill="#2b2b2b"/><path d="M486 302l4 6" stroke="#2b2b2b" stroke-width="3"/>`, `<path d="M478 288h12l-4 14h-8Z" fill="#3f8f3a"/><path d="M486 302l4 6" stroke="#3f8f3a" stroke-width="3"/>`) +
      // Combine harvester
      combine(524, 400) +
      diff(548, 334, 30, reel(548, 334), anim({ type: 'rotate', pivot: [548, 334], period: 2.2 }, reel(548, 334))) +
      diff(604, 262, 22, `<path d="M614 262H604" stroke="#3d4a55" stroke-width="2.5"/><rect x="597" y="252" width="8" height="16" rx="2" fill="#3d4a55"/>`, '') +
      // Yard: tyres with the cat, the mechanic, hens
      flatTyre(60, 470) + flatTyre(60, 454) + flatTyre(60, 438) + catBody(60, 432) +
      diff(50, 424, 22, anim({ type: 'sway', angle: 18, pivot: [52, 430], period: 1.6 }, catTail(60, 432)), catTail(60, 432)) +
      person(450, 470, '#1d5fbf', true, '#e0b48a', '#5a3d2b') +
      hen(330, 452, false, '#ffffff') + chick(368, 470) + chick(386, 476, true) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['stones', 290, 486],
        ['horseshoe', 210, 470],
        ['wrench', 400, 480],
        ['toolbox', 760, 478, '#e63946'],
        ['ladybug', 580, 470],
      ])
    )
  },
})
