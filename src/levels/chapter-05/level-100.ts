// Motion differences: the big firework bursts faster on picture B; the dancer on stage hops faster on B; the disco ball spins only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { alien, alienPlant, astronaut, crystal, helmet, moonPebbles, probe, robot, star, starField } from './shapes.ts'

/** Firework burst; (x, y) = center. Bounds: radius r + 3. */
const burst = (x: number, y: number, r: number, color: string) => {
  let rays = ''
  for (let a = 0; a < 360; a += 30) {
    const c = Math.cos((a * Math.PI) / 180)
    const s = Math.sin((a * Math.PI) / 180)
    rays += `<path d="M${(x + c * r * 0.35).toFixed(1)} ${(y + s * r * 0.35).toFixed(1)}L${(x + c * r * 0.85).toFixed(1)} ${(y + s * r * 0.85).toFixed(1)}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`
    rays += `<circle cx="${(x + c * r).toFixed(1)}" cy="${(y + s * r).toFixed(1)}" r="3" fill="${color}"/>`
  }
  return rays
}

/** Bunting flag hanging at (x, y). Bounds: x ±8, y from 0 to +16. */
const pennant = (x: number, y: number, color: string) => `<path d="M${x - 8} ${y}h16l-8 16Z" fill="${color}"/>`

/** Balloon on a string; (x, y) = balloon center. Bounds: x ±12, y from −15 to +30. */
const balloon = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y + 15}q4 8 0 15" stroke="#e6e6f0" stroke-width="1.5" fill="none"/><ellipse cx="${x}" cy="${y}" rx="12" ry="15" fill="${color}"/><circle cx="${x - 4}" cy="${y - 6}" r="3" fill="#fff" fill-opacity="0.5"/>`

/** Disco ball; (x, y) = center. Bounds: radius 14. */
const disco = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="14" fill="#d0d4de"/><rect x="${x - 10}" y="${y - 10}" width="9" height="9" fill="#ff6bd6"/><rect x="${x + 1}" y="${y + 1}" width="9" height="9" fill="#3ae0ff"/>` +
  `<rect x="${x + 1}" y="${y - 10}" width="9" height="9" fill="#fff"/><rect x="${x - 10}" y="${y + 1}" width="9" height="9" fill="#ffd166"/>`

const BUNTING = ['#ff6b8b', '#ffd166', '#3ae0ff', '#8ac926']

export default svgLevel({
  id: 100,
  chapter: 'space',
  title: 'starFestival',
  parTimeSec: 150,
  scene: ({ diff, anim, rand, extra }) => {
    const bursting = (period: number) => anim({ type: 'blink', duty: 0.55, period }, burst(140, 160, 44, '#ffd166'))
    const hopping = (period: number) => anim({ id: 'dancer', type: 'bob', dx: 0, dy: 10, period }, alien(400, 340, '#8ac926', 2))
    const ball = disco(400, 230)
    let bunting = `<path d="M0 40Q200 120 400 40Q600 120 800 40" stroke="#e6e6f0" stroke-width="2" fill="none"/>`
    let bulbs = ''
    for (let i = 0; i < 16; i++) {
      const x = 25 + i * 50
      const t = (x % 400) / 400
      if (x !== 325) bunting += pennant(x, Math.round(40 + 80 * t * (1 - t)), BUNTING[i % 4])
    }
    for (let a = 15; a < 180; a += 15) {
      if (a === 60) continue
      const r = (a * Math.PI) / 180
      bulbs += `<circle cx="${(400 + 160 * Math.cos(r)).toFixed(1)}" cy="${(340 - 160 * Math.sin(r)).toFixed(1)}" r="6" fill="${BUNTING[(a / 15) % 4]}"/>`
    }

    return (
      `<rect width="800" height="500" fill="#1d1240"/><rect y="240" width="800" height="160" fill="#2e1d5c"/>` +
      starField(rand, 0, 300, 60) +
      diff(760, 260, 18, star(760, 260, 9, '#fff3b0'), '') +
      anim({ type: 'blink', duty: 0.5, period: 2.6 }, burst(400, 100, 30, '#ff6bd6')) +
      diff(140, 160, 47, bursting(1.8), bursting(0.8)) +
      diff(660, 160, 43, burst(660, 160, 40, '#3ae0ff'), burst(660, 160, 40, '#8ac926')) +
      bunting +
      diff(325, 60, 18, pennant(325, 52, BUNTING[2]), pennant(325, 52, '#e63946')) +
      // Stage
      `<path d="M240 340A160 160 0 0 1 560 340" stroke="#8338ec" stroke-width="12" fill="none"/>` +
      bulbs +
      diff(480, 201, 18, `<circle cx="480" cy="201.4" r="6" fill="#ffd166"/>`, `<circle cx="480" cy="201.4" r="6" fill="#ff3b3b"/>`) +
      `<path d="M400 186v30" stroke="#e6e6f0" stroke-width="2"/>` +
      diff(400, 230, 18, ball, anim({ type: 'rotate', pivot: [400, 230], period: 2 }, ball)) +
      `<path d="M300 340L260 250h20ZM500 340L540 250h-20Z" fill="#fff7a1" fill-opacity="0.15"/>` +
      `<rect x="220" y="340" width="360" height="32" fill="#8338ec"/><rect x="220" y="340" width="360" height="6" fill="#b38cff"/>` +
      robot(320, 340, '#bfc7d5', '#ff6bd6') +
      diff(400, 316, 29, hopping(1.2), hopping(0.5), 'dancer') +
      diff(483, 298, 18, astronaut(480, 340, '#f1f1f1', '#ffb703'), astronaut(480, 340, '#f1f1f1', '#ff6bd6')) +
      // Crowd
      `<rect y="400" width="800" height="100" fill="#3b2a6e"/>` +
      alien(120, 480, '#ff9f43', 2) +
      diff(130, 392, 18, balloon(130, 392, '#ff6b8b'), balloon(130, 392, '#3ae0ff')) +
      alien(220, 486, '#3ae0ff') +
      astronaut(300, 490, '#ffb703', '#3ae0ff') +
      alien(520, 484, '#ff6b8b', 2) +
      robot(600, 490, '#8d99ae') +
      alien(690, 480, '#8ac926') +
      diff(680, 392, 30, balloon(680, 380, '#ffd166'), '') +
      alien(760, 488, '#b38cff', 2) +
      probe(170, 280) +
      alienPlant(165, 472) +
      crystal(555, 476) +
      helmet(645, 476) +
      moonPebbles(390, 476) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['crater', 635, 341],
        ['alienPlant', 60, 432],
        ['crystal', 486, 457, '#7bdff2'],
        ['moonPebbles', 224, 280],
        ['crater', 256, 452],
        ['ringPlanet', 744, 110],
        ['asteroid', 503, 98],
        ['ufo', 306, 147],
        ['spaceStar', 50, 83],
        ['sparkle', 55, 226],
      ])
    )
  },
})
