// Motion differences: a landing pad light blinks only on picture B; the left astronaut hops only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level142Redesign } from './level-142-redesign.ts'
import { astronaut, beacon, crater, crystal, dome, flag, fuelCanister, moonPebbles, rover, sparkle, starField, toolbox } from './shapes.ts'

/** Lunar lander; (x, y) = pad center. Bounds: x ±40, y from −70 to 0. */
const lander = (x: number, y: number) =>
  `<path d="M${x - 30} ${y}l10 -26M${x + 30} ${y}l-10 -26" stroke="#bfc7d5" stroke-width="3"/><path d="M${x - 36} ${y}h12M${x + 24} ${y}h12" stroke="#bfc7d5" stroke-width="3"/>` +
  `<rect x="${x - 22}" y="${y - 40}" width="44" height="16" fill="#ffd166"/><path d="M${x - 16} ${y - 40}l6 -26h20l6 26Z" fill="#e6e6f0"/><rect x="${x - 6}" y="${y - 58}" width="12" height="10" fill="#3a86ff"/>`

const padLight = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="7" fill="#7dff6a" fill-opacity="0.3"/><circle cx="${x}" cy="${y}" r="3.5" fill="#7dff6a"/>`

/** Solar panel, 44 × 26, with `cols` columns; (x, y) = center, on a post. */
const solar = (x: number, y: number, cols: number) => {
  let s = `<path d="M${x} ${y + 13}v16" stroke="#8d99ae" stroke-width="3"/><rect x="${x - 22}" y="${y - 13}" width="44" height="26" fill="#2b4c9e" stroke="#c9d1da" stroke-width="2"/>`
  for (let i = 1; i < cols; i++) s += `<path d="M${x - 22 + (44 * i) / cols} ${y - 13}v26" stroke="#8fa8d8" stroke-width="1.2"/>`
  return s
}

/** Dish bowl tilted on its mount at (x, y). Bounds: x ±22, y from −24 to +4. */
const bowl = (x: number, y: number) => `<path d="M${x - 22} ${y - 14}q22 30 44 0Z" fill="#e6e6f0"/><path d="M${x} ${y - 4}v-18" stroke="#5c677d" stroke-width="2"/><circle cx="${x}" cy="${y - 22}" r="3" fill="#e63946"/>`

/** Tiny probe satellite; (x, y) = center. Bounds: x ±18, y ±6. */
const probe = (x: number, y: number) => `<rect x="-5" y="-5" width="10" height="10" fill="#ffd166" transform="translate(${x} ${y})"/><rect x="${x - 18}" y="${y - 3}" width="12" height="6" fill="#3a86ff"/><rect x="${x + 6}" y="${y - 3}" width="12" height="6" fill="#3a86ff"/>`

const crate = (x: number, y: number) => `<rect x="${x - 12}" y="${y - 20}" width="24" height="20" fill="#8d99ae"/><path d="M${x - 12} ${y - 10}h24" stroke="#5c677d" stroke-width="2"/><rect x="${x - 4}" y="${y - 16}" width="8" height="4" fill="#ffb703"/>`

const sprout = (x: number, y: number, s: number) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0v-14" stroke="#3f8f3a" stroke-width="2"/><ellipse cx="-5" cy="-12" rx="6" ry="3" fill="#5fae4b"/><ellipse cx="5" cy="-16" rx="6" ry="3" fill="#5fae4b"/></g>`

export default svgLevel({
  id: 142,
  chapter: 'space',
  title: 'lunarBase',
  parTimeSec: 135,
  redesign: level142Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let prints = ''
    for (let i = 0; i < 8; i++) prints += `<ellipse cx="${236 + i * 16}" cy="${474 - (i % 2) * 6}" rx="4" ry="2" fill="#8f8ca2"/>`
    const hop = (moving: boolean) => (moving ? anim({ type: 'bob', dx: 0, dy: -6, period: 1.6 }, astronaut(200, 470, '#f1f1f1', '#ffb703')) : astronaut(200, 470, '#f1f1f1', '#ffb703'))

    return (
      `<rect width="800" height="500" fill="#07091a"/>` + starField(rand, 0, 240, 70) + sparkle(420, 50, 6) +
      `<circle cx="650" cy="80" r="34" fill="#2f6fbf"/><path d="M630 64q16 -8 30 4q-6 18 -24 14Z" fill="#4caf6a"/><path d="M650 46a34 34 0 0 1 0 68a26 34 0 0 0 0 -68Z" fill="#000" fill-opacity="0.35"/>` +
      diff(300, 90, 22, '', probe(300, 90)) +
      `<path d="M0 270Q140 220 300 260T560 240T800 260V320H0Z" fill="#7d7a8f"/>` +
      `<rect y="290" width="800" height="210" fill="#a9a6b8"/>` +
      crater(60, 330, 30) + crater(420, 420, 24) + crater(700, 470, 34) + crater(560, 400, 14) + diff(330, 470, 26, crater(330, 470, 22), '') +
      // Domes and tubes
      `<rect x="360" y="312" width="70" height="12" fill="#d0d4de"/><rect x="480" y="316" width="60" height="10" fill="#d0d4de"/>` +
      dome(300, 340, 70) + sprout(270, 334, 1) + sprout(310, 336, 1.1) + diff(292, 320, 22, sprout(290, 334, 1), sprout(290, 334, 1.35)) +
      dome(450, 340, 36) +
      diff(560, 330, 32, dome(560, 340, 30), dome(560, 340, 30, '#c9b8f0')) +
      // Landing pad
      `<ellipse cx="140" cy="390" rx="60" ry="12" fill="#6f6c80"/><path d="M110 390h60" stroke="#ffd23f" stroke-width="3" stroke-dasharray="8 6"/>` +
      lander(140, 386) + padLight(180, 392) +
      diff(100, 392, 22, padLight(100, 392), anim({ type: 'blink', duty: 0.5, period: 0.9 }, padLight(100, 392))) +
      // Solar farm and the dish
      solar(668, 340, 3) + solar(730, 352, 3) + diff(700, 390, 26, solar(700, 390, 3), solar(700, 390, 4)) +
      `<path d="M710 296L720 270L730 296" stroke="#8d99ae" stroke-width="4" fill="none"/>` +
      diff(720, 256, 26, bowl(720, 270), `<g transform="rotate(-26 720 266)">${bowl(720, 270)}</g>`) +
      // Ground: rover, crates, astronauts, flag
      diff(520, 448, 30, rover(520, 466, '#ffb703'), rover(520, 466, '#f29a3a')) +
      crate(604, 470) + diff(636, 458, 24, crate(632, 470), crate(642, 470)) +
      prints + diff(200, 444, 37, hop(false), hop(true)) + astronaut(380, 486, '#f1f1f1', '#3a86ff', true) +
      flag(80, 486, '#e63946') +
      beacon(260, 410) +
      toolbox(480, 395) +
      fuelCanister(440, 474) +
      crystal(770, 470) +
      moonPebbles(40, 420) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['probe', 321, 240],
        ['spaceStar', 592, 171],
        ['ringPlanet', 133, 84],
        ['crater', 367, 416],
        ['crystal', 217, 366, '#b38cff'],
      ])
    )
  },
})
