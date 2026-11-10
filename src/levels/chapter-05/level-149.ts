// Motion differences: the marker buoy's beacon blinks only on picture B; the sparkle in the lower left twinkles only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level149Redesign } from './level-149-redesign.ts'
import { asteroid, helmet, planet, rocket, satellite, sparkle, starField, wrench } from './shapes.ts'

/** Moon with `stripes` dark stripes; (x, y) = center. Bounds: radius 22. */
const stripedMoon = (x: number, y: number, stripes: number) => {
  let s = `<circle cx="${x}" cy="${y}" r="22" fill="#d9c8a0"/>`
  for (let i = 1; i <= stripes; i++) {
    const dy = -22 + (44 * i) / (stripes + 1)
    const half = Math.sqrt(22 * 22 - dy * dy)
    s += `<path d="M${(x - half).toFixed(1)} ${y + dy}h${(2 * half).toFixed(1)}" stroke="#a88a5a" stroke-width="4"/>`
  }
  return s
}

/** Ship, faces right; (x, y) = center. Bounds: x ±24, y ±10. */
const ship = (x: number, y: number) =>
  `<path d="M${x - 20} ${y - 7}h26l16 7l-16 7h-26Z" fill="#e6e6f0"/><path d="M${x - 20} ${y - 7}l-4 -5h9ZM${x - 20} ${y + 7}l-4 5h9Z" fill="#3a86ff"/>` +
  `<circle cx="${x + 8}" cy="${y}" r="3" fill="#3a86ff"/><path d="M${x - 24} ${y}h-6" stroke="#ff9f1c" stroke-width="5" stroke-linecap="round"/>`

/** Tiny probe; (x, y) = center. Bounds: x ±16, y ±8. */
const probe = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="5" fill="#ffd166"/><path d="M${x - 16} ${y}h32M${x} ${y - 8}v-4" stroke="#bfc7d5" stroke-width="2"/><rect x="${x - 16}" y="${y - 3}" width="7" height="6" fill="#3a86ff"/><rect x="${x + 9}" y="${y - 3}" width="7" height="6" fill="#3a86ff"/>`

const beacon = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="8" fill="#ffd23f" fill-opacity="0.3"/><circle cx="${x}" cy="${y}" r="4" fill="#ffd23f"/>`

const ringRock = (x: number, y: number, r: number) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#a89880"/>`

