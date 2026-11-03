// Motion differences: the rocket lands and lifts off faster on picture B; the pad beacon blinks faster on B; the tower radar turns only on B.
import { svgLevel } from '../helpers.ts'
import { astronaut, flame, fuelCanister, helmet, moonPebbles, rocket, solarPanel, starField, toolbox, ufo } from './shapes.ts'

/** Landing pad; (x, y) = center. Bounds: x ±70, y ±14. */
const pad = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="70" ry="14" fill="#8d99ae"/><ellipse cx="${x}" cy="${y}" rx="52" ry="9" fill="none" stroke="#ffd166" stroke-width="3"/>`

/** Fuel truck, faces left; (x, y) = ground center. The tank is separate. Bounds: x ±40, y from −32 to 0. */
const truck = (x: number, y: number) =>
  `<rect x="${x - 40}" y="${y - 28}" width="20" height="20" rx="3" fill="#e63946"/><rect x="${x - 36}" y="${y - 24}" width="10" height="8" fill="#8ecae6"/>` +
  `<rect x="${x - 20}" y="${y - 12}" width="60" height="5" fill="#5c677d"/><circle cx="${x - 28}" cy="${y - 5}" r="6" fill="#3d4a55"/><circle cx="${x + 26}" cy="${y - 5}" r="6" fill="#3d4a55"/>`
const tank = (x: number, y: number, color: string) => `<rect x="${x - 16}" y="${y - 30}" width="52" height="18" rx="9" fill="${color}"/>`

export default svgLevel({
  id: 98,
  chapter: 'space',
  title: 'spaceport',
  parTimeSec: 140,
  scene: ({ diff, anim, rand }) => {
    const landing = (period: number) =>
      anim({ id: 'lander', type: 'path', points: [[0, 0], [0, -120]], period }, rocket(330, 380, '#f1f1f1', '#e63946', 0.8) + flame(330, 380, 0.8))
    const beacon = (period: number) => anim({ type: 'blink', duty: 0.5, period }, `<circle cx="680" cy="410" r="9" fill="#ff6b6b" fill-opacity="0.4"/><circle cx="680" cy="410" r="5" fill="#ff3b3b"/>`)
    const radar = `<rect x="86" y="153" width="28" height="6" rx="3" fill="#5c677d"/>`
    let board = ''
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) if (i !== 2 || j !== 1) board += `<rect x="${712 + i * 18}" y="${268 + j * 12}" width="14" height="8" fill="${['#8ac926', '#ffd166', '#3ae0ff'][(i + j) % 3]}"/>`

    return (
      `<rect width="800" height="500" fill="#123047"/><rect y="200" width="800" height="140" fill="#1f5b6e"/><rect y="290" width="800" height="50" fill="#3f8f8a"/>` +
      starField(rand, 0, 220, 45) +
      `<circle cx="120" cy="80" r="22" fill="#f4f1de"/>` +
      diff(200, 60, 18, `<circle cx="200" cy="60" r="10" fill="#ffd6a5"/>`, '') +
      `<rect y="340" width="800" height="160" fill="#4a5568"/><path d="M0 440h800" stroke="#5c677d" stroke-width="30"/>` +
      `<path d="M20 455h40M100 455h40M180 455h40M260 455h40M340 455h40M420 455h40M500 455h40M580 455h40M660 455h40M740 455h40" stroke="#ffd166" stroke-width="3"/>` +
      // Control tower
      `<rect x="85" y="170" width="30" height="170" fill="#d0d4de"/><rect x="65" y="170" width="70" height="30" fill="#8ecae6"/><rect x="60" y="164" width="80" height="6" fill="#5c677d"/>` +
      `<path d="M100 164v-6" stroke="#5c677d" stroke-width="3"/>` +
      diff(100, 156, 18, radar, anim({ type: 'rotate', pivot: [100, 156], period: 2 }, radar)) +
      diff(100, 256, 18, `<rect x="85" y="250" width="30" height="12" fill="#e63946"/>`, `<rect x="85" y="250" width="30" height="12" fill="#3a86ff"/>`) +
      `<path d="M200 340v-50" stroke="#bfc7d5" stroke-width="3"/>` +
      diff(221, 303, 21, `<path d="M202 296l38 4v8l-38 4Z" fill="#ff9f43"/>`, `<path d="M202 296l38 4v8l-38 4Z" fill="#8ac926"/>`) +
      // Terminal
      `<rect x="690" y="250" width="110" height="90" fill="#d0d4de"/><rect x="705" y="262" width="80" height="44" rx="3" fill="#1d2433"/>` +
      board +
      diff(755, 284, 18, `<rect x="748" y="280" width="14" height="8" fill="#8ac926"/>`, `<rect x="748" y="280" width="14" height="8" fill="#e63946"/>`) +
      `<rect x="720" y="314" width="24" height="26" fill="#8ecae6"/>` +
      // Pads and ships
      pad(330, 384) +
      pad(560, 400) +
      diff(560, 386, 37, ufo(560, 392, '#9b7bff'), ufo(560, 392, '#ff9f43')) +
      diff(680, 410, 18, beacon(1.6), beacon(0.6)) +
      diff(330, 354, 54, landing(8), landing(4), 'lander') +
      // Ground crew
      truck(470, 470) +
      diff(480, 449, 26, tank(470, 470, '#ffd166'), tank(470, 470, '#bfc7d5')) +
      astronaut(620, 480, '#f1f1f1', '#ffb703') +
      `<path d="M634 456v-6h8v6" stroke="#3d4a55" stroke-width="2" fill="none"/>` +
      diff(646, 466, 18, `<rect x="636" y="456" width="20" height="20" rx="3" fill="#e76f51"/>`, `<rect x="636" y="456" width="20" height="20" rx="3" fill="#3a86ff"/>`) +
      astronaut(250, 480, '#ffb703', '#3ae0ff', true) +
      fuelCanister(380, 472) +
      toolbox(560, 474) +
      moonPebbles(165, 364) +
      helmet(730, 472) +
      solarPanel(645, 356)
    )
  },
})
