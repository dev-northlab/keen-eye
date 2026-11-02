// New Zealand: snowy mountains over a turquoise lake, green hills with sheep, a kiwi, a tree fern and a hut.
// Motion difference: a sailing boat on the lake bobs quickly on picture A and slowly on picture B.
import { travelLevel } from '../helpers.ts'
import { sheep } from '../shapes.ts'
import { cloud, sky, water } from './shapes.ts'

/** Mountain peak; (x, y) = summit, foot at y = 300. */
const peak = (x: number, y: number, half: number) =>
  `<path d="M${x - half} 300L${x - 12} ${y + 6}Q${x} ${y - 4} ${x + 12} ${y + 6}L${x + half} 300Z" fill="#8ea5c4"/>`
/** Snow cap on `peak` at (x, y). Bounds: x ±30, y from −2 to +44. */
const snow = (x: number, y: number) =>
  `<path d="M${x - 30} ${y + 38}L${x - 12} ${y + 6}Q${x} ${y - 4} ${x + 12} ${y + 6}L${x + 30} ${y + 38}L${x + 18} ${y + 32}L${x + 8} ${y + 44}L${x - 4} ${y + 32}L${x - 16} ${y + 42}Z" fill="#ffffff"/>`

/** Kiwi bird facing left; (x, y) = feet. Bounds: x from −42 to +20, y from −34 to 0. */
const kiwi = (x: number, y: number) =>
  `<path d="M${x - 4} ${y - 8}l-3 8h-5M${x + 6} ${y - 8}l-2 8h-5" fill="none" stroke="#c9a227" stroke-width="2.4"/>` +
  `<ellipse cx="${x}" cy="${y - 18}" rx="20" ry="15" fill="#7a5a3a"/><circle cx="${x - 14}" cy="${y - 24}" r="8" fill="#7a5a3a"/>` +
  `<path d="M${x - 20} ${y - 24}Q${x - 32} ${y - 20} ${x - 42} ${y - 10}" fill="none" stroke="#e8d9a0" stroke-width="3" stroke-linecap="round"/><circle cx="${x - 16}" cy="${y - 26}" r="1.5" fill="#1d1d1d"/>`

/** Tree fern: trunk with fronds; (x, y) = foot. One frond (to the upper right) is separate. */
const fern = (x: number, y: number) =>
  `<rect x="${x - 6}" y="${y - 110}" width="12" height="110" rx="5" fill="#5c4a35"/>` +
  [[-70, -40], [-56, -80], [-10, -96], [70, -50], [30, -10]].map(([dx, dy]) => frond(x, y - 110, dx, dy)).join('')
/** Frond from the fern top (x, y) to (x + dx, y + dy). */
function frond(x: number, y: number, dx: number, dy: number) {
  let leaves = ''
  for (let i = 1; i < 6; i++) {
    const [px, py] = [x + (dx * i) / 6, y + (dy * i) / 6 - Math.sin((i / 6) * Math.PI) * 10]
    leaves += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${14 - i * 2}" ry="4.5" fill="#3f8f3a" transform="rotate(${((Math.atan2(dy, dx) * 180) / Math.PI + 90).toFixed(0)} ${px.toFixed(1)} ${py.toFixed(1)})"/>`
  }
  return `<path d="M${x} ${y}Q${x + dx / 2} ${y + dy / 2 - 10} ${x + dx} ${y + dy}" fill="none" stroke="#2f6b2a" stroke-width="4"/>${leaves}`
}

/** Hut on the hill; (x, y) = ground in the middle. The roof is separate. Bounds of the roof: x ±32, y from −62 to −36. */
const hut = (x: number, y: number) =>
  `<rect x="${x - 26}" y="${y - 38}" width="52" height="38" fill="#f0e2c0"/><rect x="${x - 6}" y="${y - 24}" width="12" height="24" fill="#7a5233"/><rect x="${x + 12}" y="${y - 30}" width="10" height="10" fill="#4b5d73"/>`
const roof = (x: number, y: number, color: string) => `<path d="M${x - 32} ${y - 36}L${x} ${y - 62}L${x + 32} ${y - 36}Z" fill="${color}"/>`

