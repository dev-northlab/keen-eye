// Rio de Janeiro: Christ the Redeemer on Corcovado, the Sugarloaf with its cable car, the beach and the wave pavement.
// Motion difference: the cable car cabin rides quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { cloud, gull, palm, person, sky, sun, water } from './shapes.ts'

/** Cable from the low hill to the top of the Sugarloaf. */
const cableY = (x: number) => 250 - (x - 530) * 0.64

/** Cable car cabin hanging from the cable at x. Bounds: x ±14, y from 0 to +32 under the cable. */
const cabin = (x: number) => {
  const y = cableY(x)
  return (
    `<path d="M${x} ${y}v10" stroke="#3d4a55" stroke-width="2"/>` +
    `<rect x="${x - 14}" y="${y + 10}" width="28" height="22" rx="5" fill="#ffd23f"/><rect x="${x - 10}" y="${y + 14}" width="20" height="8" rx="2" fill="#4b5d73"/>`
  )
}

/** Christ the Redeemer, arms open; (x, y) = foot of the pedestal. Bounds: x ±16, y from −40 to 0. */
const redeemer = (x: number, y: number) =>
  `<rect x="${x - 4}" y="${y - 8}" width="8" height="8" fill="#e8e8e8"/><path d="M${x - 3} ${y - 8}L${x - 2} ${y - 30}H${x + 2}L${x + 3} ${y - 8}Z" fill="#f7f7f7"/>` +
  `<rect x="${x - 16}" y="${y - 30}" width="32" height="4" rx="2" fill="#f7f7f7"/><circle cx="${x}" cy="${y - 34}" r="4" fill="#f7f7f7"/>`

/** Sailing boat; (x, y) = waterline middle. The sail is separate. Bounds of the sail: x from −2 to +28, y from −58 to −8. */
const hull = (x: number, y: number) =>
  `<path d="M${x - 24} ${y - 8}H${x + 30}L${x + 22} ${y + 2}H${x - 18}Z" fill="#7a5233"/><path d="M${x} ${y - 8}V${y - 60}" stroke="#3d4a55" stroke-width="2"/>`
const sail = (x: number, y: number, color: string) => `<path d="M${x + 2} ${y - 58}L${x + 28} ${y - 12}H${x + 2}Z" fill="${color}"/>`

/** Beach umbrella; (x, y) = foot of the pole. The cloth is separate. */
const umbrellaPole = (x: number, y: number) => `<path d="M${x} ${y}V${y - 46}" stroke="#ffffff" stroke-width="3"/>`
/** Striped cloth of the umbrella at (x, y). Bounds: x ±40, y from −66 to −44. */
const umbrella = (x: number, y: number, stripe: string) =>
  `<path d="M${x - 40} ${y - 44}Q${x} ${y - 88} ${x + 40} ${y - 44}Z" fill="#ffffff"/>` +
  `<path d="M${x - 26} ${y - 44}Q${x - 18} ${y - 62} ${x - 8} ${y - 65}L${x + 8} ${y - 65}Q${x + 18} ${y - 62} ${x + 26} ${y - 44}H${x + 12}Q${x + 8} ${y - 58} ${x} ${y - 65}Q${x - 8} ${y - 58} ${x - 12} ${y - 44}Z" fill="${stripe}"/>`

/** Football; (x, y) = center. Bounds: circle of radius 9. */
const ball = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="9" fill="#ffffff" stroke="#2b2b2b" stroke-width="1.4"/><path d="M${x} ${y - 4}l4 3l-1.5 4.5h-5l-1.5 -4.5Z" fill="#2b2b2b"/>`

/** Sandcastle; (x, y) = bottom middle. Bounds: x ±22, y from −34 to 0. */
const sandcastle = (x: number, y: number) =>
  `<path d="M${x - 22} ${y}V${y - 16}h8v-4h6v4h16v-4h6v4h8V${y}Z" fill="#d9b26a"/><path d="M${x - 8} ${y - 16}V${y - 28}h4v-4h8v4h4V${y - 16}Z" fill="#d9b26a"/>` +
  `<path d="M${x} ${y - 32}v-2" stroke="#e63946" stroke-width="2"/><path d="M${x - 4} ${y}v-6a4 4 0 0 1 8 0v6Z" fill="#b48c4a"/>`

/** Toucan on a post, facing left; (x, y) = top of the post. The beak is separate. Bounds of the beak: x from −24 to −6, y from −20 to −10. */
const toucan = (x: number, y: number) =>
  `<rect x="${x - 3}" y="${y}" width="6" height="40" fill="#7a5233"/>` +
  `<ellipse cx="${x + 2}" cy="${y - 12}" rx="9" ry="13" fill="#1d1d1d"/><path d="M${x + 8} ${y - 4}l10 12l-6 2Z" fill="#1d1d1d"/>` +
  `<circle cx="${x - 2}" cy="${y - 18}" r="5" fill="#fff3b0"/><circle cx="${x - 3}" cy="${y - 19}" r="1.4" fill="#1d1d1d"/>`
const beak = (x: number, y: number, color: string) =>
  `<path d="M${x - 6} ${y - 20}Q${x - 22} ${y - 20} ${x - 24} ${y - 14}Q${x - 16} ${y - 10} ${x - 6} ${y - 12}Z" fill="${color}"/>`

const coconut = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="5" fill="#7a5233"/>`

