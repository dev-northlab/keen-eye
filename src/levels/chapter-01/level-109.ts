// Motion differences: the fish leaps only on picture B; the last duckling bobs faster on B.
import { person } from '../chapter-02/shapes.ts'
import { frog, pine } from '../chapter-03/shapes.ts'
import { fish } from '../chapter-04/shapes.ts'
import { svgLevel } from '../helpers.ts'
import { cloud, duck, flower, FLOWER_COLORS, grass, pick, sun } from '../shapes.ts'

/** Mill wheel with 8 paddles around (x, y), radius r. */
const millWheel = (x: number, y: number, r: number) => {
  let s = `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#6b4226" stroke-width="8"/><circle cx="${x}" cy="${y}" r="${r * 0.6}" fill="none" stroke="#6b4226" stroke-width="4"/>`
  for (let a = 0; a < 360; a += 45) {
    s += `<path d="M${x} ${y}h${r}" stroke="#8a5a33" stroke-width="4" transform="rotate(${a} ${x} ${y})"/>`
    s += `<rect x="${x + r - 4}" y="${y - 10}" width="14" height="20" fill="#a0703f" transform="rotate(${a} ${x} ${y})"/>`
  }
  return s + `<circle cx="${x}" cy="${y}" r="9" fill="#3d2818"/>`
}

/** Cattail; (x, y) = foot, `top` = whether the brown head is there. Bounds: x ±6, y from −62 to 0. */
const cattail = (x: number, y: number, top = true) =>
  `<path d="M${x} ${y}V${y - 46}" stroke="#4c7a2f" stroke-width="3"/>` + (top ? `<rect x="${x - 4}" y="${y - 62}" width="8" height="20" rx="4" fill="#7a4a2a"/>` : '')

/** Lily pad; (x, y) = center, radius r. */
const lily = (x: number, y: number, r: number) =>
  `<path d="M${x} ${y}L${x + r} ${y - r * 0.15}A${r} ${r * 0.45} 0 1 0 ${x + r} ${y + r * 0.15}Z" fill="#3f9a5a"/>`

/** Duckling, faces right; (x, y) = waterline. Bounds: x ±10, y from −14 to +2. */
const duckling = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-4" rx="9" ry="5" fill="#ffd43b"/><circle cx="5" cy="-10" r="4.5" fill="#ffd43b"/>` +
  `<path d="M9 -10l4 1.5l-4 1.5Z" fill="#ff922b"/><circle cx="6" cy="-11" r="0.9" fill="#222"/></g>`

/** Flour sack; (x, y) = bottom center. Bounds: x ±16, y from −30 to 0. */
const sack = (x: number, y: number) =>
  `<path d="M${x - 15} ${y}q-3 -16 4 -26l-2 -4h26l-2 4q7 10 4 26Z" fill="#f4f1e8"/><path d="M${x - 8} ${y - 26}h16" stroke="#c9c1ad" stroke-width="2"/>` +
  `<path d="M${x - 5} ${y - 14}l5 -5l5 5l-5 5Z" fill="#e9c46a"/>`

/** Signpost board pointing right; (x, y) = board center. Bounds: x ±22, y ±8. */
const board = (x: number, y: number) =>
  `<path d="M${x - 20} ${y - 7}h32l8 7l-8 7h-32Z" fill="#d9a46b" stroke="#8a5a33" stroke-width="2"/><path d="M${x - 14} ${y}h20" stroke="#8a5a33" stroke-width="2"/>`

/** Bridge railing section from x0 to x0 + 40 with `n` balusters, deck at y. */
const railing = (x0: number, y: number, n: number) => {
  let s = ''
  for (let i = 0; i < n; i++) s += `<rect x="${x0 + 2 + (i * 32) / (n - 1)}" y="${y - 26}" width="4" height="26" fill="#a0703f"/>`
  return s
}

