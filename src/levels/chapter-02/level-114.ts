// Motion differences: one string-light bulb blinks only on picture B; the hanging scale pan swings only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level114Redesign } from './level-114-redesign.ts'
import { awning, ball, building, coffeeCup, dog, newspaperBox, person, scooter, shoppingBag } from './shapes.ts'

/** Crate of round produce: `rows` rows of `cols` fruits of radius r in `colors`; (x, y) = crate bottom-left. */
const crate = (x: number, y: number, cols: number, r: number, colors: string[], skip = -1) => {
  const w = cols * r * 2 + 8
  let s = ''
  for (let row = 0; row < 2; row++)
    for (let c = 0; c < cols - row; c++) {
      const i = row * cols + c
      if (i !== skip) s += `<circle cx="${x + 4 + r + c * 2 * r + row * r}" cy="${y - 16 - r - row * r * 1.5}" r="${r}" fill="${colors[i % colors.length]}"/>`
    }
  return s + `<rect x="${x}" y="${y - 18}" width="${w}" height="18" fill="#c68b4e"/><path d="M${x} ${y - 9}h${w}" stroke="#a0703f" stroke-width="2"/>`
}

/** Light bulb hanging at (x, y). Bounds: x ±5, y from 0 to +12. */
const bulb = (x: number, y: number) => `<path d="M${x} ${y}v3" stroke="#3d4a55" stroke-width="2"/><ellipse cx="${x}" cy="${y + 8}" rx="4.5" ry="5.5" fill="#ffe08a"/>`

/** Watermelon slice; (x, y) = center of the rind. Bounds: x ±14, y from −12 to +2. */
const melon = (x: number, y: number) =>
  `<path d="M${x - 14} ${y}a14 12 0 0 1 28 0Z" fill="#ff5d6c"/><path d="M${x - 14} ${y}h28" stroke="#3f8f3a" stroke-width="4"/>` +
  `<circle cx="${x - 5}" cy="${y - 5}" r="1.2" fill="#222"/><circle cx="${x + 4}" cy="${y - 6}" r="1.2" fill="#222"/><circle cx="${x}" cy="${y - 3}" r="1.2" fill="#222"/>`

/** Cheese wheel; (x, y) = center, radius r. */
const cheese = (x: number, y: number, r: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.7}" fill="#f6c945"/><ellipse cx="${x}" cy="${y - r * 0.18}" rx="${r}" ry="${r * 0.5}" fill="#ffdb6e"/>` +
  `<circle cx="${x - r * 0.4}" cy="${y - r * 0.2}" r="${r * 0.12}" fill="#e0ad2e"/><circle cx="${x + r * 0.3}" cy="${y - r * 0.3}" r="${r * 0.1}" fill="#e0ad2e"/>`

/** Price board hanging under an awning with `lines` chalk lines; (x, y) = center. Bounds: x ±18, y ±14. */
const board = (x: number, y: number, lines: number) => {
  let s = `<path d="M${x - 10} ${y - 22}v8M${x + 10} ${y - 22}v8" stroke="#3d4a55" stroke-width="1.5"/><rect x="${x - 18}" y="${y - 14}" width="36" height="28" rx="3" fill="#2b2b2b" stroke="#a0703f" stroke-width="2"/>`
  for (let i = 1; i <= lines; i++) s += `<path d="M${x - 11} ${y - 14 + (28 * i) / (lines + 1)}h${i % 2 ? 22 : 15}" stroke="#f4f4f4" stroke-width="2"/>`
  return s
}

/** Standing sign on a post; (x, y) = board center. Bounds: x ±20, y from −12 to +12. */
const sign = (x: number, y: number) =>
  `<rect x="${x - 20}" y="${y - 12}" width="40" height="24" rx="4" fill="#ffd166" stroke="#a0703f" stroke-width="2"/><path d="M${x - 10} ${y - 3}h20M${x - 6} ${y + 4}h12" stroke="#e63946" stroke-width="2.5"/>`

/** Hanging scale with its pan; (x, y) = hook. Bounds: x ±14, y from 0 to +30. */
const scale = (x: number, y: number) =>
  `<path d="M${x} ${y}v6" stroke="#3d4a55" stroke-width="2"/><circle cx="${x}" cy="${y + 12}" r="6" fill="#f4f4f4" stroke="#3d4a55" stroke-width="2"/>` +
  `<path d="M${x} ${y + 18}l-12 8M${x} ${y + 18}l12 8" stroke="#3d4a55" stroke-width="1.5"/><path d="M${x - 14} ${y + 26}h28q-2 6 -14 6q-12 0 -14 -6Z" fill="#c9d1da"/>`

/** Flower bucket; (x, y) = bottom center. */
const bucket = (x: number, y: number, colors: string[]) =>
  colors.map((c, i) => `<path d="M${x - 6 + i * 6} ${y - 22}V${y - 38 - (i % 2) * 6}" stroke="#3f8f3a" stroke-width="2"/><circle cx="${x - 6 + i * 6}" cy="${y - 40 - (i % 2) * 6}" r="5" fill="${c}"/>`).join('') +
  `<path d="M${x - 12} ${y - 24}h24l-3 24h-18Z" fill="#8d99ae"/>`