export default travelLevel({
  id: 411,
  title: 'rio',
  parTimeSec: 84,
  place: { region: 'americas', country: 'br', lat: -22.91, lon: -43.17 },
  scene: ({ diff, anim, rand, extra }) => {
    const ride = (period: number) => anim({ id: 'cabin', type: 'path', points: [[0, 0], [70, cableY(630) - cableY(560)]], period }, cabin(560))
    let waves = ''
    for (let x = -20; x < 800; x += 40) waves += `<path d="M${x} 470q10 -10 20 0t20 0" fill="none" stroke="#2b2b2b" stroke-width="5"/>`
    return (
      sky('#8fd3f4') +
      sun(420, 80) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 42 }, cloud(320, 120, 0.5)) +
      gull(470, 140) +
      water(300, '#3aa0c8', rand, 8) +
      // Corcovado with the statue
      `<path d="M0 330L50 240Q120 150 166 144L174 124H186L194 144Q250 170 300 330Z" fill="#3f7d4f"/>` +
      redeemer(180, 124) +
      // Urca hill, the Sugarloaf and the cable
      `<path d="M440 340Q480 250 530 248Q570 258 600 340Z" fill="#5f8f5a"/>` +
      `<path d="M560 340Q566 200 640 168Q700 160 722 210Q744 262 770 340Z" fill="#7b8c7a"/><path d="M560 340Q570 290 610 296Q680 290 770 340Z" fill="#5f8f5a"/>` +
      `<path d="M530 250L655 170" stroke="#3d4a55" stroke-width="2"/>` +
      diff(560, 246, 24, ride(7), ride(12), 'cabin') +
      hull(330, 372) +
      diff(345, 337, 28, sail(330, 372, '#ffffff'), sail(330, 372, '#ffd23f')) +
      // Beach and the wave pavement
      `<path d="M0 390Q400 370 800 392V500H0Z" fill="#f2d79b"/><rect y="452" width="800" height="48" fill="#f4f4f4"/>` +
      waves +
      palm(90, 452, 1.1) +
      [[96, 346], [108, 350]].map(([cx, cy]) => coconut(cx, cy)).join('') +
      diff(102, 358, 20, coconut(102, 358), '') +
      umbrellaPole(230, 448) +
      diff(230, 394, 44, umbrella(230, 448, '#e63946'), umbrella(230, 448, '#2b59c3')) +
      diff(380, 436, 20, ball(380, 436), '') +
      diff(500, 427, 28, sandcastle(500, 444), '') +
      person(580, 448, '#ffb703', true, '#c68b59', '#1d1d1d') +
      toucan(660, 410) +
      diff(645, 395, 20, beak(660, 410, '#f79a2e'), beak(660, 410, '#7ac74f')) +
      palm(740, 452, 1, -12) +
      // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
      decor({ anim }, [
        ['coconut', 112, 428],
        ['shell', 312, 412, '#ff6b8b'],
        ['shell', 708, 424, '#ff9f43'],
        ['bottle', 528, 364],
        ['lifeRing', 420, 356],
        ['balloon', 228, 52, '#ffd23f'],
        ['birds', 548, 112],
      ]) +
      extras({ extra, anim }, [
        ['flipFlops', 68, 428, '#3a86ff'],
        ['sunglasses', 436, 408],
        ['bottle', 580, 364],
        ['bottle', 472, 364],
        ['cloud', 360, 204],
      ])
    )
  },
})