export default svgLevel({
  id: 149,
  chapter: 'space',
  title: 'gasGiantRings',
  parTimeSec: 105,
  redesign: level149Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    const cx = 300
    const cy = 320
    const R = 210
    // Planet bands: strips of the disc between two chords, bounded by its arcs.
    const bandColors = ['#e9c08a', '#d9a066', '#f2d3a0', '#c98a5a', '#e9c08a', '#d9a066', '#f2d3a0', '#c98a5a', '#e9c08a']
    let bands = ''
    for (let i = 0; i < bandColors.length; i++) {
      const y0 = cy - R + (i * 2 * R) / bandColors.length
      const y1 = y0 + (2 * R) / bandColors.length
      const h0 = Math.sqrt(Math.max(0, R * R - (y0 - cy) ** 2))
      const h1 = Math.sqrt(Math.max(0, R * R - (y1 - cy) ** 2))
      bands +=
        `<path d="M${(cx - h0).toFixed(1)} ${y0.toFixed(1)}H${(cx + h0).toFixed(1)}A${R} ${R} 0 0 1 ${(cx + h1).toFixed(1)} ${y1.toFixed(1)}` +
        `H${(cx - h1).toFixed(1)}A${R} ${R} 0 0 1 ${(cx - h0).toFixed(1)} ${y0.toFixed(1)}Z" fill="${bandColors[i]}"/>`
    }
    let rocks = ''
    for (let i = 0; i < 40; i++) {
      const a = rand() * Math.PI * 2
      const k = 0.9 + rand() * 0.2
      const x = cx + Math.cos(a) * 380 * k
      const y = cy + Math.sin(a) * 64 * k
      const rx = cx + (x - cx) * Math.cos(-0.2) - (y - cy) * Math.sin(-0.2)
      const ry = cy + (x - cx) * Math.sin(-0.2) + (y - cy) * Math.cos(-0.2)
      if (Math.hypot(rx - 624, ry - 318) > 26 && Math.hypot(rx - 560, ry - 450) > 30) rocks += ringRock(+rx.toFixed(1), +ry.toFixed(1), 1.5 + rand() * 2)
    }
    const ring = (front: boolean) =>
      `<g transform="rotate(-11.5 ${cx} ${cy})">` +
      (front
        ? `<path d="M${cx - 380} ${cy}A380 64 0 0 0 ${cx + 380} ${cy}" fill="none" stroke="#e8d8b0" stroke-width="16" stroke-opacity="0.85"/><path d="M${cx - 340} ${cy}A340 54 0 0 0 ${cx + 340} ${cy}" fill="none" stroke="#c9b48a" stroke-width="6" stroke-opacity="0.8"/>`
        : `<ellipse cx="${cx}" cy="${cy}" rx="380" ry="64" fill="none" stroke="#e8d8b0" stroke-width="16" stroke-opacity="0.6"/><ellipse cx="${cx}" cy="${cy}" rx="340" ry="54" fill="none" stroke="#c9b48a" stroke-width="6" stroke-opacity="0.55"/>`) +
      `</g>`

    return (
      `<rect width="800" height="500" fill="#07091a"/>` + starField(rand, 0, 500, 100) + sparkle(520, 40, 6) + sparkle(760, 470, 5) +
      ring(false) +
      `<circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="#f2c890" fill-opacity="0.15"/>` + bands +
      `<path d="M${cx + 60} ${cy - R + 10}A${R} ${R} 0 0 1 ${cx + 60} ${cy + R - 10}A${R * 0.8} ${R} 0 0 0 ${cx + 60} ${cy - R + 10}Z" fill="#000" fill-opacity="0.18"/>` +
      diff(380, 380, 26, `<ellipse cx="380" cy="380" rx="22" ry="12" fill="#c0573f"/>`, `<ellipse cx="380" cy="380" rx="22" ry="12" fill="#c06a4a"/>`) +
      ring(true) + rocks +
      diff(624, 318, 22, ringRock(616, 320, 4), ringRock(630, 316, 4)) +
      // Moons
      diff(620, 100, 24, planet(620, 100, 20, '#7aa6d6'), planet(620, 100, 20, '#8a9ed6')) +
      diff(700, 200, 22, planet(700, 200, 12, '#c98bb9'), planet(700, 200, 16, '#c98bb9')) +
      diff(560, 240, 22, planet(560, 240, 8, '#bfc7d5'), '') +
      diff(720, 400, 26, stripedMoon(720, 400, 2), stripedMoon(720, 400, 3)) +
      // Ship, probe and the marker buoy
      diff(558, 450, 32, ship(560, 450), `<g transform="rotate(-20 560 450)">${ship(560, 450)}</g>`) +
      diff(120, 80, 22, '', probe(120, 80)) +
      `<path d="M460 132v-12" stroke="#bfc7d5" stroke-width="2"/><rect x="452" y="132" width="16" height="16" rx="3" fill="#e63946"/>` +
      diff(460, 118, 22, beacon(460, 116), anim({ type: 'blink', duty: 0.5, period: 1 }, beacon(460, 116))) +
      diff(60, 460, 22, sparkle(60, 460, 10, '#ffe8a3'), anim({ type: 'blink', duty: 0.6, period: 1.4 }, sparkle(60, 460, 10, '#ffe8a3'))) +
      helmet(720, 300) +
      satellite(220, 50) +
      asteroid(770, 470, 0.6) +
      rocket(40, 300, '#f1f1f1', '#3a86ff', 0.35) +
      wrench(760, 60) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['spaceStar', 101, 195],
        ['ringPlanet', 430, 45],
        ['asteroid', 588, 168],
        ['ufo', 733, 108],
        ['spaceStar', 276, 93],
      ])
    )
  },
})
