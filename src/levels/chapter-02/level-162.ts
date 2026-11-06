// Airport: the apron of a city airport among the city's ten hardest (hidden until released, levels/upcoming.ts).
// New in the city: a terminal, a control tower, an airliner, a small plane taking off, a stair truck, a baggage
// tug with its carts, a fuel truck, a marshaller and a windsock. Motion differences: the small plane climbs only
// on picture A; the windsock swings only on B; the marshaller waves his wand only on A.
import { person } from './shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud } from '../shapes.ts'

/** Small plane climbing to the right; (x, y) = center. Bounds: x ±26, y ±12. */
const smallPlane = (x: number, y: number) =>
  `<g transform="translate(${x} ${y}) rotate(-12)"><path d="M-24 0Q-24 -6 -14 -6H16Q26 -6 26 0Q26 4 16 4H-14Q-24 4 -24 0Z" fill="#ffffff"/>` +
  `<path d="M-22 -4L-26 -12H-20L-14 -6Z" fill="#e63946"/><path d="M-4 0L-10 10H-2L6 0Z" fill="#c9d1d9"/><path d="M14 -4h6" stroke="#3a86ff" stroke-width="2"/></g>`

/** Windsock flying to the left from its pivot (x, y) on the pole top. Bounds: x from −32 to +2, y ±7. */
const windsock = (x: number, y: number) =>
  `<path d="M${x} ${y - 6}L${x - 30} ${y - 3}V${y + 3}L${x} ${y + 6}Z" fill="#fb8500"/><path d="M${x - 10} ${y - 5}v10M${x - 20} ${y - 4}v8" stroke="#ffffff" stroke-width="4"/>`

/** Marshaller's raised arm with an orange wand, for a person at (x, y) facing left. Bounds: x from +4 to +24, y from −72 to −44. */
const wandArm = (x: number, y: number) =>
  `<path d="M${x + 8} ${y - 44}L${x + 16} ${y - 58}" stroke="#ffd23f" stroke-width="5" stroke-linecap="round"/><path d="M${x + 16} ${y - 58}L${x + 22} ${y - 72}" stroke="#fb8500" stroke-width="4" stroke-linecap="round"/>`

/** Airliner facing right, without its tail logo; the doors' state separate. Bounds: x from 140 to 610, y from 200 to 380. */
const airliner = () =>
  `<path d="M300 330L460 330L420 358H320Z" fill="#8d99ae"/>` +
  `<path d="M150 284L172 200H202L232 284Z" fill="#1d5fbf"/>` +
  `<path d="M140 292Q140 280 160 280H560Q600 280 610 310Q600 340 560 340H160Q140 340 140 330Z" fill="#ffffff"/>` +
  `<rect x="150" y="322" width="420" height="6" fill="#1d5fbf"/>` +
  Array.from({ length: 18 }, (_, i) => `<circle cx="${236 + i * 15}" cy="300" r="3.2" fill="#3d4a55"/>`).join('') +
  `<path d="M582 292L598 294L604 304H584Z" fill="#3d4a55"/><rect x="222" y="290" width="18" height="30" rx="3" fill="none" stroke="#adb5bd" stroke-width="2"/>` +
  `<ellipse cx="380" cy="352" rx="34" ry="11" fill="#adb5bd"/><ellipse cx="350" cy="352" rx="5" ry="9" fill="#3d4a55"/>` +
  `<path d="M380 362v10M570 340v28" stroke="#3d4a55" stroke-width="4"/><circle cx="374" cy="374" r="7" fill="#2b2b2b"/><circle cx="386" cy="374" r="7" fill="#2b2b2b"/><circle cx="570" cy="372" r="7" fill="#2b2b2b"/>`

