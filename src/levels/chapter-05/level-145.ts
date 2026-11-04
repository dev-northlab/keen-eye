// Motion differences: the beacon on the rocket tip blinks only on picture B; the dust devil spins faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { astronaut, crystal, dome, flag, fuelCanister, helmet, moonPebbles, rocket, rover, starField, toolbox } from './shapes.ts'

/** Robot with `eye` color; (x, y) = feet. Bounds: x ±16, y from −54 to 0. */
const bot = (x: number, y: number, eye: string) =>
  `<g transform="translate(${x} ${y})"><rect x="-10" y="-12" width="6" height="12" fill="#5c677d"/><rect x="4" y="-12" width="6" height="12" fill="#5c677d"/>` +
  `<rect x="-11" y="-34" width="22" height="22" rx="3" fill="#c9d1da"/><rect x="-9" y="-50" width="18" height="14" rx="3" fill="#c9d1da"/>` +
  `<rect x="-6" y="-46" width="12" height="5" rx="2" fill="${eye}"/><path d="M-13 -30v14M13 -30v14" stroke="#5c677d" stroke-width="5" stroke-linecap="round"/></g>`

/** Solar panel on a stand, tilted; (x, y) = stand foot. Bounds: x ±26, y from −34 to 0. */
const solar = (x: number, y: number) =>
  `<path d="M${x} ${y}v-16" stroke="#8d99ae" stroke-width="3"/><g transform="translate(${x} ${y - 20}) rotate(-12)"><rect x="-24" y="-10" width="48" height="20" fill="#2b4c9e" stroke="#c9d1da" stroke-width="2"/><path d="M-8 -10v20M8 -10v20M-24 0h48" stroke="#8fa8d8" stroke-width="1.2"/></g>`

/** Skylight grid, 40 × 28, with `cols` columns; (x, y) = center. */
const skylight = (x: number, y: number, cols: number) => {
  let s = `<rect x="${x - 20}" y="${y - 14}" width="40" height="28" fill="#bde3f2" stroke="#e6e6f0" stroke-width="2"/><path d="M${x - 20} ${y}h40" stroke="#e6e6f0" stroke-width="2"/>`
  for (let i = 1; i < cols; i++) s += `<path d="M${x - 20 + (40 * i) / cols} ${y - 14}v28" stroke="#e6e6f0" stroke-width="2"/>`
  return s
}

/** Dust devil swirl; (x, y) = center. Bounds: radius 26. */
const devil = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="none" stroke="#f4c9a0" stroke-linecap="round"><path d="M-24 4q24 -16 48 0" stroke-width="5" stroke-opacity="0.8"/>` +
  `<path d="M-18 -8q18 -12 36 0" stroke-width="4" stroke-opacity="0.6"/><path d="M-12 -18q12 -8 24 0" stroke-width="3" stroke-opacity="0.5"/><path d="M-20 14q18 10 34 -2" stroke-width="4" stroke-opacity="0.5"/></g>`

const beacon = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="7" fill="#ff4d4d" fill-opacity="0.35"/><circle cx="${x}" cy="${y}" r="3.5" fill="#ff4d4d"/>`

const marsRock = (x: number, y: number, s = 1) => `<path d="M${x - 14 * s} ${y}q2 -12 12 -12q14 0 16 12Z" fill="#a8502e"/>`

