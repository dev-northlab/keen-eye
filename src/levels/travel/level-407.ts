// Yerevan: Mount Ararat over pink tuff buildings with arcades and a clock tower, a fountain, an apricot tree.
// Motion difference: the middle fountain jet bounces quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { cloud, person, pigeon, sky } from './shapes.ts'

/** Arched opening; (x, y) = bottom left. */
const arch = (x: number, y: number, w: number, h: number, color = '#7a4a3c') =>
  `<path d="M${x} ${y}V${y - h + w / 2}A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y - h + w / 2}V${y}Z" fill="${color}"/>`

/** Tuff building from x to x + w, roof at `top`, ground at 400: windows above, an arcade below. */
function building(x: number, w: number, top: number, wall: string) {
  const n = Math.floor(w / 40)
  const pad = (w - n * 40) / 2 + 8
  let s = `<rect x="${x}" y="${top}" width="${w}" height="${400 - top}" fill="${wall}"/><rect x="${x - 4}" y="${top}" width="${w + 8}" height="8" fill="#b8735f"/>`
  for (let i = 0; i < n; i++) {
    s += `<rect x="${x + pad + i * 40}" y="${top + 24}" width="22" height="30" fill="#7a4a3c"/>`
    s += arch(x + pad + i * 40 - 3, 400, 28, Math.min(62, 322 - top))
  }
  return s + `<rect x="${x}" y="${top + 64}" width="${w}" height="6" fill="#b8735f"/>`
}

/** Clock tower; (x, y) = foot. The hands are separate. Bounds: x ±28, y from −128 to 0. */
const clockTower = (x: number, y: number) =>
  `<rect x="${x - 24}" y="${y - 100}" width="48" height="100" fill="#d98f7b"/><path d="M${x - 28} ${y - 100}L${x} ${y - 128}L${x + 28} ${y - 100}Z" fill="#b8735f"/>` +
  `<circle cx="${x}" cy="${y - 70}" r="15" fill="#ffffff" stroke="#7a4a3c" stroke-width="3"/>` +
  arch(x - 8, y - 20, 16, 30)
/** Clock hands of `clockTower` at (x, y) showing h:m. Bounds: circle of radius 12 around (x, y − 70). */
function hands(x: number, y: number, h: number, m: number) {
  const hand = (deg: number, len: number, width: number) => {
    const a = ((deg - 90) * Math.PI) / 180
    return `<path d="M${x} ${y - 70}l${(Math.cos(a) * len).toFixed(1)} ${(Math.sin(a) * len).toFixed(1)}" stroke="#2b2b2b" stroke-width="${width}" stroke-linecap="round"/>`
  }
  return hand(h * 30 + m / 2, 7, 2.6) + hand(m * 6, 11, 1.8)
}

/** Fountain jet; (x, y) = base. Bounds: x ±12, y from −h to 0. */
const jet = (x: number, y: number, h = 50) =>
  `<path d="M${x} ${y}q-12 -${h * 0.4} -6 -${h * 0.8}q6 4 6 ${h * 0.3}q0 -${h * 0.26} 6 -${h * 0.3}q6 ${h * 0.4} -6 ${h * 0.8}Z" fill="#9fd8f0"/><circle cx="${x}" cy="${y - h + 4}" r="5" fill="#bde3f2"/>`

/** Café table under a parasol; (x, y) = ground. The cloth is separate. */
const table = (x: number, y: number) =>
  `<rect x="${x - 2}" y="${y - 90}" width="4" height="64" fill="#3d4a55"/><ellipse cx="${x}" cy="${y - 26}" rx="28" ry="6" fill="#ffffff"/><rect x="${x - 3}" y="${y - 26}" width="6" height="26" fill="#3d4a55"/>` +
  `<circle cx="${x - 8}" cy="${y - 31}" r="5" fill="#f4a261"/><rect x="${x + 4}" y="${y - 38}" width="7" height="10" rx="2" fill="#c96b4f"/>`
/** Parasol cloth of `table` at (x, y). Bounds: x ±40, y from −112 to −90. */
const parasol = (x: number, y: number, color: string) => `<path d="M${x - 40} ${y - 90}Q${x} ${y - 134} ${x + 40} ${y - 90}Z" fill="${color}"/>`

