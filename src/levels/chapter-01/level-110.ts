// Motion differences: the porch lantern swings only on picture B; one firefly by the doghouse blinks only on B.
import { bird, stump } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { milkCan, sheep, stones, wheelbarrow } from '../shapes.ts'
import { level110Redesign } from './level-110-redesign.ts'

/** Star; (x, y) = center. Bounds: radius 7. */
const star = (x: number, y: number) =>
  `<path d="M${x} ${y - 7}l2 5l5 0.5l-4 3.5l1.5 5l-4.5 -3l-4.5 3l1.5 -5l-4 -3.5l5 -0.5Z" fill="#fff3a3"/>`

/** Bat, faces right; (x, y) = body center. Bounds: x ±20, y from −10 to +8. */
const bat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-4 0q-8 -12 -20 -4q6 2 6 8q6 -4 14 0Z" fill="#0f1528"/><path d="M4 0q8 -12 20 -4q-6 2 -6 8q-6 -4 -14 0Z" fill="#0f1528"/>` +
  `<ellipse rx="5" ry="7" fill="#0f1528"/><path d="M-4 -6l-2 -5l4 2ZM4 -6l2 -5l-4 2Z" fill="#0f1528"/></g>`

/** Lit window with a cross; (x, y) = center, 26 × 26. */
const litWindow = (x: number, y: number, light = '#ffd166') =>
  `<rect x="${x - 13}" y="${y - 13}" width="26" height="26" fill="${light}" stroke="#2e3a55" stroke-width="3"/><path d="M${x} ${y - 12}v24M${x - 12} ${y}h24" stroke="#2e3a55" stroke-width="2.5"/>`

/** Glow halo around a light at (x, y). */
const glow = (x: number, y: number, r: number) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffd166" fill-opacity="0.12"/><circle cx="${x}" cy="${y}" r="${r * 0.55}" fill="#ffd166" fill-opacity="0.16"/>`

/** Lantern on a post; (x, y) = post foot. Bounds: x ±10, y from −110 to 0. */
const lampPost = (x: number, y: number) =>
  glow(x, y - 96, 34) +
  `<rect x="${x - 3}" y="${y - 84}" width="6" height="84" fill="#1f2437"/>` +
  `<rect x="${x - 9}" y="${y - 106}" width="18" height="22" rx="3" fill="#ffd166" stroke="#1f2437" stroke-width="2"/><path d="M${x - 10} ${y - 106}l10 -6l10 6Z" fill="#1f2437"/>`

/** Porch lantern hanging from (x, y). Bounds: x ±9, y from 0 to +34. */
const porchLantern = (x: number, y: number) =>
  `<path d="M${x} ${y}v8" stroke="#1f2437" stroke-width="2"/><rect x="${x - 8}" y="${y + 8}" width="16" height="22" rx="3" fill="#ffd166" stroke="#1f2437" stroke-width="2"/>` +
  `<path d="M${x - 9} ${y + 30}h18v4h-18Z" fill="#1f2437"/>`

/** Rooster weathervane; (x, y) = pivot. Bounds: x ±20, y from −22 to +4. */
const vane = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#11182e"><path d="M-18 0h36" stroke="#11182e" stroke-width="2.5"/><path d="M20 0l-7 -4v8Z"/>` +
  `<path d="M-8 -2q-6 -14 4 -18q8 -2 8 8l-2 12Z"/><path d="M-10 -14l-6 -8l8 2Z"/></g>`

/** Sitting cat seen from behind, on a fence rail; (x, y) = feet. Bounds: x from −14 to +16, y from −30 to 0. */
const cat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#0f1528"><ellipse cy="-10" rx="10" ry="11"/><circle cy="-24" r="7"/>` +
  `<path d="M-6 -28l1 -7l4 4ZM6 -28l-1 -7l-4 4Z"/><path d="M8 -4q10 2 8 -12" stroke="#0f1528" stroke-width="3" fill="none"/></g>`

/** Hanging shirt with `stripes` stripes; (x, y) = clothesline point at its middle. Bounds: x ±13, y from 0 to +26. */
const shirt = (x: number, y: number, stripes: number) => {
  let s = `<path d="M${x - 13} ${y}h26l-2 8h-4v18h-14v-18h-4Z" fill="#7aa6d6"/>`
  for (let i = 1; i <= stripes; i++) s += `<path d="M${x - 7} ${y + (26 * i) / (stripes + 1)}h14" stroke="#e3edf7" stroke-width="2.5"/>`
  return s
}

