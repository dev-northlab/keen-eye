// Motion differences: the bullfinch on the log hops faster on picture B; the far cabin's smoke drifts only on B.
import { svgLevel } from '../helpers.ts'
import { stones } from '../shapes.ts'
import { backpack, deer, feather, lantern, rabbit, trailSign } from './shapes.ts'

/** Snowy pine; (x, y) = trunk foot, scale s. Bounds: x ±32·s, y from −104·s to 0. */
const snowPine = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-5" y="-16" width="10" height="16" fill="#6b4f3a"/>` +
  `<path d="M0 -104L-32 -16h64Z" fill="#2f6b55"/><path d="M0 -104L-20 -64h40Z" fill="#3a7d63"/>` +
  `<path d="M0 -104l-12 24q6 -4 12 2q6 -6 12 -2ZM-22 -58q10 -6 22 2q12 -8 22 -2l-4 -6h-36ZM-30 -18q14 -8 30 2q16 -10 30 -2l-4 -8h-52Z" fill="#f4f8fb"/></g>`

/** Bullfinch, faces right; (x, y) = feet. Bounds: x ±11, y from −16 to 0. */
const bullfinch = (x: number, y: number, breast = '#e2553a') =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-7" rx="9" ry="7" fill="#5c677d"/><ellipse cx="2" cy="-5" rx="6" ry="5" fill="${breast}"/>` +
  `<circle cx="6" cy="-12" r="5" fill="#2b2b2b"/><path d="M10 -12l3 1l-3 2Z" fill="#2b2b2b"/><path d="M-9 -8l-4 2" stroke="#2b2b2b" stroke-width="3"/></g>`

/** Icicle hanging from (x, y). */
const icicle = (x: number, y: number, h: number) => `<path d="M${x - 3} ${y}h6l-3 ${h}Z" fill="#8fc6e4"/>`

/** Bird feeder hanging from (x, y). Bounds: x ±16, y from 0 to +40. */
const feeder = (x: number, y: number) =>
  `<path d="M${x} ${y}v10" stroke="#5a3a24" stroke-width="2"/><path d="M${x - 16} ${y + 18}l16 -10l16 10Z" fill="#c0573f"/><path d="M${x - 16} ${y + 16}l16 -10l16 10" stroke="#f4f8fb" stroke-width="3" fill="none"/>` +
  `<rect x="${x - 12}" y="${y + 18}" width="24" height="16" fill="#e9d3a7" fill-opacity="0.5" stroke="#a0703f" stroke-width="2"/><rect x="${x - 14}" y="${y + 34}" width="28" height="4" fill="#a0703f"/>` +
  `<g fill="#d9a05b"><circle cx="${x - 5}" cy="${y + 30}" r="2"/><circle cx="${x + 2}" cy="${y + 31}" r="2"/><circle cx="${x + 6}" cy="${y + 28}" r="2"/></g>`

/** Snow-capped stump; (x, y) = bottom center, cap width w. */
const stump = (x: number, y: number, w: number) =>
  `<rect x="${x - 14}" y="${y - 22}" width="28" height="22" fill="#8a5a3b"/><ellipse cx="${x}" cy="${y - 23}" rx="${w / 2}" ry="${w * 0.22}" fill="#f4f8fb"/>`

/** Row of hare tracks, `n` pairs from (x, y) to the right. */
const tracks = (x: number, y: number, n: number) => {
  let s = ''
  for (let i = 0; i < n; i++) {
    const tx = x + (i * 44) / Math.max(1, n - 1)
    s += `<ellipse cx="${tx}" cy="${y - 4}" rx="3" ry="5" fill="#b8c9d8"/><ellipse cx="${tx + 4}" cy="${y + 4}" rx="2.5" ry="3" fill="#b8c9d8"/>`
  }
  return s
}

const cone = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="9" fill="#8a5a33" transform="rotate(70 ${x} ${y})"/><path d="M${x - 6} ${y - 2}h12M${x - 5} ${y + 2}h10" stroke="#6b4226" stroke-width="1.5"/>`

const smoke = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="6" fill="#ffffff" fill-opacity="0.9"/><circle cx="${x + 6}" cy="${y - 10}" r="7" fill="#ffffff" fill-opacity="0.7"/><circle cx="${x + 2}" cy="${y - 21}" r="6" fill="#ffffff" fill-opacity="0.5"/>`

