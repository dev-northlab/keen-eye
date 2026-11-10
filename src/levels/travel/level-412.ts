// Giza: the three great pyramids, the small queens' pyramids, the Sphinx, camels and a date palm.
// Motion difference: a camel swishes its tail quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { cloud, palm, sky, sun } from './shapes.ts'

/** Pyramid on the ground y, apex at (x, y − h), half base `half`: a sunlit and a shaded face. */
const pyramid = (x: number, y: number, half: number, h: number) =>
  `<path d="M${x - half} ${y}L${x} ${y - h}L${x + half * 0.15} ${y}Z" fill="#e6c27e"/><path d="M${x + half * 0.15} ${y}L${x} ${y - h}L${x + half} ${y}Z" fill="#c99d58"/>`

/** Sphinx lying with its head to the right; (x, y) = ground under the middle. The headdress stripes are separate. */
const sphinx = (x: number, y: number) =>
  `<path d="M${x - 90} ${y}V${y - 30}Q${x - 80} ${y - 52} ${x - 40} ${y - 50}H${x + 40}Q${x + 54} ${y - 50} ${x + 56} ${y - 36}V${y}Z" fill="#b9853f"/>` +
  `<path d="M${x - 70} ${y - 20}h110" stroke="#a37435" stroke-width="3"/><rect x="${x + 40}" y="${y - 14}" width="44" height="14" rx="5" fill="#b9853f"/>` +
  `<path d="M${x + 38} ${y - 44}L${x + 44} ${y - 90}Q${x + 60} ${y - 98} ${x + 76} ${y - 90}L${x + 82} ${y - 44}Z" fill="#d9a75a" stroke="#a37435" stroke-width="2"/>` +
  `<rect x="${x + 49}" y="${y - 84}" width="22" height="32" rx="7" fill="#c99550"/><path d="M${x + 53} ${y - 72}h5M${x + 62} ${y - 72}h5M${x + 56} ${y - 60}h8" stroke="#5c4a35" stroke-width="2"/>`
/** Stripes on the headdress of `sphinx` at (x, y). Bounds: x from +38 to +82, y from −90 to −44. */
const nemes = (x: number, y: number) =>
  [-84, -74, -64, -54].map((dy) => `<path d="M${x + 40} ${y + dy}h8M${x + 72} ${y + dy}h8" stroke="#3a6fb5" stroke-width="4"/>`).join('')

/** Camel facing left; (x, y) = ground under the body. Saddle and tail are separate. Bounds: x from −70 to +44, y from −104 to 0. */
const camel = (x: number, y: number) =>
  [-28, -16, 18, 30].map((dx) => `<rect x="${x + dx - 3}" y="${y - 56}" width="6" height="56" rx="3" fill="#c48a4a"/>`).join('') +
  `<ellipse cx="${x}" cy="${y - 60}" rx="40" ry="18" fill="#d39a58"/><path d="M${x - 22} ${y - 70}Q${x} ${y - 100} ${x + 22} ${y - 70}Z" fill="#d39a58"/>` +
  `<path d="M${x - 30} ${y - 62}Q${x - 44} ${y - 70} ${x - 52} ${y - 96}" fill="none" stroke="#d39a58" stroke-width="12" stroke-linecap="round"/>` +
  `<ellipse cx="${x - 60}" cy="${y - 98}" rx="11" ry="6" fill="#d39a58"/><circle cx="${x - 60}" cy="${y - 100}" r="1.4" fill="#2b2b2b"/>`
/** Saddle blanket on the hump of `camel` at (x, y). Bounds: x ±16, y from −92 to −64. */
const saddle = (x: number, y: number, color: string) =>
  `<path d="M${x - 16} ${y - 64}Q${x - 14} ${y - 92} ${x} ${y - 92}Q${x + 14} ${y - 92} ${x + 16} ${y - 64}Z" fill="${color}"/><path d="M${x - 16} ${y - 66}h32" stroke="#ffd23f" stroke-width="3"/>`
