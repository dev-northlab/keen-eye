// Lunar race: a moon buggy race under the Earth among the space world's ten hardest (hidden until released,
// levels/upcoming.ts). New in space: racing moon buggies with antenna pennants, a grandstand of spectators with its
// banner, a standings board, a camera drone, a race marshal with a chequered flag, a finish line, track cones and
// a pit crew with fuel. Motion differences: the drone hovers and a buggy's wheel turns only on picture A; the
// chequered flag flies only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { astronaut, crater, fuelCanister, planet, probe, starField } from './shapes.ts'

/** Moon buggy facing right, its driver's visor separate; (x, y) = ground center. Bounds: x ±36, y from −56 to 0. */
const buggy = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-30 -22V-56" stroke="#8d99ae" stroke-width="1.5"/><path d="M-30 -56h14l-4 4l4 4h-14Z" fill="#f1f1f1"/>` +
  `<path d="M-20 -22Q-14 -46 8 -46Q24 -44 26 -22" stroke="#5c677d" stroke-width="3" fill="none"/><circle cx="4" cy="-38" r="9" fill="#f1f1f1"/>` +
  `<rect x="-36" y="-22" width="72" height="10" rx="3" fill="${color}"/><path d="M28 -22l10 4v6h-10Z" fill="${color}"/>` +
  `<circle cx="-24" cy="-9" r="9" fill="#3d4a55"/><circle cx="24" cy="-9" r="9" fill="#3d4a55"/><circle cx="24" cy="-9" r="3" fill="#bfc7d5"/></g>`

/** Track cone; (x, y) = bottom center. Bounds: x ±9, y from −22 to 0. */
const cone = (x: number, y: number) =>
  `<path d="M${x - 9} ${y}L${x - 3} ${y - 22}H${x + 3}L${x + 9} ${y}Z" fill="#ff7b00"/><path d="M${x - 6} ${y - 9}H${x + 6}" stroke="#ffffff" stroke-width="4"/>`

