// Motion differences: the little moon orbits faster on picture B; the rocket flies faster on B; the sparkle twinkles only on B.
import { svgLevel } from '../helpers.ts'
import { asteroid, comet, flame, planet, rocket, sparkle, starField, ufo } from './shapes.ts'

/** Spiral galaxy; (x, y) = center. Bounds: radius 30. */
const galaxy = (x: number, y: number, color: string) =>
  `<ellipse cx="${x}" cy="${y}" rx="28" ry="10" fill="${color}" fill-opacity="0.35" transform="rotate(-20 ${x} ${y})"/>` +
  `<path d="M${x - 22} ${y + 4}q10 -14 22 -4q12 10 22 -6" stroke="${color}" stroke-width="3" fill="none"/><circle cx="${x}" cy="${y}" r="5" fill="#fff"/>`

/** Rocket heading right with its flame, centered at (0, 0). Bounds: radius 40. */
const ship = `<g transform="rotate(75)">${rocket(0, 20, '#f1f1f1', '#3a86ff', 0.6)}${flame(0, 20, 0.6)}</g>`

export default svgLevel({
  id: 84,
  chapter: 'space',
  title: 'ringedPlanet',
  parTimeSec: 140,
  scene: ({ diff, anim, rand }) => {
    const orbiting = (period: number) => anim({ id: 'moonlet', type: 'rotate', pivot: [680, 110], period }, `<circle cx="724" cy="110" r="7" fill="#d0d4de"/>`)
    const flying = (period: number) => anim({ id: 'ship', type: 'path', points: [[0, 0], [120, -30]], period }, `<g transform="translate(130 420)">${ship}</g>`)
    const twinkle = sparkle(110, 300, 12)

    return (
      `<rect width="800" height="500" fill="#1b1640"/>` +
      `<ellipse cx="160" cy="160" rx="200" ry="90" fill="#9b7bff" fill-opacity="0.12"/><ellipse cx="640" cy="380" rx="220" ry="100" fill="#ff6b8b" fill-opacity="0.1"/>` +
      starField(rand, 0, 500, 80) +
      diff(200, 60, 30, galaxy(200, 60, '#bde3f2'), galaxy(200, 60, '#ffb3c6')) +
      diff(111, 109, 44, comet(80, 120), '') +
      diff(560, 74, 24, ufo(560, 70), ufo(560, 70, '#9b7bff', '#ff6b8b')) +
      planet(680, 110, 26, '#8ecae6') +
      diff(724, 110, 18, orbiting(8), orbiting(4), 'moonlet') +
      // Ringed giant
      `<ellipse cx="380" cy="260" rx="204" ry="42" fill="none" stroke="#ffd6a5" stroke-width="17"/>` +
      `<circle cx="380" cy="260" r="120" fill="#f4a261"/>` +
      `<ellipse cx="380" cy="200" rx="100" ry="9" fill="#e76f51" fill-opacity="0.5"/><ellipse cx="380" cy="232" rx="112" ry="7" fill="#ffd6a5" fill-opacity="0.5"/>` +
      `<circle cx="338" cy="218" r="26" fill="#fff" fill-opacity="0.15"/>` +
      diff(430, 250, 18, `<ellipse cx="430" cy="250" rx="16" ry="10" fill="#e76f51"/>`, '') +
      `<path d="M176 260A204 42 0 0 0 584 260" fill="none" stroke="#ffd6a5" stroke-width="17"/>` +
      diff(560, 380, 18, `<circle cx="560" cy="380" r="14" fill="#d0d4de"/>`, `<circle cx="560" cy="380" r="14" fill="#ffd166"/>`) +
      diff(110, 300, 18, twinkle, anim({ type: 'blink', duty: 0.5, period: 1 }, twinkle)) +
      diff(700, 400, 22, asteroid(700, 400, 1.2), '') +
      diff(620, 460, 20, asteroid(620, 460, 0.8), asteroid(620, 460, 1.1)) +
      asteroid(760, 470, 0.7) +
      asteroid(480, 440, 0.9, '#a08d7a') +
      diff(130, 420, 41, flying(10), flying(5), 'ship')
    )
  },
})
