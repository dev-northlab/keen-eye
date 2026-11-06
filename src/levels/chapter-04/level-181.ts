// Lobster harbor: a fishing wharf among the sea's ten hardest (hidden until released, levels/upcoming.ts). New in
// the sea: a lobster boat with its wheelhouse and pennant, a fishing shack hung with lobster floats, a stack of
// lobster pots, a fisherman in a sou'wester, a lobster, a bait bucket, a seal on a rock and a lighthouse on the
// headland. Motion differences: the pennant flutters and the lighthouse flashes only on picture A; the seal
// raises its head only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud, person, rock, sun } from './shapes.ts'

/** Lobster boat facing left without its second window, pennant or deck pot; (x, y) = waterline at the bow. Bounds: x from −6 to +280, y from −136 to +16. */
const lobsterBoat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-6 -22H280V2Q270 16 250 16H24Q6 10 -6 -22Z" fill="#f4f1e8"/><path d="M-2 -8H280" stroke="#1d5e8c" stroke-width="5"/>` +
  `<path d="M40 -22V-74H118V-22Z" fill="#f4f1e8" stroke="#c9d1d9" stroke-width="2"/><rect x="34" y="-80" width="90" height="8" rx="2" fill="#1d5e8c"/>` +
  `<rect x="50" y="-66" width="24" height="18" rx="2" fill="#bde3f2"/><rect x="158" y="-136" width="5" height="114" fill="#5c677d"/>` +
  `<path d="M140 -100H180" stroke="#5c677d" stroke-width="3"/><path d="M160 -134L60 -80M160 -134L270 -22" stroke="#5c677d" stroke-width="1.2"/>` +
  `<path d="M190 -22V-40H270V-22" fill="none" stroke="#c9d1d9" stroke-width="3"/></g>`

/** Lobster pot (wire trap); (x, y) = center. Bounds: x ±22, y ±16. */
const lobsterPot = (x: number, y: number, color = '#3f8f3a') =>
  `<rect x="${x - 22}" y="${y - 16}" width="44" height="32" rx="3" fill="${color}"/>` +
  `<path d="M${x - 11} ${y - 16}v32M${x} ${y - 16}v32M${x + 11} ${y - 16}v32M${x - 22} ${y}h44" stroke="#fff" stroke-opacity="0.45" stroke-width="1.5"/>`

/** Lobster facing left without its big claw; (x, y) = bottom center. Bounds: x from −20 to +32, y from −16 to 0. */
const lobster = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#c0392b"><path d="M-12 0l-4 4M-4 0l-2 4M4 0l0 4M10 0l2 4" stroke="#c0392b" stroke-width="2"/>` +
  `<ellipse cy="-7" rx="16" ry="7"/><path d="M14 -9h10l8 -5v12l-8 -5Z"/><path d="M-14 -10l-6 -6M-14 -6l-6 -2" stroke="#c0392b" stroke-width="3"/>` +
  `<path d="M-16 -12q-14 -10 -28 -6M-16 -12q-12 -16 -24 -18" stroke="#8a2a20" stroke-width="1.2" fill="none"/><circle cx="-12" cy="-12" r="1.6" fill="#222"/></g>`
/** The lobster's front claw at (x, y) = lobster's bottom center, big or small. Bounds: x from −40 to −14, y from −22 to −2. */
const claw = (x: number, y: number, big: boolean) =>
  big
    ? `<path d="M${x - 16} ${y - 8}L${x - 26} ${y - 10}" stroke="#c0392b" stroke-width="4"/><path d="M${x - 26} ${y - 10}q-14 -12 -14 0q0 10 14 2l-6 -2Z" fill="#c0392b"/>`
    : `<path d="M${x - 16} ${y - 8}L${x - 24} ${y - 10}" stroke="#c0392b" stroke-width="3"/><path d="M${x - 24} ${y - 10}q-7 -6 -7 0q0 5 7 1Z" fill="#c0392b"/>`

/** Sou'wester hat on a person at (x, y). Bounds: x ±14, y from −68 to −54. */
const souwester = (x: number, y: number, color: string) =>
  `<path d="M${x - 14} ${y - 55}q14 -20 28 0q-4 3 -14 3q-10 0 -14 -3Z" fill="${color}"/>`

