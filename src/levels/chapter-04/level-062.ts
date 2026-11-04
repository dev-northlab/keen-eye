// Motion differences: the moored boat rocks faster on picture B; the gull on the post hops only on B; the crane hook swings only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { anchor, bottleMessage, bucket, buoy, cloud, gullStanding, lifeRing, person, starfish, sun, sunHat, waves } from './shapes.ts'

/** Fishing boat, faces right; (x, y) = waterline center. Bounds: x ±44, y from −50 to +8. */
const boat = (x: number, y: number, hull: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-44 -10h88l-12 18h-64Z" fill="${hull}"/><rect x="-10" y="-36" width="30" height="26" rx="3" fill="#f4f1de"/>` +
  `<rect x="-4" y="-30" width="10" height="8" fill="#bde3f2"/><rect x="-30" y="-50" width="4" height="40" fill="#3d4a55"/><path d="M-44 -10h88" stroke="#3d4a55" stroke-width="3"/></g>`

/** Crate stack of `n`; (x, y) = bottom center. Bounds: x ±14, y from −24·n to 0. */
const crates = (x: number, y: number, n: number) =>
  Array.from({ length: n }, (_, i) => `<rect x="${x - 12}" y="${y - 24 * (i + 1) + 2}" width="24" height="22" fill="#c68b4e" stroke="#9c6a37" stroke-width="2"/><path d="M${x - 12} ${y - 24 * (i + 1) + 2}l24 22" stroke="#9c6a37" stroke-width="2"/>`).join('')

/** Sitting cat; (x, y) = bottom center. Bounds: x from −14 to +20, y from −30 to 0. */
const cat = (x: number, y: number, flip = false, color = '#ff9f43') =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><path d="M8 -2q14 -2 12 -16" stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
  `<ellipse cy="-9" rx="11" ry="10" fill="${color}"/><circle cx="-2" cy="-22" r="7" fill="${color}"/><path d="M-8 -26l1 -6l4 4ZM4 -26l-1 -6l-4 4Z" fill="${color}"/>` +
  `<circle cx="-4" cy="-23" r="1.2" fill="#222"/><circle cx="0" cy="-23" r="1.2" fill="#222"/></g>`

/** Crane hook on its cable from (x, y). Bounds: x ±10, y from 0 to +54. */
const hook = (x: number, y: number) =>
  `<path d="M${x} ${y}v40" stroke="#3d4a55" stroke-width="2"/><rect x="${x - 6}" y="${y + 38}" width="12" height="6" fill="#3d4a55"/><path d="M${x} ${y + 44}q-8 4 -4 10q6 4 8 -2" stroke="#3d4a55" stroke-width="4" fill="none" stroke-linecap="round"/>`

export default svgLevel({
  id: 62,
  chapter: 'sea',
  title: 'harbor',
  parTimeSec: 130,
  scene: ({ diff, anim, rand, extra }) => {
    let ripples = ''
    for (let i = 0; i < 10; i++) ripples += `<path d="M${rand() * 760} ${380 + rand() * 100}h${20 + rand() * 30}" stroke="#a5dcf3" stroke-width="3" stroke-linecap="round"/>`
    const rocking = (period: number) => anim({ id: 'boat', type: 'bob', dx: 0, dy: 4, period }, boat(560, 420, '#e63946'))
    const perched = gullStanding(150, 300)
    const hanging = hook(700, 150)

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(120, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(420, 60, 0.8)) +
      // Warehouses and crane
      `<rect x="200" y="200" width="200" height="140" fill="#e07a5f"/><path d="M190 204h220l-110 -50Z" fill="#8a3b2b"/><rect x="280" y="280" width="40" height="60" fill="#5a3d2b"/>` +
      `<rect x="420" y="220" width="160" height="120" fill="#7aa6d6"/><path d="M412 224h176l-88 -40Z" fill="#3d5a66"/>` +
      `<rect x="730" y="130" width="12" height="210" fill="#ffb703"/><rect x="620" y="130" width="140" height="10" fill="#ffb703"/><rect x="724" y="116" width="30" height="16" fill="#3d4a55"/>` +
      diff(700, 178, 30, hanging, anim({ type: 'sway', angle: 10, pivot: [700, 150], period: 2 }, hanging)) +
      // Quay
      `<rect y="340" width="800" height="40" fill="#8d99ae"/><rect y="336" width="800" height="6" fill="#5c677d"/>` +
      `<rect x="140" y="300" width="10" height="40" fill="#8a5a3b"/>` +
      diff(150, 290, 20, perched, anim({ id: 'gull', type: 'bob', dx: 0, dy: 4, period: 0.8 }, perched), 'gull') +
      `<rect x="640" y="300" width="10" height="40" fill="#8a5a3b"/>` +
      diff(60, 316, 26, crates(60, 340, 2), crates(60, 340, 1)) +
      crates(100, 340, 1) +
      diff(383, 325, 24, cat(380, 340), cat(380, 340, true)) +
      diff(460, 305, 20, person(460, 340, '#ffb703'), person(460, 340, '#3a86ff')) +
      person(520, 340, '#2a9d8f', true) +
      diff(600, 322, 20, anchor(600, 322), '') +
      diff(250, 320, 18, lifeRing(250, 320), lifeRing(250, 320, '#ffb703')) +
      `<path d="M220 330q40 -40 80 0" stroke="#c9a06c" stroke-width="3" fill="none"/>` +
      // Water
      `<rect y="380" width="800" height="120" fill="#3ba7cc"/>` +
      anim({ type: 'bob', dx: 8, dy: 0, period: 4 }, waves(386, 10, 100, '#5cc0de')) +
      anim({ type: 'bob', dx: 10, dy: 0, period: 4 }, ripples) +
      diff(560, 400, 46, rocking(2.6), rocking(1.2), 'boat') +
      boat(220, 440, '#3a86ff') +
      diff(700, 440, 20, buoy(700, 444), buoy(700, 444, '#8ac926')) +
      buoy(80, 460, '#ffb703') +
      sunHat(185, 340) +
      bucket(560, 340) +
      starfish(675, 330) +
      bottleMessage(320, 470) +
      gullStanding(645, 300) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['fish', 64, 453, '#ffb703'],
        ['lifeRing', 372, 403],
        ['fish', 753, 403, '#ffb703'],
        ['bottle', 456, 412],
        ['buoy', 160, 415],
        ['fish', 641, 444, '#ff9f43'],
        ['gull', 602, 213],
        ['cloud', 285, 78],
        ['gull', 92, 178],
        ['gull', 607, 52],
      ])
    )
  },
})
