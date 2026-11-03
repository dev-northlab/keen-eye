// Motion differences: the owl blinks only on picture B; the glowing mushroom pulses faster on B; the bat flies faster on B.
import { svgLevel } from '../helpers.ts'
import { acorn, anthill, backpack, floor, fox, hedgehog, lantern, mushroom, pine, pineCone, tent } from './shapes.ts'

/** Owl on a branch; (x, y) = feet. The eyes are separate. Bounds: x ±16, y from −36 to 0. */
const owlBody = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-16" rx="14" ry="17" fill="#8d6e53"/><ellipse cy="-10" rx="8" ry="9" fill="#c9a784"/>` +
  `<path d="M-12 -30l-2 -6l8 3ZM12 -30l2 -6l-8 3Z" fill="#8d6e53"/><path d="M-2 -20l2 4l2 -4Z" fill="#f4a261"/></g>`
/** Owl eyes at (x, y) = feet. Bounds: x ±10, y from −30 to −20. */
const eyes = (x: number, y: number) =>
  `<circle cx="${x - 5}" cy="${y - 25}" r="4.5" fill="#fff"/><circle cx="${x + 5}" cy="${y - 25}" r="4.5" fill="#fff"/><circle cx="${x - 4}" cy="${y - 25}" r="2.2" fill="#222"/><circle cx="${x + 6}" cy="${y - 25}" r="2.2" fill="#222"/>`

/** Bat, faces right; (x, y) = body center. Bounds: x ±20, y from −10 to +8. */
const bat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-4 0q-8 -12 -20 -4q6 2 6 8q6 -4 14 0Z" fill="#2b2b3a"/><path d="M4 0q8 -12 20 -4q-6 2 -6 8q-6 -4 -14 0Z" fill="#2b2b3a"/>` +
  `<ellipse rx="5" ry="7" fill="#2b2b3a"/><path d="M-4 -6l-2 -5l4 2ZM4 -6l2 -5l-4 2Z" fill="#2b2b3a"/></g>`

/** Star; (x, y) = center. Bounds: radius 6. */
const star = (x: number, y: number) =>
  `<path d="M${x} ${y - 6}l1.8 4.2l4.2 0.4l-3.2 2.8l1.2 4.2l-4 -2.4l-4 2.4l1.2 -4.2l-3.2 -2.8l4.2 -0.4Z" fill="#fff3a3"/>`

/** Glowing mushroom cap without its own fill (recolored by the animation); (x, y) = stem bottom. Bounds: x ±14, y from −30 to 0. */
const glowCap = (x: number, y: number) => `<path d="M${x - 14} ${y - 12}q14 -24 28 0Z"/>`

/** Tent window light; (x, y) = tent ground center. Bounds: radius 12 around (x, y − 26). */
const tentLight = (x: number, y: number, color: string) => `<circle cx="${x}" cy="${y - 26}" r="9" fill="${color}"/>`

export default svgLevel({
  id: 49,
  chapter: 'forest',
  title: 'nightOwls',
  parTimeSec: 120,
  scene: ({ diff, anim, rand }) => {
    let stars = ''
    for (let i = 0; i < 16; i++) {
      const x = rand() * 800
      const y = 10 + rand() * 110
      if (Math.hypot(x - 680, y - 70) < 60 || Math.hypot(x - 200, y - 50) < 40) continue
      stars += star(x, y)
    }
    let flies = ''
    for (let i = 0; i < 8; i++) flies += anim({ type: 'blink', period: 1.2 + rand(), phase: rand(), duty: 0.5 }, `<circle cx="${100 + rand() * 600}" cy="${300 + rand() * 180}" r="3" fill="#d9ff7a"/>`)
    const look = eyes(300, 230)
    const glowing = (period: number) => anim({ type: 'color', colors: ['#8ac926', '#d9ff7a', '#8ac926'], period }, glowCap(560, 470))
    const flapping = (period: number) => anim({ id: 'bat', type: 'path', points: [[0, 0], [140, -20]], flipX: 420, period }, bat(420, 130))

    return (
      `<rect width="800" height="500" fill="#1d2a4a"/>` +
      stars +
      diff(200, 50, 18, '', star(200, 50)) +
      diff(680, 70, 36, `<circle cx="680" cy="70" r="30" fill="#f4f1de"/>`, `<circle cx="680" cy="70" r="30" fill="#f4f1de"/><circle cx="668" cy="62" r="24" fill="#1d2a4a"/>`) +
      diff(420, 130, 24, flapping(9), flapping(4.5), 'bat') +
      `<path d="M0 260Q200 230 400 250T800 240V500H0Z" fill="#1f3d2a"/>` +
      pine(60, 280, 1.4, '#163020') +
      pine(720, 270, 1.3, '#163020') +
      pine(500, 290, 1, '#163020') +
      // Tree with owls
      `<rect x="260" y="120" width="26" height="200" fill="#2b2b3a"/><path d="M273 230l50 -16M273 200l-50 -20" stroke="#2b2b3a" stroke-width="8" stroke-linecap="round"/>` +
      `<circle cx="273" cy="110" r="46" fill="#163020"/><circle cx="240" cy="140" r="30" fill="#163020"/>` +
      owlBody(300, 230) +
      diff(300, 205, 18, look, anim({ type: 'blink', period: 2.5, duty: 0.8 }, look)) +
      diff(230, 180, 24, owlBody(230, 196) + eyes(230, 196), '') +
      `<rect y="320" width="800" height="180" fill="#244d35"/>` +
      tent(680, 440, '#8338ec') +
      diff(680, 414, 18, tentLight(680, 440, '#ffd166'), tentLight(680, 440, '#8ac926')) +
      diff(140, 444, 34, fox(140, 460), fox(140, 460, true)) +
      hedgehog(400, 470, true) +
      `<rect x="555" y="456" width="10" height="14" rx="3" fill="#fff3d6"/>` +
      diff(560, 462, 22, glowing(3), glowing(1)) +
      `<circle cx="560" cy="460" r="30" fill="#d9ff7a" fill-opacity="0.12"/>` +
      mushroom(610, 486, '#a0703f', 0.8) +
      floor(rand, 330, 480, 10) +
      flies +
      lantern(608, 442) +
      backpack(752, 444) +
      pineCone(300, 478) +
      acorn(230, 482) +
      anthill(480, 412)
    )
  },
})
