// Motion differences: the low firework on the right blinks only on picture B; the right boat bobs faster on B.
import { bird } from '../chapter-03/shapes.ts'
import { gullStanding, lifeRing } from '../chapter-04/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bike, bollard } from './shapes.ts'

/** Firework burst of `n` rays of length r around (x, y). */
const burst = (x: number, y: number, r: number, color: string, n = 12) => {
  let d = ''
  for (let i = 0; i < n; i++) {
    const a = (i * 2 * Math.PI) / n
    d += `M${(x + Math.cos(a) * r * 0.35).toFixed(1)} ${(y + Math.sin(a) * r * 0.35).toFixed(1)}L${(x + Math.cos(a) * r).toFixed(1)} ${(y + Math.sin(a) * r).toFixed(1)}`
  }
  return `<path d="${d}" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="${r * 0.15}" fill="${color}"/>`
}

/** Crescent moon; (x, y) = center. Bounds: radius 22. */
const moon = (x: number, y: number) => `<path d="M${x + 6} ${y - 21}A22 22 0 1 0 ${x + 6} ${y + 21}A17 17 0 1 1 ${x + 6} ${y - 21}Z" fill="#fff3c4"/>`

/** Boat with cabin lights and a pennant flying right (dir 1) or left (−1); (x, y) = waterline center. Bounds: x ±28, y from −38 to +6. */
const boat = (x: number, y: number, hull: string) =>
  `<path d="M${x - 28} ${y - 8}h56l-8 14h-40Z" fill="${hull}"/><rect x="${x - 14}" y="${y - 20}" width="26" height="12" fill="#3d4a55"/>` +
  `<rect x="${x - 10}" y="${y - 17}" width="5" height="5" fill="#ffd98a"/><rect x="${x - 2}" y="${y - 17}" width="5" height="5" fill="#ffd98a"/><rect x="${x + 6}" y="${y - 17}" width="4" height="5" fill="#ffd98a"/>` +
  `<path d="M${x + 8} ${y - 20}V${y - 38}" stroke="#c9d1da" stroke-width="2"/>`
const pennant = (x: number, y: number, dir: 1 | -1) => `<path d="M${x} ${y}l${14 * dir} 5l${-14 * dir} 5Z" fill="#e63946"/>`

/** Bridge railing section 40 wide with `n` posts, rail on y. */
const railing = (x0: number, y: number, n: number) => {
  let s = ''
  for (let i = 0; i < n; i++) s += `<rect x="${(x0 + 2 + (i * 34) / (n - 1)).toFixed(1)}" y="${y}" width="3" height="16" fill="#8d99ae"/>`
  return s
}

/** Balloon on a string; (x, y) = balloon center. Bounds: x ±10, y from −13 to +24. */
const balloon = (x: number, y: number) =>
  `<path d="M${x} ${y + 13}q3 6 -1 11" stroke="#8d99ae" stroke-width="1.2" fill="none"/><ellipse cx="${x}" cy="${y}" rx="10" ry="13" fill="#ff4fa3"/>`

const buoy = (x: number, y: number) =>
  `<path d="M${x - 8} ${y}h16l-3 -14h-10Z" fill="#e63946"/><rect x="${x - 7}" y="${y - 9}" width="14" height="3" fill="#fff"/><circle cx="${x}" cy="${y - 17}" r="3" fill="#ffd166"/>`

