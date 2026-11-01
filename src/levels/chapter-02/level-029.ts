// Motion differences: the swing swings faster on picture B; the pinwheel turns the other way on B.
import { svgLevel } from '../helpers.ts'
import { bench, cityTree, cloud, grass, person, pigeon, sun } from './shapes.ts'

/** Swing seat on ropes from the pivot (x, y). Bounds: radius 48 around the pivot. */
const swing = (x: number, y: number) =>
  `<path d="M${x - 12} ${y}v42M${x + 12} ${y}v42" stroke="#555" stroke-width="2"/><rect x="${x - 16}" y="${y + 42}" width="32" height="6" rx="2" fill="#e63946"/>`

/** Child, faces right; (x, y) = feet. Bounds: x ±10, y from −44 to 0. */
const kid = (x: number, y: number, shirt: string, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -0.7 : 0.7} 0.7)">` + person(0, 0, shirt).replace('translate(0 0) scale(1 1)', '') + `</g>`

/** Ball; (x, y) = center. Bounds: radius 10. */
const ball = (x: number, y: number, color: string) =>
  `<circle cx="${x}" cy="${y}" r="10" fill="${color}"/><path d="M${x - 10} ${y}a10 10 0 0 0 20 0" fill="#fff" fill-opacity="0.5"/>`

/** Bucket; (x, y) = bottom center. Bounds: x ±9, y from −16 to 0. */
const bucket = (x: number, y: number) =>
  `<path d="M${x - 8} ${y - 14}h16l-2 14h-12Z" fill="#3a86ff"/><path d="M${x - 7} ${y - 14}q7 -8 14 0" stroke="#3a86ff" stroke-width="2" fill="none"/>`

/** Seesaw with the given side up; (x, y) = fulcrum. Bounds: x ±42, y from −22 to +4. */
const seesaw = (x: number, y: number, leftUp: boolean) =>
  `<g transform="translate(${x} ${y}) rotate(${leftUp ? -14 : 14})"><rect x="-40" y="-4" width="80" height="6" rx="3" fill="#ffb703"/>` +
  `<rect x="-40" y="-10" width="8" height="6" fill="#e63946"/><rect x="32" y="-10" width="8" height="6" fill="#e63946"/></g>` +
  `<path d="M${x - 8} ${y + 4}l8 -8l8 8Z" fill="#3d4a55"/>`

/** Pinwheel head pivoting on (x, y). Bounds: radius 16. */
const pinwheel = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M0 0l-14 -6v12ZM0 0l6 -14h-12ZM0 0l14 6v-12ZM0 0l-6 14h12Z" fill="#ff006e"/><circle r="3" fill="#ffd166"/></g>`

/** Small bird; (x, y) = feet. Bounds: x ±10, y from −14 to 0. */
const bird = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-6" rx="8" ry="5" fill="#3a86ff"/><circle cx="6" cy="-10" r="4" fill="#3a86ff"/>` +
  `<path d="M9 -10l4 1l-4 2Z" fill="#f4a261"/><path d="M-8 -6l-3 -4" stroke="#3a86ff" stroke-width="2.5"/></g>`

export default svgLevel({
  id: 29,
  chapter: 'city',
  title: 'playground',
  parTimeSec: 110,
  scene: ({ diff, anim, rand }) => {
    let tufts = ''
    for (let i = 0; i < 14; i++) tufts += grass(10 + rand() * 780, 330 + rand() * 160)
    const swinging = (period: number) => anim({ type: 'sway', angle: 18, pivot: [200, 240], period }, swing(200, 240))
    const spinning = (reverse: boolean) => anim({ type: 'rotate', pivot: [700, 390], period: 3, reverse }, pinwheel(700, 390))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(700, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(300, 70, 0.8)) +
      `<path d="M0 260Q200 220 400 250T800 240V500H0Z" fill="#a6d985"/>` +
      `<rect y="300" width="800" height="200" fill="#8fca68"/>` +
      cityTree(60, 280, 1.5) +
      diff(60, 174, 18, '', bird(56, 184)) +
      cityTree(760, 290, 1.2, '#3f9a5a') +
      // Swing frame
      `<path d="M150 240l16 -40M250 240l-16 -40M140 320l26 -120M260 320l-26 -120" stroke="#3d4a55" stroke-width="6" stroke-linecap="round"/>` +
      `<rect x="160" y="236" width="80" height="8" rx="4" fill="#3d4a55"/>` +
      diff(200, 250, 50, swinging(2.6), swinging(1.3)) +
      // Slide
      `<path d="M460 320v-100h40v100" fill="none" stroke="#3d4a55" stroke-width="6"/><path d="M450 222h60l-6 -12h-48Z" fill="#e63946"/>` +
      `<path d="M500 220q10 70 90 100l10 0q-80 -40 -80 -100Z" fill="#ffb703"/><path d="M470 320v-90M490 320v-90M460 250h40M460 280h40" stroke="#3d4a55" stroke-width="4"/>` +
      // Sandbox
      `<path d="M300 420h160l20 30h-200Z" fill="#f2d29b"/><path d="M296 418h168v6h-168Z" fill="#a0703f"/>` +
      diff(360, 430, 18, bucket(360, 438), '') +
      kid(420, 440, '#e63946', true) +
      diff(140, 441, 42, seesaw(140, 450, true), seesaw(140, 450, false)) +
      kid(600, 330, '#8338ec') +
      diff(640, 320, 18, ball(640, 320, '#3a86ff'), ball(640, 320, '#ffb703')) +
      bench(560, 440) +
      person(620, 440, '#ffb703', true) +
      diff(530, 416, 18, kid(530, 440, '#8ac926'), kid(530, 440, '#ff006e')) +
      `<rect x="698" y="390" width="4" height="50" fill="#3d4a55"/>` +
      diff(700, 390, 20, spinning(false), spinning(true)) +
      pigeon(240, 480) +
      tufts
    )
  },
})
