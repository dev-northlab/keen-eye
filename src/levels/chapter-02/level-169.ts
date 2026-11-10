// Gas station: a filling station among the city's ten hardest (hidden until released, levels/upcoming.ts). New in
// the city: a pole sign with a turning logo, a canopy with its lights, fuel pumps, an SUV, a motorbike rider, a
// shop with an ice chest and an air pump, a raccoon in a bin, a tow truck and a squeegee bucket. Motion
// differences: the logo turns only on picture A; the raccoon pops up and the tow truck's beacon flashes only on B.
import { skyline } from './shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud } from '../shapes.ts'

/** Round logo with a star; (x, y) = center. Bounds: radius 22. */
const logo = (x: number, y: number) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2
    const d = i % 2 ? 7 : 16
    return `${(x + Math.cos(a) * d).toFixed(1)},${(y + Math.sin(a) * d).toFixed(1)}`
  })
  return `<circle cx="${x}" cy="${y}" r="21" fill="#e63946" stroke="#ffffff" stroke-width="3"/><polygon points="${pts.join(' ')}" fill="#ffd23f"/>`
}

/** Fuel pump without its hose; (x, y) = foot. Bounds: x ±18, y from −84 to 0. The screen is at (x, y − 70). */
const pump = (x: number, y: number) =>
  `<rect x="${x - 18}" y="${y - 84}" width="36" height="84" rx="4" fill="#f4f1e8"/><rect x="${x - 18}" y="${y - 30}" width="36" height="8" fill="#3a86ff"/>` +
  `<rect x="${x - 6}" y="${y - 52}" width="12" height="14" rx="2" fill="#3d4a55"/>`

/** SUV facing left without its fuel cap; (x, y) = ground under its middle. Bounds: x ±72, y from −84 to 0. */
const suv = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-72 -14V-46Q-72 -56 -60 -56L-46 -82H60Q72 -82 72 -70V-14Z" fill="#2a9d8f"/>` +
  `<path d="M-42 -58L-32 -76H-6V-58ZM0 -76H26V-58H0ZM32 -76H62V-58H32Z" fill="#bde3f2"/><rect x="-72" y="-30" width="144" height="6" fill="#1f6f66"/>` +
  `<rect x="-40" y="-88" width="80" height="4" fill="#3d4a55"/>` +
  `<circle cx="-42" cy="-10" r="14" fill="#2b2b2b"/><circle cx="-42" cy="-10" r="5" fill="#ccc"/><circle cx="44" cy="-10" r="14" fill="#2b2b2b"/><circle cx="44" cy="-10" r="5" fill="#ccc"/></g>`

/** Rider on a motorbike, faces right, without the helmet; (x, y) = ground center. Bounds: x ±34, y from −62 to 0. */
const rider = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><circle cx="-20" cy="-12" r="12" fill="#2b2b2b"/><circle cx="22" cy="-12" r="12" fill="#2b2b2b"/>` +
  `<path d="M-26 -26H14L24 -12" stroke="#8338ec" stroke-width="9" stroke-linecap="round"/><path d="M14 -30l8 -10h6" stroke="#3d4a55" stroke-width="3" fill="none"/>` +
  `<path d="M-10 -28L-6 -52H6L10 -32" fill="#2b2b2b"/><path d="M4 -46L18 -38" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/><circle cy="-56" r="7" fill="#e0b48a"/></g>`
const helmet = (x: number, y: number, color: string) => `<path d="M${x - 9} ${y - 54}a9 10 0 0 1 18 0v4h-18Z" fill="${color}"/><rect x="${x + 2}" y="${y - 58}" width="8" height="4" fill="#bde3f2"/>`

/** Raccoon peeking out of a bin; (x, y) = its chin. Bounds: x ±14, y from −20 to 0. */
const raccoon = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-12 -12l-2 -8l6 4ZM12 -12l2 -8l-6 4Z" fill="#6c757d"/><ellipse cy="-9" rx="13" ry="10" fill="#8d99ae"/>` +
  `<path d="M-12 -10q12 -6 24 0v4q-12 -4 -24 0Z" fill="#2b2b2b"/><circle cx="-5" cy="-9" r="1.8" fill="#ffffff"/><circle cx="5" cy="-9" r="1.8" fill="#ffffff"/>` +
  `<ellipse cy="-3" rx="5" ry="3" fill="#e9edf2"/><circle cy="-4" r="1.6" fill="#2b2b2b"/></g>`

/** Tow truck facing right without its hook and beacon; (x, y) = ground under its back. Bounds: x from 0 to +224, y from −90 to 0. */
const towTruck = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M20 -24L40 -84L50 -84L34 -24Z" fill="#3d4a55"/><path d="M40 -84H22V-76" stroke="#3d4a55" stroke-width="4" fill="none"/>` +
  `<rect x="0" y="-36" width="160" height="16" fill="#ffd23f"/><path d="M160 -20V-70H196L220 -44V-20Z" fill="#ffd23f"/><path d="M166 -64H192L208 -44H166Z" fill="#bde3f2"/>` +
  `<rect x="0" y="-24" width="224" height="6" fill="#3d4a55"/><path d="M8 -36h144" stroke="#2b2b2b" stroke-width="3" stroke-dasharray="12 10"/>` +
  `<circle cx="40" cy="-10" r="13" fill="#2b2b2b"/><circle cx="120" cy="-10" r="13" fill="#2b2b2b"/><circle cx="196" cy="-10" r="13" fill="#2b2b2b"/></g>`

