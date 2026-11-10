// Corn maze: an autumn festival among the farm's ten hardest (hidden until released, levels/upcoming.ts). New
// on the farm: a corn maze with its entrance arch, a wooden lookout tower, children in the maze, crows, a hay
// wagon ride, a pony, a pumpkin stack and a popcorn cart. Motion differences: the tower's flag flies only on
// picture A; the tractor's smoke puffs and the pony swishes its tail only on B.
import { bird } from '../chapter-03/shapes.ts'
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { tractor } from '../shapes.ts'

/** Pennant on a pole top at (x, y). Bounds: x from 0 to +22, y ±6. */
const pennant = (x: number, y: number) => `<path d="M${x} ${y - 6}L${x + 22} ${y}L${x} ${y + 6}Z" fill="#e63946"/>`

/** Lookout tower without its flag; (x, y) = ground center. Bounds: x ±64, y from −286 to 0. */
const lookout = (x: number, y: number) =>
  `<path d="M${x - 50} ${y}L${x - 38} ${y - 180}M${x + 50} ${y}L${x + 38} ${y - 180}" stroke="#8a5a33" stroke-width="6"/>` +
  `<path d="M${x - 46} ${y - 40}L${x + 42} ${y - 110}M${x + 46} ${y - 40}L${x - 42} ${y - 110}M${x - 46} ${y - 40}H${x + 46}M${x - 42} ${y - 110}H${x + 42}" stroke="#8a5a33" stroke-width="3"/>` +
  `<rect x="${x - 54}" y="${y - 192}" width="108" height="12" fill="#a0703f"/>` +
  `<path d="M${x - 50} ${y - 192}V${y - 234}M${x + 50} ${y - 192}V${y - 234}" stroke="#8a5a33" stroke-width="4"/>` +
  `<path d="M${x - 64} ${y - 232}L${x} ${y - 270}L${x + 64} ${y - 232}Z" fill="#8e2c27"/><path d="M${x} ${y - 270}V${y - 286}" stroke="#3d4a55" stroke-width="2.5"/>` +
  `<path d="M${x - 54} ${y - 206}H${x + 54}" stroke="#8a5a33" stroke-width="3"/>`

/** Corn stalk; (x, y) = foot, h tall. Bounds: x ±10, y from −h − 8 to 0. */
const stalk = (x: number, y: number, h: number) =>
  `<path d="M${x} ${y}V${y - h}" stroke="#7aa63f" stroke-width="4"/>` +
  `<path d="M${x} ${y - h * 0.4}l-10 -8M${x} ${y - h * 0.65}l10 -8M${x} ${y - h * 0.85}l-8 -6" stroke="#8cc152" stroke-width="3" stroke-linecap="round"/>` +
  `<path d="M${x} ${y - h}l-3 -8M${x} ${y - h}l3 -8M${x} ${y - h}v-8" stroke="#e9c46a" stroke-width="1.5"/>`

/** Child's head peeking above the corn, without the hat (`cap`); (x, y) = head center. Bounds: ±9. */
const childHead = (x: number, y: number, hair: string) =>
  `<circle cx="${x}" cy="${y}" r="8" fill="#f2d29b"/><path d="M${x - 8} ${y - 2}q8 -8 16 0v-3q-8 -6 -16 0Z" fill="${hair}"/>` +
  `<circle cx="${x - 3}" cy="${y}" r="1.1" fill="#222"/><circle cx="${x + 3}" cy="${y}" r="1.1" fill="#222"/>`

/** Cap on a child's head at (x, y). Bounds: x from −10 to +14, y from −12 to −4. */
const cap = (x: number, y: number, color: string) =>
  `<path d="M${x - 9} ${y - 5}a9 7 0 0 1 18 0Z" fill="${color}"/><rect x="${x + 6}" y="${y - 7}" width="8" height="3" rx="1.5" fill="${color}"/>`

/** Scarecrow on its pole; (x, y) = foot. Bounds: x ±40, y from −172 to 0. The hat's patch is separate. */
const scarecrow = (x: number, y: number) =>
  `<path d="M${x} ${y}V${y - 150}M${x - 38} ${y - 112}H${x + 38}" stroke="#8a5a33" stroke-width="5"/>` +
  `<path d="M${x - 22} ${y - 120}H${x + 22}L${x + 18} ${y - 80}H${x - 18}Z" fill="#3a86ff"/><path d="M${x - 40} ${y - 112}l6 8M${x + 40} ${y - 112}l-6 8" stroke="#e9c46a" stroke-width="3"/>` +
  `<circle cx="${x}" cy="${y - 134}" r="14" fill="#e9dcc4"/><circle cx="${x - 5}" cy="${y - 136}" r="2" fill="#3d3d3d"/><circle cx="${x + 5}" cy="${y - 136}" r="2" fill="#3d3d3d"/>` +
  `<path d="M${x - 5} ${y - 128}q5 3 10 0" stroke="#3d3d3d" stroke-width="1.5" fill="none"/>` +
  `<path d="M${x - 22} ${y - 146}H${x + 22}L${x + 12} ${y - 150}V${y - 168}H${x - 12}V${y - 150}Z" fill="#7a5230"/>`

