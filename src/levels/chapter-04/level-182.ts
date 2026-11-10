// Pelican pier: a long fishing pier among the sea's ten hardest (hidden until released, levels/upcoming.ts). New in
// the sea: a bait kiosk with its shopkeeper, a coin-operated viewer, a pelican on a piling, an angler with his
// float, an ice-cream cart, a lamp post, a kayaker, a stingray and a crab climbing a piling. Motion differences:
// the pelican nods only on picture B; the float and one fish of the school bob only on A.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud, crab, fish, gullStanding, person, sun } from './shapes.ts'

/** Pelican's head, neck and pouched bill, for a pelican standing at (x, y). Bounds: x from +2 to +48, y from −64 to −32. */
const pelicanHead = (x: number, y: number) =>
  `<path d="M${x + 4} ${y - 32}Q${x + 6} ${y - 48} ${x + 12} ${y - 54}" stroke="#e9ecef" stroke-width="8" fill="none" stroke-linecap="round"/>` +
  `<circle cx="${x + 12}" cy="${y - 56}" r="7" fill="#e9ecef"/><path d="M${x + 16} ${y - 58}L${x + 46} ${y - 50}L${x + 18} ${y - 52}Z" fill="#f4a261"/>` +
  `<path d="M${x + 18} ${y - 52}Q${x + 30} ${y - 40} ${x + 44} ${y - 49}Z" fill="#e9c46a"/><circle cx="${x + 13}" cy="${y - 58}" r="1.4" fill="#222"/>`

/** Kayak with its paddler's body, without the helmet; (x, y) = hull center. Bounds: x ±70, y from −42 to +8. */
const kayak = (x: number, y: number) =>
  `<path d="M${x - 70} ${y}q70 18 140 0q-70 -12 -140 0Z" fill="#ffb703"/><ellipse cx="${x}" cy="${y - 2}" rx="16" ry="4" fill="#3d4a55"/>` +
  `<rect x="${x - 8}" y="${y - 28}" width="16" height="24" rx="4" fill="#e63946"/><circle cx="${x}" cy="${y - 34}" r="8" fill="#e0b48a"/>`

