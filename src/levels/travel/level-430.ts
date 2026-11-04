// Buenos Aires: the bright houses of La Boca with a balcony, shutters and a filete sign, laundry on a
// line, the Obelisco behind, a jacaranda in bloom, a couple dancing tango and a bandoneon player.
// Motion difference: a shirt on the laundry line flutters quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { cloud, person, sky, sun } from './shapes.ts'

/** Corrugated house panel from x, w wide, roof at `top`, ground at 380. */
function panel(x: number, w: number, top: number, color: string) {
  let s = `<rect x="${x}" y="${top}" width="${w}" height="${380 - top}" fill="${color}"/>`
  for (let lx = x + 6; lx < x + w; lx += 8) s += `<path d="M${lx} ${top}V380" stroke="#000000" stroke-opacity="0.08" stroke-width="2"/>`
  return s + `<rect x="${x - 2}" y="${top - 6}" width="${w + 4}" height="8" fill="#3d4a55"/>`
}
/** Window with a white frame; (x, y) = top left, 30 × 40. */
const window = (x: number, y: number) => `<rect x="${x - 3}" y="${y - 3}" width="36" height="46" fill="#ffffff"/><rect x="${x}" y="${y}" width="30" height="40" fill="#4b5d73"/>`
/** Shutters beside a window at (x, y). Bounds: x from −16 to +46, y from 0 to +40. */
const shutters = (x: number, y: number, color: string) => `<rect x="${x - 16}" y="${y}" width="13" height="40" fill="${color}"/><rect x="${x + 33}" y="${y}" width="13" height="40" fill="${color}"/>`
/** Balcony railing; (x, y) = top left, 70 wide. Bounds: 70 × 24. */
function railing(x: number, y: number, color: string) {
  let bars = ''
  for (let bx = x + 6; bx < x + 68; bx += 9) bars += `<rect x="${bx}" y="${y + 4}" width="3" height="16" fill="${color}"/>`
  return `<rect x="${x}" y="${y}" width="70" height="4" fill="${color}"/><rect x="${x}" y="${y + 20}" width="70" height="4" fill="${color}"/>${bars}`
}
/** Filete sign: black board with colored scrolls; (x, y) = middle. The scrolls are separate. Bounds: x ±32, y ±14. */
const board = (x: number, y: number) => `<rect x="${x - 32}" y="${y - 14}" width="64" height="28" rx="4" fill="#1d1d1d"/>`
const scrolls = (x: number, y: number, color: string) =>
  `<path d="M${x - 24} ${y + 6}q-4 -12 8 -12q8 0 4 8M${x + 24} ${y + 6}q4 -12 -8 -12q-8 0 -4 8M${x - 8} ${y - 2}h16" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`

/** Obelisco; (x, y) = foot. The window near the top is separate. Bounds: x ±14, y from −240 to 0. */
const obelisk = (x: number, y: number) =>
  `<path d="M${x - 14} ${y}L${x - 8} ${y - 220}H${x + 8}L${x + 14} ${y}Z" fill="#f4f1ea"/><path d="M${x - 8} ${y - 220}L${x} ${y - 240}L${x + 8} ${y - 220}Z" fill="#e3ddd0"/>`
const obeliskWindow = (x: number, y: number) => `<rect x="${x - 3}" y="${y - 208}" width="6" height="9" fill="#4b5d73"/>`

/** Shirt hanging from the line at (x, y). Bounds: x ±16, y from 0 to +30. */
const shirt = (x: number, y: number, color: string) =>
  `<path d="M${x - 8} ${y}L${x - 16} ${y + 8}L${x - 12} ${y + 14}L${x - 9} ${y + 12}V${y + 30}H${x + 9}V${y + 12}L${x + 12} ${y + 14}L${x + 16} ${y + 8}L${x + 8} ${y}Z" fill="${color}"/>`
/** Trousers hanging from the line at (x, y). Bounds: x ±11, y from 0 to +34. */
const trousers = (x: number, y: number, color: string) => `<path d="M${x - 11} ${y}H${x + 11}L${x + 10} ${y + 34}H${x + 2}L${x} ${y + 12}L${x - 2} ${y + 34}H${x - 10}Z" fill="${color}"/>`

/** Jacaranda; (x, y) = foot. One cluster of flowers is separate. */
const jacaranda = (x: number, y: number) =>
  `<path d="M${x - 4} ${y}Q${x - 8} ${y - 50} ${x - 30} ${y - 80}M${x - 6} ${y - 40}Q${x + 10} ${y - 70} ${x + 30} ${y - 84}" fill="none" stroke="#6b4a3a" stroke-width="9" stroke-linecap="round"/>` +
  [[-40, -96, 30], [0, -110, 36], [38, -98, 30], [-14, -84, 24]].map(([dx, dy, r]) => `<circle cx="${x + dx}" cy="${y + dy}" r="${r}" fill="#9b7bd6"/>`).join('')