export default svgLevel({
  id: 120,
  chapter: 'city',
  title: 'citySalute',
  parTimeSec: 80,
  scene: ({ diff, anim, rand, extra }) => {
    let stars = ''
    for (let i = 0; i < 40; i++) {
      const x = rand() * 800
      const y = rand() * 200
      if (Math.hypot(x - 60, y - 40) > 26 && Math.hypot(x - 700, y - 60) > 32) stars += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.8 + rand()).toFixed(1)}" fill="#fff8d6"/>`
    }
    let skyline = ''
    const towers: [number, number, number, string][] = [[0, 60, 250, '#232a52'], [60, 70, 220, '#2b2f5e'], [130, 50, 260, '#232a52'], [380, 80, 230, '#2b2f5e'], [470, 60, 270, '#232a52'], [600, 70, 240, '#2b2f5e'], [670, 60, 210, '#232a52'], [730, 70, 255, '#2b2f5e']]
    for (const [x, w, top, c] of towers) {
      skyline += `<rect x="${x}" y="${top}" width="${w}" height="${330 - top}" fill="${c}"/>`
      for (let y = top + 10; y < 320; y += 16) for (let wx = x + 8; wx < x + w - 8; wx += 14) if (rand() < 0.45) skyline += `<rect x="${wx}" y="${y}" width="7" height="8" fill="#ffd98a"/>`
    }
    let reflections = ''
    for (let i = 0; i < 26; i++) reflections += `<rect x="${(rand() * 780).toFixed(1)}" y="${(344 + rand() * 90).toFixed(1)}" width="${(10 + rand() * 20).toFixed(1)}" height="2" fill="${['#ffd98a', '#ff4fa3', '#4df0ff'][i % 3]}" fill-opacity="0.5"/>`
    let crowd = ''
    for (let x = 6; x < 800; x += 26) {
      const h = 14 + rand() * 10
      crowd += `<circle cx="${x}" cy="${470 - h}" r="9" fill="#0d0f24"/><rect x="${x - 12}" y="${474 - h}" width="24" height="${40 + h}" rx="10" fill="#0d0f24"/>`
    }
    let rails = ''
    for (let x = 4; x < 360; x += 40) if (x !== 204) rails += railing(x, 290, 4)
    const bobbing = (period: number) => anim({ type: 'bob', dx: 0, dy: -4, period }, boat(680, 404, '#f4f4f4') + pennant(688, 366, 1))

    return (
      `<rect width="800" height="500" fill="#1f2350"/><rect width="800" height="180" fill="#141433"/>` + stars +
      diff(60, 40, 22, `<path d="M60 32l2 6l6 0.5l-5 4l2 6l-5 -3.5l-5 3.5l2 -6l-5 -4l6 -0.5Z" fill="#fff3a3"/>`, '') +
      diff(700, 60, 30, moon(700, 60), `<g transform="rotate(-40 700 60)">${moon(700, 60)}</g>`) +
      // Fireworks
      anim({ type: 'blink', duty: 0.7, period: 2.6 }, burst(150, 86, 44, '#ffd23f', 16)) +
      anim({ type: 'blink', duty: 0.6, period: 3.1, phase: 0.3 }, burst(330, 62, 34, '#4df0ff', 14)) +
      anim({ type: 'blink', duty: 0.75, period: 2.2, phase: 0.5 }, burst(530, 96, 40, '#ff4fa3', 16)) +
      diff(250, 172, 24, burst(250, 172, 15, '#8ac926'), burst(250, 172, 19, '#8ac926')) +
      diff(430, 168, 24, burst(430, 168, 17, '#ff9f1c'), burst(430, 168, 17, '#f2c33a')) +
      diff(624, 188, 24, burst(624, 188, 18, '#b38cff'), anim({ type: 'blink', duty: 0.5, period: 1.3 }, burst(624, 188, 18, '#b38cff'))) +
      // City and the TV tower
      skyline +
      `<path d="M560 330L548 150h24Z" fill="#2b2f5e"/><ellipse cx="560" cy="160" rx="18" ry="9" fill="#3a3f72"/><path d="M560 150V112" stroke="#8d99ae" stroke-width="3"/>` +
      `<circle cx="560" cy="112" r="3" fill="#e63946"/>` +
      // River
      `<rect y="330" width="800" height="114" fill="#16193a"/>` + reflections +
      // Bridge
      `<rect y="306" width="360" height="12" fill="#3d4a66"/><path d="M0 290H360" stroke="#8d99ae" stroke-width="3"/>` + rails +
      diff(224, 300, 24, railing(204, 290, 4), railing(204, 290, 5)) +
      `<path d="M0 318q60 40 120 0q60 40 120 0q60 40 120 0" stroke="#3d4a66" stroke-width="10" fill="none"/><path d="M0 318V360M120 318V360M240 318V360M354 318V360" stroke="#3d4a66" stroke-width="10"/>` +
      // Boats and a buoy
      boat(480, 392, '#e9c46a') +
      diff(488, 358, 22, pennant(488, 354, 1), pennant(488, 354, -1)) +
      diff(680, 390, 32, bobbing(2.2), bobbing(0.8)) +
      diff(584, 414, 22, buoy(578, 426), buoy(590, 426)) +
      // Embankment with the crowd
      `<rect y="444" width="800" height="56" fill="#2a2d4a"/><path d="M0 444H800" stroke="#4a4f78" stroke-width="4"/>` +
      crowd +
      diff(380, 412, 24, '', balloon(380, 408)) +
      gullStanding(300, 291) +
      bird(40, 291) +
      bike(130, 304, '#ffb703') +
      bollard(345, 303) +
      lifeRing(120, 335) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['spaceStar', 546, 32],
        ['sparkle', 579, 345],
        ['spaceStar', 149, 241],
        ['sparkle', 382, 39],
        ['spaceStar', 749, 223],
      ])
    )
  },
})
