// Kelp forest: under a dive boat among the sea's ten hardest (hidden until released, levels/upcoming.ts). New in
// the sea: swaying giant kelp, a sea otter floating with a shell, a diver's flag buoy, a scuba diver with a
// camera, garibaldi fish, a sea lion, a moray eel in the rocks and a dive boat's anchor line. Motion differences:
// the camera flashes only on picture A; a garibaldi and the jellyfish bob only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { anchor, crab, fish, jellyfish, octopus, seaUrchin, shell, starfish } from './shapes.ts'

/** Giant kelp stalk from (x, y) up by h, with its leaves. Bounds: x from −16 to +12, y from −h to 0. */
const kelp = (x: number, y: number, h: number) => {
  let leaves = ''
  for (let i = 1; i < h / 40; i++) {
    const ly = y - i * 40
    leaves += `<ellipse cx="${x + (i % 2 ? 7 : -9)}" cy="${ly}" rx="7" ry="3" fill="#7fb24a" transform="rotate(${i % 2 ? -30 : 30} ${x + (i % 2 ? 7 : -9)} ${ly})"/>`
  }
  return `<path d="M${x} ${y}Q${x - 14} ${y - h / 2} ${x} ${y - h}" stroke="#6a994e" stroke-width="5" fill="none"/>${leaves}<circle cx="${x}" cy="${y - h}" r="4" fill="#a7c957"/>`
}

/** Scuba diver swimming right, without the fins (`fins`) or camera flash; (x, y) = body center. Bounds: x from −60 to +68, y from −22 to +14. */
const diver = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-34 4H-60M-34 8H-58" stroke="#2b2b2b" stroke-width="6" stroke-linecap="round"/>` +
  `<ellipse rx="36" ry="10" fill="#2b2b2b"/><rect x="-24" y="-20" width="40" height="11" rx="5" fill="#e9c46a"/><circle cx="42" cy="-8" r="9" fill="#e0b48a"/>` +
  `<rect x="40" y="-13" width="10" height="7" rx="2" fill="#ffd23f"/><path d="M20 4L50 6" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>` +
  `<rect x="50" y="-4" width="18" height="16" rx="2" fill="#5c677d"/><circle cx="62" cy="4" r="4" fill="#bde3f2"/><path d="M14 -16Q30 -22 38 -14" stroke="#3d4a55" stroke-width="2" fill="none"/></g>`

/** Sea otter floating on its back; (x, y) = belly center. Bounds: x from −34 to +42, y from −16 to +10. */
const seaOtter = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-30 2l-8 4l8 2Z" fill="#6b4a2b"/><ellipse rx="30" ry="9" fill="#7a5230"/><circle cx="32" cy="-6" r="10" fill="#c9a26b"/>` +
  `<circle cx="34" cy="-8" r="1.4" fill="#222"/><circle cx="40" cy="-4" r="1.6" fill="#2b2b2b"/><path d="M-6 -6l4 -8M8 -6l-4 -8" stroke="#6b4a2b" stroke-width="4" stroke-linecap="round"/></g>`