/** Tail of `camel` at (x, y), hanging from (x + 38, y − 62). Bounds: x from +34 to +46, y from −62 to −34. */
const tail = (x: number, y: number) =>
  `<path d="M${x + 38} ${y - 62}Q${x + 44} ${y - 50} ${x + 40} ${y - 40}" fill="none" stroke="#c48a4a" stroke-width="3" stroke-linecap="round"/><ellipse cx="${x + 40}" cy="${y - 38}" rx="3" ry="5" fill="#7a5233"/>`

/** Falcon gliding; (x, y) = body. Bounds: x ±24, y from −8 to +8. */
const falcon = (x: number, y: number) =>
  `<path d="M${x - 24} ${y - 2}Q${x - 10} ${y - 8} ${x} ${y}Q${x + 10} ${y - 8} ${x + 24} ${y - 2}Q${x + 10} ${y + 2} ${x} ${y + 6}Q${x - 10} ${y + 2} ${x - 24} ${y - 2}Z" fill="#6b4a3a"/>` +
  `<path d="M${x - 4} ${y + 4}L${x} ${y + 8}L${x + 4} ${y + 4}Z" fill="#6b4a3a"/>`

/** Cluster of dates under a palm crown. Bounds: circle of radius 14 around (x, y). */
const dates = (x: number, y: number) =>
  [[-6, -4], [4, -6], [-2, 4], [8, 3], [-9, 6]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="4.5" fill="#d9771c"/>`).join('')

export default travelLevel({
  id: 412,
  title: 'giza',
  parTimeSec: 86,
  place: { region: 'africa', country: 'eg', lat: 29.98, lon: 31.13 },
  scene: ({ diff, anim, extra }) => {
    const swish = (period: number) => anim({ id: 'tail', type: 'sway', angle: 16, pivot: [768, 428], period }, tail(730, 490))
    return (
      sky('#9fd3ee') +
      sun(90, 80, '#ffc94a') +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 48 }, cloud(300, 70, 0.5)) +
      diff(620, 100, 26, falcon(620, 100), '') +
      // The pyramids: Khafre behind Khufu, Menkaure and the queens' pyramids to the right
      `<rect y="350" width="800" height="150" fill="#e8c27a"/>` +
      pyramid(500, 360, 140, 210) +
      diff(500, 172, 34, `<path d="M473 190L500 150L527 190Z" fill="#f4e6c4"/>`, '') +
      pyramid(310, 360, 150, 230) +
      pyramid(690, 360, 80, 110) +
      pyramid(600, 385, 22, 30) +
      diff(645, 370, 28, pyramid(645, 385, 22, 30), '') +
      pyramid(690, 385, 22, 30) +
      `<path d="M0 420Q200 390 420 418T800 410V500H0Z" fill="#dcb168"/>` +
      sphinx(150, 440) +
      diff(210, 374, 30, nemes(150, 440), '') +
      palm(300, 470, 1.1, 8) +
      diff(304, 372, 20, dates(304, 372), '') +
      camel(520, 476) +
      diff(520, 398, 24, saddle(520, 476, '#e63946'), saddle(520, 476, '#2b59c3')) +
      camel(730, 490) +
      saddle(730, 490, '#2a9d8f') +
      diff(772, 439, 22, swish(1), swish(2.4), 'tail') +
      // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
      decor({ anim }, [
        ['stones', 380, 448],
        ['rock', 108, 480, '#b9853f'],
        ['stones', 612, 480],
        ['rock', 240, 464, '#a8743f'],
        ['birds', 640, 228],
        ['cloud', 372, 140],
        ['birds', 92, 236],
      ]) +
      extras({ extra, anim }, [
        ['stones', 468, 464],
        ['rock', 672, 440, '#b9853f'],
        ['stones', 172, 468],
        ['cloud', 188, 60],
        ['birds', 540, 52],
      ])
    )
  },
})
