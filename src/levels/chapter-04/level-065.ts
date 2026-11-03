// Motion differences: the flag waves faster on picture B; the lantern swings only on B; the shark fin cruises the other way round on B.
import { svgLevel } from '../helpers.ts'
import { anchor, bottleMessage, bucket, cloud, coconut, fish, gull, gullStanding, person, sun, waves } from './shapes.ts'

/** Pirate flag to the right of the pole top at (x, y). Bounds: x from 0 to +34, y from −2 to +24. */
const flag = (x: number, y: number) =>
  `<path d="M${x + 2} ${y}h32l-5 11l5 11h-32Z" fill="#2b2b2b"/><circle cx="${x + 16}" cy="${y + 9}" r="4" fill="#fff"/><path d="M${x + 10} ${y + 16}l12 4M${x + 22} ${y + 16}l-12 4" stroke="#fff" stroke-width="2"/>`

/** Parrot on the yard, faces left; (x, y) = feet. Bounds: x ±10, y from −22 to 0. */
const parrot = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-9" rx="7" ry="9" fill="${color}"/><circle cx="-3" cy="-18" r="5" fill="${color}"/><path d="M-7 -18l-5 2l5 2Z" fill="#ffd166"/>` +
  `<path d="M6 -8l4 8" stroke="${color}" stroke-width="3"/><circle cx="-4" cy="-19" r="1.2" fill="#222"/></g>`

/** Cannonball pile of `n`; (x, y) = bottom center. Bounds: x ±14, y from −20 to 0. */
const balls = (x: number, y: number, n: number) =>
  [[-7, -6], [7, -6], [0, -16]].slice(0, n).map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="6" fill="#2b2b2b"/>`).join('')

/** Porthole; (x, y) = center. Bounds: radius 9. */
const porthole = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="8" fill="#bde3f2" stroke="#ffd166" stroke-width="3"/>`

/** Bandana on the pirate at (x, y) = feet. Bounds: x ±10, y from −64 to −54. */
const bandana = (x: number, y: number, color: string) => `<path d="M${x - 9} ${y - 56}q9 -12 18 0Z" fill="${color}"/><path d="M${x + 8} ${y - 58}l8 4l-6 4" fill="${color}"/>`

/** Sail patch; (x, y) = center. Bounds: x ±9, y ±9. */
const patch = (x: number, y: number) => `<rect x="${x - 8}" y="${y - 8}" width="16" height="16" fill="#c9a06c"/><path d="M${x - 8} ${y - 8}h16v16h-16Z" fill="none" stroke="#8a5a3b" stroke-width="2" stroke-dasharray="3 3"/>`

/** Shark fin, faces right; (x, y) = waterline center. Bounds: x ±12, y from −18 to +2. */
const fin = (x: number, y: number) => `<path d="M${x - 12} ${y}q8 -16 20 -18q-4 10 4 18Z" fill="#5c677d"/>`

/** Lantern hanging from (x, y). Bounds: x ±8, y from 0 to +28. */
const lantern = (x: number, y: number) =>
  `<path d="M${x} ${y}v6" stroke="#333" stroke-width="2"/><rect x="${x - 7}" y="${y + 6}" width="14" height="18" rx="3" fill="#ffd166" stroke="#333" stroke-width="2"/><rect x="${x - 4}" y="${y + 24}" width="8" height="4" fill="#333"/>`

/** Treasure chest, open or closed; (x, y) = bottom center. Bounds: x ±20, y from −34 to 0. */
const chest = (x: number, y: number, open: boolean) =>
  `<g transform="translate(${x} ${y})"><rect x="-20" y="-20" width="40" height="20" fill="#8a5a3b"/><path d="M-20 -12h40" stroke="#ffd166" stroke-width="2"/>` +
  (open
    ? `<path d="M-20 -22q0 -14 20 -14q20 0 20 14l-4 -12q-16 -8 -32 0Z" fill="#a0703f"/><circle cx="-8" cy="-24" r="4" fill="#ffd166"/><circle cx="4" cy="-26" r="4" fill="#ffd166"/><circle cx="12" cy="-22" r="4" fill="#ffd166"/>`
    : `<path d="M-20 -20q0 -14 20 -14q20 0 20 14Z" fill="#a0703f"/><path d="M-20 -26h40" stroke="#ffd166" stroke-width="2"/>`) +
  `</g>`

