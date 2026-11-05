// "The missing cake", scene 3 — the living room: fur on the sofa, cream on a cushion, the rug's
// corner folded over, the lamp shade knocked crooked and fresh scratches low on the door.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { boards, door, hills, picture, room, stripes } from './shapes.ts'

const sofa = () =>
  `<rect x="250" y="250" width="300" height="80" rx="18" fill="#5b8db8"/><rect x="236" y="290" width="328" height="60" rx="16" fill="#4a7aa3"/>` +
  `<rect x="226" y="272" width="40" height="86" rx="14" fill="#5b8db8"/><rect x="534" y="272" width="40" height="86" rx="14" fill="#5b8db8"/>` +
  `<rect x="252" y="354" width="10" height="16" fill="#3b2a1a"/><rect x="538" y="354" width="10" height="16" fill="#3b2a1a"/>`
/** Sofa cushion; (x, y) = center. Bounds: x ±44, y ±26. */
const cushion = (x: number, y: number, color: string) =>
  `<rect x="${x - 40}" y="${y - 24}" width="80" height="48" rx="14" fill="${color}"/><circle cx="${x}" cy="${y}" r="4" fill="#000" fill-opacity="0.15"/>`

const fur = (x: number, y: number) =>
  `<path d="M${x - 20} ${y + 6}q6 -10 12 -2M${x - 4} ${y - 4}q6 -10 12 -2M${x + 8} ${y + 10}q6 -10 12 -2M${x - 14} ${y - 12}q4 -8 10 -2" stroke="#8a6a4a" stroke-width="2.4" stroke-linecap="round" fill="none"/>`
const cream = (x: number, y: number) =>
  `<path d="M${x - 16} ${y + 4}q2 -12 14 -10q10 -8 16 2q6 6 -2 12q-14 6 -28 -4Z" fill="#fffaf0"/><circle cx="${x + 2}" cy="${y - 2}" r="3" fill="#f7c6d9"/>`

/** Floor lamp's pole and base at x; the shade is separate (`shade`). */
const lampPole = (x: number) =>
  `<path d="M${x} 160V372" stroke="#555" stroke-width="5"/><ellipse cx="${x}" cy="374" rx="28" ry="7" fill="#555"/>`
/** Lamp shade centered at (x, y), tilted by `angle` degrees. Bounds: ±36 before tilting. */
const shade = (x: number, y: number, angle: number) =>
  `<g transform="rotate(${angle} ${x} ${y + 22})"><path d="M${x - 22} ${y - 22}H${x + 22}L${x + 34} ${y + 22}H${x - 34}Z" fill="#f2b632"/>` +
  `<path d="M${x - 34} ${y + 22}H${x + 34}" stroke="#d9952a" stroke-width="4"/></g>`

/** Rug with a fringe, x 230–570, y 400–460; the right front corner (x ≥ 536, y ≥ 430) is drawn by the scene. */
const rug = () =>
  `<path d="M260 400H540L570 460H230Z" fill="#c0603a"/><path d="M282 410H518L538 450H262Z" fill="none" stroke="#f2c14e" stroke-width="4"/>` +
  `<path d="M232 464h336" stroke="#f5ecd8" stroke-width="5" stroke-dasharray="3 4"/>`
/** The rug's right front corner flat (A) or folded back (B). Bounds: x 520–574, y 420–468. */
const corner = (folded: boolean) =>
  folded
    ? `<path d="M570 460L540 460L556 432Z" fill="#c69563"/><path d="M540 460L556 432L528 440Z" fill="#8f4428"/><path d="M542 464h28" stroke="#c69563" stroke-width="6"/>`
    : ''

const fishBowl = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y - 34}" r="34" fill="#bfe6ff" fill-opacity="0.75"/><rect x="${x - 22}" y="${y - 72}" width="44" height="8" rx="4" fill="#e8f6ff"/>`
const fish = (x: number, y: number) => `<path d="M${x} ${y}q10 -9 20 0q-10 9 -20 0Zm20 0l8 -6v12Z" fill="#ff8a3d"/>`

export default detectiveLevel({
  id: 503,
  case: 'cake',
  title: 'cakeLivingRoom',
  parTimeSec: 64,
  scene: ({ clue, anim, extra }) =>
    room('#dfe8d0', '#c69563', 380) +
    stripes(370, '#d3e0c0') +
    boards(380, '#a8743f') +
    picture(400, 130, 150, 90, hills(150, 90)) +
    door(650, 150, 100, 230, '#9b6a3f') +
    clue('lowScratches', 690, 330, 28, '', `<path d="M676 316l8 26M686 314l8 26M696 318l6 22" stroke="#5e3b1a" stroke-width="3" stroke-linecap="round"/>`) +
    lampPole(120) +
    clue('lampCrooked', 120, 145, 50, shade(120, 140, 0), shade(120, 140, -16)) +
    // Side table with the fish bowl
    `<rect x="590" y="330" width="44" height="50" fill="#a8743f"/><rect x="584" y="322" width="56" height="10" rx="3" fill="#8a5a2b"/>` +
    fishBowl(612, 322) +
    anim({ type: 'path', points: [[0, 0], [24, 6]], period: 5, flipX: 613 }, fish(598, 288)) +
    rug() +
    clue('rugFolded', 548, 446, 32, '', corner(true)) +
    sofa() +
    cushion(316, 280, '#ffc94a') +
    clue('furOnSofa', 316, 280, 30, '', fur(316, 280)) +
    cushion(400, 282, '#f28fb1') +
    cushion(484, 280, '#7cc25a') +
    clue('creamOnCushion', 484, 280, 28, '', cream(484, 280)) +
    // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
    decor({ anim }, [
      ['antlers', 72, 242],
      ['cactus', 218, 478],
      ['sconce', 352, 209],
      ['calendar', 573, 62],
      ['teddy', 755, 480],
    ]) +
    extras({ extra, anim }, [
      ['butterflyFrame', 40, 58],
      ['mouse', 47, 459],
      ['bucket', 138, 486],
      ['wallPhone', 204, 60],
      ['roundMirror', 410, 55],
      ['bunting', 497, 358],
      ['treasureMap', 619, 230],
      ['toyDrum', 620, 485],
      ['pouf', 693, 474, '#e5484d'],
      ['photoOval', 758, 131],
    ]),
})
