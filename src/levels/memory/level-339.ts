// Pirate deck: on board a pirate ship among the ten hardest of "memory" (hidden until released, levels/upcoming.ts). The
// flag, a lookout's telescope in the crow's nest, a patched sail, the ship's wheel, a cannon with its balls, barrels, a
// treasure chest of gems and a parrot on the rail.
import { anchor, gull } from '../chapter-04/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { barrel, crate, ropeCoil } from '../time/shapes.ts'
import { around, big } from './shapes.ts'

/** Parrot on the rail, faces right; (x, y) = feet. Bounds: x ±20, y from −50 to 0. */
const parrot = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-4 -6l-6 26l12 -22Z" fill="#3a86ff"/><ellipse cy="-20" rx="14" ry="20" fill="#e63946"/>` +
  `<circle cx="4" cy="-40" r="10" fill="#e63946"/><path d="M12 -42q8 2 6 10l-6 -4Z" fill="#ffd23f"/><circle cx="6" cy="-42" r="2" fill="#222"/><path d="M-8 -26q-6 10 0 20" stroke="#ffd23f" stroke-width="4" fill="none"/></g>`

/** Ship's wheel in `color`; (x, y) = hub. Bounds: radius 40. */
const wheel = (x: number, y: number, color: string) => {
  let spokes = ''
  for (let a = 0; a < 360; a += 45) spokes += `<path d="M${x} ${y}L${(x + 40 * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${(y + 40 * Math.sin((a * Math.PI) / 180)).toFixed(1)}" stroke="${color}" stroke-width="5" stroke-linecap="round"/>`
  return spokes + `<circle cx="${x}" cy="${y}" r="28" fill="none" stroke="${color}" stroke-width="7"/><circle cx="${x}" cy="${y}" r="7" fill="${color}"/>`
}

export default memoryLevel({
  id: 339,
  title: 'memoryPirateDeck',
  showSeconds: 5,
  scene: ({ diff }) =>
    `<rect width="500" height="440" fill="#bfe6f7"/><rect y="380" width="500" height="60" fill="#3a86ff"/><path d="M30 390q30 -26 70 0Z" fill="#4caf6a"/>` +
    gull(380, 160) + gull(120, 200) +
    // Mast, crow's nest with its lookout's telescope, the flag, the sail's patch
    `<rect x="244" y="20" width="12" height="430" fill="#6b4226"/><path d="M256 100L470 430M244 100L30 430" stroke="#8a6a44" stroke-width="2"/>` +
    `<path d="M120 100Q250 130 380 100V290Q250 320 120 290Z" fill="#f4f1e8"/><path d="M110 100H390M110 290H390" stroke="#6b4226" stroke-width="6"/>` +
    diff(...around(300, 200, 330, 230, 30), `<rect x="300" y="200" width="30" height="30" fill="#e9c46a"/><path d="M304 204l22 22M326 204l-22 22" stroke="#8a6a44" stroke-width="2"/>`, '') +
    `<path d="M220 70H280L274 94H226Z" fill="#8a5a33"/>` +
    diff(...around(180, 66, 222, 84, 30), `<path d="M222 80L184 72" stroke="#c9953f" stroke-width="6" stroke-linecap="round"/>`, '') +
    `<path d="M250 20V8" stroke="#6b4226" stroke-width="3"/>` +
    diff(...around(252, 20, 300, 50, 30), `<rect x="252" y="20" width="48" height="30" fill="#2b2b2b"/><circle cx="276" cy="32" r="6" fill="#ffffff"/><path d="M268 44l16 -6M284 44l-16 -6" stroke="#ffffff" stroke-width="2"/>`, `<rect x="252" y="20" width="48" height="30" fill="#e63946"/><circle cx="276" cy="32" r="6" fill="#ffffff"/><path d="M268 44l16 -6M284 44l-16 -6" stroke="#ffffff" stroke-width="2"/>`) +
    `<rect x="242" y="320" width="16" height="22" rx="4" fill="#ffd23f"/>` +
    // The deck and its rail, the parrot moved along it
    `<rect y="440" width="500" height="310" fill="#a0703f"/><path d="M0 500H500M0 560H500M0 620H500M0 680H500M0 740H500" stroke="#8a5a33" stroke-width="2"/>` +
    `<rect y="420" width="500" height="12" fill="#6b4226"/><path d="M20 432V440M80 432V440M140 432V440M200 432V440M300 432V440M360 432V440M420 432V440M480 432V440" stroke="#6b4226" stroke-width="6"/>` +
    diff(...around(280, 370, 380, 420, 30), parrot(300, 420), parrot(360, 420)) +
    // The ship's wheel
    `<rect x="394" y="520" width="12" height="80" fill="#6b4226"/>` +
    diff(...around(360, 480, 440, 560, 30), wheel(400, 520, '#8a5a33'), wheel(400, 520, '#e9c46a')) +
    // The cannon and its balls, the barrels
    `<rect x="50" y="500" width="90" height="26" rx="10" fill="#3d3d3d"/><circle cx="70" cy="536" r="14" fill="#6b4226"/><circle cx="118" cy="536" r="14" fill="#6b4226"/>` +
    `<circle cx="160" cy="556" r="10" fill="#2b2b2b"/><circle cx="180" cy="556" r="10" fill="#2b2b2b"/>` +
    diff(...around(160, 530, 180, 550, 30), `<circle cx="170" cy="540" r="10" fill="#2b2b2b"/>`, '') +
    big(60, 640, 1.6, barrel(0, 0, '#4a2c1a')) +
    diff(...around(98, 586, 142, 640, 30), big(120, 640, 1.6, barrel(0, 0, '#4a2c1a')), big(120, 640, 1.6, barrel(0, 0, '#3a86ff'))) +
    // The treasure chest and its gems
    `<rect x="250" y="640" width="100" height="60" rx="6" fill="#7a4e2d"/><path d="M250 660H350M300 640V700" stroke="#c9953f" stroke-width="5"/><path d="M250 640L240 600H360L350 640Z" fill="#8a5a33"/>` +
    diff(...around(270, 626, 330, 642, 30), `<circle cx="280" cy="636" r="7" fill="#e63946"/><circle cx="300" cy="632" r="8" fill="#3fa46f"/><circle cx="320" cy="636" r="7" fill="#3a86ff"/>`, `<circle cx="280" cy="636" r="7" fill="#ffd23f"/><circle cx="300" cy="632" r="8" fill="#ffd23f"/><circle cx="320" cy="636" r="7" fill="#ffd23f"/>`) +
    // Decor: the same in both pictures
    big(200, 722, 1.6, ropeCoil(0, 0)) +
    big(450, 690, 1.4, anchor(0, 0)) +
    crate(450, 620, 28),
})
