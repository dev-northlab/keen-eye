// Motion differences: the school clock runs backwards on picture B; the ball bounces faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bollard, bus, cityTree, cloud, door, mailbox, person, scooter, shoppingBag, skateboard, street, sun, window } from './shapes.ts'
import { level035Redesign } from './level-035-redesign.ts'

/** Clock face; (x, y) = center. The hands are separate. */
const clockFace = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="20" fill="#ffffff" stroke="#3d4a55" stroke-width="4"/>` +
  `<path d="M${x} ${y - 15}v4M${x} ${y + 11}v4M${x - 15} ${y}h4M${x + 11} ${y}h4" stroke="#3d4a55" stroke-width="2"/>`
/** Clock hands pivoting on (x, y). Bounds: radius 14. */
const hands = (x: number, y: number) =>
  `<path d="M${x} ${y}v-13M${x} ${y}h9" stroke="#3d4a55" stroke-width="3" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="2.5" fill="#3d4a55"/>`

/** Child with a backpack, faces right; (x, y) = feet. The backpack is separate. Bounds: x ±10, y from −44 to 0. */
const kid = (x: number, y: number, shirt: string, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -0.7 : 0.7} 0.7)">` + person(0, 0, shirt).replace('translate(0 0) scale(1 1)', '') + `</g>`
/** Backpack on the back of a child at (x, y) = feet, facing right. Bounds: x from −16 to −6, y from −34 to −18. */
const backpack = (x: number, y: number, color: string) => `<rect x="${x - 16}" y="${y - 34}" width="10" height="16" rx="3" fill="${color}"/>`

/** Flag cloth to the right of the pole top at (x, y). Bounds: x from 0 to +30, y from −2 to +20. */
const flagCloth = (x: number, y: number, color: string) => `<path d="M${x + 2} ${y}h28l-5 10l5 10h-28Z" fill="${color}"/>`

/** Basketball hoop; (x, y) = foot of the post. The backboard is separate. */
const hoop = (x: number, y: number) =>
  `<rect x="${x - 3}" y="${y - 120}" width="6" height="120" fill="#3d4a55"/><ellipse cx="${x - 22}" cy="${y - 92}" rx="14" ry="4" fill="none" stroke="#fb8500" stroke-width="3"/>` +
  `<path d="M${x - 34} ${y - 92}l4 16M${x - 26} ${y - 90}l1 18M${x - 18} ${y - 90}l-1 18M${x - 10} ${y - 92}l-4 16M${x - 30} ${y - 76}h20" stroke="#fff" stroke-width="1.5" fill="none"/>`
/** Backboard behind the hoop at (x, y) = post foot. Bounds: x from −22 to +4, y from −126 to −94. */
const backboard = (x: number, y: number, color: string) =>
  `<rect x="${x - 22}" y="${y - 126}" width="26" height="32" rx="2" fill="${color}"/><rect x="${x - 16}" y="${y - 112}" width="12" height="12" fill="none" stroke="#3d4a55" stroke-width="2"/>`

/** Ball; (x, y) = center. Bounds: radius 9. */
const ball = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="9" fill="#fb8500"/><path d="M${x - 9} ${y}h18M${x} ${y - 9}v18" stroke="#8a3b2b" stroke-width="1.5"/>`

/** Stop sign on the bus at (x, y) = ground center, facing right. Bounds: x from 58 to 74, y from −44 to −28. */
const stopSign = (x: number, y: number) =>
  `<path d="M${x + 60} ${y - 42}h12l4 4v8l-4 4h-12l-4 -4v-8Z" fill="#e63946"/><path d="M${x + 62} ${y - 36}h8" stroke="#fff" stroke-width="2"/>`

export default svgLevel({
  id: 35,
  chapter: 'city',
  title: 'school',
  parTimeSec: 110,
  redesign: level035Redesign,
  scene: ({ diff, anim, extra }) => {
    const ticking = (reverse: boolean) => anim({ type: 'rotate', pivot: [400, 110], period: 12, reverse }, hands(400, 110))
    const bouncing = (period: number) => anim({ id: 'ball', type: 'bob', dx: 0, dy: 10, period }, ball(560, 420))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(700, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(150, 60, 0.8)) +
      // School
      `<rect x="160" y="150" width="480" height="200" fill="#f2cc8f"/><rect x="152" y="142" width="496" height="12" fill="#e07a5f"/>` +
      `<rect x="340" y="80" width="120" height="70" fill="#f2cc8f"/><path d="M330 80h140l-70 -30Z" fill="#e07a5f"/>` +
      clockFace(400, 110) +
      diff(400, 110, 18, ticking(false), ticking(true)) +
      window(210, 200) +
      window(280, 200) +
      window(520, 200) +
      window(590, 200) +
      window(210, 270) +
      window(280, 270) +
      window(520, 270) +
      window(590, 270) +
      `<rect x="360" y="190" width="80" height="160" fill="#2a9d8f"/><rect x="372" y="200" width="56" height="60" fill="#bde3f2"/>` +
      door(400, 350, '#1d7268') +
      `<path d="M330 350h140l-10 -20h-120Z" fill="#e07a5f"/>` +
      `<rect x="60" y="150" width="4" height="200" fill="#3d4a55"/><circle cx="62" cy="148" r="4" fill="#ffd166"/>` +
      diff(78, 162, 22, flagCloth(62, 152, '#e63946'), flagCloth(62, 152, '#3a86ff')) +
      cityTree(120, 350, 1.3) +
      cityTree(720, 350, 1.2, '#3f9a5a') +
      hoop(620, 350) +
      diff(611, 240, 22, backboard(620, 350, '#ffffff'), backboard(620, 350, '#ffb703')) +
      street(370, 130) +
      `<path d="M300 390h200M300 420h200M300 450h200M300 480h200" stroke="#fff" stroke-width="12" stroke-dasharray="30 20"/>` +
      // Kids and the bus
      kid(220, 400, '#e63946') +
      diff(209, 374, 18, backpack(220, 400, '#3a86ff'), backpack(220, 400, '#8ac926')) +
      kid(260, 400, '#8338ec') +
      backpack(260, 400, '#ffb703') +
      diff(300, 378, 25, kid(300, 400, '#ffb703'), '') +
      person(420, 400, '#fb8500', true) +
      `<rect x="402" y="356" width="10" height="10" fill="#fff"/>` +
      diff(560, 414, 24, bouncing(1.4), bouncing(0.7), 'ball') +
      kid(600, 410, '#8ac926', true) +
      bus(690, 480, '#ffb703') +
      diff(756, 444, 18, stopSign(690, 480), '') +
      bollard(495, 368) +
      shoppingBag(545, 368) +
      scooter(150, 368) +
      skateboard(670, 368) +
      mailbox(30, 368) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['flowerBox', 321, 252, '#ffb703'],
        ['flowerBox', 522, 326, '#ffb703'],
        ['flowerBox', 484, 217, '#8338ec'],
        ['cloud', 603, 101],
        ['balloon', 731, 156, '#8ac926'],
        ['birds', 277, 100],
        ['pigeon', 109, 470],
        ['cone', 682, 402],
        ['pigeon', 245, 462],
        ['pigeon', 56, 410],
      ])
    )
  },
})
