// Tokyo: Mount Fuji behind the city, Tokyo Tower, a bullet train on a viaduct, cherry blossoms and lanterns.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { level404Redesign } from './level-404-redesign.ts'
import { cloud, lantern, person, sky } from './shapes.ts'

/** Mount Fuji from x0 to x1 on the ground at y; the snow cap is separate. Peak at (x0 + x1) / 2, 210 above. */
const fuji = (x0: number, x1: number, y: number) => {
  const cx = (x0 + x1) / 2
  return `<path d="M${x0} ${y}L${cx - 20} ${y - 200}Q${cx} ${y - 218} ${cx + 20} ${y - 200}L${x1} ${y}Z" fill="#6b8fbf"/>`
}
/** Snow cap of `fuji` with its peak at cx, on ground y. Bounds: x ±60, y from −214 to −150. */
const snow = (cx: number, y: number) =>
  `<path d="M${cx - 60} ${y - 154}L${cx - 20} ${y - 200}Q${cx} ${y - 218} ${cx + 20} ${y - 200}L${cx + 60} ${y - 154}L${cx + 42} ${y - 162}L${cx + 26} ${y - 150}L${cx + 10} ${y - 164}L${cx - 8} ${y - 150}L${cx - 24} ${y - 164}L${cx - 42} ${y - 152}Z" fill="#ffffff"/>`

/** Tokyo Tower; (x, y) = ground in the middle. The top deck is separate. Bounds: x ±40, y from −320 to 0. */
const tower = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-40 0Q-16 -80 -8 -160L-4 -250L-2 -290H2L4 -250L8 -160Q16 -80 40 0H24Q0 -50 -24 0Z" fill="#e8552d"/>` +
  `<path d="M-30 -60h60M-22 -110h44M-12 -200h24" stroke="#ffffff" stroke-width="8"/>` +
  `<rect x="-22" y="-142" width="44" height="16" rx="3" fill="#ffffff"/><rect x="-18" y="-138" width="36" height="6" fill="#7aa6d6"/>` +
  `<rect x="-2" y="-320" width="4" height="34" fill="#e8552d"/><rect x="-2" y="-310" width="4" height="6" fill="#ffffff"/></g>`
/** Top deck of `tower` at (x, y). Bounds: x ±13, y from −222 to −210. */
const topDeck = (x: number, y: number) =>
  `<rect x="${x - 13}" y="${y - 222}" width="26" height="12" rx="3" fill="#ffffff"/><rect x="${x - 10}" y="${y - 218}" width="20" height="4" fill="#7aa6d6"/>`

/** Bullet train on the viaduct, nose to the right at x = 540; (x, y) = rail level. */
const train = (y: number) => {
  let windows = ''
  for (let wx = 20; wx < 460; wx += 22) windows += `<rect x="${wx}" y="${y - 26}" width="14" height="8" rx="2" fill="#4b5d73"/>`
  return (
    `<path d="M0 ${y - 32}H470Q520 ${y - 30} 540 ${y}H0Z" fill="#f4f6f8"/>` +
    `<path d="M0 ${y - 12}H520" stroke="#2b59c3" stroke-width="4"/>${windows}` +
    `<path d="M478 ${y - 26}Q500 ${y - 24} 512 ${y - 14}H478Z" fill="#4b5d73"/>` +
    [150, 300, 450].map((dx) => `<path d="M${dx} ${y - 30}V${y - 2}" stroke="#c9ced6" stroke-width="2"/>`).join('')
  )
}
/** Pantograph on the train roof at x (rail level y). Bounds: x ±12, y from −46 to −32. */
const pantograph = (x: number, y: number) =>
  `<path d="M${x - 8} ${y - 32}L${x + 4} ${y - 44}L${x + 8} ${y - 32}M${x - 10} ${y - 44}h20" fill="none" stroke="#3d4a55" stroke-width="2.4"/>`

