// Motion differences: the pinwheel on the path spins the other way on picture B; the bee hovers faster on B.
import { bird } from '../chapter-03/shapes.ts'
import { svgLevel } from '../helpers.ts'
import { bee, cloud, fence, flower, FLOWER_COLORS, grass, pick, sun, sunflower } from '../shapes.ts'

/** Raised bed, wooden frame around soil; (x, y) = top-left corner, w × h. */
const bed = (x: number, y: number, w: number, h: number) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#c68b4e"/>` +
  `<rect x="${x + 6}" y="${y + 6}" width="${w - 12}" height="${h - 12}" rx="2" fill="#7a5038"/>`

/** Cabbage; (x, y) = center. Bounds: radius 14. */
const cabbage = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="14" fill="#7fbf5a"/><circle cx="${x}" cy="${y}" r="8" fill="#b5e08a"/>` +
  `<path d="M${x - 10} ${y - 6}q10 6 20 0" stroke="#5e9a42" stroke-width="1.5" fill="none"/>`

/** Carrot in the soil; (x, y) = soil line. Bounds: x ±8, y from −18 to +8. */
const carrot = (x: number, y: number) =>
  `<path d="M${x - 5} ${y}h10l-5 8Z" fill="#f28c28"/>` +
  `<path d="M${x} ${y}l-6 -16M${x} ${y}l0 -18M${x} ${y}l6 -16" stroke="#4c9a3f" stroke-width="2.5" stroke-linecap="round"/>`

/** Lettuce; (x, y) = center. Bounds: x ±13, y ±10. */
const lettuce = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="13" ry="10" fill="#a6dc6e"/><ellipse cx="${x - 4}" cy="${y - 2}" rx="6" ry="5" fill="#cdee9c"/>` +
  `<ellipse cx="${x + 5}" cy="${y + 1}" rx="5" ry="4" fill="#cdee9c"/>`

/** Beet; (x, y) = soil line. Bounds: x ±10, y from −18 to +8. */
const beet = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y + 2}" r="6" fill="#8e2b5a"/>` +
  `<path d="M${x} ${y - 2}q-10 -6 -8 -16q6 4 8 14M${x} ${y - 2}q10 -6 8 -16q-6 4 -8 14" fill="#5a9a3f" stroke="#8e2b5a" stroke-width="1"/>`

