import { memoryLevel } from '../helpers.ts'
import { cloud, grass, sheep } from '../shapes.ts'
import { around, big, hills } from './shapes.ts'
import { cone } from '../chapter-02/shapes.ts'
import { birds, bush, flagPole, roadSign } from '../time/shapes.ts'

/** Hot air balloon with stripes; envelope center at the origin. Bounds: x ±50, y from −58 to +100. */
const hotAirBalloon = (a: string, b: string) =>
  `<path d="M-20 52L-12 80M20 52L12 80" stroke="#6b4f3a" stroke-width="2"/><rect x="-14" y="80" width="28" height="20" rx="3" fill="#a0703f"/>` +
  `<ellipse rx="50" ry="58" fill="${a}"/><ellipse rx="18" ry="58" fill="${b}"/><path d="M-20 52h40l-6 14h-28Z" fill="${a}"/>`

/** Small plane facing right; (x, y) = ground under the middle. Bounds: x from −74 to +70, y from −50 to +2. */
const plane = (x: number, y: number, color: string) =>
  `<path d="M${x - 60} ${y - 25}L${x - 74} ${y - 50}H${x - 58}L${x - 40} ${y - 25}Z" fill="${color}"/>` +
  `<path d="M${x - 66} ${y - 18}q0 -10 20 -10h96q20 0 20 14q0 10 -20 10h-100q-16 0 -16 -14Z" fill="${color}"/>` +
  `<ellipse cx="${x - 2}" cy="${y - 12}" rx="30" ry="7" fill="#000000" fill-opacity="0.2"/>` +
  `<g fill="#bde3f2"><circle cx="${x + 12}" cy="${y - 20}" r="4"/><circle cx="${x + 26}" cy="${y - 20}" r="4"/><circle cx="${x + 40}" cy="${y - 20}" r="4"/></g>` +
  `<circle cx="${x - 30}" cy="${y - 2}" r="4" fill="#3d3d3d"/><circle cx="${x + 30}" cy="${y - 2}" r="4" fill="#3d3d3d"/>`

export default memoryLevel({
  id: 327,
  title: 'memoryAirfield',
  showSeconds: 4,
  scene: ({ diff }) =>
    `<rect width="800" height="390" fill="#bfe6f7"/>` +
    big(330, 300, 0.9, cloud(0, 0)) +
    diff(...around(570, 31, 670, 97), big(620, 75, 1, cloud(0, 0)), '') +
    diff(...around(110, 104, 190, 230), big(150, 150, 0.8, hotAirBalloon('#e63946', '#ffd23f')), big(150, 150, 0.8, hotAirBalloon('#3a86ff', '#ffffff'))) +
    diff(...around(360, 64, 500, 210), big(400, 110, 0.8, hotAirBalloon('#8338ec', '#ff6b8b')), big(460, 130, 0.8, hotAirBalloon('#8338ec', '#ff6b8b'))) +
    big(660, 190, 0.7, hotAirBalloon('#3fa46f', '#ffd23f')) +
    hills(380, '#a5d67a') +
    `<rect y="380" width="800" height="120" fill="#8fd16a"/><rect y="410" width="800" height="40" fill="#5c5f66"/>` +
    `<path d="M260 430H800" stroke="#ffffff" stroke-width="4" stroke-dasharray="30 20"/>` +
    // Hangar
    `<path d="M30 430V330Q140 260 250 330V430Z" fill="#8d99ae"/><path d="M60 312V430M100 295V430M180 295V430M220 312V430" stroke="#6b7685" stroke-width="3"/>` +
    diff(...around(80, 350, 200, 430), `<rect x="80" y="350" width="120" height="80" fill="#3d4a55"/>`, `<rect x="80" y="350" width="120" height="80" fill="#e07a5f"/>`) +
    // Control tower
    `<rect x="712" y="240" width="36" height="190" fill="#e9e4dc"/><rect x="684" y="200" width="92" height="12" rx="3" fill="#3d4a55"/><rect x="690" y="210" width="80" height="34" fill="#bde3f2"/>` +
    `<path d="M710 210v34M730 210v34M750 210v34" stroke="#3d4a55" stroke-width="2"/>` +
    diff(
      ...around(616, 330, 682, 430),
      '',
      `<rect x="618" y="330" width="4" height="100" fill="#5c677d"/><path d="M622 336L680 344V356L622 364Z" fill="#ff9f1c"/><path d="M640 338.5V361.5M660 341V359" stroke="#ffffff" stroke-width="6"/>`,
    ) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(25, 40, 0.4) +
    cloud(575, 220, 0.4) +
    cloud(760, 160, 0.4) +
    birds(280, 60) +
    birds(500, 290) +
    big(760, 80, 0.4, hotAirBalloon('#ff6b8b', '#ffffff')) +
    big(275, 200, 0.35, hotAirBalloon('#ffb703', '#3a86ff')) +
    flagPole(770, 430, '#e63946') +
    bush(20, 400, 0.7) +
    cone(270, 410) +
    cone(300, 410) +
    grass(30, 495) +
    grass(290, 490) +
    big(540, 485, 0.4, sheep(0, 0)) +
    roadSign(770, 495) +
    diff(...around(346, 390, 490, 442), plane(420, 440, '#ffffff'), plane(420, 440, '#ffd23f')),
})
