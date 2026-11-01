// Motion differences: the flame flickers faster on picture B; the lantern swings only on B; the bird flies the other way round on B.
import { svgLevel } from '../helpers.ts'
import { bush, fireLogs, flame, floor, log, pine, rock, tent } from './shapes.ts'
import { person } from '../chapter-02/shapes.ts'

/** Owl on a branch, faces right; (x, y) = feet. Bounds: x ±16, y from −36 to 0. */
const owl = (x: number, y: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><ellipse cy="-16" rx="14" ry="17" fill="#8d6e53"/><ellipse cy="-10" rx="8" ry="9" fill="#c9a784"/>` +
  `<path d="M-12 -30l-2 -6l8 3ZM12 -30l2 -6l-8 3Z" fill="#8d6e53"/><circle cx="-5" cy="-25" r="4.5" fill="#fff"/><circle cx="5" cy="-25" r="4.5" fill="#fff"/>` +
  `<circle cx="-4" cy="-25" r="2.2" fill="#222"/><circle cx="6" cy="-25" r="2.2" fill="#222"/><path d="M-2 -20l2 4l2 -4Z" fill="#f4a261"/></g>`

/** Flying bird, faces right; (x, y) = body center. Bounds: x ±16, y from −8 to +6. */
const flier = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-16 -2q8 -8 16 0q8 -8 16 0" stroke="#2b2b3a" stroke-width="3" fill="none"/><ellipse rx="6" ry="4" fill="#2b2b3a"/><path d="M6 -1l5 1l-5 2Z" fill="#f4a261"/></g>`

/** Backpack; (x, y) = bottom center. Bounds: x ±14, y from −34 to 0. */
const backpack = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><rect x="-14" y="-30" width="28" height="30" rx="6" fill="${color}"/><rect x="-10" y="-34" width="20" height="8" rx="4" fill="${color}"/>` +
  `<rect x="-8" y="-16" width="16" height="10" rx="2" fill="#fff" fill-opacity="0.4"/></g>`

/** Marshmallow stick with `n` marshmallows; (x, y) = hand end. Bounds: x from 0 to +44, y from −28 to +2. */
const stick = (x: number, y: number, n: number) =>
  `<path d="M${x} ${y}l44 -26" stroke="#8a5a3b" stroke-width="2.5"/>` +
  Array.from({ length: n }, (_, i) => `<rect x="${x + 26 + i * 9 - 4}" y="${y - 16 - i * 5 - 5}" width="8" height="8" rx="2" fill="#fff3d6"/>`).join('')

/** Tent door flap, open (dark) or closed, on the tent at (x, y). Bounds: x ±16, y from −60 to 0. */
const flap = (x: number, y: number, open: boolean) =>
  open ? `<path d="M${x} ${y - 60}L${x - 16} ${y}h32Z" fill="#2b2b2b" fill-opacity="0.6"/>` : `<path d="M${x} ${y - 60}L${x - 16} ${y}h32Z" fill="#fff" fill-opacity="0.25"/>`

/** Hanging lantern from (x, y). Bounds: x ±8, y from 0 to +28. */
const lantern = (x: number, y: number) =>
  `<path d="M${x} ${y}v6" stroke="#333" stroke-width="2"/><rect x="${x - 7}" y="${y + 6}" width="14" height="18" rx="3" fill="#ffd166" stroke="#333" stroke-width="2"/><rect x="${x - 4}" y="${y + 24}" width="8" height="4" fill="#333"/>`

export default svgLevel({
  id: 42,
  chapter: 'forest',
  title: 'camp',
  parTimeSec: 120,
  scene: ({ diff, anim, rand }) => {
    const flicker = (period: number) => anim({ type: 'sway', angle: 6, pivot: [400, 470], period }, flame(400, 470))
    const hanging = lantern(560, 250)
    const flying = (reverse: boolean) =>
      anim({ id: 'bird', type: 'path', points: [[0, 0], [200, -10]], flipX: 300, period: 9, reverse }, flier(300, 90))

    return (
      `<rect width="800" height="500" fill="#ffd6a5"/>` +
      `<rect width="800" height="120" fill="#ffb98a"/>` +
      diff(300, 90, 20, flying(false), flying(true), 'bird') +
      `<path d="M0 280Q200 240 400 270T800 250V500H0Z" fill="#2f5e3a"/>` +
      pine(60, 300, 1.2, '#256b47') +
      diff(170, 258, 46, pine(170, 300, 0.8, '#256b47'), '') +
      pine(680, 300, 1.3, '#256b47') +
      pine(760, 310, 1, '#256b47') +
      // Tree with the owl and the lantern
      `<rect x="540" y="200" width="20" height="150" fill="#6b4f3a"/><path d="M550 260l40 -24M550 250l-40 -26" stroke="#6b4f3a" stroke-width="8" stroke-linecap="round"/>` +
      `<circle cx="550" cy="190" r="50" fill="#3f9a5a"/><circle cx="520" cy="210" r="30" fill="#3f9a5a"/><circle cx="585" cy="212" r="28" fill="#3f9a5a"/>` +
      diff(590, 224, 24, owl(590, 240), owl(590, 240, true)) +
      diff(560, 264, 20, hanging, anim({ type: 'sway', angle: 14, pivot: [560, 250], period: 1.5 }, hanging)) +
      `<rect y="340" width="800" height="160" fill="#4c8a3c"/>` +
      // Tents
      tent(150, 440, '#e63946') +
      diff(150, 410, 34, flap(150, 440, true), flap(150, 440, false)) +
      tent(660, 430, '#3a86ff') +
      flap(660, 430, true) +
      // Campfire with the camper
      fireLogs(400, 476) +
      diff(400, 450, 26, flicker(1.2), flicker(0.5)) +
      person(300, 480, '#ffb703') +
      diff(336, 450, 26, stick(314, 460, 2), stick(314, 460, 1)) +
      person(500, 480, '#8338ec', true) +
      diff(560, 460, 24, backpack(560, 480, '#2a9d8f'), backpack(560, 480, '#e63946')) +
      log(250, 496) +
      rock(720, 490, 1.2) +
      bush(40, 440, 1.2, '#3f9a5a') +
      floor(rand, 350, 490, 10)
    )
  },
})
