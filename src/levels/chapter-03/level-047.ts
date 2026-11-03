// Motion differences: the rowboat rocks faster on picture B; the fish leaps only on B; the reeds sway faster on B.
import { svgLevel } from '../helpers.ts'
import { backpack, bluebells, cloud, floor, lantern, pine, pineCone, rock, sun, trailSign } from './shapes.ts'
import { person } from '../chapter-02/shapes.ts'

/** Rowboat with a rower; (x, y) = waterline center. Bounds: x ±36, y from −50 to +8. */
const boat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-14 -28l-20 20" stroke="#8a5a3b" stroke-width="3"/><rect x="-8" y="-50" width="7" height="22" fill="#3a86ff"/><rect x="1" y="-50" width="7" height="22" fill="#3a86ff"/>` +
  `<circle cy="-56" r="7" fill="#f2d29b"/><path d="M-36 -8h72l-10 16h-52Z" fill="#a0703f"/><path d="M-30 -8h60" stroke="#8a5a3b" stroke-width="3"/></g>`

/** Leaping fish; (x, y) = center. Bounds: x ±14, y ±10. */
const fish = (x: number, y: number) =>
  `<g transform="translate(${x} ${y}) rotate(-35)"><ellipse rx="10" ry="5" fill="#ff9f43"/><path d="M-8 0l-7 -5v10Z" fill="#ff9f43"/><circle cx="6" cy="-1" r="1.2" fill="#222"/></g>`

/** Swan, faces right; (x, y) = waterline center. Bounds: x ±18, y from −34 to +4. */
const swan = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-18 0q0 -12 14 -12h12q6 0 4 8l-4 4Z" fill="#fff"/><path d="M8 -12q-10 -8 0 -20q8 -4 8 4" stroke="#fff" stroke-width="5" fill="none"/>` +
  `<circle cx="14" cy="-28" r="5" fill="#fff"/><path d="M18 -29l8 2l-8 2Z" fill="#f4a261"/><circle cx="15" cy="-30" r="1.2" fill="#222"/></g>`

/** Reeds; (x, y) = base. Bounds: x ±12, y from −44 to 0. */
const reeds = (x: number, y: number) =>
  `<path d="M${x - 8} ${y}v-36M${x} ${y}v-44M${x + 8} ${y}v-34" stroke="#4c8a3c" stroke-width="3"/><rect x="${x - 10}" y="${y - 40}" width="5" height="12" rx="2.5" fill="#6b4f3a"/><rect x="${x + 6}" y="${y - 38}" width="5" height="12" rx="2.5" fill="#6b4f3a"/>`

/** Dragonfly; (x, y) = body center. Bounds: x ±12, y ±6. */
const dragonfly = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cx="-4" cy="-3" rx="8" ry="3" fill="#bde3f2" fill-opacity="0.8"/><ellipse cx="4" cy="-3" rx="8" ry="3" fill="#bde3f2" fill-opacity="0.8"/>` +
  `<rect x="-2" y="-2" width="14" height="3" rx="1.5" fill="#e63946"/><circle cx="-4" cy="-1" r="3" fill="#e63946"/></g>`

/** Pail on the pier; (x, y) = bottom center. Bounds: x ±9, y from −16 to 0. */
const pail = (x: number, y: number, color: string) =>
  `<path d="M${x - 8} ${y - 14}h16l-2 14h-12Z" fill="${color}"/><path d="M${x - 7} ${y - 14}q7 -8 14 0" stroke="${color}" stroke-width="2" fill="none"/>`

export default svgLevel({
  id: 47,
  chapter: 'forest',
  title: 'forestLake',
  parTimeSec: 120,
  scene: ({ diff, anim, rand }) => {
    let ripples = ''
    for (let i = 0; i < 12; i++) ripples += `<path d="M${rand() * 760} ${330 + rand() * 150}h${20 + rand() * 30}" stroke="#a5dcf3" stroke-width="3" stroke-linecap="round"/>`
    const rocking = (period: number) => anim({ id: 'boat', type: 'bob', dx: 0, dy: 5, period }, boat(400, 400))
    const leap = fish(560, 350)
    const swaying = (period: number) => anim({ type: 'sway', angle: 6, pivot: [740, 330], period }, reeds(740, 330))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(680, 70) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(200, 60, 0.8)) +
      // Mountains
      `<path d="M0 260L120 120L240 260Z" fill="#8d99ae"/><path d="M120 120l-30 36h60Z" fill="#fff"/>` +
      `<path d="M180 260L330 90L480 260Z" fill="#7f8c9d"/><path d="M330 90l-36 44h72Z" fill="#fff"/>` +
      `<path d="M440 260L560 140L680 260Z" fill="#8d99ae"/><path d="M560 140l-26 32h52Z" fill="#fff"/>` +
      `<path d="M0 262Q200 230 400 250T800 240V330H0Z" fill="#2f7d55"/>` +
      pine(40, 262, 1.2, '#256b47') +
      pine(110, 255, 0.9, '#256b47') +
      pine(720, 250, 1.1, '#256b47') +
      pine(780, 262, 0.9, '#256b47') +
      diff(300, 260, 18, '', dragonfly(300, 260)) +
      // Lake
      `<rect y="310" width="800" height="190" fill="#4fa9d8"/><rect y="320" width="800" height="180" fill="#63b8e3"/>` +
      anim({ type: 'bob', dx: 10, dy: 0, period: 4 }, ripples) +
      diff(400, 380, 42, rocking(2.4), rocking(1.1), 'boat') +
      diff(560, 350, 20, leap, anim({ type: 'blink', period: 2.2, duty: 0.4 }, leap)) +
      diff(160, 360, 28, swan(160, 376), '') +
      // Pier
      `<rect x="0" y="420" width="220" height="14" fill="#a0703f"/><rect x="40" y="434" width="8" height="40" fill="#8a5a3b"/><rect x="140" y="434" width="8" height="40" fill="#8a5a3b"/>` +
      diff(206, 452, 18, `<rect x="202" y="434" width="8" height="36" fill="#8a5a3b"/>`, '') +
      person(90, 420, '#ffb703') +
      `<path d="M100 380l40 -30" stroke="#6b4f3a" stroke-width="2"/><path d="M140 410v24" stroke="#999" stroke-width="1"/>` +
      diff(170, 412, 18, pail(170, 420, '#e63946'), pail(170, 420, '#3a86ff')) +
      diff(740, 308, 26, swaying(2.4), swaying(1)) +
      diff(660, 470, 24, rock(660, 480, 1.1), rock(660, 480, 1.1, '#6f8f6a')) +
      rock(60, 492, 0.9) +
      floor(rand, 280, 306, 8) +
      backpack(25, 420) +
      lantern(125, 420) +
      trailSign(400, 296) +
      pineCone(600, 302) +
      bluebells(165, 300)
    )
  },
})
