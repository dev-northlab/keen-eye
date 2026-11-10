// Raccoon camp: a night campsite, the forest's hardest scene (hidden until released, levels/upcoming.ts). New in
// the forest: a camper trailer with curtains, string lights, a tent with a camper and his torch, a campfire with
// a child toasting a marshmallow, a picnic table with a cool box, a raccoon, a food bag hung in a tree, a skunk, a
// porcupine and a canoe on trestles. Motion differences: the fire flickers and part of the string lights twinkles
// only on picture A; the raccoon peeks only on B.
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { pine, tent } from './shapes.ts'

/** Campfire flame; (x, y) = base center. Bounds: x ±16, y from −40 to 0. */
const flame = (x: number, y: number) =>
  `<path d="M${x - 16} ${y}Q${x - 14} ${y - 24} ${x} ${y - 40}Q${x + 14} ${y - 24} ${x + 16} ${y}Z" fill="#fb8500"/><path d="M${x - 8} ${y}Q${x - 6} ${y - 14} ${x} ${y - 24}Q${x + 6} ${y - 14} ${x + 8} ${y}Z" fill="#ffd23f"/>`

/** Raccoon peeking over an edge; (x, y) = chin. Bounds: x ±14, y from −22 to 0. */
const raccoon = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-12 -12l-2 -9l6 4ZM12 -12l2 -9l-6 4Z" fill="#6c757d"/><ellipse cy="-9" rx="13" ry="10" fill="#8d99ae"/>` +
  `<path d="M-12 -10q12 -6 24 0v4q-12 -4 -24 0Z" fill="#2b2b2b"/><circle cx="-5" cy="-9" r="1.8" fill="#ffffff"/><circle cx="5" cy="-9" r="1.8" fill="#ffffff"/><circle cy="-4" r="1.6" fill="#2b2b2b"/></g>`

/** Skunk walking right without its tail; (x, y) = feet. Bounds: x from −16 to +22, y from −22 to 0. */
const skunk = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-10 0V-8M-2 0V-8M8 0V-8M14 0V-8" stroke="#2b2b2b" stroke-width="3"/><ellipse cy="-12" rx="16" ry="9" fill="#2b2b2b"/>` +
  `<path d="M-14 -16Q0 -24 14 -16" stroke="#f4f1e8" stroke-width="4" fill="none"/><circle cx="16" cy="-12" r="6" fill="#2b2b2b"/><path d="M16 -18v8" stroke="#f4f1e8" stroke-width="2"/><circle cx="18" cy="-13" r="1" fill="#fff"/></g>`
/** The skunk's tail, raised or trailing, for a skunk at (x, y). Bounds: x from −40 to −12, y from −44 to −6. */
const skunkTail = (x: number, y: number, raised: boolean) =>
  raised
    ? `<path d="M${x - 14} ${y - 14}Q${x - 30} ${y - 22} ${x - 24} ${y - 42}" stroke="#2b2b2b" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M${x - 18} ${y - 18}Q${x - 28} ${y - 26} ${x - 24} ${y - 40}" stroke="#f4f1e8" stroke-width="3" fill="none"/>`
    : `<path d="M${x - 14} ${y - 10}Q${x - 28} ${y - 8} ${x - 38} ${y - 14}" stroke="#2b2b2b" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M${x - 16} ${y - 12}Q${x - 28} ${y - 11} ${x - 36} ${y - 15}" stroke="#f4f1e8" stroke-width="3" fill="none"/>`

/** Porcupine, faces right; (x, y) = feet. Bounds: x from −22 to +20, y from −26 to 0. */
const porcupine = (x: number, y: number) => {
  let quills = ''
  for (let a = -160; a <= -20; a += 14) quills += `<path d="M0 -10l${(Math.cos((a * Math.PI) / 180) * 22).toFixed(1)} ${(Math.sin((a * Math.PI) / 180) * 16).toFixed(1)}" stroke="#d9cbb5" stroke-width="2"/>`
  return `<g transform="translate(${x} ${y})">${quills}<ellipse cy="-8" rx="16" ry="9" fill="#5e4630"/><circle cx="14" cy="-6" r="5" fill="#7a5a3a"/><circle cx="16" cy="-7" r="1" fill="#222"/></g>`
}

/** Camper trailer with lit windows, the second window's curtains separate; (x, y) = bottom left, 200 wide. Bounds: y from −100 to 0. */
const trailer = (x: number, y: number) =>
  `<path d="M${x} ${y - 14}V${y - 80}Q${x} ${y - 100} ${x + 22} ${y - 100}H${x + 182}Q${x + 200} ${y - 100} ${x + 200} ${y - 80}V${y - 14}Z" fill="#e9dcc4"/>` +
  `<rect x="${x}" y="${y - 44}" width="200" height="8" fill="#2a9d8f"/><rect x="${x + 20}" y="${y - 84}" width="40" height="28" rx="4" fill="#ffd166"/><rect x="${x + 70}" y="${y - 84}" width="40" height="28" rx="4" fill="#ffd166"/>` +
  `<rect x="${x + 140}" y="${y - 82}" width="30" height="68" rx="3" fill="#a0703f"/><circle cx="${x + 50}" cy="${y - 8}" r="12" fill="#2b2b2b"/><path d="M${x + 200} ${y - 20}h24" stroke="#3d4a55" stroke-width="3"/>`

