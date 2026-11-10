// Motion differences: the astronaut floats faster on picture B; the satellite flies faster on B; the antenna light blinks only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level083Redesign } from './level-083-redesign.ts'
import { astronaut, comet, fuelCanister, helmet, probe, satellite, starField, toolbox, wrench } from './shapes.ts'

/** Solar panel wing; (x, y) = top left. Bounds: 50 × 70. */
const panel = (x: number, y: number, color = '#3a86ff') =>
  `<rect x="${x}" y="${y}" width="50" height="70" fill="${color}"/><path d="M${x + 25} ${y}v70M${x} ${y + 23}h50M${x} ${y + 47}h50" stroke="#fff" stroke-opacity="0.35" stroke-width="2"/>`

export default svgLevel({
  id: 83,
  chapter: 'space',
  title: 'spacewalk',
  parTimeSec: 140,
  redesign: level083Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    const floating = (period: number) => anim({ id: 'walker', type: 'bob', dx: 0, dy: 12, period }, astronaut(360, 320, '#f1f1f1', '#ffb703'))
    const orbiting = (period: number) => anim({ id: 'sat', type: 'path', points: [[0, 0], [160, -40]], period }, satellite(120, 430, '#ffb703'))
    const light = `<circle cx="400" cy="142" r="8" fill="#ff6b6b" fill-opacity="0.4"/><circle cx="400" cy="142" r="4" fill="#ff3b3b"/>`

    return (
      `<rect width="800" height="500" fill="#0e0b26"/>` +
      starField(rand, 0, 500, 70) +
      `<circle cx="90" cy="80" r="44" fill="#fff3b0" fill-opacity="0.3"/><circle cx="90" cy="80" r="28" fill="#fff8d6"/>` +
      diff(591, 59, 44, comet(560, 70), '') +
      // Earth
      `<circle cx="400" cy="990" r="622" fill="#8ecae6" fill-opacity="0.4"/><circle cx="400" cy="990" r="610" fill="#3a86ff"/>` +
      `<ellipse cx="200" cy="440" rx="70" ry="18" fill="#4caf6a"/><ellipse cx="540" cy="420" rx="40" ry="12" fill="#4caf6a"/><ellipse cx="700" cy="460" rx="60" ry="16" fill="#4caf6a"/>` +
      diff(610, 412, 18, `<ellipse cx="610" cy="412" rx="14" ry="7" fill="#4caf6a"/>`, '') +
      `<ellipse cx="300" cy="470" rx="50" ry="7" fill="#fff" fill-opacity="0.7"/>` +
      diff(440, 460, 37, `<ellipse cx="440" cy="460" rx="36" ry="7" fill="#fff" fill-opacity="0.7"/>`, '') +
      diff(120, 430, 41, orbiting(20), orbiting(10), 'sat') +
      // Station
      `<rect x="150" y="196" width="500" height="8" fill="#8d99ae"/>` +
      panel(150, 120) +
      diff(175, 245, 43, panel(150, 210), '') +
      diff(625, 155, 43, panel(600, 120), panel(600, 120, '#ffb703')) +
      panel(600, 210) +
      `<path d="M400 170v-24" stroke="#8d99ae" stroke-width="3"/>` +
      diff(400, 142, 18, light, anim({ type: 'blink', duty: 0.5, period: 1.2 }, light)) +
      `<rect x="300" y="170" width="200" height="60" rx="20" fill="#e6e6f0"/><path d="M300 214h200" stroke="#bfc7d5" stroke-width="4"/>` +
      `<g fill="#8ecae6"><circle cx="340" cy="196" r="8"/><circle cx="380" cy="196" r="8"/><circle cx="460" cy="196" r="8"/></g>` +
      diff(420, 196, 18, `<circle cx="420" cy="196" r="8" fill="#8ecae6"/>`, '') +
      `<path d="M500 180h20l24 12v16l-24 12h-20Z" fill="#f1f1f1"/>` +
      diff(511, 200, 21, `<rect x="508" y="180" width="6" height="40" fill="#e63946"/>`, `<rect x="508" y="180" width="6" height="40" fill="#3a86ff"/>`) +
      diff(360, 294, 31, floating(6), floating(3), 'walker') +
      probe(520, 320) +
      wrench(250, 335) +
      fuelCanister(700, 330) +
      toolbox(480, 120) +
      helmet(90, 330) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['ringPlanet', 738, 340],
        ['asteroid', 489, 337],
        ['ufo', 740, 103],
        ['spaceStar', 136, 48],
        ['sparkle', 392, 85],
        ['planet', 251, 293, '#9ef01a'],
        ['asteroid', 52, 249],
        ['sparkle', 541, 145],
        ['probe', 255, 120],
        ['spaceStar', 670, 238],
      ])
    )
  },
})
