// Motion difference: the flag on the tent waves only on picture B.
import { butterfly, stump } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level015Redesign } from './level-015-redesign.ts'
import { basket, chick, cloud, flowerPot, grass, milkCan, sun } from '../shapes.ts'

const flag = `<path d="M190 120L232 131L190 142Z" fill="#e63946"/>`

/** Striped tent with its peak at (x, top), base from x − w/2 to x + w/2 at y = base. */
const tent = (x: number, top: number, base: number, w: number, a: string, b: string) => {
  const n = 6
  let stripes = ''
  for (let i = 0; i < n; i++) {
    const x0 = x - w / 2 + (w / n) * i
    stripes += `<path d="M${x} ${top}L${x0} ${base}H${x0 + w / n}Z" fill="${i % 2 ? b : a}"/>`
  }
  return stripes
}

/** Bunting string with triangle flags. */
const bunting = () => {
  const colors = ['#e63946', '#ffd166', '#3a86ff', '#8ac926', '#ff006e']
  let flags = ''
  for (let i = 0; i < 20; i++) {
    const x = 10 + i * 40
    const y = 40 + Math.sin((i / 19) * Math.PI) * 25
    flags += `<path d="M${x} ${y}L${x + 30} ${y + 1}L${x + 15} ${y + 24}Z" fill="${colors[i % colors.length]}"/>`
  }
  return `<path d="M0 40Q400 90 800 40" stroke="#555" stroke-width="2" fill="none"/>` + flags
}

const balloon = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y + 22}L760 236" stroke="#777" stroke-width="1.5"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="17" ry="21" fill="${color}"/><path d="M${x - 3} ${y + 21}h6l-3 5Z" fill="${color}"/>`

/** (x, y) = center. Bounds: x ±20, y from −24 to +14. */
const pumpkin = (x: number, y: number) =>
  `<path d="M${x} ${y - 12}q2 -6 6 -9" stroke="#4c7a3a" stroke-width="3" fill="none"/>` +
  `<ellipse cx="${x - 9}" cy="${y}" rx="11" ry="13" fill="#f77f00"/><ellipse cx="${x + 9}" cy="${y}" rx="11" ry="13" fill="#f77f00"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="10" ry="14" fill="#f89a2a"/>`

export default svgLevel({
  id: 15,
  chapter: 'farm',
  title: 'fair',
  parTimeSec: 90,
  redesign: level015Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let tufts = ''
    for (let i = 0; i < 12; i++) tufts += grass(10 + rand() * 780, 400 + rand() * 95)

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(440, 120) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 20 }, cloud(330, 150, 0.6)) +
      bunting() +
      `<ellipse cx="400" cy="380" rx="460" ry="50" fill="#a6d985"/>` +
      `<rect y="375" width="800" height="125" fill="#94cf6b"/>` +
      // Tent 1 with the flag
      `<path d="M190 175V120" stroke="#6b4f3a" stroke-width="3"/>` +
      diff(210, 131, 30, flag, anim({ type: 'sway', angle: 14, pivot: [190, 131], period: 1.3 }, flag)) +
      tent(190, 170, 380, 220, '#e63946', '#fff3e0') +
      `<path d="M190 250L160 380H220Z" fill="#7a2a25"/>` +
      // Tent 2: entrance open on A, closed on B
      tent(600, 180, 380, 240, '#3a86ff', '#fff3e0') +
      diff(600, 330, 60, `<path d="M600 280L568 380H632Z" fill="#1d3557"/>`, '') +
      // Stall between the tents
      `<rect x="320" y="330" width="160" height="14" rx="3" fill="#a0703f"/>` +
      `<rect x="330" y="344" width="10" height="50" fill="#8a5a33"/><rect x="460" y="344" width="10" height="50" fill="#8a5a33"/>` +
      basket(350, 330) +
      diff(406, 303, 28, basket(405, 330, '#e63946'), basket(405, 330, '#ffd166')) +
      basket(455, 330, '#8ac926') +
      // Pumpkin pile
      pumpkin(330, 455) +
      pumpkin(370, 460) +
      diff(410, 455, 28, pumpkin(410, 457), '') +
      pumpkin(350, 430) +
      tufts +
      // Balloon seller's bunch bobbing in the wind
      `<path d="M760 236V400" stroke="#8a5a33" stroke-width="5"/>` +
      anim(
        { id: 'balloons', type: 'bob', dx: 4, dy: 6, period: 2.8 },
        balloon(730, 170, '#ff006e') +
          diff(765, 150, 30, balloon(765, 150, '#ffd166'), balloon(765, 150, '#8ac926'), 'balloons') +
          balloon(745, 120, '#3a86ff'),
      ) +
      chick(540, 440) +
      milkCan(500, 402) +
      flowerPot(40, 400) +
      stump(650, 450) +
      butterfly(240, 410) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['flower', 707, 466, '#ff6b8b'],
        ['bee', 152, 456],
        ['flower', 496, 450, '#ff9f43'],
        ['stones', 290, 464],
        ['snail', 625, 476],
        ['flower', 62, 477, '#4dabf7'],
        ['ladybug', 316, 361],
        ['butterfly', 435, 206],
        ['cloud', 661, 168],
        ['birds', 125, 175],
      ])
    )
  },
})
