// Motion differences: the chick by the trough bobs faster on picture B; the butterfly flutters only on B.
import { bird, butterfly } from '../chapter-03/shapes.ts'
import { svgLevel } from '../helpers.ts'
import { apple, basket, bucket, cloud, fence, flower, FLOWER_COLORS, grass, hen, pick, sun, tree } from '../shapes.ts'

/** Chick; (x, y) = feet. Bounds: x ±9, y from −14 to 0. */
const chick = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-5" rx="7" ry="5" fill="#ffd43b"/><circle cx="4" cy="-10" r="4" fill="#ffd43b"/>` +
  `<path d="M8 -10l3 1l-3 1.5Z" fill="#ff922b"/><circle cx="5" cy="-11" r="0.9" fill="#222"/></g>`

/** Weathervane arrow pointing right (dir 1) or left (−1); (x, y) = pivot. Bounds: x ±18, y from −14 to +4. */
const vane = (x: number, y: number, dir: 1 | -1) =>
  `<g transform="translate(${x} ${y}) scale(${dir} 1)" fill="#3d3d3d">` +
  `<path d="M-14 0h28" stroke="#3d3d3d" stroke-width="2.5"/><path d="M18 0l-7 -4v8Z"/><path d="M-14 0l-4 -5h6l3 5l-3 4h-6Z"/>` +
  `<path d="M-6 -2q-2 -10 6 -11q6 0 5 8l-3 3Z"/></g>`

/** Square window, 30×30; (x, y) = center; `bars` = vertical bars (1 → 4 panes, 2 → 6 panes). */
const window = (x: number, y: number, bars: 1 | 2) =>
  `<rect x="${x - 15}" y="${y - 15}" width="30" height="30" fill="#bfe3f0" stroke="#fff6e0" stroke-width="3"/>` +
  (bars === 1 ? `<path d="M${x} ${y - 14}v28" stroke="#fff6e0" stroke-width="2.5"/>` : `<path d="M${x - 5} ${y - 14}v28M${x + 5} ${y - 14}v28" stroke="#fff6e0" stroke-width="2.5"/>`) +
  `<path d="M${x - 14} ${y}h28" stroke="#fff6e0" stroke-width="2.5"/>`

/** Wheelbarrow tray only; the wheel and handles are drawn apart. (x, y) = tray center. Bounds: x ±18, y from −11 to +5. */
const tray = (x: number, y: number, color: string) =>
  `<path d="M${x - 18} ${y - 11}h36l-6 16h-24Z" fill="${color}"/><path d="M${x - 18} ${y - 11}h36" stroke="#8a3b2c" stroke-width="2"/>`

