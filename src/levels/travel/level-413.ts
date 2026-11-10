// Kenya: a safari in the savanna — acacias, a giraffe, an elephant, zebras, a termite mound and a jeep.
// Motion difference: a zebra swishes its tail quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { cloud, sky, sun } from './shapes.ts'

/** Umbrella acacia; (x, y) = foot. Bounds: x ±90·s, y from −110·s to 0. */
const acacia = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-4 0L-2 -60L-30 -96M-2 -60L24 -98M0 -76L4 -100" fill="none" stroke="#6b4a3a" stroke-width="7" stroke-linecap="round"/>` +
  `<ellipse cy="-100" rx="90" ry="18" fill="#4f7a3a"/><ellipse cy="-110" rx="66" ry="12" fill="#5f8f45"/></g>`

/** Superb starling; (x, y) = feet. Bounds: x ±11, y from −16 to 0. */
const starling = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 7}" rx="9" ry="6" fill="#2b6fb5"/><ellipse cx="${x + 1}" cy="${y - 4}" rx="6" ry="3" fill="#e8762e"/>` +
  `<circle cx="${x - 7}" cy="${y - 11}" r="4.5" fill="#1f4f80"/><path d="M${x - 11} ${y - 11}l-3 1l3 1Z" fill="#2b2b2b"/><path d="M${x + 8} ${y - 8}l4 -2" stroke="#1f4f80" stroke-width="3"/>`

const GIRAFFE = '#e8b44f'
/** Giraffe facing left; (x, y) = ground under the body. Bounds: x from −76 to +52, y from −276 to 0. */
const giraffe = (x: number, y: number) =>
  [-30, -18, 20, 32].map((dx) => `<rect x="${x + dx - 3.5}" y="${y - 96}" width="7" height="96" fill="#d9a441"/>`).join('') +
  `<path d="M${x + 44} ${y - 104}l8 34" stroke="#d9a441" stroke-width="2.4"/>` +
  `<ellipse cx="${x}" cy="${y - 104}" rx="48" ry="26" fill="${GIRAFFE}"/><path d="M${x - 32} ${y - 112}L${x - 62} ${y - 250}L${x - 42} ${y - 254}L${x - 8} ${y - 120}Z" fill="${GIRAFFE}"/>` +
  `<ellipse cx="${x - 64}" cy="${y - 258}" rx="16" ry="9" fill="${GIRAFFE}"/><path d="M${x - 60} ${y - 266}v-10M${x - 50} ${y - 264}v-10" stroke="#a0642c" stroke-width="3" stroke-linecap="round"/>` +
  `<circle cx="${x - 66}" cy="${y - 261}" r="1.6" fill="#2b2b2b"/>` +
  [[-24, -108], [-4, -118], [-14, -92], [30, -116], [-48, -160], [-54, -200], [-58, -236], [-36, -136]]
    .map(([dx, dy]) => spot(x + dx, y + dy))
    .join('')
const spot = (x: number, y: number) => `<path d="M${x - 7} ${y}l4 -6h7l3 5l-3 6h-7Z" fill="#a0642c"/>`

/** Elephant facing left; (x, y) = ground under the body. The tusk is separate. Bounds: x from −82 to +62, y from −116 to 0. */
const elephant = (x: number, y: number) =>
  [-34, -14, 18, 38].map((dx) => `<rect x="${x + dx - 9}" y="${y - 46}" width="18" height="46" rx="4" fill="#8d949b"/>`).join('') +
  `<ellipse cx="${x + 6}" cy="${y - 66}" rx="58" ry="40" fill="#9aa0a6"/><path d="M${x + 62} ${y - 70}l6 22" stroke="#8d949b" stroke-width="3"/>` +
  `<circle cx="${x - 46}" cy="${y - 74}" r="28" fill="#9aa0a6"/><ellipse cx="${x - 28}" cy="${y - 76}" rx="20" ry="27" fill="#878e95"/>` +
  `<path d="M${x - 66} ${y - 64}Q${x - 82} ${y - 30} ${x - 70} ${y - 6}" fill="none" stroke="#9aa0a6" stroke-width="13" stroke-linecap="round"/>` +
  `<circle cx="${x - 56}" cy="${y - 82}" r="2" fill="#2b2b2b"/>`
/** Tusk of `elephant` at (x, y). Bounds: x from −80 to −60, y from −58 to −42. */
const tusk = (x: number, y: number) => `<path d="M${x - 60} ${y - 56}Q${x - 72} ${y - 44} ${x - 80} ${y - 50}Q${x - 70} ${y - 40} ${x - 60} ${y - 48}Z" fill="#fbf6e9"/>`

/** Zebra facing right; (x, y) = ground under the body. The stripe at +10 and the tail are separate. Bounds: x from −40 to +62, y from −92 to 0. */
const zebra = (x: number, y: number) =>
  [-22, -12, 12, 22].map((dx) => `<rect x="${x + dx - 3.5}" y="${y - 46}" width="7" height="46" fill="#ffffff"/><rect x="${x + dx - 3.5}" y="${y - 6}" width="7" height="6" fill="#2b2b2b"/>`).join('') +
  `<ellipse cx="${x}" cy="${y - 48}" rx="34" ry="18" fill="#ffffff"/><path d="M${x + 24} ${y - 56}L${x + 40} ${y - 86}L${x + 54} ${y - 80}L${x + 34} ${y - 44}Z" fill="#ffffff"/>` +
  `<path d="M${x + 26} ${y - 62}L${x + 40} ${y - 88}" stroke="#2b2b2b" stroke-width="5"/>` +
  `<ellipse cx="${x + 52}" cy="${y - 82}" rx="12" ry="7" fill="#ffffff"/><ellipse cx="${x + 61}" cy="${y - 80}" rx="4" ry="5" fill="#2b2b2b"/><circle cx="${x + 50}" cy="${y - 86}" r="1.6" fill="#2b2b2b"/>` +
  [-20, -10, 0, 20].map((dx) => stripe(x + dx, y)).join('') +
  `<path d="M${x + 36} ${y - 76}l10 -4M${x + 32} ${y - 66}l12 -4" stroke="#2b2b2b" stroke-width="3"/>`