/** Child sitting on the wagon, arm up or down; (x, y) = seat. Bounds: x ±10, y from −40 to 0 (arm up: −52). */
const rider = (x: number, y: number, shirt: string) =>
  `<path d="M${x - 7} ${y - 26}h14l2 22h-18Z" fill="${shirt}"/><circle cx="${x}" cy="${y - 32}" r="7" fill="#f2d29b"/>` +
  `<path d="M${x - 7} ${y - 34}q7 -7 14 0v-2q-7 -5 -14 0Z" fill="#5a3d2b"/><circle cx="${x + 3}" cy="${y - 32}" r="1" fill="#222"/>`
const riderArm = (x: number, y: number, up: boolean, shirt: string) =>
  `<path d="M${x + 6} ${y - 24}${up ? 'l6 -16' : 'l6 12'}" stroke="${shirt}" stroke-width="4" stroke-linecap="round"/>`

/** Pony grazing, without its tail (`ponyTail`), faces right; (x, y) = feet. Bounds: x from −30 to +44, y from −48 to 0. */
const pony = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-20 -20V0M-10 -20V0M14 -20V0M22 -20V0" stroke="#8a5a33" stroke-width="5"/>` +
  `<ellipse cy="-30" rx="30" ry="15" fill="#a0703f"/><path d="M20 -38L36 -14L44 -10L40 -4L28 -10L14 -26Z" fill="#a0703f"/>` +
  `<path d="M18 -42Q30 -30 38 -16" stroke="#3d2a1a" stroke-width="5" fill="none"/><circle cx="36" cy="-12" r="1.6" fill="#222"/></g>`
const ponyTail = (x: number, y: number) =>
  `<path d="M${x - 30} ${y - 36}Q${x - 40} ${y - 24} ${x - 36} ${y - 12}" stroke="#3d2a1a" stroke-width="6" fill="none" stroke-linecap="round"/>`

