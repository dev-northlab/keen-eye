// Motion differences: the grey horse twitches its ear only on picture B; the dog wags its tail faster on B.
import { svgLevel } from '../helpers.ts'
import { bucket, hayBale } from '../shapes.ts'

/** Horse looking over a stall door; (x, y) = door top under its neck. Ears separate (`ear`). Bounds: x from −30 to +34, y from −84 to +8. */
const horseHead = (x: number, y: number, coat: string, mane: string, blaze = false) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-30 4q-6 -54 12 -76l22 -4q12 12 8 44l-4 36Z" fill="${coat}"/>` +
  `<path d="M-30 4q-6 -54 12 -76l6 2q-14 24 -8 74Z" fill="${mane}"/>` +
  `<path d="M-6 -78q22 -8 30 10l10 54q2 16 -12 18q-14 0 -18 -12l-14 -46Z" fill="${coat}"/>` +
  (blaze ? `<path d="M10 -70l6 50l-4 6l-8 -50Z" fill="#f4f4f0"/>` : '') +
  `<ellipse cx="24" cy="-6" rx="11" ry="9" fill="#2b2b2b" fill-opacity="0.25"/><circle cx="26" cy="-6" r="2" fill="#222"/>` +
  `<circle cx="2" cy="-56" r="3" fill="#222"/><path d="M-6 -78l-2 -4" stroke="${mane}" stroke-width="4"/></g>`

/** One ear of the horse at door top (x, y); pivot at its base (x + 8, y − 78). Bounds: x from +3 to +13, y from −94 to −76. */
const ear = (x: number, y: number, coat: string) => `<path d="M${x + 3} ${y - 77}l5 -17l5 16Z" fill="${coat}"/>`

const horseshoe = (x: number, y: number) =>
  `<path d="M${x - 9} ${y - 6}a11 11 0 1 0 18 0" fill="none" stroke="#c9a227" stroke-width="5" stroke-linecap="round"/>`

/** Hay net; (x, y) = center, w × h. */
const hayNet = (x: number, y: number, w: number, h: number) =>
  `<path d="M${x} ${y - h / 2 - 8}v8" stroke="#8a5a33" stroke-width="2"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="${h / 2}" fill="#f2c14e"/>` +
  `<path d="M${x - w / 2 + 4} ${y - h / 4}h${w - 8}M${x - w / 2 + 2} ${y + h / 6}h${w - 4}M${x - w / 6} ${y - h / 2 + 2}v${h - 4}M${x + w / 6} ${y - h / 2 + 2}v${h - 4}" stroke="#8a5a33" stroke-width="1.5"/>`

/** Name plate; (x, y) = center. Bounds: x ±16, y ±7. */
const plate = (x: number, y: number, color: string) =>
  `<rect x="${x - 16}" y="${y - 7}" width="32" height="14" rx="3" fill="${color}"/><path d="M${x - 9} ${y}h18" stroke="#6b4226" stroke-width="2"/>`

/** Folded striped rug; (x, y) = center; `stripes` across. Bounds: x ±20, y ±8. */
const rug = (x: number, y: number, stripes: number) => {
  let s = `<rect x="${x - 20}" y="${y - 8}" width="40" height="16" rx="3" fill="#2a6fb0"/>`
  for (let i = 1; i <= stripes; i++) s += `<path d="M${x - 20 + (40 * i) / (stripes + 1)} ${y - 8}v16" stroke="#ffd166" stroke-width="3"/>`
  return s
}

/** Lying dog, faces right; (x, y) = belly on the floor. Tail separate. Bounds: x ±30, y from −26 to 0. */
const dog = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-9" rx="28" ry="10" fill="#c48a5a"/><circle cx="24" cy="-16" r="10" fill="#c48a5a"/>` +
  `<path d="M18 -24q-4 10 2 14" fill="#8a5a33"/><ellipse cx="34" cy="-13" rx="5" ry="4" fill="#c48a5a"/><circle cx="38" cy="-14" r="2" fill="#222"/>` +
  `<circle cx="27" cy="-18" r="1.6" fill="#222"/><path d="M10 -2h16M-20 -2h14" stroke="#a0703f" stroke-width="4" stroke-linecap="round"/></g>`

