// Astana: the Bayterek tower with its golden sphere, the tent-shaped Khan Shatyr, glass towers, a yurt and
// a lamb in the park, a horse, a falconer with a golden eagle and a kite in the sky.
// Motion difference: the kite wobbles quickly on picture A and slowly on picture B.
import { travelLevel } from '../helpers.ts'
import { cloud, person, sky, sun } from './shapes.ts'

/** Glass tower from x to x + w, roof at `top`, ground at 340. */
function tower(x: number, w: number, top: number, color: string) {
  let s = `<rect x="${x}" y="${top}" width="${w}" height="${340 - top}" fill="${color}"/><path d="M${x} ${top}L${x + w / 2} ${top - 30}L${x + w} ${top}Z" fill="${color}"/>`
  for (let y = top + 10; y < 334; y += 14) s += `<path d="M${x + 4} ${y}H${x + w - 4}" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2"/>`
  return s
}

/** Bayterek: a white trunk with branches holding the sphere; (x, y) = foot. The sphere and one brace are separate. */
const bayterek = (x: number, y: number) =>
  `<path d="M${x - 16} ${y}L${x - 6} ${y - 180}H${x + 6}L${x + 16} ${y}Z" fill="#f4f6f8"/>` +
  [-30, -70, -130].map((dy) => brace(x, y + dy)).join('') +
  [-1, 1].flatMap((s) => [`M${x + s * 4} ${y - 176}Q${x + s * 30} ${y - 196} ${x + s * 34} ${y - 236}`, `M${x + s * 2} ${y - 178}Q${x + s * 18} ${y - 210} ${x + s * 18} ${y - 250}`])
    .map((d) => `<path d="${d}" fill="none" stroke="#f4f6f8" stroke-width="5" stroke-linecap="round"/>`).join('')
/** Lattice brace across the trunk at (x, y). Bounds: x ±12, y ±8. */
const brace = (x: number, y: number) => `<path d="M${x - 10} ${y - 8}L${x + 10} ${y + 8}M${x + 10} ${y - 8}L${x - 10} ${y + 8}" stroke="#c9d6e3" stroke-width="2.4"/>`
/** Golden sphere held by the branches at (x, y). Bounds: circle of radius 30 around (x, y − 232). */
const sphere = (x: number, y: number, color: string) =>
  `<circle cx="${x}" cy="${y - 232}" r="28" fill="${color}"/><circle cx="${x - 10}" cy="${y - 242}" r="8" fill="#ffffff" fill-opacity="0.45"/>`

/** Khan Shatyr tent; (x, y) = middle of its foot. The mast and the door are separate. */
const tent = (x: number, y: number) =>
  `<path d="M${x - 90} ${y}Q${x - 46} ${y - 130} ${x} ${y - 220}Q${x + 46} ${y - 130} ${x + 90} ${y}Z" fill="#c9dbe6"/>` +
  [-60, -30, 30, 60].map((dx) => `<path d="M${x + dx} ${y}L${x} ${y - 220}" stroke="#a9bfcf" stroke-width="2"/>`).join('') +
  `<path d="M${x - 70} ${y - 60}Q${x} ${y - 76} ${x + 70} ${y - 60}M${x - 46} ${y - 130}Q${x} ${y - 142} ${x + 46} ${y - 130}" fill="none" stroke="#a9bfcf" stroke-width="2"/>`
/** Mast on the tent top. Bounds: x ±3, y from −246 to −218. */
const mast = (x: number, y: number) => `<path d="M${x} ${y - 218}V${y - 244}" stroke="#7a8a99" stroke-width="3"/><circle cx="${x}" cy="${y - 246}" r="2.5" fill="#e63946"/>`
const tentDoor = (x: number, y: number, color: string) => `<path d="M${x - 16} ${y}V${y - 22}a16 12 0 0 1 32 0V${y}Z" fill="${color}"/>`

/** Yurt; (x, y) = middle of its foot. The door is separate. Bounds: x ±64, y from −84 to 0. */
const yurt = (x: number, y: number) =>
  `<rect x="${x - 60}" y="${y - 50}" width="120" height="50" fill="#f4ead2"/><path d="M${x - 64} ${y - 48}Q${x} ${y - 100} ${x + 64} ${y - 48}Z" fill="#efe1c2"/>` +
  `<rect x="${x - 60}" y="${y - 50}" width="120" height="8" fill="#c9302c"/><path d="M${x - 60} ${y - 46}h120" stroke="#ffd23f" stroke-width="2" stroke-dasharray="6 6"/>` +
  `<rect x="${x - 8}" y="${y - 80}" width="16" height="6" rx="2" fill="#a0703f"/>`