export default svgLevel({
  id: 169,
  chapter: 'city',
  title: 'gasStation',
  parTimeSec: 96,
  scene: ({ diff, anim, rand, extra }) => {
    const beacon = `<rect x="204" y="416" width="14" height="8" rx="3" fill="#fb8500"/>`
    return (
      `<rect width="800" height="500" fill="#d3ecf7"/>` + skyline(rand, 300) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 28 }, cloud(330, 60, 0.6)) +
      `<rect y="300" width="800" height="200" fill="#9aa1a8"/><path d="M0 440H800" stroke="#ffffff" stroke-width="3" stroke-dasharray="26 20"/>` +
      // Pole sign with its turning logo and price panel
      `<rect x="56" y="130" width="8" height="200" fill="#5c677d"/><rect x="34" y="150" width="52" height="54" rx="3" fill="#2b2b2b"/>` +
      `<path d="M42 164h36M42 178h28M42 192h32" stroke="#ffd23f" stroke-width="5"/>` +
      diff(60, 110, 26, anim({ type: 'rotate', pivot: [60, 110], period: 3 }, logo(60, 110)), logo(60, 110)) +
      // Shop with its ice chest, air pump and the raccoon's bin
      `<rect x="580" y="200" width="214" height="140" fill="#f4d6a0"/><rect x="574" y="190" width="226" height="14" fill="#e63946"/>` +
      `<rect x="596" y="224" width="80" height="54" fill="#bde3f2"/><rect x="700" y="224" width="40" height="116" fill="#8a5a33"/>` +
      `<rect x="588" y="294" width="44" height="46" rx="3" fill="#ffffff" stroke="#9ad3f0" stroke-width="2"/>` +
      diff(610, 312, 22, `<path d="M610 302v20M601 307l18 10M601 317l18 -10" stroke="#3a86ff" stroke-width="3" stroke-linecap="round"/>`, `<path d="M610 302v20M601 307l18 10M601 317l18 -10" stroke="#e63946" stroke-width="3" stroke-linecap="round"/>`) +
      `<rect x="744" y="276" width="22" height="64" rx="3" fill="#3a86ff"/><circle cx="755" cy="290" r="6" fill="#ffffff"/>` +
      diff(772, 316, 22, `<path d="M766 304q14 4 10 18q-3 8 -10 6" stroke="#2b2b2b" stroke-width="3" fill="none"/>`, '') +
      diff(676, 314, 24, raccoon(676, 324), anim({ type: 'bob', dx: 0, dy: -5, period: 1.4 }, raccoon(676, 324))) +
      `<path d="M660 324h32l-3 20h-26Z" fill="#5c8d5a"/><rect x="658" y="320" width="36" height="6" rx="2" fill="#4a7a48"/>` +
      // Canopy with its lights, the pumps, the bucket with its squeegee
      `<rect x="200" y="150" width="10" height="190" fill="#c9d1d9"/><rect x="520" y="150" width="10" height="190" fill="#c9d1d9"/>` +
      `<rect x="150" y="124" width="420" height="28" fill="#f4f1e8"/><rect x="150" y="146" width="420" height="6" fill="#e63946"/>` +
      [230, 300, 370, 510].map((x) => `<circle cx="${x}" cy="158" r="5" fill="#fff3b0"/>`).join('') +
      diff(440, 158, 22, `<circle cx="440" cy="158" r="5" fill="#fff3b0"/>`, '') +
      `<rect x="250" y="330" width="80" height="12" fill="#c9d1d9"/><rect x="420" y="330" width="80" height="12" fill="#c9d1d9"/>` +
      pump(290, 330) + diff(312, 304, 24, `<path d="M308 284q14 10 8 34" stroke="#2b2b2b" stroke-width="3" fill="none"/><rect x="312" y="314" width="8" height="10" rx="2" fill="#2b2b2b"/>`, `<path d="M308 284q14 10 8 34" stroke="#e63946" stroke-width="3" fill="none"/><rect x="312" y="314" width="8" height="10" rx="2" fill="#e63946"/>`) +
      pump(460, 330) + diff(460, 266, 22, `<rect x="448" y="258" width="24" height="14" rx="2" fill="#8ac926"/>`, `<rect x="448" y="258" width="24" height="14" rx="2" fill="#3a86ff"/>`) +
      `<path d="M220 340h24l-3 -22h-18Z" fill="#3a86ff"/>` +
      diff(232, 306, 22, `<path d="M236 318L230 296M222 294h16" stroke="#3d4a55" stroke-width="3" stroke-linecap="round"/>`, '') +
      // SUV at the pump, the motorbike
      suv(370, 420) + diff(424, 380, 22, `<circle cx="424" cy="380" r="6" fill="#1f6f66" stroke="#3d4a55" stroke-width="2"/>`, `<circle cx="424" cy="380" r="6" fill="#3d4a55"/>`) +
      rider(530, 424) + diff(530, 366, 22, helmet(530, 424, '#ffd23f'), helmet(530, 424, '#3a86ff')) +
      // Tow truck with its hook and beacon
      towTruck(20, 494) +
      diff(40, 432, 22, `<path d="M42 418V438" stroke="#3d4a55" stroke-width="2"/><path d="M42 438a6 6 0 1 1 -6 6" stroke="#3d4a55" stroke-width="3" fill="none"/>`, '') +
      diff(211, 418, 22, beacon, anim({ type: 'blink', duty: 0.5, period: 0.7 }, beacon)) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['cone', 340, 490],
        ['coffeeCup', 296, 490],
        ['newspaperBox', 740, 490],
        ['pigeon', 640, 486],
        ['bollard', 130, 340],
      ])
    )
  },
})
