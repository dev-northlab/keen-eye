// Motion differences: the bat flies faster on picture B; the cat's tail swings only on B.
import { mushroom, stump } from '../chapter-03/shapes.ts'
import { svgLevel } from '../helpers.ts'
import { fence, grass, hayBale, milkCan, pumpkin, stones } from '../shapes.ts'

/** Bat, faces right; (x, y) = body center. Bounds: x ±20, y from −10 to +8. */
const bat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-4 0q-8 -12 -20 -4q6 2 6 8q6 -4 14 0Z" fill="#2b2b3a"/><path d="M4 0q8 -12 20 -4q-6 2 -6 8q-6 -4 -14 0Z" fill="#2b2b3a"/>` +
  `<ellipse rx="5" ry="7" fill="#2b2b3a"/><path d="M-4 -6l-2 -5l4 2ZM4 -6l2 -5l-4 2Z" fill="#2b2b3a"/>` +
  `<circle cx="-2" cy="-3" r="1" fill="#ffd166"/><circle cx="2" cy="-3" r="1" fill="#ffd166"/></g>`

/** Owl sitting; (x, y) = bottom center. Bounds: x ±16, y from −36 to 0. */
const owl = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<ellipse cy="-16" rx="16" ry="18" fill="#8d6e53"/><ellipse cy="-10" rx="9" ry="10" fill="#c9a784"/>` +
  `<path d="M-14 -30l-2 -6l8 3ZM14 -30l2 -6l-8 3Z" fill="#8d6e53"/>` +
  `<circle cx="-6" cy="-26" r="5" fill="#fff"/><circle cx="6" cy="-26" r="5" fill="#fff"/>` +
  `<circle cx="-6" cy="-26" r="2.5" fill="#222"/><circle cx="6" cy="-26" r="2.5" fill="#222"/>` +
  `<path d="M-2 -21l2 4l2 -4Z" fill="#f4a261"/></g>`

/** Sleeping cat on the hay; (x, y) = bottom center, tail separate. Bounds: x ±22, y from −20 to 0. */
const cat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-8" rx="22" ry="9" fill="#e9b872"/>` +
  `<circle cx="14" cy="-14" r="8" fill="#e9b872"/><path d="M8 -20l1 -6l5 3ZM20 -20l-1 -6l-5 3Z" fill="#e9b872"/>` +
  `<path d="M10 -13q3 2 6 0M15 -13q3 2 6 0" stroke="#8a5a33" stroke-width="1.5" fill="none"/></g>`

/** Cat tail; (x, y) = root. Bounds: x from −18 to +2, y from −16 to +2. */
const tail = (x: number, y: number) => `<path d="M${x} ${y}q-10 2 -14 -8q-2 -6 -4 -6" stroke="#e9b872" stroke-width="5" fill="none" stroke-linecap="round"/>`

/** Star; (x, y) = center. Bounds: radius 7. */
const star = (x: number, y: number) =>
  `<path d="M${x} ${y - 7}l2 5l5 0.5l-4 3.5l1.5 5l-4.5 -3l-4.5 3l1.5 -5l-4 -3.5l5 -0.5Z" fill="#fff3a3"/>`

/** Lantern on a post; (x, y) = post foot; `light` = glass color. */
const lantern = (x: number, y: number) =>
  `<rect x="${x - 3}" y="${y - 110}" width="6" height="110" fill="#333"/>` + `<path d="M${x - 10} ${y - 110}h20" stroke="#333" stroke-width="4"/>`
const glass = (x: number, y: number, light: string) =>
  `<rect x="${x - 10}" y="${y - 140}" width="20" height="26" rx="3" fill="${light}" stroke="#333" stroke-width="2"/>` +
  `<path d="M${x - 8} ${y - 140}l8 -8l8 8Z" fill="#333"/>`

export default svgLevel({
  id: 19,
  chapter: 'farm',
  title: 'nightBarn',
  parTimeSec: 100,
  scene: ({ diff, anim, rand }) => {
    let stars = ''
    for (let i = 0; i < 14; i++) {
      const x = rand() * 800
      const y = 20 + rand() * 150
      if (Math.hypot(x - 700, y - 90) < 70 || Math.hypot(x - 300, y - 60) < 40) continue
      stars += anim({ type: 'blink', period: 2 + rand() * 2, phase: rand(), duty: 0.7 }, star(x, y))
    }
    let tufts = ''
    for (let i = 0; i < 12; i++) tufts += grass(10 + rand() * 780, 400 + rand() * 95).replace('#5fae4b', '#2f5e3a')
    let flies = ''
    for (let i = 0; i < 6; i++) {
      const x = 40 + rand() * 180
      const y = 380 + rand() * 90
      flies += anim({ type: 'blink', period: 1.3 + rand(), phase: rand(), duty: 0.5 }, `<circle cx="${x}" cy="${y}" r="3" fill="#d9ff7a"/>`)
    }
    const flight = (period: number) =>
      anim({ id: 'bat', type: 'path', points: [[0, 0], [160, -20]], flipX: 420, period }, bat(420, 140))
    const catTail = tail(640, 384)

    return (
      `<rect width="800" height="500" fill="#1d2a4a"/>` +
      `<rect y="120" width="800" height="200" fill="#263760"/>` +
      stars +
      diff(300, 60, 20, '', star(300, 60)) +
      diff(700, 90, 40, `<circle cx="700" cy="90" r="32" fill="#f4f1de"/>`, `<circle cx="700" cy="90" r="32" fill="#f4f1de"/><circle cx="686" cy="80" r="26" fill="#1d2a4a"/>`) +
      diff(420, 140, 26, flight(10), flight(5), 'bat') +
      `<ellipse cx="400" cy="330" rx="520" ry="60" fill="#2b5a3e"/>` +
      `<rect y="340" width="800" height="160" fill="#244d35"/>` +
      // Barn
      `<rect x="280" y="190" width="240" height="160" fill="#7d2e2a"/>` +
      `<path d="M265 196L400 120L535 196Z" fill="#4a1f1c"/>` +
      `<rect x="370" y="250" width="60" height="100" fill="#3a1a18"/><path d="M370 250l60 100M430 250l-60 100" stroke="#5a2d28" stroke-width="4"/>` +
      `<rect x="300" y="215" width="36" height="36" fill="#ffd166"/><rect x="464" y="215" width="36" height="36" fill="#ffd166"/>` +
      `<path d="M318 215v36M300 233h36M482 215v36M464 233h36" stroke="#4a1f1c" stroke-width="3"/>` +
      // Lantern post
      lantern(160, 350) +
      diff(160, 223, 22, glass(160, 350, '#ffd166'), glass(160, 350, '#8ac926')) +
      `<circle cx="160" cy="227" r="40" fill="#ffd166" fill-opacity="0.12"/>` +
      fence(560, 800, 330, '#6b4f3a') +
      diff(690, 300, 24, owl(690, 318), '') +
      // Hay with the sleeping cat
      hayBale(640, 420) +
      diff(632, 378, 22, catTail, anim({ type: 'sway', angle: 18, pivot: [640, 384], period: 1.6 }, catTail)) +
      cat(640, 390) +
      tufts +
      flies +
      pumpkin(240, 352) +
      stump(550, 470) +
      mushroom(360, 440) +
      milkCan(545, 348) +
      stones(740, 470)
    )
  },
})