export default svgLevel({
  id: 180,
  chapter: 'forest',
  title: 'raccoonCamp',
  parTimeSec: 108,
  scene: ({ diff, anim, rand, extra }) => {
    const bulbs = `<g fill="#ffd23f"><circle cx="314" cy="228" r="4"/><circle cx="330" cy="228" r="4" fill="#e63946"/><circle cx="346" cy="226" r="4" fill="#3a86ff"/></g>`
    let stars = ''
    for (let i = 0; i < 40; i++) {
      const x = rand() * 800
      const y = rand() * 170
      if (Math.hypot(x - 640, y - 40) > 30 && Math.hypot(x - 700, y - 70) > 40 && Math.hypot(x - 330, y - 226) > 30)
        stars += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.8 + rand()).toFixed(1)}" fill="#fff8d6"/>`
    }
    let forest = ''
    for (let x = -10; x < 820; x += 40) forest += pine(x, 300, 0.8 + ((x / 40) % 3) * 0.1, '#1e3a3a')
    return (
      `<rect width="800" height="500" fill="#1d2b4f"/>` + stars +
      `<circle cx="700" cy="70" r="28" fill="#fff3c4"/><circle cx="690" cy="62" r="5" fill="#ece0a8"/>` +
      diff(640, 40, 22, `<path d="M640 32l2 6l6 0l-5 4l2 6l-5 -4l-5 4l2 -6l-5 -4l6 0Z" fill="#fff8d6"/>`, '') +
      forest + `<rect y="296" width="800" height="204" fill="#3d4a2e"/>` +
      // Trailer with the curtains, string lights with their twinkling bulbs
      trailer(30, 320) +
      diff(120, 242, 22, `<path d="M100 236h40v8q-10 4 -20 0q-10 4 -20 0Z" fill="#e63946"/>`, `<path d="M100 236h40v8q-10 4 -20 0q-10 4 -20 0Z" fill="#3a86ff"/>`) +
      `<path d="M230 232Q330 252 440 210" stroke="#3d4a55" stroke-width="1.5" fill="none"/>` +
      [250, 270, 290, 370, 390, 410].map((x, i) => `<circle cx="${x}" cy="${238 + Math.sin(i) * 4 - (x > 360 ? (x - 360) * 0.5 : 0)}" r="4" fill="${['#ffd23f', '#e63946', '#3a86ff'][i % 3]}"/>`).join('') +
      diff(330, 226, 24, anim({ type: 'blink', duty: 0.5, period: 0.8 }, bulbs), bulbs) +
      // Tent with the camper and his torch
      tent(440, 360, '#e9a23b') + `<circle cx="452" cy="340" r="7" fill="#e0b48a"/><path d="M445 338q7 -8 14 0" fill="#5a3d2b"/>` +
      diff(480, 338, 28, `<path d="M460 340L500 324V354Z" fill="#fffbe6" fill-opacity="0.5"/><rect x="456" y="337" width="8" height="5" fill="#3d4a55"/>`, '') +
      // Food bag hung in a pine
      `<path d="M720 160L790 150" stroke="#3d2a1a" stroke-width="5"/><path d="M744 157V190" stroke="#c9d1d9" stroke-width="1.5"/>` +
      diff(744, 206, 24, `<path d="M734 190h20l4 30h-28Z" fill="#e63946"/><path d="M738 190l6 -4l6 4" stroke="#e63946" stroke-width="2" fill="none"/>`, `<path d="M734 190h20l4 30h-28Z" fill="#8ac926"/><path d="M738 190l6 -4l6 4" stroke="#8ac926" stroke-width="2" fill="none"/>`) +
      // Campfire and the marshmallow
      `<path d="M352 450l56 -10M352 440l56 10" stroke="#6b4a2b" stroke-width="7" stroke-linecap="round"/><circle cx="380" cy="452" r="22" fill="none" stroke="#8d99ae" stroke-width="5" stroke-dasharray="8 4"/>` +
      diff(380, 426, 28, anim({ type: 'sway', angle: 8, pivot: [380, 446], period: 0.5 }, flame(380, 446)), flame(380, 446)) +
      person(500, 476, '#ff006e', true, '#f2d29b', '#c0392b') + `<path d="M490 438L448 408" stroke="#a0703f" stroke-width="2"/>` +
      diff(446, 404, 22, `<rect x="440" y="398" width="12" height="10" rx="3" fill="#f4f1e8"/>`, '') +
      // Picnic table, the raccoon behind its bench, the cool box
      `<rect x="540" y="384" width="140" height="10" fill="#8a5a33"/><path d="M556 394l-10 40M664 394l10 40M540 414H680" stroke="#6b4a2b" stroke-width="6"/>` +
      diff(560, 372, 24, raccoon(560, 384), anim({ type: 'bob', dx: 0, dy: -6, period: 1.4 }, raccoon(560, 384))) +
      `<rect x="634" y="360" width="40" height="24" rx="3" fill="#f4f1e8"/>` +
      diff(654, 360, 24, `<rect x="632" y="352" width="44" height="10" rx="3" fill="#3a86ff"/>`, `<rect x="632" y="352" width="44" height="10" rx="3" fill="#e63946"/>`) +
      // Canoe on its trestles, the porcupine, the skunk
      `<path d="M140 400l10 30M150 400l-10 30M220 400l10 30M230 400l-10 30" stroke="#6b4a2b" stroke-width="4"/>` +
      `<path d="M110 398Q180 370 250 398Z" fill="#2a9d8f"/>` +
      diff(180, 388, 24, `<path d="M156 390Q180 380 204 390" stroke="#ffd23f" stroke-width="4" fill="none"/>`, `<path d="M156 390Q180 380 204 390" stroke="#ffffff" stroke-width="4" fill="none"/>`) +
      diff(110, 470, 26, porcupine(110, 484), '') +
      skunk(740, 486) + diff(716, 462, 26, skunkTail(740, 486, true), skunkTail(740, 486, false)) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['firefly', 260, 380],
        ['owl', 60, 180],
        ['acorn', 420, 486],
        ['pineCone', 300, 486],
        ['mushroom', 620, 486],
      ])
    )
  },
})
