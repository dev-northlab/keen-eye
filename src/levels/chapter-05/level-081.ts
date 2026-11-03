// Motion differences: the warning light on the tower blinks faster on picture B; the astronaut walks faster on B.
import { svgLevel } from '../helpers.ts'
import { astronaut, dish, flag, fuelCanister, helmet, moonPebbles, rock, rocket, solarPanel, starField, toolbox } from './shapes.ts'

/** Fuel tank; (x, y) = bottom center. Bounds: x ±14, y from −44 to 0. */
const tank = (x: number, y: number, color: string) =>
  `<rect x="${x - 14}" y="${y - 44}" width="28" height="44" rx="10" fill="${color}"/><path d="M${x - 14} ${y - 30}h28" stroke="#fff" stroke-opacity="0.4" stroke-width="3"/>`

/** Steam puff; (x, y) = center. Bounds: x ±26, y from −20 to +16. */
const steam = (x: number, y: number) =>
  `<g fill="#e6e6f0"><circle cx="${x - 14}" cy="${y + 2}" r="12"/><circle cx="${x + 2}" cy="${y - 6}" r="14"/><circle cx="${x + 16}" cy="${y + 4}" r="10"/></g>`

export default svgLevel({
  id: 81,
  chapter: 'space',
  title: 'launchPad',
  parTimeSec: 140,
  scene: ({ diff, anim, rand }) => {
    const beacon = `<circle cx="487" cy="124" r="10" fill="#ff6b6b" fill-opacity="0.35"/><circle cx="487" cy="124" r="5" fill="#ff3b3b"/>`
    const blinking = (period: number) => anim({ type: 'blink', duty: 0.5, period }, beacon)
    const walking = (period: number) =>
      anim({ id: 'walker', type: 'path', points: [[0, 0], [120, 0]], flipX: 140, period }, astronaut(140, 440, '#f1f1f1', '#ffb703'))

    return (
      `<rect width="800" height="500" fill="#241c55"/><rect y="180" width="800" height="150" fill="#3d2f7a"/><rect y="270" width="800" height="60" fill="#7b4f9e"/>` +
      starField(rand, 0, 240, 50) +
      // Moon
      `<circle cx="110" cy="80" r="30" fill="#f4f1de"/><circle cx="100" cy="74" r="5" fill="#d8d3bd"/><circle cx="120" cy="92" r="4" fill="#d8d3bd"/>` +
      diff(118, 70, 18, `<circle cx="118" cy="70" r="4" fill="#d8d3bd"/>`, '') +
      anim({ type: 'path', points: [[0, 0], [300, -40]], period: 40 }, `<circle cx="260" cy="60" r="2.5" fill="#ffd23f"/>`) +
      // Far hills and ground
      `<path d="M0 330q120 -40 240 -10t260 -6t300 -14V340H0Z" fill="#2b2459"/><rect y="330" width="800" height="170" fill="#3a3f58"/>` +
      `<path d="M0 470L300 370M800 470L500 370" stroke="#4a5070" stroke-width="18"/>` +
      // Tower and pad
      `<rect x="300" y="356" width="200" height="14" fill="#8d99ae"/>` +
      `<rect x="470" y="130" width="34" height="226" fill="none" stroke="#e63946" stroke-width="4"/>` +
      `<path d="M470 130l34 30l-34 30l34 30l-34 30l34 30l-34 30l34 30l-34 26" fill="none" stroke="#e63946" stroke-width="3"/>` +
      `<rect x="430" y="196" width="40" height="6" fill="#e63946"/><rect x="430" y="276" width="40" height="6" fill="#e63946"/>` +
      diff(487, 124, 18, blinking(2), blinking(0.8)) +
      rocket(400, 356, '#f1f1f1', '#e63946', 2.4) +
      diff(400, 222, 22, '', `<circle cx="400" cy="221.6" r="16.8" fill="#ffd166" stroke="#3d4a55" stroke-width="7.2"/>`) +
      diff(320, 356, 28, steam(320, 356), '') +
      steam(484, 360) +
      // Fuel tanks
      tank(214, 344, '#d0d4de') +
      diff(254, 322, 27, tank(254, 344, '#d0d4de'), tank(254, 344, '#ffb703')) +
      `<path d="M268 330h32" stroke="#8d99ae" stroke-width="4"/>` +
      // Control building
      `<rect x="600" y="280" width="160" height="50" fill="#5c677d"/>` +
      `<g fill="#ffd166"><rect x="612" y="296" width="16" height="12"/><rect x="640" y="296" width="16" height="12"/><rect x="696" y="296" width="16" height="12"/><rect x="724" y="296" width="16" height="12"/></g>` +
      diff(676, 302, 18, `<rect x="668" y="296" width="16" height="12" fill="#ffd166"/>`, `<rect x="668" y="296" width="16" height="12" fill="#3d4a55"/>`) +
      diff(632, 237, 18, flag(620, 280, '#3a86ff'), flag(620, 280, '#8ac926')) +
      diff(735, 250, 38, dish(735, 280), '') +
      // Foreground
      diff(140, 414, 32, walking(12), walking(6), 'walker') +
      diff(560, 458, 33, rock(560, 470, 1.2, '#5c677d'), rock(560, 470, 1.5, '#5c677d')) +
      rock(700, 480, 0.9, '#5c677d') +
      rock(40, 486, 1.1, '#5c677d') +
      toolbox(312, 410) +
      fuelCanister(570, 360) +
      solarPanel(770, 362) +
      moonPebbles(400, 470) +
      helmet(640, 430)
    )
  },
})