export default svgLevel({
  id: 65,
  chapter: 'sea',
  title: 'pirateShip',
  parTimeSec: 130,
  scene: ({ diff, anim }) => {
    const waving = (period: number) => anim({ type: 'sway', angle: 8, pivot: [402, 40], period }, flag(402, 42))
    const hanging = lantern(560, 250)
    const cruising = (reverse: boolean) => anim({ id: 'fin', type: 'path', points: [[0, 0], [100, 0]], flipX: 100, period: 8, reverse }, fin(100, 440))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(700, 70) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(120, 70, 0.8)) +
      gull(640, 160) +
      // Ship
      `<rect x="398" y="40" width="4" height="320" fill="#5a3d2b"/>` +
      diff(420, 52, 26, waving(2.2), waving(1)) +
      `<path d="M300 110h200l-20 100h-160Z" fill="#f4f1de"/><path d="M310 230h180l-16 80h-148Z" fill="#f4f1de"/>` +
      `<rect x="290" y="104" width="220" height="6" fill="#5a3d2b"/><rect x="300" y="224" width="200" height="6" fill="#5a3d2b"/>` +
      diff(340, 160, 18, patch(340, 160), '') +
      patch(450, 270) +
      diff(300, 93, 20, parrot(300, 104, '#8ac926'), parrot(300, 104, '#e63946')) +
      `<path d="M560 250h-60v10" stroke="#3d4a55" stroke-width="3" fill="none"/>` +
      diff(560, 264, 20, hanging, anim({ type: 'sway', angle: 14, pivot: [560, 250], period: 1.5 }, hanging)) +
      // Hull
      `<path d="M180 360q0 -30 30 -30h380q40 0 60 -40q20 60 -40 110H230q-50 0 -50 -40Z" fill="#8a5a3b"/>` +
      `<path d="M210 340h420" stroke="#5a3d2b" stroke-width="5"/><path d="M200 372h440" stroke="#ffd166" stroke-width="4"/>` +
      porthole(280, 390) +
      diff(340, 390, 18, porthole(340, 390), '') +
      porthole(400, 390) +
      porthole(460, 390) +
      `<rect x="520" y="378" width="30" height="20" rx="3" fill="#2b2b2b"/><circle cx="520" cy="388" r="9" fill="#2b2b2b"/>` +
      // Deck
      person(240, 330, '#e63946') +
      diff(240, 272, 18, bandana(240, 330, '#e63946'), bandana(240, 330, '#3a86ff')) +
      person(470, 330, '#2b2b2b', true) +
      bandana(470, 330, '#2b2b2b') +
      diff(320, 310, 20, balls(320, 330, 3), balls(320, 330, 2)) +
      diff(560, 314, 24, chest(560, 330, true), chest(560, 330, false)) +
      diff(640, 300, 20, anchor(640, 300, '#ffd166'), '') +
      // Sea
      `<rect y="400" width="800" height="100" fill="#3ba7cc"/>` +
      anim({ type: 'bob', dx: 10, dy: 0, period: 4 }, waves(410, 10, 100, '#5cc0de')) +
      diff(100, 432, 22, cruising(false), cruising(true), 'fin') +
      anim({ type: 'bob', dx: 8, dy: 0, period: 3 }, waves(460, 10, 100, '#8fd8ec')) +
      bucket(275, 331) +
      coconut(375, 331) +
      bottleMessage(510, 331) +
      gullStanding(470, 104) +
      fish(600, 445, '#ffb703')
    )
  },
})
