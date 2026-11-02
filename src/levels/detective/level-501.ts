// "The missing cake", scene 1 — the kitchen: the cake is gone from its stand, the window is open,
// paw prints by the counter, a stool knocked over and drops of cream leading to the door.
import { detectiveLevel } from '../helpers.ts'
import { clockFace, crumbs, door, hangingLamp, jar, openPanes, panes, pawTrail, pendulum, room, shelf, table, tiles, windowBox } from './shapes.ts'

/** Two-layer cake with cream and a cherry; (x, y) = bottom middle. Bounds: x ±30, y from −53 to 0. */
const cake = (x: number, y: number) =>
  `<rect x="${x - 30}" y="${y - 24}" width="60" height="24" rx="4" fill="#f7c6d9"/><rect x="${x - 22}" y="${y - 42}" width="44" height="19" rx="4" fill="#fbe3ec"/>` +
  `<path d="M${x - 30} ${y - 22}h60v6q-5 6-10 0t-10 0t-10 0t-10 0t-10 0t-10 0Z" fill="#fff"/>` +
  `<g fill="#fff">${[-15, -5, 5, 15].map((dx) => `<circle cx="${x + dx}" cy="${y - 43}" r="4"/>`).join('')}</g><circle cx="${x}" cy="${y - 48}" r="5" fill="#e5484d"/>`

/** Stool standing on y (A) or knocked over (B). Bounds: x from −34 to +31 around x, y from −63 to 0. */
const stool = (x: number, y: number) =>
  `<path d="M${x - 14} ${y - 54}L${x - 20} ${y}M${x + 14} ${y - 54}L${x + 20} ${y}M${x - 17} ${y - 26}H${x + 17}" stroke="#a8743f" stroke-width="6" stroke-linecap="round"/>` +
  `<ellipse cx="${x}" cy="${y - 56}" rx="24" ry="7" fill="#d9774a"/>`
const stoolDown = (x: number, y: number) =>
  `<path d="M${x - 26} ${y - 14}L${x + 28} ${y - 20}M${x - 26} ${y - 34}L${x + 28} ${y - 4}M${x} ${y - 30}V${y - 6}" stroke="#a8743f" stroke-width="6" stroke-linecap="round"/>` +
  `<ellipse cx="${x - 27}" cy="${y - 24}" rx="7" ry="22" fill="#d9774a"/>`

/** Cooking pot on the counter; steam is animated separately. */
const pot = (x: number, y: number) =>
  `<rect x="${x - 26}" y="${y - 30}" width="52" height="30" rx="6" fill="#5b6b7a"/><rect x="${x - 32}" y="${y - 34}" width="64" height="7" rx="3" fill="#6f8091"/>` +
  `<rect x="${x - 8}" y="${y - 40}" width="16" height="7" rx="3" fill="#6f8091"/>`
const steam = (x: number, y: number) =>
  `<path d="M${x - 10} ${y - 46}q-6 -8 0 -16t0 -16M${x + 8} ${y - 46}q-6 -8 0 -16t0 -16" stroke="#fff" stroke-opacity="0.8" stroke-width="4" stroke-linecap="round" fill="none"/>`

const creamDrops = (x: number, y: number) =>
  `<g fill="#fffaf0" stroke="#e8d9c0" stroke-width="1.5"><ellipse cx="${x - 18}" cy="${y + 6}" rx="7" ry="4"/><ellipse cx="${x}" cy="${y - 8}" rx="6" ry="3.5"/>` +
  `<ellipse cx="${x + 18}" cy="${y + 8}" rx="8" ry="4.5"/><circle cx="${x + 2}" cy="${y + 12}" r="3"/></g>`

export default detectiveLevel({
  id: 501,
  case: 'cake',
  title: 'cakeKitchen',
  parTimeSec: 60,
  scene: ({ clue, anim }) =>
    room('#f6e3c4', '#e9d3b0', 330) +
    tiles(330, '#dcc29b', '#d2b48c') +
    // Window over the counter
    windowBox(80, 70, 120, 110) +
    clue('windowOpen', 140, 125, 74, panes(80, 70, 120, 110), openPanes(80, 70, 120, 110)) +
    `<rect x="40" y="250" width="210" height="80" fill="#7fb3a6"/><rect x="32" y="240" width="226" height="12" rx="3" fill="#e8e1d4"/>` +
    `<path d="M110 258v64M180 258v64" stroke="#5f9488" stroke-width="3"/><circle cx="100" cy="290" r="4" fill="#f2c14e"/><circle cx="190" cy="290" r="4" fill="#f2c14e"/>` +
    pot(205, 240) +
    anim({ type: 'bob', dx: 0, dy: -6, period: 2.4 }, steam(205, 240)) +
    // Shelves with jars and the clock
    shelf(250, 120, 90) +
    jar(275, 120, '#f2b632') +
    jar(315, 120, '#9ccc65') +
    shelf(430, 120, 90) +
    jar(455, 120, '#ff8a65') +
    jar(495, 120, '#ba68c8') +
    anim({ type: 'sway', angle: 14, pivot: [585, 114], period: 2 }, pendulum(585, 90)) +
    clockFace(585, 90) +
    door(640, 150, 100, 180, '#b5835a') +
    // The table with the cake stand under the lamp
    hangingLamp(380, 170) +
    table(270, 300, 220, 100, '#a8743f') +
    `<path d="M266 298H494L488 324H272Z" fill="#e05a47"/><path d="M290 298l-4 26M330 298l-2 26M370 298v26M410 298v26M450 298l2 26" stroke="#fff" stroke-opacity="0.6" stroke-width="5"/>` +
    `<rect x="375" y="288" width="10" height="11" fill="#fff"/><ellipse cx="380" cy="297" rx="18" ry="4" fill="#fff"/><ellipse cx="380" cy="288" rx="44" ry="6" fill="#fff"/>` +
    clue('cakeGone', 380, 262, 42, cake(380, 288), crumbs(380, 285)) +
    clue('stoolTipped', 575, 370, 46, stool(580, 400), stoolDown(578, 400)) +
    clue('pawPrints', 209, 444, 40, '', pawTrail([[186, 452], [208, 432], [232, 450]])) +
    clue('creamDrops', 690, 386, 30, '', creamDrops(690, 386)),
})