const yurtDoor = (x: number, y: number, color: string) => `<rect x="${x - 12}" y="${y - 36}" width="24" height="36" fill="${color}"/><path d="M${x} ${y - 36}V${y}" stroke="#7a5233" stroke-width="2"/>`
/** Lamb facing right; (x, y) = feet. Bounds: x from −16 to +18, y from −22 to 0. */
const lamb = (x: number, y: number) =>
  `<path d="M${x - 8} ${y}V${y - 8}M${x + 6} ${y}V${y - 8}" stroke="#3d3d3d" stroke-width="3"/>` +
  [[-8, -12], [0, -16], [8, -12], [-2, -8], [6, -8]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="7" fill="#fbfbf7"/>`).join('') +
  `<ellipse cx="${x + 13}" cy="${y - 14}" rx="5" ry="6" fill="#3d3d3d"/>`

/** Horse facing left; (x, y) = ground under the body. The saddle is separate. Bounds: x from −62 to +46, y from −92 to 0. */
const horse = (x: number, y: number) =>
  [-26, -14, 18, 30].map((dx) => `<rect x="${x + dx - 3}" y="${y - 42}" width="7" height="42" fill="#7a4a2c"/>`).join('') +
  `<ellipse cx="${x + 2}" cy="${y - 48}" rx="36" ry="16" fill="#8a5a33"/><path d="M${x + 36} ${y - 54}q14 6 8 30" fill="none" stroke="#3d2a1c" stroke-width="6" stroke-linecap="round"/>` +
  `<path d="M${x - 26} ${y - 54}L${x - 42} ${y - 86}L${x - 30} ${y - 90}L${x - 14} ${y - 60}Z" fill="#8a5a33"/><path d="M${x - 44} ${y - 88}L${x - 62} ${y - 72}L${x - 56} ${y - 64}L${x - 36} ${y - 74}Z" fill="#8a5a33"/>` +
  `<path d="M${x - 30} ${y - 90}L${x - 14} ${y - 58}" stroke="#3d2a1c" stroke-width="4"/><circle cx="${x - 46}" cy="${y - 82}" r="1.6" fill="#1d1d1d"/>`
/** Saddle on the horse at (x, y). Bounds: x ±16, y from −74 to −52. */
const saddle = (x: number, y: number, color: string) =>
  `<path d="M${x - 16} ${y - 62}Q${x} ${y - 52} ${x + 16} ${y - 62}V${y - 70}Q${x} ${y - 64} ${x - 16} ${y - 70}Z" fill="${color}"/><path d="M${x - 4} ${y - 60}V${y - 44}" stroke="#3d2a1c" stroke-width="2"/>`

/** Golden eagle perched on the falconer's raised glove at (x, y). Bounds: x from −14 to +14, y from −34 to 0. */
const eagle = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 14}" rx="10" ry="14" fill="#6b4a2c"/><circle cx="${x - 3}" cy="${y - 28}" r="6" fill="#c9a227"/><path d="M${x - 8} ${y - 28}l-5 3l5 1Z" fill="#3d3d3d"/>` +
  `<path d="M${x + 8} ${y - 18}l6 14" stroke="#4a2f1c" stroke-width="4"/>`

/** Kite with its tail; (x, y) = the bridle point it wobbles around. Bounds: x ±24, y from −28 to +40. */
const kite = (x: number, y: number) =>
  `<path d="M${x} ${y - 28}L${x + 20} ${y - 2}L${x} ${y + 22}L${x - 20} ${y - 2}Z" fill="#00afca"/><path d="M${x} ${y - 28}V${y + 22}M${x - 20} ${y - 2}H${x + 20}" stroke="#ffd23f" stroke-width="2.4"/>` +
  `<path d="M${x} ${y + 22}q8 6 0 10t0 8" fill="none" stroke="#3d4a55" stroke-width="1.6"/>`

export default travelLevel({
  id: 432,
  title: 'astana',
  parTimeSec: 138,
  place: { region: 'asia', country: 'kz', lat: 51.13, lon: 71.43 },
  scene: ({ diff, anim, rand }) => {
    const wobble = (period: number) => anim({ id: 'kite', type: 'sway', angle: 10, pivot: [250, 90], period }, kite(250, 90))
    let grass = ''
    for (let i = 0; i < 30; i++) grass += `<path d="M${(rand() * 800).toFixed(0)} ${(380 + rand() * 115).toFixed(0)}l-3 -10M${(rand() * 800).toFixed(0)} ${(380 + rand() * 115).toFixed(0)}l3 -10" stroke="#5aa84c" stroke-width="2"/>`
    return (
      sky('#9fd3ee') +
      sun(740, 60) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 46 }, cloud(520, 70, 0.5)) +
      // Glass towers
      tower(40, 50, 190, '#3f9b8a') +
      tower(96, 46, 160, '#4fb3a0') +
      diff(119, 174, 18, `<rect x="112" y="168" width="14" height="10" fill="#ffd23f"/>`, '') +
      tower(150, 56, 210, '#3f9b8a') +
      // Bayterek
      bayterek(400, 340) +
      diff(400, 250, 18, brace(400, 250), '') +
      diff(400, 108, 32, sphere(400, 340, '#e8b32a'), sphere(400, 340, '#e8762e')) +
      // Khan Shatyr
      tent(650, 340) +
      diff(650, 108, 18, mast(650, 340), '') +
      diff(650, 324, 24, tentDoor(650, 340, '#3d4a55'), tentDoor(650, 340, '#2a9d8f')) +
      `<path d="M250 90L300 330" stroke="#3d4a55" stroke-width="1.2"/>` +
      diff(250, 96, 46, wobble(1.2), wobble(2.8), 'kite') +
      // Park
      `<rect y="340" width="800" height="160" fill="#8fc46a"/><path d="M0 344H800" stroke="#c9bfae" stroke-width="8"/>` +
      grass +
      yurt(140, 470) +
      diff(140, 452, 24, yurtDoor(140, 470, '#c9302c'), yurtDoor(140, 470, '#2b59c3')) +
      diff(241, 477, 20, lamb(240, 488), '') +
      person(300, 476, '#ffb703', true) +
      horse(430, 480) +
      diff(430, 417, 24, saddle(430, 480, '#c9302c'), saddle(430, 480, '#2b59c3')) +
      person(600, 484, '#2a9d8f', false, '#e0b48a', '#1d1d1d') +
      `<path d="M610 444L626 420" stroke="#7a5233" stroke-width="5" stroke-linecap="round"/>` +
      diff(628, 403, 24, eagle(628, 420), '')
    )
  },
})
