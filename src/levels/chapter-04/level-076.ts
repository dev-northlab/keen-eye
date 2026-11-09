// Motion differences: the lightning flashes at another moment on picture B; the ship pitches faster on B; the buoy bell swings only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level076Redesign } from './level-076-redesign.ts'
import { beachBall, bottleMessage, dolphin, fish, gull, lifeRing, rock, sunHat, waves } from './shapes.ts'

/** Lightning bolt; (x, y) = top. Bounds: x ±10, y from 0 to +50. */
const bolt = (x: number, y: number) => `<path d="M${x} ${y}l-8 22h10l-6 28l14 -32h-10l8 -18Z" fill="#fff3a3"/>`

/** Cargo ship, faces left; (x, y) = waterline center. Bounds: x ±80, y from −70 to +10. */
const ship = (x: number, y: number, hull: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-80 -16h160l-14 26h-130Z" fill="${hull}"/><rect x="-80" y="-16" width="160" height="6" fill="#fff"/>` +
  `<rect x="20" y="-50" width="44" height="34" fill="#f4f1de"/><rect x="26" y="-44" width="10" height="8" fill="#bde3f2"/><rect x="44" y="-44" width="10" height="8" fill="#bde3f2"/>` +
  `<rect x="36" y="-70" width="12" height="20" fill="#e63946"/><rect x="-60" y="-36" width="70" height="20" fill="#3a86ff"/><rect x="-60" y="-36" width="70" height="20" fill="none" stroke="#1d3557" stroke-width="2"/></g>`

/** Bell buoy; (x, y) = waterline center. The bell is separate. Bounds: x ±14, y from −40 to +8. */
const bellBuoy = (x: number, y: number) =>
  `<path d="M${x - 12} ${y + 8}l4 -20h16l4 20Z" fill="#e63946"/><path d="M${x - 8} ${y - 12}l4 -28h8l4 28" fill="none" stroke="#3d4a55" stroke-width="3"/>`
const bell = (x: number, y: number) => `<path d="M${x - 6} ${y - 24}q0 -10 6 -10q6 0 6 10Z" fill="#ffd166"/><circle cx="${x}" cy="${y - 22}" r="2" fill="#3d4a55"/>`

/** Container on the deck; (x, y) = bottom center. Bounds: x ±14, y from −14 to 0. */
const container = (x: number, y: number, color: string) => `<rect x="${x - 14}" y="${y - 14}" width="28" height="14" fill="${color}"/><path d="M${x - 8} ${y - 14}v14M${x + 8} ${y - 14}v14" stroke="#2b2b2b" stroke-opacity="0.3" stroke-width="2"/>`

export default svgLevel({
  id: 76,
  chapter: 'sea',
  title: 'storm',
  parTimeSec: 130,
  redesign: level076Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let rain = ''
    for (let i = 0; i < 60; i++) rain += `<path d="M${rand() * 800} ${rand() * 500}l-4 14" stroke="#9fc5e8" stroke-width="2" stroke-linecap="round"/>`
    const flash = (phase: number) => anim({ type: 'blink', period: 3, phase, duty: 0.2 }, bolt(200, 120))
    const pitching = (period: number) => anim({ id: 'ship', type: 'bob', dx: 0, dy: 8, period }, ship(440, 330, '#3d4a55') + container(380, 294, '#e63946') + container(410, 294, '#ffb703') + container(440, 294, '#8ac926'))
    const clapper = bell(700, 380)

    return (
      `<rect width="800" height="500" fill="#4a5a75"/>` +
      `<g fill="#2d3a55"><ellipse cx="120" cy="60" rx="130" ry="50"/><ellipse cx="400" cy="40" rx="160" ry="60"/><ellipse cx="680" cy="70" rx="140" ry="50"/></g>` +
      diff(200, 145, 28, flash(0), flash(0.5)) +
      anim({ type: 'blink', period: 4, phase: 0.6, duty: 0.15 }, bolt(600, 110)) +
      diff(500, 180, 18, gull(500, 180), '') +
      `<rect y="240" width="800" height="260" fill="#1f5f8a"/>` +
      anim({ type: 'bob', dx: 16, dy: 6, period: 2.5 }, waves(250, 6, 160, '#2a7fa8')) +
      diff(440, 300, 90, pitching(3), pitching(1.4), 'ship') +
      `<circle cx="440" cy="240" r="5" fill="#ffd166"/>` +
      anim({ type: 'bob', dx: 14, dy: 8, period: 2 }, waves(340, 6, 160, '#3ba7cc')) +
      bellBuoy(700, 380) +
      diff(700, 352, 18, clapper, anim({ type: 'sway', angle: 16, pivot: [700, 356], period: 0.8 }, clapper)) +
      diff(120, 400, 18, lifeRing(120, 400), '') +
      diff(600, 440, 22, rock(600, 450, 1.2, '#2b2b3a'), rock(600, 450, 1.5, '#2b2b3a')) +
      anim({ type: 'bob', dx: 12, dy: 6, period: 2.2 }, waves(420, 6, 160, '#2a7fa8')) +
      diff(200, 470, 26, rock(200, 480, 1.1, '#2b2b3a'), '') +
      diff(320, 468, 20, `<path d="M304 470q8 -10 16 0t16 0" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>`, '') +
      diff(760, 470, 18, `<path d="M748 470l6 -10h12l6 10Z" fill="#8a5a3b"/>`, '') +
      bottleMessage(280, 402) +
      beachBall(620, 382) +
      sunHat(500, 462) +
      fish(420, 470, '#ffb703') +
      dolphin(160, 330) +
      anim({ type: 'path', points: [[0, 0], [-14, 50]], period: 0.7 }, rain) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['fish', 260, 319, '#ffb703'],
        ['lifeRing', 676, 456],
        ['fish', 727, 274, '#ff9f43'],
        ['bottle', 80, 292],
        ['buoy', 460, 471],
        ['fish', 578, 321, '#ff6b8b'],
        ['lifeRing', 92, 464],
        ['gull', 378, 39],
        ['gull', 63, 138],
        ['gull', 307, 180],
      ])
    )
  },
})
