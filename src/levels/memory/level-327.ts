import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { cloud, grass, sheep } from '../shapes.ts'
import { around, big, ground, hills } from './shapes.ts'
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
  scene: ({ diff, extra, anim }) =>
    `<rect width="500" height="520" fill="#bfe6f7"/>` +
    big(330, 450, 0.9, cloud(0, 0)) +
    diff(...around(330, 30, 430, 96), big(380, 74, 1, cloud(0, 0)), '') +
    diff(...around(60, 124, 140, 250), big(100, 170, 0.8, hotAirBalloon('#e63946', '#ffd23f')), big(100, 170, 0.8, hotAirBalloon('#3a86ff', '#ffffff'))) +
    diff(...around(190, 214, 330, 360), big(230, 260, 0.8, hotAirBalloon('#8338ec', '#ff6b8b')), big(290, 280, 0.8, hotAirBalloon('#8338ec', '#ff6b8b'))) +
    big(440, 220, 0.7, hotAirBalloon('#3fa46f', '#ffd23f')) +
    hills(510, '#a5d67a') +
    ground(510, '#8fd16a') +
    `<rect y="660" width="500" height="40" fill="#5c5f66"/>` +
    `<path d="M20 680H480" stroke="#ffffff" stroke-width="4" stroke-dasharray="30 20"/>` +
    // Hangar
    `<path d="M30 600V500Q140 430 250 500V600Z" fill="#8d99ae"/><path d="M60 482V600M100 465V600M180 465V600M220 482V600" stroke="#6b7685" stroke-width="3"/>` +
    diff(...around(80, 520, 200, 600), `<rect x="80" y="520" width="120" height="80" fill="#3d4a55"/>`, `<rect x="80" y="520" width="120" height="80" fill="#e07a5f"/>`) +
    // Control tower
    `<rect x="422" y="410" width="36" height="190" fill="#e9e4dc"/><rect x="394" y="370" width="92" height="12" rx="3" fill="#3d4a55"/><rect x="400" y="380" width="80" height="34" fill="#bde3f2"/>` +
    `<path d="M420 380v34M440 380v34M460 380v34" stroke="#3d4a55" stroke-width="2"/>` +
    diff(
      ...around(326, 500, 392, 600),
      '',
      `<rect x="328" y="500" width="4" height="100" fill="#5c677d"/><path d="M332 506L390 514V526L332 534Z" fill="#ff9f1c"/><path d="M350 508.5V531.5M370 511V529" stroke="#ffffff" stroke-width="6"/>`,
    ) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(40, 40, 0.4) +
    cloud(470, 110, 0.4) +
    cloud(200, 470, 0.4) +
    birds(210, 40) +
    birds(300, 430) +
    big(478, 50, 0.4, hotAirBalloon('#ff6b8b', '#ffffff')) +
    big(120, 45, 0.35, hotAirBalloon('#ffb703', '#3a86ff')) +
    flagPole(480, 600, '#e63946') +
    bush(15, 560, 0.7) +
    cone(400, 725) +
    cone(430, 725) +
    grass(30, 740) +
    grass(150, 740) +
    big(370, 735, 0.4, sheep(0, 0)) +
    roadSign(475, 745) +
    diff(...around(186, 640, 330, 692), plane(260, 690, '#ffffff'), plane(260, 690, '#ffd23f')) +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['birds', 455, 330],
      ['cloud', 60, 352],
      ['balloon', 150, 405, '#3a86ff'],
      ['butterfly', 60, 725],
    ]),
})
