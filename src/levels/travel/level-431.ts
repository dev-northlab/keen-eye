// Moscow: Red Square with the Kremlin wall and the Spasskaya Tower, St. Basil's Cathedral with its
// bright onion domes, a matryoshka stall, a balloon seller, pigeons and a street lamp.
// Motion difference: the balloons sway quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { level431Redesign } from './level-431-redesign.ts'
import { cloud, lampHead, lampPost, person, pigeon, sky } from './shapes.ts'

const BRICK = '#b8442f'

/** Kremlin wall from x = 0 to 800, top at y, with swallowtail merlons every 26 except at `skip`. */
function wall(y: number, skip: number) {
  let merlons = ''
  for (let x = 4; x < 800; x += 26) if (x !== skip) merlons += merlon(x, y)
  return `<rect y="${y}" width="800" height="${340 - y}" fill="${BRICK}"/>${merlons}<path d="M0 ${y + 30}H800" stroke="#9a3524" stroke-width="2"/>`
}
/** Swallowtail merlon; (x, y) = bottom left on the wall top. Bounds: 16 × 20 above y. */
const merlon = (x: number, y: number) => `<path d="M${x} ${y}V${y - 20}L${x + 8} ${y - 12}L${x + 16} ${y - 20}V${y}Z" fill="${BRICK}"/>`

/** Spasskaya Tower; (x, y) = foot. The hands and the star are separate. Bounds: x ±44, y from −300 to 0. */
const spasskaya = (x: number, y: number) =>
  `<rect x="${x - 44}" y="${y - 200}" width="88" height="200" fill="${BRICK}"/><path d="M${x - 16} ${y}V${y - 40}a16 16 0 0 1 32 0V${y}Z" fill="#4a2a20"/>` +
  `<circle cx="${x}" cy="${y - 150}" r="24" fill="#1d1d1d" stroke="#c9a227" stroke-width="3"/>` +
  `<rect x="${x - 30}" y="${y - 236}" width="60" height="38" fill="${BRICK}"/><rect x="${x - 32}" y="${y - 202}" width="64" height="6" fill="#f4f1ea"/>` +
  `<rect x="${x - 20}" y="${y - 262}" width="40" height="28" fill="#f4f1ea"/><path d="M${x - 22} ${y - 262}L${x} ${y - 320}L${x + 22} ${y - 262}Z" fill="#3f7d5a"/>`
/** Golden hands on the black clock face of the tower at (x, y) showing h:m. Bounds: circle of radius 20 around (x, y − 150). */
function hands(x: number, y: number, h: number, m: number) {
  const hand = (deg: number, len: number, width: number) => {
    const a = ((deg - 90) * Math.PI) / 180
    return `<path d="M${x} ${y - 150}l${(Math.cos(a) * len).toFixed(1)} ${(Math.sin(a) * len).toFixed(1)}" stroke="#ffd23f" stroke-width="${width}" stroke-linecap="round"/>`
  }
  return hand(h * 30 + m / 2, 11, 3) + hand(m * 6, 18, 2)
}
/** Star on the spire top of the tower at (x, y). Bounds: circle of radius 12 around (x, y − 330). */
function star(x: number, y: number, color: string) {
  const points = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    const r = i % 2 ? 4.4 : 11
    return `${(x + Math.cos(a) * r).toFixed(1)},${(y - 330 + Math.sin(a) * r).toFixed(1)}`
  })
  return `<polygon points="${points.join(' ')}" fill="${color}" stroke="#c9a227" stroke-width="1.4"/>`
}

/** Onion dome on a drum; (x, y) = foot of the drum, dome width w. Its stripes are separate (`stripes`). */
function onion(x: number, y: number, w: number, base: string) {
  const h = w * 1.1
  const top = y - 30 - h
  return (
    `<rect x="${x - w * 0.35}" y="${y - 32}" width="${w * 0.7}" height="32" fill="#e8c27a"/><rect x="${x - w * 0.35}" y="${y - 22}" width="${w * 0.7}" height="5" fill="#b8442f"/>` +
    `<path d="M${x - w / 2} ${y - 30}Q${x - w * 0.62} ${y - 30 - h * 0.6} ${x} ${top}Q${x + w * 0.62} ${y - 30 - h * 0.6} ${x + w / 2} ${y - 30}Z" fill="${base}"/>` +
    `<path d="M${x} ${top}v-10" stroke="#c9a227" stroke-width="2"/>`
  )
}
/** Stripes over an `onion` dome at (x, y), width w. Bounds: x ±0.42·w, y from −30 − 1.1·w to −30. */
function stripes(x: number, y: number, w: number, color: string) {
  const h = w * 1.1
  const top = y - 30 - h
  return [-0.25, 0, 0.25].map((k) => `<path d="M${x + w * k - 3} ${y - 30}Q${x + w * k * 1.6} ${y - 30 - h * 0.5} ${x} ${top}Q${x + w * k * 1.6 + 6} ${y - 30 - h * 0.5} ${x + w * k + 3} ${y - 30}Z" fill="${color}"/>`).join('')
}
const dome = (x: number, y: number, w: number, base: string, color: string) => onion(x, y, w, base) + stripes(x, y, w, color)

/** St. Basil's Cathedral: the base and the central tent; domes are drawn by `onion`. */
const cathedral = () =>
  `<rect x="440" y="250" width="270" height="90" fill="${BRICK}"/>` +
  [470, 530, 590, 650].map((x) => `<path d="M${x - 12} 340V300a12 12 0 0 1 24 0V340Z" fill="#4a2a20"/>`).join('') +
  `<rect x="555" y="150" width="40" height="100" fill="#e8c27a"/><path d="M552 150L575 66L598 150Z" fill="#3f9b6b"/><path d="M563 120L575 80L587 120" fill="none" stroke="#ffd23f" stroke-width="3"/>` +
  `<path d="M575 66v-12" stroke="#c9a227" stroke-width="2"/>`

