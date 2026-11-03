// Motion differences: the mizzen pennant flaps faster on picture B; a fish leaps by the bow only on B.
import { svgLevel } from '../helpers.ts'
import { bottleMessage, bucket, cloud, coconut, fish, gull, gullStanding, lifeRing, palm, person, waves } from './shapes.ts'

/** Square sail between x0..x1 and y0..y1, bellied by the wind. */
const sail = (x0: number, x1: number, y0: number, y1: number) =>
  `<path d="M${x0} ${y0}H${x1}Q${x1 + 10} ${(y0 + y1) / 2} ${x1} ${y1}H${x0}Q${x0 + 10} ${(y0 + y1) / 2} ${x0} ${y0}Z" fill="#f4ecd8"/>` +
  `<path d="M${x0} ${y0}H${x1}" stroke="#6b4226" stroke-width="5"/>`

/** Black flag with `stripes` white stripes; (x, y) = top of the hoist. Bounds: x from 0 to +30, y from 0 to +20. */
const flag = (x: number, y: number, stripes: number) => {
  let s = `<rect x="${x}" y="${y}" width="30" height="20" fill="#2b2b2b"/>`
  for (let i = 1; i <= stripes; i++) s += `<path d="M${x + 4} ${y + (20 * i) / (stripes + 1)}h22" stroke="#f4f4f4" stroke-width="2.5"/>`
  return s
}

const pennant = (x: number, y: number) => `<path d="M${x} ${y}l30 6l-30 6Z" fill="#c0392b"/>`

/** Lookout's spyglass held at (x, y), pointing right. Bounds: x from 0 to +26, y ±4. */
const spyglass = (x: number, y: number) => `<rect x="${x}" y="${y - 3}" width="26" height="6" rx="2" fill="#c9a227"/><rect x="${x + 18}" y="${y - 4}" width="8" height="8" rx="2" fill="#a07a1a"/>`

/** Parrot, faces left; (x, y) = feet. Bounds: x ±10, y from −24 to +4. */
const parrot = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><path d="M2 -4l4 10l-6 -2Z" fill="#3a86ff"/><ellipse cy="-10" rx="7" ry="10" fill="${color}"/><circle cx="-2" cy="-20" r="6" fill="${color}"/>` +
  `<path d="M-7 -21q-5 2 -2 6l3 -2Z" fill="#f2c14e"/><circle cx="-3" cy="-21" r="1.4" fill="#222"/><path d="M4 -12l4 8" stroke="#ffd23f" stroke-width="3"/></g>`

const barrel = (x: number, y: number) =>
  `<path d="M${x - 10} ${y}q-4 -12 0 -24h20q4 12 0 24Z" fill="#a0703f"/><path d="M${x - 11} ${y - 6}h22M${x - 11} ${y - 18}h22" stroke="#5a3d2b" stroke-width="2.5"/>`

const lantern = (x: number, y: number, s: number) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-7 0h14l-3 -5h-8Z" fill="#2b2b2b"/><rect x="-6" y="0" width="12" height="16" rx="2" fill="#ffd166" stroke="#2b2b2b" stroke-width="1.5"/><path d="M-7 16h14" stroke="#2b2b2b" stroke-width="2"/></g>`

const port = (x: number, y: number) => `<rect x="${x - 8}" y="${y - 7}" width="16" height="14" fill="#2b1d14" stroke="#c9a227" stroke-width="2"/>`

