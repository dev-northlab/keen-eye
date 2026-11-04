// Cape Town: Table Mountain with its "tablecloth" of cloud and the cable car, Lion's Head, the bright
// Bo-Kaap houses, the harbour with a yacht and a striped lighthouse, penguins on the beach and a protea.
// Motion difference: the cable car rides quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { gull, sky, sun, water } from './shapes.ts'

/** Cable from the lower station up the mountain face. */
const cableAt = (t: number) => [300 + 50 * t, 252 - 128 * t]

/** Cable car cabin hanging from the cable at its start. Bounds: x ±12, y from 0 to +26 under the cable. */
const cabin = () => {
  const [x, y] = cableAt(0)
  return `<path d="M${x} ${y}v8" stroke="#3d4a55" stroke-width="2"/><rect x="${x - 12}" y="${y + 8}" width="24" height="18" rx="5" fill="#e63946"/><rect x="${x - 8}" y="${y + 11}" width="16" height="7" fill="#bde3f2"/>`
}

/** Bo-Kaap house from x, 40 wide, roof at `top`, ground at 340. Door separate. */
const house = (x: number, top: number, color: string) =>
  `<rect x="${x}" y="${top}" width="40" height="${340 - top}" fill="${color}"/><rect x="${x - 2}" y="${top - 6}" width="44" height="8" fill="${color}"/><path d="M${x} ${top + 2}H${x + 40}" stroke="#ffffff" stroke-opacity="0.6" stroke-width="2"/>` +
  `<rect x="${x + 6}" y="${top + 12}" width="11" height="14" fill="#4b5d73"/><rect x="${x + 23}" y="${top + 12}" width="11" height="14" fill="#4b5d73"/>`
const door = (x: number, color: string) => `<rect x="${x + 13}" y="314" width="14" height="26" fill="${color}"/>`

/** African penguin facing left; (x, y) = feet. Bounds: x ±11, y from −34 to 0. */
const penguin = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 14}" rx="10" ry="14" fill="#1d1d1d"/><ellipse cx="${x - 2}" cy="${y - 12}" rx="6" ry="10" fill="#ffffff"/>` +
  `<circle cx="${x - 2}" cy="${y - 28}" r="6" fill="#1d1d1d"/><path d="M${x - 6} ${y - 30}q3 4 7 1" fill="none" stroke="#ffffff" stroke-width="1.6"/><path d="M${x - 8} ${y - 28}l-3 2l3 1Z" fill="#3d4a55"/>` +
  `<path d="M${x - 4} ${y}h-4M${x + 3} ${y}h-4" stroke="#3d4a55" stroke-width="2"/>`

/** Protea; (x, y) = foot of the stem. The flower head is separate. */
const proteaStem = (x: number, y: number) => `<path d="M${x} ${y}V${y - 30}" stroke="#3f8f3a" stroke-width="4"/><path d="M${x} ${y - 14}q-12 -2 -14 -10q10 0 14 6" fill="#3f8f3a"/>`
/** Protea flower head on its stem at (x, y). Bounds: x ±16, y from −58 to −28. */
const proteaHead = (x: number, y: number, color: string) =>
  [-12, -6, 0, 6, 12].map((dx) => `<path d="M${x + dx * 0.6} ${y - 30}L${x + dx - 4} ${y - 50 + Math.abs(dx)}L${x + dx + 4} ${y - 50 + Math.abs(dx)}Z" fill="${color}"/>`).join('') +
  `<ellipse cx="${x}" cy="${y - 34}" rx="10" ry="6" fill="#f4ead2"/>`

/** Lighthouse on its rock; (x, y) = foot. The stripes are separate. Bounds: x ±16, y from −104 to 0. */
const lighthouse = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y + 4}" rx="50" ry="12" fill="#6b6b6b"/><path d="M${x - 14} ${y}L${x - 10} ${y - 80}H${x + 10}L${x + 14} ${y}Z" fill="#ffffff"/>` +
  `<rect x="${x - 12}" y="${y - 96}" width="24" height="16" fill="#3d4a55"/><rect x="${x - 8}" y="${y - 92}" width="16" height="9" fill="#ffd166"/><path d="M${x - 14} ${y - 96}L${x} ${y - 106}L${x + 14} ${y - 96}Z" fill="#3d4a55"/>`
const stripes = (x: number, y: number, color: string) =>
  [-70, -46, -22].map((dy) => `<path d="M${x - 13} ${y + dy + 10}L${x + 13} ${y + dy}V${y + dy + 10}L${x - 13} ${y + dy + 20}Z" fill="${color}"/>`).join('')

/** Yacht; (x, y) = waterline middle. The sail is separate. */
const yacht = (x: number, y: number) =>
  `<path d="M${x - 30} ${y - 8}H${x + 32}L${x + 24} ${y + 4}H${x - 22}Z" fill="#ffffff"/><path d="M${x} ${y - 8}V${y - 66}" stroke="#3d4a55" stroke-width="2"/>`
const sail = (x: number, y: number, color: string) => `<path d="M${x + 2} ${y - 64}L${x + 28} ${y - 12}H${x + 2}Z" fill="${color}"/>`

