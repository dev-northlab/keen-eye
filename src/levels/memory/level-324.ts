import { memoryLevel } from '../helpers.ts'
import { around, big, bottle, cube, glassJar, pottedPlant, room, shelf, sticker, wallClock } from './shapes.ts'
import { bucket, crate, poster, pot } from '../time/shapes.ts'

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
  `<path d="${Array.from({ length: Math.floor(y / 40) + 1 }, (_, i) => `M0 ${i * 40}H500`).join('')}${Array.from({ length: 13 }, (_, i) => `M${i * 40} 0V${y}`).join('')}" stroke="#ffffff" stroke-width="2"/>`

export default memoryLevel({
  id: 324,
  title: 'memoryLab',
  showSeconds: 4,
  scene: ({ diff, secret }) =>
    room(500, '#e3eef5', '#9aa5b1') +
    tileLines(492) +
    chart() +
    wallClock(300, 100, 34, '#5c677d') +
    // Shelf with jars
    `<rect x="200" y="300" width="280" height="10" fill="#8a5a33"/>` +
    labJar(240, 300, '#8ac926') +
    diff(...around(280, 242, 320, 300), labJar(300, 300, '#ff6b8b'), labJar(300, 300, '#4dabf7')) +
    // The category's hidden key (on B only), behind the yellow jar
    secret(347, 294) +
    labJar(360, 300, '#ffd23f') +
    diff(...around(406, 234, 454, 300), '', big(430, 300, 0.6, pottedPlant(0, 0))) +
    // Bench and cabinets
    `<rect x="30" y="490" width="440" height="80" fill="#cfd8e0"/><path d="M140 490V570M250 490V570M360 490V570" stroke="#9aa5b1" stroke-width="3"/>` +
    `<g fill="#5c677d"><rect x="120" y="520" width="10" height="20" rx="3"/><rect x="260" y="520" width="10" height="20" rx="3"/><rect x="370" y="520" width="10" height="20" rx="3"/></g>` +
    `<rect x="20" y="470" width="460" height="20" rx="4" fill="#5c677d"/>` +
    diff(...around(35, 368, 95, 470), microscope(65, 470), '') +
    flask(128, 470, '#ffd23f') +
    diff(...around(164, 390, 216, 470), flask(190, 470, '#8ac926'), flask(190, 470, '#ff6b8b')) +
    flask(252, 470, '#4dabf7') +
    // Test tube rack
    `<rect x="290" y="458" width="110" height="12" rx="3" fill="#a0703f"/><path d="M295 458V436M395 458V436" stroke="#a0703f" stroke-width="6"/>` +
    tube(305, 452, '#ff6b8b') +
    tube(330, 452, '#ffd23f') +
    tube(355, 452, '#8ac926') +
    diff(...around(290, 390, 400, 470), tube(380, 452, '#4dabf7'), '') +
    `<rect x="290" y="430" width="110" height="8" rx="3" fill="#a0703f"/>` +
    // Beaker with bubbles
    `<path d="M437 410h36v56q0 4 -4 4h-28q-4 0 -4 -4Z" fill="#e6f4fb"/><rect x="437" y="436" width="36" height="34" rx="3" fill="#b38cff"/>` +
    `<circle cx="449" cy="424" r="4" fill="none" stroke="#b38cff" stroke-width="2"/><circle cx="461" cy="414" r="5" fill="none" stroke="#b38cff" stroke-width="2"/>` +
    // Decor: small things that fill the room, the same in both pictures
    poster(390, 40, 50, 66, '#4dabf7') +
    shelf(30, 300, 90) +
    glassJar(48, 300, '#8ac926', '#ff6b8b') +
    bottle(75, 300, '#3a86ff') +
    bottle(97, 300, '#e63946') +
    poster(140, 230, 40, 56, '#ff6b8b') +
    shelf(420, 190, 70) +
    bottle(440, 190, '#8ac926') +
    glassJar(468, 190, '#5c677d', '#4dabf7') +
    sticker(80, 535, '#ffd23f') +
    cube(30, 745, 30, '#ffb703') +
    bucket(80, 745, '#5c677d') +
    pot(130, 745) +
    cube(330, 745, 34, '#3a86ff') +
    crate(380, 745, 30) +
    pot(120, 605, '#3a86ff') +
    diff(...around(172, 636, 288, 700), stool(200, 700), stool(260, 700)) +
    `<path d="M440 690h40l-4 50h-32Z" fill="#5c677d"/>`,
})
