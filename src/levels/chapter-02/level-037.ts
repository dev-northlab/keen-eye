// Motion differences: the dog runs faster on picture B; the pharmacy sign swings only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bollard, building, cityTree, cloud, dog, door, mailbox, newspaperBox, person, sandwichBoard, shoppingBag, skyline, street, sun } from './shapes.ts'
import { level037Redesign } from './level-037-redesign.ts'

/** Tram, faces right; (x, y) = rail level under the middle. The board and the door are separate. Bounds: x ±76, y from −90 to 0. */
const tram = (x: number, y: number, color: string) => {
  let windows = ''
  for (let i = 0; i < 4; i++) windows += `<rect x="${-66 + i * 24}" y="-58" width="18" height="20" rx="2" fill="#bde3f2"/>`
  return (
    `<g transform="translate(${x} ${y})"><path d="M-20 -74l30 -16M10 -90h20" stroke="#3d4a55" stroke-width="3" fill="none"/>` +
    `<rect x="-76" y="-70" width="152" height="60" rx="8" fill="${color}"/>${windows}<rect x="48" y="-58" width="20" height="20" rx="2" fill="#bde3f2"/>` +
    `<rect x="-76" y="-30" width="152" height="6" fill="#fff" fill-opacity="0.6"/><rect x="-60" y="-10" width="120" height="6" fill="#3d4a55"/>` +
    `<circle cx="-40" cy="-4" r="7" fill="#2b2b2b"/><circle cx="40" cy="-4" r="7" fill="#2b2b2b"/></g>`
  )
}
/** Destination board on the tram at (x, y). Bounds: x ±16, y from −68 to −60. */
const board = (x: number, y: number, color: string) => `<rect x="${x - 16}" y="${y - 68}" width="32" height="8" rx="2" fill="${color}"/>`
/** Tram door at (x, y), open or closed. Bounds: x from 22 to 46, y from −58 to −14. */
const tramDoor = (x: number, y: number, open: boolean) =>
  open
    ? `<rect x="${x + 22}" y="${y - 58}" width="24" height="44" fill="#2b2b2b"/>`
    : `<rect x="${x + 22}" y="${y - 58}" width="24" height="44" fill="#f4f1de"/><rect x="${x + 26}" y="${y - 54}" width="16" height="18" fill="#bde3f2"/><path d="M${x + 34} ${y - 58}v44" stroke="#3d4a55" stroke-width="2"/>`

/** Pharmacy sign hanging from the bracket (x, y). Bounds: x ±14, y from 0 to +34. */
const sign = (x: number, y: number) =>
  `<path d="M${x} ${y}v8" stroke="#3d4a55" stroke-width="2"/><rect x="${x - 14}" y="${y + 8}" width="28" height="26" rx="4" fill="#8ac926"/>` +
  `<path d="M${x} ${y + 14}v14M${x - 7} ${y + 21}h14" stroke="#fff" stroke-width="4"/>`

/** Tram stop sign; (x, y) = foot. Bounds: x ±14, y from −70 to 0. */
const stopSign = (x: number, y: number, color: string) =>
  `<rect x="${x - 2}" y="${y - 50}" width="4" height="50" fill="#3d4a55"/><circle cx="${x}" cy="${y - 58}" r="12" fill="${color}"/><rect x="${x - 6}" y="${y - 60}" width="12" height="4" fill="#fff"/>`

/** Cat in a window at (x, y) = window center. Bounds: x ±10, y from −2 to +14. */
const cat = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y + 10}" rx="9" ry="5" fill="#2b2b3a"/><circle cx="${x + 2}" cy="${y + 3}" r="5" fill="#2b2b3a"/><path d="M${x - 2} ${y}l1 -4l3 2ZM${x + 6} ${y}l-1 -4l-3 2Z" fill="#2b2b3a"/>`

export default svgLevel({
  id: 37,
  chapter: 'city',
  title: 'tramLine',
  parTimeSec: 110,
  redesign: level037Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    const running = (period: number) =>
      anim({ id: 'dog', type: 'path', points: [[0, 0], [150, 0]], flipX: 560, period }, dog(560, 340, '#c48a5a'))
    const pharmacy = sign(150, 240)

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(700, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(250, 60, 0.8)) +
      skyline(rand, 200) +
      building(0, 340, 220, 230, '#ffd6a5') +
      building(220, 340, 180, 200, '#bdb2ff') +
      building(400, 340, 200, 250, '#f2cc8f') +
      building(600, 340, 200, 190, '#81b29a') +
      diff(276, 254, 18, '', cat(276, 250)) +
      door(110, 340, '#2a9d8f') +
      `<path d="M110 240h40" stroke="#3d4a55" stroke-width="3"/>` +
      diff(150, 258, 22, pharmacy, anim({ type: 'sway', angle: 12, pivot: [150, 240], period: 1.5 }, pharmacy)) +
      door(500, 340, '#6b4f3a') +
      door(700, 340, '#264653') +
      `<path d="M0 230H800" stroke="#3d4a55" stroke-width="2"/>` +
      street(360, 140) +
      `<path d="M0 452H800M0 470H800" stroke="#8d99ae" stroke-width="3"/>` +
      cityTree(40, 340, 1.1) +
      diff(380, 282, 18, stopSign(380, 340, '#ffb703'), stopSign(380, 340, '#3a86ff')) +
      person(420, 340, '#e63946') +
      diff(460, 309, 34, person(460, 340, '#3a86ff', true), '') +
      person(230, 340, '#8338ec', true) +
      diff(560, 327, 26, running(9), running(4.5), 'dog') +
      tram(300, 470, '#e63946') +
      diff(300, 406, 18, board(300, 470, '#ffd166'), board(300, 470, '#8ac926')) +
      diff(334, 434, 26, tramDoor(300, 470, false), tramDoor(300, 470, true)) +
      mailbox(180, 352) +
      newspaperBox(300, 352) +
      bollard(397, 352) +
      shoppingBag(522, 354) +
      sandwichBoard(765, 352) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['birds', 177, 61],
        ['balloon', 610, 34, '#8ac926'],
        ['cone', 484, 412],
        ['pigeon', 189, 401],
        ['pigeon', 655, 414],
        ['cone', 54, 409],
      ])
    )
  },
})
