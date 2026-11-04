// Motion differences: smoke rises from the middle chimney only on picture B; the red shirt on the line swings faster on B.
import { bird } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { flowerPot, wateringCan } from '../shapes.ts'
import { ball, coffeeCup, flowerBox, pigeon, skyline } from './shapes.ts'

/** TV antenna; (x, y) = mast foot. Bounds: x ±14, y from −52 to 0. */
const antenna = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" stroke="#3d4a55" stroke-width="2.5" fill="none">` +
  `<path d="M0 0V-52M-14 -46h28M-11 -38h22M-8 -30h16M-5 -22h10"/></g>`

/** Tiled sloped roof: from (x0, y0) eaves to the ridge at y1, rows of tile lines. */
const tiles = (x0: number, x1: number, ridge: number, eaves: number, color: string, line: string) => {
  let s = `<path d="M${x0} ${eaves}L${x0 + 30} ${ridge}H${x1 - 30}L${x1} ${eaves}Z" fill="${color}"/>`
  for (let y = ridge + 12; y < eaves; y += 12) {
    const k = (y - ridge) / (eaves - ridge)
    s += `<path d="M${x0 + 30 - 30 * k} ${y}H${x1 - 30 + 30 * k}" stroke="${line}" stroke-width="2"/>`
  }
  return s
}

/** Chimney; (x, y) = top of the stack (pots sit on it). Bounds: x ±14, y from −14 to +40. */
const chimney = (x: number, y: number) =>
  `<rect x="${x - 14}" y="${y}" width="28" height="40" fill="#b5523b"/><rect x="${x - 16}" y="${y - 2}" width="32" height="6" fill="#8c3a2b"/>` +
  `<path d="M${x - 14} ${y + 14}h28M${x - 14} ${y + 26}h28" stroke="#8c3a2b" stroke-width="1.5"/>`
const pot = (x: number, y: number) => `<rect x="${x - 4}" y="${y - 12}" width="8" height="12" fill="#d07a4a"/><rect x="${x - 5}" y="${y - 13}" width="10" height="3" fill="#8c3a2b"/>`

/** Satellite dish; (x, y) = mount foot, dish radius r. */
const dish = (x: number, y: number, r: number) =>
  `<path d="M${x} ${y}v-${r * 0.6}" stroke="#8d99ae" stroke-width="3"/>` +
  `<ellipse cx="${x - r * 0.3}" cy="${y - r}" rx="${r}" ry="${r * 0.7}" fill="#e6e6f0" transform="rotate(-25 ${x - r * 0.3} ${y - r})"/>` +
  `<path d="M${x - r * 0.3} ${y - r}l${r * 0.7} ${-r * 0.2}" stroke="#8d99ae" stroke-width="2"/><circle cx="${x + r * 0.4}" cy="${y - r * 1.2}" r="2" fill="#8d99ae"/>`

/** Solar panel, 48 × 26, with `cols` × 2 cells; (x, y) = center. */
const solar = (x: number, y: number, cols: number) => {
  let s = `<rect x="${x - 24}" y="${y - 13}" width="48" height="26" fill="#2b4c7e" stroke="#c9d1da" stroke-width="2"/><path d="M${x - 24} ${y}h48" stroke="#c9d1da" stroke-width="1.5"/>`
  for (let i = 1; i < cols; i++) s += `<path d="M${x - 24 + (48 * i) / cols} ${y - 13}v26" stroke="#c9d1da" stroke-width="1.5"/>`
  return s
}