/** Matryoshka; (x, y) = bottom middle. Bounds: x ±11, y from −34 to 0. */
const matryoshka = (x: number, y: number, color: string) =>
  `<path d="M${x - 11} ${y}Q${x - 13} ${y - 18} ${x - 7} ${y - 22}Q${x - 9} ${y - 34} ${x} ${y - 34}Q${x + 9} ${y - 34} ${x + 7} ${y - 22}Q${x + 13} ${y - 18} ${x + 11} ${y}Z" fill="${color}"/>` +
  `<circle cx="${x}" cy="${y - 26}" r="5" fill="#f4dcc0"/><circle cx="${x}" cy="${y - 10}" r="4" fill="#ffd23f"/>`

/** Balloons on strings held at (x, y). Bounds: x from −26 to +26, y from −96 to 0. */
const balloons = (x: number, y: number) =>
  [[-16, -82, '#e63946'], [0, -88, '#3a86ff'], [16, -80, '#ffd23f']]
    .map(([dx, dy, c]) => `<path d="M${x} ${y}L${x + Number(dx)} ${y + Number(dy) + 12}" stroke="#3d4a55" stroke-width="1"/><ellipse cx="${x + Number(dx)}" cy="${y + Number(dy)}" rx="10" ry="12" fill="${c}"/>`)
    .join('')

/** Cap on a `person` standing at (x, y). Bounds: x from −10 to +16, y from −66 to −56. */
const cap = (x: number, y: number, color: string) => `<path d="M${x - 9} ${y - 58}Q${x - 8} ${y - 66} ${x} ${y - 66}Q${x + 8} ${y - 66} ${x + 9} ${y - 58}H${x + 16}V${y - 56}H${x - 10}Z" fill="${color}"/>`

export default travelLevel({
  id: 431,
  redesign: level431Redesign,
  title: 'moscow',
  parTimeSec: 136,
  place: { region: 'europe', country: 'ru', lat: 55.75, lon: 37.62 },
  scene: ({ diff, anim, rand, extra }) => {
    const sway = (period: number) => anim({ id: 'balloons', type: 'sway', angle: 6, pivot: [720, 432], period }, balloons(720, 432))
    let cobbles = ''
    for (let i = 0; i < 46; i++) cobbles += `<rect x="${(rand() * 790).toFixed(0)}" y="${(350 + rand() * 140).toFixed(0)}" width="14" height="7" rx="2" fill="#8d8a86"/>`
    return (
      sky('#a6d3ee') +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 46 }, cloud(320, 70, 0.55)) +
      // The Kremlin wall and the Spasskaya Tower
      wall(260, 290) +
      diff(298, 250, 18, merlon(290, 260), '') +
      spasskaya(150, 360) +
      diff(150, 210, 22, hands(150, 360, 10, 10), hands(150, 360, 2, 40)) +
      diff(150, 30, 18, star(150, 360, '#c9302c'), star(150, 360, '#ffd23f')) +
      // St. Basil's Cathedral
      cathedral() +
      dome(470, 250, 44, '#3f9b6b', '#ffd23f') +
      dome(680, 250, 44, '#2b59c3', '#ffffff') +
      dome(520, 214, 52, '#e63946', '#3f9b6b') +
      onion(630, 214, 52, '#ffd23f') +
      diff(630, 156, 38, stripes(630, 214, 52, '#3f9b6b'), stripes(630, 214, 52, '#2b59c3')) +
      diff(575, 234, 38, dome(575, 270, 30, '#3f9b6b', '#ffffff'), '') +
      // Red Square
      `<rect y="340" width="800" height="160" fill="#a7a29b"/>${cobbles}` +
      lampPost(56, 480) +
      diff(56, 380, 20, lampHead(56, 480, '#ffd166'), lampHead(56, 480, '#8d99ae')) +
      `<rect x="250" y="440" width="140" height="40" fill="#8a5a33"/><path d="M250 440L270 400H370L390 440" fill="#f4ead2"/>` +
      matryoshka(280, 440, '#c9302c') +
      matryoshka(342, 440, '#c9302c') +
      matryoshka(366, 440, '#3f9b6b') +
      diff(306, 423, 22, matryoshka(306, 440, '#2b59c3'), matryoshka(306, 440, '#c9302c')) +
      person(470, 490, '#5b7fd6') +
      diff(473, 429, 20, cap(470, 490, '#e63946'), cap(470, 490, '#1d1d1d')) +
      pigeon(560, 488) +
      diff(612, 481, 18, pigeon(612, 488, true), '') +
      person(706, 490, '#ffb703') +
      diff(720, 382, 66, sway(1.2), sway(2.6), 'balloons') +
      // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
      decor({ anim }, [
        ['bin', 240, 380, '#2a9d8f'],
        ['coffeeCup', 608, 420],
        ['shoppingBag', 416, 468, '#ff6b8b'],
        ['pigeon', 100, 440],
        ['cloud', 280, 136],
        ['birds', 520, 64],
        ['cloud', 712, 84],
      ]) +
      extras({ extra, anim }, [
        ['ball', 504, 364, '#ffd23f'],
        ['bollard', 228, 492],
        ['skateboard', 524, 480, '#e63946'],
        ['birds', 88, 92],
        ['balloon', 420, 152, '#ffd23f'],
      ])
    )
  },
})