export default svgLevel({
  id: 109,
  chapter: 'farm',
  title: 'creekMill',
  parTimeSec: 75,
  hintLimit: 2,
  scene: ({ diff, anim, rand }) => {
    let stones = ''
    for (let y = 252; y < 380; y += 16)
      for (let x = 122 + ((y / 16) % 2) * 14; x < 318; x += 28) stones += `<rect x="${x}" y="${y}" width="24" height="13" rx="5" fill="${rand() < 0.5 ? '#a9a39a' : '#bdb7ad'}"/>`
    let ripples = ''
    for (let i = 0; i < 22; i++) {
      const x = rand() * 760
      const y = 418 + rand() * 66
      ripples += `<path d="M${x} ${y}q8 -4 16 0" stroke="#e3f6fd" stroke-width="2" fill="none"/>`
    }
    let rails = ''
    for (let x = 486; x < 720; x += 40) if (x !== 606) rails += railing(x, 372, 3)
    let tufts = ''
    for (let i = 0; i < 12; i++) tufts += grass(rand() * 800, 384 + rand() * 20)
    let flowers = ''
    for (let i = 0; i < 6; i++) flowers += flower(560 + i * 40 + rand() * 10, 404, pick(rand, FLOWER_COLORS))
    const bobbing = (period: number) => anim({ type: 'bob', dx: 0, dy: -3, period }, duckling(568, 462))
    const leap = fish(742, 440, '#e9a23b', 1.2)

    return (
      `<rect width="800" height="500" fill="#cbe9fb"/>` +
      sun(600, 70) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 28 }, cloud(420, 60, 0.6)) +
      `<path d="M120 80q5 -6 10 0q5 -6 10 0M150 60q4 -5 8 0q4 -5 8 0" stroke="#5a6a7a" stroke-width="2" fill="none"/>` +
      `<path d="M0 260Q200 170 420 230T800 200V400H0Z" fill="#b7dc8f"/>` +
      pine(700, 330, 1.1) + pine(752, 320, 0.9, '#2a6e4a') + pine(790, 336, 1, '#337f57') + pine(650, 330, 0.8, '#3a8a5e') +
      `<rect y="330" width="800" height="90" fill="#9fd06e"/>` + tufts +
      // Mill
      `<rect x="120" y="250" width="200" height="132" fill="#9a948a"/>` + stones +
      `<rect x="130" y="166" width="180" height="86" fill="#e9d3a7"/><path d="M130 166l180 86M310 166l-180 86M220 166v86" stroke="#8a5a33" stroke-width="5"/>` +
      `<path d="M110 170L220 92L330 170Z" fill="#8c3a2b"/><path d="M150 142h140M180 120h80" stroke="#6e2c20" stroke-width="2"/>` +
      `<rect x="160" y="190" width="24" height="26" fill="#bfe3f0" stroke="#6b4226" stroke-width="3"/><rect x="256" y="190" width="24" height="26" fill="#bfe3f0" stroke="#6b4226" stroke-width="3"/>` +
      diff(152, 203, 22, `<rect x="146" y="189" width="12" height="28" fill="#3a86ff"/>`, `<rect x="146" y="189" width="12" height="28" fill="#4f78d6"/>`) +
      `<rect x="186" y="189" width="12" height="28" fill="#3a86ff"/><rect x="242" y="189" width="12" height="28" fill="#3a86ff"/><rect x="282" y="189" width="12" height="28" fill="#3a86ff"/>` +
      `<path d="M196 382v-40a24 24 0 0 1 48 0v40Z" fill="#6b4226"/><circle cx="236" cy="360" r="2.5" fill="#f2c14e"/>` +
      person(274, 384, '#f4f1e8') +
      `<circle cx="210" cy="124" r="10" fill="#bfe3f0" stroke="#6b4226" stroke-width="3"/>` +
      // Chute and wheel
      `<path d="M300 236h120v12h-120Z" fill="#8a5a33"/><path d="M412 248q8 30 -2 70" stroke="#7cc4e4" stroke-width="10" stroke-opacity="0.8" fill="none"/>` +
      anim({ type: 'rotate', pivot: [376, 322], period: 8 }, millWheel(376, 322, 58)) +
      // Creek
      `<rect y="410" width="800" height="90" fill="#6cc0e0"/>` + ripples +
      `<path d="M0 410q200 -10 400 0t400 0" stroke="#4fa8cc" stroke-width="4" fill="none"/>` +
      `<g fill="#9a948a"><ellipse cx="110" cy="486" rx="20" ry="8"/><ellipse cx="430" cy="490" rx="16" ry="6"/><ellipse cx="660" cy="488" rx="22" ry="8"/></g>` +
      `<rect y="494" width="800" height="6" fill="#9fd06e"/>` +
      cattail(26, 470) + cattail(44, 466) + diff(64, 418, 22, cattail(64, 470), cattail(64, 470, false)) + cattail(84, 472) + cattail(104, 468) +
      // Lily pads, frog
      lily(198, 466, 18) + lily(262, 458, 18) +
      diff(262, 450, 22, '', frog(262, 458)) +
      diff(330, 470, 22, lily(330, 470, 16), lily(330, 470, 20)) +
      `<circle cx="206" cy="460" r="5" fill="#ff8fab"/><circle cx="206" cy="460" r="2" fill="#ffd166"/>` +
      flowers +
      // Bridge with a signpost
      `<path d="M470 420Q600 350 730 420" stroke="#8a5a33" stroke-width="12" fill="none"/>` +
      `<path d="M470 410Q600 340 730 410" stroke="#a0703f" stroke-width="6" fill="none"/>` +
      `<path d="M480 372H722" stroke="#a0703f" stroke-width="5"/>` + rails +
      diff(626, 359, 26, railing(606, 372, 3), railing(606, 372, 4)) +
      `<path d="M454 404V346" stroke="#8a5a33" stroke-width="5"/>` +
      diff(456, 356, 24, board(456, 356), `<g transform="rotate(-15 452 356)">${board(456, 356)}</g>`) +
      // Water birds and the fish
      duck(500, 470) + duckling(540, 464) +
      diff(568, 456, 22, bobbing(1.4), bobbing(0.6)) +
      diff(740, 436, 28, leap, anim({ type: 'bob', dx: 0, dy: -10, period: 1.8 }, leap)) +
      diff(152, 394, 28, sack(146, 410), sack(158, 410)) + sack(110, 412) +
      `<path d="M330 404l20 -8M326 412l26 -6" stroke="#8a5a33" stroke-width="3"/>`
    )
  },
})
