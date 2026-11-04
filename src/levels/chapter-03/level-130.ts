// Motion differences: the left owlet blinks only on picture B; the spider on its thread bobs faster on B.
import { svgLevel } from '../helpers.ts'
import { ladybug } from '../shapes.ts'
import { acorn, bird, feather, pineCone, squirrel } from './shapes.ts'

/** Owl eyes; (x, y) = between them. Bounds: x ±20, y ±10. */
const owlEyes = (x: number, y: number, iris: string) =>
  `<circle cx="${x - 11}" cy="${y}" r="10" fill="#fff8e1"/><circle cx="${x + 11}" cy="${y}" r="10" fill="#fff8e1"/>` +
  `<circle cx="${x - 11}" cy="${y}" r="6" fill="${iris}"/><circle cx="${x + 11}" cy="${y}" r="6" fill="${iris}"/><circle cx="${x - 11}" cy="${y}" r="3" fill="#111"/><circle cx="${x + 11}" cy="${y}" r="3" fill="#111"/>`

/** Breast chevrons, `rows` rows; (x, y) = top center. Bounds: x ±18, y from 0 to +36. */
const chevrons = (x: number, y: number, rows: number) => {
  let d = ''
  for (let r = 0; r < rows; r++) for (const dx of [-12, 0, 12]) d += `M${x + dx - 5} ${y + r * (36 / rows)}l5 5l5 -5`
  return `<path d="${d}" stroke="#7a5a3e" stroke-width="2.2" fill="none"/>`
}

/** Owlet; (x, y) = feet. Eyes separate. Bounds: x ±16, y from −34 to 0. */
const owlet = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-14" rx="15" ry="14" fill="#d9c9b0"/><circle cy="-26" r="11" fill="#e3d6c0"/>` +
  `<path d="M-8 -34l-3 -5l6 2ZM8 -34l3 -5l-6 2Z" fill="#d9c9b0"/><path d="M-2 -22l2 3l2 -3Z" fill="#e9a23b"/></g>`
const owletEyes = (x: number, y: number) => `<circle cx="${x - 5}" cy="${y - 28}" r="3.5" fill="#222"/><circle cx="${x + 5}" cy="${y - 28}" r="3.5" fill="#222"/>`

/** Moth with spread wings; (x, y) = center. Bounds: x ±13, y ±9. */
const moth = (x: number, y: number) =>
  `<path d="M${x} ${y}l-13 -8q-2 10 4 14ZM${x} ${y}l13 -8q2 10 -4 14Z" fill="#d9c9a0"/><circle cx="${x - 7}" cy="${y - 2}" r="2" fill="#8a7a5a"/><circle cx="${x + 7}" cy="${y - 2}" r="2" fill="#8a7a5a"/>` +
  `<rect x="${x - 1.5}" y="${y - 6}" width="3" height="12" rx="1.5" fill="#6b5a3a"/>`

/** Stag beetle on the bark, head up; (x, y) = center. Bounds: x ±10, y ±12. */
const beetle = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-6 -4l-4 -2M-6 2l-4 0M-6 7l-4 2M6 -4l4 -2M6 2l4 0M6 7l4 2M-3 -10l-3 -4M3 -10l3 -4" stroke="#1b1b1b" stroke-width="1.5"/>` +
  `<ellipse cy="2" rx="7" ry="9" fill="#3a2a1e"/><circle cy="-8" r="4" fill="#2b1d14"/></g>`

const leaf = (x: number, y: number) => `<path d="M${x} ${y}q-6 -14 4 -22q10 8 -4 22Z" fill="#5fae4b"/><path d="M${x} ${y}l2 -18" stroke="#3f8f3a" stroke-width="1"/>`

/** Bracket fungus shelf on the trunk; (x, y) = attach point, width w. */
const fungus = (x: number, y: number, w: number) =>
  `<path d="M${x} ${y - w * 0.32}q${w} -2 ${w} ${w * 0.32}q-${w * 0.5} ${w * 0.2} -${w} 0Z" fill="#e0a85b"/><path d="M${x + 3} ${y - 1}q${w * 0.4} -${w * 0.1} ${w * 0.8} 0" stroke="#b07a3f" stroke-width="1.5" fill="none"/>`

const spider = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-7 -4l3 2M-8 0h4M-7 4l3 -2M7 -4l-3 2M8 0h-4M7 4l-3 -2" stroke="#222" stroke-width="1.5"/><circle r="4" fill="#222"/></g>`

