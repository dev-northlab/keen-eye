// Motion differences: a wasp by the basket hovers faster on picture B; a cherry pair swings only on B.
import { person } from '../chapter-02/shapes.ts'
import { bird, butterfly, hedgehog, mushroom, stump } from '../chapter-03/shapes.ts'
import { svgLevel } from '../helpers.ts'
import { apple, basket, cloud, grass, snail } from '../shapes.ts'

/** Tree crown of overlapping circles [cx, cy, r] with leaf flecks from `rand`. */
const crown = (circles: [number, number, number][], rand: () => number, dark: string, light: string) => {
  let s = circles.map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 2 ? dark : light}"/>`).join('')
  for (const [x, y, r] of circles)
    for (let i = 0; i < 5; i++) {
      const a = rand() * Math.PI * 2
      const d = rand() * r * 0.8
      s += `<ellipse cx="${(x + Math.cos(a) * d).toFixed(1)}" cy="${(y + Math.sin(a) * d).toFixed(1)}" rx="5" ry="3" fill="${dark}" transform="rotate(${(rand() * 180) | 0} ${(x + Math.cos(a) * d).toFixed(1)} ${(y + Math.sin(a) * d).toFixed(1)})"/>`
    }
  return s
}

/** Pear; (x, y) = center of the bottom bulb. Bounds: x ±9, y from −20 to +9. */
const pear = (x: number, y: number, color = '#c9d84a') =>
  `<path d="M${x} ${y - 14}v-6" stroke="#6b3f1d" stroke-width="2"/><circle cx="${x}" cy="${y}" r="9" fill="${color}"/><circle cx="${x}" cy="${y - 9}" r="6" fill="${color}"/>`

/** Cherry pair hanging from (x, y). Bounds: x ±10, y from 0 to +22. */
const cherries = (x: number, y: number) =>
  `<path d="M${x} ${y}q-6 8 -6 14M${x} ${y}q5 8 6 14" stroke="#4c7a2f" stroke-width="1.5" fill="none"/>` +
  `<circle cx="${x - 6}" cy="${y + 17}" r="5" fill="#c1121f"/><circle cx="${x + 6}" cy="${y + 17}" r="5" fill="#c1121f"/>`

/** Birdhouse; (x, y) = bottom center. Bounds: x ±13, y from −30 to 0. */
const birdhouse = (x: number, y: number) =>
  `<rect x="${x - 10}" y="${y - 20}" width="20" height="20" fill="#7aa6d6"/><path d="M${x - 13} ${y - 19}l13 -11l13 11Z" fill="#e05a47"/>` +
  `<circle cx="${x}" cy="${y - 10}" r="4" fill="#2b2b2b"/><path d="M${x - 2} ${y - 4}h4" stroke="#8a5a33" stroke-width="2"/>`

/** Fruit crate, 48 × 30; (x, y) = bottom center; `slats` horizontal slats on the front. */
const crate = (x: number, y: number, slats: number) => {
  let s = `<rect x="${x - 24}" y="${y - 30}" width="48" height="30" fill="#d9a46b"/>`
  for (let i = 1; i <= slats; i++) s += `<path d="M${x - 22} ${y - 30 + (30 * i) / (slats + 1)}h44" stroke="#a8743f" stroke-width="3"/>`
  return s + `<rect x="${x - 24}" y="${y - 30}" width="48" height="30" fill="none" stroke="#a8743f" stroke-width="3"/>`
}

