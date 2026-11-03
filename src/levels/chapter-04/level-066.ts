// Motion differences: the drying fish sway only on picture B; the net float bobs faster on B; the gull flies the other way round on B.
import { svgLevel } from '../helpers.ts'
import { buoy, cloud, fish, gull, gullStanding, lifeRing, person, rock, sun, waves } from './shapes.ts'

/** Village house; (x, y) = ground center. Bounds: x ±(w/2 + 6), y from −(h + 30) to 0. */
const house = (x: number, y: number, w: number, h: number, wall: string, roof: string) =>
  `<rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" fill="${wall}"/><path d="M${x - w / 2 - 6} ${y - h + 2}L${x} ${y - h - 30}L${x + w / 2 + 6} ${y - h + 2}Z" fill="${roof}"/>` +
  `<rect x="${x - 10}" y="${y - h + 16}" width="20" height="18" fill="#bde3f2"/><rect x="${x - 8}" y="${y - 30}" width="16" height="30" fill="#5a3d2b"/>`

/** Fish hanging on a line from (x, y). Bounds: x from −2 to +60, y from 0 to +26. */
const drying = (x: number, y: number) =>
  [0, 20, 40].map((dx) => `<path d="M${x + dx + 8} ${y}v6" stroke="#555" stroke-width="1.5"/><g transform="translate(${x + dx + 8} ${y + 16}) rotate(90)">${fish(0, 0, '#8d99ae', 0.7)}</g>`).join('')

/** Net float; (x, y) = center. Bounds: radius 8. */
const float = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="6" fill="#ff9f43"/><circle cx="${x}" cy="${y}" r="3" fill="#fff" fill-opacity="0.5"/>`

/** Fish bucket with `n` fish tails; (x, y) = bottom center. Bounds: x ±12, y from −26 to 0. */
const fishBucket = (x: number, y: number, n: number) =>
  `<path d="M${x - 10} ${y - 18}h20l-3 18h-14Z" fill="#8d99ae"/>` + [[-5, -18], [5, -20]].slice(0, n).map(([dx, dy]) => `<path d="M${x + dx} ${y + dy}l-6 -10h12Z" fill="#5c8fbf"/>`).join('')

/** Oar leaning on a wall; (x, y) = foot. Bounds: x from −2 to +14, y from −50 to 0. */
const oar = (x: number, y: number) => `<path d="M${x} ${y}l12 -46" stroke="#8a5a3b" stroke-width="3"/><path d="M${x + 10} ${y - 46}q6 -8 4 -14q-6 2 -8 10Z" fill="#a0703f"/>`

export default svgLevel({
  id: 66,
  chapter: 'sea',
  title: 'fishingVillage',
  parTimeSec: 130,
  scene: ({ diff, anim, rand, secret }) => {
    let ripples = ''
    for (let i = 0; i < 10; i++) ripples += `<path d="M${rand() * 760} ${400 + rand() * 90}h${20 + rand() * 30}" stroke="#a5dcf3" stroke-width="3" stroke-linecap="round"/>`
    const line = drying(300, 250)
    const bobbing = (period: number) => anim({ id: 'float', type: 'bob', dx: 0, dy: 4, period }, float(600, 440))
    const flying = (reverse: boolean) => anim({ id: 'gull', type: 'path', points: [[0, 0], [180, -10]], flipX: 100, period: 9, reverse }, gull(100, 100))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(680, 70) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(300, 60, 0.8)) +
      diff(100, 100, 20, flying(false), flying(true), 'gull') +
      `<path d="M0 240Q200 200 400 230T800 210V340H0Z" fill="#a9d3a0"/>` +
      // Houses
      house(120, 340, 120, 90, '#f2cc8f', '#e07a5f') +
      diff(220, 266, 44, house(220, 340, 70, 60, '#7aa6d6', '#3d5a66'), house(220, 340, 70, 60, '#7aa6d6', '#e63946')) +
      house(400, 340, 110, 100, '#81b29a', '#5a3d2b') +
      house(560, 340, 80, 70, '#c98bb9', '#8a3b2b') +
      house(690, 340, 100, 80, '#ffd6a5', '#7a3f2c') +
      `<path d="M300 250h60" stroke="#555" stroke-width="2"/>` +
      diff(330, 262, 34, line, anim({ type: 'sway', angle: 8, pivot: [300, 250], period: 1.6 }, line)) +
      // Quay
      `<rect y="340" width="800" height="50" fill="#8d99ae"/><rect y="336" width="800" height="6" fill="#5c677d"/>` +
      diff(60, 305, 20, person(60, 340, '#3a86ff'), person(60, 340, '#ffb703')) +
      // The chapter's hidden key on the quay, behind the fisherman's legs
      secret(294, 337, 8) +
      person(300, 340, '#e63946', true) +
      diff(330, 324, 20, fishBucket(330, 340, 2), fishBucket(330, 340, 1)) +
      oar(470, 340) +
      diff(520, 325, 18, lifeRing(520, 325), lifeRing(520, 325, '#3a86ff')) +
      diff(620, 330, 18, gullStanding(620, 340), gullStanding(620, 340, true)) +
      gullStanding(760, 340, true) +
      // Water with the net
      `<rect y="390" width="800" height="110" fill="#3ba7cc"/>` +
      anim({ type: 'bob', dx: 8, dy: 0, period: 4 }, waves(396, 10, 100, '#5cc0de')) +
      anim({ type: 'bob', dx: 10, dy: 0, period: 4 }, ripples) +
      `<path d="M520 440q40 30 80 0q40 30 80 0" stroke="#e9c46a" stroke-width="2" fill="none"/>` +
      diff(600, 440, 18, bobbing(2), bobbing(0.9), 'float') +
      float(680, 440) +
      diff(200, 450, 20, buoy(200, 454), buoy(200, 454, '#8ac926')) +
      rock(740, 490, 1.1, '#5c677d')
    )
  },
})