const smoke = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="6" fill="#d9d2cc" fill-opacity="0.8"/><circle cx="${x + 6}" cy="${y - 10}" r="7" fill="#d9d2cc" fill-opacity="0.6"/><circle cx="${x + 2}" cy="${y - 22}" r="6" fill="#d9d2cc" fill-opacity="0.45"/>`

/** Shirt pinned to a line at (x, y). Bounds: x ±13, y from 0 to +26. */
const shirt = (x: number, y: number, color: string) => `<path d="M${x - 13} ${y}h26l-2 8h-4v18h-14v-18h-4Z" fill="${color}"/>`

export default svgLevel({
  id: 113,
  chapter: 'city',
  title: 'antennaRoofs',
  parTimeSec: 110,
  scene: ({ diff, anim, rand, extra }) => {
    let midRoofs = ''
    for (let i = 0; i < 6; i++) {
      const x = i * 140 - 20
      const top = 300 + (i % 2) * 14
      midRoofs += tiles(x, x + 150, top, top + 50, i % 2 ? '#c98a6a' : '#b5735a', '#9a5a44')
      midRoofs += `<rect x="${x + 4}" y="${top + 50}" width="142" height="40" fill="${i % 2 ? '#e8d5b0' : '#d9c4a0'}"/>`
      for (let k = 0; k < 3; k++) midRoofs += `<rect x="${x + 22 + k * 42}" y="${top + 60}" width="14" height="18" fill="#ffe1a0"/>`
    }
    const swinging = (period: number) => anim({ type: 'sway', angle: 12, pivot: [244, 404], period }, shirt(244, 404, '#e63946'))

    return (
      `<rect width="800" height="500" fill="#ffc89a"/><rect width="800" height="120" fill="#ffd9b5"/>` +
      `<circle cx="560" cy="120" r="40" fill="#ffe08a"/><circle cx="560" cy="120" r="58" fill="#ffe08a" fill-opacity="0.35"/>` +
      anim({ type: 'path', points: [[0, 0], [-520, 30]], period: 40 }, `<path d="M700 50h30l8 -6h4l-4 8h-38Z" fill="#8d99ae"/><path d="M714 52l-6 8h6l8 -8Z" fill="#6b7480"/>`) +
      `<path d="M180 60q5 -6 10 0q5 -6 10 0M210 76q4 -5 8 0q4 -5 8 0M420 40q5 -6 10 0q5 -6 10 0" stroke="#7a5a6a" stroke-width="2" fill="none"/>` +
      skyline(rand, 290, '#c9a6b8') +
      // Left tiled roof with a chimney and an antenna
      `<rect x="0" y="260" width="270" height="60" fill="#e8d5b0"/>` +
      tiles(-30, 280, 170, 262, '#a85a44', '#8c4a36') +
      chimney(190, 140) + pot(182, 138) + diff(198, 134, 22, pot(198, 138), '') +
      diff(88, 144, 30, antenna(90, 172), `<g transform="rotate(-12 90 172)">${antenna(90, 172)}</g>`) +
      pigeon(40, 172, false, '#8d99ae') +
      // Flat roof with a water tank and a dish
      `<rect x="270" y="220" width="200" height="100" fill="#d9c4a0"/><rect x="264" y="214" width="212" height="10" fill="#bfa88a"/>` +
      `<path d="M330 214v-20M390 214v-20" stroke="#6b4a3a" stroke-width="4"/><rect x="318" y="150" width="84" height="46" rx="6" fill="#8a5a44"/>` +
      `<path d="M318 162h84M318 184h84" stroke="#6b4a3a" stroke-width="3"/><path d="M314 152l46 -16l46 16Z" fill="#6b4a3a"/>` +
      diff(440, 196, 26, dish(440, 214, 14), dish(440, 214, 17)) +
      pigeon(300, 214, true, '#a3aab3') + antenna(288, 214) +
      // Right roof with skylights and a solar panel
      `<rect x="470" y="276" width="330" height="44" fill="#e8d5b0"/>` +
      tiles(460, 830, 190, 280, '#8f6a5a', '#735244') +
      `<rect x="520" y="214" width="26" height="22" fill="#bde3f2" stroke="#f4efe6" stroke-width="3"/><rect x="640" y="230" width="26" height="22" fill="#bde3f2" stroke="#f4efe6" stroke-width="3"/>` +
      diff(596, 248, 28, solar(596, 248, 3), solar(596, 248, 4)) +
      antenna(720, 192) + antenna(760, 196) + chimney(680, 176) + pot(680, 174) +
      midRoofs +
      chimney(330, 278) + pot(324, 276) + pot(338, 276) +
      diff(334, 248, 24, smoke(334, 262), anim({ type: 'bob', dx: 4, dy: -6, period: 1.6 }, smoke(334, 262))) +
      antenna(560, 302) + antenna(120, 312) +
      // Front terrace
      `<rect y="390" width="800" height="110" fill="#b9aea0"/><path d="M0 410h800M0 440h800M0 470h800" stroke="#a89c8e" stroke-width="2"/>` +
      `<rect y="380" width="800" height="14" fill="#d9cbb8"/>` +
      `<path d="M120 500V396M380 500V396" stroke="#6b6b70" stroke-width="4"/><path d="M120 402Q250 420 380 402" stroke="#8d99ae" stroke-width="1.5" fill="none"/>` +
      shirt(160, 408, '#7aa6d6') + `<path d="M196 410h10v18h-10ZM212 411h10v18h-10Z" fill="#f4f1e8"/>` +
      diff(244, 418, 24, swinging(2.2), swinging(0.9)) +
      `<path d="M290 410h30v22h-30Z" fill="#ffd166"/><path d="M332 406h20v14h-20Z" fill="#8ac926"/>` +
      // Deck chairs, plants, the cat and the stair hut
      `<path d="M430 486l20 -40h30M444 486l30 -36" stroke="#3a86ff" stroke-width="5" fill="none"/><path d="M430 486l26 -34" stroke="#3a86ff" stroke-width="12" stroke-opacity="0.5"/>` +
      flowerBox(70, 470, '#ff6b8b') +
      `<path d="M500 480h40l-6 -22h-28Z" fill="#c68b4e"/><circle cx="512" cy="448" r="10" fill="#4caf6a"/><circle cx="528" cy="444" r="12" fill="#5fae4b"/>` +
      diff(588, 474, 24, `<path d="M572 486h32l-5 -20h-22Z" fill="#e07a5f"/>`, `<path d="M572 486h32l-5 -20h-22Z" fill="#cf8a5a"/>`) +
      `<path d="M588 466v-20M588 452l-8 -6M588 448l8 -6" stroke="#3f8f3a" stroke-width="3"/>` +
      `<g transform="translate(400 380)" fill="#3d3d3d"><ellipse cy="-10" rx="10" ry="11"/><circle cy="-24" r="7"/><path d="M-6 -28l1 -7l4 4ZM6 -28l-1 -7l-4 4Z"/></g>` +
      `<rect x="680" y="310" width="120" height="80" fill="#c9b79c"/><path d="M670 312h140" stroke="#8a7a6a" stroke-width="8"/><rect x="706" y="334" width="34" height="56" fill="#6b5a4a"/>` +
      bird(680, 176) +
      ball(150, 488) +
      flowerPot(380, 482) +
      coffeeCup(650, 482) +
      wateringCan(720, 482) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['birds', 324, 57],
        ['cloud', 712, 59],
        ['balloon', 471, 45, '#8ac926'],
        ['bin', 232, 302],
        ['ball', 721, 302, '#e63946'],
      ])
    )
  },
})
