// Stilt village: thatched houses over a lagoon among the sea's ten hardest (hidden until released,
// levels/upcoming.ts). New in the sea: stilt houses joined by a boardwalk, fish drying on a line, a hammock, a
// paper lantern, a solar panel, a gecko, a monkey in a palm, a kingfisher on a mooring post and an outrigger canoe
// with a fisherman and his net. Motion differences: the lantern and the kingfisher sway only on picture A; the
// monkey swings only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud, palm, person, sun, turtle } from './shapes.ts'

/** Monkey hanging by one arm from (x, y). Bounds: x from −11 to +10, y from 0 to +42. */
const monkey = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M0 0V12" stroke="#7a5230" stroke-width="3" stroke-linecap="round"/><path d="M-4 32q-6 4 -6 8" stroke="#7a5230" stroke-width="2.5" fill="none"/>` +
  `<ellipse cy="26" rx="7" ry="9" fill="#7a5230"/><path d="M-4 34l-3 6M4 34l3 6" stroke="#7a5230" stroke-width="3" stroke-linecap="round"/>` +
  `<circle cx="3" cy="14" r="6.5" fill="#7a5230"/><ellipse cx="5" cy="16" rx="4" ry="3" fill="#e0b97a"/><circle cx="4" cy="12" r="1" fill="#222"/></g>`

/** Kingfisher perched, faces right; (x, y) = feet. Bounds: x from −14 to +15, y from −20 to 0. */
const kingfisher = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-8 -6l-6 6" stroke="#1d6fb8" stroke-width="4" stroke-linecap="round"/><ellipse cy="-8" rx="9" ry="6" fill="#1d6fb8"/>` +
  `<path d="M-2 -4q6 4 8 -4Z" fill="#f4a261"/><circle cx="5" cy="-14" r="5.5" fill="#1d6fb8"/><path d="M9 -15l6 2l-6 1Z" fill="#2b2b2b"/><circle cx="6" cy="-15" r="1.2" fill="#fff"/></g>`

/** Gecko on a wall, head up; (x, y) = center. Bounds: x ±10, y ±12. */
const gecko = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" stroke="#8ac926" stroke-linecap="round"><path d="M0 -8V6Q0 12 -6 11" stroke-width="4" fill="none"/>` +
  `<path d="M0 -4l-7 -4M0 -4l7 -4M0 4l-7 4M0 4l7 4" stroke-width="2"/><circle cy="-9" r="3.2" fill="#8ac926" stroke="none"/></g>`