/** Shutters of the window at (x, y) (top left of a 22×30 window). Bounds: x from −9 to +31, y from 0 to +30. */
const shutters = (x: number, y: number, color: string) =>
  `<rect x="${x - 9}" y="${y}" width="9" height="30" fill="${color}"/><rect x="${x + 22}" y="${y}" width="9" height="30" fill="${color}"/>`

const apricot = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="6" fill="#f79a2e"/><circle cx="${x - 2}" cy="${y - 2}" r="2" fill="#ffd08a"/>`

export default travelLevel({
  id: 407,
  title: 'yerevan',
  parTimeSec: 74,
  place: { region: 'caucasus', country: 'am', lat: 40.18, lon: 44.51 },
  scene: ({ diff, anim, extra }) => {
    const bounce = (period: number) => anim({ id: 'jet', type: 'bob', dx: 0, dy: 6, period }, jet(580, 446, 54))
    return (
      sky('#a9d6ef') +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 44 }, cloud(130, 80, 0.55)) +
      anim({ type: 'path', points: [[0, 0], [-50, 0]], period: 50 }, cloud(700, 70, 0.5)) +
      // Ararat: the little peak (Sis) on the left, the big one (Masis) on the right
      `<path d="M10 330Q110 200 144 192Q150 188 156 192Q200 220 310 330Z" fill="#a9b9d6"/>` +
      diff(
        150,
        204,
        30,
        `<path d="M124 214L144 192Q150 188 156 192L176 214L164 210L154 218L144 210L134 218Z" fill="#ffffff"/>`,
        '',
      ) +
      `<path d="M360 330Q500 170 600 112Q624 100 648 112Q710 170 800 330Z" fill="#9bb0cf"/>` +
      `<path d="M550 150Q580 124 600 112Q624 100 648 112Q670 128 690 152L672 146L658 160L640 144L624 162L606 146L590 160L572 148Z" fill="#ffffff"/>` +
      building(40, 400, 250, '#e9a993') +
      clockTower(250, 250) +
      diff(250, 180, 22, hands(250, 250, 3, 0), hands(250, 250, 10, 10)) +
      building(470, 320, 280, '#e3a089') +
      diff(609, 319, 26, shutters(598, 304, '#3f8f5a'), shutters(598, 304, '#8a5a33')) +
      // Square with the fountain
      `<rect y="400" width="800" height="100" fill="#e8d9c4"/><path d="M0 404H800" stroke="#d1bfa6" stroke-width="4"/>` +
      `<ellipse cx="580" cy="452" rx="130" ry="26" fill="#b8a48a"/><ellipse cx="580" cy="448" rx="120" ry="20" fill="#63b8e3"/>` +
      anim({ type: 'bob', dx: 0, dy: 6, period: 1.6 }, jet(510, 446, 40)) +
      anim({ type: 'bob', dx: 0, dy: 6, period: 1.6 }, jet(650, 446, 40)) +
      diff(580, 419, 36, bounce(1.1), bounce(2.6), 'jet') +
      // Apricot tree
      `<rect x="82" y="420" width="16" height="70" rx="5" fill="#7a5233"/>` +
      `<circle cx="60" cy="425" r="34" fill="#4c9a3f"/><circle cx="122" cy="425" r="34" fill="#4c9a3f"/><circle cx="90" cy="405" r="48" fill="#5bb04a"/>` +
      [[70, 400], [60, 440], [92, 440], [126, 424], [74, 372]].map(([ax, ay]) => apricot(ax, ay)).join('') +
      diff(108, 392, 22, apricot(108, 392), '') +
      table(330, 486) +
      diff(330, 384, 44, parasol(330, 486, '#ffd23f'), parasol(330, 486, '#2a9d8f')) +
      person(420, 488, '#5b7fd6') +
      person(760, 482, '#e63946', true) +
      pigeon(220, 480) +
      pigeon(250, 470, true) +
      // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
      decor({ anim }, [
        ['pigeon', 184, 468],
        ['suitcase', 728, 488, '#3a86ff'],
        ['bin', 384, 472, '#2a9d8f'],
        ['coffeeCup', 512, 492],
        ['cloud', 428, 76],
        ['birds', 88, 136],
        ['cloud', 256, 64],
      ]) +
      extras({ extra, anim }, [
        ['shoppingBag', 284, 476, '#ff6b8b'],
        ['pigeon', 244, 436],
        ['ball', 64, 484, '#ffd23f'],
        ['birds', 336, 208],
        ['balloon', 716, 108, '#ffd23f'],
      ])
    )
  },
})
