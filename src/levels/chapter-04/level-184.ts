// Seaplane dock: a lagoon landing among the sea's ten hardest (hidden until released, levels/upcoming.ts). New in
// the sea: a seaplane on floats with its propeller, a pilot in a flying cap, a dock hut with a windsock and a cat
// in the window, fuel drums, a stilt hut on a palm island, a heron with a fish, a manta ray and a sea turtle.
// Motion differences: the propeller turns only on picture A; the windsock swings only on B; the manta glides
// only on A.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud, fish, palm, person, sun, turtle } from './shapes.ts'

/** Seaplane facing left, without its tail stripe, third window or propeller blade; (x, y) = nose. Bounds: x from −8 to +252, y from −54 to +56. */
const seaplane = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M30 14V42M180 14V42" stroke="#5c677d" stroke-width="4"/>` +
  `<path d="M12 42H232Q240 48 232 56H28Q12 54 12 42Z" fill="#c9d1d9"/><path d="M216 -18L232 -54H248L246 -16Z" fill="#f4f1e8"/>` +
  `<path d="M0 -12Q4 -20 20 -20H200L246 -16V-6L200 14H20Q4 14 0 4Z" fill="#f4f1e8"/><path d="M2 0H246" stroke="#e63946" stroke-width="4"/>` +
  `<rect x="40" y="-30" width="172" height="8" rx="4" fill="#e63946"/><path d="M60 -22L90 -4M190 -22L170 -4" stroke="#5c677d" stroke-width="2"/>` +
  `<path d="M30 -12H50V-2H24Z" fill="#bde3f2"/><rect x="70" y="-10" width="18" height="12" rx="2" fill="#bde3f2"/><rect x="98" y="-10" width="18" height="12" rx="2" fill="#bde3f2"/>` +
  `<path d="M0 -8Q-8 0 0 8Z" fill="#5c677d"/></g>`

/** Cat sitting, faces right; (x, y) = feet. Bounds: x ±11, y from −22 to 0. */
const cat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#3d4a55"><path d="M-6 0q-12 -2 -8 -12" stroke="#3d4a55" stroke-width="3" fill="none"/><ellipse cy="-7" rx="7" ry="8"/>` +
  `<circle cx="3" cy="-15" r="5.5"/><path d="M-1 -19l1 -4l3 3ZM5 -19l3 -4l1 5Z"/><circle cx="5" cy="-15" r="1" fill="#ffd23f"/></g>`

/** Manta ray seen from above; (x, y) = center. Bounds: x ±28, y from −14 to +24. */
const manta = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M0 4V24" stroke="#2b3d5a" stroke-width="2"/><path d="M-28 -2Q-14 -22 0 -12Q14 -22 28 -2Q14 4 0 6Q-14 4 -28 -2Z" fill="#2b3d5a" fill-opacity="0.85"/>` +
  `<path d="M-4 -12l-2 -4M4 -12l2 -4" stroke="#2b3d5a" stroke-width="3" stroke-linecap="round"/></g>`

/** Heron standing in the shallows, faces right; (x, y) = feet. Bounds: x from −22 to +40, y from −82 to 0. */
const heron = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-6 0V-36M6 0V-36" stroke="#e9c46a" stroke-width="3"/><ellipse cx="-2" cy="-46" rx="20" ry="11" fill="#8d99ae"/>` +
  `<path d="M-22 -44l-8 6l12 -2Z" fill="#6c757d"/><path d="M10 -52Q24 -64 14 -76" stroke="#8d99ae" stroke-width="7" fill="none" stroke-linecap="round"/>` +
  `<circle cx="16" cy="-78" r="6" fill="#8d99ae"/><path d="M20 -80L40 -74L20 -76Z" fill="#e9c46a"/><path d="M12 -82l-10 -4" stroke="#3d4a55" stroke-width="2"/><circle cx="17" cy="-80" r="1.2" fill="#222"/></g>`