export default svgLevel({
  id: 193,
  chapter: 'space',
  title: 'lunarRace',
  parTimeSec: 102,
  scene: ({ diff, anim, rand, extra }) => {
    const drone = probe(470, 140, '#ff006e')
    const spokes = `<path d="M349 427H363M356 420V434M351 422L361 432M361 422L351 432" stroke="#bfc7d5" stroke-width="2"/>`
    const chequer = `<rect x="674" y="330" width="24" height="16" fill="#ffffff"/><path d="M674 330h6v4h-6ZM686 330h6v4h-6ZM680 334h6v4h-6ZM692 334h6v4h-6ZM674 338h6v4h-6ZM686 338h6v4h-6ZM680 342h6v4h-6ZM692 342h6v4h-6Z" fill="#2b2b2b"/>`
    let crowd = ''
    for (const [hx, hy] of [[60, 252], [90, 252], [150, 252], [180, 252], [210, 252], [75, 278], [105, 278], [135, 278], [165, 278], [195, 278], [225, 278]])
      crowd += `<circle cx="${hx}" cy="${hy}" r="9" fill="#f1f1f1"/><ellipse cx="${hx + 3}" cy="${hy}" rx="5" ry="4" fill="#ffb703"/>`
    let finish = ''
    for (let y = 404; y < 466; y += 8) finish += `<rect x="${600 + ((y - 404) / 8 % 2) * 6}" y="${y}" width="6" height="8" fill="#2b2b2b"/>`
    return (
      `<rect width="800" height="500" fill="#0d0b1f"/>` + starField(rand, 0, 300, 50) +
      // The Earth and its changing continent
      planet(660, 100, 50, '#3a86ff') + `<path d="M630 80q10 -14 22 -6q6 12 -6 20q-14 2 -16 -14ZM640 126q14 -6 22 4q-8 10 -22 -4Z" fill="#4caf6a"/>` +
      diff(680, 92, 22, `<path d="M672 84q10 -8 18 2q2 12 -10 14q-10 -4 -8 -16Z" fill="#4caf6a"/>`, '') +
      diff(470, 140, 22, anim({ type: 'bob', dx: 3, dy: 4, period: 2.4 }, drone), drone) +
      // The moon and its race track
      `<path d="M0 320Q200 296 400 316T800 310V500H0Z" fill="#c9c6d6"/>` + crater(470, 340, 26, '#aaa6bd') + crater(90, 360, 20, '#aaa6bd') +
      `<path d="M0 404Q300 384 600 410T800 402V454Q500 478 0 464Z" fill="#a8a4b8"/><path d="M0 434Q300 418 600 438T800 430" stroke="#f1f1f1" stroke-width="2" stroke-dasharray="14 12" fill="none"/>` +
      `<rect x="600" y="404" width="12" height="62" fill="#ffffff"/>` + finish +
      // Grandstand: a spectator's visor, the banner
      `<rect x="30" y="232" width="220" height="88" rx="6" fill="#5c677d"/><path d="M30 266H250M30 292H250" stroke="#8d99ae" stroke-width="3"/>` + crowd +
      `<circle cx="120" cy="252" r="9" fill="#f1f1f1"/>` +
      diff(123, 252, 22, `<ellipse cx="123" cy="252" rx="5" ry="4" fill="#ffb703"/>`, `<ellipse cx="123" cy="252" rx="5" ry="4" fill="#ff006e"/>`) +
      diff(200, 305, 22, `<rect x="180" y="298" width="40" height="14" rx="2" fill="#e63946"/>`, `<rect x="180" y="298" width="40" height="14" rx="2" fill="#8ac926"/>`) +
      // The standings board
      `<rect x="376" y="236" width="8" height="70" fill="#8d99ae"/><rect x="340" y="170" width="80" height="66" rx="4" fill="#2b2d42" stroke="#8d99ae" stroke-width="3"/>` +
      `<rect x="352" y="188" width="12" height="40" fill="#ffd23f"/><rect x="370" y="200" width="12" height="28" fill="#bfc7d5"/>` +
      diff(394, 220, 22, `<rect x="388" y="212" width="12" height="16" fill="#c97b3a"/>`, '') +
      // The marshal's chequered flag
      astronaut(660, 396, '#f1f1f1', '#3ae0ff', true) + `<path d="M674 372V330" stroke="#8d99ae" stroke-width="2"/>` +
      diff(686, 340, 24, chequer, anim({ type: 'sway', angle: 15, pivot: [674, 338], period: 1 }, chequer)) +
      // The buggies: a pennant, a turning wheel, a driver's visor
      buggy(200, 446, '#e63946') +
      diff(178, 394, 22, `<path d="M171 390h14l-4 4l4 4h-14Z" fill="#ffd23f"/>`, `<path d="M171 390h14l-4 4l4 4h-14Z" fill="#3a86ff"/>`) +
      `<ellipse cx="205" cy="408" rx="5" ry="4" fill="#3ae0ff"/>` +
      buggy(380, 436, '#3a86ff') + `<ellipse cx="385" cy="398" rx="5" ry="4" fill="#ffb703"/>` +
      diff(356, 427, 22, anim({ type: 'rotate', pivot: [356, 427], period: 0.6 }, spokes), spokes) +
      buggy(520, 456, '#8ac926') +
      diff(526, 418, 22, `<ellipse cx="525" cy="418" rx="5" ry="4" fill="#ff006e"/>`, `<ellipse cx="525" cy="418" rx="5" ry="4" fill="#ffd23f"/>`) +
      // A track cone, the pit crew's fuel
      cone(250, 476) + diff(290, 462, 22, cone(290, 474), '') +
      astronaut(730, 478, '#ffd23f', '#3ae0ff') + diff(764, 466, 22, fuelCanister(764, 477), '') +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['spaceStar', 300, 60],
        ['sparkle', 560, 200],
        ['crater', 440, 482],
        ['moonPebbles', 50, 480],
        ['beacon', 470, 330],
      ])
    )
  },
})
