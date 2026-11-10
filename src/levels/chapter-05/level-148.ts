// Motion differences: the right paper lantern bobs faster on picture B; the parked saucer's lights blink only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level148Redesign } from './level-148-redesign.ts'
import { alien, alienPlant, fuelCanister, moonPebbles, probe, robot, sparkle, starField, toolbox } from './shapes.ts'

/** Wavy awning; (x, y) = top-left, width w. */
const awning = (x: number, y: number, w: number, a: string, b: string) => {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="26" fill="${a}"/>`
  for (let i = 0; i < w; i += 40) s += `<rect x="${x + i + 20}" y="${y}" width="20" height="26" fill="${b}"/>`
  let scallop = `M${x} ${y + 26}`
  for (let i = 0; i < w; i += 20) scallop += `q10 10 20 0`
  return s + `<path d="${scallop}Z" fill="${a}"/>`
}

const spiky = (x: number, y: number, color: string) => `<circle cx="${x}" cy="${y}" r="8" fill="${color}"/><path d="M${x - 10} ${y}h20M${x} ${y - 10}v20M${x - 7} ${y - 7}l14 14M${x + 7} ${y - 7}l-14 14" stroke="${color}" stroke-width="2"/>`

const crystal = (x: number, y: number, h: number, color: string) => `<path d="M${x - 6} ${y}l2 ${-h}l4 -5l4 5l2 ${h}Z" fill="${color}"/><path d="M${x} ${y - h - 5}v${h}" stroke="#fff" stroke-opacity="0.45" stroke-width="1.5"/>`

const jar = (x: number, y: number, liquid: string) =>
  `<rect x="${x - 9}" y="${y - 24}" width="18" height="24" rx="4" fill="${liquid}" fill-opacity="0.85"/><rect x="${x - 10}" y="${y - 28}" width="20" height="5" rx="2" fill="#c9d1da"/>`

const lantern = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y - 10}v6" stroke="#2b2b2b" stroke-width="1.5"/><ellipse cx="${x}" cy="${y + 8}" rx="11" ry="13" fill="${color}"/><path d="M${x - 11} ${y + 8}h22" stroke="#000" stroke-opacity="0.2"/><circle cx="${x}" cy="${y + 8}" r="16" fill="${color}" fill-opacity="0.2"/>`

/** Sign board with a symbol; (x, y) = center. Bounds: x ±22, y ±12. */
const sign = (x: number, y: number) =>
  `<rect x="${x - 22}" y="${y - 12}" width="44" height="24" rx="5" fill="#2bd9b0"/><circle cx="${x - 8}" cy="${y}" r="5" fill="#3b1f5c"/><path d="M${x + 2} ${y - 6}l10 6l-10 6Z" fill="#3b1f5c"/>`

/** Alien pet, a little round critter; (x, y) = feet. Bounds: x ±14, y from −20 to 0. */
const pet = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-6 0v-4M6 0v-4" stroke="#ff9f1c" stroke-width="3"/><ellipse cy="-10" rx="12" ry="9" fill="#ff9f1c"/><circle cx="-4" cy="-12" r="2.5" fill="#fff"/><circle cx="4" cy="-12" r="2.5" fill="#fff"/><path d="M-2 -20l-2 -6M2 -20l2 -6" stroke="#ff9f1c" stroke-width="2"/></g>`

const saucerLights = (x: number, y: number) => `<circle cx="${x - 20}" cy="${y}" r="3.5" fill="#7dff6a"/><circle cx="${x}" cy="${y + 1}" r="3.5" fill="#7dff6a"/><circle cx="${x + 20}" cy="${y}" r="3.5" fill="#7dff6a"/>`

export default svgLevel({
  id: 148,
  chapter: 'space',
  title: 'alienBazaar',
  parTimeSec: 105,
  redesign: level148Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    const stall = (x: number, w: number, a: string, b: string) =>
      `<rect x="${x + 4}" y="176" width="6" height="140" fill="#2b1d3a"/><rect x="${x + w - 10}" y="176" width="6" height="140" fill="#2b1d3a"/>` +
      awning(x, 170, w, a, b) + `<rect x="${x}" y="296" width="${w}" height="40" fill="#6b4a8a"/><path d="M${x} 304h${w}" stroke="#5a3a78" stroke-width="3"/>`
    const bobbing = (period: number) => anim({ type: 'bob', dx: 0, dy: -6, period }, lantern(520, 132, '#ff6bd6'))

    return (
      `<rect width="800" height="500" fill="#3b1f5c"/><rect y="180" width="800" height="160" fill="#4f2a74"/>` + starField(rand, 0, 160, 50) +
      `<circle cx="120" cy="80" r="30" fill="#ff9f43"/><circle cx="120" cy="80" r="40" fill="#ff9f43" fill-opacity="0.2"/><circle cx="196" cy="56" r="14" fill="#cfe8ff"/>` +
      sparkle(420, 40, 6, '#ffe8a3') +
      // Parked saucer on a hill
      `<path d="M600 150q100 -40 200 0V180H600Z" fill="#5a3480"/>` +
      `<path d="M705 116a15 17 0 0 1 30 0Z" fill="#bde3f2" fill-opacity="0.9"/><ellipse cx="720" cy="122" rx="34" ry="9" fill="#9b7bff"/>` +
      diff(720, 128, 24, saucerLights(720, 126), anim({ type: 'blink', duty: 0.5, period: 0.9 }, saucerLights(720, 126))) +
      // Lantern string
      `<path d="M0 120Q400 160 800 120" stroke="#2b1d3a" stroke-width="1.5" fill="none"/>` +
      lantern(120, 132, '#ffd23f') + diff(300, 148, 22, lantern(300, 140, '#7ad0ff'), lantern(300, 140, '#8ab0ff')) +
      lantern(420, 142, '#8ac926') + diff(520, 142, 28, bobbing(2.6), bobbing(1)) + lantern(660, 134, '#ffd23f') +
      // Stalls
      stall(40, 220, '#ff6bd6', '#ffd23f') + stall(290, 220, '#2bd9b0', '#3b1f5c') + stall(540, 220, '#ff9f1c', '#8ac926') +
      diff(400, 152, 26, sign(400, 150), `<g transform="rotate(16 400 150)">${sign(400, 150)}</g>`) +
      // Vendors
      alien(150, 296, '#8ac926', 2) + robot(400, 296, '#bfc7d5', '#ff6bd6') + alien(686, 296, '#ff9f1c', 1) +
      // Goods: spiky fruit, crystals, jars
      spiky(70, 288, '#ff9f1c') + spiky(90, 288, '#ff9f1c') + spiky(130, 288, '#ff6bd6') + spiky(80, 272, '#ff9f1c') + spiky(120, 272, '#ff6bd6') +
      diff(100, 272, 22, spiky(100, 272, '#ff9f1c'), '') + spiky(210, 288, '#7ad0ff') + spiky(230, 288, '#7ad0ff') +
      crystal(320, 296, 22, '#7ad0ff') + crystal(350, 296, 30, '#ff6bd6') + crystal(470, 296, 24, '#8ac926') +
      diff(440, 276, 26, crystal(440, 296, 26, '#ffd23f'), crystal(440, 296, 33, '#ffd23f')) +
      jar(568, 296, '#2bd9b0') + jar(592, 296, '#ff6bd6') + diff(624, 284, 24, jar(618, 296, '#ffd23f'), jar(630, 296, '#ffd23f')) + jar(728, 296, '#7ad0ff') + jar(752, 296, '#8ac926') +
      // Ground and shoppers
      `<rect y="336" width="800" height="164" fill="#2f1d48"/><path d="M0 360q200 -10 400 4t400 -4" stroke="#4a2f6a" stroke-width="6" fill="none"/>` +
      diff(180, 446, 32, alien(180, 470, '#7ad0ff', 2), alien(180, 470, '#8ac0ef', 2)) +
      alien(290, 480, '#ff6bd6', 1) + alien(480, 466, '#8ac926', 2) +
      alien(600, 452, '#ffd23f', 2) + diff(600, 421, 22, `<circle cx="596" cy="421" r="3" fill="#fff"/><circle cx="604" cy="421" r="3" fill="#fff"/><circle cx="596" cy="421" r="1.4" fill="#222"/><circle cx="604" cy="421" r="1.4" fill="#222"/>`, `<circle cx="600" cy="421" r="7.5" fill="#ffd23f"/><circle cx="600" cy="421" r="4.5" fill="#fff"/><circle cx="600" cy="421" r="2" fill="#222"/>`) +
      alien(720, 478, '#b38cff', 1) +
      diff(380, 470, 22, '', pet(380, 480)) +
      // Hover cart and glowing plants
      `<ellipse cx="90" cy="452" rx="44" ry="6" fill="#7ad0ff" fill-opacity="0.3"/><rect x="50" y="410" width="80" height="30" rx="6" fill="#6b4a8a"/>` +
      spiky(70, 404, '#ff6bd6') + spiky(92, 404, '#ffd23f') + spiky(114, 404, '#ff6bd6') +
      [[250, 400], [420, 410], [540, 396], [770, 404], [30, 490]].map(([x, y]) => `<path d="M${x} ${y}q-6 -16 0 -26M${x} ${y}q8 -14 4 -24" stroke="#2bd9b0" stroke-width="3" fill="none"/><circle cx="${x}" cy="${y - 28}" r="4" fill="#7dffd0"/>`).join('') +
      alienPlant(330, 468) +
      moonPebbles(540, 474) +
      fuelCanister(650, 470) +
      probe(560, 80) +
      toolbox(775, 474) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['crater', 162, 376],
        ['alienPlant', 526, 458],
        ['crystal', 355, 416, '#7bdff2'],
        ['ufo', 655, 73],
        ['spaceStar', 54, 116],
      ])
    )
  },
})