export default svgLevel({
  id: 101,
  chapter: 'farm',
  title: 'coopMorning',
  parTimeSec: 100,
  scene: ({ diff, anim, rand }) => {
    let tufts = ''
    for (let i = 0; i < 18; i++) tufts += grass(10 + rand() * 780, 380 + rand() * 115)
    let flowers = ''
    for (let i = 0; i < 7; i++) flowers += flower(20 + i * 22 + rand() * 8, 488 - rand() * 10, pick(rand, FLOWER_COLORS))
    // Roof shingles: staggered rows of short ticks between the eaves lines.
    let shingles = ''
    for (let k = 0; k < 5; k++) {
      const y = 154 + k * 13
      const half = ((y - 140) / 75) * 140
      shingles += `<path d="M${300 - half} ${y}H${300 + half}" stroke="#8c3a2b" stroke-width="2"/>`
      for (let x = 300 - half + 10 + (k % 2) * 8; x < 300 + half - 6; x += 16) shingles += `<path d="M${x} ${y}v-11" stroke="#8c3a2b" stroke-width="1.5"/>`
    }
    let planks = ''
    for (let x = 190; x < 420; x += 18) planks += `<path d="M${x} 216V350" stroke="#c0703f" stroke-width="2"/>`
    let flock = ''
    for (const [x, y] of [[470, 60], [500, 78], [530, 52], [205, 48]]) flock += `<path d="M${x} ${y}q5 -6 10 0q5 -6 10 0" stroke="#7a6a5a" stroke-width="2" fill="none"/>`
    const bobbing = (period: number) => anim({ type: 'bob', dx: 0, dy: -4, period }, chick(640, 462))
    const flutter = butterfly(590, 255)

    return (
      `<rect width="800" height="500" fill="#ffe3c2"/><rect width="800" height="160" fill="#ffd6b0"/>` +
      sun(110, 150, '#ffc845') +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 26 }, cloud(420, 110, 0.7)) +
      anim({ type: 'path', points: [[0, 0], [-40, 0]], period: 30 }, cloud(640, 70, 0.55)) +
      flock +
      `<ellipse cx="160" cy="330" rx="300" ry="60" fill="#b7dc8f"/><ellipse cx="640" cy="335" rx="320" ry="55" fill="#a9d47f"/>` +
      // Far farmstead on the hill
      `<rect x="520" y="262" width="22" height="50" fill="#c9b8a6"/><ellipse cx="531" cy="262" rx="11" ry="6" fill="#b3a08c"/>` +
      `<rect x="548" y="276" width="56" height="36" fill="#d9a38c"/><path d="M544 278l32 -20l32 20Z" fill="#b97a66"/>` +
      `<rect x="568" y="292" width="14" height="20" fill="#a86b56"/>` +
      `<rect y="330" width="800" height="170" fill="#9ccf6a"/>` +
      `<ellipse cx="400" cy="425" rx="190" ry="42" fill="#d9c08c"/>` +
      tree(735, 335) + apple(705, 225) + apple(760, 200, '#f08c3a') + apple(735, 260) + apple(782, 240) +
      // Coop
      `<rect x="180" y="214" width="240" height="136" fill="#d9844f"/>` + planks +
      `<path d="M160 215L300 140L440 215Z" fill="#b5523b"/>` + shingles +
      `<path d="M300 140v-28" stroke="#3d3d3d" stroke-width="2.5"/>` +
      diff(300, 112, 22, vane(300, 112, 1), vane(300, 112, -1)) +
      `<circle cx="300" cy="182" r="13" fill="#bfe3f0" stroke="#fff6e0" stroke-width="3"/>` +
      window(225, 255, 1) +
      diff(380, 255, 24, window(380, 255, 1), window(380, 255, 2)) +
      diff(389, 180, 24, bird(381, 186, '#5c7cba'), bird(395, 186, '#5c7cba')) +
      // Nest hatch with eggs
      `<rect x="195" y="306" width="40" height="26" fill="#5a3d2b"/><path d="M195 332h40" stroke="#f2c14e" stroke-width="5"/>` +
      diff(
        215,
        318,
        24,
        `<ellipse cx="204" cy="325" rx="5" ry="6" fill="#fbf3e2"/><ellipse cx="215" cy="324" rx="5" ry="6" fill="#fbf3e2"/><ellipse cx="226" cy="325" rx="5" ry="6" fill="#fbf3e2"/>`,
        `<ellipse cx="204" cy="325" rx="5" ry="6" fill="#fbf3e2"/><ellipse cx="226" cy="325" rx="5" ry="6" fill="#fbf3e2"/>`,
      ) +
      // Door and ramp
      `<rect x="280" y="282" width="40" height="68" fill="#6b4226"/><circle cx="312" cy="318" r="2.5" fill="#f2c14e"/>` +
      `<path d="M296 350h28l78 34h-30Z" fill="#c68b4e"/>` +
      `<path d="M310 354h18M326 361h18M342 368h18M358 375h18" stroke="#8a5a33" stroke-width="2"/>` +
      // Fence with the rooster
      fence(440, 800, 320) +
      hen(700, 296, true, '#d9762b') +
      anim({ type: 'sway', angle: 6, pivot: [480, 421], period: 1.4 }, hen(480, 395)) +
      hen(560, 412, true, '#c9823a') +
      hen(140, 402, false, '#f1e3c8') +
      // Feed trough and chicks
      `<path d="M500 470h90l-8 16h-74Z" fill="#8a5a33"/><path d="M506 472h78" stroke="#f2c14e" stroke-width="4"/>` +
      chick(606, 470) + chick(684, 474) + chick(660, 492) +
      diff(640, 456, 22, bobbing(1.3), bobbing(0.55)) +
      diff(590, 255, 22, flutter, anim({ type: 'bob', dx: 6, dy: -5, period: 0.9 }, flutter)) +
      // Yard things
      bucket(60, 404) + basket(90, 470, '#f6ead2') +
      `<path d="M262 436l26 -10M262 440l26 -6" stroke="#6b4226" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M240 450l-4 14M260 450l4 14" stroke="#6b4226" stroke-width="3"/>` +
      `<circle cx="232" cy="458" r="8" fill="#3d3d3d"/><circle cx="232" cy="458" r="3" fill="#bbb"/>` +
      diff(250, 445, 24, tray(250, 445, '#e05a47'), tray(250, 445, '#e3804a')) +
      `<path d="M440 470q12 -26 34 -8q6 14 -8 22h-22Z" fill="#c9b28a"/><path d="M444 470h30" stroke="#a08a63" stroke-width="2"/>` +
      flowers +
      tufts
    )
  },
})
