// "The cheese shop mystery", scene 2 — the storeroom: peck marks on a cheese, a black feather on the
// crates, the little window open, a barrel and a sack knocked over, and the mousetrap still set.
import { detectiveLevel } from '../helpers.ts'
import { cheese, feather, openPanes, panes, windowBox } from './shapes.ts'

function bricks() {
  let s = `<rect width="800" height="380" fill="#c98f6a"/>`
  for (let row = 0; row * 26 < 380; row++) {
    s += `<path d="M0 ${row * 26}H800" stroke="#b07656" stroke-width="3"/>`
    for (let x = (row % 2) * 30; x < 800; x += 60) s += `<path d="M${x} ${row * 26}v26" stroke="#b07656" stroke-width="3"/>`
  }
  return s
}

/** Wooden crate; (x, y) = bottom-left. */
const crate = (x: number, y: number, w: number, h: number) =>
  `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#c69563"/><rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="none" stroke="#8a5a2b" stroke-width="6"/>` +
  `<path d="M${x} ${y - h}L${x + w} ${y}" stroke="#8a5a2b" stroke-width="6"/>`

/** Barrel standing on (x, y) (A) or lying on its side (B). Bounds: upright x ±27, y from −66 to 0; lying x from −36 to +44, y from −48 to 0. */
const barrel = (x: number, y: number) =>
  `<path d="M${x - 24} ${y}Q${x - 30} ${y - 32} ${x - 24} ${y - 64}H${x + 24}Q${x + 30} ${y - 32} ${x + 24} ${y}Z" fill="#a8743f"/>` +
  `<path d="M${x - 26} ${y - 14}H${x + 26}M${x - 26} ${y - 50}H${x + 26}" stroke="#5e3b1a" stroke-width="5"/><ellipse cx="${x}" cy="${y - 64}" rx="24" ry="5" fill="#8a5a2b"/>`
const barrelDown = (x: number, y: number) =>
  `<rect x="${x - 36}" y="${y - 48}" width="72" height="48" rx="20" fill="#a8743f"/><path d="M${x - 20} ${y - 46}V${y - 2}M${x + 16} ${y - 46}V${y - 2}" stroke="#5e3b1a" stroke-width="5"/>` +
  `<ellipse cx="${x + 36}" cy="${y - 24}" rx="8" ry="24" fill="#8a5a2b"/>`

/** Flour sack standing (A) or knocked over with flour spilled (B); (x, y) = bottom middle. Bounds: x ±44, y from −74 to 0. */
const sack = (x: number, y: number) =>
  `<path d="M${x - 26} ${y}Q${x - 34} ${y - 40} ${x - 14} ${y - 60}H${x + 14}Q${x + 34} ${y - 40} ${x + 26} ${y}Z" fill="#e8dcc0"/>` +
  `<path d="M${x - 14} ${y - 60}L${x - 18} ${y - 74}M${x + 14} ${y - 60}L${x + 18} ${y - 74}M${x - 16} ${y - 62}H${x + 16}" stroke="#c9b48f" stroke-width="4" stroke-linecap="round"/>`
const sackDown = (x: number, y: number) =>
  `<ellipse cx="${x + 20}" cy="${y - 4}" rx="16" ry="7" fill="#fffaf0"/>` +
  `<path d="M${x - 42} ${y}Q${x - 44} ${y - 36} ${x - 10} ${y - 38}Q${x + 10} ${y - 34} ${x + 14} ${y - 16}Q${x + 14} ${y} ${x} ${y}Z" fill="#e8dcc0"/>` +
  `<path d="M${x + 12} ${y - 22}l12 -4M${x + 12} ${y - 14}l12 2" stroke="#c9b48f" stroke-width="4" stroke-linecap="round"/>`

/** Set mousetrap with a cheese bait; (x, y) = middle of the base. Bounds: x ±24, y from −18 to +8. */
const mousetrap = (x: number, y: number) =>
  `<rect x="${x - 24}" y="${y - 6}" width="48" height="14" rx="2" fill="#d0a066"/><rect x="${x - 24}" y="${y + 4}" width="48" height="4" fill="#a8743f"/>` +
  `<path d="M${x - 16} ${y - 6}V${y - 16}H${x + 6}V${y - 6}" fill="none" stroke="#8a8f99" stroke-width="2.4"/>` +
  `<path d="M${x + 10} ${y - 6}l12 0l-6 -10Z" fill="#ffd45e"/>`

/** Triangular peck marks on the top of a cheese. Bounds: ±20. */
const pecks = (x: number, y: number) =>
  `<g fill="#c27d12">${[[-14, -2], [-2, -6], [10, -1], [0, 6]].map(([dx, dy]) => `<path d="M${x + dx - 4} ${y + dy - 3}L${x + dx + 4} ${y + dy - 3}L${x + dx} ${y + dy + 5}Z"/>`).join('')}</g>` +
  `<path d="M${x + 14} ${y - 10}l6 -6" stroke="#ffd45e" stroke-width="3" stroke-linecap="round"/>`

export default detectiveLevel({
  id: 507,
  case: 'cheese',
  title: 'cheeseStoreroom',
  parTimeSec: 72,
  scene: ({ clue, anim }) =>
    bricks() +
    `<rect y="380" width="800" height="120" fill="#8f8a80"/><path d="M0 380H800M0 430H800M0 470H800M120 380V430M330 380V430M560 380V430M220 430V470M450 430V470M680 430V470" stroke="#76716a" stroke-width="3"/>` +
    windowBox(60, 60, 100, 80) +
    clue('windowOpen', 110, 100, 56, panes(60, 60, 100, 80), openPanes(60, 60, 100, 80)) +
    anim({ type: 'sway', angle: 10, pivot: [370, 0], period: 3.4 }, `<path d="M370 0V92" stroke="#444" stroke-width="2"/><rect x="356" y="92" width="28" height="34" rx="5" fill="#5b6b7a"/><rect x="362" y="98" width="16" height="22" fill="#ffd54a"/>`) +
    crate(180, 380, 120, 80) +
    crate(195, 300, 90, 60) +
    clue('feather', 240, 230, 26, '', feather(240, 230)) +
    // The cheese rack
    `<rect x="440" y="130" width="10" height="250" fill="#8a5a2b"/><rect x="630" y="130" width="10" height="250" fill="#8a5a2b"/>` +
    [200, 270, 340].map((y) => `<rect x="436" y="${y}" width="208" height="10" fill="#a8743f"/>`).join('') +
    cheese(480, 200, 28) +
    cheese(540, 200, 30) +
    clue('peckMarks', 540, 180, 28, '', pecks(540, 183)) +
    cheese(598, 200, 26) +
    cheese(490, 270, 32) +
    cheese(580, 270, 30) +
    cheese(470, 340, 24) +
    cheese(530, 340, 26) +
    cheese(595, 340, 28) +
    clue('barrelTipped', 724, 348, 50, barrel(720, 380), barrelDown(720, 380)) +
    clue('sackSpilled', 350, 346, 56, sack(352, 380), sackDown(350, 380)) +
    clue('trapUntouched', 470, 444, 30, '', mousetrap(470, 446)),
})
