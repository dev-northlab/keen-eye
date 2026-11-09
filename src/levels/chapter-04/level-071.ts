// Motion differences: the lead dolphin leaps faster on picture B; the gull flies the other way round on B; the boat rocks only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level071Redesign } from './level-071-redesign.ts'
import { beachBall, bottleMessage, buoy, cloud, dolphin, fish, gull, lifeRing, person, sun, sunHat, waves } from './shapes.ts'

/** Tour boat, faces right; (x, y) = waterline center. Bounds: x ±50, y from −46 to +8. */
const boat = (x: number, y: number, hull: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-50 -10h100l-14 18h-72Z" fill="${hull}"/><rect x="-30" y="-30" width="50" height="20" rx="3" fill="#f4f1de"/>` +
  `<rect x="-24" y="-26" width="10" height="8" fill="#bde3f2"/><rect x="-8" y="-26" width="10" height="8" fill="#bde3f2"/><rect x="-36" y="-46" width="4" height="36" fill="#3d4a55"/><rect x="-36" y="-46" width="14" height="8" fill="#e63946"/></g>`

/** Splash; (x, y) = base. Bounds: x ±16, y from −18 to +2. */
const splash = (x: number, y: number) => `<path d="M${x - 16} ${y}q4 -12 8 0q4 -18 8 0q4 -12 8 0q4 -18 8 0Z" fill="#fff" fill-opacity="0.8"/>`

export default svgLevel({
  id: 71,
  chapter: 'sea',
  title: 'dolphins',
  parTimeSec: 130,
  redesign: level071Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let ripples = ''
    for (let i = 0; i < 12; i++) ripples += `<path d="M${rand() * 760} ${300 + rand() * 180}h${20 + rand() * 30}" stroke="#a5dcf3" stroke-width="3" stroke-linecap="round"/>`
    const leaping = (period: number) => anim({ id: 'lead', type: 'path', points: [[0, 0], [60, -50], [120, 0]], period }, dolphin(300, 330))
    const soaring = (reverse: boolean) => anim({ id: 'gull', type: 'path', points: [[0, 0], [200, -14]], flipX: 500, period: 9, reverse }, gull(500, 110))
    const tour = boat(620, 400, '#ffffff') + person(600, 390, '#ffb703') + person(640, 390, '#8338ec', true)

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(120, 70) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(300, 60, 0.8)) +
      diff(500, 110, 20, soaring(false), soaring(true), 'gull') +
      diff(200, 150, 18, gull(200, 150), '') +
      `<rect y="220" width="800" height="280" fill="#1f8fbf"/>` +
      anim({ type: 'bob', dx: 8, dy: 0, period: 4 }, waves(226, 10, 100, '#3ba7cc')) +
      anim({ type: 'bob', dx: 10, dy: 0, period: 4 }, ripples) +
      // Dolphin pod
      diff(300, 330, 32, leaping(5), leaping(2.5), 'lead') +
      diff(700, 300, 32, dolphin(700, 300), dolphin(700, 300, '#5c8fbf', true)) +
      diff(160, 380, 32, dolphin(160, 380, '#5c8fbf'), dolphin(160, 380, '#8d99ae')) +
      dolphin(560, 460, '#5c8fbf', true) +
      diff(500, 436, 20, splash(500, 440), '') +
      splash(220, 400) +
      diff(620, 368, 64, tour, anim({ id: 'tour', type: 'bob', dx: 0, dy: 4, period: 2 }, tour), 'tour') +
      diff(380, 470, 18, '', `<path d="M372 470l8 -6l8 6l-8 4Z" fill="#ffb703"/>`) +
      diff(60, 460, 20, buoy(60, 464), buoy(60, 464, '#8ac926')) +
      diff(740, 250, 20, buoy(740, 254, '#ffb703'), '') +
      anim({ type: 'bob', dx: 8, dy: 0, period: 3 }, waves(470, 10, 100, '#3ba7cc')) +
      bottleMessage(260, 442) +
      beachBall(445, 468) +
      fish(150, 270, '#ffb703') +
      lifeRing(130, 460) +
      sunHat(720, 462) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['bottle', 110, 313],
        ['buoy', 209, 468],
        ['fish', 543, 296, '#ff9f43'],
        ['lifeRing', 748, 413],
        ['fish', 358, 416, '#ffb703'],
        ['bottle', 251, 265],
        ['buoy', 681, 477],
        ['gull', 442, 36],
        ['gull', 740, 39],
        ['cloud', 75, 168],
      ])
    )
  },
})