export default svgLevel({
  id: 186,
  chapter: 'sea',
  title: 'kelpForest',
  parTimeSec: 106,
  scene: ({ diff, anim, extra }) => {
    const flash = `<circle cx="428" cy="206" r="6" fill="#ffffff"/><path d="M428 194v-6M440 206h6M437 197l5 -5M437 215l5 5" stroke="#ffffff" stroke-width="2"/>`
    const garibaldi = fish(540, 170, '#ff7f11')
    const jelly = jellyfish(700, 120, '#f4a6ff')
    let rays = ''
    for (const x of [80, 300, 520, 720]) rays += `<path d="M${x} 36L${x + 40} 36L${x + 120} 420L${x + 40} 420Z" fill="#ffffff" fill-opacity="0.07"/>`
    let forest = ''
    for (const [x, h, p] of [[30, 360, 0], [250, 330, 0.3], [590, 300, 0.6], [790, 350, 0.15]])
      forest += anim({ type: 'sway', angle: 3, pivot: [x, 470], period: 5, phase: p }, kelp(x, 470, h))
    return (
      `<rect width="800" height="500" fill="#1f7a9b"/><rect y="300" width="800" height="200" fill="#1a6a88"/>` + rays +
      `<rect width="800" height="36" fill="#8fd3e8"/><path d="M0 36H800" stroke="#c9eef7" stroke-width="3"/>` +
      // Surface: the otter's shell, the diver's flag, the dive boat and its anchor line
      seaOtter(160, 30) + diff(162, 22, 22, shell(162, 24, '#f4a6a6'), '') +
      `<path d="M480 30V8" stroke="#3d4a55" stroke-width="2"/><ellipse cx="480" cy="34" rx="9" ry="5" fill="#ff9f43"/>` +
      diff(486, 22, 22, `<rect x="480" y="8" width="16" height="12" fill="#e63946"/><path d="M480 8L496 20" stroke="#ffffff" stroke-width="3"/>`, `<rect x="480" y="8" width="16" height="12" fill="#3a86ff"/><path d="M488 8V20" stroke="#ffffff" stroke-width="3"/>`) +
      `<path d="M560 36Q660 64 760 36Z" fill="#123c4f"/><path d="M650 46V440" stroke="#d9c7a0" stroke-width="1.5"/>` +
      // Sandy bottom and the kelp
      `<path d="M0 440Q200 420 400 440T800 430V500H0Z" fill="#e9d3a7"/>` + forest + anchor(650, 452, '#3d4a55') +
      // The diver: fins, camera flash; bubbles rising
      diver(360, 220) +
      diff(296, 226, 24, `<path d="M310 220L284 212L290 226ZM310 228L284 236L292 224Z" fill="#ffd23f"/>`, `<path d="M310 220L284 212L290 226ZM310 228L284 236L292 224Z" fill="#e63946"/>`) +
      diff(428, 208, 22, anim({ type: 'blink', duty: 0.3, period: 1.6 }, flash), flash) +
      anim({ type: 'path', points: [[0, 0], [0, -80]], period: 3 }, `<circle cx="404" cy="190" r="3" fill="none" stroke="#c9eef7" stroke-width="1.5"/><circle cx="410" cy="176" r="4" fill="none" stroke="#c9eef7" stroke-width="1.5"/>`) +
      // Garibaldi, the jellyfish
      fish(590, 204, '#ff7f11') + fish(500, 126, '#ff7f11', 0.8) +
      diff(540, 170, 22, garibaldi, anim({ type: 'bob', dx: 4, dy: 2, period: 1.6 }, garibaldi)) +
      diff(700, 127, 26, jelly, anim({ type: 'bob', dx: 0, dy: 3, period: 2.2 }, jelly)) +
      // Sea lion's front flipper
      `<path d="M150 336Q200 316 258 336Q268 342 258 348Q200 360 150 344Z" fill="#6b4a3a"/><path d="M258 340l22 -10l-6 14l6 12Z" fill="#5a3d2b"/>` +
      `<circle cx="150" cy="336" r="12" fill="#6b4a3a"/><circle cx="146" cy="332" r="1.8" fill="#222"/><path d="M138 338l-8 -2M138 341l-8 2" stroke="#d9c7a0" stroke-width="1"/>` +
      diff(198, 356, 22, `<path d="M192 350L214 366L206 352Z" fill="#5a3d2b"/>`, `<path d="M200 350L182 364L190 352Z" fill="#5a3d2b"/>`) +
      // Rocks: the moray eel, the crab on top
      `<path d="M630 440Q640 370 700 362Q770 350 800 372V440Z" fill="#5c677d"/><ellipse cx="676" cy="398" rx="12" ry="9" fill="#2b2d42"/>` +
      diff(677, 386, 22, `<path d="M670 400Q664 380 676 372Q690 370 690 382L682 386L688 392Q684 398 680 400Z" fill="#9aa53b"/><circle cx="680" cy="378" r="1.6" fill="#222"/>`, '') +
      diff(762, 353, 24, crab(762, 362, '#e63946'), crab(762, 362, '#ff9f43')) +
      // On the sand: the octopus, a sea star, urchins
      diff(480, 458, 32, octopus(480, 476, '#8338ec'), octopus(480, 476, '#e76f51')) +
      diff(100, 470, 22, starfish(100, 470, '#ff9f43'), starfish(100, 470, '#ff6b8b')) +
      seaUrchin(300, 478) + diff(330, 470, 22, seaUrchin(330, 478), '') +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['fish', 120, 200, '#8ecae6'],
        ['fish', 360, 330, '#ffd23f'],
        ['seahorse', 560, 300],
        ['seaweed', 200, 480],
        ['clam', 560, 486],
      ])
    )
  },
})