const flowers = (x: number, y: number, color: string) => [[-6, -4], [6, -6], [0, 6], [10, 6], [-10, 6]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="5" fill="${color}"/>`).join('')

/** Tango dancer in a dress facing left; (x, y) = feet. The dress is separate. */
const dancerTop = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y - 74}" r="8" fill="#e0b48a"/><path d="M${x - 8} ${y - 78}q8 -10 16 0q2 6 -2 10" fill="#1d1d1d"/><path d="M${x - 3} ${y - 66}l-16 -8" stroke="#e0b48a" stroke-width="4" stroke-linecap="round"/>`
/** Dress of the dancer at (x, y). Bounds: x from −20 to +28, y from −66 to 0. */
const dress = (x: number, y: number, color: string) => `<path d="M${x - 8} ${y - 66}H${x + 8}L${x + 6} ${y - 40}Q${x + 30} ${y - 6} ${x + 26} ${y}H${x - 18}Q${x - 20} ${y - 20} ${x - 6} ${y - 40}Z" fill="${color}"/>`
/** Fedora on a `person` standing at (x, y). Bounds: x ±14, y from −72 to −58. */
const fedora = (x: number, y: number) => `<ellipse cx="${x}" cy="${y - 60}" rx="14" ry="3" fill="#1d1d1d"/><path d="M${x - 9} ${y - 60}V${y - 68}Q${x} ${y - 74} ${x + 9} ${y - 68}V${y - 60}Z" fill="#1d1d1d"/>`

/** Bandoneon player sitting on a chair facing left; (x, y) = feet. The bellows are separate. */
const player = (x: number, y: number) =>
  `<rect x="${x + 4}" y="${y - 40}" width="30" height="5" fill="#7a5233"/><path d="M${x + 30} ${y - 40}V${y}M${x + 8} ${y - 40}V${y}M${x + 30} ${y - 40}V${y - 76}" stroke="#7a5233" stroke-width="4"/>` +
  `<path d="M${x + 6} ${y - 40}H${x - 8}V${y}" fill="none" stroke="#3d4a55" stroke-width="7"/><path d="M${x + 2} ${y - 72}h22l2 34h-26Z" fill="#2f5d8a"/>` +
  `<circle cx="${x + 12}" cy="${y - 80}" r="8" fill="#e0b48a"/><path d="M${x + 4} ${y - 82}q8 -10 16 0" fill="#9a9a9a"/>` +
  `<rect x="${x - 22}" y="${y - 62}" width="12" height="18" rx="2" fill="#1d1d1d"/><rect x="${x + 2}" y="${y - 62}" width="12" height="18" rx="2" fill="#1d1d1d"/>`
const bellows = (x: number, y: number, color: string) =>
  `<rect x="${x - 10}" y="${y - 60}" width="12" height="14" fill="${color}"/>` + [-7, -3, 1].map((dx) => `<path d="M${x + dx} ${y - 60}V${y - 46}" stroke="#1d1d1d" stroke-width="1"/>`).join('')

export default travelLevel({
  id: 430,
  title: 'buenosAires',
  parTimeSec: 134,
  place: { region: 'americas', country: 'ar', lat: -34.6, lon: -58.38 },
  scene: ({ diff, anim, extra }) => {
    const flutter = (period: number) => anim({ id: 'shirt', type: 'sway', angle: 12, pivot: [432, 204], period }, shirt(432, 204, '#ffffff'))
    return (
      sky('#9fd6f2') +
      sun(560, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 46 }, cloud(200, 70, 0.5)) +
      obelisk(400, 310) +
      diff(400, 106, 18, obeliskWindow(400, 310), '') +
      // La Boca, left
      panel(0, 110, 170, '#e63946') +
      panel(110, 110, 190, '#ffd23f') +
      panel(220, 110, 160, '#3a86ff') +
      window(25, 196) +
      window(150, 230) +
      window(260, 190) +
      diff(56, 256, 40, railing(20, 244, '#3f8f5a'), railing(20, 244, '#e8762e')) +
      diff(165, 250, 38, shutters(150, 230, '#3f8f5a'), shutters(150, 230, '#d6338a')) +
      board(275, 300) +
      diff(275, 300, 34, scrolls(275, 300, '#ffd23f'), scrolls(275, 300, '#4dabf7')) +
      [55, 165, 275].map((x) => `<rect x="${x - 15}" y="330" width="30" height="50" fill="#5c3d24"/>`).join('') +
      // La Boca, right
      panel(470, 110, 180, '#8ac926') +
      panel(580, 110, 200, '#ff9f43') +
      panel(690, 110, 166, '#b38cff') +
      window(500, 210) +
      window(610, 230) +
      window(720, 200) +
      [525, 635, 745].map((x) => `<rect x="${x - 15}" y="330" width="30" height="50" fill="#5c3d24"/>`).join('') +
      // Laundry line
      `<path d="M330 200Q400 212 470 200" fill="none" stroke="#3d4a55" stroke-width="1.6"/>` +
      diff(368, 222, 24, trousers(368, 205, '#2b59c3'), trousers(368, 205, '#2a9d8f')) +
      diff(432, 219, 28, flutter(1), flutter(2.4), 'shirt') +
      // Street
      `<rect y="380" width="800" height="120" fill="#c9bfae"/><path d="M0 386H800" stroke="#a89c88" stroke-width="4"/>` +
      jacaranda(520, 488) +
      diff(548, 360, 22, flowers(548, 360, '#6a3fb0'), flowers(548, 360, '#f4f4f4')) +
      person(262, 488, '#1d1d1d') +
      diff(262, 423, 20, fedora(262, 488), '') +
      dancerTop(330, 488) +
      diff(334, 455, 42, dress(330, 488, '#c9302c'), dress(330, 488, '#8338ec')) +
      player(680, 490) +
      diff(672, 437, 20, bellows(676, 490, '#c9302c'), bellows(676, 490, '#3fa46f')) +
      // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
      decor({ anim }, [
        ['suitcase', 184, 468, '#3a86ff'],
        ['bin', 588, 468, '#2a9d8f'],
        ['coffeeCup', 396, 416],
        ['shoppingBag', 732, 420, '#ff6b8b'],
        ['pigeon', 68, 444],
        ['birds', 132, 96],
        ['cloud', 644, 140],
      ]) +
      extras({ extra, anim }, [
        ['ball', 480, 484, '#ffd23f'],
        ['bollard', 736, 492],
        ['skateboard', 424, 464, '#e63946'],
        ['suitcase', 120, 488, '#ffd23f'],
        ['birds', 332, 60],
      ])
    )
  },
})
