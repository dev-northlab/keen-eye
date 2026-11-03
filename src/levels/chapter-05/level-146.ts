// Motion differences: the sparkle above the nebula twinkles only on picture B; the pulsar on the right spins faster on B.
import { svgLevel } from '../helpers.ts'
import { asteroid, comet, helmet, planet, probe, rocket, satellite, sparkle, star, starField } from './shapes.ts'

/** Spiral galaxy; (x, y) = core. Bounds: radius 30. */
const galaxy = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse rx="30" ry="12" fill="#b38cff" fill-opacity="0.25"/>` +
  `<path d="M0 0q20 -14 28 2M0 0q-20 14 -28 -2" stroke="#e8d8ff" stroke-width="4" fill="none" stroke-linecap="round"/>` +
  `<path d="M0 0q10 -18 22 -14M0 0q-10 18 -22 14" stroke="#b38cff" stroke-width="3" fill="none" stroke-linecap="round"/><circle r="5" fill="#fff6d6"/></g>`

/** Ringed planet with `stripes` stripes on its ring; (x, y) = center. Bounds: x ±30, y ±16. */
const ringed = (x: number, y: number, stripes: number) => {
  let s = `<ellipse cx="${x}" cy="${y}" rx="30" ry="8" fill="none" stroke="#f2c14e" stroke-width="5"/><circle cx="${x}" cy="${y}" r="16" fill="#e07a5f"/>`
  s += `<path d="M${x - 30} ${y}A30 8 0 0 0 ${x + 30} ${y}" fill="none" stroke="#f2c14e" stroke-width="5"/>`
  for (let i = 1; i <= stripes; i++) s += `<path d="M${x - 30 + i * 6} ${y + 1}A${30 - i * 6} ${8 - i * 1.6} 0 0 0 ${x + 30 - i * 6} ${y + 1}" fill="none" stroke="#a0703f" stroke-width="1.5"/>`
  return s
}

/** Little ship, faces right; (x, y) = center. Bounds: x ±22, y ±10. */
const ship = (x: number, y: number) =>
  `<path d="M${x - 18} ${y - 6}h24l14 6l-14 6h-24Z" fill="#d0d4de"/><path d="M${x - 18} ${y - 6}l-4 -4h8ZM${x - 18} ${y + 6}l-4 4h8Z" fill="#e63946"/>` +
  `<circle cx="${x + 6}" cy="${y}" r="3" fill="#3a86ff"/><path d="M${x - 22} ${y}h-8" stroke="#ff9f1c" stroke-width="4" stroke-linecap="round"/>`

/** Pulsar with two beams; (x, y) = center. Bounds: radius 28. */
const pulsar = (x: number, y: number) =>
  `<path d="M${x} ${y}L${x - 6} ${y - 28}h12ZM${x} ${y}L${x - 6} ${y + 28}h12Z" fill="#7ad0ff" fill-opacity="0.55"/><circle cx="${x}" cy="${y}" r="6" fill="#e3f6fd"/>`

export default svgLevel({
  id: 146,
  chapter: 'space',
  title: 'starNebula',
  parTimeSec: 120,
  scene: ({ diff, anim, rand }) => {
    const constellation: [number, number][] = [[60, 80], [100, 60], [140, 74], [180, 62], [204, 110], [160, 130], [120, 118]]
    let lines = `<path d="M${constellation.map(([x, y]) => `${x} ${y}`).join('L')}Z" stroke="#bde3f2" stroke-opacity="0.45" stroke-width="1.2" fill="none"/>`
    for (const [x, y] of constellation) if (x !== 180) lines += star(x, y, 6, '#fff6c4')
    const spin = (period: number) => anim({ type: 'rotate', pivot: [760, 250], period }, pulsar(760, 250))

    return (
      `<rect width="800" height="500" fill="#0d0a24"/>` +
      // Nebula clouds
      `<ellipse cx="380" cy="260" rx="260" ry="120" fill="#b38cff" fill-opacity="0.16"/><ellipse cx="300" cy="300" rx="160" ry="80" fill="#ff6bd6" fill-opacity="0.14"/>` +
      `<ellipse cx="480" cy="220" rx="180" ry="70" fill="#4df0ff" fill-opacity="0.1"/><ellipse cx="420" cy="320" rx="120" ry="50" fill="#ffb703" fill-opacity="0.08"/>` +
      `<ellipse cx="180" cy="420" rx="140" ry="60" fill="#3a86ff" fill-opacity="0.12"/><ellipse cx="660" cy="380" rx="150" ry="70" fill="#ff6b8b" fill-opacity="0.1"/>` +
      starField(rand, 0, 500, 120) +
      anim({ type: 'path', points: [[0, 0], [-260, 90]], period: 16 }, comet(560, 40)) +
      // Constellation
      lines + diff(180, 62, 22, star(180, 62, 6, '#fff6c4'), '') +
      // Bright stars and sparkles
      diff(400, 250, 22, star(400, 250, 11, '#ffd23f'), star(400, 250, 11, '#ffb43a')) +
      diff(300, 190, 22, star(300, 190, 9, '#fff6c4'), star(300, 190, 12, '#fff6c4')) +
      star(560, 300, 8, '#bde3f2') + star(220, 250, 7, '#ffd1dc') + sparkle(360, 120, 8) + sparkle(640, 230, 7, '#ffe8a3') +
      diff(120, 300, 22, '', sparkle(120, 300, 10, '#bde3f2')) +
      diff(460, 150, 22, sparkle(460, 150, 9), anim({ type: 'blink', duty: 0.5, period: 1 }, sparkle(460, 150, 9))) +
      // Galaxy, planets, ship and the pulsar
      diff(620, 110, 32, galaxy(620, 110), `<g transform="rotate(50 620 110)">${galaxy(620, 110)}</g>`) +
      diff(520, 362, 32, ringed(520, 362, 1), ringed(520, 362, 2)) +
      planet(80, 440, 30, '#3a86ff') +
      diff(240, 404, 22, planet(240, 404, 16, '#8ac926'), planet(240, 404, 16, '#a8c93a')) +
      planet(740, 60, 12, '#c98bb9') +
      diff(675, 424, 32, ship(676, 424), ship(684, 421)) +
      diff(760, 250, 30, spin(5), spin(1.6)) +
      sparkle(40, 220, 5) + sparkle(560, 470, 6) + sparkle(330, 460, 5, '#ffd1dc') +
      probe(400, 420) +
      asteroid(600, 200, 0.5) +
      rocket(150, 345, '#f1f1f1', '#8ac926', 0.35) +
      satellite(700, 330) +
      helmet(320, 460)
    )
  },
})
