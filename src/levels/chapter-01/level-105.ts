// Motion differences: one bunting flag flutters only on picture B; the blue balloon bobs faster on B.
import { awning, person } from '../chapter-02/shapes.ts'
import { bird } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { apple, chick, cloud, flowerPot, grass, hayBale, milkCan, stones } from '../shapes.ts'

/** Bunting flag hanging from (x, y). Bounds: x ±9, y from 0 to +20. */
const pennant = (x: number, y: number, color: string) => `<path d="M${x - 9} ${y}h18l-9 20Z" fill="${color}"/>`

/** Jam jar; (x, y) = bottom center. Bounds: x ±8, y from −22 to 0. */
const jam = (x: number, y: number, fill: string) =>
  `<rect x="${x - 8}" y="${y - 17}" width="16" height="17" rx="3" fill="${fill}"/><path d="M${x - 9} ${y - 17}h18l-2 -5h-14Z" fill="#f6e7c4"/>` +
  `<path d="M${x - 9} ${y - 18}h18" stroke="#e05a47" stroke-width="2" stroke-dasharray="3 2"/>`

/** Pumpkin; (x, y) = center, rx × ry. */
const pumpkin = (x: number, y: number, rx: number, ry: number, color = '#f08c28') =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${color}"/>` +
  `<path d="M${x} ${y - ry}v${2 * ry}M${x - rx * 0.5} ${y - ry * 0.9}q-4 ${ry * 0.9} 0 ${ry * 1.8}M${x + rx * 0.5} ${y - ry * 0.9}q4 ${ry * 0.9} 0 ${ry * 1.8}" stroke="#d06b1a" stroke-width="1.5" fill="none"/>` +
  `<path d="M${x} ${y - ry}q2 -6 6 -7" stroke="#4c7a2f" stroke-width="3" fill="none"/>`

/** Goose, faces right; (x, y) = feet. Bounds: x from −16 to +18, y from −34 to 0. */
const goose = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-3 -4v4M3 -4v4" stroke="#ff922b" stroke-width="2.5"/>` +
  `<ellipse cy="-12" rx="15" ry="9" fill="#f7f7f2"/><path d="M-14 -14l-2 -6l8 3Z" fill="#e3e3dc"/>` +
  `<path d="M8 -16q6 -8 4 -16" stroke="#f7f7f2" stroke-width="6" stroke-linecap="round" fill="none"/>` +
  `<path d="M14 -32l5 2l-5 2Z" fill="#ff922b"/><circle cx="12" cy="-32" r="1" fill="#222"/></g>`

/** Price tag on a stick; (x, y) = stick foot. Bounds: x ±13, y from −30 to 0. */
const tag = (x: number, y: number) =>
  `<path d="M${x} ${y}v-14" stroke="#8a5a33" stroke-width="2.5"/><rect x="${x - 13}" y="${y - 30}" width="26" height="16" rx="3" fill="#fff6dc" stroke="#8a5a33" stroke-width="1.5"/>` +
  `<path d="M${x - 8} ${y - 24}h10M${x - 8} ${y - 19}h16" stroke="#e05a47" stroke-width="2"/>`

/** Arrow sign pointing right (dir 1) or left (−1); (x, y) = board center. Bounds: x ±22, y ±8. */
const arrowSign = (x: number, y: number, dir: 1 | -1) =>
  `<g transform="translate(${x} ${y}) scale(${dir} 1)"><path d="M-20 -7h30l10 7l-10 7h-30Z" fill="#f2c14e" stroke="#8a5a33" stroke-width="2"/>` +
  `<circle cx="-12" r="2.5" fill="#8a5a33"/></g>`

/** Ferris wheel rim, spokes and gondolas around (x, y), radius r. */
const ferrisWheel = (x: number, y: number, r: number) => {
  let s = `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#c98bb9" stroke-width="4"/>`
  for (let a = 0; a < 360; a += 45) {
    const gx = x + r * Math.cos((a * Math.PI) / 180)
    const gy = y + r * Math.sin((a * Math.PI) / 180)
    s += `<path d="M${x} ${y}L${gx.toFixed(1)} ${gy.toFixed(1)}" stroke="#c98bb9" stroke-width="2"/>`
    s += `<rect x="${(gx - 6).toFixed(1)}" y="${(gy - 5).toFixed(1)}" width="12" height="10" rx="2" fill="${['#e63946', '#3a86ff', '#ffb703', '#8ac926'][(a / 45) % 4]}"/>`
  }
  return s + `<circle cx="${x}" cy="${y}" r="6" fill="#8d5a9a"/>`
}

