// Sawmill: a logging camp among the forest's ten hardest (hidden until released, levels/upcoming.ts). New in the
// forest: a sawmill shed with a round saw and its chimney, a log pile, a logging truck, a lumberjack, a chopping
// block with an axe, a moose at the mill pond, a chipmunk and a sawdust barrow. Motion differences: the saw
// turns only on picture A; the chipmunk nibbles and the chimney smokes only on B.
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud, pine, stump } from './shapes.ts'

/** Round saw blade; (x, y) = hub. Bounds: radius 27. */
const sawBlade = (x: number, y: number) => {
  let teeth = ''
  for (let a = 0; a < 360; a += 20) teeth += `<path d="M0 -26l4 -1l-2 6Z" transform="rotate(${a})"/>`
  return `<g transform="translate(${x} ${y})" fill="#adb5bd"><circle r="23" fill="#c9d1d9"/>${teeth}<circle r="6" fill="#5c677d"/><path d="M-14 0H14" stroke="#e63946" stroke-width="3"/></g>`
}

/** Chipmunk sitting on its hind legs, faces right; (x, y) = feet. Bounds: x ±12, y from −24 to 0. */
const chipmunk = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-6 -4q-10 -4 -6 -18" stroke="#b5733f" stroke-width="5" fill="none" stroke-linecap="round"/>` +
  `<ellipse cy="-9" rx="7" ry="9" fill="#c98a52"/><path d="M-3 -16v12M2 -16v12" stroke="#5e3b1a" stroke-width="1.5"/><circle cx="3" cy="-19" r="5" fill="#c98a52"/>` +
  `<circle cx="1" cy="-23" r="1.8" fill="#c98a52"/><circle cx="5" cy="-20" r="1" fill="#222"/><circle cx="6" cy="-12" r="2" fill="#a0632b"/></g>`

/** Moose facing left, without its left antler (`antler`); (x, y) = feet. Bounds: x from −72 to +54, y from −100 to 0. */
const moose = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-22 -40V0M-10 -40V0M24 -40V0M36 -40V0" stroke="#4a3426" stroke-width="7"/>` +
  `<ellipse cx="8" cy="-54" rx="46" ry="24" fill="#5e4130"/><path d="M-20 -72Q0 -86 24 -74" stroke="#5e4130" stroke-width="12" fill="none"/>` +
  `<path d="M-30 -64L-52 -78L-70 -56L-62 -44L-40 -50Z" fill="#5e4130"/><ellipse cx="-66" cy="-50" rx="8" ry="7" fill="#6b4a36"/>` +
  `<path d="M-40 -46q4 14 -4 20" stroke="#4a3426" stroke-width="5" fill="none"/><circle cx="-54" cy="-68" r="2" fill="#222"/>` +
  `<path d="M-46 -82q8 -14 22 -12q-4 4 -2 8q-8 -2 -12 6Z" fill="#c9b48e"/></g>`
/** The moose's left antler, big and palmate or small. Bounds: x from −60 to −40, y from −102 to −76. */
const antler = (x: number, y: number, big: boolean) =>
  big
    ? `<path d="M${x - 50} ${y - 78}q-14 -6 -10 -22l4 6l2 -8l4 8l4 -6l2 10Z" fill="#c9b48e"/>`
    : `<path d="M${x - 50} ${y - 78}q-6 -4 -6 -14l4 4l2 -4l2 8Z" fill="#c9b48e"/>`

/** Logging truck facing right without its exhaust cap or chain binder; (x, y) = ground under its back. Bounds: x from 0 to +340, y from −116 to 0. */
const loggingTruck = (x: number, y: number) => {
  let logs = ''
  for (const [ly, tone] of [[-48, '#8a5a33'], [-66, '#a0703f'], [-84, '#8a5a33']] as const) {
    logs += `<rect x="16" y="${ly - 9}" width="200" height="18" rx="9" fill="${tone}"/><circle cx="20" cy="${ly}" r="9" fill="#e0b97a" stroke="#8a5a33" stroke-width="2"/>`
  }
  return `<g transform="translate(${x} ${y})"><rect x="0" y="-32" width="230" height="8" fill="#3d4a55"/><path d="M30 -32V-96M200 -32V-96" stroke="#3d4a55" stroke-width="5"/>` +
    logs + `<rect x="0" y="-24" width="340" height="6" fill="#2b2b2b"/>` +
    `<path d="M236 -24V-70H290L316 -46H340V-24Z" fill="#c0392b"/><path d="M242 -64H284L302 -46H242Z" fill="#bde3f2"/><rect x="256" y="-104" width="8" height="40" fill="#adb5bd"/>` +
    `<circle cx="40" cy="-10" r="13" fill="#2b2b2b"/><circle cx="70" cy="-10" r="13" fill="#2b2b2b"/><circle cx="190" cy="-10" r="13" fill="#2b2b2b"/><circle cx="310" cy="-10" r="13" fill="#2b2b2b"/></g>`
}

/** Toque on a person at (x, y). Bounds: x ±10, y from −70 to −56. */
const toque = (x: number, y: number, color: string) =>
  `<path d="M${x - 9} ${y - 57}a9 10 0 0 1 18 0Z" fill="${color}"/><rect x="${x - 10}" y="${y - 60}" width="20" height="4" rx="2" fill="#f4f1e8"/>`

