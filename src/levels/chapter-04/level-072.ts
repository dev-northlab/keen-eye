// Motion differences: the whale's spout rises faster on picture B; the tail fluke sways only on B; the pilot fish circles faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { beachBall, bottleMessage, cloud, fish, gull, gullStanding, lifeRing, sailboat, sun, waves } from './shapes.ts'

/** Whale body, faces left; (x, y) = waterline center. The fluke and spout are separate. Bounds: x ±120, y from −60 to +30. */
const whale = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-120 0q10 -60 90 -60h40q70 0 90 50v10Z" fill="${color}"/><path d="M-120 0q10 -30 60 -30h80v30Z" fill="#bde3f2" fill-opacity="0.5"/>` +
  `<path d="M-60 -10q10 -16 30 -10q-10 10 -30 10Z" fill="${color}" stroke="#fff" stroke-opacity="0.3" stroke-width="2"/><circle cx="-90" cy="-26" r="4" fill="#222"/></g>`
/** Tail fluke pivoting on (x + 120, y) of the whale. Bounds: x ±26, y from −40 to +6 around the pivot. */
const fluke = (x: number, y: number, color: string) => `<path d="M${x + 120} ${y}q-6 -30 -26 -36q18 -6 26 4q8 -10 26 4q-20 6 -26 36Z" fill="${color}"/>`
/** Spout over the blowhole at (x − 60, y − 60). Bounds: x ±16, y from −40 to 0. */
const spout = (x: number, y: number) =>
  `<path d="M${x - 60} ${y - 60}q-16 -20 -12 -36q12 8 12 24q0 -16 12 -24q4 16 -12 36Z" fill="#fff" fill-opacity="0.85"/>`

export default svgLevel({
  id: 72,
  chapter: 'sea',
  title: 'whale',
  parTimeSec: 130,
  scene: ({ diff, anim, rand, extra }) => {
    let ripples = ''
    for (let i = 0; i < 12; i++) ripples += `<path d="M${rand() * 760} ${260 + rand() * 220}h${20 + rand() * 30}" stroke="#a5dcf3" stroke-width="3" stroke-linecap="round"/>`
    const blowing = (period: number) => anim({ id: 'spout', type: 'path', points: [[0, 0], [0, -14]], period }, spout(400, 380))
    const tail = fluke(400, 380, '#5c8fbf')
    const circling = (period: number) => anim({ id: 'pilot', type: 'path', points: [[0, 0], [50, 20], [100, 0]], period }, fish(200, 440, '#ffb703'))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(680, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(200, 60, 0.8)) +
      gull(120, 150) +
      diff(615, 124, 34, gull(600, 130) + gull(632, 116), '') +
      sailboat(680, 250, '#e63946') +
      diff(686, 170, 18, `<rect x="680" y="166" width="12" height="8" fill="#e63946"/>`, `<rect x="680" y="166" width="12" height="8" fill="#3a86ff"/>`) +
      `<rect y="260" width="800" height="240" fill="#1f8fbf"/>` +
      anim({ type: 'bob', dx: 8, dy: 0, period: 4 }, waves(266, 10, 100, '#3ba7cc')) +
      anim({ type: 'bob', dx: 10, dy: 0, period: 4 }, ripples) +
      // Whale
      diff(340, 300, 36, blowing(2.4), blowing(1), 'spout') +
      whale(400, 380, '#5c8fbf') +
      diff(520, 366, 40, tail, anim({ type: 'sway', angle: 10, pivot: [520, 380], period: 1.8 }, tail)) +
      diff(300, 356, 18, `<circle cx="300" cy="356" r="6" fill="#fff" fill-opacity="0.6"/>`, '') +
      diff(380, 352, 20, `<path d="M366 350q14 10 28 0" stroke="#fff" stroke-opacity="0.5" stroke-width="3" fill="none"/>`, `<path d="M366 350q14 10 28 0" stroke="#fff" stroke-opacity="0.5" stroke-width="3" fill="none"/><path d="M366 358q14 10 28 0" stroke="#fff" stroke-opacity="0.5" stroke-width="3" fill="none"/>`) +
      diff(200, 440, 22, circling(6), circling(3), 'pilot') +
      diff(600, 450, 22, fish(600, 450, '#ff6b8b', 1.2), fish(600, 450, '#ff6b8b', 1.2, true)) +
      diff(100, 400, 22, fish(100, 400, '#8ac926', 1.2), fish(100, 400, '#b38cff', 1.2)) +
      fish(720, 420, '#ffb703', 0.9, true) +
      diff(60, 470, 18, '', fish(60, 470, '#ff9f43', 0.9)) +
      anim({ type: 'bob', dx: 8, dy: 0, period: 3 }, waves(480, 10, 100, '#3ba7cc')) +
      bottleMessage(150, 320) +
      beachBall(770, 300) +
      lifeRing(420, 460) +
      gullStanding(705, 243) +
      fish(140, 470, '#4dabf7') +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['fish', 477, 467, '#ff9f43'],
        ['bottle', 728, 467],
        ['buoy', 618, 326],
        ['fish', 184, 363, '#9ef01a'],
        ['lifeRing', 446, 296],
        ['fish', 70, 293, '#4dabf7'],
        ['bottle', 359, 460],
        ['gull', 428, 78],
        ['cloud', 217, 182],
        ['gull', 137, 35],
      ])
    )
  },
})
