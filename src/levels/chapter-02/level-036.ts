// Motion differences: the skater glides faster on picture B; the star on the tree blinks only on B.
import { bird } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { awning, building, cloud, mailbox, newspaperBox, parkingMeter, person, shoppingBag } from './shapes.ts'
import { level036Redesign } from './level-036-redesign.ts'

/** Skater, faces right; (x, y) = blade level. Bounds: x ±14, y from −62 to 0. */
const skater = (x: number, y: number, coat: string) =>
  person(x, y - 2, coat) + `<path d="M${x - 12} ${y}h10M${x + 2} ${y}h10" stroke="#3d4a55" stroke-width="2"/>`

/** Decorated fir; (x, y) = bottom of the trunk. The top star and the marked bauble are separate. Bounds: x ±44, y from −130 to 0. */
const fir = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-6" y="-14" width="12" height="14" fill="#6b4f3a"/>` +
  `<path d="M0 -130L-30 -80h14L-38 -44h18L-44 -14h88L36 -44h-18L30 -80h-14Z" fill="#2f7d55"/>` +
  `<circle cx="-12" cy="-60" r="5" fill="#e63946"/><circle cx="14" cy="-40" r="5" fill="#3a86ff"/><circle cx="-20" cy="-26" r="5" fill="#ffb703"/>` +
  `<circle cx="22" cy="-22" r="5" fill="#e63946"/><circle cx="4" cy="-90" r="4" fill="#ffb703"/></g>`
/** Star on the fir at (x, y) = trunk bottom. Bounds: radius 10 around (x, y − 132). */
const star = (x: number, y: number) =>
  `<path d="M${x} ${y - 142}l3 7l7 1l-5 5l1.5 7l-6.5 -4l-6.5 4l1.5 -7l-5 -5l7 -1Z" fill="#ffd166"/>`
/** Bauble on the fir at (x, y) = trunk bottom. Bounds: radius 6 around (x − 4, y − 48). */
const bauble = (x: number, y: number, color: string) => `<circle cx="${x - 4}" cy="${y - 48}" r="5" fill="${color}"/>`

/** Snowman; (x, y) = ground center. The hat is separate. Bounds: x ±22, y from −62 to 0. */
const snowman = (x: number, y: number, scarf: string) =>
  `<g transform="translate(${x} ${y})"><circle cy="-18" r="20" fill="#fff"/><circle cy="-48" r="14" fill="#fff"/>` +
  `<path d="M-13 -36q13 6 26 0v6q-13 6 -26 0Z" fill="${scarf}"/><circle cx="-5" cy="-51" r="2" fill="#333"/><circle cx="5" cy="-51" r="2" fill="#333"/>` +
  `<path d="M0 -47l10 2l-10 2Z" fill="#f77f00"/><circle cy="-22" r="2" fill="#333"/><circle cy="-12" r="2" fill="#333"/></g>`
/** Snowman hat; (x, y) = ground center. Bounds: x ±14, y from −74 to −58. */
const hat = (x: number, y: number) => `<rect x="${x - 9}" y="${y - 74}" width="18" height="12" fill="#333"/><rect x="${x - 14}" y="${y - 62}" width="28" height="4" fill="#333"/>`

/** Snowball pile; (x, y) = bottom center. Bounds: x ±16, y from −20 to 0. */
const snowballs = (x: number, y: number) =>
  `<circle cx="${x - 8}" cy="${y - 7}" r="7" fill="#fff"/><circle cx="${x + 8}" cy="${y - 7}" r="7" fill="#fff"/><circle cx="${x}" cy="${y - 14}" r="6" fill="#fff"/>`

export default svgLevel({
  id: 36,
  chapter: 'city',
  title: 'iceRink',
  parTimeSec: 110,
  redesign: level036Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let flakes = ''
    for (let i = 0; i < 40; i++) flakes += `<circle cx="${rand() * 800}" cy="${rand() * 500}" r="${2 + rand() * 2}" fill="#fff" fill-opacity="0.9"/>`
    const gliding = (period: number) =>
      anim({ id: 'skater', type: 'path', points: [[0, 0], [110, 10], [220, 0]], flipX: 260, period }, skater(260, 440, '#e63946'))
    const topStar = star(640, 400)

    return (
      `<rect width="800" height="500" fill="#c7d9ea"/>` +
      anim({ type: 'path', points: [[0, 0], [40, 0]], period: 30 }, cloud(200, 60, 0.8)) +
      building(0, 300, 200, 220, '#c98bb9', '#ffd166') +
      building(200, 300, 240, 180, '#7aa6d6', '#ffd166') +
      building(440, 300, 160, 240, '#e07a5f', '#ffd166') +
      building(600, 300, 200, 200, '#81b29a', '#ffd166') +
      `<path d="M0 300h800v8q-20 10 -40 0t-40 0t-40 0t-40 0t-40 0t-40 0t-40 0t-40 0t-40 0t-40 0t-40 0t-40 0t-40 0t-40 0t-40 0t-40 0t-40 0t-40 0t-40 0t-40 0Z" fill="#fff"/>` +
      `<rect y="300" width="800" height="200" fill="#eef4fb"/>` +
      // Rink
      `<ellipse cx="300" cy="440" rx="240" ry="50" fill="#8d99ae"/><ellipse cx="300" cy="436" rx="230" ry="42" fill="#d6ecfa"/>` +
      diff(260, 408, 36, gliding(12), gliding(6), 'skater') +
      skater(400, 460, '#3a86ff') +
      diff(170, 435, 20, skater(170, 470, '#8ac926'), skater(170, 470, '#ff006e')) +
      // Fir
      fir(640, 400) +
      diff(640, 268, 18, topStar, anim({ type: 'blink', period: 1, duty: 0.6 }, topStar)) +
      diff(636, 352, 18, bauble(640, 400, '#ff006e'), bauble(640, 400, '#8ac926')) +
      // Drinks stand
      `<rect x="684" y="400" width="96" height="60" fill="#6b4f3a"/><rect x="690" y="408" width="84" height="24" fill="#f4f1de"/>` +
      diff(732, 390, 52, awning(732, 376, 100, '#e63946'), awning(732, 376, 100, '#3a86ff')) +
      person(760, 470, '#8338ec', true) +
      // Snowman and snowballs
      snowman(60, 480, '#e63946') +
      diff(60, 414, 20, hat(60, 480), '') +
      diff(120, 478, 18, snowballs(120, 488), '') +
      shoppingBag(560, 430) +
      bird(520, 58) +
      mailbox(500, 345) +
      newspaperBox(300, 345) +
      parkingMeter(150, 345) +
      anim({ type: 'path', points: [[0, 0], [-10, 40]], period: 3.5 }, flakes) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['flowerBox', 739, 278, '#ff006e'],
        ['flowerBox', 497, 282, '#e63946'],
        ['cloud', 397, 71],
        ['birds', 707, 49],
        ['bird', 594, 459],
        ['stones', 170, 364],
        ['pine', 60, 363],
        ['bird', 350, 328],
        ['stones', 561, 362],
        ['bird', 239, 323],
      ])
    )
  },
})