/** Tui on a fence post; (x, y) = feet. Bounds: x ±12, y from −22 to 0. */
const tui = (x: number, y: number) =>
  `<ellipse cx="${x + 2}" cy="${y - 9}" rx="8" ry="9" fill="#1f3b3a"/><circle cx="${x - 3}" cy="${y - 16}" r="5.5" fill="#1f3b3a"/><circle cx="${x - 3}" cy="${y - 9}" r="2.4" fill="#ffffff"/>` +
  `<path d="M${x - 8} ${y - 17}l-4 2l4 1Z" fill="#1d1d1d"/><path d="M${x + 8} ${y - 6}l4 6" stroke="#1f3b3a" stroke-width="3"/>`

/** Kayak with its paddler; (x, y) = waterline middle. Bounds: x ±36, y from −30 to +4. */
const kayak = (x: number, y: number, color: string) =>
  `<path d="M${x - 36} ${y - 4}Q${x} ${y - 14} ${x + 36} ${y - 4}Q${x} ${y + 6} ${x - 36} ${y - 4}Z" fill="${color}"/>` +
  `<rect x="${x - 5}" y="${y - 22}" width="10" height="12" rx="3" fill="#ffd23f"/><circle cx="${x}" cy="${y - 26}" r="4.5" fill="#f2d29b"/>` +
  `<path d="M${x - 18} ${y - 2}L${x + 18} ${y - 22}" stroke="#3d4a55" stroke-width="2"/>`

/** Small sailing boat; (x, y) = waterline middle. Bounds: x ±20, y from −42 to +3. */
const boat = (x: number, y: number) =>
  `<path d="M${x - 20} ${y - 6}H${x + 20}L${x + 14} ${y + 3}H${x - 14}Z" fill="#e63946"/><path d="M${x} ${y - 6}V${y - 42}" stroke="#3d4a55" stroke-width="2"/>` +
  `<path d="M${x + 2} ${y - 40}L${x + 18} ${y - 10}H${x + 2}Z" fill="#ffffff"/>`

export default travelLevel({
  id: 415,
  title: 'southernAlps',
  parTimeSec: 92,
  place: { region: 'oceania', country: 'nz', lat: -44, lon: 170.5 },
  scene: ({ diff, anim, rand }) => {
    const bob = (period: number) => anim({ id: 'boat', type: 'bob', dx: 0, dy: 4, period }, boat(490, 312))
    return (
      sky('#9fd6f0') +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 46 }, cloud(420, 70, 0.55)) +
      anim({ type: 'path', points: [[0, 0], [-50, 0]], period: 52 }, cloud(120, 90, 0.45)) +
      peak(150, 150, 160) +
      snow(150, 150) +
      peak(700, 126, 150) +
      snow(700, 126) +
      peak(520, 160, 140) +
      diff(520, 181, 38, snow(520, 160), '') +
      peak(330, 112, 170) +
      snow(330, 112) +
      water(280, '#4fc1c9', rand, 10) +
      diff(490, 292, 36, bob(1.3), bob(2.8), 'boat') +
      diff(250, 319, 40, kayak(250, 332, '#ffb703'), kayak(250, 332, '#2a9d8f')) +
      // Hills with the hut, a fence, sheep and the kiwi
      `<path d="M0 350Q200 310 420 350T800 340V500H0Z" fill="#6cbf5a"/>` +
      hut(640, 360) +
      diff(640, 311, 36, roof(640, 360, '#e63946'), roof(640, 360, '#2b59c3')) +
      `<path d="M0 410Q300 370 560 410T800 400V500H0Z" fill="#5aa84c"/>` +
      `<path d="M300 424H540M300 438H540" stroke="#7a5233" stroke-width="2"/>` +
      [300, 360, 420, 480, 540].map((px) => `<rect x="${px - 3}" y="${px === 420 ? 410 : 414}" width="6" height="${px === 420 ? 36 : 32}" fill="#7a5233"/>`).join('') +
      diff(420, 399, 20, tui(420, 410), '') +
      sheep(560, 380) +
      diff(196, 441, 48, sheep(200, 438, true), sheep(200, 438, true, '#3d3d3d')) +
      sheep(690, 452, true) +
      sheep(560, 466) +
      kiwi(360, 486) +
      fern(50, 500) +
      diff(78, 373, 40, frond(50, 390, 50, -30), '')
    )
  },
})