export default svgLevel({
  id: 105,
  chapter: 'farm',
  title: 'harvestFair',
  parTimeSec: 90,
  scene: ({ diff, anim, rand, extra }) => {
    const colors = ['#e63946', '#ffb703', '#3a86ff', '#8ac926', '#ff6b8b']
    // Bunting along a sagging string; the flag at x = 400 is the motion difference.
    const sag = (x: number) => 40 + 30 * Math.sin((x / 800) * Math.PI)
    let bunting = `<path d="M0 40Q400 100 800 40" stroke="#6b4226" stroke-width="2" fill="none"/>`
    for (let x = 16; x < 800; x += 32) if (x !== 400) bunting += pennant(x, sag(x) - 2, colors[(x / 32) % 5 | 0])
    const flag = pennant(400, sag(400) - 2, '#8ac926')
    let apples = ''
    for (let i = 0; i < 6; i++) if (i !== 2) apples += apple(70 + i * 15, 330 - (i % 2) * 4, i % 3 ? '#e63946' : '#c92a3a')
    let jams = ''
    const jamColors = ['#c0392b', '#8e44ad', '#e67e22', '#c0392b', '#8e44ad', '#e67e22']
    for (let i = 0; i < 6; i++) if (i !== 3) jams += jam(330 + i * 32, 262, jamColors[i])
    let tufts = ''
    for (let i = 0; i < 16; i++) tufts += grass(10 + rand() * 780, 420 + rand() * 76)
    let corn = ''
    for (let i = 0; i < 4; i++) corn += `<path d="M${758 + i * 10} 400V${300 + rand() * 20}" stroke="#c9b458" stroke-width="4"/><path d="M${758 + i * 10} 350q-12 -10 -16 -26M${758 + i * 10} 330q12 -8 14 -22" stroke="#a5b84a" stroke-width="3" fill="none"/>`
    const bobbing = (period: number) => anim({ type: 'bob', dx: 3, dy: -4, period }, `<ellipse cx="540" cy="140" rx="12" ry="16" fill="#3a86ff"/><path d="M537 156h6l-3 5Z" fill="#3a86ff"/>`)

    return (
      `<rect width="800" height="500" fill="#cdeafd"/>` +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 26 }, cloud(200, 110, 0.6)) +
      `<path d="M0 250Q260 200 520 240T800 230V330H0Z" fill="#b7dc8f"/>` +
      // Ferris wheel
      `<path d="M610 280L650 160L690 280" stroke="#8d5a9a" stroke-width="5" fill="none"/>` +
      anim({ type: 'rotate', pivot: [650, 160], period: 40 }, ferrisWheel(650, 160, 70)) +
      `<rect y="300" width="800" height="200" fill="#9fd06e"/>` +
      bunting + diff(400, 74, 22, flag, anim({ type: 'sway', angle: 16, pivot: [400, 68], period: 0.9 }, flag)) +
      // Apple stall
      `<rect x="40" y="200" width="8" height="140" fill="#8a5a33"/><rect x="252" y="200" width="8" height="140" fill="#8a5a33"/>` +
      awning(150, 178, 230, '#e63946') +
      `<rect x="40" y="336" width="220" height="64" fill="#c68b4e"/><path d="M40 352h220M40 370h220M40 386h220" stroke="#a0703f" stroke-width="2"/>` +
      `<rect x="56" y="318" width="100" height="22" fill="#a0703f"/>` + apples +
      diff(100, 326, 22, apple(100, 330, '#e63946'), apple(100, 330, '#d9564a')) +
      `<rect x="170" y="318" width="76" height="22" fill="#a0703f"/>` +
      apple(184, 328, '#8ac926') + apple(200, 326, '#8ac926') + apple(216, 328, '#9bd13a') + apple(232, 326, '#8ac926') +
      person(150, 316, '#2a9d8f') +
      // Jam stall
      `<rect x="296" y="200" width="8" height="200" fill="#8a5a33"/><rect x="512" y="200" width="8" height="200" fill="#8a5a33"/>` +
      awning(408, 178, 230, '#2a9d8f') +
      `<rect x="304" y="262" width="208" height="7" fill="#8a5a33"/>` + jams +
      diff(426, 250, 22, jam(426, 262, '#c0392b'), '') +
      `<rect x="304" y="306" width="208" height="7" fill="#8a5a33"/>` +
      [330, 356, 382, 460, 486].map((x, i) => jam(x, 306, jamColors[(i + 2) % 6])).join('') +
      `<rect x="296" y="340" width="224" height="60" fill="#e9d3a7"/><path d="M296 340h224" stroke="#c9a77a" stroke-width="4"/>` +
      `<ellipse cx="340" cy="340" rx="22" ry="7" fill="#d9a43a"/><path d="M322 338q18 -12 36 0" fill="#e9b85a"/><path d="M330 336l6 -4M344 336l6 -4" stroke="#b8862b" stroke-width="2"/>` +
      `<rect x="440" y="320" width="40" height="20" rx="3" fill="#8d99ae"/><rect x="446" y="314" width="28" height="8" fill="#5c677d"/>` +
      `<rect x="330" y="356" width="150" height="26" rx="4" fill="#f6e7c4" stroke="#c9a77a" stroke-width="2"/><path d="M344 369h40M394 369h20M424 369h40" stroke="#2a9d8f" stroke-width="4" stroke-linecap="round"/>` +
      // Balloons tied to the jam stall
      `<path d="M520 230q10 -40 -2 -70M520 230q20 -50 28 -70M520 230q2 -60 -24 -64" stroke="#777" stroke-width="1.5" fill="none"/>` +
      `<ellipse cx="496" cy="150" rx="12" ry="16" fill="#ff6b8b"/><ellipse cx="560" cy="164" rx="12" ry="16" fill="#ffb703"/>` +
      diff(540, 140, 26, bobbing(1.6), bobbing(0.7)) +
      // Pumpkin show with the champion
      `<rect x="570" y="370" width="180" height="40" fill="#c68b4e"/>` +
      pumpkin(640, 340, 46, 34) + `<circle cx="660" cy="320" r="9" fill="#3a86ff"/><path d="M656 328l-4 14M664 328l4 14" stroke="#3a86ff" stroke-width="4"/>` +
      pumpkin(712, 352, 22, 17, '#f4a43a') + pumpkin(586, 356, 16, 13) +
      diff(600, 312, 22, tag(600, 332), `<g transform="rotate(16 600 332)">${tag(600, 332)}</g>`) +
      corn +
      // Front: sign, hay bales, a gourd, a goose and visitors
      `<path d="M40 470V384" stroke="#8a5a33" stroke-width="5"/>` +
      diff(40, 384, 24, arrowSign(40, 384, 1), arrowSign(40, 384, -1)) +
      hayBale(120, 460) + hayBale(210, 470) +
      diff(150, 418, 24, pumpkin(150, 420, 13, 9, '#e9c46a'), pumpkin(150, 418, 16, 11, '#e9c46a')) +
      person(310, 470, '#ffb703') + person(338, 474, '#ff6b8b', true, '#c68b5e', '#2b2b2b') +
      diff(431, 453, 28, goose(424, 470), goose(436, 470)) +
      person(560, 470, '#8338ec', true) + person(600, 480, '#3a86ff', false, '#a86b4c', '#2b2b2b') +
      `<rect x="660" y="440" width="70" height="40" rx="4" fill="#a0703f"/>` + pumpkin(676, 434, 12, 9) + pumpkin(704, 432, 13, 10, '#f4a43a') + pumpkin(724, 436, 9, 7) +
      tufts +
      chick(375, 470) +
      milkCan(520, 470) +
      bird(100, 178) +
      stones(275, 415) +
      flowerPot(780, 480) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['mushroom', 68, 282],
        ['chick', 541, 364],
        ['grass', 274, 334],
        ['birds', 86, 105],
        ['butterfly', 299, 127],
      ])
    )
  },
})
