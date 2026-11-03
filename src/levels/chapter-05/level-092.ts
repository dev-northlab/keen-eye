// Motion differences: the lantern over the fruit stall swings faster on picture B; the lantern on the right swings only on B.
import { svgLevel } from '../helpers.ts'
import { alien, robot, star, starField } from './shapes.ts'

/** Market stall; (x, y) = bottom center. Bounds: x ±66, y from −124 to 0. */
const stall = (x: number, y: number, color: string) => {
  let stripes = ''
  let scallops = ''
  for (let i = 0; i < 6; i++) {
    stripes += `<rect x="${x - 66 + i * 22 + 11}" y="${y - 124}" width="11" height="20" fill="#fff" fill-opacity="0.85"/>`
    scallops += `<circle cx="${x - 55 + i * 22}" cy="${y - 104}" r="11" fill="${i % 2 ? '#fff' : color}"/>`
  }
  return (
    `<rect x="${x - 58}" y="${y - 110}" width="6" height="110" fill="#7a4e33"/><rect x="${x + 52}" y="${y - 110}" width="6" height="110" fill="#7a4e33"/>` +
    scallops +
    `<rect x="${x - 66}" y="${y - 124}" width="132" height="20" fill="${color}"/>` +
    stripes
  )
}
const counter = (x: number, y: number) => `<rect x="${x - 60}" y="${y - 40}" width="120" height="40" fill="#a0703f"/><path d="M${x - 60} ${y - 30}h120" stroke="#7a4e33" stroke-width="3"/>`

/** Paper lantern hanging from (x, y). Bounds: x ±10, y from 0 to +26. */
const lantern = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y}v6" stroke="#3d4a55" stroke-width="1.5"/><circle cx="${x}" cy="${y + 16}" r="10" fill="${color}"/><path d="M${x - 10} ${y + 16}h20" stroke="#fff" stroke-opacity="0.4" stroke-width="2"/>`

/** Crate; (x, y) = bottom center. Bounds: x ±12, y from −24 to 0. */
const crate = (x: number, y: number) =>
  `<rect x="${x - 12}" y="${y - 24}" width="24" height="24" fill="#c9a06c"/><path d="M${x - 12} ${y - 24}l24 24M${x + 12} ${y - 24}l-24 24" stroke="#a0703f" stroke-width="2"/>`

export default svgLevel({
  id: 92,
  chapter: 'space',
  title: 'alienMarket',
  parTimeSec: 140,
  scene: ({ diff, anim, rand, secret }) => {
    const left = lantern(200, 92.5, '#ff6b8b')
    const right = lantern(600, 92.5, '#3ae0ff')
    const swinging = (period: number) => anim({ type: 'sway', angle: 14, pivot: [200, 92.5], period }, left)

    return (
      `<rect width="800" height="500" fill="#4a2a6b"/><rect y="150" width="800" height="100" fill="#a8457a"/><rect y="220" width="800" height="60" fill="#f08a5d"/>` +
      starField(rand, 0, 160, 30) +
      `<circle cx="680" cy="230" r="34" fill="#ffd23f"/>` +
      diff(740, 170, 18, `<circle cx="740" cy="170" r="14" fill="#ff9f43"/>`, '') +
      `<path d="M0 280q160 -40 320 -10t300 -20t180 10V340H0Z" fill="#6b2d5c"/><rect y="320" width="800" height="180" fill="#c98b5e"/><path d="M0 420h800" stroke="#b5784f" stroke-width="40"/>` +
      // Stalls
      stall(150, 380, '#8338ec') +
      counter(150, 380) +
      // The chapter's hidden key standing behind the fruit, its bow between the last two
      secret(165, 328, 90) +
      `<g fill="#ffd23f"><circle cx="110" cy="332" r="8"/><circle cx="150" cy="332" r="8"/><circle cx="170" cy="332" r="8"/><circle cx="140" cy="320" r="8"/></g>` +
      diff(130, 332, 18, `<circle cx="130" cy="332" r="8" fill="#ffd23f"/>`, `<ellipse cx="130" cy="332" rx="10.5" ry="7" fill="#ffd23f"/>`) +
      stall(400, 380, '#2a9d8f') +
      diff(400, 314, 18, alien(400, 345, '#8ac926'), alien(400, 345, '#8ac926', 2)) +
      counter(400, 380) +
      `<g fill="#ff6b8b"><ellipse cx="370" cy="332" rx="12" ry="7"/><ellipse cx="400" cy="332" rx="12" ry="7"/><ellipse cx="430" cy="332" rx="12" ry="7"/></g>` +
      stall(650, 380, '#e76f51') +
      diff(650, 300, 18, `<circle cx="650" cy="298" r="12" fill="#ffd166"/>`, `<rect x="639" y="287" width="22" height="22" fill="#ffd166"/>`) +
      counter(650, 380) +
      star(620, 330, 10, '#ffb703') +
      star(650, 330, 10, '#ffb703') +
      diff(690, 330, 18, star(690, 330, 10, '#ffb703'), '') +
      // Lantern rope
      `<path d="M0 70Q400 130 800 70" stroke="#3d4a55" stroke-width="2" fill="none"/>` +
      lantern(100, 83.1, '#ffd166') +
      lantern(300, 98.1, '#8ac926') +
      lantern(500, 98.1, '#ffd166') +
      lantern(700, 83.1, '#ff6b8b') +
      diff(200, 107, 20, swinging(3), swinging(1.2)) +
      diff(600, 107, 20, right, anim({ type: 'sway', angle: 14, pivot: [600, 92.5], period: 1.6 }, right)) +
      // Shoppers
      diff(270, 447, 29, alien(270, 470, '#ff9f43', 2), alien(270, 470, '#3ae0ff', 2)) +
      alien(80, 480, '#ff6b8b') +
      alien(470, 486, '#8ac926', 2) +
      crate(540, 470) +
      crate(566, 470) +
      diff(540, 434, 18, crate(540, 446), '') +
      diff(760, 437, 18, robot(760, 480), robot(760, 480, '#8d99ae', '#ff3b3b'))
    )
  },
})
