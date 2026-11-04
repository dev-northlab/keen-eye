// Motion differences: the big firework bursts at another moment on picture B; the lantern swings only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { ball, balloon, bollard, coffeeCup, person, sandwichBoard, shoppingBag, skyline } from './shapes.ts'

/** Firework burst; (x, y) = center. Bounds: radius 26. */
const burst = (x: number, y: number, color: string) => {
  let rays = ''
  for (let a = 0; a < 360; a += 30) rays += `<path d="M0 -8v-16" stroke="${color}" stroke-width="3" stroke-linecap="round" transform="rotate(${a})"/>`
  return `<g transform="translate(${x} ${y})">${rays}<circle r="5" fill="#fff"/></g>`
}

/** Star; (x, y) = center. Bounds: radius 6. */
const star = (x: number, y: number) =>
  `<path d="M${x} ${y - 6}l1.8 4.2l4.2 0.4l-3.2 2.8l1.2 4.2l-4 -2.4l-4 2.4l1.2 -4.2l-3.2 -2.8l4.2 -0.4Z" fill="#fff3a3"/>`

/** Paper lantern hanging from (x, y). Bounds: x ±10, y from 0 to +30. */
const lantern = (x: number, y: number, color = '#e63946') =>
  `<path d="M${x} ${y}v6" stroke="#555" stroke-width="2"/><ellipse cx="${x}" cy="${y + 18}" rx="10" ry="12" fill="${color}"/>` +
  `<path d="M${x - 10} ${y + 14}h20M${x - 10} ${y + 22}h20" stroke="#fff" stroke-opacity="0.3" stroke-width="2"/><rect x="${x - 3}" y="${y + 29}" width="6" height="3" fill="#ffd166"/>`

/** Boat with a lantern on the river; (x, y) = waterline center. The light is separate. Bounds: x ±30, y from −30 to +8. */
const boat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-30 -8h60l-8 16h-44Z" fill="#6b4f3a"/><rect x="-10" y="-24" width="20" height="16" rx="3" fill="#8a5a33"/><rect x="12" y="-30" width="3" height="22" fill="#3d4a55"/></g>`
/** Boat light at the mast top of the boat at (x, y). Bounds: radius 6 around (x + 13, y − 32). */
const boatLight = (x: number, y: number, color: string) => `<circle cx="${x + 13}" cy="${y - 32}" r="5" fill="${color}"/>`

export default svgLevel({
  id: 40,
  chapter: 'city',
  title: 'fireworks',
  parTimeSec: 120,
  scene: ({ diff, anim, rand, extra }) => {
    let stars = ''
    for (let i = 0; i < 18; i++) {
      const x = rand() * 800
      const y = 10 + rand() * 120
      if (Math.hypot(x - 700, y - 70) < 60 || Math.hypot(x - 400, y - 90) < 50 || Math.hypot(x - 160, y - 60) < 40) continue
      stars += star(x, y)
    }
    let crowd = ''
    for (let i = 0; i < 9; i++) crowd += `<circle cx="${40 + i * 90 + rand() * 20}" cy="${446 + rand() * 6}" r="9" fill="#1d2a4a"/><rect x="${30 + i * 90 + rand() * 20}" y="455" width="20" height="45" rx="6" fill="#1d2a4a"/>`
    const big = (phase: number) => anim({ type: 'blink', period: 2.4, phase, duty: 0.45 }, burst(400, 90, '#ff006e'))
    const hanging = lantern(560, 300)

    return (
      `<rect width="800" height="500" fill="#1d2a4a"/>` +
      stars +
      diff(160, 60, 18, '', star(160, 60)) +
      diff(700, 70, 36, `<circle cx="700" cy="70" r="30" fill="#f4f1de"/>`, `<circle cx="700" cy="70" r="30" fill="#f4f1de"/><circle cx="688" cy="62" r="24" fill="#1d2a4a"/>`) +
      diff(400, 90, 30, big(0), big(0.5)) +
      anim({ type: 'blink', period: 3, phase: 0.3, duty: 0.4 }, burst(240, 140, '#ffb703')) +
      anim({ type: 'blink', period: 2.7, phase: 0.7, duty: 0.4 }, burst(560, 130, '#8ac926')) +
      skyline(rand, 300, '#2b3b63') +
      // Lantern strings
      `<path d="M0 290Q400 330 800 290" stroke="#555" stroke-width="2" fill="none"/>` +
      lantern(120, 296) +
      lantern(260, 306) +
      lantern(400, 310, '#ffb703') +
      diff(560, 318, 20, hanging, anim({ type: 'sway', angle: 14, pivot: [560, 300], period: 1.6 }, hanging)) +
      lantern(700, 294) +
      // Embankment and river
      `<rect y="400" width="800" height="100" fill="#263760"/>` +
      `<rect y="400" width="800" height="12" fill="#3d4a55"/>` +
      `<rect y="412" width="800" height="26" fill="#1d2a4a"/>` +
      `<rect y="438" width="800" height="62" fill="#2d3a55"/>` +
      boat(620, 470) +
      diff(633, 438, 18, boatLight(620, 470, '#ffd166'), boatLight(620, 470, '#8ac926')) +
      crowd +
      diff(300, 408, 20, person(300, 443, '#e63946'), person(300, 443, '#3a86ff')) +
      person(360, 443, '#ffb703', true) +
      diff(376, 383, 34, balloon(376, 371, '#8ac926'), balloon(376, 371, '#ff006e')) +
      person(480, 443, '#8338ec') +
      shoppingBag(420, 438) +
      ball(560, 438) +
      coffeeCup(520, 438) +
      sandwichBoard(670, 438) +
      bollard(150, 438) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['spaceStar', 226, 327],
        ['sparkle', 474, 122],
        ['spaceStar', 559, 385],
        ['sparkle', 324, 123],
        ['spaceStar', 635, 119],
      ])
    )
  },
})