/** Pumpkin; (x, y) = bottom center. Bounds: x ±16, y from −26 to 0. */
const pumpkin = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><path d="M0 -18q1 -6 5 -8" stroke="#5c7a2a" stroke-width="3" fill="none"/>` +
  `<ellipse cx="-7" cy="-9" rx="9" ry="9" fill="${color}"/><ellipse cx="7" cy="-9" rx="9" ry="9" fill="${color}"/><ellipse cy="-9" rx="7" ry="10" fill="${color}"/>` +
  `<path d="M-4 -16v14M4 -16v14" stroke="#000" stroke-opacity="0.12" stroke-width="1.5"/></g>`

/** Popcorn cart; (x, y) = ground center. Bounds: x ±44, y from −92 to 0. */
const popcornCart = (x: number, y: number) =>
  `<path d="M${x - 44} ${y - 70}L${x} ${y - 92}L${x + 44} ${y - 70}Z" fill="#e63946"/>` +
  `<path d="M${x - 36} ${y - 70}V${y - 60}M${x + 36} ${y - 70}V${y - 60}" stroke="#c9d1d9" stroke-width="3"/>` +
  `<rect x="${x - 40}" y="${y - 60}" width="80" height="44" fill="#ffffff"/>` +
  [-30, -10, 10, 30].map((d) => `<rect x="${x + d - 5}" y="${y - 60}" width="10" height="44" fill="#e63946"/>`).join('') +
  `<rect x="${x - 22}" y="${y - 54}" width="44" height="22" fill="#fff8d6" stroke="#c9d1d9" stroke-width="2"/>` +
  `<g fill="#ffd23f"><circle cx="${x - 12}" cy="${y - 38}" r="5"/><circle cx="${x - 2}" cy="${y - 40}" r="5"/><circle cx="${x + 8}" cy="${y - 37}" r="5"/><circle cx="${x + 14}" cy="${y - 44}" r="4"/></g>` +
  `<circle cx="${x - 26}" cy="${y - 8}" r="8" fill="#2b2b2b"/><circle cx="${x + 26}" cy="${y - 8}" r="8" fill="#2b2b2b"/>`

export default svgLevel({
  id: 157,
  chapter: 'farm',
  title: 'cornMaze',
  parTimeSec: 88,
  scene: ({ diff, anim, rand, extra }) => {
    let corn = ''
    for (let x = 4; x < 800; x += 13) if (x < 356 || x > 444) corn += stalk(x, 330, 104 + rand() * 18)
    const puff = `<circle cx="622" cy="342" r="7" fill="#c9d1d9" fill-opacity="0.9"/><circle cx="630" cy="332" r="5" fill="#c9d1d9" fill-opacity="0.8"/>`
    const puffing = anim({ type: 'bob', dx: 4, dy: -6, period: 1.8 }, puff)
    return (
      `<rect width="800" height="500" fill="#ffd9a8"/><rect width="800" height="160" fill="#ffe8c8"/>` +
      `<circle cx="110" cy="80" r="40" fill="#ff9f1c"/><circle cx="110" cy="80" r="54" fill="#ff9f1c" fill-opacity="0.2"/>` +
      `<path d="M0 230Q200 200 400 220T800 214V340H0Z" fill="#c9b36a"/><rect y="214" width="800" height="116" fill="#6f9a3f"/>` +
      // Lookout tower behind the corn, with its pennant and the watcher
      lookout(670, 330) +
      diff(680, 44, 22, anim({ type: 'sway', angle: 16, pivot: [670, 44], period: 1.2 }, pennant(670, 44)), pennant(670, 44)) +
      diff(640, 113, 28, `<g transform="translate(640 138) scale(0.8)">${person(0, 0, '#8338ec')}<rect x="6" y="-58" width="10" height="6" rx="2" fill="#2b2b2b"/></g>`, '') +
      corn +
      // Children in the maze, crows on the stalks, the scarecrow
      childHead(180, 214, '#5a3d2b') + diff(180, 206, 22, cap(180, 214, '#e63946'), cap(180, 214, '#3a86ff')) +
      childHead(286, 220, '#e9c46a') + cap(286, 220, '#8ac926') +
      bird(98, 206, '#222') + diff(540, 200, 22, bird(540, 210, '#222'), '') +
      scarecrow(60, 330) + diff(60, 170, 22, `<rect x="54" y="166" width="10" height="8" fill="#e63946"/><path d="M54 166l10 8" stroke="#ffd23f" stroke-width="1"/>`, `<rect x="54" y="166" width="10" height="8" fill="#3a86ff"/><path d="M54 166l10 8" stroke="#ffd23f" stroke-width="1"/>`) +
      // Entrance arch
      `<path d="M362 330V214M438 330V214" stroke="#8a5a33" stroke-width="7"/><path d="M354 224Q400 194 446 224" stroke="#8a5a33" stroke-width="8" fill="none"/>` +
      `<rect x="378" y="218" width="44" height="16" rx="3" fill="#a0703f"/><path d="M386 226h28" stroke="#ffd23f" stroke-width="3"/>` +
      diff(400, 206, 22, `<g fill="#ffc300">${[0, 60, 120, 180, 240, 300].map((a) => `<ellipse cx="400" cy="200" rx="3.5" ry="6" transform="rotate(${a} 400 206)"/>`).join('')}</g><circle cx="400" cy="206" r="5" fill="#6b3f1d"/>`, '') +
      // Ground, the hay wagon ride and its tractor
      `<rect y="330" width="800" height="170" fill="#9ccf6a"/><path d="M0 382H800V440H0Z" fill="#d6c49a"/>` +
      `<rect x="296" y="384" width="206" height="20" fill="#c0392b"/><path d="M296 394H502" stroke="#8e2c27" stroke-width="2"/>` +
      `<rect x="306" y="372" width="60" height="12" fill="#f2c14e"/><rect x="390" y="372" width="60" height="12" fill="#f2c14e"/>` +
      rider(336, 384, '#ffb703') + diff(350, 360, 22, riderArm(336, 384, true, '#ffb703'), riderArm(336, 384, false, '#ffb703')) +
      rider(420, 384, '#3a86ff') + riderArm(420, 384, false, '#3a86ff') +
      `<path d="M494 384V352" stroke="#8a5a33" stroke-width="3"/>` +
      diff(494, 362, 22, `<rect x="488" y="354" width="12" height="16" rx="2" fill="#ffd166" stroke="#3d4a55" stroke-width="2"/>`, '') +
      `<circle cx="330" cy="414" r="14" fill="#2b2b2b"/><circle cx="330" cy="414" r="5" fill="#8d99ae"/><circle cx="468" cy="414" r="14" fill="#2b2b2b"/><circle cx="468" cy="414" r="5" fill="#8d99ae"/>` +
      `<path d="M502 398H526" stroke="#3d4a55" stroke-width="4"/>` +
      tractor(584, 430, '#3f8f3a') + diff(624, 338, 26, puff, puffing) +
      // Pony, pumpkins, popcorn cart with its balloon
      diff(97, 452, 22, ponyTail(130, 476), anim({ type: 'sway', angle: 18, pivot: [100, 440], period: 1.5 }, ponyTail(130, 476))) +
      pony(130, 476) +
      pumpkin(214, 494, '#e8772e') + pumpkin(246, 494, '#e8772e') + diff(230, 458, 24, pumpkin(230, 474, '#e8772e'), pumpkin(230, 474, '#f4f1e8')) +
      popcornCart(716, 494) + person(660, 496, '#ff006e', false, '#c68b5e', '#2b2b2b') +
      `<path d="M744 424Q750 410 750 400" stroke="#777" stroke-width="1.5" fill="none"/>` +
      diff(750, 388, 22, `<ellipse cx="750" cy="386" rx="11" ry="14" fill="#8ac926"/><path d="M747 399h6l-3 4Z" fill="#8ac926"/>`, '') +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['flower', 300, 484, '#ff6b8b'],
        ['stones', 470, 486],
        ['horseshoe', 40, 482],
        ['bee', 560, 470],
        ['chick', 600, 474],
      ])
    )
  },
})