export default svgLevel({
  id: 130,
  chapter: 'forest',
  title: 'owlHollow',
  parTimeSec: 85,
  scene: ({ diff, anim, rand }) => {
    let bark = ''
    for (let x = 232; x < 570; x += 18) bark += `<path d="M${x} 0q${-6 + rand() * 12} 120 ${-4 + rand() * 8} 250t${-4 + rand() * 8} 250" stroke="#5a3f2c" stroke-width="3" fill="none"/>`
    let farTrees = ''
    for (let x = -10; x < 820; x += 40) farTrees += `<rect x="${x}" y="${200 + rand() * 60}" width="${10 + rand() * 10}" height="300" fill="#4a3a5a"/>`
    let ivy = ''
    for (let i = 0; i < 10; i++) ivy += `<path d="M${240 + i * 6} ${500 - i * 18}q-12 -4 -10 -14q10 0 10 14Z" fill="#3f8f3a"/>`
    const blink = (moving: boolean) => (moving ? anim({ type: 'blink', duty: 0.75, period: 1.6 }, owletEyes(346, 340)) : owletEyes(346, 340))
    const dangling = (period: number) => anim({ type: 'bob', dx: 0, dy: 6, period }, spider(110, 250))

    return (
      `<rect width="800" height="500" fill="#c98fa8"/><rect width="800" height="160" fill="#8a6aa8"/><rect y="300" width="800" height="200" fill="#e0a87a"/>` +
      farTrees +
      // Left branch with leaves and the spider
      `<path d="M0 150Q120 130 240 150" stroke="#6b4a33" stroke-width="16" fill="none"/>` +
      leaf(60, 138) + leaf(100, 134) + leaf(200, 140) + diff(160, 128, 22, leaf(160, 138), `<g transform="rotate(40 160 138)">${leaf(160, 138)}</g>`) +
      `<path d="M110 150V246" stroke="#f4f1e8" stroke-width="1" stroke-opacity="0.8"/>` + diff(110, 250, 22, dangling(2.2), dangling(0.9)) +
      // Trunk with the hollow
      `<rect x="220" y="0" width="360" height="500" fill="#7a5038"/>` + bark +
      `<ellipse cx="400" cy="250" rx="96" ry="120" fill="#5a3a26"/><ellipse cx="400" cy="256" rx="84" ry="108" fill="#24170f"/>` +
      // Owl
      `<ellipse cx="400" cy="250" rx="54" ry="66" fill="#9a7552"/><ellipse cx="400" cy="270" rx="32" ry="40" fill="#e3d0b0"/>` +
      `<path d="M352 160l8 24l16 -12ZM448 160l-8 24l-16 -12Z" fill="#9a7552"/>` +
      `<ellipse cx="400" cy="200" rx="40" ry="26" fill="#c9a77a"/>` +
      diff(400, 198, 26, owlEyes(400, 198, '#ffd23f'), owlEyes(400, 198, '#f2a33a')) +
      `<path d="M396 212l4 8l4 -8Z" fill="#e9a23b"/>` +
      diff(400, 262, 26, chevrons(400, 246, 3), chevrons(400, 246, 4)) +
      // Owlets
      owlet(346, 342) + diff(346, 312, 22, blink(false), blink(true)) +
      owlet(400, 352) + owletEyes(400, 352) +
      diff(456, 324, 26, owlet(456, 342) + owletEyes(456, 342), '') +
      `<path d="M318 350q82 20 164 0" stroke="#8a6a4a" stroke-width="6" fill="none"/>` +
      // Bark visitors
      diff(270, 120, 22, '', moth(270, 120)) +
      diff(300, 440, 26, beetle(294, 444), beetle(304, 436)) + ivy +
      `<path d="M540 300q16 -2 18 10" stroke="#5a3f2c" stroke-width="4" fill="none"/><ellipse cx="520" cy="110" rx="8" ry="12" fill="#24170f"/>` +
      diff(556, 420, 26, fungus(548, 424, 22), fungus(548, 424, 28)) + fungus(552, 452, 16) +
      // Right branch with the squirrel
      `<path d="M580 370Q690 350 800 360" stroke="#6b4a33" stroke-width="16" fill="none"/>` +
      leaf(760, 352) + leaf(620, 360) +
      diff(690, 340, 28, squirrel(690, 360, false, '#c0692b'), squirrel(690, 360, true, '#c0692b')) +
      acorn(650, 354) +
      pineCone(40, 144) +
      feather(740, 372) +
      ladybug(520, 232) +
      bird(205, 140)
    )
  },
})
