// Motion differences: the owl turns its head only on picture B; the kitten's tail swishes faster on B.
import { svgLevel } from '../helpers.ts'
import { hayBale, hen } from '../shapes.ts'

/** Square hay bale, 80 × 40; (x, y) = top-left corner; `bands` twine bands of `twine` color. */
const bale = (x: number, y: number, bands = 2, twine = '#c0392b') => {
  let s = `<rect x="${x}" y="${y}" width="80" height="40" rx="4" fill="#f2c14e"/>` + `<path d="M${x + 6} ${y + 12}h20M${x + 40} ${y + 26}h26M${x + 14} ${y + 32}h14" stroke="#d9a43a" stroke-width="2"/>`
  for (let i = 1; i <= bands; i++) s += `<path d="M${x + (80 * i) / (bands + 1)} ${y + 2}v36" stroke="${twine}" stroke-width="3"/>`
  return s
}

/** Owl body without the head; (x, y) = feet. Bounds: x ±16, y from −24 to 0. */
const owlBody = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-12" rx="15" ry="14" fill="#8d6e53"/><ellipse cy="-8" rx="9" ry="9" fill="#c9a784"/>` +
  `<path d="M-6 0v-3M6 0v-3" stroke="#f4a261" stroke-width="3"/></g>`

/** Owl head; (x, y) = feet of the owl. Pivot (x, y − 22). Bounds: x ±16, y from −44 to −20. */
const owlHead = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-31" rx="15" ry="12" fill="#8d6e53"/><path d="M-13 -38l-3 -6l8 3ZM13 -38l3 -6l-8 3Z" fill="#8d6e53"/>` +
  `<circle cx="-6" cy="-32" r="5" fill="#fff"/><circle cx="6" cy="-32" r="5" fill="#fff"/><circle cx="-6" cy="-32" r="2.5" fill="#222"/><circle cx="6" cy="-32" r="2.5" fill="#222"/>` +
  `<path d="M-2 -27l2 4l2 -4Z" fill="#f4a261"/></g>`

/** Kitten lying in the hay, faces right; (x, y) = belly. Tail separate. Bounds: x ±22, y from −24 to 0. */
const kitten = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-8" rx="20" ry="9" fill="#f0a868"/>` +
  `<circle cx="16" cy="-14" r="9" fill="#f0a868"/><path d="M10 -20l1 -7l5 4ZM22 -20l-1 -7l-5 4Z" fill="#f0a868"/>` +
  `<circle cx="14" cy="-15" r="1.5" fill="#222"/><circle cx="20" cy="-15" r="1.5" fill="#222"/><path d="M-12 -14l4 6M-4 -16l3 6" stroke="#d9874a" stroke-width="2"/></g>`

const kittenTail = (x: number, y: number) => `<path d="M${x} ${y}q-14 -2 -18 -14" stroke="#f0a868" stroke-width="5" stroke-linecap="round" fill="none"/>`

/** Cart wheel with 6 spokes turned by `turn` degrees; (x, y) = hub. Bounds: radius 24. */
const wheel = (x: number, y: number, turn: number) => {
  let spokes = ''
  for (let a = 0; a < 180; a += 60) spokes += `<path d="M-21 0H21" transform="rotate(${a + turn})"/>`
  return (
    `<g transform="translate(${x} ${y})"><circle r="22" fill="none" stroke="#6b4226" stroke-width="5"/>` +
    `<g stroke="#8a5a33" stroke-width="3">${spokes}</g><circle r="5" fill="#6b4226"/></g>`
  )
}