/** Cherry tree in blossom; (x, y) = foot of the trunk. Bounds: x ±64·s, y from −130·s to 0. */
const sakura = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-6 0L-4 -60L-24 -86M-4 -60L10 -96M2 -70L26 -84" fill="none" stroke="#6b4a3a" stroke-width="9" stroke-linecap="round"/>` +
  `<circle cx="-30" cy="-90" r="34" fill="#f7b7c8"/><circle cx="26" cy="-90" r="36" fill="#f7b7c8"/><circle cy="-108" r="38" fill="#f9c9d6"/>` +
  [[-40, -96], [-18, -118], [8, -126], [30, -100], [-4, -92], [44, -80]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="4" fill="#ffffff"/>`).join('') +
  `</g>`

/** Torii gate; (x, y) = ground in the middle. Bounds: x ±50, y from −90 to 0. */
const torii = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#d7372d"><rect x="-34" y="-74" width="9" height="74"/><rect x="25" y="-74" width="9" height="74"/>` +
  `<rect x="-42" y="-62" width="84" height="7"/><path d="M-50 -90Q0 -80 50 -90L46 -78Q0 -70 -46 -78Z" fill="#2b2b2b"/></g>`

/** Paper umbrella over a `person` standing at (x, y). Bounds: x ±30, y from −94 to −66. */
const wagasa = (x: number, y: number, color: string) =>
  `<path d="M${x - 30} ${y - 68}Q${x} ${y - 102} ${x + 30} ${y - 68}Z" fill="${color}"/>` +
  `<path d="M${x} ${y - 90}L${x - 18} ${y - 68}M${x} ${y - 90}L${x + 18} ${y - 68}M${x} ${y - 90}V${y - 68}" stroke="#ffffff" stroke-opacity="0.6" stroke-width="1.6"/>`

/** Name plaque between the beams of a `torii` at (x, y). Bounds: x ±6, y from −78 to −62. */
const plaque = (x: number, y: number) =>
  `<rect x="${x - 6}" y="${y - 78}" width="12" height="16" fill="#2b2b2b"/><rect x="${x - 3}" y="${y - 75}" width="6" height="10" fill="#e8c46a"/>`

/** White-eye (a small green bird) sitting at (x, y) (its feet), faces left. Bounds: x ±14, y from −16 to 0. */
const whiteEye = (x: number, y: number) =>
  `<path d="M${x + 6} ${y - 6}l9 2l-8 3Z" fill="#6f8f3a"/><ellipse cx="${x}" cy="${y - 7}" rx="8" ry="6" fill="#9cbf4a"/>` +
  `<circle cx="${x - 6}" cy="${y - 11}" r="5" fill="#9cbf4a"/><circle cx="${x - 7}" cy="${y - 11}" r="2.4" fill="#ffffff"/><circle cx="${x - 7}" cy="${y - 11}" r="1.1" fill="#222"/>` +
  `<path d="M${x - 11} ${y - 11}l-3 1l3 1Z" fill="#3d4a55"/><path d="M${x - 2} ${y}v-2M${x + 2} ${y}v-2" stroke="#6b4a3a" stroke-width="1.4"/>`

/** Stone lantern standing at (x, y); its roof is `lanternRoof`. Bounds: x ±11, y from −46 to 0. */
const stoneLantern = (x: number, y: number) =>
  `<rect x="${x - 11}" y="${y - 8}" width="22" height="8" fill="#9aa1a8"/><rect x="${x - 4}" y="${y - 30}" width="8" height="22" fill="#a9b0b7"/>` +
  `<rect x="${x - 10}" y="${y - 46}" width="20" height="16" fill="#9aa1a8"/><rect x="${x - 4}" y="${y - 42}" width="8" height="8" fill="#ffd166"/>`
/** Roof of a `stoneLantern` at (x, y). Bounds: x ±16, y from −62 to −46. */
const lanternRoof = (x: number, y: number) =>
  `<path d="M${x - 16} ${y - 46}Q${x} ${y - 58} ${x + 16} ${y - 46}Z" fill="#7d858d"/><circle cx="${x}" cy="${y - 58}" r="4" fill="#7d858d"/>`

export default travelLevel({
  id: 404,
  redesign: level404Redesign,
  title: 'tokyo',
  parTimeSec: 87,
  place: { region: 'asia', country: 'jp', lat: 35.68, lon: 139.69 },
  scene: ({ diff, anim, extra }) =>
    sky('#bfe3f2') +
    anim({ type: 'path', points: [[0, 0], [60, 0]], period: 40 }, cloud(560, 160, 0.5)) +
    fuji(110, 530, 340) +
    diff(320, 158, 68, snow(320, 340), '') +
    // Low city and the tower behind the viaduct
    `<path d="M0 380V330h60v-24h50v40h70v-20h60v24h80v-30h70v30h90v-36h60v26h90v-20h60v20h100V380Z" fill="#a9b8c9"/>` +
    tower(640, 380) +
    diff(640, 164, 24, topDeck(640, 380), '') +
    // Viaduct, train and the park below
    `<rect y="380" width="800" height="120" fill="#8fc46a"/>` +
    [60, 200, 340, 480, 620, 760].map((px) => `<rect x="${px - 8}" y="380" width="16" height="44" fill="#a3aab3"/>`).join('') +
    `<rect y="370" width="800" height="14" fill="#c9ced6"/>` +
    train(370) +
    diff(250, 332, 24, pantograph(250, 370), '') +
    `<path d="M0 430H800" stroke="#7bb35a" stroke-width="3"/>` +
    sakura(90, 480, 0.9) +
    diff(90, 342, 24, whiteEye(90, 350), '') +
    torii(530, 480) +
    diff(530, 410, 24, plaque(530, 480), '') +
    stoneLantern(470, 480) +
    diff(470, 426, 24, lanternRoof(470, 480), '') +
    person(380, 480, '#f28fb1', false, '#f2d29b', '#1d1d1d') +
    diff(380, 398, 34, wagasa(380, 480, '#e63946'), wagasa(380, 480, '#2b59c3')) +
    `<path d="M392 446L382 394" stroke="#7a5233" stroke-width="2"/>` +
    sakura(730, 490, 1.05) +
    // Lantern string across the top
    `<path d="M0 30Q400 90 800 30" fill="none" stroke="#3d4a55" stroke-width="2"/>` +
    [100, 220, 340, 460, 700].map((lx) => lantern(lx, 30 + 120 * (lx / 800) * (1 - lx / 800))).join('') +
    diff(580, 71, 24, lantern(580, 30 + 120 * 0.725 * 0.275), lantern(580, 30 + 120 * 0.725 * 0.275, '#ffd23f')) +
    // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
    decor({ anim }, [
      ['mushroom', 192, 488, '#e63946'],
      ['bird', 436, 480, '#8a5a33'],
      ['flower', 652, 484, '#ffd23f'],
      ['flower', 320, 480, '#ff6b8b'],
      ['butterfly', 528, 460, '#ffd23f'],
      ['birds', 160, 180],
      ['balloon', 560, 228, '#ffd23f'],
    ]) +
    extras({ extra, anim }, [
      ['stones', 248, 412],
      ['grass', 60, 484],
      ['ladybug', 592, 404],
      ['birds', 712, 228],
      ['cloud', 456, 144],
    ]),
})