export default svgLevel({
  id: 171,
  chapter: 'forest',
  title: 'sawmill',
  parTimeSec: 96,
  scene: ({ diff, anim, extra }) => {
    const smoke = `<circle cx="484" cy="120" r="9" fill="#e9edf2" fill-opacity="0.85"/><circle cx="496" cy="106" r="11" fill="#e9edf2" fill-opacity="0.7"/>`
    let forest = ''
    for (let x = -10; x < 820; x += 46) forest += pine(x, 300 - (x % 3) * 6, 0.9 + ((x / 46) % 2) * 0.15, x % 4 ? '#2f7d55' : '#24684a')
    let pile = ''
    for (const [px, py] of [[44, 336], [72, 336], [100, 336], [128, 336], [156, 336], [184, 336], [58, 312], [86, 312], [114, 312], [142, 312], [72, 288], [100, 288], [128, 288]])
      pile += `<circle cx="${px}" cy="${py}" r="13" fill="#e0b97a" stroke="#8a5a33" stroke-width="3"/><circle cx="${px}" cy="${py}" r="5" fill="none" stroke="#c9a26b" stroke-width="1.5"/>`
    return (
      `<rect width="800" height="500" fill="#cde4ee"/>` +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(150, 70, 0.6)) +
      forest + `<rect y="296" width="800" height="204" fill="#8a9a5b"/><path d="M0 300H800" stroke="#6b7a45" stroke-width="4"/>` +
      // Mill pond and the moose
      `<ellipse cx="700" cy="350" rx="110" ry="22" fill="#5aa9d6"/>` +
      moose(716, 352) + diff(672, 262, 26, antler(716, 352, true), antler(716, 352, false)) +
      // Log pile
      pile + diff(170, 312, 22, `<circle cx="170" cy="312" r="13" fill="#e0b97a" stroke="#8a5a33" stroke-width="3"/><circle cx="170" cy="312" r="5" fill="none" stroke="#c9a26b" stroke-width="1.5"/>`, '') +
      // Sawmill: sign, chimney smoke, the saw
      `<path d="M270 340V196M510 340V196" stroke="#6b4a2b" stroke-width="8"/><rect x="276" y="300" width="228" height="12" fill="#8a5a33"/><path d="M290 312V340M490 312V340" stroke="#6b4a2b" stroke-width="6"/>` +
      `<rect x="476" y="140" width="16" height="44" fill="#5c677d"/><path d="M250 202L390 150L530 202Z" fill="#7a5230"/><path d="M250 202L390 150L530 202" stroke="#5e3b1a" stroke-width="5" fill="none"/>` +
      diff(490, 112, 28, smoke, anim({ type: 'bob', dx: 3, dy: -6, period: 1.8 }, smoke)) +
      `<rect x="362" y="174" width="56" height="26" rx="3" fill="#f4f1e8"/>` +
      diff(390, 187, 22, `<circle cx="390" cy="187" r="9" fill="#3a86ff"/><path d="M384 187h12" stroke="#ffffff" stroke-width="2"/>`, `<circle cx="390" cy="187" r="9" fill="#e63946"/><path d="M384 187h12" stroke="#ffffff" stroke-width="2"/>`) +
      `<rect x="296" y="286" width="70" height="14" rx="7" fill="#a0703f"/><circle cx="298" cy="293" r="7" fill="#e0b97a"/>` +
      diff(380, 282, 30, anim({ type: 'rotate', pivot: [380, 282], period: 0.8 }, sawBlade(380, 282)), sawBlade(380, 282)) +
      `<path d="M410 300h80" stroke="#e0b97a" stroke-width="6"/>` +
      // Sawdust barrow and its shovel
      `<path d="M534 350l-10 -14h56l-6 14Z" fill="#3f8f3a"/><ellipse cx="552" cy="336" rx="26" ry="6" fill="#e9d3a7"/><circle cx="540" cy="354" r="6" fill="#2b2b2b"/><path d="M580 340l14 -6" stroke="#6b4a2b" stroke-width="3"/>` +
      diff(566, 322, 24, `<path d="M560 334L570 304" stroke="#a0703f" stroke-width="3"/><path d="M556 338l8 -6l4 8Z" fill="#8d99ae"/><path d="M566 304h8" stroke="#a0703f" stroke-width="3"/>`, '') +
      // Lumberjack, chopping block, the chipmunk on its stump
      person(120, 478, '#c0392b', false, '#e0b48a', '#5a3d2b') + `<path d="M112 448q8 10 16 0" stroke="#5a3d2b" stroke-width="5"/>` +
      diff(120, 414, 22, toque(120, 478, '#3a86ff'), toque(120, 478, '#e63946')) +
      `<rect x="186" y="452" width="40" height="28" rx="4" fill="#a0703f"/><ellipse cx="206" cy="452" rx="20" ry="6" fill="#e0b97a"/>` +
      diff(206, 438, 24, `<path d="M200 452L220 426" stroke="#8a5a33" stroke-width="4" stroke-linecap="round"/><path d="M194 444l10 -8l4 10Z" fill="#adb5bd"/>`, '') +
      stump(300, 446) + diff(300, 412, 22, chipmunk(300, 426), anim({ type: 'bob', dx: 0, dy: -3, period: 0.6 }, chipmunk(300, 426))) +
      // Logging truck with its chain binder and exhaust cap
      loggingTruck(410, 492) +
      diff(526, 421, 22, `<path d="M524 400V442" stroke="#ffd23f" stroke-width="3" stroke-dasharray="3 2"/>`, `<path d="M524 400V442" stroke="#e63946" stroke-width="3" stroke-dasharray="3 2"/>`) +
      diff(670, 384, 22, `<rect x="664" y="382" width="12" height="6" fill="#2b2b2b"/><path d="M664 382l12 -6" stroke="#2b2b2b" stroke-width="2"/>`, '') +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['pineCone', 30, 480],
        ['mushroom', 262, 488],
        ['acorn', 360, 486],
        ['feather', 40, 400],
        ['squirrel', 760, 384],
      ])
    )
  },
})