export default svgLevel({
  id: 182,
  chapter: 'sea',
  title: 'pelicanPier',
  parTimeSec: 100,
  scene: ({ diff, anim, extra }) => {
    const bobber = `<circle cx="548" cy="358" r="6" fill="#ffffff"/><path d="M542 358a6 6 0 0 1 12 0Z" fill="#e63946"/>`
    let piles = ''
    for (let x = 40; x < 800; x += 90) piles += `<rect x="${x - 7}" y="316" width="14" height="184" fill="#6b4a2b"/><path d="M${x - 7} 360h14M${x - 7} 420h14" stroke="#4a3426" stroke-width="2"/>`
    let rail = ''
    for (let x = 15; x < 800; x += 45) rail += `<rect x="${x - 2}" y="282" width="4" height="18" fill="#8a6a44"/>`
    return (
      `<rect width="800" height="500" fill="#ffe1c2"/>` + sun(680, 96, '#ffb347') +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 26 }, cloud(260, 90, 0.7)) +
      // The sea under the pier
      `<rect y="236" width="800" height="264" fill="#3b8fb0"/><path d="M0 236H800" stroke="#7ec4dc" stroke-width="3"/>` +
      anim({ type: 'path', points: [[0, 0], [30, 0]], period: 7 }, `<path d="M40 260h50M300 252h40M600 262h60M120 470h40M520 480h50" stroke="#ffffff" stroke-opacity="0.4" stroke-width="3" stroke-linecap="round"/>`) +
      piles + `<rect y="300" width="800" height="16" fill="#a0703f"/><path d="M0 300H800" stroke="#c9a26b" stroke-width="3"/>` + rail + `<path d="M0 283H800" stroke="#8a6a44" stroke-width="4"/>` +
      // Bait kiosk: the sign's fish, the shopkeeper's cap
      `<rect x="30" y="206" width="130" height="94" fill="#2a9d8f"/><rect x="24" y="198" width="142" height="10" fill="#f4f1e8"/>` +
      `<rect x="50" y="226" width="90" height="40" fill="#1d5e5a"/><path d="M50 226h90l-6 10h-78Z" fill="#e63946"/>` +
      `<rect x="88" y="196" width="14" height="4" fill="#5c677d"/><rect x="50" y="162" width="90" height="34" rx="3" fill="#f4f1e8" stroke="#5c677d" stroke-width="2"/>` +
      diff(95, 179, 22, fish(95, 179, '#ff9f43'), fish(95, 179, '#3a86ff')) +
      `<circle cx="95" cy="254" r="9" fill="#e0b48a"/><rect x="82" y="262" width="26" height="4" fill="#f4f1e8"/><rect x="44" y="266" width="102" height="6" fill="#f4f1e8"/>` +
      diff(95, 242, 22, `<path d="M86 249q9 -16 18 0h6v3h-24Z" fill="#3a86ff"/>`, `<path d="M86 249q9 -16 18 0h6v3h-24Z" fill="#e63946"/>`) +
      // Coin viewer
      `<rect x="227" y="264" width="6" height="36" fill="#5c677d"/><rect x="220" y="296" width="20" height="4" fill="#5c677d"/>` +
      diff(232, 256, 22, `<rect x="217" y="248" width="26" height="16" rx="6" fill="#2a9d8f"/><rect x="243" y="249" width="6" height="6" rx="2" fill="#3d4a55"/><rect x="243" y="257" width="6" height="6" rx="2" fill="#3d4a55"/>`,
        `<rect x="217" y="248" width="26" height="16" rx="6" fill="#e9c46a"/><rect x="243" y="249" width="6" height="6" rx="2" fill="#3d4a55"/><rect x="243" y="257" width="6" height="6" rx="2" fill="#3d4a55"/>`) +
      // Pelican on its piling
      `<rect x="323" y="268" width="14" height="32" fill="#6b4a2b"/><path d="M326 268v-6M334 268v-6" stroke="#f4a261" stroke-width="2"/>` +
      `<ellipse cx="330" cy="248" rx="17" ry="16" fill="#e9ecef"/><path d="M314 248q-10 4 -16 12l18 -4Z" fill="#adb5bd"/>` +
      diff(352, 222, 30, pelicanHead(330, 270), anim({ type: 'sway', angle: 6, pivot: [334, 238], period: 2.4 }, pelicanHead(330, 270))) +
      // Angler, his rod and float
      person(450, 300, '#e76f51', false, '#e0b48a', '#2b2b2b') + `<path d="M460 276L560 196" stroke="#3d4a55" stroke-width="3"/><path d="M560 196L548 352" stroke="#3d4a55" stroke-width="1"/>` +
      diff(548, 358, 22, anim({ type: 'bob', dx: 0, dy: 4, period: 1.4 }, bobber), bobber) +
      // Ice-cream cart: the scoop on its sign
      `<path d="M600 254V200" stroke="#5c677d" stroke-width="3"/><path d="M566 212q34 -26 68 0Z" fill="#ffafcc"/><path d="M583 212l17 -20l17 20" stroke="#ffffff" stroke-width="4" fill="none"/>` +
      `<rect x="584" y="254" width="84" height="38" rx="4" fill="#ffafcc"/><path d="M584 266h84M584 278h84" stroke="#ffffff" stroke-width="3"/>` +
      `<circle cx="600" cy="292" r="8" fill="#3d4a55"/><circle cx="652" cy="292" r="8" fill="#3d4a55"/><path d="M584 260l-14 -10" stroke="#5c677d" stroke-width="3"/>` +
      `<path d="M643 242h14l-7 14Z" fill="#e9c46a"/>` +
      diff(650, 238, 22, `<circle cx="650" cy="236" r="8" fill="#ff6b8b"/>`, `<circle cx="650" cy="236" r="8" fill="#8ac926"/>`) +
      // Lamp post and the gull on it
      `<rect x="737" y="202" width="6" height="98" fill="#3d4a55"/><path d="M728 204h24l-4 -12h-16Z" fill="#3d4a55"/><rect x="732" y="204" width="16" height="8" fill="#fff3b0"/>` +
      diff(742, 184, 22, gullStanding(742, 192), '') +
      // Kayaker with a swinging paddle
      kayak(180, 432) + diff(180, 394, 22, `<path d="M171 397a9 9 0 0 1 18 0Z" fill="#3a86ff"/>`, `<path d="M171 397a9 9 0 0 1 18 0Z" fill="#ffd23f"/>`) +
      anim({ type: 'sway', angle: 18, pivot: [180, 414], period: 2 }, `<path d="M146 440L214 388" stroke="#5c677d" stroke-width="3"/><ellipse cx="146" cy="440" rx="9" ry="4" fill="#3d4a55" transform="rotate(-37 146 440)"/><ellipse cx="214" cy="388" rx="9" ry="4" fill="#3d4a55" transform="rotate(-37 214 388)"/>`) +
      // Under the water: a crab on a piling, the stingray's tail, a school of fish
      diff(310, 375, 24, crab(310, 384, '#e76f51'), '') +
      `<path d="M380 452Q410 424 440 452Q410 470 380 452Z" fill="#8d7b68"/><circle cx="402" cy="448" r="1.6" fill="#222"/><circle cx="414" cy="448" r="1.6" fill="#222"/>` +
      diff(460, 454, 24, `<path d="M440 452L477 455" stroke="#6b5b4a" stroke-width="3" stroke-linecap="round"/>`, `<path d="M440 452L456 454" stroke="#6b5b4a" stroke-width="3" stroke-linecap="round"/>`) +
      fish(640, 420, '#ffb703') + fish(668, 404, '#ffb703') +
      diff(690, 440, 22, anim({ type: 'bob', dx: 6, dy: 2, period: 1.8 }, fish(690, 440, '#ffb703', 0.8)), fish(690, 440, '#ffb703', 0.8)) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['gull', 500, 110],
        ['jellyfish', 56, 440],
        ['buoy', 760, 400],
        ['seahorse', 580, 462],
        ['fish', 300, 470, '#ff6b8b'],
      ])
    )
  },
})