const dogTail = (x: number, y: number) => `<path d="M${x} ${y}q-12 -4 -16 -14" stroke="#c48a5a" stroke-width="5" stroke-linecap="round" fill="none"/>`

/** Stall door bucket on a hook; (x, y) = hook. Bounds: x ±12, y from 0 to +24. */
const doorBucket = (x: number, y: number) =>
  `<path d="M${x - 8} ${y + 8}q8 -12 16 0" stroke="#555" stroke-width="2" fill="none"/>` +
  `<path d="M${x - 11} ${y + 6}h22l-3 18h-16Z" fill="#e05a47"/><rect x="${x - 12}" y="${y + 4}" width="24" height="4" rx="2" fill="#b5523b"/>`

export default svgLevel({
  id: 106,
  chapter: 'farm',
  title: 'horseStables',
  parTimeSec: 90,
  scene: ({ diff, anim, rand }) => {
    const bays = [115, 305, 495, 685]
    let stalls = ''
    for (const bx of bays) {
      stalls += `<rect x="${bx - 90}" y="128" width="180" height="104" fill="#3d2818"/>`
      for (let x = bx - 80; x <= bx + 80; x += 16) stalls += `<path d="M${x} 128V232" stroke="#6b6b70" stroke-width="3"/>`
      stalls += `<rect x="${bx - 90}" y="124" width="180" height="8" fill="#6b4226"/>`
    }
    let doors = ''
    for (const bx of bays)
      doors +=
        `<rect x="${bx - 90}" y="230" width="180" height="150" fill="#a8693f"/>` +
        `<path d="M${bx - 90} 236h180M${bx - 84} 242l168 132M${bx + 84} 242l-168 132" stroke="#7a4a2a" stroke-width="7"/>` +
        `<rect x="${bx - 90}" y="230" width="180" height="150" fill="none" stroke="#6b4226" stroke-width="6"/>`
    let cobbles = ''
    for (let row = 0; row < 6; row++)
      for (let x = (row % 2) * 18 - 18; x < 800; x += 36)
        cobbles += `<rect x="${x + 2 + rand() * 3}" y="${386 + row * 20}" width="31" height="16" rx="7" fill="${rand() < 0.5 ? '#b9ada0' : '#a89c8f'}"/>`
    let beams = ''
    for (let x = 0; x <= 800; x += 100) beams += `<path d="M${x} 0V110" stroke="#6b4226" stroke-width="8"/>`
    const twitch = (moving: boolean) => {
      const e = ear(305, 232, '#c9c3bb')
      return moving ? anim({ type: 'sway', angle: 22, pivot: [313, 154], period: 1.3 }, e) : e
    }
    const wag = (period: number) => anim({ type: 'sway', angle: 20, pivot: [172, 458], period }, dogTail(172, 458))

    return (
      `<rect width="800" height="500" fill="#a86f45"/>` + beams +
      `<path d="M0 100H800V124H0Z" fill="#6b4226"/>` +
      `<rect x="180" y="20" width="80" height="50" fill="#d6eefa" stroke="#6b4226" stroke-width="5"/><rect x="540" y="20" width="80" height="50" fill="#d6eefa" stroke="#6b4226" stroke-width="5"/>` +
      `<path d="M220 20v50M580 20v50" stroke="#6b4226" stroke-width="3"/>` +
      `<path d="M330 100q5 -8 10 0M350 96q5 -8 10 0" stroke="#2b2b3a" stroke-width="3" fill="none"/><circle cx="430" cy="94" r="5" fill="#2b2b3a"/><path d="M430 99l-8 6h16Z" fill="#2b2b3a"/>` +
      stalls +
      diff(495, 180, 30, hayNet(495, 180, 32, 36), hayNet(495, 180, 37, 42)) +
      doors +
      diff(115, 114, 22, horseshoe(115, 116), '') +
      diff(685, 114, 22, horseshoe(685, 116), `<g transform="rotate(24 685 112)">${horseshoe(685, 116)}</g>`) +
      horseHead(115, 232, '#8d5a3a', '#3d2818') + ear(115, 232, '#8d5a3a') + ear(105, 236, '#7a4a2e') +
      horseHead(305, 232, '#c9c3bb', '#8d8a86') + ear(295, 236, '#b3ada5') +
      diff(313, 146, 22, twitch(false), twitch(true)) +
      horseHead(685, 232, '#3d3d3d', '#1f1f1f', true) + ear(685, 232, '#3d3d3d') + ear(675, 236, '#2f2f2f') +
      plate(115, 256, '#f2c14e') + plate(305, 256, '#f2c14e') + diff(495, 256, 22, plate(495, 256, '#f2c14e'), plate(495, 256, '#e6a54a')) + plate(685, 256, '#f2c14e') +
      diff(354, 298, 26, doorBucket(348, 290), doorBucket(360, 290)) +
      // Posts with halters and lanterns
      [210, 400, 590].map((x) => `<rect x="${x - 6}" y="124" width="12" height="256" fill="#6b4226"/>`).join('') +
      `<path d="M210 280q-14 18 0 34q14 -16 0 -34" stroke="#e05a47" stroke-width="4" fill="none"/>` +
      `<path d="M590 280q-14 18 0 34q14 -16 0 -34" stroke="#3a86ff" stroke-width="4" fill="none"/>` +
      `<rect x="392" y="150" width="16" height="22" rx="3" fill="#ffd166" stroke="#3d3d3d" stroke-width="2"/><path d="M392 150l8 -6l8 6" fill="#3d3d3d"/>` +
      // Aisle
      `<rect y="380" width="800" height="120" fill="#8f8478"/>` + cobbles +
      `<path d="M234 380L262 280" stroke="#c68b4e" stroke-width="4"/><path d="M226 388l12 -16l14 6l-6 18Z" fill="#e9c46a"/>` +
      dog(200, 470) + diff(166, 452, 22, wag(1.4), wag(0.6)) +
      // Saddle on its stand
      `<path d="M410 480l18 -50l18 50" stroke="#6b4226" stroke-width="5" fill="none"/>` +
      `<path d="M396 434q32 -26 64 0l-6 14q-26 -12 -52 0Z" fill="#7a3f22"/><path d="M402 426q8 -12 12 -4" stroke="#7a3f22" stroke-width="5" fill="none"/>` +
      `<path d="M428 444v22" stroke="#4a2814" stroke-width="3"/><circle cx="428" cy="468" r="4" fill="none" stroke="#8d99ae" stroke-width="2"/>` +
      // Tack trunk with a rug and brushes
      `<rect x="520" y="414" width="90" height="56" rx="4" fill="#5c7a5a"/><path d="M520 428h90" stroke="#4a634a" stroke-width="3"/><rect x="558" y="432" width="14" height="10" fill="#c9a227"/>` +
      diff(546, 406, 22, rug(546, 406, 3), rug(546, 406, 2)) +
      `<rect x="580" y="402" width="22" height="10" rx="3" fill="#c68b4e"/><path d="M582 412v4M588 412v4M594 412v4M600 412v4" stroke="#3d3d3d" stroke-width="2"/>` +
      bucket(660, 476, '#8d99ae') + hayBale(748, 456) +
      `<path d="M290 470q-14 -10 0 -18q20 -6 28 4q6 12 -12 16Z" fill="none" stroke="#d9c08c" stroke-width="5"/>` +
      `<path d="M40 500l18 -70M50 430l16 4" stroke="#a0703f" stroke-width="4"/>`
    )
  },
})