/** Gull standing on a post; (x, y) = top of the post. Bounds of the gull: x ±12, y from −16 to 0. */
const post = (x: number, y: number) => `<rect x="${x - 4}" y="${y}" width="8" height="${470 - y}" fill="#7a5233"/>`
const standingGull = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 8}" rx="10" ry="6" fill="#ffffff"/><circle cx="${x - 8}" cy="${y - 12}" r="4" fill="#ffffff"/><path d="M${x - 12} ${y - 12}l-3 1l3 1Z" fill="#f2b33d"/><path d="M${x + 2} ${y - 10}l10 -2l-4 5Z" fill="#8d99ae"/>`

/** Buoy; (x, y) = waterline. Bounds: x ±10, y from −20 to +4. */
const buoy = (x: number, y: number, color: string) =>
  `<path d="M${x - 10} ${y}Q${x - 8} ${y - 18} ${x} ${y - 20}Q${x + 8} ${y - 18} ${x + 10} ${y}Z" fill="${color}"/><rect x="${x - 10}" y="${y - 2}" width="20" height="6" rx="2" fill="#3d4a55"/>`

const COLORS = ['#ff6b8b', '#8ac926', '#4dabf7', '#ffd23f', '#b38cff', '#ff9f43', '#2ec4b6', '#e63946', '#f4a6c4', '#7ad3f2']

export default travelLevel({
  id: 426,
  title: 'capeTown',
  parTimeSec: 126,
  place: { region: 'africa', country: 'za', lat: -33.92, lon: 18.42 },
  scene: ({ diff, anim, rand, extra }) => {
    const [ex, ey] = cableAt(1)
    const ride = (period: number) => anim({ id: 'cabin', type: 'path', points: [[0, 0], [ex - 300, ey - 252]], period }, cabin())
    return (
      sky('#9fd3ee') +
      sun(740, 70) +
      // Table Mountain with its tablecloth, Lion's Head
      `<path d="M40 270L170 124H520L610 270Z" fill="#7d8f7a"/><path d="M200 124L230 250M300 124L320 250M420 124L430 250" stroke="#6b7c68" stroke-width="3"/>` +
      `<path d="M600 270Q660 130 690 116Q724 140 780 270Z" fill="#6f8a6a"/>` +
      `<path d="M170 126Q200 108 240 118T320 114T400 118T470 116Q490 112 500 122V136Q480 140 470 130Q440 146 420 132Q390 146 370 132Q340 146 310 132Q280 146 250 132Q220 146 190 134Q176 138 170 130Z" fill="#ffffff"/>` +
      diff(512, 134, 32, `<path d="M496 118Q512 108 528 118Q544 126 538 140Q530 156 518 150Q508 160 498 146Q488 134 496 118Z" fill="#ffffff"/>`, '') +
      `<path d="M300 252L350 124" stroke="#3d4a55" stroke-width="1.6"/><rect x="290" y="250" width="22" height="14" fill="#8d8a86"/>` +
      diff(300, 266, 24, ride(7), ride(12), 'cabin') +
      // Bo-Kaap
      [...Array(10).keys()].map((i) => (i === 4 ? '' : house(20 + i * 42, 270 + (i % 3) * 8, COLORS[i]))).join('') +
      diff(208, 306, 42, house(188, 278, COLORS[4]), house(188, 278, '#3a86ff')) +
      [...Array(10).keys()].filter((i) => i !== 8).map((i) => door(20 + i * 42, '#ffffff')).join('') +
      diff(376, 327, 20, door(356, '#ffffff'), door(356, '#1d1d1d')) +
      // Harbour
      water(340, '#2f8fbf', rand, 14) +
      lighthouse(720, 420) +
      diff(720, 384, 38, stripes(720, 420, '#e63946'), stripes(720, 420, '#2b59c3')) +
      yacht(480, 420) +
      diff(495, 382, 32, sail(480, 420, '#ffffff'), sail(480, 420, '#ffd23f')) +
      post(600, 410) +
      diff(600, 402, 20, standingGull(600, 410), '') +
      diff(380, 454, 20, buoy(380, 462, '#e63946'), buoy(380, 462, '#ffd23f')) +
      gull(420, 70) +
      // Beach with penguins and a protea
      `<path d="M0 430Q140 410 300 440V500H0Z" fill="#f2d79b"/><ellipse cx="250" cy="470" rx="44" ry="20" fill="#8d8a86"/>` +
      penguin(110, 482) +
      diff(150, 467, 22, penguin(150, 484), '') +
      penguin(196, 480) +
      penguin(236, 452) +
      proteaStem(40, 496) +
      diff(40, 453, 24, proteaHead(40, 496, '#e85d8a'), proteaHead(40, 496, '#fbfbf7')) +
      // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
      decor({ anim }, [
        ['bottle', 416, 392],
        ['lifeRing', 668, 468],
        ['buoy', 80, 376, '#ffd23f'],
        ['bottle', 252, 396],
        ['birds', 96, 84],
        ['cloud', 616, 72],
        ['birds', 344, 52],
      ]) +
      extras({ extra, anim }, [
        ['buoy', 528, 464, '#e63946'],
        ['bottle', 168, 404],
        ['lifeRing', 336, 388],
        ['balloon', 216, 36, '#ffd23f'],
        ['balloon', 476, 32, '#ffd23f'],
      ])
    )
  },
})