const stripe = (x: number, y: number) => `<path d="M${x} ${y - 64}q4 16 0 32" fill="none" stroke="#2b2b2b" stroke-width="4"/>`
/** Tail of `zebra` at (x, y), hanging from (x − 33, y − 52). Bounds: x from −42 to −30, y from −52 to −22. */
const tail = (x: number, y: number) =>
  `<path d="M${x - 33} ${y - 52}Q${x - 40} ${y - 40} ${x - 38} ${y - 28}" fill="none" stroke="#2b2b2b" stroke-width="2.4"/><ellipse cx="${x - 38}" cy="${y - 26}" rx="3" ry="5" fill="#2b2b2b"/>`

/** Termite mound; (x, y) = foot in the middle. Bounds: x ±20, y from −54 to 0. */
const mound = (x: number, y: number) =>
  `<path d="M${x - 20} ${y}L${x - 10} ${y - 40}Q${x - 4} ${y - 56} ${x + 2} ${y - 42}L${x + 6} ${y - 30}L${x + 12} ${y - 34}L${x + 20} ${y}Z" fill="#b5643c"/>`

/** Safari jeep facing right; (x, y) = ground in the middle. The body is separate. */
const wheels = (x: number, y: number) =>
  [-36, 36].map((dx) => `<circle cx="${x + dx}" cy="${y - 13}" r="13" fill="#2b2b2b"/><circle cx="${x + dx}" cy="${y - 13}" r="5" fill="#c9ced6"/>`).join('') +
  `<path d="M${x - 50} ${y - 46}V${y - 72}H${x + 22}V${y - 46}" fill="none" stroke="#3d4a55" stroke-width="4"/>`
/** Body of the jeep at (x, y). Bounds: x ±62, y from −62 to −14. */
const jeepBody = (x: number, y: number, color: string) =>
  `<path d="M${x - 62} ${y - 14}V${y - 46}H${x + 22}L${x + 30} ${y - 62}H${x + 36}L${x + 42} ${y - 46}H${x + 62}V${y - 14}Z" fill="${color}"/>` +
  `<rect x="${x - 54}" y="${y - 40}" width="24" height="14" rx="2" fill="#4b5d73"/><rect x="${x - 24}" y="${y - 40}" width="24" height="14" rx="2" fill="#4b5d73"/><rect x="${x + 54}" y="${y - 38}" width="8" height="6" fill="#ffd166"/>`

export default travelLevel({
  id: 413,
  title: 'safari',
  parTimeSec: 88,
  place: { region: 'africa', country: 'ke', lat: -1.5, lon: 35.14 },
  scene: ({ diff, anim, rand, extra }) => {
    const swish = (period: number) => anim({ id: 'tail', type: 'sway', angle: 18, pivot: [687, 403], period }, tail(720, 455))
    let grass = ''
    for (let i = 0; i < 40; i++) {
      const gx = rand() * 800
      const gy = 320 + rand() * 175
      grass += `<path d="M${gx.toFixed(0)} ${gy.toFixed(0)}l-4 -12M${gx.toFixed(0)} ${gy.toFixed(0)}l1 -14M${gx.toFixed(0)} ${gy.toFixed(0)}l5 -11" stroke="#c99a3e" stroke-width="2"/>`
    }
    return (
      sky('#a8d8ea') +
      sun(660, 90, '#ffb347') +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 48 }, cloud(330, 80, 0.5)) +
      `<path d="M0 300Q120 250 260 280T520 270T800 290V320H0Z" fill="#a9b98a"/>` +
      `<rect y="300" width="800" height="200" fill="#e3c06b"/>` +
      grass +
      acacia(700, 310, 0.6) +
      acacia(110, 330) +
      diff(150, 202, 20, starling(150, 210), '') +
      giraffe(270, 420) +
      diff(286, 320, 20, spot(286, 320), '') +
      elephant(470, 440) +
      diff(400, 390, 20, tusk(470, 440), '') +
      diff(360, 442, 36, mound(360, 470), '') +
      zebra(600, 440) +
      diff(610, 392, 20, stripe(610, 440), '') +
      zebra(720, 455) +
      stripe(730, 455) +
      diff(683, 418, 22, swish(1.1), swish(2.6), 'tail') +
      wheels(150, 470) +
      diff(150, 432, 68, jeepBody(150, 470, '#5f8f45'), jeepBody(150, 470, '#e8762e')) +
      // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
      decor({ anim }, [
        ['bee', 544, 336],
        ['stones', 72, 340],
        ['butterfly', 732, 476, '#ffd23f'],
        ['grass', 332, 372],
        ['bird', 448, 488, '#8a5a33'],
        ['cloud', 108, 92],
        ['birds', 532, 96],
      ]) +
      extras({ extra, anim }, [
        ['rock', 716, 324, '#b9853f'],
        ['bee', 612, 464],
        ['stones', 264, 456],
        ['cloud', 312, 180],
        ['birds', 708, 180],
      ])
    )
  },
})