export default svgLevel({
  id: 132,
  chapter: 'sea',
  title: 'pirateGalleon',
  parTimeSec: 125,
  scene: ({ diff, anim }) => {
    let ports = ''
    for (let x = 200; x <= 520; x += 40) if (x !== 360) ports += port(x, 334)
    const flapping = (period: number) => anim({ type: 'sway', angle: 12, pivot: [552, 66], period }, pennant(552, 60))
    const leap = fish(100, 384, '#8d99ae', 1.3)

    return (
      `<rect width="800" height="500" fill="#bfe3f7"/>` +
      `<circle cx="700" cy="70" r="40" fill="#ffd23f"/>` +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(110, 70, 0.6)) + cloud(600, 140, 0.5) +
      `<ellipse cx="730" cy="270" rx="90" ry="20" fill="#e9d8a6"/>` + palm(720, 262, 0.6) + palm(760, 266, 0.5, true) +
      anim({ type: 'path', points: [[0, 0], [-40, 10]], period: 12 }, gull(640, 190)) + gull(90, 130) +
      `<rect y="262" width="800" height="238" fill="#2f8fbf"/>` +
      // Rigging
      `<path d="M60 250L260 64M260 64L400 34M400 34L552 70M552 70L670 220M260 64L150 290M400 34L320 290M400 34L480 290" stroke="#5a3d2b" stroke-width="1.5"/>` +
      // Masts and sails
      `<path d="M260 290V54M400 290V24M552 290V66" stroke="#6b4226" stroke-width="8"/>` +
      sail(210, 310, 92, 168) + sail(214, 306, 182, 252) + sail(340, 460, 64, 150) + sail(344, 456, 164, 252) + sail(510, 594, 110, 196) +
      `<rect x="352" y="176" width="22" height="20" fill="#e0c79a"/>` +
      diff(414, 191, 22, `<rect x="404" y="182" width="20" height="18" fill="#c9b07a"/>`, `<rect x="404" y="182" width="20" height="18" fill="#b8a47a"/>`) +
      `<path d="M376 170h20M366 226h16" stroke="#d9c9a8" stroke-width="2"/>` +
      diff(276, 50, 24, flag(262, 40, 2), flag(262, 40, 3)) +
      `<path d="M552 66V58" stroke="#6b4226" stroke-width="3"/>` + diff(566, 70, 24, flapping(2.4), flapping(0.9)) +
      // Crow's nest with the lookout
      `<path d="M384 52h32l-4 16h-24Z" fill="#8a5a33"/><circle cx="406" cy="44" r="7" fill="#f2d29b"/><path d="M398 40h16v-4h-16Z" fill="#c0392b"/>` +
      diff(422, 46, 24, spyglass(410, 46), `<g transform="rotate(-22 410 46)">${spyglass(410, 46)}</g>`) +
      diff(232, 160, 22, '', `<g transform="translate(232 162) scale(0.8)"><ellipse cy="-6" rx="9" ry="5" fill="#fff"/><circle cx="7" cy="-9" r="4" fill="#fff"/><path d="M10 -9l4 1l-4 2Z" fill="#f4a261"/></g>`) +
      // Hull
      `<path d="M120 272H660L640 380Q400 400 170 380Z" fill="#7a4a2a"/><path d="M130 300H654M150 360H640" stroke="#5a3420" stroke-width="4"/>` +
      `<path d="M560 272V214H666V272Z" fill="#8a5a33"/><path d="M556 214H670" stroke="#5a3420" stroke-width="5"/>` +
      `<rect x="580" y="230" width="18" height="18" fill="#ffd98a"/><rect x="610" y="230" width="18" height="18" fill="#ffd98a"/><rect x="640" y="230" width="14" height="18" fill="#ffd98a"/>` +
      `<path d="M120 272L60 250" stroke="#6b4226" stroke-width="6"/><path d="M120 274q-10 20 0 40" stroke="#c9a227" stroke-width="4" fill="none"/>` +
      ports + diff(360, 334, 22, port(360, 334), '') +
      `<path d="M170 300l-30 70" stroke="#6b6b70" stroke-width="3" stroke-dasharray="5 3"/>` +
      // Deck
      `<rect x="150" y="258" width="34" height="14" rx="6" fill="#3d3d3d"/><path d="M184 264h20" stroke="#3d3d3d" stroke-width="7"/>` +
      person(240, 272, '#c0392b') + person(300, 272, '#f4f4f4', true, '#c68b5e', '#2b2b2b') + person(520, 272, '#3a86ff') +
      barrel(430, 272) + diff(470, 258, 26, barrel(464, 272), barrel(476, 272)) +
      `<path d="M330 260h40v12h-40Z" fill="#8a5a33"/><path d="M330 260q20 -14 40 0" fill="#a0703f"/><rect x="346" y="262" width="8" height="6" fill="#f2c14e"/>` +
      diff(622, 200, 22, parrot(622, 214, '#e63946'), parrot(622, 214, '#d9503a')) +
      diff(674, 264, 22, lantern(674, 258, 1), lantern(674, 256, 1.3)) +
      // Sea
      anim({ type: 'bob', dx: 10, dy: 2, period: 4 }, `<g transform="translate(-40 0)">${waves(380, 15, 64, '#3aa0cc')}</g>`) +
      anim({ type: 'bob', dx: -8, dy: 2, period: 5 }, `<g transform="translate(-40 0)">${waves(430, 15, 64, '#2a86b0')}</g>`) +
      diff(98, 384, 30, leap, anim({ type: 'bob', dx: 4, dy: -10, period: 1.6 }, leap)) +
      fish(500, 470, '#ffb703', 1.1) + fish(700, 456, '#ff6b8b', 1, true) +
      bucket(205, 272) +
      gullStanding(530, 107) +
      bottleMessage(300, 452) +
      coconut(745, 262) +
      lifeRing(600, 312)
    )
  },
})
