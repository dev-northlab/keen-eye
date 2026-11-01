// Motion differences: the liner's pennants wave only on picture B; the tug boat rocks faster on B; the gull flies the other way round on B.
import { svgLevel } from '../helpers.ts'
import { buoy, cloud, gull, lifeRing, person, sun, waves } from './shapes.ts'

/** Cruise liner, faces left; (x, y) = waterline center. Bounds: x ±200, y from −120 to +12. */
const liner = (x: number, y: number) => {
  let windows = ''
  for (let r = 0; r < 3; r++) for (let c = 0; c < 14; c++) windows += `<rect x="${-150 + c * 22}" y="${-96 + r * 22}" width="12" height="10" rx="2" fill="#bde3f2"/>`
  return (
    `<g transform="translate(${x} ${y})"><path d="M-200 -30h400l-30 42h-340Z" fill="#1d3557"/><rect x="-170" y="-104" width="320" height="74" rx="8" fill="#f4f1de"/>${windows}` +
    `<rect x="-120" y="-120" width="200" height="16" rx="6" fill="#f4f1de"/><rect x="-200" y="-34" width="400" height="6" fill="#e63946"/></g>`
  )
}

/** Funnel on the liner at (x, y); color stripe. Bounds: x ±12, y from −146 to −120. */
const funnel = (x: number, y: number, color: string) => `<rect x="${x - 12}" y="${y - 146}" width="24" height="26" rx="3" fill="${color}"/><rect x="${x - 12}" y="${y - 132}" width="24" height="5" fill="#2b2b2b"/>`

/** Pennant string from (x, y) to the right. Bounds: x from −2 to +62, y from −2 to +14. */
const pennants = (x: number, y: number) =>
  `<path d="M${x} ${y}h60" stroke="#555" stroke-width="1.5"/>` + [0, 15, 30, 45].map((dx, i) => `<path d="M${x + dx + 2} ${y}h12l-6 12Z" fill="${['#e63946', '#ffb703', '#3a86ff', '#8ac926'][i]}"/>`).join('')

/** Tug boat, faces right; (x, y) = waterline center. Bounds: x ±30, y from −40 to +8. */
const tug = (x: number, y: number, hull: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-30 -8h60l-8 16h-44Z" fill="${hull}"/><rect x="-14" y="-28" width="24" height="20" rx="3" fill="#f4f1de"/><rect x="-8" y="-24" width="8" height="8" fill="#bde3f2"/><rect x="-6" y="-40" width="8" height="12" fill="#2b2b2b"/></g>`

export default svgLevel({
  id: 78,
  chapter: 'sea',
  title: 'cruise',
  parTimeSec: 130,
  scene: ({ diff, anim, rand }) => {
    let ripples = ''
    for (let i = 0; i < 12; i++) ripples += `<path d="M${rand() * 760} ${380 + rand() * 100}h${20 + rand() * 30}" stroke="#a5dcf3" stroke-width="3" stroke-linecap="round"/>`
    const string = pennants(200, 240)
    const rocking = (period: number) => anim({ id: 'tug', type: 'bob', dx: 0, dy: 4, period }, tug(120, 440, '#e63946'))
    const soaring = (reverse: boolean) => anim({ id: 'gull', type: 'path', points: [[0, 0], [200, -16]], flipX: 100, period: 9, reverse }, gull(100, 90))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(700, 70) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(400, 50, 0.8)) +
      diff(100, 90, 20, soaring(false), soaring(true), 'gull') +
      diff(560, 140, 18, gull(560, 140), '') +
      // Liner
      liner(400, 380) +
      funnel(340, 380, '#e63946') +
      diff(400, 247, 18, funnel(400, 380, '#e63946'), funnel(400, 380, '#3a86ff')) +
      `<rect x="198" y="240" width="4" height="20" fill="#3d4a55"/>` +
      diff(230, 246, 34, string, anim({ type: 'sway', angle: 6, pivot: [200, 240], period: 1.3 }, string)) +
      diff(480, 240, 18, `<rect x="470" y="232" width="20" height="14" rx="3" fill="#ffb703"/>`, `<rect x="470" y="232" width="20" height="14" rx="3" fill="#8ac926"/>`) +
      diff(230, 348, 18, lifeRing(230, 348), '') +
      lifeRing(560, 348) +
      `<rect x="470" y="340" width="20" height="10" fill="#8d99ae"/>` +
      person(260, 262, '#ffb703') +
      diff(300, 227, 20, person(300, 262, '#8338ec', true), person(300, 262, '#2a9d8f', true)) +
      // Water
      `<rect y="380" width="800" height="120" fill="#3ba7cc"/>` +
      anim({ type: 'bob', dx: 8, dy: 0, period: 4 }, waves(386, 10, 100, '#5cc0de')) +
      anim({ type: 'bob', dx: 10, dy: 0, period: 4 }, ripples) +
      diff(120, 424, 36, rocking(2.4), rocking(1.1), 'tug') +
      diff(700, 440, 20, buoy(700, 444), buoy(700, 444, '#8ac926')) +
      buoy(640, 474, '#ffb703')
    )
  },
})