/** Stair truck without the top of its handrail; (x, y) = ground under its back. Bounds: x from 0 to +130, y from −100 to 0. */
const stairTruck = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M10 -32L66 -96H84L28 -32Z" fill="#c9d1d9"/>` +
  Array.from({ length: 7 }, (_, i) => `<path d="M${16 + i * 8} ${-38 - i * 9}h16" stroke="#8d99ae" stroke-width="2"/>`).join('') +
  `<path d="M14 -48L46 -84M14 -48V-34M30 -66V-50" stroke="#ffd23f" stroke-width="3"/>` +
  `<rect x="0" y="-32" width="104" height="22" rx="3" fill="#ffd23f"/><path d="M104 -32H122L130 -18V-10H104Z" fill="#ffd23f"/><path d="M108 -28H120L125 -20H108Z" fill="#bde3f2"/>` +
  `<circle cx="22" cy="-8" r="9" fill="#2b2b2b"/><circle cx="108" cy="-8" r="9" fill="#2b2b2b"/></g>`

/** Baggage cart with two suitcases (the middle one separate); (x, y) = ground under its middle. Bounds: x ±40, y from −34 to 0. */
const bagCart = (x: number, y: number, a: string, b: string) =>
  `<rect x="${x - 38}" y="${y - 16}" width="76" height="6" fill="#6c757d"/><circle cx="${x - 26}" cy="${y - 5}" r="5" fill="#2b2b2b"/><circle cx="${x + 26}" cy="${y - 5}" r="5" fill="#2b2b2b"/>` +
  `<rect x="${x - 34}" y="${y - 34}" width="20" height="18" rx="2" fill="${a}"/><rect x="${x + 14}" y="${y - 32}" width="20" height="16" rx="2" fill="${b}"/>` +
  `<path d="M${x + 38} ${y - 13}h10" stroke="#3d4a55" stroke-width="2"/>`

/** Baggage tug without its beacon; (x, y) = ground under its middle. Bounds: x ±36, y from −44 to 0. */
const tug = (x: number, y: number) =>
  `<rect x="${x - 34}" y="${y - 30}" width="68" height="20" rx="4" fill="#3a86ff"/><path d="M${x - 10} ${y - 30}V${y - 42}H${x + 20}V${y - 30}" stroke="#3d4a55" stroke-width="3" fill="none"/>` +
  `<circle cx="${x + 4}" cy="${y - 36}" r="5" fill="#f2d29b"/><circle cx="${x - 20}" cy="${y - 7}" r="7" fill="#2b2b2b"/><circle cx="${x + 20}" cy="${y - 7}" r="7" fill="#2b2b2b"/>` +
  `<path d="M${x + 34} ${y - 14}h12" stroke="#3d4a55" stroke-width="2"/>`

