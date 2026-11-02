import { memoryLevel } from '../helpers.ts'
import { around, big, pottedPlant, room, wallClock } from './shapes.ts'

/** Lab jar with a liquid; (x, y) = bottom center. Bounds: x ±20, y from −58 to 0. */
const labJar = (x: number, y: number, liquid: string) =>
  `<rect x="${x - 18}" y="${y - 52}" width="36" height="52" rx="6" fill="#e6f4fb"/><rect x="${x - 18}" y="${y - 30}" width="36" height="30" rx="6" fill="${liquid}"/>` +
  `<rect x="${x - 20}" y="${y - 58}" width="40" height="8" rx="3" fill="#3d4a55"/>`

/** Conical flask; (x, y) = bottom center. Bounds: x ±26, y from −80 to 0. */
const flask = (x: number, y: number, liquid: string) =>
  `<rect x="${x - 7}" y="${y - 80}" width="14" height="32" fill="#e6f4fb"/>` +
  `<path d="M${x - 7} ${y - 50}L${x - 26} ${y - 4}q0 4 4 4h44q4 0 4 -4L${x + 7} ${y - 50}Z" fill="#e6f4fb"/>` +
  `<path d="M${x - 17} ${y - 26}L${x - 26} ${y - 4}q0 4 4 4h44q4 0 4 -4L${x + 17} ${y - 26}Z" fill="${liquid}"/>`

/** Test tube; (x, y) = bottom center. Bounds: x ±7, y from −62 to 0. */
const tube = (x: number, y: number, liquid: string) =>
  `<rect x="${x - 7}" y="${y - 62}" width="14" height="62" rx="7" fill="#e6f4fb"/><rect x="${x - 7}" y="${y - 30}" width="14" height="30" rx="7" fill="${liquid}"/>`

/** Microscope; (x, y) = bottom center. Bounds: x from −30 to +30, y from −102 to 0. */
const microscope = (x: number, y: number) =>
  `<rect x="${x - 30}" y="${y - 12}" width="60" height="12" rx="4" fill="#3d4a55"/>` +
  `<path d="M${x + 15} ${y - 12}V${y - 68}Q${x + 15} ${y - 84} ${x - 1} ${y - 84}" stroke="#8d99ae" stroke-width="10" fill="none"/>` +
  `<rect x="${x - 25}" y="${y - 44}" width="50" height="6" fill="#3d4a55"/>` +
  `<rect x="${x - 13}" y="${y - 94}" width="14" height="46" fill="#3d4a55"/><rect x="${x - 15}" y="${y - 102}" width="18" height="10" rx="2" fill="#5c677d"/>`

/** Stool; (x, y) = bottom center. Bounds: x ±28, y from −64 to 0. */
const stool = (x: number, y: number) =>
  `<path d="M${x - 20} ${y}L${x - 12} ${y - 54}M${x + 20} ${y}L${x + 12} ${y - 54}M${x} ${y}V${y - 54}" stroke="#5c677d" stroke-width="5"/>` +
  `<ellipse cx="${x}" cy="${y - 56}" rx="28" ry="8" fill="#e63946"/>`

/** Wall chart: a frame with rows of colored squares. Bounds: x 60…220, y 60…200. */
const chart = () => {
  const colors = ['#ff6b8b', '#ffd23f', '#8ac926', '#4dabf7', '#b38cff', '#ff9f43']
  let cells = ''
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) cells += `<rect x="${74 + c * 36}" y="${76 + r * 38}" width="30" height="30" rx="3" fill="${colors[(r * 4 + c) % colors.length]}"/>`
  return `<rect x="60" y="60" width="160" height="140" rx="6" fill="#ffffff"/>${cells}`
}

/** Wall tiles over the wall above y. */
const tileLines = (y: number) =>
  `<path d="${Array.from({ length: 9 }, (_, i) => `M0 ${i * 40}H800`).join('')}${Array.from({ length: 20 }, (_, i) => `M${i * 40} 0V${y}`).join('')}" stroke="#ffffff" stroke-width="2"/>`

export default memoryLevel({
  id: 324,
  title: 'memoryLab',
  showSeconds: 4,
  scene: ({ diff }) =>
    room(360, '#e3eef5', '#9aa5b1') +
    tileLines(352) +
    chart() +
    wallClock(330, 100, 34, '#5c677d') +
    // Shelf with jars
    `<rect x="480" y="150" width="280" height="10" fill="#8a5a33"/>` +
    labJar(520, 150, '#8ac926') +
    diff(...around(560, 92, 600, 150), labJar(580, 150, '#ff6b8b'), labJar(580, 150, '#4dabf7')) +
    labJar(640, 150, '#ffd23f') +
    diff(...around(686, 84, 734, 150), '', big(710, 150, 0.6, pottedPlant(0, 0))) +
    // Bench and cabinets
    `<rect x="40" y="350" width="720" height="80" fill="#cfd8e0"/><path d="M220 350V430M400 350V430M580 350V430" stroke="#9aa5b1" stroke-width="3"/>` +
    `<g fill="#5c677d"><rect x="200" y="380" width="10" height="20" rx="3"/><rect x="410" y="380" width="10" height="20" rx="3"/><rect x="560" y="380" width="10" height="20" rx="3"/></g>` +
    `<rect x="30" y="330" width="740" height="20" rx="4" fill="#5c677d"/>` +
    diff(...around(95, 228, 155, 330), microscope(125, 330), '') +
    flask(230, 330, '#ffd23f') +
    diff(...around(274, 250, 326, 330), flask(300, 330, '#8ac926'), flask(300, 330, '#ff6b8b')) +
    flask(370, 330, '#4dabf7') +
    // Test tube rack
    `<rect x="425" y="318" width="110" height="12" rx="3" fill="#a0703f"/><path d="M430 318V296M530 318V296" stroke="#a0703f" stroke-width="6"/>` +
    tube(440, 312, '#ff6b8b') +
    tube(465, 312, '#ffd23f') +
    tube(490, 312, '#8ac926') +
    diff(...around(425, 250, 535, 330), tube(515, 312, '#4dabf7'), '') +
    `<rect x="425" y="290" width="110" height="8" rx="3" fill="#a0703f"/>` +
    // Beaker with bubbles and a burner
    `<path d="M592 270h36v56q0 4 -4 4h-28q-4 0 -4 -4Z" fill="#e6f4fb"/><rect x="592" y="296" width="36" height="34" rx="3" fill="#b38cff"/>` +
    `<circle cx="604" cy="284" r="4" fill="none" stroke="#b38cff" stroke-width="2"/><circle cx="616" cy="274" r="5" fill="none" stroke="#b38cff" stroke-width="2"/>` +
    `<rect x="680" y="300" width="20" height="30" fill="#5c677d"/><path d="M690 300q12 -16 0 -30q-12 14 0 30Z" fill="#4dabf7"/>` +
    diff(...around(272, 396, 388, 460), stool(300, 460), stool(360, 460)) +
    `<path d="M700 440h40l-4 50h-32Z" fill="#5c677d"/>`,
})