/** Wasp; (x, y) = center. Bounds: x ±9, y from −8 to +5. */
const wasp = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cx="-2" cy="-5" rx="5" ry="3" fill="#fff" fill-opacity="0.8"/><ellipse cx="3" cy="-5" rx="5" ry="3" fill="#fff" fill-opacity="0.8"/>` +
  `<ellipse rx="8" ry="4" fill="#ffc300"/><path d="M-3 -4v8M1 -4v8" stroke="#222" stroke-width="2"/><circle cx="8" r="2.5" fill="#222"/></g>`

export default svgLevel({
  id: 108,
  chapter: 'farm',
  title: 'fruitGarden',
  parTimeSec: 75,
  scene: ({ diff, anim, rand }) => {
    let farTrees = ''
    for (let x = 20; x < 800; x += 46) farTrees += `<rect x="${x - 2}" y="226" width="4" height="14" fill="#8a6a4a"/><circle cx="${x}" cy="218" r="14" fill="#86c26a"/>`
    let tufts = ''
    for (let i = 0; i < 18; i++) tufts += grass(10 + rand() * 780, 360 + rand() * 135)
    const apples: [number, number][] = [[80, 180], [110, 140], [180, 222], [95, 232], [140, 212], [60, 244], [172, 128], [205, 186], [128, 254], [40, 200]]
    const pears: [number, number][] = [[380, 170], [430, 122], [400, 232], [492, 222], [350, 226], [446, 214], [414, 180], [378, 110]]
    const cherryPairs: [number, number][] = [[630, 170], [700, 120], [690, 200], [760, 210], [610, 236], [720, 248], [670, 150], [780, 176]]
    const swingingPair = (moving: boolean) => (moving ? anim({ type: 'sway', angle: 16, pivot: [650, 214], period: 1.5 }, cherries(650, 214)) : cherries(650, 214))
    const hovering = (period: number) => anim({ type: 'bob', dx: 5, dy: -4, period }, wasp(244, 400))

    return (
      `<rect width="800" height="500" fill="#d2f0ff"/>` +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(300, 50, 0.6)) +
      cloud(580, 40, 0.45) +
      `<path d="M0 236Q300 200 560 228T800 220V300H0Z" fill="#b7dc8f"/>` + farTrees +
      `<rect y="290" width="800" height="210" fill="#9fd06e"/>` + tufts +
      // Left apple tree
      `<rect x="118" y="230" width="24" height="170" rx="6" fill="#8a5a33"/><path d="M130 300q-30 -20 -40 -50M130 290q30 -20 44 -52" stroke="#8a5a33" stroke-width="8" fill="none"/>` +
      crown([[70, 210, 60], [190, 210, 60], [130, 150, 70], [100, 250, 50], [165, 250, 50]], rand, '#4c9a3f', '#5bb04a') +
      apples.map(([x, y]) => apple(x, y)).join('') +
      diff(150, 170, 22, apple(150, 172), '') +
      // Middle pear tree with a ladder and a picker
      `<rect x="408" y="230" width="24" height="170" rx="6" fill="#8a5a33"/>` +
      crown([[360, 200, 60], [480, 200, 60], [420, 140, 72], [390, 250, 50], [455, 250, 50]], rand, '#3f8f3a', '#56a84a') +
      pears.map(([x, y]) => pear(x, y)).join('') +
      diff(462, 176, 22, pear(462, 182), pear(462, 182, '#d9c43e')) +
      diff(418, 62, 24, bird(412, 72, '#e05a47'), bird(426, 72, '#e05a47')) +
      `<path d="M496 430L470 236M528 430L502 236" stroke="#c68b4e" stroke-width="5"/>` +
      [250, 280, 310, 340, 370, 400].map((y) => `<path d="M${470 + (y - 236) * 0.134} ${y}h32" stroke="#c68b4e" stroke-width="4"/>`).join('') +
      person(500, 352, '#e07a5f') +
      // Right cherry tree with a birdhouse
      `<rect x="678" y="230" width="24" height="170" rx="6" fill="#8a5a33"/>` +
      crown([[630, 200, 60], [750, 200, 60], [690, 140, 70], [660, 250, 50], [725, 250, 50]], rand, '#4c9a3f', '#64b552') +
      cherryPairs.map(([x, y]) => cherries(x, y)).join('') +
      diff(740, 160, 22, '', cherries(740, 150)) +
      diff(650, 226, 22, swingingPair(false), swingingPair(true)) +
      diff(690, 318, 24, birdhouse(690, 330), `<g transform="rotate(14 690 330)">${birdhouse(690, 330)}</g>`) +
      // Ground: crates, basket, wheelbarrow, fallen fruit and a hedgehog
      diff(70, 452, 24, crate(70, 468, 3), crate(70, 468, 2)) +
      crate(126, 468, 3) + crate(98, 438, 3) +
      `<g fill="#e63946"><circle cx="86" cy="408" r="7"/><circle cx="102" cy="404" r="7"/><circle cx="116" cy="408" r="7"/></g>` +
      basket(200, 470, '#e63946') +
      diff(244, 402, 22, hovering(1.5), hovering(0.6)) +
      diff(306, 466, 22, apple(306, 470), apple(306, 470).replace('r="10"', 'r="12"')) +
      `<path d="M340 440h76l-10 22h-56Z" fill="#7aa6d6"/><circle cx="356" cy="470" r="9" fill="#3d3d3d"/><path d="M416 444l26 -10" stroke="#6b4226" stroke-width="4"/>` +
      `<g fill="#c9d84a"><circle cx="358" cy="434" r="8"/><circle cx="374" cy="430" r="8"/><circle cx="390" cy="434" r="8"/><circle cx="404" cy="436" r="7"/></g>` +
      pear(560, 488, '#c9d84a') + apple(250, 488) +
      hedgehog(610, 470) + apple(626, 446) +
      `<rect x="700" y="436" width="80" height="8" fill="#a0703f"/><rect x="700" y="418" width="80" height="6" fill="#a0703f"/><path d="M708 444v24M772 444v24" stroke="#6b4226" stroke-width="5"/>` +
      bird(760, 418) +
      mushroom(500, 480) +
      snail(675, 490) +
      butterfly(580, 330) +
      stump(300, 395)
    )
  },
})