/** Fuel truck facing right, without its hose reel; (x, y) = ground under its back. Bounds: x from 0 to +214, y from −70 to 0. */
const fuelTruck = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="0" y="-22" width="214" height="6" fill="#555"/>` +
  `<rect x="6" y="-62" width="140" height="42" rx="20" fill="#f4f1e8"/><rect x="6" y="-46" width="140" height="8" fill="#e63946"/>` +
  `<path d="M150 -22V-60H186L206 -38V-22Z" fill="#e63946"/><path d="M158 -56H182L196 -40H158Z" fill="#bde3f2"/>` +
  `<circle cx="40" cy="-12" r="12" fill="#2b2b2b"/><circle cx="110" cy="-12" r="12" fill="#2b2b2b"/><circle cx="182" cy="-12" r="12" fill="#2b2b2b"/></g>`

export default svgLevel({
  id: 162,
  chapter: 'city',
  title: 'airport',
  parTimeSec: 88,
  scene: ({ diff, anim, extra }) => {
    const climbing = anim({ id: 'plane', type: 'path', points: [[0, 0], [120, -30]], period: 6 }, smallPlane(300, 74))
    return (
      `<rect width="800" height="500" fill="#cfe8f7"/>` +
      anim({ type: 'path', points: [[0, 0], [40, 0]], period: 30 }, cloud(130, 70, 0.6)) +
      anim({ type: 'path', points: [[0, 0], [-40, 0]], period: 34 }, cloud(520, 50, 0.5)) +
      diff(300, 74, 28, climbing, smallPlane(300, 74), 'plane') +
      // Terminal with its flag, the control tower
      `<rect x="0" y="152" width="560" height="112" fill="#7aa6d6"/><rect x="0" y="144" width="560" height="10" fill="#5c677d"/>` +
      Array.from({ length: 14 }, (_, i) => `<path d="M${20 + i * 40} 154V264" stroke="#5c677d" stroke-width="3"/>`).join('') +
      `<path d="M0 210H560" stroke="#5c677d" stroke-width="3"/><path d="M424 144V116" stroke="#3d4a55" stroke-width="2.5"/>` +
      diff(434, 124, 22, `<path d="M424 116h20v12h-20Z" fill="#e63946"/><path d="M430 122h8M434 118v8" stroke="#ffffff" stroke-width="2"/>`, '') +
      `<rect x="608" y="98" width="34" height="166" fill="#c9d1d9"/><path d="M584 98L596 64H654L666 98Z" fill="#5c677d"/><path d="M590 94L600 70H650L660 94Z" fill="#9ad3f0"/>` +
      `<rect x="592" y="58" width="66" height="8" fill="#3d4a55"/><path d="M625 58V50" stroke="#3d4a55" stroke-width="2"/>` +
      diff(625, 46, 22, `<circle cx="625" cy="46" r="5" fill="#e63946"/>`, `<circle cx="625" cy="46" r="5" fill="#8ac926"/>`) +
      // Apron with its markings, the windsock
      `<rect y="262" width="800" height="238" fill="#9aa1a8"/><path d="M0 300H800M620 300V500" stroke="#ffd23f" stroke-width="3"/><path d="M0 446H800" stroke="#ffffff" stroke-width="3" stroke-dasharray="24 16"/>` +
      `<path d="M770 300V204" stroke="#3d4a55" stroke-width="3"/>` +
      diff(756, 204, 24, windsock(770, 204), anim({ type: 'sway', angle: 14, pivot: [770, 204], period: 2 }, windsock(770, 204))) +
      // Airliner with its logo and front door, the stair truck
      airliner() + diff(188, 248, 22, `<circle cx="190" cy="248" r="9" fill="#ffd23f"/>`, `<circle cx="190" cy="248" r="9" fill="#e63946"/>`) +
      diff(522, 310, 24, `<rect x="512" y="290" width="20" height="32" rx="3" fill="none" stroke="#adb5bd" stroke-width="2"/>`, `<rect x="512" y="290" width="20" height="32" rx="3" fill="#3d4a55"/>`) +
      stairTruck(150, 418) + diff(204, 322, 22, `<path d="M196 334L214 314M214 314V326" stroke="#ffd23f" stroke-width="3"/>`, '') +
      // Marshaller, fuel truck
      person(668, 404, '#ffd23f', true, '#c68b5e', '#2b2b2b') + `<path d="M660 360l-8 12" stroke="#ffd23f" stroke-width="5" stroke-linecap="round"/>` +
      diff(680, 348, 26, anim({ type: 'sway', angle: 22, pivot: [676, 360], period: 1.1 }, wandArm(668, 404)), wandArm(668, 404)) +
      fuelTruck(556, 490) + diff(568, 456, 24, `<circle cx="568" cy="450" r="12" fill="#3d4a55"/><circle cx="568" cy="450" r="5" fill="#adb5bd"/><path d="M568 462q-8 6 -4 12" stroke="#2b2b2b" stroke-width="3" fill="none"/>`, '') +
      // Baggage tug and carts
      tug(70, 478) + diff(76, 432, 22, `<rect x="72" y="428" width="10" height="8" rx="3" fill="#fb8500"/>`, '') +
      bagCart(150, 480, '#8338ec', '#e63946') + bagCart(250, 480, '#ffb703', '#3a86ff') + bagCart(350, 480, '#2a9d8f', '#ff006e') +
      diff(250, 452, 22, `<rect x="240" y="440" width="20" height="24" rx="2" fill="#8ac926"/><path d="M246 440v-4h8v4" stroke="#3d4a55" stroke-width="2" fill="none"/>`, `<rect x="240" y="440" width="20" height="24" rx="2" fill="#e63946"/><path d="M246 440v-4h8v4" stroke="#3d4a55" stroke-width="2" fill="none"/>`) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['cone', 470, 440],
        ['cone', 520, 420],
        ['coffeeCup', 300, 400],
        ['bin', 40, 320],
        ['bollard', 760, 340],
      ])
    )
  },
})
