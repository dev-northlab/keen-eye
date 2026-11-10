// Goat hill: a mountain farm among the farm's ten hardest (hidden until released, levels/upcoming.ts). New on the
// farm: goats and a goat kid, a marmot, an eagle, a stone well, a cheese bench, a mountain house with a balcony,
// a water wheel and a shepherd. Motion differences: the eagle circles only on picture A; the kid hops and the
// water wheel turns only on B.
import { pine, rock } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bucket, cloud, flower, FLOWER_COLORS, hen, pick } from '../shapes.ts'

/** Goat without horns (`horns`), faces right; (x, y) = feet. Bounds: x from −30 to +36, y from −52 to 0. */
const goat = (x: number, y: number, coat: string, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<path d="M-16 -18V0M-8 -18V0M10 -18V0M17 -18V0" stroke="#4a3a2a" stroke-width="4"/>` +
  `<path d="M-24 -32l-6 -6" stroke="${coat}" stroke-width="4" stroke-linecap="round"/>` +
  `<ellipse cy="-28" rx="25" ry="13" fill="${coat}"/><path d="M14 -34L22 -46L30 -40L22 -26Z" fill="${coat}"/>` +
  `<ellipse cx="27" cy="-44" rx="9" ry="7" fill="${coat}"/><path d="M33 -40q2 8 -2 10" stroke="#8d8d8d" stroke-width="3" fill="none"/>` +
  `<path d="M20 -48l-8 -2l6 6Z" fill="${coat}"/><circle cx="29" cy="-46" r="1.6" fill="#222"/></g>`

/** A goat's horns at (x, y), curved back or straight up. Bounds: x from +12 to +30, y from −66 to −48. */
const horns = (x: number, y: number, curved: boolean) =>
  curved
    ? `<path d="M${x + 22} ${y - 50}q-2 -12 -10 -14M${x + 27} ${y - 50}q0 -12 -8 -15" stroke="#8a7a62" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
    : `<path d="M${x + 22} ${y - 50}l-1 -14M${x + 27} ${y - 50}l1 -14" stroke="#8a7a62" stroke-width="3.5" fill="none" stroke-linecap="round"/>`

/** Marmot standing up; (x, y) = feet. Bounds: x ±10, y from −36 to 0. */
const marmot = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-14" rx="9" ry="13" fill="#a0703f"/><ellipse cy="-11" rx="5" ry="8" fill="#e0c39a"/>` +
  `<circle cy="-29" r="7" fill="#a0703f"/><circle cx="-5" cy="-34" r="2.2" fill="#7a5230"/><circle cx="5" cy="-34" r="2.2" fill="#7a5230"/>` +
  `<ellipse cy="-26" rx="3.5" ry="2.5" fill="#e0c39a"/><circle cx="-2.5" cy="-30" r="1.2" fill="#222"/><circle cx="2.5" cy="-30" r="1.2" fill="#222"/>` +
  `<path d="M-6 -19l4 2M6 -19l-4 2" stroke="#7a5230" stroke-width="2.5" stroke-linecap="round"/></g>`

/** Eagle gliding; (x, y) = body center. Bounds: x ±24, y from −8 to +6. */
const eagle = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M0 0Q-12 -10 -24 -4Q-12 -4 -4 4ZM0 0Q12 -10 24 -4Q12 -4 4 4Z" fill="#5e3b1a"/>` +
  `<ellipse rx="5" ry="4" fill="#5e3b1a"/><circle cx="0" cy="-3" r="3" fill="#f4f1e8"/><path d="M0 -1l2 3h-4Z" fill="#ffb703"/></g>`

/** Stone well with a roof and its winch axle (no crank: `crank`); (x, y) = ground center. Bounds: x ±38, y from −110 to 0. */
const well = (x: number, y: number) =>
  `<rect x="${x - 26}" y="${y - 82}" width="5" height="50" fill="#7a5230"/><rect x="${x + 21}" y="${y - 82}" width="5" height="50" fill="#7a5230"/>` +
  `<path d="M${x - 38} ${y - 78}L${x} ${y - 100}L${x + 38} ${y - 78}Z" fill="#8e2c27"/>` +
  `<rect x="${x - 24}" y="${y - 70}" width="48" height="5" rx="2" fill="#5a3d1e"/><path d="M${x} ${y - 66}V${y - 42}" stroke="#8a7a62" stroke-width="1.5"/>` +
  `<rect x="${x - 30}" y="${y - 40}" width="60" height="40" rx="6" fill="#a8a29a"/>` +
  `<path d="M${x - 30} ${y - 26}H${x + 30}M${x - 30} ${y - 13}H${x + 30}M${x - 14} ${y - 40}V${y - 26}M${x + 10} ${y - 40}V${y - 26}M${x - 2} ${y - 26}V${y - 13}M${x - 20} ${y - 13}V${y}M${x + 18} ${y - 13}V${y}" stroke="#8a847c" stroke-width="2"/>` +
  `<rect x="${x - 32}" y="${y - 44}" width="64" height="6" rx="3" fill="#8a847c"/>`

/** The well's crank on its right post, at the axle (x, y); handle down or up. Bounds: x from 0 to +14, y ±14. */
const crank = (x: number, y: number, down: boolean) =>
  `<path d="M${x} ${y}h10v${down ? 12 : -12}" stroke="#3d4a55" stroke-width="3" fill="none" stroke-linecap="round"/>` +
  `<rect x="${x + 7}" y="${down ? y + 8 : y - 14}" width="6" height="6" rx="2" fill="#7a5230"/>`

/** Cheese wheel; (x, y) = center. Bounds: x ±12, y ±8. */
const cheese = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="12" ry="8" fill="#e9b949"/><ellipse cx="${x}" cy="${y - 2}" rx="10" ry="5" fill="#f6d36b"/>`

/** Mountain house: stone ground floor, timber upper floor, balcony; no chimney cap or flower box. (x, y) = bottom left, 200 wide. Bounds: y from −200 to 0. */
const mountainHouse = (x: number, y: number) => {
  let stones = ''
  for (let i = 0; i < 14; i++) stones += `<ellipse cx="${x + 12 + ((i * 37) % 180)}" cy="${y - 12 - ((i * 23) % 56)}" rx="9" ry="5" fill="#a39b8e"/>`
  const win = (cx: number, cy: number) =>
    `<rect x="${cx - 12}" y="${cy - 14}" width="24" height="28" fill="#bde3f2" stroke="#5e3b1a" stroke-width="3"/>` +
    `<rect x="${cx - 22}" y="${cy - 14}" width="9" height="28" fill="#2f7d55"/><rect x="${cx + 13}" y="${cy - 14}" width="9" height="28" fill="#2f7d55"/>`
  return (
    `<rect x="${x + 142}" y="${y - 196}" width="16" height="36" fill="#9a9288"/>` +
    `<rect x="${x}" y="${y - 70}" width="200" height="70" fill="#b9b2a6"/>${stones}` +
    `<rect x="${x + 6}" y="${y - 140}" width="188" height="70" fill="#a0703f"/><path d="M${x + 6} ${y - 116}H${x + 194}M${x + 6} ${y - 93}H${x + 194}" stroke="#8a5a33" stroke-width="2"/>` +
    win(x + 40, y - 112) + win(x + 160, y - 112) + win(x + 40, y - 36) + win(x + 160, y - 36) +
    `<rect x="${x + 84}" y="${y - 56}" width="32" height="56" rx="3" fill="#6b4a2b"/><circle cx="${x + 110}" cy="${y - 28}" r="2.5" fill="#ffd23f"/>` +
    `<rect x="${x + 64}" y="${y - 140}" width="72" height="56" fill="#8a5a33"/><rect x="${x + 86}" y="${y - 136}" width="28" height="44" fill="#6b4a2b"/>` +
    `<rect x="${x + 56}" y="${y - 84}" width="88" height="5" fill="#5e3b1a"/><path d="M${x + 62} ${y - 84}v-18M${x + 76} ${y - 84}v-18M${x + 90} ${y - 84}v-18M${x + 110} ${y - 84}v-18M${x + 124} ${y - 84}v-18M${x + 138} ${y - 84}v-18" stroke="#5e3b1a" stroke-width="3"/>` +
    `<rect x="${x + 56}" y="${y - 104}" width="88" height="4" fill="#5e3b1a"/>` +
    `<path d="M${x - 12} ${y - 136}L${x + 100} ${y - 196}L${x + 212} ${y - 136}Z" fill="#6b4a2b"/><path d="M${x - 12} ${y - 136}L${x + 100} ${y - 196}L${x + 212} ${y - 136}" stroke="#4a2f17" stroke-width="4" fill="none"/>`
  )
}

/** Water wheel; (x, y) = hub. Bounds: radius 26. */
const waterWheel = (x: number, y: number) => {
  let paddles = ''
  for (let a = 0; a < 360; a += 45) paddles += `<rect x="18" y="-4" width="8" height="8" fill="#7a5230" transform="rotate(${a})"/><path d="M0 0H20" stroke="#8a5a33" stroke-width="3" transform="rotate(${a})"/>`
  return `<g transform="translate(${x} ${y})"><circle r="19" fill="none" stroke="#5e3b1a" stroke-width="4"/>${paddles}<circle r="4" fill="#5e3b1a"/></g>`
}

/** Shepherd with a crook and a felt hat, faces right; (x, y) = feet. Bounds: x from −14 to +24, y from −74 to 0. */
const shepherd = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M18 0V-58q0 -8 6 -8" stroke="#8a5a33" stroke-width="3" fill="none" stroke-linecap="round"/>` +
  `<rect x="-8" y="-24" width="7" height="24" fill="#3d4a55"/><rect x="2" y="-24" width="7" height="24" fill="#3d4a55"/>` +
  `<path d="M-11 -48h22l3 26h-28Z" fill="#c0392b"/><path d="M11 -44l7 6" stroke="#c0392b" stroke-width="5" stroke-linecap="round"/>` +
  `<circle cy="-54" r="8" fill="#f2d29b"/><path d="M-13 -58h26l-5 -4v-6h-16v6Z" fill="#2f7d55"/><circle cx="3" cy="-54" r="1.2" fill="#222"/></g>`

export default svgLevel({
  id: 152,
  chapter: 'farm',
  title: 'goatHill',
  parTimeSec: 78,
  scene: ({ diff, anim, rand, extra }) => {
    const soaring = anim({ id: 'eagle', type: 'path', points: [[0, 0], [60, 20], [120, 0], [60, -20]], period: 10 }, eagle(300, 70))
    const hopping = anim({ type: 'bob', dx: 0, dy: -10, period: 1.4 }, goat(252, 382, '#f4f1e8', 0.6))
    const turning = anim({ type: 'rotate', pivot: [728, 318], period: 6 }, waterWheel(728, 318))
    let flowers = ''
    for (const [x, y] of [[30, 470], [160, 488], [380, 486], [520, 494], [690, 470]]) flowers += flower(x, y, pick(rand, FLOWER_COLORS))
    return (
      `<rect width="800" height="500" fill="#cfe9f7"/>` +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(520, 50, 0.6)) +
      `<path d="M0 270L130 60L260 230L380 110L520 270Z" fill="#8d99ae"/><path d="M480 270L640 90L800 230V270Z" fill="#9aa5b1"/>` +
      `<path d="M380 110L362 140L372 136L380 146L390 134L398 140Z" fill="#ffffff"/><path d="M640 90L620 120L632 116L640 126L650 114L660 122Z" fill="#ffffff"/>` +
      diff(131, 80, 26, `<path d="M130 60L112 92L122 88L130 98L140 86L150 94Z" fill="#ffffff"/>`, '') +
      diff(300, 70, 26, soaring, eagle(300, 70), 'eagle') +
      `<path d="M0 300Q200 236 400 280T800 250V500H0Z" fill="#8fcf6a"/>` +
      pine(20, 300, 0.7) + pine(470, 286, 0.6) + pine(785, 262, 0.55) +
      // Stream with the water wheel by the house
      `<path d="M800 300Q760 340 770 400T720 500H800Z" fill="#6cc3e8"/><path d="M790 330q-10 20 -4 40M776 420q-6 20 -18 40" stroke="#ffffff" stroke-width="2" fill="none"/>` +
      mountainHouse(500, 340) +
      `<path d="M642 150h16" stroke="#9a9288" stroke-width="2"/>` +
      diff(650, 146, 22, `<rect x="638" y="140" width="24" height="7" fill="#6c6359"/><rect x="646" y="134" width="8" height="6" fill="#6c6359"/>`, '') +
      anim({ type: 'bob', dx: 6, dy: -8, period: 4 }, `<circle cx="664" cy="114" r="8" fill="#ffffff" fill-opacity="0.6"/><circle cx="676" cy="98" r="11" fill="#ffffff" fill-opacity="0.5"/>`) +
      `<rect x="584" y="252" width="32" height="8" fill="#7a5230"/>` +
      diff(600, 250, 22, `<g fill="#e63946"><circle cx="589" cy="249" r="5"/><circle cx="600" cy="247" r="5"/><circle cx="611" cy="249" r="5"/></g>`, `<g fill="#3a86ff"><circle cx="589" cy="249" r="5"/><circle cx="600" cy="247" r="5"/><circle cx="611" cy="249" r="5"/></g>`) +
      diff(728, 318, 26, waterWheel(728, 318), turning) +
      // Rocks: the goat, the kid and the marmot
      `<path d="M30 384Q40 330 100 326Q160 330 172 384Z" fill="#9aa5ad"/><path d="M60 350q20 -10 40 -6" stroke="#b4bec5" stroke-width="4" fill="none"/>` +
      goat(100, 330, '#d9cbb5') + diff(120, 274, 22, horns(100, 330, true), horns(100, 330, false)) +
      `<path d="M214 410Q222 378 252 378Q284 380 292 410Z" fill="#9aa5ad"/>` +
      diff(252, 366, 30, goat(252, 382, '#f4f1e8', 0.6), hopping) +
      rock(400, 340, 1.3) + diff(400, 302, 22, marmot(400, 322), '') +
      goat(190, 446, '#7d5230') + goat(60, 466, '#f4f1e8', 0.9) +
      // The well, its bucket on the grass, the cheese bench
      well(330, 450) + diff(368, 380, 22, crank(356, 380, true), crank(356, 380, false)) +
      diff(280, 437, 24, bucket(280, 452, '#8d99ae'), '') +
      `<rect x="400" y="440" width="84" height="6" rx="2" fill="#a0703f"/><path d="M406 446v24M478 446v24" stroke="#7a5230" stroke-width="4"/>` +
      cheese(418, 432) + cheese(442, 432) + diff(466, 432, 22, cheese(466, 432), '') +
      shepherd(588, 480) + hen(660, 470, true, '#c0532b') + flowers +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['stones', 230, 486],
        ['snail', 120, 478],
        ['butterfly', 530, 388, '#ffb703'],
        ['mushroom', 372, 484],
        ['ladybug', 730, 470],
      ])
    )
  },
})