export default svgLevel({
  id: 181,
  chapter: 'sea',
  title: 'lobsterHarbor',
  parTimeSec: 100,
  scene: ({ diff, anim, extra }) => {
    const ripples = `<path d="M330 260h40M460 252h30M620 270h50M300 300h30M700 300h40M180 280h36" stroke="#ffffff" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round"/>`
    const pennant = `<path d="M520 206L548 212L520 220Z" fill="#e63946"/>`
    const flash = `<circle cx="720" cy="146" r="9" fill="#ffd23f"/><path d="M728 146L754 138V154Z" fill="#fff3b0" fill-opacity="0.85"/>`
    let pots = ''
    for (const [px, py] of [[600, 470], [650, 470], [700, 470], [750, 470], [625, 436], [675, 436]]) pots += lobsterPot(px, py)
    return (
      `<rect width="800" height="500" fill="#cfe6f2"/>` + sun(110, 90) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 28 }, cloud(400, 80, 0.7)) +
      // Headland and its lighthouse
      `<path d="M620 236Q660 196 720 198Q770 196 800 208V236Z" fill="#7a9a5b"/><path d="M712 200V152H728V200Z" fill="#f4f1e8"/><path d="M712 172h16M712 186h16" stroke="#e63946" stroke-width="5"/>` +
      `<rect x="710" y="138" width="20" height="14" fill="#5c677d"/><circle cx="720" cy="146" r="6" fill="#adb5bd"/><path d="M708 138l12 -8l12 8Z" fill="#e63946"/>` +
      diff(734, 146, 24, anim({ type: 'blink', duty: 0.5, period: 2 }, flash), flash) +
      // The sea
      `<rect y="232" width="800" height="170" fill="#3f8fb8"/>` + anim({ type: 'path', points: [[0, 0], [24, 0]], period: 6 }, ripples) +
      // Seal on its rock
      rock(244, 384, 2.2, '#7d8597') + `<path d="M210 352q20 -12 52 -8l-4 14q-30 6 -48 -6Z" fill="#6c757d"/><path d="M212 352l-14 -8v14Z" fill="#6c757d"/><path d="M236 358l-6 10" stroke="#5c636a" stroke-width="5" stroke-linecap="round"/>` +
      diff(266, 334, 22, `<circle cx="266" cy="336" r="11" fill="#6c757d"/><circle cx="270" cy="333" r="1.8" fill="#222"/><circle cx="275" cy="339" r="2" fill="#222"/><path d="M274 342h8M274 344l7 3" stroke="#e9ecef" stroke-width="1"/>`, anim({ type: 'bob', dx: 0, dy: -5, period: 1.6 }, `<circle cx="266" cy="336" r="11" fill="#6c757d"/><circle cx="270" cy="333" r="1.8" fill="#222"/><circle cx="275" cy="339" r="2" fill="#222"/><path d="M274 342h8M274 344l7 3" stroke="#e9ecef" stroke-width="1"/>`)) +
      // Lobster boat: second window, pennant, the pot on deck
      lobsterBoat(360, 340) +
      diff(461, 283, 22, `<rect x="452" y="274" width="20" height="18" rx="2" fill="#bde3f2"/>`, '') +
      diff(530, 212, 24, anim({ type: 'sway', angle: 14, pivot: [520, 213], period: 1.2 }, pennant), pennant) +
      diff(586, 308, 22, `<rect x="570" y="296" width="32" height="22" rx="3" fill="#e76f51"/><path d="M581 296v22M592 296v22" stroke="#fff" stroke-opacity="0.45" stroke-width="1.5"/>`, '') +
      // Fishing shack: the window's curtains, a float's band
      `<rect x="20" y="268" width="172" height="134" fill="#b5523b"/><path d="M8 272L106 222L204 272Z" fill="#5c4033"/><path d="M20 268h172" stroke="#f4f1e8" stroke-width="4"/>` +
      `<rect x="54" y="296" width="32" height="24" fill="#bde3f2" stroke="#f4f1e8" stroke-width="3"/><rect x="102" y="330" width="30" height="72" fill="#7a3b2a"/>` +
      diff(70, 308, 22, `<path d="M56 298h10l-10 20Z M84 298h-10l10 20Z" fill="#f4a6a6"/>`, '') +
      `<path d="M146 300v40M172 300v40" stroke="#e9d3a7" stroke-width="2"/><ellipse cx="146" cy="350" rx="8" ry="13" fill="#ffd23f"/><ellipse cx="172" cy="350" rx="8" ry="13" fill="#f4f1e8"/>` +
      `<rect x="139" y="346" width="14" height="6" fill="#e63946"/>` +
      diff(172, 348, 22, `<rect x="165" y="345" width="14" height="7" fill="#3a86ff"/>`, `<rect x="165" y="345" width="14" height="7" fill="#2a9d8f"/>`) +
      // The wharf
      `<rect y="400" width="800" height="100" fill="#b08a5a"/><path d="M0 402H800" stroke="#6b4a2b" stroke-width="6"/>` +
      `<path d="M0 432H800M0 466H800" stroke="#8a6a44" stroke-width="2"/><path d="M90 402v30M260 432v34M420 402v30M560 466v34M700 402v30" stroke="#8a6a44" stroke-width="2"/>` +
      // Fisherman, the lobster, bait bucket, the pots
      person(300, 478, '#ffd23f', false, '#e0b48a', '#6b4a2b') +
      diff(300, 416, 22, souwester(300, 478, '#ffd23f'), souwester(300, 478, '#2a9d8f')) +
      lobster(424, 476) + diff(398, 466, 22, claw(424, 476, true), claw(424, 476, false)) +
      `<path d="M486 462h36l-5 26h-26Z" fill="#8d99ae"/><path d="M486 462h36" stroke="#5c677d" stroke-width="3"/>` +
      diff(504, 452, 22, `<path d="M500 462l2 -10l-8 -6h18l-8 6l2 10Z" fill="#9aa5b1"/>`, '') +
      pots + diff(725, 436, 28, lobsterPot(725, 436), '') +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['gull', 300, 130],
        ['buoy', 690, 330, '#ff9f43'],
        ['lifeRing', 40, 378],
        ['crab', 190, 476],
        ['starfish', 572, 474],
      ])
    )
  },
})
