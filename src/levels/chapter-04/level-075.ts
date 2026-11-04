// Motion differences: the sun pulses faster on picture B; the lantern on the pier swings only on B; the rowboat rocks faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bottleMessage, fish, gull, gullStanding, lifeRing, palm, person, rock, sailboat, sunglasses, waves } from './shapes.ts'

/** Sun disc without its own fill (recolored by the animation); (x, y) = center. Bounds: radius 44. */
const disc = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="42"/>`

/** Lantern hanging from (x, y). Bounds: x ±8, y from 0 to +28. */
const lantern = (x: number, y: number) =>
  `<path d="M${x} ${y}v6" stroke="#333" stroke-width="2"/><rect x="${x - 7}" y="${y + 6}" width="14" height="18" rx="3" fill="#ffd166" stroke="#333" stroke-width="2"/><rect x="${x - 4}" y="${y + 24}" width="8" height="4" fill="#333"/>`

/** Rowboat with two rowers; (x, y) = waterline center. Bounds: x ±40, y from −44 to +8. */
const rowboat = (x: number, y: number, hull: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-16 -24l-22 16M16 -24l22 16" stroke="#8a5a3b" stroke-width="3"/>` +
  `<rect x="-20" y="-40" width="12" height="20" rx="3" fill="#3a86ff"/><circle cx="-14" cy="-44" r="6" fill="#f2d29b"/><rect x="8" y="-40" width="12" height="20" rx="3" fill="#e63946"/><circle cx="14" cy="-44" r="6" fill="#f2d29b"/>` +
  `<path d="M-40 -8h80l-10 16h-60Z" fill="${hull}"/></g>`

/** Ice cream cone; (x, y) = bottom. Bounds: x ±7, y from −22 to 0. */
const cone = (x: number, y: number, flavor: string) => `<path d="M${x - 6} ${y - 12}h12l-6 12Z" fill="#e9c46a"/><circle cx="${x}" cy="${y - 15}" r="7" fill="${flavor}"/>`

export default svgLevel({
  id: 75,
  chapter: 'sea',
  title: 'sunsetBay',
  parTimeSec: 130,
  scene: ({ diff, anim, rand, extra }) => {
    let glints = ''
    for (let i = 0; i < 14; i++) glints += `<path d="M${300 + rand() * 300} ${300 + rand() * 60}h${10 + rand() * 20}" stroke="#ffe08a" stroke-width="3" stroke-linecap="round"/>`
    const glowing = (period: number) => anim({ type: 'color', colors: ['#ffb703', '#ff7b54', '#ffb703'], period }, disc(400, 230))
    const hanging = lantern(620, 330)
    const rocking = (period: number) => anim({ id: 'row', type: 'bob', dx: 0, dy: 4, period }, rowboat(200, 440, '#a0703f'))

    return (
      `<rect width="800" height="500" fill="#ff9e6e"/>` +
      `<rect width="800" height="120" fill="#7b6cb0"/><rect y="120" width="800" height="70" fill="#c07aa0"/><rect y="190" width="800" height="60" fill="#ffb98a"/>` +
      diff(400, 230, 44, glowing(6), glowing(2)) +
      gull(200, 150) +
      diff(560, 170, 18, gull(560, 170), gull(560, 170).replace('translate(560 170)', 'translate(560 170) scale(-1 1)')) +
      // Far headland
      `<path d="M0 270q100 -40 200 -20t120 20v20H0Z" fill="#7a3f6e"/>` +
      palm(60, 270, 0.9) +
      diff(128, 220, 74, palm(140, 270, 0.8, true), '') +
      `<rect y="280" width="800" height="220" fill="#e07a5f"/>` +
      anim({ type: 'bob', dx: 8, dy: 0, period: 4 }, waves(286, 10, 100, '#f28c6a')) +
      anim({ type: 'bob', dx: 12, dy: 0, period: 4 }, glints) +
      diff(500, 282, 58, sailboat(500, 320, '#2b2b3a', '#ffe08a'), sailboat(500, 320, '#2b2b3a', '#ff6b8b')) +
      // Pier
      `<rect x="560" y="340" width="240" height="14" fill="#8a5a3b"/><rect x="600" y="354" width="8" height="60" fill="#5a3d2b"/><rect x="700" y="354" width="8" height="60" fill="#5a3d2b"/>` +
      `<rect x="638" y="300" width="4" height="40" fill="#3d4a55"/><path d="M640 330h-20" stroke="#3d4a55" stroke-width="3"/>` +
      diff(620, 344, 20, hanging, anim({ type: 'sway', angle: 14, pivot: [620, 330], period: 1.5 }, hanging)) +
      person(680, 340, '#8338ec') +
      diff(696, 318, 18, cone(700, 334, '#ff6b8b'), cone(700, 334, '#8ac926')) +
      diff(740, 305, 20, person(740, 340, '#2a9d8f', true), person(740, 340, '#ffb703', true)) +
      diff(580, 330, 18, gullStanding(580, 340), '') +
      diff(200, 418, 46, rocking(2.4), rocking(1.1), 'row') +
      diff(80, 459, 30, rock(80, 470, 1.1, '#7a3f6e'), rock(80, 470, 1.4, '#7a3f6e')) +
      rock(420, 480, 1, '#7a3f6e') +
      anim({ type: 'bob', dx: 8, dy: 0, period: 3 }, waves(470, 10, 100, '#f28c6a')) +
      bottleMessage(560, 425) +
      lifeRing(705, 382) +
      fish(420, 430, '#ffb703') +
      sunglasses(780, 345) +
      gullStanding(250, 258) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['buoy', 110, 349],
        ['fish', 326, 391, '#ff9f43'],
        ['lifeRing', 571, 468],
        ['fish', 750, 456, '#9ef01a'],
        ['bottle', 229, 313],
        ['buoy', 466, 411],
        ['gull', 372, 76],
        ['gull', 90, 66],
        ['cloud', 585, 75],
        ['gull', 742, 33],
      ])
    )
  },
})