/** Mailbox on a post with its flag on the right (dir 1) or left (−1); (x, y) = post foot. Bounds: x ±23, y from −52 to 0. */
const mailbox = (x: number, y: number, dir: 1 | -1) =>
  `<rect x="${x - 2}" y="${y - 34}" width="4" height="34" fill="#4a3a2a"/>` +
  `<path d="M${x - 13} ${y - 34}v-10a6 6 0 0 1 6 -6h14a6 6 0 0 1 6 6v10Z" fill="#5b6f9a"/>` +
  `<g transform="translate(${x} 0) scale(${dir} 1)"><path d="M14 ${y - 36}v-14" stroke="#c0392b" stroke-width="3"/><rect x="14" y="${y - 52}" width="9" height="8" fill="#c0392b"/></g>`

/** Pumpkin; (x, y) = center, rx × ry. */
const pumpkin = (x: number, y: number, rx: number, ry: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#c96a1f"/><path d="M${x} ${y - ry}v${2 * ry}" stroke="#9a4d14" stroke-width="1.5"/>` +
  `<path d="M${x} ${y - ry}q2 -5 5 -6" stroke="#3f5a2a" stroke-width="3" fill="none"/>`

const firefly = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="5" fill="#eaff7a" fill-opacity="0.35"/><circle cx="${x}" cy="${y}" r="2.2" fill="#f6ffb0"/>`

export default svgLevel({
  id: 110,
  chapter: 'farm',
  title: 'lanternNight',
  parTimeSec: 70,
  redesign: level110Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let stars = ''
    for (let i = 0; i < 46; i++) {
      const x = rand() * 800
      const y = rand() * 200
      if (Math.hypot(x - 680, y - 80) > 50 && Math.hypot(x - 630, y - 50) > 26 && Math.hypot(x - 480, y - 90) > 26 && Math.hypot(x - 585, y - 120) > 30)
        stars += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.8 + rand() * 1.4).toFixed(1)}" fill="#fff8d6"/>`
    }
    let flies = ''
    for (const [x, y, p] of [[150, 380, 1.7], [330, 470, 2.3], [470, 400, 1.9], [640, 330, 2.6], [780, 420, 2.1], [40, 340, 2.8]])
      flies += anim({ type: 'blink', duty: 0.6, period: p }, firefly(x, y))
    let grass = ''
    for (let i = 0; i < 26; i++) {
      const x = rand() * 800
      const y = 350 + rand() * 146
      grass += `<path d="M${x} ${y}l3 -10l3 10l3 -12l3 12" fill="#25402f"/>`
    }
    const swinging = anim({ type: 'sway', angle: 14, pivot: [262, 292], period: 2.2 }, porchLantern(262, 292))

    return (
      `<rect width="800" height="500" fill="#24345f"/><rect width="800" height="150" fill="#1a2547"/>` + stars +
      star(90, 40) + star(380, 70) + star(730, 180) + diff(630, 50, 22, star(630, 50), '') +
      `<circle cx="680" cy="80" r="44" fill="#fff8d6" fill-opacity="0.12"/><circle cx="680" cy="80" r="34" fill="#fff3c4"/>` +
      `<circle cx="668" cy="70" r="6" fill="#ece0a8"/><circle cx="692" cy="92" r="8" fill="#ece0a8"/><circle cx="694" cy="66" r="4" fill="#ece0a8"/>` +
      anim({ type: 'path', points: [[0, 0], [-60, 14]], period: 9 }, bat(300, 110)) +
      diff(480, 90, 24, '', bat(480, 90)) +
      `<path d="M0 290Q160 230 330 270T640 250T800 260V360H0Z" fill="#22385a"/>` +
      `<rect y="340" width="800" height="160" fill="#2f4a3a"/>` + grass +
      // Farmhouse with a porch
      `<rect x="60" y="200" width="240" height="160" fill="#4a5a7a"/><path d="M40 204L180 120L320 204Z" fill="#2e3a55"/>` +
      `<rect x="230" y="128" width="24" height="44" fill="#3a3a4a"/>` +
      anim({ type: 'bob', dx: 6, dy: -8, period: 4 }, `<circle cx="246" cy="112" r="9" fill="#8d99ae" fill-opacity="0.4"/><circle cx="256" cy="96" r="12" fill="#8d99ae" fill-opacity="0.3"/>`) +
      diff(110, 250, 22, litWindow(110, 250), litWindow(110, 250, '#ffbf5e')) +
      litWindow(170, 250) + litWindow(110, 312) + `<circle cx="180" cy="168" r="11" fill="#ffd166" stroke="#2e3a55" stroke-width="3"/>` +
      `<rect x="150" y="296" width="40" height="64" fill="#2e3a55"/><circle cx="182" cy="330" r="2.5" fill="#ffd166"/>` +
      `<path d="M200 290h100v-8h-100Z" fill="#2e3a55"/><path d="M204 290v70M296 290v70" stroke="#2e3a55" stroke-width="5"/>` +
      glow(262, 318, 28) + diff(262, 308, 24, porchLantern(262, 292), swinging) +
      // Clothesline
      `<path d="M300 214Q370 236 440 220" stroke="#8d99ae" stroke-width="1.5" fill="none"/><rect x="438" y="214" width="5" height="146" fill="#4a3a2a"/>` +
      `<path d="M322 220h14v14h-14Z" fill="#e05a47"/><path d="M398 226h10v16h-10Z" fill="#f4f1e8"/><path d="M414 224h10v16h-10Z" fill="#f4f1e8"/>` +
      diff(368, 240, 22, shirt(368, 226, 2), shirt(368, 226, 3)) +
      // Barn with the weathervane
      `<rect x="470" y="190" width="230" height="170" fill="#7a2f2f"/><path d="M455 196L585 128L715 196Z" fill="#4a1f24"/>` +
      `<path d="M585 128v-8" stroke="#11182e" stroke-width="3"/>` +
      diff(585, 116, 24, vane(585, 118), `<g transform="rotate(22 585 118)">${vane(585, 118)}</g>`) +
      `<rect x="555" y="210" width="60" height="40" fill="#ffd166" stroke="#4a1f24" stroke-width="4"/><path d="M585 210v40" stroke="#4a1f24" stroke-width="3"/>` +
      `<rect x="530" y="270" width="110" height="90" fill="#5a2226"/><path d="M530 270l110 90M640 270l-110 90" stroke="#7a2f2f" stroke-width="6"/>` +
      pumpkin(712, 372, 14, 10) + diff(744, 370, 22, pumpkin(744, 370, 15, 11), pumpkin(744, 370, 18, 13)) + pumpkin(772, 376, 12, 9) +
      // Lamp posts along the path
      `<path d="M300 500Q380 420 430 360H470Q450 430 420 500Z" fill="#4a5a4a"/>` +
      lampPost(410, 372) + lampPost(470, 470) + lampPost(40, 420) +
      diff(330, 400, 28, mailbox(330, 432, 1), mailbox(330, 432, -1)) +
      // Doghouse with a sleeping dog, fireflies
      `<rect x="70" y="420" width="70" height="52" fill="#8a5a33"/><path d="M62 424l43 -30l43 30Z" fill="#5a3a24"/><path d="M92 472v-26a13 13 0 0 1 26 0v26Z" fill="#1a1a24"/>` +
      `<g transform="translate(168 482)"><ellipse cy="-9" rx="26" ry="10" fill="#8a6a4a"/><circle cx="22" cy="-14" r="10" fill="#8a6a4a"/><path d="M16 -22q-4 10 2 14" fill="#5a3a24"/><path d="M18 -14q3 2 6 0" stroke="#222" stroke-width="1.5" fill="none"/></g>` +
      diff(206, 440, 22, firefly(206, 440), anim({ type: 'blink', duty: 0.4, period: 1.5 }, firefly(206, 440))) +
      // Sheep pen and the cat on the fence
      `<rect x="520" y="412" width="280" height="7" fill="#5a4a3a"/><rect x="520" y="434" width="280" height="7" fill="#5a4a3a"/>` +
      [530, 590, 650, 710, 770].map((x) => `<rect x="${x}" y="398" width="12" height="58" rx="3" fill="#6b5a48"/>`).join('') +
      diff(560, 402, 26, cat(552, 412), cat(566, 412)) +
      sheep(640, 470, false, '#e3e1d6') + sheep(740, 476, true, '#d6d3c6') +
      flies +
      stump(255, 482) +
      milkCan(510, 392) +
      wheelbarrow(340, 345) +
      stones(565, 478) +
      bird(656, 399) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['stones', 493, 476],
        ['mushroom', 271, 454],
        ['grass', 57, 398],
        ['horseshoe', 673, 373],
        ['star', 286, 181],
      ])
    )
  },
})