/** Flying bird, faces right (or left with `flip`); (x, y) = body. Bounds: x ±12, y from −8 to +4. */
const swallow = (x: number, y: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><path d="M-12 -6q8 2 10 6q4 -8 12 -8q-6 4 -8 10q-6 2 -14 -8Z" fill="#2b2b3a"/>` +
  `<path d="M-2 0l-8 4" stroke="#2b2b3a" stroke-width="2"/><circle cx="8" cy="-2" r="1.5" fill="#e05a47"/></g>`

/** Ball of yarn with a loose thread; (x, y) = center. Bounds: x from −16 to +9, y ±9. */
const yarn = (x: number, y: number) =>
  `<path d="M${x - 6} ${y + 6}q-6 4 -10 0" stroke="#e05a8a" stroke-width="2" fill="none"/><circle cx="${x}" cy="${y}" r="8" fill="#ff7aa8"/>` +
  `<path d="M${x - 6} ${y - 3}q6 4 12 -2M${x - 5} ${y + 3}q6 -4 11 2" stroke="#e05a8a" stroke-width="1.5" fill="none"/>`

export default svgLevel({
  id: 107,
  chapter: 'farm',
  title: 'hayloft',
  parTimeSec: 75,
  hintLimit: 2,
  scene: ({ diff, anim, rand }) => {
    let planks = ''
    for (let x = 16; x < 800; x += 32) planks += `<path d="M${x} 0V360" stroke="#8f5c37" stroke-width="2"/>`
    let boards = ''
    for (let y = 376; y < 500; y += 22) boards += `<path d="M0 ${y}H800" stroke="#9a6841" stroke-width="2"/>`
    let loose = ''
    for (let i = 0; i < 46; i++) {
      const x = rand() * 800
      const y = 366 + rand() * 130
      loose += `<path d="M${x} ${y}l${8 + rand() * 6} ${-3 + rand() * 6}" stroke="#e9c46a" stroke-width="2"/>`
    }
    const head = (turning: boolean) => (turning ? anim({ type: 'sway', angle: 16, pivot: [120, 100], period: 2.2 }, owlHead(120, 122)) : owlHead(120, 122))
    const swish = (period: number) => anim({ type: 'sway', angle: 18, pivot: [160, 444], period }, kittenTail(160, 444))

    return (
      `<rect width="800" height="500" fill="#a86f45"/>` + planks +
      // Loft door with the fields outside
      `<rect x="314" y="124" width="172" height="240" fill="#6b4226"/>` +
      `<rect x="322" y="132" width="156" height="232" fill="#bfe6f7"/>` +
      diff(440, 172, 26, `<circle cx="440" cy="172" r="19" fill="#ffd23f"/>`, `<circle cx="440" cy="172" r="23" fill="#ffd23f"/>`) +
      `<path d="M322 300q50 -30 100 -10t56 -6V364H322Z" fill="#a6d985"/><path d="M322 330q60 -20 156 -4V364H322Z" fill="#8fca68"/>` +
      `<path d="M330 344h140M326 354h148" stroke="#79b356" stroke-width="2"/>` +
      `<rect x="420" y="280" width="20" height="16" fill="#e05a47"/><path d="M416 282l14 -10l14 10Z" fill="#8c3a2b"/>` +
      diff(362, 212, 22, swallow(362, 212), swallow(362, 212, true)) +
      swallow(404, 238) +
      // Pulley beam, rope and hook
      `<rect x="390" y="100" width="20" height="28" fill="#6b4226"/><circle cx="400" cy="112" r="7" fill="#8d99ae"/>` +
      anim({ type: 'sway', angle: 4, pivot: [400, 119], period: 3.4 }, `<path d="M400 119V230" stroke="#c9a77a" stroke-width="3"/><path d="M400 230v10q0 10 -8 8" stroke="#8d99ae" stroke-width="4" fill="none"/>`) +
      // Roof and tie beam
      `<path d="M0 130L400 0L800 130V0H0Z" fill="#5a3a24"/>` +
      `<path d="M0 130L400 0L800 130" stroke="#7a4f30" stroke-width="12" fill="none"/>` +
      `<rect y="122" width="314" height="12" fill="#7a4f30"/><rect x="486" y="122" width="314" height="12" fill="#7a4f30"/>` +
      `<path d="M200 66V122M600 66V122" stroke="#7a4f30" stroke-width="8"/>` +
      `<path d="M8 6l40 30M8 6l20 46M8 6l50 10M18 14q10 -6 14 6M26 26q14 -6 18 8" stroke="#ece4d8" stroke-width="1" stroke-opacity="0.7" fill="none"/>` +
      `<path d="M700 96q20 18 44 0Z" fill="#8a6a4a"/><circle cx="714" cy="92" r="4" fill="#2b2b3a"/><circle cx="728" cy="92" r="4" fill="#2b2b3a"/>` +
      owlBody(120, 122) + diff(120, 92, 22, head(false), head(true)) +
      // Floor
      `<rect y="360" width="800" height="140" fill="#b07a4f"/>` + boards + loose +
      // Left bale pile with a mouse on top
      bale(20, 320) + bale(100, 320) + bale(180, 320) + bale(60, 280) + bale(100, 240) +
      diff(60, 340, 24, bale(20, 320), bale(20, 320, 2, '#d9733b')) +
      diff(180, 300, 28, bale(140, 280), bale(140, 280, 3)) +
      diff(138, 232, 22, `<g transform="translate(138 240)"><ellipse cy="-4" rx="7" ry="5" fill="#9a8f86"/><circle cx="6" cy="-6" r="3.5" fill="#9a8f86"/><circle cx="4" cy="-9" r="2.5" fill="#c7b9ae"/><path d="M-6 -3q-8 2 -10 -4" stroke="#9a8f86" stroke-width="1.5" fill="none"/></g>`, '') +
      `<ellipse cx="390" cy="412" rx="26" ry="10" fill="none" stroke="#c9a77a" stroke-width="5"/><ellipse cx="390" cy="410" rx="15" ry="6" fill="none" stroke="#c9a77a" stroke-width="4"/>` +
      `<path d="M452 420q20 -14 46 0Z" fill="#e9c46a"/>` + hen(475, 404, true, '#c9823a') +
      // Right side: wheel, round bale, bales and the ladder hole
      diff(560, 236, 26, wheel(560, 236, 0), wheel(560, 236, 22)) +
      hayBale(650, 316) + bale(700, 320) + bale(700, 280) + bale(620, 240) +
      `<rect x="560" y="420" width="120" height="44" fill="#3d2818"/><path d="M590 420v44M650 420v44M590 436h60M590 452h60" stroke="#c68b4e" stroke-width="5"/>` +
      `<rect x="740" y="180" width="8" height="200" fill="#6b4226"/><rect x="734" y="200" width="20" height="26" rx="3" fill="#ffd166" stroke="#3d3d3d" stroke-width="2"/>` +
      `<path d="M500 380L560 260M506 262l-4 -22M514 266l2 -22M522 270l8 -22" stroke="#8a5a33" stroke-width="4"/>` +
      // Front hay with kittens and a yarn ball
      `<path d="M60 500q20 -70 120 -64q90 4 110 64Z" fill="#f2c14e"/><path d="M90 480q30 -20 60 -10M170 470q30 -12 60 4" stroke="#d9a43a" stroke-width="3" fill="none"/>` +
      kitten(190, 456) + diff(150, 436, 22, swish(1.6), swish(0.6)) +
      `<g transform="translate(250 472)"><ellipse cy="-7" rx="16" ry="8" fill="#bdbdbd"/><circle cx="12" cy="-12" r="8" fill="#bdbdbd"/><path d="M7 -18l1 -6l4 3ZM17 -18l-1 -6l-4 3Z" fill="#bdbdbd"/></g>` +
      diff(320, 466, 24, yarn(316, 470), yarn(328, 468)) +
      `<path d="M430 500q4 -40 30 -40h50q20 0 22 40Z" fill="#e3cfa0"/><path d="M452 470h56" stroke="#a08a63" stroke-width="2"/>`
    )
  },
})
