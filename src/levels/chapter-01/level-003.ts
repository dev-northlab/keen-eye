import { butterfly, mushroom, stump } from '../chapter-03/shapes.ts'
import { svgLevel } from '../helpers.ts'
import { cloud, duck, flower, FLOWER_COLORS, grass, ladybug, pick, snail, sun, tree } from '../shapes.ts'

const bird = (x: number, y: number) =>
  `<path d="M${x - 18} ${y}Q${x - 9} ${y - 10} ${x} ${y}Q${x + 9} ${y - 10} ${x + 18} ${y}" stroke="#34495e" stroke-width="3" fill="none" stroke-linecap="round"/>`

/** (x, y) is the base; the head is at y − h. */
const cattail = (x: number, y: number, h: number) =>
  `<path d="M${x} ${y}V${y - h}" stroke="#5a8f3a" stroke-width="4"/>` +
  `<ellipse cx="${x}" cy="${y - h + 12}" rx="6" ry="15" fill="#7b4a2a"/>`

const pad = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="30" ry="10" fill="#3e9b4f"/>` +
  `<path d="M${x} ${y}L${x + 22} ${y - 6}" stroke="#63b8e3" stroke-width="3"/>`

const lily = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#ff8fab">` +
  `<ellipse cy="-8" rx="5" ry="10" transform="rotate(-45)"/><ellipse cy="-8" rx="5" ry="10" transform="rotate(45)"/>` +
  `<ellipse cy="-8" rx="5" ry="10"/><circle cy="-3" r="4" fill="#ffd23f"/></g>`

/** (x, y) is the bottom. Bounds: x ±20, y from −30 to +4. */
const frog = (x: number, y: number, color: string) =>
  `<ellipse cx="${x}" cy="${y - 10}" rx="20" ry="14" fill="${color}"/>` +
  `<circle cx="${x - 10}" cy="${y - 24}" r="6" fill="${color}"/><circle cx="${x + 10}" cy="${y - 24}" r="6" fill="${color}"/>` +
  `<circle cx="${x - 10}" cy="${y - 25}" r="3.5" fill="#fff"/><circle cx="${x + 10}" cy="${y - 25}" r="3.5" fill="#fff"/>` +
  `<circle cx="${x - 10}" cy="${y - 25}" r="1.6" fill="#222"/><circle cx="${x + 10}" cy="${y - 25}" r="1.6" fill="#222"/>` +
  `<path d="M${x - 8} ${y - 12}q8 5 16 0" stroke="#2d5a27" stroke-width="2" fill="none"/>`

export default svgLevel({
  id: 3,
  chapter: 'farm',
  title: 'pond',
  parTimeSec: 80,
  scene: ({ diff, anim, rand }) => {
    let stones = ''
    for (let i = 0; i < 10; i++) {
      const rx = 6 + rand() * 8
      stones += `<ellipse cx="${20 + rand() * 760}" cy="${485 + rand() * 12}" rx="${rx}" ry="${rx * 0.6}" fill="#a0a7ad"/>`
    }
    let tufts = ''
    for (let i = 0; i < 10; i++) tufts += grass(10 + rand() * 780, 290 + rand() * 25)
    let flowers = ''
    for (let i = 0; i < 6; i++) flowers += flower(560 + rand() * 230, 300 + rand() * 20, pick(rand, FLOWER_COLORS))

    return (
      `<rect width="800" height="500" fill="#aee0f0"/>` +
      sun(110, 80) +
      anim({ type: 'path', points: [[0, 0], [-50, 0]], period: 22 }, cloud(560, 80)) +
      anim({ type: 'path', points: [[0, 0], [40, 0]], period: 18 }, cloud(330, 60, 0.7)) +
      anim({ type: 'path', points: [[0, 0], [-120, 10]], period: 14 }, bird(640, 140) + bird(675, 122)) +
      diff(250, 110, 30, '', bird(250, 110)) +
      `<ellipse cx="650" cy="290" rx="250" ry="70" fill="#8fc77a"/>` +
      `<ellipse cx="150" cy="300" rx="220" ry="60" fill="#9bd085"/>` +
      `<rect y="280" width="800" height="220" fill="#93cf6e"/>` +
      tree(720, 300) +
      tufts +
      flowers +
      // Pond
      `<ellipse cx="420" cy="395" rx="310" ry="85" fill="#4fa9d8"/>` +
      `<ellipse cx="420" cy="400" rx="280" ry="68" fill="#63b8e3"/>` +
      `<path d="M300 420h40M460 470h50M650 390h30" stroke="#a5dcf3" stroke-width="3" stroke-linecap="round"/>` +
      pad(250, 400) +
      diff(250, 390, 26, lily(250, 398), '') +
      pad(330, 445) +
      pad(470, 455) +
      pad(620, 445) +
      diff(620, 425, 32, frog(620, 443, '#5fbf4a'), frog(620, 443, '#e0a030')) +
      anim({ type: 'bob', dx: 0, dy: 3, period: 2.5 }, duck(400, 352)) +
      diff(534, 368, 44, duck(530, 375), '') +
      // Reeds
      // The middle cattail is a difference; its zone sways with it on picture A.
      anim({ type: 'sway', angle: 4, pivot: [95, 350], period: 3, phase: 0.2 }, cattail(95, 350, 70)) +
      diff(120, 303, 50, anim({ id: 'reed', type: 'sway', angle: 4, pivot: [120, 350], period: 3 }, cattail(120, 350, 90)), '', 'reed') +
      anim({ type: 'sway', angle: 4, pivot: [145, 350], period: 3, phase: 0.5 }, cattail(145, 350, 75)) +
      anim({ type: 'sway', angle: 4, pivot: [735, 340], period: 3.4 }, cattail(735, 340, 80)) +
      anim({ type: 'sway', angle: 4, pivot: [758, 345], period: 3.4, phase: 0.4 }, cattail(758, 345, 60)) +
      stones +
      ladybug(455, 452) +
      butterfly(605, 302) +
      mushroom(520, 305) +
      snail(207, 302) +
      stump(690, 488)
    )
  },
})
