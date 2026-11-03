// "The broken vase", scene 2 — the corridor: a camera lens cap on the carpet, the window shut tight
// (nothing flew in), the security camera turned away, a plant knocked over, a gum wrapper, the
// storeroom key gone from its hook and the brochure stand emptied.
import { detectiveLevel } from '../helpers.ts'
import { boards, clockFace, openPanes, panes, pendulum, picture, plant, windowBox } from './shapes.ts'

/** Security camera on its arm from the right wall, turned by `angle` around (742, 62). Bounds: 50 around the pivot. */
const camera = (angle: number) =>
  `<g transform="rotate(${angle} 742 62)"><rect x="700" y="53" width="44" height="18" rx="4" fill="#f5ecd8"/><rect x="694" y="56" width="8" height="12" rx="2" fill="#2b2b38"/>` +
  `<circle cx="736" cy="58" r="2.5" fill="#e5484d"/></g>`

/** Key on a hook at (x, y). Bounds: x ±7, y from 2 to 30. */
const key = (x: number, y: number, color: string) =>
  `<circle cx="${x}" cy="${y + 8}" r="5" fill="none" stroke="${color}" stroke-width="3"/><path d="M${x} ${y + 13}V${y + 30}M${x} ${y + 24}h5M${x} ${y + 29}h4" stroke="${color}" stroke-width="3"/>`

/** The stand's three pockets hold brochures (A) or none (B). Bounds: x 174–246, y 278–306. */
const brochures = () =>
  [
    [176, '#5b8db8'],
    [200, '#e8457a'],
    [224, '#f2b632'],
  ]
    .map(([x, c]) => `<rect x="${x}" y="280" width="20" height="26" rx="2" fill="${c}"/><rect x="${(x as number) + 4}" y="286" width="12" height="6" fill="#fff" fill-opacity="0.7"/>`)
    .join('')

/** Small plant knocked over to the left, soil spilled; the upright one is `plant` scaled. (x, y) = bottom middle. */
const smallPlant = (x: number, y: number) => `<g transform="translate(${x} ${y}) scale(0.62)">${plant(0, 0)}</g>`
const plantDown = (x: number, y: number) =>
  `<ellipse cx="${x - 18}" cy="${y - 3}" rx="18" ry="5" fill="#6b4a2b"/><g transform="rotate(-90 ${x - 14} ${y})">${smallPlant(x, y)}</g>`

const lensCap = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="11" fill="#2b2b38"/><circle cx="${x}" cy="${y}" r="6.5" fill="none" stroke="#5b6b7a" stroke-width="2"/><path d="M${x + 10} ${y + 4}q6 4 4 10" stroke="#2b2b38" stroke-width="2" fill="none"/>`
const gumWrapper = (x: number, y: number) =>
  `<path d="M${x - 12} ${y - 4}L${x - 2} ${y - 9}L${x + 12} ${y - 5}L${x + 9} ${y + 6}L${x - 4} ${y + 9}L${x - 11} ${y + 4}Z" fill="#f28fb1"/><path d="M${x - 8} ${y}L${x + 8} ${y - 2}" stroke="#fff" stroke-width="2.4"/>`

export default detectiveLevel({
  id: 512,
  case: 'vase',
  title: 'vaseCorridor',
  parTimeSec: 82,
  scene: ({ clue, anim, secret }) =>
    `<rect width="800" height="500" fill="#e8eef5"/><rect y="260" width="800" height="120" fill="#c9d6e3"/><rect y="254" width="800" height="10" fill="#b3c3d4"/>` +
    `<rect y="380" width="800" height="120" fill="#c69563"/>` +
    boards(380, '#a8743f') +
    // The category's hidden key, peeking out from under the carpet
    secret(560, 473, 8) +
    `<rect y="402" width="800" height="70" fill="#b83236"/><path d="M0 410H800M0 464H800" stroke="#f2c14e" stroke-width="3"/>` +
    windowBox(50, 90, 90, 120) +
    clue('windowShut', 95, 150, 66, openPanes(50, 90, 90, 120), panes(50, 90, 90, 120) + `<rect x="89" y="144" width="12" height="8" rx="2" fill="#c9953f"/>`) +
    // Brochure stand
    `<rect x="196" y="300" width="28" height="80" fill="#8a5a2b"/><rect x="170" y="296" width="80" height="22" rx="3" fill="#a8743f"/>` +
    clue('brochuresGone', 210, 292, 40, brochures(), '') +
    `<rect x="170" y="300" width="80" height="18" rx="3" fill="#a8743f"/>` +
    picture(330, 160, 70, 90, `<circle cy="-8" r="16" fill="#f2c9a0"/><path d="M-26 45Q0 0 26 45Z" fill="#5b6b7a"/><path d="M-16 -14q16 -22 32 0" fill="#5e3b1a"/>`) +
    // Key board
    `<rect x="420" y="170" width="60" height="26" rx="3" fill="#8a5a2b"/>` +
    key(432, 196, '#c9953f') +
    clue('keyGone', 450, 214, 22, key(450, 196, '#8a8f99'), '') +
    key(468, 196, '#c9953f') +
    anim({ type: 'sway', angle: 12, pivot: [570, 134], period: 2 }, pendulum(570, 110)) +
    clockFace(570, 110) +
    // Security camera on the right wall
    `<rect x="766" y="44" width="12" height="36" rx="3" fill="#8a8f99"/><path d="M742 62H768" stroke="#8a8f99" stroke-width="6"/>` +
    clue('cameraTurned', 742, 62, 50, camera(-25), camera(70)) +
    clue('plantTipped', 638, 355, 50, smallPlant(660, 380), plantDown(660, 380)) +
    clue('lensCap', 260, 432, 24, '', lensCap(260, 432)) +
    clue('gumWrapper', 430, 444, 22, '', gumWrapper(430, 444)),
})
