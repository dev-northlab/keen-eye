// Motion differences: the windsock flaps faster on picture B; the bee over the blue hive hovers faster on B.
import { bird, butterfly, mushroom, stump } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bee, beehive, cloud, fence, flower, FLOWER_COLORS, grass, pick, sun, wateringCan } from '../shapes.ts'
import { level104Redesign } from './level-104-redesign.ts'

/** Honey jar; (x, y) = bottom center; `lid` = lid color. Bounds: x ±12, y from −30 to 0. */
const jar = (x: number, y: number, lid = '#e63946') =>
  `<rect x="${x - 11}" y="${y - 24}" width="22" height="24" rx="5" fill="#f4a72a"/><rect x="${x - 7}" y="${y - 16}" width="14" height="9" rx="2" fill="#fff6dc"/>` +
  `<rect x="${x - 12}" y="${y - 30}" width="24" height="7" rx="2" fill="${lid}"/>`

/** Honey dipper standing in a jar, leaning right; (x, y) = jar bottom center. Bounds: x from −4 to +16, y from −52 to −20. */
const dipper = (x: number, y: number) =>
  `<path d="M${x} ${y - 20}L${x + 10} ${y - 46}" stroke="#a0703f" stroke-width="3"/>` +
  `<ellipse cx="${x + 11}" cy="${y - 47}" rx="4" ry="6" fill="#d9a43a" transform="rotate(22 ${x + 11} ${y - 47})"/>`

/** Daisy; (x, y) = stem foot, head at y − 26 with petal radius p. */
const daisy = (x: number, y: number, p: number) => {
  let petals = ''
  for (let a = 0; a < 360; a += 40) petals += `<ellipse cy="${-p * 0.6}" rx="${p * 0.28}" ry="${p * 0.55}" transform="rotate(${a})"/>`
  return (
    `<path d="M${x} ${y}V${y - 26}" stroke="#3f8f3a" stroke-width="3"/>` +
    `<g transform="translate(${x} ${y - 26})" fill="#ffffff">${petals}<circle r="${p * 0.32}" fill="#ffc300"/></g>`
  )
}

/** Smoker on the ground; (x, y) = bottom center. Bounds: x from −14 to +18, y from −34 to 0. */
const smoker = (x: number, y: number) =>
  `<rect x="${x - 10}" y="${y - 24}" width="20" height="24" rx="3" fill="#b8c2cc"/><path d="M${x - 10} ${y - 24}l4 -8h8l8 8Z" fill="#8d99ae"/>` +
  `<path d="M${x + 10} ${y - 16}h8v12h-8" fill="#a0703f"/>`

/** Beekeeper's veil over the face; (x, y) = veil center; `lines` vertical mesh lines. Bounds: x ±14, y ±15. */
const veil = (x: number, y: number, lines: number) => {
  let mesh = ''
  for (let i = 1; i <= lines; i++) mesh += `M${x - 14 + (28 * i) / (lines + 1)} ${y - 14}v28`
  return `<rect x="${x - 14}" y="${y - 15}" width="28" height="30" rx="5" fill="#2b2b2b" fill-opacity="0.35"/><path d="${mesh}" stroke="#2b2b2b" stroke-width="1.2" stroke-opacity="0.8"/>`
}

/** Windsock flying right from (x, y). Bounds: x from 0 to +40, y ±9. */
const sock = (x: number, y: number) =>
  `<path d="M${x} ${y - 9}L${x + 40} ${y - 4}V${y + 4}L${x} ${y + 9}Z" fill="#ff7b25"/>` +
  `<path d="M${x + 13} ${y - 7}v14M${x + 27} ${y - 6}v12" stroke="#fff" stroke-width="5"/>`

