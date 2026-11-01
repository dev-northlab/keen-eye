// Motion differences: the lead yacht rocks faster on picture B; the pennants wave only on B; the motorboat crosses the other way round on B.
import { svgLevel } from '../helpers.ts'
import { buoy, cloud, gull, person, sailboat, sun, waves } from './shapes.ts'

/** Pennant string from (x, y) to the right. Bounds: x from −2 to +62, y from −2 to +14. */
const pennants = (x: number, y: number) =>
  `<path d="M${x} ${y}h60" stroke="#555" stroke-width="1.5"/>` + [0, 15, 30, 45].map((dx, i) => `<path d="M${x + dx + 2} ${y}h12l-6 12Z" fill="${['#e63946', '#ffb703', '#3a86ff', '#8ac926'][i]}"/>`).join('')

/** Motorboat, faces right; (x, y) = waterline center. Bounds: x ±30, y from −26 to +8. */
const motorboat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-30 -8h50l10 8l-8 8h-52Z" fill="#fff"/><path d="M-20 -8v-10q10 -8 24 0v10Z" fill="#3a86ff"/><path d="M-12 -14h8" stroke="#bde3f2" stroke-width="3"/><path d="M-36 -2q-8 4 0 8" fill="#bde3f2"/></g>`

/** Sail number badge on a sail at (x, y). Bounds: radius 9. */
const number = (x: number, y: number, color: string) => `<circle cx="${x}" cy="${y}" r="8" fill="${color}"/>`

export default svgLevel({
  id: 68,
  chapter: 'sea',
  title: 'regatta',
  parTimeSec: 130,
  scene: ({ diff, anim, rand }) => {
    let ripples = ''
    for (let i = 0; i < 12; i++) ripples += `<path d="M${rand() * 760} ${300 + rand() * 180}h${20 + rand() * 30}" stroke="#a5dcf3" stroke-width="3" stroke-linecap="round"/>`
    const rocking = (period: number) => anim({ id: 'lead', type: 'bob', dx: 0, dy: 5, period }, sailboat(400, 420, '#e63946'))
    const string = pennants(560, 120)
    const crossing = (reverse: boolean) =>
      anim({ id: 'motor', type: 'path', points: [[0, 0], [160, 0]], flipX: 120, period: 9, reverse }, motorboat(120, 330))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(700, 70) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(200, 60, 0.8)) +
      gull(300, 130) +
      diff(360, 110, 18, gull(360, 110), '') +
      // Committee boat with pennants
      `<rect x="558" y="120" width="4" height="60" fill="#3d4a55"/>` +
      diff(590, 126, 34, string, anim({ type: 'sway', angle: 6, pivot: [560, 120], period: 1.3 }, string)) +
      `<rect y="200" width="800" height="300" fill="#3ba7cc"/>` +
      anim({ type: 'bob', dx: 8, dy: 0, period: 4 }, waves(206, 10, 100, '#5cc0de')) +
      anim({ type: 'bob', dx: 10, dy: 0, period: 4 }, ripples) +
      `<path d="M520 180h80l-8 14h-64Z" fill="#fff"/><rect x="536" y="160" width="40" height="20" rx="3" fill="#8d99ae"/>` +
      person(548, 180, '#ffb703') +
      // Fleet
      sailboat(150, 260, '#3a86ff') +
      diff(260, 222, 58, sailboat(260, 260, '#8ac926'), sailboat(260, 260, '#8ac926', '#ffd166')) +
      sailboat(640, 290, '#ffb703') +
      diff(640, 250, 18, number(650, 250, '#e63946'), number(650, 250, '#3a86ff')) +
      diff(120, 321, 40, crossing(false), crossing(true), 'motor') +
      diff(400, 382, 58, rocking(2.4), rocking(1.1), 'lead') +
      sailboat(680, 440, '#8338ec') +
      diff(700, 400, 18, number(700, 400, '#ffb703'), number(700, 400, '#8ac926')) +
      diff(60, 440, 20, buoy(60, 444), buoy(60, 444, '#ffb703')) +
      buoy(760, 330, '#ffb703') +
      diff(240, 470, 20, buoy(240, 474, '#8ac926'), '')
    )
  },
})