/** Pumpkin; (x, y) = center, rx × ry. */
const pumpkin = (x: number, y: number, rx: number, ry: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#f08c28"/>` +
  `<path d="M${x} ${y - ry}v${2 * ry}M${x - rx * 0.5} ${y - ry * 0.9}q-4 ${ry * 0.9} 0 ${ry * 1.8}M${x + rx * 0.5} ${y - ry * 0.9}q4 ${ry * 0.9} 0 ${ry * 1.8}" stroke="#d06b1a" stroke-width="1.5" fill="none"/>` +
  `<path d="M${x} ${y - ry}q2 -6 6 -7" stroke="#4c7a2f" stroke-width="3" fill="none"/>`

/** Tomato plant on a stake with three fruits; (x, y) = soil line; `colors` = the fruits. Bounds: x ±14, y from −50 to 0. */
const tomatoPlant = (x: number, y: number, colors: [string, string, string]) =>
  `<path d="M${x} ${y}V${y - 50}" stroke="#a0703f" stroke-width="3"/>` +
  `<path d="M${x} ${y - 8}q-14 -8 -12 -22q8 2 12 14M${x} ${y - 24}q14 -8 12 -22q-8 2 -12 14" fill="#4c9a3f"/>` +
  `<circle cx="${x - 7}" cy="${y - 14}" r="5" fill="${colors[0]}"/><circle cx="${x + 7}" cy="${y - 30}" r="5" fill="${colors[1]}"/>` +
  `<circle cx="${x - 4}" cy="${y - 40}" r="4.5" fill="${colors[2]}"/>`

/** Pinwheel blades around (x, y). Bounds: radius 16. */
const blades = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M0 0L0 -16L10 -6Z" fill="#e63946"/><path d="M0 0L16 0L6 10Z" fill="#3a86ff"/>` +
  `<path d="M0 0L0 16L-10 6Z" fill="#ffd23f"/><path d="M0 0L-16 0L-6 -10Z" fill="#8ac926"/><circle r="2.5" fill="#fff"/></g>`

/** Shovel standing in the soil, handle up; (x, y) = blade tip. Bounds: x ±7, y from −46 to 0. */
const shovel = (x: number, y: number) =>
  `<path d="M${x} ${y - 14}V${y - 42}" stroke="#a0703f" stroke-width="4"/><path d="M${x - 6} ${y - 44}h12" stroke="#a0703f" stroke-width="4" stroke-linecap="round"/>` +
  `<path d="M${x - 7} ${y - 16}h14v8l-7 8l-7 -8Z" fill="#9aa5b1"/>`

/** Scarecrow; (x, y) = foot of the pole. Bounds: x ±60, y from −150 to 0. */
const scarecrow = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M0 0V-120M-56 -98H56" stroke="#8a5a33" stroke-width="6"/>` +
  `<path d="M-30 -104h60l6 50h-72Z" fill="#3a86ff"/><path d="M-30 -86h60M-28 -70h58M-14 -104l-4 50M14 -104l4 50" stroke="#2a5fbf" stroke-width="2"/>` +
  `<path d="M-56 -98l-6 8M-56 -98l-8 2M56 -98l6 8M56 -98l8 2" stroke="#e9c46a" stroke-width="3"/>` +
  `<circle cy="-120" r="17" fill="#e9d3a7"/><circle cx="-6" cy="-122" r="2" fill="#333"/><circle cx="6" cy="-122" r="2" fill="#333"/>` +
  `<path d="M-6 -113q6 4 12 0" stroke="#333" stroke-width="1.5" fill="none"/>` +
  `<path d="M-26 -132h52l-4 -6h-44Z" fill="#8a5a33"/><rect x="-14" y="-152" width="28" height="16" rx="3" fill="#8a5a33"/></g>`

/** Watering can; (x, y) = bottom center. Bounds: x ±26, y from −24 to 0. */
const wateringCan = (x: number, y: number) =>
  `<path d="M${x - 14} ${y}v-20h28v20Z" fill="#2a9d8f"/><path d="M${x + 14} ${y - 6}l12 -14" stroke="#2a9d8f" stroke-width="4"/>` +
  `<path d="M${x - 14} ${y - 16}q-12 0 -10 10" stroke="#2a9d8f" stroke-width="3" fill="none"/><rect x="${x - 16}" y="${y - 22}" width="32" height="4" rx="2" fill="#21867a"/>`

export default svgLevel({
  id: 102,
  chapter: 'farm',
  title: 'vegetableBeds',
  parTimeSec: 100,
  scene: ({ diff, anim, rand }) => {
    let tufts = ''
    for (let i = 0; i < 10; i++) tufts += grass(10 + rand() * 780, 478 + rand() * 18)
    let flowers = ''
    for (let i = 0; i < 9; i++) flowers += flower(210 + i * 38 + rand() * 10, 494, pick(rand, FLOWER_COLORS))
    let cabbages = ''
    for (let x = 62; x < 360; x += 38) cabbages += cabbage(x, 250)
    let carrots = ''
    for (let x = 50; x < 360; x += 25) if (x !== 175) carrots += carrot(x, 345)
    let lettuces = ''
    for (let x = 458; x < 760; x += 36) lettuces += lettuce(x, 340)
    let beets = ''
    for (let x = 52; x < 360; x += 30) beets += beet(x, 434)
    const red = '#e63946'
    const spin = (reverse: boolean) => anim({ type: 'rotate', pivot: [400, 300], period: 3, reverse }, blades(400, 300))
    const hover = (period: number) => anim({ type: 'bob', dx: 4, dy: -5, period }, bee(520, 296))

    return (
      `<rect width="800" height="500" fill="#cfeefc"/>` +
      sun(720, 60) +
      anim({ type: 'path', points: [[0, 0], [70, 0]], period: 28 }, cloud(130, 60, 0.7)) +
      cloud(470, 45, 0.5) +
      `<path d="M560 70q5 -6 10 0q5 -6 10 0M590 90q4 -5 8 0q4 -5 8 0" stroke="#5a6a7a" stroke-width="2" fill="none"/>` +
      `<rect y="140" width="800" height="360" fill="#9fd06e"/>` +
      // Shed
      `<rect x="640" y="96" width="140" height="104" fill="#7aa6d6"/><path d="M626 100l84 -40l84 40Z" fill="#4a6f9a"/>` +
      `<rect x="660" y="130" width="40" height="70" fill="#4a6f9a"/><rect x="720" y="120" width="40" height="32" fill="#e9f6fb" stroke="#fff" stroke-width="3"/>` +
      `<path d="M740 120v32M720 136h40" stroke="#fff" stroke-width="2"/>` +
      `<path d="M716 164h56" stroke="#5a3d2b" stroke-width="3"/><path d="M724 164v26M744 164v22M764 164v24" stroke="#8d99ae" stroke-width="3"/>` +
      fence(0, 620, 150) +
      sunflower(40, 205, 90) + sunflower(84, 205, 110) + sunflower(128, 205, 96) + sunflower(560, 205, 88) +
      diff(270, 143, 22, bird(270, 150, '#c0392b'), bird(270, 150, '#c0392b', true)) +
      // Path and scarecrow
      `<rect x="372" y="200" width="56" height="300" fill="#e3cfa0"/>` +
      `<g fill="#cdb685"><circle cx="386" cy="236" r="3"/><circle cx="414" cy="270" r="2.5"/><circle cx="392" cy="372" r="3"/><circle cx="412" cy="420" r="2.5"/><circle cx="388" cy="466" r="3"/></g>` +
      scarecrow(400, 214) +
      `<path d="M400 300V340" stroke="#a0703f" stroke-width="3"/>` +
      diff(400, 300, 22, spin(false), spin(true)) +
      // Beds
      bed(30, 220, 340, 60) + bed(430, 220, 340, 60) + bed(30, 310, 340, 60) + bed(430, 310, 340, 60) + bed(30, 400, 340, 60) + bed(430, 400, 340, 60) +
      cabbages +
      tomatoPlant(470, 274, [red, red, red]) + tomatoPlant(526, 274, [red, red, red]) + tomatoPlant(582, 274, [red, red, red]) +
      diff(632, 252, 24, tomatoPlant(638, 274, [red, red, red]), tomatoPlant(638, 274, [red, '#f0723a', red])) +
      tomatoPlant(694, 274, [red, red, red]) + tomatoPlant(746, 274, [red, red, red]) +
      carrots +
      diff(175, 335, 22, carrot(175, 345), '') +
      lettuces +
      beets +
      diff(202, 416, 30, shovel(200, 440), `<g transform="rotate(16 200 440)">${shovel(200, 440)}</g>`) +
      pumpkin(470, 432, 16, 12) + pumpkin(535, 434, 18, 13) +
      diff(600, 432, 24, pumpkin(600, 432, 16, 12), pumpkin(600, 432, 19, 14)) +
      pumpkin(665, 434, 17, 12) + pumpkin(730, 432, 16, 12) +
      diff(520, 294, 22, hover(1.6), hover(0.7)) +
      // Front strip
      wateringCan(110, 492) + flowers +
      `<path d="M560 488q-30 -6 -24 -16q10 -10 30 -2q14 8 0 14q-14 6 -20 -2" stroke="#3a9a5a" stroke-width="4" fill="none"/>` +
      `<g transform="translate(720 494)"><ellipse cy="-12" rx="12" ry="10" fill="#d9d2c5"/><circle cx="10" cy="-22" r="7" fill="#d9d2c5"/>` +
      `<ellipse cx="8" cy="-34" rx="3" ry="9" fill="#d9d2c5"/><ellipse cx="14" cy="-33" rx="3" ry="9" fill="#d9d2c5"/><circle cx="13" cy="-23" r="1.5" fill="#222"/></g>` +
      tufts
    )
  },
})