export default svgLevel({
  id: 104,
  chapter: 'farm',
  title: 'beeYard',
  parTimeSec: 90,
  redesign: level104Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let lavender = ''
    for (const y of [222, 238, 254]) for (let x = 430 + (y % 2) * 6; x < 800; x += 15) lavender += `<ellipse cx="${x}" cy="${y}" rx="5" ry="8" fill="${y === 238 ? '#9b7fd1' : '#a98de0'}"/>`
    let tufts = ''
    for (let i = 0; i < 14; i++) tufts += grass(10 + rand() * 780, 400 + rand() * 90)
    let meadow = ''
    for (let i = 0; i < 16; i++) {
      const x = 20 + i * 50 + rand() * 20
      if (Math.abs(x - 300) > 30 && Math.abs(x - 420) > 30 && Math.abs(x - 560) > 30) meadow += flower(x, 496 - rand() * 8, pick(rand, FLOWER_COLORS))
    }
    let swarm = ''
    for (let i = 0; i < 7; i++) swarm += anim({ type: 'bob', dx: 6, dy: -4, period: 1.3 + i * 0.2, phase: rand() }, bee(170 + i * 70 + rand() * 20, 180 + rand() * 50))
    const hovering = (period: number) => anim({ type: 'bob', dx: 3, dy: -6, period }, bee(338, 288))
    const flapping = (period: number) => anim({ type: 'sway', angle: 10, pivot: [740, 150], period }, sock(740, 150))
    const hives = ['#f4d35e', '#7ec4cf', '#f28482', '#b8e0a8', '#f7b267']

    return (
      `<rect width="800" height="500" fill="#d6f0ff"/>` +
      sun(250, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(520, 70, 0.7)) +
      `<path d="M0 230Q200 180 420 220T800 205V300H0Z" fill="#b7dc8f"/>` + lavender +
      `<rect y="270" width="800" height="230" fill="#9fd06e"/>` +
      fence(160, 800, 262) +
      // Wild bee tree
      `<rect x="54" y="150" width="34" height="300" rx="8" fill="#8a5a33"/><ellipse cx="72" cy="300" rx="8" ry="12" fill="#3d2818"/>` +
      `<circle cx="20" cy="120" r="60" fill="#4c9a3f"/><circle cx="110" cy="96" r="62" fill="#5bb04a"/><circle cx="60" cy="40" r="56" fill="#5bb04a"/>` +
      `<path d="M120 150q20 -6 40 4" stroke="#8a5a33" stroke-width="6" fill="none"/><path d="M146 156q-10 18 0 34q10 -16 0 -34Z" fill="#e0a83a"/>` +
      `<path d="M140 166h12M140 176h12" stroke="#b8862b" stroke-width="2"/>` +
      // Windsock
      `<path d="M740 250V146" stroke="#6b6b6b" stroke-width="4"/>` +
      diff(760, 152, 26, flapping(2.4), flapping(1.1)) +
      // Hives on their stand
      `<rect x="180" y="380" width="440" height="7" fill="#8a5a33"/>` +
      `<path d="M200 386v20M400 386v20M600 386v20" stroke="#8a5a33" stroke-width="6"/>` +
      hives.map((c, i) => beehive(220 + i * 90, 380, c)).join('') +
      diff(338, 284, 22, hovering(1.5), hovering(0.6)) +
      // Beekeeper with a honey frame
      `<g transform="translate(690 450)">` +
      `<rect x="-16" y="-40" width="12" height="40" rx="4" fill="#f4f4f0"/><rect x="4" y="-40" width="12" height="40" rx="4" fill="#f4f4f0"/>` +
      `<rect x="-22" y="-96" width="44" height="62" rx="14" fill="#f4f4f0"/><path d="M-22 -80l-16 26M22 -80l18 22" stroke="#f4f4f0" stroke-width="10" stroke-linecap="round"/>` +
      `<circle cx="-38" cy="-54" r="6" fill="#f4d35e"/><circle cx="40" cy="-58" r="6" fill="#f4d35e"/>` +
      `<rect x="34" y="-92" width="34" height="30" fill="#d9a43a" stroke="#a0703f" stroke-width="3"/>` +
      `<path d="M40 -84h22M40 -76h22M40 -68h22" stroke="#b8862b" stroke-width="1.5"/>` +
      `<circle cy="-118" r="16" fill="#f2d29b"/><path d="M-26 -132h52l-6 -4h-40Z" fill="#f4f4f0"/><ellipse cy="-140" rx="14" ry="8" fill="#f4f4f0"/></g>` +
      diff(690, 332, 22, veil(690, 332, 3), veil(690, 332, 4)) +
      // Honey table
      `<rect x="92" y="420" width="140" height="10" fill="#a0703f"/><path d="M100 430v50M224 430v50" stroke="#8a5a33" stroke-width="6"/>` +
      diff(112, 404, 22, jar(112, 420), jar(112, 420, '#d0573b')) +
      jar(142, 420) + jar(172, 420) + jar(202, 420) +
      diff(207, 386, 26, dipper(202, 420), `<g transform="rotate(-18 202 400)">${dipper(202, 420)}</g>`) +
      // Front meadow
      diff(304, 450, 22, daisy(300, 492, 12) + bee(304, 452), daisy(300, 492, 12)) +
      diff(420, 470, 24, daisy(420, 492, 12), daisy(420, 492, 15)) +
      diff(563, 468, 28, smoker(552, 485), smoker(566, 485)) +
      // Spare hive boxes and a crate of frames
      `<rect x="740" y="452" width="52" height="20" fill="#f7b267" stroke="#c98a3f" stroke-width="2"/><rect x="744" y="432" width="48" height="20" fill="#7ec4cf" stroke="#4f9aa6" stroke-width="2"/>` +
      `<rect x="736" y="472" width="60" height="20" fill="#f4d35e" stroke="#c9a227" stroke-width="2"/>` +
      `<rect x="610" y="462" width="56" height="26" fill="#a0703f"/><path d="M618 462v-14M630 462v-14M642 462v-14M654 462v-14" stroke="#d9a43a" stroke-width="5"/>` +
      meadow + tufts + swarm +
      bird(135, 148) +
      stump(255, 430) +
      butterfly(505, 430) +
      wateringCan(460, 420) +
      mushroom(360, 430) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['mushroom', 127, 306],
        ['chick', 186, 233],
        ['grass', 449, 368],
        ['birds', 391, 162],
        ['butterfly', 655, 52],
      ])
    )
  },
})
