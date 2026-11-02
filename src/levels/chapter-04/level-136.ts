// Motion differences: the rowboat bobs faster on picture B; the sailboat's masthead pennant flaps only on B.
import { svgLevel } from '../helpers.ts'
import { buoy, cloud, gull, gullStanding, lifeRing, person } from './shapes.ts'

/** Harbor house; (x, y) = bottom-left, w × h. */
const house = (x: number, y: number, w: number, h: number, wall: string, roof: string) =>
  `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${wall}"/><path d="M${x - 4} ${y - h}l${w / 2 + 4} -24l${w / 2 + 4} 24Z" fill="${roof}"/>` +
  `<rect x="${x + 8}" y="${y - h + 12}" width="12" height="14" fill="#bde3f2"/><rect x="${x + w - 20}" y="${y - h + 12}" width="12" height="14" fill="#bde3f2"/>`

const door = (x: number, y: number, color: string) => `<rect x="${x - 8}" y="${y - 24}" width="16" height="24" rx="2" fill="${color}"/>`

/** Fishing boat with a cabin, faces right; (x, y) = waterline middle; `ports` cabin portholes. Bounds: x ±56, y from −52 to +8. */
const fishingBoat = (x: number, y: number, stripe: string, ports: number) => {
  let s =
    `<path d="M${x - 56} ${y - 16}h112l-14 24h-86Z" fill="#f4f4f4"/><path d="M${x - 54} ${y - 8}h108" stroke="${stripe}" stroke-width="5"/>` +
    `<rect x="${x - 10}" y="${y - 44}" width="40" height="28" fill="#f4f4f4" stroke="#8d99ae" stroke-width="2"/><path d="M${x - 30} ${y - 16}V${y - 52}" stroke="#6b6b70" stroke-width="3"/>`
  for (let i = 0; i < ports; i++) s += `<circle cx="${x - 2 + (24 * i) / Math.max(1, ports - 1)}" cy="${y - 30}" r="4" fill="#3a86ff"/>`
  return s
}

/** Rowboat, faces right; (x, y) = waterline middle. Bounds: x ±28, y from −10 to +6. */
const rowboat = (x: number, y: number) => `<path d="M${x - 28} ${y - 8}h56l-8 14h-40Z" fill="#c0573f"/><path d="M${x - 26} ${y - 4}h52" stroke="#f4ecd8" stroke-width="2"/>`

const pennant = (x: number, y: number) => `<path d="M${x} ${y}l18 5l-18 5Z" fill="#3a86ff"/>`

const crate = (x: number, y: number) => `<rect x="${x - 12}" y="${y - 20}" width="24" height="20" fill="#c68b4e"/><path d="M${x - 12} ${y - 10}h24M${x} ${y - 20}v20" stroke="#8a5a33" stroke-width="2"/>`

