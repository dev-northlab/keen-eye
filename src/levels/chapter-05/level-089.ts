// Motion differences: the astronaut floats faster on picture B; the apple spins faster on B; the panel light blinks only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level089Redesign } from './level-089-redesign.ts'
import { astronaut, fuelCanister, helmet, probe, rocket, toolbox, wrench } from './shapes.ts'

/** Floating apple; (x, y) = center. Bounds: radius 15. */
const apple = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="10" fill="#e63946"/><path d="M${x} ${y - 10}v-4" stroke="#5a3d2b" stroke-width="2"/><path d="M${x + 1} ${y - 12}q6 -4 9 0q-5 4 -9 0Z" fill="#4caf6a"/>`

/** Potted plant on a shelf; (x, y) = pot bottom. Bounds: x ±16, y from −36 to 0. */
const plant = (x: number, y: number) =>
  `<path d="M${x - 9} ${y - 16}h18l-3 16h-12Z" fill="#e07a5f"/><path d="M${x} ${y - 16}q-14 -6 -14 -18q10 2 14 18q4 -16 14 -18q0 12 -14 18" fill="#4caf6a"/>`

export default svgLevel({
  id: 89,
  chapter: 'space',
  title: 'spaceStation',
  parTimeSec: 140,
  redesign: level089Redesign,
  scene: ({ diff, anim, extra }) => {
    const floating = (period: number) => anim({ id: 'walker', type: 'bob', dx: 0, dy: 10, period }, astronaut(180, 300, '#f1f1f1', '#ffb703'))
    const spinning = (period: number) => anim({ type: 'rotate', pivot: [300, 150], period }, apple(300, 150))
    const light = `<circle cx="240" cy="420" r="6" fill="#ff3b3b"/>`

    return (
      `<rect width="800" height="500" fill="#d0d4de"/><rect width="800" height="50" fill="#bfc7d5"/><rect y="470" width="800" height="30" fill="#bfc7d5"/>` +
      `<g fill="#8d99ae">${[40, 200, 360, 520, 680].map((x) => `<circle cx="${x}" cy="25" r="4"/><circle cx="${x + 80}" cy="485" r="4"/>`).join('')}</g>` +
      `<path d="M30 70h200M570 70h200" stroke="#ffd166" stroke-width="8" stroke-linecap="round"/>` +
      // Window
      `<circle cx="400" cy="200" r="97" fill="#8d99ae"/><circle cx="400" cy="200" r="90" fill="#0e0b26"/>` +
      `<g fill="#fff"><circle cx="350" cy="150" r="1.5"/><circle cx="420" cy="130" r="2"/><circle cx="380" cy="175" r="1.2"/><circle cx="460" cy="190" r="1.5"/><circle cx="340" cy="200" r="1.8"/></g>` +
      diff(450, 150, 18, `<circle cx="450" cy="150" r="8" fill="#d0d4de"/>`, '') +
      `<path d="M315.1 230A90 90 0 0 0 484.9 230Q400 190 315.1 230Z" fill="#3a86ff"/><path d="M420 240q20 -8 36 2q-8 12 -30 8Z" fill="#4caf6a"/>` +
      diff(370, 254, 18, `<ellipse cx="370" cy="254" rx="14" ry="8" fill="#4caf6a"/>`, '') +
      diff(300, 150, 18, spinning(6), spinning(2.5)) +
      // Poster
      `<rect x="660" y="90" width="60" height="64" fill="#fff"/><rect x="664" y="94" width="52" height="56" fill="#1b1640"/>` +
      diff(690, 120, 26, rocket(690, 146, '#f1f1f1', '#e63946', 0.5), rocket(690, 146, '#f1f1f1', '#8ac926', 0.5)) +
      // Shelf
      `<rect x="580" y="240" width="90" height="8" fill="#8d99ae"/>` +
      plant(640, 240) +
      plant(600, 240) +
      diff(620, 196, 18, `<circle cx="620" cy="196" r="7" fill="#ff6b8b"/><circle cx="620" cy="196" r="3" fill="#ffd166"/>`, '') +
      // Control panel
      `<rect x="60" y="400" width="240" height="70" rx="6" fill="#3d4a55"/><rect x="166" y="414" width="40" height="32" fill="#14112e"/>` +
      `<rect x="80" y="420" width="16" height="10" fill="#ffd166"/><rect x="80" y="440" width="16" height="10" fill="#3a86ff"/>` +
      diff(120, 440, 18, `<rect x="112" y="435" width="16" height="10" fill="#e63946"/>`, `<rect x="112" y="435" width="16" height="10" fill="#8ac926"/>`) +
      diff(186, 430, 26, `<path d="M170 436l8 -12l8 16l8 -14l8 6" stroke="#8ac926" stroke-width="2" fill="none"/>`, `<path d="M170 430h10l6 -10l6 20l6 -10h4" stroke="#8ac926" stroke-width="2" fill="none"/>`) +
      `<circle cx="270" cy="420" r="6" fill="#8ac926"/><circle cx="255" cy="450" r="6" fill="#ffd166"/>` +
      diff(240, 420, 18, light, anim({ type: 'blink', duty: 0.5, period: 1 }, light)) +
      // Crew
      diff(180, 274, 31, floating(5), floating(2.5), 'walker') +
      diff(617, 358, 18, astronaut(620, 400, '#f1f1f1', '#ffb703', true), astronaut(620, 400, '#f1f1f1', '#3ae0ff', true)) +
      anim({ type: 'bob', dx: 6, dy: 8, period: 7 }, `<circle cx="520" cy="330" r="7" fill="#8ecae6" fill-opacity="0.7"/><circle cx="534" cy="318" r="4" fill="#8ecae6" fill-opacity="0.7"/>`) +
      `<path d="M30 300v120M770 300v120" stroke="#ffd166" stroke-width="8" stroke-linecap="round"/>` +
      wrench(470, 420) +
      toolbox(270, 401) +
      helmet(720, 345) +
      probe(260, 330) +
      fuelCanister(500, 472) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['probe', 234, 197],
        ['wrench', 70, 113],
        ['toolbox', 744, 410],
        ['helmet', 80, 356],
        ['fuelCanister', 475, 90],
        ['probe', 525, 225],
        ['wrench', 728, 251],
        ['toolbox', 350, 338],
        ['helmet', 549, 422],
        ['fuelCanister', 415, 467],
      ])
    )
  },
})
