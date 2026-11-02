// "The cheese shop mystery", scene 1 — the shop: the big cheese is gone from the counter, the skylight
// is open, the coins vanished, the scales tipped, crumbs on the top shelf, and the door padlocked.
import { detectiveLevel } from '../helpers.ts'
import { boards, cheese, coins, crumbs, door, room, shelf } from './shapes.ts'

/** Skylight in the ceiling, x 380–440, y 18–54: shut (A) or open to the sky (B). */
const skylight = (open: boolean) =>
  open
    ? `<rect x="380" y="18" width="60" height="36" fill="#9fd8ff"/><circle cx="426" cy="30" r="8" fill="#fff"/><circle cx="416" cy="34" r="7" fill="#fff"/>` +
      `<path d="M386 54L392 46H428L434 54" fill="none" stroke="#7a5233" stroke-width="3"/>`
    : `<rect x="380" y="18" width="60" height="36" fill="#cfeeff"/><path d="M410 18V54M380 36H440" stroke="#7a5233" stroke-width="4"/>` +
      `<path d="M388 26l10 -6M414 42l10 -6" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`

/** Balance scales on the counter at (420, 262); `tipped` drops the left pan. Bounds of beam and pans: x 376–464, y 194–242. */
function scales(tipped: boolean) {
  const a = ((tipped ? -15 : 0) * Math.PI) / 180
  const ends = [-1, 1].map((s) => [420 + s * 34 * Math.cos(a), 200 + s * 34 * Math.sin(a)] as const)
  return (
    `<path d="M${ends[0][0].toFixed(1)} ${ends[0][1].toFixed(1)}L${ends[1][0].toFixed(1)} ${ends[1][1].toFixed(1)}" stroke="#c9953f" stroke-width="5" stroke-linecap="round"/>` +
    ends
      .map(
        ([x, y]) =>
          `<path d="M${x.toFixed(1)} ${y.toFixed(1)}l-8 22M${x.toFixed(1)} ${y.toFixed(1)}l8 22" stroke="#8a6a3a" stroke-width="1.5"/>` +
          `<path d="M${(x - 11).toFixed(1)} ${(y + 22).toFixed(1)}h22q-11 10 -22 0Z" fill="#c9953f"/>`,
      )
      .join('')
  )
}

/** Padlock and chain on the door knob at (652, 247). Bounds: x 638–668, y 236–282. */
const padlock = () =>
  `<path d="M644 244q8 -10 16 0q-8 10 -16 0Z" fill="none" stroke="#8a8f99" stroke-width="3"/><path d="M646 262v-8a6 6 0 0 1 12 0v8" fill="none" stroke="#8a8f99" stroke-width="3"/>` +
  `<rect x="640" y="260" width="24" height="20" rx="4" fill="#5b6b7a"/><circle cx="652" cy="270" r="3" fill="#2b2b38"/>`

export default detectiveLevel({
  id: 506,
  case: 'cheese',
  title: 'cheeseShop',
  parTimeSec: 70,
  scene: ({ clue, anim }) =>
    room('#f3e2b3', '#b5835a', 360) +
    boards(360, '#9b6a3f') +
    `<rect width="800" height="64" fill="#e0c995"/><path d="M0 64H800" stroke="#c9b07a" stroke-width="6"/>` +
    `<path d="M120 0V64M260 0V64M560 0V64M700 0V64" stroke="#c9b07a" stroke-width="10"/>` +
    clue('skylightOpen', 410, 36, 36, skylight(false), skylight(true)) +
    // Shelves of cheese on the left
    shelf(30, 150, 180) +
    cheese(62, 150, 26) +
    cheese(114, 150, 22) +
    clue('crumbsTopShelf', 168, 142, 28, '', crumbs(168, 146, '#e6a22a')) +
    shelf(30, 230, 180) +
    cheese(60, 230, 24) +
    cheese(108, 230, 24) +
    cheese(160, 230, 26) +
    // A string of sausages on the back wall
    `<path d="M480 90q60 40 120 0" stroke="#8a6a3a" stroke-width="2" fill="none"/>` +
    `<g fill="#b84b4b">${[496, 524, 556, 586].map((x, i) => `<ellipse cx="${x}" cy="${110 + (i === 1 || i === 2 ? 12 : 4)}" rx="9" ry="18"/>`).join('')}</g>` +
    door(640, 150, 100, 210, '#5b8db8') +
    clue('doorPadlock', 653, 260, 28, '', padlock()) +
    anim({ type: 'sway', angle: 12, pivot: [690, 120], period: 1.8 }, `<path d="M690 120V132" stroke="#8a6a3a" stroke-width="2"/><path d="M680 146q0 -14 10 -14t10 14Z" fill="#f2c14e"/>`) +
    // The counter
    `<rect x="200" y="270" width="380" height="90" fill="#a8743f"/><rect x="190" y="260" width="400" height="12" rx="3" fill="#8a5a2b"/>` +
    `<rect x="220" y="284" width="100" height="62" rx="4" fill="#000" fill-opacity="0.1"/><rect x="340" y="284" width="100" height="62" rx="4" fill="#000" fill-opacity="0.1"/><rect x="460" y="284" width="100" height="62" rx="4" fill="#000" fill-opacity="0.1"/>` +
    `<rect x="250" y="254" width="100" height="8" rx="3" fill="#d9a35a"/>` +
    clue('cheeseGone', 300, 236, 48, cheese(300, 256, 42), crumbs(300, 252, '#e6a22a')) +
    `<rect x="400" y="248" width="40" height="14" rx="3" fill="#8a6a3a"/><rect x="417" y="200" width="6" height="50" fill="#8a6a3a"/>` +
    clue('scalesTipped', 420, 218, 52, scales(false), scales(true)) +
    clue('coinsGone', 520, 254, 24, coins(520, 260, 4), ''),
})