export default svgLevel({
  id: 187,
  chapter: 'sea',
  title: 'stiltVillage',
  parTimeSec: 106,
  scene: ({ diff, anim, extra }) => {
    const lantern = `<path d="M488 204V214" stroke="#3d4a55" stroke-width="1.5"/><rect x="482" y="214" width="12" height="16" rx="5" fill="#e63946"/><rect x="484" y="219" width="8" height="6" fill="#ffd166"/>`
    const bird = kingfisher(432, 392)
    let fishLine = ''
    for (const fx of [240, 262]) fishLine += `<path d="M${fx} 236v6" stroke="#5c4033" stroke-width="1"/><ellipse cx="${fx}" cy="250" rx="4" ry="8" fill="#9aa5b1"/><path d="M${fx} 258l-4 6h8Z" fill="#9aa5b1"/>`
    let stilts = ''
    for (const x of [50, 110, 170, 210, 260, 330, 420, 470, 490, 560, 630, 660]) stilts += `<rect x="${x - 4}" y="296" width="8" height="${x > 470 ? 84 : 94}" fill="#6b4a2b"/>`
    return (
      `<rect width="800" height="500" fill="#ffe9c7"/>` + sun(330, 104, '#ffb347') +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 28 }, cloud(560, 70, 0.6)) +
      `<rect y="252" width="800" height="248" fill="#3fb0b5"/>` +
      anim({ type: 'path', points: [[0, 0], [24, 0]], period: 6 }, `<path d="M20 280h40M300 270h40M700 360h40M80 410h40M520 480h50" stroke="#ffffff" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round"/>`) +
      stilts +
      // House A: the roof pennant, the window
      `<rect x="30" y="296" width="200" height="10" fill="#8a6a44"/><rect x="40" y="210" width="180" height="90" fill="#c9a26b"/><path d="M40 232H220M40 256H220M40 280H220" stroke="#b08a5a" stroke-width="2"/>` +
      `<path d="M24 214L130 156L236 214Z" fill="#b5833f"/><path d="M24 214l8 8l8 -8l8 8l8 -8l8 8l8 -8l8 8l8 -8l8 8l8 -8l8 8l8 -8l8 8l8 -8l8 8l8 -8l8 8l8 -8l8 8l8 -8l8 8l8 -8l8 8l8 -8l8 8l4 -4Z" fill="#a0703f"/>` +
      `<path d="M130 156V132" stroke="#5c4033" stroke-width="2"/>` +
      diff(138, 142, 22, `<path d="M130 132L150 138L130 144Z" fill="#e63946"/>`, `<path d="M130 132L150 138L130 144Z" fill="#3a86ff"/>`) +
      `<rect x="70" y="234" width="40" height="32" fill="#8a6a44"/>` +
      diff(90, 250, 22, `<rect x="74" y="238" width="32" height="24" fill="#5c4033"/>`, `<rect x="74" y="238" width="32" height="24" fill="#d9b98a"/><path d="M90 238V262M74 250H106" stroke="#8a6a44" stroke-width="2"/>`) +
      `<rect x="150" y="236" width="34" height="64" fill="#5c4033"/>` +
      // Fish drying on a line, the boardwalk and its hammock
      `<path d="M300 300V228" stroke="#6b4a2b" stroke-width="4"/><path d="M220 236H300" stroke="#5c4033" stroke-width="1.5"/>` + fishLine +
      diff(284, 252, 22, `<path d="M284 236v6" stroke="#5c4033" stroke-width="1"/><ellipse cx="284" cy="250" rx="4" ry="8" fill="#9aa5b1"/><path d="M284 258l-4 6h8Z" fill="#9aa5b1"/>`, '') +
      `<rect x="230" y="300" width="250" height="8" fill="#a0703f"/><path d="M330 300V262M420 300V262" stroke="#6b4a2b" stroke-width="5"/>` +
      `<path d="M330 268Q375 312 420 268Q375 296 330 268Z" fill="#f4f1e8"/><path d="M336 274Q375 300 414 274" stroke="#2a9d8f" stroke-width="3" fill="none"/>` +
      diff(375, 290, 22, `<path d="M362 289Q375 295 388 289" stroke="#e63946" stroke-width="4" fill="none"/>`, `<path d="M362 289Q375 295 388 289" stroke="#ffd23f" stroke-width="4" fill="none"/>`) +
      // House B: lantern, solar panel, gecko
      `<rect x="470" y="286" width="200" height="10" fill="#8a6a44"/><rect x="480" y="196" width="180" height="94" fill="#d9b98a"/><path d="M480 220H660M480 244H660M480 268H660" stroke="#c9a26b" stroke-width="2"/>` +
      `<path d="M464 200L570 140L676 200Z" fill="#a0703f"/><rect x="504" y="230" width="28" height="60" fill="#5c4033"/><rect x="560" y="220" width="36" height="26" fill="#5c4033" stroke="#8a6a44" stroke-width="3"/>` +
      diff(488, 216, 24, anim({ type: 'sway', angle: 12, pivot: [488, 204], period: 2 }, lantern), lantern) +
      diff(615, 175, 22, `<path d="M604 162L632 178L626 188L598 172Z" fill="#1d3557"/><path d="M618 170L612 180M601 167L629 183" stroke="#8ecae6" stroke-width="1"/>`, '') +
      diff(640, 246, 22, gecko(640, 246), '') +
      // Palm islet and the monkey
      `<ellipse cx="740" cy="334" rx="52" ry="10" fill="#f1d79a"/>` + palm(740, 332, 0.8) +
      diff(716, 279, 30, monkey(716, 258), anim({ type: 'sway', angle: 10, pivot: [716, 258], period: 1.8 }, monkey(716, 258))) +
      // Mooring post and the kingfisher
      `<rect x="426" y="392" width="12" height="80" fill="#6b4a2b"/>` +
      diff(432, 382, 22, anim({ type: 'sway', angle: 10, pivot: [432, 392], period: 1.4 }, bird), bird) +
      // Outrigger canoe: the fisherman's hat, his net
      `<path d="M200 444L206 470M260 444L254 470" stroke="#6b4a2b" stroke-width="3"/><ellipse cx="230" cy="472" rx="50" ry="5" fill="#a0703f"/>` +
      person(250, 436, '#2a9d8f', true, '#c68c53', '#2b2b2b') +
      `<path d="M160 436Q230 452 300 436L292 448Q230 460 168 448Z" fill="#7a4e2d"/>` +
      diff(250, 373, 22, `<path d="M234 380L250 364L266 380Z" fill="#e9c46a"/>`, `<path d="M234 380L250 364L266 380Z" fill="#e63946"/>`) +
      diff(197, 431, 22, `<path d="M182 440Q196 420 212 440Z" fill="#c9b48e"/><path d="M188 438l8 -12l8 12M184 434h26" stroke="#8a6a44" stroke-width="1"/>`, '') +
      diff(560, 439, 28, turtle(560, 450), '') +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['gull', 420, 90],
        ['fish', 360, 460],
        ['jellyfish', 680, 430],
        ['buoy', 330, 404, '#ff9f43'],
        ['starfish', 60, 460],
      ])
    )
  },
})
