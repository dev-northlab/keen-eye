// Motion differences: the weathervane turns the other way on picture B; the horse's tail swings faster on B.
import { stump } from '../chapter-03/shapes.ts'
import { svgLevel } from '../helpers.ts'
import { bucket, cat, chick, cloud, fence, grass, hen, pumpkin, sun, tree, wateringCan } from '../shapes.ts'

/** Horse head looking out of a stable window; (x, y) = window center. Bounds: x ±30, y ±30. */
const horseHead = (x: number, y: number, coat: string) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-20 26q-6 -30 6 -44l10 -8l6 -4l6 10q8 2 14 12q6 10 4 26Z" fill="${coat}"/>` +
  `<path d="M-6 -26l-6 -10l10 4ZM2 -30l2 -10l6 8Z" fill="${coat}"/>` +
  `<path d="M-8 -22q-10 10 -10 30" stroke="#333" stroke-width="5" stroke-linecap="round" fill="none"/>` +
  `<ellipse cx="16" cy="16" rx="9" ry="7" fill="#f2d29b"/><circle cx="4" cy="-4" r="3" fill="#222"/></g>`

/** Horse in the paddock, faces right; (x, y) = ground under the middle. Tail separate. Bounds: x ±56, y from −80 to 0. */
const horse = (x: number, y: number, coat: string) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-30 -36v36M-14 -36v36M14 -36v36M30 -36v36" stroke="${coat}" stroke-width="9" stroke-linecap="round"/>` +
  `<path d="M-32 -18v18M-16 -18v18M12 -18v18M28 -18v18" stroke="#333" stroke-width="9" stroke-linecap="round"/>` +
  `<rect x="-40" y="-60" width="80" height="34" rx="16" fill="${coat}"/>` +
  `<path d="M30 -56l8 -24l14 -2l4 10q-2 10 -14 12l-4 12Z" fill="${coat}"/>` +
  `<path d="M38 -80l12 -4l-2 10" stroke="#333" stroke-width="5" stroke-linecap="round" fill="none"/>` +
  `<circle cx="48" cy="-68" r="2" fill="#222"/><ellipse cx="52" cy="-56" rx="5" ry="4" fill="#f2d29b"/></g>`

/** Horse tail; (x, y) = root. Bounds: x from −18 to +2, y from 0 to +34. */
const tail = (x: number, y: number) =>
  `<path d="M${x} ${y}q-12 10 -10 32M${x} ${y}q-18 6 -16 28" stroke="#333" stroke-width="5" stroke-linecap="round" fill="none"/>`

/** Horseshoe; (x, y) = center. Bounds: radius 12. */
const horseshoe = (x: number, y: number) =>
  `<path d="M${x - 8} ${y + 8}a10 10 0 1 1 16 0" fill="none" stroke="#8d99ae" stroke-width="5" stroke-linecap="round"/>`

/** Cart loaded with hay; (x, y) = ground center. Bounds: x ±50, y from −60 to 0. */
const cart = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})">` +
  `<ellipse cy="-40" rx="40" ry="20" fill="#f2c14e"/>` +
  `<path d="M-42 -40h84l-8 26h-68Z" fill="${color}"/>` +
  `<path d="M42 -30h12" stroke="#5a3d2b" stroke-width="4"/>` +
  `<circle cx="-22" cy="-12" r="12" fill="#333"/><circle cx="-22" cy="-12" r="4" fill="#ccc"/>` +
  `<circle cx="22" cy="-12" r="12" fill="#333"/><circle cx="22" cy="-12" r="4" fill="#ccc"/></g>`

/** Weathervane rooster; (x, y) = pivot. Bounds: x ±22, y from −24 to +12. */
const vane = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-22 0h44M22 0l-6 -4v8Z" stroke="#333" stroke-width="3" fill="#333"/>` +
  `<path d="M-10 -2q-6 -14 4 -18q8 -2 8 8l-2 12Z" fill="#333"/><path d="M-12 -14l-6 -10l8 2Z" fill="#e63946"/></g>`

export default svgLevel({
  id: 20,
  chapter: 'farm',
  title: 'stable',
  parTimeSec: 110,
  scene: ({ diff, anim, rand }) => {
    let tufts = ''
    for (let i = 0; i < 14; i++) tufts += grass(10 + rand() * 780, 400 + rand() * 95)
    const turning = (reverse: boolean) => anim({ type: 'rotate', pivot: [300, 118], period: 7, reverse }, vane(300, 118))
    const swish = (period: number) => anim({ type: 'sway', angle: 14, pivot: [596, 420], period }, tail(596, 420))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(700, 80) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 24 }, cloud(140, 70, 0.8)) +
      `<ellipse cx="400" cy="330" rx="520" ry="60" fill="#a6d985"/>` +
      `<rect y="340" width="800" height="160" fill="#8fca68"/>` +
      tree(760, 360) +
      // Stable
      `<rect x="120" y="200" width="360" height="160" fill="#c68b4e"/>` +
      `<path d="M100 205L300 130L500 205Z" fill="#7a3f2c"/>` +
      `<path d="M300 130v-8" stroke="#333" stroke-width="3"/>` +
      diff(300, 118, 36, turning(false), turning(true)) +
      `<rect x="150" y="230" width="70" height="70" fill="#5a3d2b"/>` +
      diff(185, 262, 38, horseHead(185, 268, '#8d5a3a'), horseHead(185, 268, '#2b2b2b')) +
      `<rect x="150" y="300" width="70" height="8" fill="#a0703f"/>` +
      // Door with the horseshoe
      `<rect x="260" y="250" width="80" height="110" fill="#5a3d2b"/><path d="M260 250l80 110M340 250l-80 110" stroke="#8a5a33" stroke-width="4"/>` +
      diff(300, 262, 20, horseshoe(300, 260), '') +
      `<rect x="380" y="230" width="70" height="70" fill="#5a3d2b"/><rect x="386" y="236" width="58" height="58" fill="#bde3f2"/>` +
      `<path d="M415 236v58M386 265h58" stroke="#5a3d2b" stroke-width="4"/>` +
      // Hay cart
      diff(560, 332, 54, cart(560, 360, '#8a5a33'), cart(560, 360, '#3a86ff')) +
      // Paddock with a horse
      fence(520, 800, 420, '#e9d3a7') +
      diff(588, 438, 26, swish(2.4), swish(1)) +
      horse(650, 470, '#c48a5a') +
      bucket(470, 470) +
      // Hens by the door
      hen(300, 440, true, '#ffffff') +
      diff(360, 440, 36, hen(360, 440, false, '#c9823a'), '') +
      tufts +
      chick(420, 472) +
      cat(490, 368) +
      wateringCan(50, 430) +
      stump(250, 410) +
      pumpkin(640, 385)
    )
  },
})
