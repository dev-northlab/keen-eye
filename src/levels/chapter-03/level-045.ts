// Motion differences: the geese fly faster on picture B; the swing swings faster on B; the falling leaf spins the other way on B.
import { svgLevel } from '../helpers.ts'
import { anthill, backpack, bear, bush, cloud, feather, floor, mushroom, oak, pine, pineCone, squirrel, stump, trailSign } from './shapes.ts'

/** Flying goose V; (x, y) = lead goose. Bounds: x ±46, y from −6 to +26. */
const geese = (x: number, y: number) => {
  const goose = (gx: number, gy: number) =>
    `<path d="M${gx - 10} ${gy}q5 -6 10 0q5 -6 10 0" stroke="#3d4a55" stroke-width="2.5" fill="none"/>`
  return goose(x, y) + goose(x - 18, y + 10) + goose(x + 18, y + 10) + goose(x - 36, y + 20) + goose(x + 36, y + 20)
}

/** Leaf; (x, y) = center. Bounds: radius 9. */
const leaf = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y - 8}q9 4 0 16q-9 -12 0 -16Z" fill="${color}"/><path d="M${x} ${y - 6}v12" stroke="#8a5a3b" stroke-width="1"/>`

/** Leaf pile; (x, y) = bottom center, scale s. Bounds: x ±30·s, y from −22·s to 0. */
const pile = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 0q4 -22 30 -20q26 -2 30 20Z" fill="#e9a23b"/><path d="M-16 -8q6 -8 14 -4M4 -12q8 -6 14 0" stroke="#c0392b" stroke-width="3" fill="none"/></g>`

/** Rake leaning; (x, y) = foot. Bounds: x from −6 to +26, y from −70 to 0. */
const rake = (x: number, y: number) =>
  `<path d="M${x} ${y}l20 -66" stroke="#8a5a3b" stroke-width="3"/><path d="M${x - 6} ${y - 4}h16M${x - 6} ${y - 4}v6M${x - 2} ${y - 4}v6M${x + 2} ${y - 4}v6M${x + 6} ${y - 4}v6M${x + 10} ${y - 4}v6" stroke="#3d4a55" stroke-width="2"/>`

/** Swing seat on ropes from the pivot (x, y). Bounds: radius 44 around the pivot. */
const swing = (x: number, y: number) =>
  `<path d="M${x - 10} ${y}v38M${x + 10} ${y}v38" stroke="#8a5a3b" stroke-width="2"/><rect x="${x - 14}" y="${y + 38}" width="28" height="5" rx="2" fill="#a0703f"/>`

/** Acorn; (x, y) = bottom center. Bounds: x ±6, y from −14 to 0. */
const acorn = (x: number, y: number) => `<ellipse cx="${x}" cy="${y - 5}" rx="5" ry="5" fill="#c9a06c"/><path d="M${x - 6} ${y - 9}h12l-2 -4h-8Z" fill="#8a5a3b"/>`

export default svgLevel({
  id: 45,
  chapter: 'forest',
  title: 'autumn',
  parTimeSec: 120,
  scene: ({ diff, anim, rand }) => {
    let leaves = ''
    for (let i = 0; i < 24; i++) leaves += leaf(rand() * 800, rand() * 500, ['#e9a23b', '#c0392b', '#ffb703'][i % 3])
    const migrating = (period: number) => anim({ id: 'geese', type: 'path', points: [[0, 0], [160, -20]], period }, geese(240, 80))
    const swinging = (period: number) => anim({ type: 'sway', angle: 16, pivot: [640, 230], period }, swing(640, 230))
    const spinning = (reverse: boolean) => anim({ type: 'rotate', pivot: [400, 200], period: 3, reverse }, leaf(400, 200, '#c0392b'))

    return (
      `<rect width="800" height="500" fill="#ffe6cc"/>` +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(600, 60, 0.8)) +
      diff(240, 89, 50, migrating(12), migrating(6), 'geese') +
      `<path d="M0 270Q200 240 400 260T800 250V500H0Z" fill="#d9b36a"/>` +
      pine(60, 270, 1.1, '#6f8f6a') +
      pine(740, 265, 1, '#6f8f6a') +
      diff(180, 196, 40, oak(180, 260, 1), oak(180, 260, 1, '#c0392b')) +
      oak(320, 270, 1.3, '#e9a23b') +
      oak(520, 262, 1.1, '#ffb703') +
      // Big tree with the swing
      `<rect x="630" y="140" width="22" height="180" fill="#6b4f3a"/><path d="M640 230h-80M640 230h80" stroke="#6b4f3a" stroke-width="10" stroke-linecap="round"/>` +
      `<circle cx="640" cy="130" r="60" fill="#e9a23b"/><circle cx="590" cy="160" r="36" fill="#e9a23b"/><circle cx="700" cy="162" r="34" fill="#c0392b"/>` +
      diff(640, 236, 46, swinging(2.8), swinging(1.4)) +
      diff(400, 200, 18, spinning(false), spinning(true)) +
      `<rect y="320" width="800" height="180" fill="#c9a06c"/>` +
      bear(420, 420, true) +
      diff(120, 457, 38, pile(120, 470, 1.2), pile(120, 470, 0.8)) +
      diff(230, 445, 40, rake(220, 480), '') +
      stump(300, 470) +
      diff(300, 437, 20, squirrel(300, 452), squirrel(300, 452, true)) +
      diff(340, 470, 18, '', acorn(340, 476)) +
      acorn(260, 490) +
      mushroom(560, 470, '#a0703f') +
      bush(730, 440, 1.2, '#e9a23b') +
      floor(rand, 330, 480, 10) +
      backpack(395, 482) +
      pineCone(80, 292) +
      anthill(625, 482) +
      feather(480, 330) +
      trailSign(240, 330) +
      anim({ type: 'path', points: [[0, 0], [-20, 60]], period: 5 }, leaves)
    )
  },
})