export default svgLevel({
  id: 127,
  chapter: 'forest',
  title: 'snowyWoods',
  parTimeSec: 90,
  scene: ({ diff, anim, rand }) => {
    let farPines = ''
    for (let x = -10; x < 820; x += 30) farPines += snowPine(x + rand() * 8, 270, 0.5 + rand() * 0.3)
    let flakes = ''
    for (let i = 0; i < 40; i++)
      flakes += anim({ type: 'bob', dx: 4, dy: 10, period: 2 + rand() * 2, phase: rand() }, `<circle cx="${(rand() * 800).toFixed(1)}" cy="${(rand() * 480).toFixed(1)}" r="${(1.5 + rand() * 1.5).toFixed(1)}" fill="#ffffff"/>`)
    let icicles = ''
    for (let x = 262; x < 380; x += 12) if (x !== 334) icicles += icicle(x, 404, 8 + ((x / 12) % 3) * 4)
    const hopping = (period: number) => anim({ type: 'bob', dx: 0, dy: -6, period }, bullfinch(262, 388))

    return (
      `<rect width="800" height="500" fill="#dfe8f2"/>` +
      `<path d="M0 230L150 140L280 210L430 120L580 200L700 150L800 190V290H0Z" fill="#c4d3e2"/><path d="M430 120l-30 30l14 -4l16 10l14 -12l18 6Z" fill="#f4f8fb"/>` +
      farPines +
      // Far cabin with smoke
      `<rect x="600" y="236" width="56" height="34" fill="#8a5a3b"/><path d="M592 240l36 -24l36 24Z" fill="#f4f8fb"/><rect x="636" y="214" width="10" height="20" fill="#6b5a4a"/>` +
      `<rect x="610" y="248" width="10" height="10" fill="#ffd98a"/><rect x="636" y="248" width="10" height="10" fill="#ffd98a"/>` +
      diff(644, 196, 24, smoke(640, 208), anim({ type: 'bob', dx: 5, dy: -5, period: 2 }, smoke(640, 208))) +
      `<path d="M0 290Q400 260 800 290V500H0Z" fill="#f4f8fb"/><path d="M0 330q200 30 400 0t400 10" stroke="#d6e4ef" stroke-width="10" fill="none"/>` +
      deer(430, 300, false, '#a87a5a') +
      // Big pines with the feeder
      snowPine(90, 460, 3.6) + snowPine(730, 470, 3.2) + snowPine(560, 330, 1.4) +
      `<path d="M150 200q40 -6 70 4" stroke="#6b4f3a" stroke-width="5" fill="none"/>` +
      diff(200, 230, 28, feeder(200, 206), `<g transform="rotate(16 200 206)">${feeder(200, 206)}</g>`) +
      // Rowan bush with bullfinches
      `<path d="M470 360l-20 -60M470 360l10 -70M470 360l40 -50" stroke="#6b4f3a" stroke-width="4"/>` +
      `<g fill="#c1121f"><circle cx="450" cy="300" r="4"/><circle cx="456" cy="306" r="4"/><circle cx="444" cy="308" r="4"/><circle cx="508" cy="310" r="4"/><circle cx="514" cy="304" r="4"/><circle cx="502" cy="302" r="4"/></g>` +
      diff(480, 282, 22, bullfinch(480, 292), bullfinch(480, 292, '#e2753a')) +
      // Frozen stream and the log
      `<path d="M140 420q200 -20 420 10t260 0V470q-200 20 -420 -6T140 470Z" fill="#cde6f2"/><path d="M200 440h60M400 450h80M600 446h50" stroke="#ffffff" stroke-width="2"/>` +
      `<rect x="250" y="386" width="136" height="20" rx="10" fill="#8a5a3b"/><path d="M252 388q66 -14 132 0" stroke="#f4f8fb" stroke-width="6" fill="none"/>` +
      icicles + diff(334, 414, 22, icicle(334, 404, 14), '') +
      diff(262, 380, 22, hopping(1.6), hopping(0.6)) +
      // Ground
      diff(400, 452, 26, stump(400, 478, 34), stump(400, 478, 42)) +
      rabbit(486, 486, false, '#f4f4f0') +
      diff(559, 454, 30, rabbit(552, 470, true, '#e9e3d6'), rabbit(566, 470, true, '#e9e3d6')) +
      diff(684, 470, 28, tracks(660, 470, 3), tracks(660, 470, 4)) +
      cone(60, 486) + diff(122, 472, 22, '', cone(122, 472)) + cone(170, 490) +
      lantern(676, 272) +
      feather(570, 380) +
      backpack(447, 478) +
      trailSign(310, 345) +
      stones(620, 482) +
      flakes
    )
  },
})
