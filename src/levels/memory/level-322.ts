import { star } from '../chapter-05/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { cloud } from '../shapes.ts'
import { around, big, cube, daySky, ground } from './shapes.ts'
import { bench, bin, cone, pigeon } from '../chapter-02/shapes.ts'
import { birds, flagPole } from '../time/shapes.ts'

/** Tent walls of alternating stripes from x0 to x1, y0 to y1. */
const stripedWall = (x0: number, x1: number, y0: number, y1: number, w: number, a: string, b: string) =>
  Array.from({ length: Math.ceil((x1 - x0) / w) }, (_, i) =>
    `<rect x="${x0 + i * w}" y="${y0}" width="${Math.min(w, x1 - x0 - i * w)}" height="${y1 - y0}" fill="${i % 2 ? b : a}"/>`,
  ).join('')

/** Small balloon on a string to (tx, ty); (x, y) = balloon center. */
const balloon = (x: number, y: number, color: string, tx: number, ty: number) =>
  `<path d="M${x} ${y + 18}L${tx} ${ty}" stroke="#6b766f" stroke-width="1.5"/><circle cx="${x}" cy="${y}" r="18" fill="${color}"/>` +
  `<ellipse cx="${x - 6}" cy="${y - 6}" rx="4" ry="6" fill="#ffffff" fill-opacity="0.4"/>`

/** Ticket booth roof; (x, y) = its ridge. Bounds: x ±70, y from 0 to +34. */
const boothRoof = (x: number, y: number, color: string) =>
  `<path d="M${x - 70} ${y + 34}L${x} ${y}L${x + 70} ${y + 34}Z" fill="${color}"/>` +
  `<path d="M${x - 70} ${y + 34}q10 8 20 0t20 0t20 0t20 0t20 0t20 0t20 0" fill="#ffffff"/>`

/** Juggling ball on the podium; (x, y) = center. Bounds: radius 26. */
const circusBall = (x: number, y: number, color: string) =>
  `<circle cx="${x}" cy="${y}" r="26" fill="${color}"/><path d="M${x - 26} ${y}h52M${x} ${y - 26}q-14 26 0 52" stroke="#ffffff" stroke-width="4" fill="none"/>`

/** Markup moved by (dx, dy): parts of the circus drawn at their helpers' places. Zones inside are given moved. */
const at = (dx: number, dy: number, markup: string) => `<g transform="translate(${dx} ${dy})">${markup}</g>`

export default memoryLevel({
  id: 322,
  title: 'memoryCircus',
  showSeconds: 4,
  scene: ({ diff }) =>
    daySky(420) +
    big(90, 60, 0.9, cloud(0, 0)) +
    big(420, 60, 1, cloud(0, 0)) +
    ground(400, '#c9e27a') +
    `<ellipse cx="250" cy="690" rx="240" ry="50" fill="#f2d29b"/>` +
    // Big top
    at(
      -150,
      40,
      stripedWall(220, 580, 220, 360, 40, '#e63946', '#ffffff') +
        `<path d="M210 222L400 100L590 222Z" fill="#e63946"/><path d="M210 222q24 16 48 0t48 0t48 0t48 0t48 0t48 0t48 0t48 0" fill="#ffd23f"/>` +
        `<path d="M360 360V300Q400 260 440 300V360Z" fill="#3d2a20"/><path d="M360 300Q380 330 380 360M440 300Q420 330 420 360" stroke="#ffd23f" stroke-width="4" fill="none"/>` +
        `<rect x="398" y="48" width="4" height="54" fill="#5c677d"/>` +
        `<path d="M402 52h36l-8 12l8 12h-36Z" fill="#3a86ff"/>` +
        diff(...around(228, 188, 272, 232, 30), star(400, 170, 22, '#ffd23f'), '') +
        star(300, 170, 12, '#ffd23f') +
        star(500, 170, 12, '#ffd23f'),
    ) +
    // Small tent
    at(
      0,
      230,
      stripedWall(40, 180, 300, 360, 20, '#3a86ff', '#ffd23f') +
        `<path d="M30 302L110 230L190 302Z" fill="#3a86ff"/><path d="M95 360V320L110 306L125 320V360Z" fill="#3d2a20"/>` +
        `<path d="M110 232Q140 250 170 236" stroke="#6b766f" stroke-width="2" fill="none"/>` +
        `<path d="M125 240l8 14l6 -12ZM150 243l8 13l6 -13Z" fill="#ff6b8b"/>` +
        flagPole(110, 232, '#ffd23f'),
    ) +
    // Ticket booth
    at(
      -300,
      230,
      `<rect x="620" y="262" width="120" height="98" fill="#ffd23f"/><rect x="640" y="280" width="80" height="40" rx="4" fill="#2b3a78"/><rect x="630" y="320" width="100" height="8" fill="#a0703f"/>` +
        diff(...around(310, 458, 450, 492), boothRoof(680, 228, '#8338ec'), boothRoof(680, 228, '#e63946')),
    ) +
    // Balloon seller's bunch
    at(
      -300,
      270,
      `<path d="M725 440V476" stroke="#6b766f" stroke-width="2"/>` +
        balloon(695, 380, '#e63946', 725, 440) +
        balloon(725, 365, '#3a86ff', 725, 440) +
        balloon(720, 400, '#ffd23f', 725, 440) +
        diff(...around(377, 617, 473, 710), balloon(755, 382, '#8ac926', 725, 440), ''),
    ) +
    // Podium with a ball
    at(
      -150,
      240,
      `<rect x="200" y="410" width="100" height="60" fill="#e63946"/><path d="M200 430h100M200 450h100" stroke="#ffd23f" stroke-width="4"/><ellipse cx="250" cy="410" rx="50" ry="12" fill="#ffd23f"/>` +
        diff(...around(74, 598, 126, 650), circusBall(250, 384, '#3a86ff'), circusBall(250, 384, '#ff9f1c')),
    ) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(190, 30, 0.4) +
    cloud(470, 150, 0.4) +
    balloon(40, 300, '#ff6b8b', 40, 350) +
    birds(330, 30) +
    birds(150, 140) +
    balloon(470, 330, '#8ac926', 470, 380) +
    bin(20, 745, '#e63946') +
    cone(160, 745) +
    cube(320, 745, 30, '#3a86ff') +
    cube(470, 420, 26, '#ffd23f') +
    bench(225, 612, '#e63946') +
    pigeon(290, 605) +
    diff(
      ...around(194, 669, 306, 701),
      '',
      at(-170, 250, `<rect x="380" y="431" width="80" height="8" rx="3" fill="#5c677d"/><circle cx="380" cy="435" r="16" fill="#3d3d3d"/><circle cx="460" cy="435" r="16" fill="#3d3d3d"/>`),
    ),
})