export default svgLevel({
  id: 136,
  chapter: 'sea',
  title: 'boatPort',
  parTimeSec: 110,
  scene: ({ diff, anim, rand }) => {
    let reflections = ''
    for (let i = 0; i < 24; i++) reflections += `<rect x="${(rand() * 780).toFixed(1)}" y="${(270 + rand() * 220).toFixed(1)}" width="${(14 + rand() * 20).toFixed(1)}" height="2" fill="#bde3f2" fill-opacity="0.5"/>`
    let stones = ''
    for (let x = 0; x < 800; x += 32) stones += `<rect x="${x + 1}" y="236" width="30" height="11" fill="#b8b2a6"/><rect x="${x + 17}" y="249" width="30" height="11" fill="#a9a398"/>`
    const pier = (x: number) => {
      let s = `<rect x="${x - 14}" y="260" width="28" height="210" fill="#a0703f"/>`
      for (let y = 266; y < 470; y += 12) s += `<path d="M${x - 14} ${y}h28" stroke="#8a5a33" stroke-width="1.5"/>`
      for (const y of [300, 380, 460]) s += `<rect x="${x - 20}" y="${y - 6}" width="8" height="24" fill="#6b4226"/><rect x="${x + 12}" y="${y - 6}" width="8" height="24" fill="#6b4226"/>`
      return s
    }
    const rocking = (period: number) => anim({ type: 'bob', dx: 0, dy: -4, period }, rowboat(380, 452))
    const flapping = (moving: boolean) => (moving ? anim({ type: 'sway', angle: 14, pivot: [766, 300], period: 0.9 }, pennant(766, 296)) : pennant(766, 296))

    return (
      `<rect width="800" height="500" fill="#cfe9fb"/>` + cloud(120, 50, 0.6) + anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(520, 60, 0.5)) +
      `<path d="M0 150Q200 90 420 140T800 120V240H0Z" fill="#9fc98a"/>` +
      // Houses on the quay
      house(20, 236, 70, 90, '#f2cc8f', '#c0573f') + house(96, 236, 80, 110, '#7aa6d6', '#4a6f9a') + house(182, 236, 60, 80, '#e07a5f', '#8c3a2b') +
      house(248, 236, 76, 100, '#81b29a', '#4a7a5a') + house(330, 236, 64, 86, '#ffd6a5', '#c98a4a') + house(400, 236, 80, 120, '#c98bb9', '#7a4a6a') +
      house(486, 236, 66, 90, '#f2cc8f', '#8c3a2b') + house(558, 236, 74, 104, '#bdb2ff', '#6a5aa8') + house(640, 236, 70, 84, '#e07a5f', '#8c3a2b') + house(716, 236, 84, 112, '#81b29a', '#4a7a5a') +
      door(60, 236, '#6b4226') + diff(136, 222, 22, door(136, 236, '#2a6f5a'), door(136, 236, '#3a7f6a')) + door(290, 236, '#6b4226') + door(440, 236, '#2a6f5a') + door(600, 236, '#6b4226') + door(760, 236, '#2a6f5a') +
      stones +
      crate(300, 236) + diff(326, 224, 22, crate(326, 236), '') + crate(350, 236) + crate(338, 216) +
      `<path d="M460 236q20 -20 40 0Z" fill="#7a9a8a"/><path d="M466 232l8 -10M476 232l8 -12M486 232l6 -10" stroke="#5a7a6a" stroke-width="1.5"/>` +
      // Water and piers
      `<rect y="260" width="800" height="240" fill="#3a8fbf"/>` + reflections +
      pier(220) + pier(560) +
      diff(220, 284, 22, '', gullStanding(220, 296)) + gullStanding(560, 376, true) +
      `<path d="M246 400h6" stroke="#6b4226" stroke-width="3"/>` + diff(252, 404, 24, lifeRing(252, 404), `<g transform="translate(252 404) scale(1.3) translate(-252 -404)">${lifeRing(252, 404)}</g>`) +
      // Fisherman on the right pier
      person(560, 330, '#e9c46a') +
      diff(590, 294, 31, `<path d="M566 306L616 282" stroke="#5a3d2b" stroke-width="2"/>`, `<g transform="rotate(-10 566 306)"><path d="M566 306L616 282" stroke="#5a3d2b" stroke-width="2"/></g>`) +
      `<path d="M616 282q6 40 4 96" stroke="#f4f4f4" stroke-width="0.8" stroke-opacity="0.7" fill="none"/>` +
      // Boats
      fishingBoat(390, 364, '#e63946', 2) +
      diff(400, 318, 22, `<rect x="380" y="315" width="40" height="5" fill="#e63946"/>`, `<rect x="380" y="315" width="40" height="5" fill="#d9603a"/>`) +
      diff(380, 450, 30, rocking(2.4), rocking(0.9)) +
      fishingBoat(100, 340, '#3a86ff', 2) +
      diff(700, 390, 22, fishingBoat(690, 420, '#2a9d8f', 2), fishingBoat(690, 420, '#2a9d8f', 3)) +
      `<path d="M740 456h56l-8 12h-40Z" fill="#3a86ff"/><path d="M766 456V296" stroke="#6b6b70" stroke-width="3"/><path d="M770 300l26 140h-26Z" fill="#f4f4f4"/><path d="M762 310l-30 130h30Z" fill="#f4f4f4" fill-opacity="0.85"/>` +
      diff(776, 302, 22, flapping(false), flapping(true)) +
      diff(120, 440, 26, buoy(114, 446, '#ffb703'), buoy(128, 446, '#ffb703')) +
      gull(480, 120) + anim({ type: 'path', points: [[0, 0], [-160, 20]], period: 16 }, gull(760, 80))
    )
  },
})
