// Motion differences: the penguin slides faster on picture B; the seal claps only on B; the floe drifts faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level077Redesign } from './level-077-redesign.ts'
import { bottleMessage, dolphin, fish, gullStanding, lifeRing, waves } from './shapes.ts'

/** Penguin standing, faces right; (x, y) = feet. Bounds: x ±12, y from −36 to 0. */
const penguin = (x: number, y: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><path d="M-8 0h6l2 -4M8 0h-6l-2 -4" stroke="#f4a261" stroke-width="3"/><ellipse cy="-18" rx="12" ry="16" fill="#2b2b3a"/>` +
  `<ellipse cx="2" cy="-14" rx="7" ry="10" fill="#fff"/><path d="M8 -26l6 2l-6 2Z" fill="#f4a261"/><circle cx="5" cy="-28" r="1.5" fill="#fff"/><path d="M-12 -20q-4 8 0 14" stroke="#2b2b3a" stroke-width="4"/></g>`

/** Penguin sliding on its belly, faces right; (x, y) = bottom center. Bounds: x ±20, y from −14 to 0. */
const slider = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-6" rx="18" ry="7" fill="#2b2b3a"/><ellipse cx="2" cy="-3" rx="10" ry="4" fill="#fff"/><circle cx="16" cy="-10" r="5" fill="#2b2b3a"/><path d="M20 -10l5 1l-5 2Z" fill="#f4a261"/><circle cx="17" cy="-11" r="1.2" fill="#fff"/></g>`

/** Seal, faces right; (x, y) = bottom center. The flipper is separate. Bounds: x ±22, y from −24 to 0. */
const seal = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-22 0q-2 -12 8 -12h20q10 0 14 -10q2 10 -4 18q-10 4 -16 4Z" fill="#8d99ae"/><path d="M-22 0l-4 -10l8 2Z" fill="#8d99ae"/><circle cx="14" cy="-16" r="1.5" fill="#222"/><circle cx="20" cy="-13" r="1.5" fill="#222"/></g>`
const flipper = (x: number, y: number) => `<path d="M${x - 2} ${y - 8}q-8 -6 -10 -14" stroke="#8d99ae" stroke-width="5" stroke-linecap="round" fill="none"/>`

/** Ice floe; (x, y) = center. Bounds: x ±(w/2), y from −10 to +8. */
const floe = (x: number, y: number, w: number) => `<path d="M${x - w / 2} ${y}q${w / 4} -10 ${w / 2} -6t${w / 2} 6l-6 8h${-w + 12}Z" fill="#eef4fb"/><path d="M${x - w / 2 + 6} ${y + 2}h${w - 12}" stroke="#dbeaf7" stroke-width="3"/>`

/** Polar bear sitting, faces right; (x, y) = bottom center. Bounds: x ±26, y from −44 to 0. */
const bear = (x: number, y: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><ellipse cy="-16" rx="24" ry="16" fill="#fff"/><circle cx="18" cy="-30" r="12" fill="#fff"/><circle cx="12" cy="-40" r="4" fill="#fff"/><circle cx="26" cy="-40" r="4" fill="#fff"/>` +
  `<circle cx="26" cy="-28" r="3" fill="#222"/><circle cx="18" cy="-32" r="1.5" fill="#222"/><path d="M-10 -2h8M4 -2h8" stroke="#dbeaf7" stroke-width="4"/></g>`

export default svgLevel({
  id: 77,
  chapter: 'sea',
  title: 'iceFloes',
  parTimeSec: 130,
  redesign: level077Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let flakes = ''
    for (let i = 0; i < 30; i++) flakes += `<circle cx="${rand() * 800}" cy="${rand() * 500}" r="${2 + rand() * 2}" fill="#fff" fill-opacity="0.9"/>`
    const sliding = (period: number) => anim({ id: 'slider', type: 'path', points: [[0, 0], [100, 0]], period }, slider(160, 330))
    const paw = flipper(560, 400)
    const drifting = (period: number) => anim({ id: 'floe', type: 'path', points: [[0, 0], [40, 0]], period }, floe(700, 455, 90) + penguin(700, 447, true))

    return (
      `<rect width="800" height="500" fill="#c7d9ea"/>` +
      `<rect y="200" width="800" height="300" fill="#4a90b8"/>` +
      `<path d="M0 220q100 -40 200 -10t160 10v20H0Z" fill="#dbeaf7"/><path d="M500 230q100 -50 200 -10t100 10v20H500Z" fill="#dbeaf7"/>` +
      anim({ type: 'bob', dx: 8, dy: 0, period: 4 }, waves(226, 10, 100, '#5ca3c9')) +
      // Big floe
      floe(260, 340, 320) +
      diff(162, 323, 26, sliding(6), sliding(3), 'slider') +
      penguin(300, 332) +
      diff(340, 314, 24, penguin(340, 332, true), '') +
      diff(420, 314, 24, penguin(420, 332), penguin(420, 332, true)) +
      diff(80, 318, 36, bear(80, 340), bear(80, 340, true)) +
      // Seal floe
      floe(580, 400, 160) +
      seal(560, 400) +
      diff(552, 384, 18, paw, anim({ type: 'sway', angle: 20, pivot: [558, 392], period: 0.6 }, paw)) +
      diff(630, 380, 18, `<path d="M622 380l8 -6l8 6l-8 4Z" fill="#8d99ae"/>`, '') +
      // Water
      diff(700, 437, 52, drifting(12), drifting(6), 'floe') +
      diff(120, 420, 22, fish(120, 420, '#8d99ae', 1.2), fish(120, 420, '#ff9f43', 1.2)) +
      fish(400, 440, '#8d99ae', 1) +
      diff(300, 470, 20, '', fish(300, 470, '#8d99ae', 1.1, true)) +
      diff(740, 299, 36, floe(740, 300, 40), floe(740, 300, 70)) +
      anim({ type: 'bob', dx: 8, dy: 0, period: 3 }, waves(480, 10, 100, '#5ca3c9')) +
      bottleMessage(450, 452) +
      gullStanding(590, 212) +
      fish(560, 470, '#8d99ae') +
      lifeRing(200, 462) +
      dolphin(482, 288) +
      anim({ type: 'path', points: [[0, 0], [-8, 40]], period: 4 }, flakes) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['fish', 625, 269, '#ff9f43'],
        ['lifeRing', 350, 422],
        ['fish', 185, 405, '#ffb703'],
        ['bottle', 540, 451],
        ['buoy', 452, 237],
        ['fish', 54, 473, '#ff6b8b'],
        ['lifeRing', 451, 384],
        ['cloud', 211, 139],
        ['gull', 420, 72],
        ['gull', 678, 63],
      ])
    )
  },
})