export default svgLevel({
  id: 184,
  chapter: 'sea',
  title: 'seaplaneDock',
  parTimeSec: 102,
  scene: ({ diff, anim, extra }) => {
    const blade = `<rect x="372" y="296" width="4" height="40" rx="2" fill="#3d4a55"/>`
    const sock = `<path d="M140 214L176 219V225L140 230Z" fill="#ff9f43"/><path d="M152 216v12M164 218v8" stroke="#ffffff" stroke-width="4"/>`
    const ray = manta(560, 454)
    let posts = ''
    for (const x of [30, 120, 210, 300]) posts += `<rect x="${x - 6}" y="392" width="12" height="80" fill="#6b4a2b"/>`
    return (
      `<rect width="800" height="500" fill="#bfe9f5"/>` + sun(620, 90) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(260, 80, 0.65)) +
      `<rect y="222" width="800" height="278" fill="#4cc3c7"/><rect y="380" width="800" height="120" fill="#3aa8b8"/>` +
      anim({ type: 'path', points: [[0, 0], [24, 0]], period: 6 }, `<path d="M340 250h40M520 240h30M260 300h30M680 300h50M500 400h40" stroke="#ffffff" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round"/>`) +
      // Palm island and its stilt hut
      `<path d="M630 236Q700 206 800 214V236Z" fill="#f1d79a"/>` + palm(660, 228, 0.45) + palm(790, 226, 0.5, true) +
      `<rect x="708" y="210" width="24" height="16" fill="#a0703f"/><path d="M712 226v8M728 226v8" stroke="#6b4a2b" stroke-width="2"/>` +
      diff(720, 206, 22, `<path d="M702 212L720 198L738 212Z" fill="#e9c46a"/>`, `<path d="M702 212L720 198L738 212Z" fill="#e63946"/>`) +
      // The seaplane: tail stripe, third window, propeller
      seaplane(380, 316) +
      diff(614, 282, 22, `<path d="M606 286L614 268H624L622 286Z" fill="#e63946"/>`, `<path d="M606 286L614 268H624L622 286Z" fill="#3a86ff"/>`) +
      diff(506, 312, 22, `<rect x="497" y="306" width="18" height="12" rx="2" fill="#bde3f2"/>`, '') +
      diff(374, 316, 24, anim({ type: 'rotate', pivot: [374, 316], period: 0.5 }, blade), blade) +
      // The dock, its hut with the windsock and the cat, fuel drums, the pilot
      posts + `<rect y="378" width="350" height="14" fill="#a0703f"/><path d="M0 378H350" stroke="#c9a26b" stroke-width="3"/>` +
      `<rect x="20" y="292" width="130" height="86" fill="#d9c7a0"/><rect x="12" y="280" width="146" height="16" fill="#adb5bd"/>` +
      `<path d="M20 280v16M36 280v16M52 280v16M68 280v16M84 280v16M100 280v16M116 280v16M132 280v16M148 280v16" stroke="#8d99ae" stroke-width="2"/>` +
      `<rect x="34" y="310" width="46" height="30" fill="#bde3f2" stroke="#6b4a2b" stroke-width="3"/><rect x="100" y="316" width="34" height="62" fill="#6b4a2b"/>` +
      diff(56, 328, 22, cat(56, 339), '') +
      `<path d="M140 280V212" stroke="#5c677d" stroke-width="3"/>` +
      diff(158, 222, 24, sock, anim({ type: 'sway', angle: 10, pivot: [140, 222], period: 1.6 }, sock)) +
      `<rect x="188" y="348" width="24" height="30" rx="3" fill="#2a9d8f"/><rect x="220" y="348" width="24" height="30" rx="3" fill="#2a9d8f"/><path d="M188 358h24M188 368h24M220 358h24M220 368h24" stroke="#1d6b62" stroke-width="2"/>` +
      diff(216, 333, 22, `<rect x="204" y="318" width="24" height="30" rx="3" fill="#e63946"/><path d="M204 328h24M204 338h24" stroke="#a4161a" stroke-width="2"/>`, '') +
      person(300, 378, '#3a86ff', false, '#e0b48a', '#5a3d2b') +
      diff(300, 318, 22, `<path d="M291 324q9 -16 18 0h5v3h-23Z" fill="#8a5a33"/>`, `<path d="M291 324q9 -16 18 0h5v3h-23Z" fill="#f4f1e8"/>`) +
      // In the water: the heron's fish, the turtle, the manta ray
      heron(720, 426) + diff(750, 349, 22, fish(752, 350, '#c0c7d0', 0.6), '') +
      diff(420, 459, 28, turtle(420, 470, '#7fbf6a'), '') +
      diff(560, 454, 36, anim({ type: 'bob', dx: 5, dy: 3, period: 3 }, ray), ray) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['gull', 520, 110],
        ['jellyfish', 660, 450],
        ['fish', 200, 440],
        ['buoy', 260, 252, '#ff9f43'],
        ['starfish', 110, 470],
      ])
    )
  },
})