export default svgLevel({
  id: 145,
  chapter: 'space',
  title: 'marsColony',
  parTimeSec: 120,
  scene: ({ diff, anim, rand, extra }) => {
    let pebbles = ''
    for (let i = 0; i < 40; i++) pebbles += `<circle cx="${(rand() * 800).toFixed(1)}" cy="${(300 + rand() * 196).toFixed(1)}" r="${(1.5 + rand() * 2).toFixed(1)}" fill="#b8603a"/>`
    const spinning = (period: number) => anim({ type: 'rotate', pivot: [340, 420], period }, devil(340, 420))

    return (
      `<rect width="800" height="500" fill="#e89a6a"/><rect width="800" height="120" fill="#f2b28a"/>` + starField(rand, 0, 80, 14) +
      `<circle cx="200" cy="70" r="14" fill="#c9b8a0"/><circle cx="196" cy="66" r="3" fill="#a89880"/>` +
      diff(280, 50, 22, `<circle cx="280" cy="50" r="8" fill="#d9c8b0"/>`, '') +
      `<ellipse cx="470" cy="90" rx="110" ry="10" fill="#f8d0b0" fill-opacity="0.6"/><ellipse cx="660" cy="150" rx="90" ry="8" fill="#f8d0b0" fill-opacity="0.5"/>` +
      anim({ type: 'path', points: [[0, 0], [-300, 40]], period: 20 }, `<path d="M720 40l-30 6" stroke="#fff" stroke-width="2" stroke-opacity="0.8"/><circle cx="722" cy="40" r="3" fill="#fff"/>`) +
      `<path d="M0 260L60 220H140L170 250L260 240L300 200H400L440 250L560 230L600 190H700L740 240L800 230V300H0Z" fill="#c96a4a"/>` +
      `<rect y="280" width="800" height="220" fill="#d9774a"/>` + pebbles +
      // Rocket on its pad
      `<ellipse cx="100" cy="370" rx="50" ry="10" fill="#9a8a80"/>` + rocket(100, 366, '#f1f1f1', '#e63946', 1.4) +
      diff(100, 230, 22, beacon(100, 228), anim({ type: 'blink', duty: 0.5, period: 0.9 }, beacon(100, 228))) +
      // Habitats
      `<rect x="230" y="300" width="180" height="56" rx="26" fill="#e6e6f0"/><path d="M270 300v56M370 300v56" stroke="#bfc7d5" stroke-width="3"/>` +
      diff(300, 336, 22, `<rect x="290" y="320" width="20" height="36" rx="3" fill="#3a86ff"/>`, `<rect x="290" y="320" width="20" height="36" rx="3" fill="#3a9fd6"/>`) +
      `<circle cx="340" cy="324" r="7" fill="#ffd98a" stroke="#8d99ae" stroke-width="2"/><circle cx="388" cy="324" r="7" fill="#ffd98a" stroke="#8d99ae" stroke-width="2"/>` +
      diff(392, 282, 22, '', `<path d="M392 300V272M384 280h16M386 274h12" stroke="#bfc7d5" stroke-width="2"/>`) +
      `<rect x="410" y="320" width="50" height="14" fill="#d0d4de"/>` + dome(510, 370, 54) +
      diff(510, 340, 22, `<circle cx="510" cy="342" r="8" fill="#ffd98a"/>`, `<circle cx="510" cy="342" r="11" fill="#ffd98a"/>`) +
      `<rect x="564" y="350" width="40" height="12" fill="#d0d4de"/>` +
      `<path d="M604 370V318l50 -24l50 24V370Z" fill="#cfe8f2" fill-opacity="0.9"/><path d="M604 318l50 -24l50 24" stroke="#e6e6f0" stroke-width="3" fill="none"/>` +
      `<g fill="#5fae4b"><circle cx="624" cy="360" r="8"/><circle cx="646" cy="356" r="9"/><circle cx="684" cy="360" r="8"/></g>` +
      diff(654, 330, 26, skylight(654, 330, 3), skylight(654, 330, 4)) +
      // Ground level
      diff(150, 420, 28, solar(150, 440), `<g transform="rotate(22 150 420)">${solar(150, 440)}</g>`) + solar(80, 446) +
      diff(340, 420, 30, spinning(3), spinning(1.1)) +
      bot(440, 466, '#3ae0ff') + diff(440, 422, 22, `<rect x="434" y="420" width="12" height="5" rx="2" fill="#3ae0ff"/>`, `<rect x="434" y="420" width="12" height="5" rx="2" fill="#7ad0ff"/>`) +
      astronaut(560, 470, '#f1f1f1', '#ffb703') + rover(700, 470, '#ffb703', true) + flag(760, 400, '#3a86ff') +
      marsRock(200, 486) + diff(254, 470, 24, marsRock(250, 476), marsRock(260, 472)) + marsRock(620, 490, 1.3) +
      fuelCanister(160, 366) +
      toolbox(495, 472) +
      crystal(630, 442) +
      moonPebbles(772, 474) +
      helmet(380, 476) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['moonPebbles', 724, 413],
        ['crater', 540, 406],
        ['crystal', 56, 358, '#b38cff'],
        ['planet', 566, 182, '#4dabf7'],
        ['asteroid', 189, 183],
      ])
    )
  },
})
