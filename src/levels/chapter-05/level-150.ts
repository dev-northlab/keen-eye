// Motion differences: the beacon on the antenna mast blinks only on picture B; the right astronaut hops only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { astronaut, crater, crystal, fuelCanister, moonPebbles, rock, solarPanel, sparkle, star, starField, toolbox } from './shapes.ts'

/** Annex window grid, 36 × 26, with `cols` columns; (x, y) = center. */
const annexWindow = (x: number, y: number, cols: number) => {
  let s = `<rect x="${x - 18}" y="${y - 13}" width="36" height="26" fill="#ffd98a" stroke="#5c677d" stroke-width="2"/><path d="M${x - 18} ${y}h36" stroke="#5c677d" stroke-width="2"/>`
  for (let i = 1; i < cols; i++) s += `<path d="M${x - 18 + (36 * i) / cols} ${y - 13}v26" stroke="#5c677d" stroke-width="2"/>`
  return s
}

/** Telescope tube from the pivot (x, y) up-right. Bounds: radius 42 around (x, y), up-right quarter. */
const telescope = (x: number, y: number) =>
  `<g transform="translate(${x} ${y}) rotate(-35)"><rect x="-4" y="-8" width="40" height="16" rx="3" fill="#d0d4de"/><rect x="30" y="-10" width="10" height="20" rx="2" fill="#8d99ae"/><circle r="6" fill="#5c677d"/></g>`

/** Small dish on a mast; (x, y) = mast foot, bowl radius r. */
const smallDish = (x: number, y: number, r: number) =>
  `<path d="M${x} ${y}v-20" stroke="#8d99ae" stroke-width="3"/><path d="M${x - r} ${y - 22 - r * 0.5}q${r} ${r * 1.4} ${2 * r} 0Z" fill="#e6e6f0"/><path d="M${x} ${y - 20}l${r * 0.4} ${-r}" stroke="#5c677d" stroke-width="1.5"/>`

const smallComet = (x: number, y: number) => `<path d="M${x - 3} ${y - 4}L${x + 30} ${y - 16}L${x + 4} ${y + 3}Z" fill="#bde3f2" fill-opacity="0.6"/><circle cx="${x}" cy="${y}" r="5" fill="#fff"/>`

const beacon = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="8" fill="#ff4d4d" fill-opacity="0.3"/><circle cx="${x}" cy="${y}" r="4" fill="#ff4d4d"/>`

export default svgLevel({
  id: 150,
  chapter: 'space',
  title: 'blackHole',
  parTimeSec: 100,
  scene: ({ diff, anim, rand, extra }) => {
    let streaks = ''
    for (let i = 0; i < 16; i++) {
      const a = rand() * Math.PI * 2
      const d = 90 + rand() * 80
      streaks += `<path d="M${(520 + Math.cos(a) * d).toFixed(1)} ${(150 + Math.sin(a) * d * 0.6).toFixed(1)}l${(-Math.sin(a) * 10).toFixed(1)} ${(Math.cos(a) * 6).toFixed(1)}" stroke="#fff" stroke-opacity="0.6" stroke-width="1.5"/>`
    }
    const hop = (moving: boolean) => (moving ? anim({ type: 'bob', dx: 0, dy: -6, period: 1.5 }, astronaut(600, 460, '#f1f1f1', '#3a86ff', true)) : astronaut(600, 460, '#f1f1f1', '#3a86ff', true))

    return (
      `<rect width="800" height="500" fill="#05040f"/>` + starField(rand, 0, 340, 90) +
      `<ellipse cx="200" cy="120" rx="160" ry="60" fill="#5a3f9a" fill-opacity="0.15"/>` +
      // Black hole with its accretion disk
      `<g transform="rotate(-10 520 150)">` +
      `<ellipse cx="520" cy="150" rx="170" ry="44" fill="#ff9f43" fill-opacity="0.25"/><ellipse cx="520" cy="150" rx="130" ry="32" fill="#ffb703" fill-opacity="0.45"/>` +
      `<ellipse cx="520" cy="150" rx="92" ry="22" fill="#ffd166" fill-opacity="0.7"/></g>` +
      `<path d="M462 128a60 60 0 0 1 116 0" stroke="#ffd166" stroke-width="6" fill="none" stroke-opacity="0.8"/>` +
      `<circle cx="520" cy="150" r="54" fill="#ffe8b0" fill-opacity="0.6"/><circle cx="520" cy="150" r="48" fill="#000"/>` +
      `<g transform="rotate(-10 520 150)"><path d="M428 150a92 22 0 0 0 184 0" fill="none" stroke="#ffd166" stroke-width="10" stroke-opacity="0.8"/></g>` +
      streaks + star(720, 60, 7, '#fff6c4') + star(330, 200, 6, '#bde3f2') + sparkle(120, 40, 6) +
      diff(680, 90, 22, star(680, 90, 7, '#ffd1dc'), '') +
      diff(392, 74, 30, '', smallComet(380, 82)) +
      // Ground
      `<path d="M0 330Q200 300 400 330T800 320V500H0Z" fill="#6f6c80"/>` + crater(560, 370, 30) + crater(740, 470, 26) + crater(300, 480, 20) +
      // Observatory
      `<rect x="130" y="320" width="140" height="70" fill="#d0d4de"/><path d="M140 320a60 60 0 0 1 120 0Z" fill="#e6e6f0"/><path d="M196 262h8v58h-8Z" fill="#2b3640"/>` +
      `<path d="M150 300q50 -30 100 0" stroke="#bfc7d5" stroke-width="2" fill="none"/>` +
      diff(222, 262, 30, telescope(206, 276), `<g transform="rotate(-8 206 276)">${telescope(206, 276)}</g>`) +
      diff(200, 370, 22, `<rect x="188" y="352" width="24" height="38" rx="3" fill="#3a86ff"/>`, `<rect x="188" y="352" width="24" height="38" rx="3" fill="#3a9fd6"/>`) +
      `<rect x="270" y="346" width="70" height="44" fill="#bfc7d5"/>` +
      diff(305, 368, 24, annexWindow(305, 368, 3), annexWindow(305, 368, 4)) +
      // Antennas
      smallDish(380, 380, 18) + `<path d="M380 360v-30" stroke="#8d99ae" stroke-width="2"/>` +
      diff(380, 326, 22, beacon(380, 326), anim({ type: 'blink', duty: 0.5, period: 1 }, beacon(380, 326))) +
      diff(720, 360, 26, smallDish(720, 392, 15), smallDish(720, 392, 19)) +
      // Astronauts and rocks
      astronaut(450, 450, '#f1f1f1', '#ffb703') +
      diff(453, 408, 22, `<ellipse cx="453" cy="408" rx="6" ry="5" fill="#ffb703"/>`, `<ellipse cx="453" cy="408" rx="6" ry="5" fill="#f28a3a"/>`) +
      diff(600, 434, 38, hop(false), hop(true)) +
      rock(60, 480, 1.2, '#5c5a6a') + diff(124, 472, 28, rock(118, 480, 0.9, '#7a7890'), rock(130, 478, 0.9, '#7a7890')) +
      toolbox(320, 432) +
      fuelCanister(80, 412) +
      crystal(520, 472) +
      moonPebbles(680, 456) +
      solarPanel(470, 352) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['probe', 86, 199],
        ['spaceStar', 746, 220],
        ['ringPlanet', 459, 303],
        ['toolbox', 193, 473],
        ['beacon', 706, 457],
      ])
    )
  },
})