export default svgLevel({
  id: 114,
  chapter: 'city',
  title: 'streetMarket',
  parTimeSec: 95,
  redesign: level114Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let bulbs = ''
    const lineY = (x: number) => 60 + 26 * Math.sin((x / 800) * Math.PI)
    for (let x = 30; x < 800; x += 50) if (x !== 130 && x !== 530) bulbs += anim({ type: 'blink', duty: 0.85, period: 2 + (x % 7) * 0.3 }, bulb(x, lineY(x)))
    let cobbles = ''
    for (let i = 0; i < 70; i++) cobbles += `<ellipse cx="${(rand() * 800).toFixed(1)}" cy="${(360 + rand() * 140).toFixed(1)}" rx="9" ry="4" fill="#b8aea2"/>`
    const stall = (x: number, w: number, color: string) =>
      `<rect x="${x + 6}" y="150" width="6" height="190" fill="#6b4a3a"/><rect x="${x + w - 12}" y="150" width="6" height="190" fill="#6b4a3a"/>` +
      awning(x + w / 2, 150, w, color) + `<rect x="${x}" y="300" width="${w}" height="44" fill="#a0703f"/><path d="M${x} 312h${w}" stroke="#8a5a33" stroke-width="3"/>`
    const reds = ['#e63946', '#c1121f', '#e63946']
    const greens = ['#6aa84f', '#8ac926']
    const oranges = ['#ff9f1c', '#fb8500']
    const lemons = ['#ffe066', '#ffd43b']

    return (
      `<rect width="800" height="500" fill="#cfe6f5"/>` +
      building(-10, 230, 200, 230, '#f2cc8f') + building(190, 230, 220, 200, '#81b29a') + building(410, 230, 180, 220, '#e07a5f') + building(590, 230, 220, 190, '#7aa6d6') +
      `<path d="M0 60Q400 112 800 60" stroke="#3d4a55" stroke-width="1.5" fill="none"/>` + bulbs +
      diff(130, 80, 22, bulb(130, lineY(130)), '') +
      diff(530, 86, 22, bulb(530, lineY(530)), anim({ type: 'blink', duty: 0.5, period: 1.2 }, bulb(530, lineY(530)))) +
      `<rect y="230" width="800" height="130" fill="#d4d9de"/><rect y="340" width="800" height="160" fill="#c8bfb4"/>` + cobbles +
      // Stall 1: vegetables and a melon
      stall(20, 180, '#e63946') +
      crate(30, 300, 4, 7, reds) + crate(110, 300, 3, 8, greens) +
      diff(170, 284, 24, melon(166, 290), melon(176, 290)) +
      board(110, 196, 2) +
      // Stall 2: citrus and the scale
      stall(210, 180, '#ffb703') +
      crate(220, 300, 4, 7, oranges) + crate(296, 300, 4, 7, lemons, 1) +
      diff(321, 277, 22, `<circle cx="321" cy="277" r="7" fill="#ffd43b"/>`, `<circle cx="321" cy="277" r="7" fill="#e3db5a"/>`) +
      diff(360, 208, 26, scale(360, 186), anim({ type: 'sway', angle: 14, pivot: [360, 186], period: 1.8 }, scale(360, 186))) +
      // Stall 3: flowers
      stall(400, 180, '#ff6b8b') +
      bucket(430, 300, ['#ff6b8b', '#ffd166', '#ff6b8b']) + bucket(470, 300, ['#b38cff', '#ffffff', '#b38cff']) +
      bucket(510, 300, ['#ffb703', '#e63946', '#ffb703']) + bucket(550, 300, ['#ffffff', '#ff6b8b', '#ffffff']) +
      `<path d="M490 400V348" stroke="#6b4a3a" stroke-width="4"/>` +
      diff(490, 338, 26, sign(490, 338), `<g transform="rotate(-14 490 348)">${sign(490, 338)}</g>`) +
      // Stall 4: cheese and bread
      stall(590, 190, '#2a9d8f') +
      cheese(628, 292, 16) + diff(690, 288, 24, cheese(690, 290, 15), cheese(690, 288, 18)) + cheese(744, 294, 12) +
      `<ellipse cx="660" cy="262" rx="18" ry="8" fill="#d9a05b"/><path d="M650 258l4 6M660 256l4 6M670 258l4 6" stroke="#b8762c" stroke-width="2"/>` +
      `<ellipse cx="740" cy="264" rx="14" ry="10" fill="#c98a4a"/>` +
      diff(640, 196, 24, board(640, 196, 2), board(640, 196, 3)) +
      // Shoppers
      person(80, 420, '#3a86ff') + person(150, 446, '#ff006e', true, '#c68b5e', '#2b2b2b') + person(270, 430, '#8ac926') +
      person(330, 470, '#fb8500', true) + `<path d="M318 444h14v16h-14Z" fill="#e9d3a7"/>` +
      person(560, 440, '#8338ec') + person(620, 470, '#ffb703', true, '#a86b4c', '#2b2b2b') + person(720, 430, '#e63946') +
      dog(420, 470, '#c48a5a') +
      `<path d="M190 470h60l-6 20h-48Z" fill="#7aa6d6"/><circle cx="200" cy="494" r="5" fill="#3d3d3d"/><circle cx="240" cy="494" r="5" fill="#3d3d3d"/><path d="M250 470l14 -14" stroke="#3d4a55" stroke-width="3"/>` +
      `<g fill="#e63946"><circle cx="206" cy="466" r="6"/><circle cx="220" cy="464" r="6"/><circle cx="234" cy="466" r="6"/></g>` +
      shoppingBag(110, 420) +
      ball(372, 482) +
      newspaperBox(450, 400) +
      coffeeCup(660, 465) +
      scooter(770, 482) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['flowerBox', 249, 217, '#ffb703'],
        ['ball', 673, 406, '#e63946'],
        ['hydrant', 321, 394],
        ['shoppingBag', 495, 464],
        ['pigeon', 737, 464],
      ])
    )
  },
})
