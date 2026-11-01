// Motion differences: the Moon circles the Earth faster on picture B; Jupiter's moon orbits only on B; the solar flare flashes faster on B.
import { svgLevel } from '../helpers.ts'
import { comet, planet, starField } from './shapes.ts'

const flare = `<path d="M70 168q20 -26 30 4" stroke="#ff7b54" stroke-width="6" fill="none" stroke-linecap="round"/>`

export default svgLevel({
  id: 93,
  chapter: 'space',
  title: 'solarSystem',
  parTimeSec: 140,
  scene: ({ diff, anim, rand }) => {
    const moon = (period: number) => anim({ id: 'moon', type: 'rotate', pivot: [307, 201], period }, `<circle cx="333" cy="201" r="5" fill="#d0d4de"/>`)
    const io = `<circle cx="553" cy="194" r="5" fill="#ffd166"/>`
    const flashing = (period: number) => anim({ type: 'blink', duty: 0.5, period }, flare)
    let belt = ''
    for (let i = 0; i < 26; i++) {
      const a = ((rand() - 0.5) * 50 * Math.PI) / 180
      const r = 470 + rand() * 30
      belt += `<circle cx="${Math.round(-40 + r * Math.cos(a))}" cy="${Math.round(250 + r * Math.sin(a))}" r="${(1.5 + rand() * 2).toFixed(1)}" fill="#a08d7a"/>`
    }

    return (
      `<rect width="800" height="500" fill="#0d0b24"/>` +
      starField(rand, 0, 500, 70) +
      `<g fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="2">${[200, 270, 350, 430, 540, 680, 790, 820].map((r) => `<circle cx="-40" cy="250" r="${r}"/>`).join('')}</g>` +
      belt +
      // Sun
      `<circle cx="-40" cy="250" r="170" fill="#ffd23f" fill-opacity="0.2"/><circle cx="-40" cy="250" r="140" fill="#ffb703"/><circle cx="-40" cy="250" r="110" fill="#ffd23f"/>` +
      diff(85, 164, 22, flashing(2), flashing(0.8)) +
      // Planets
      diff(159, 233, 18, planet(159, 233, 8, '#b0a8b9'), planet(159, 233, 8, '#e07a5f')) +
      diff(227, 288, 18, planet(227, 288, 14, '#f4d58d'), planet(227, 288, 10, '#f4d58d')) +
      planet(307, 201, 16, '#3a86ff') +
      `<path d="M298 194q8 -6 14 0q-2 8 -12 6Z" fill="#4caf6a"/>` +
      diff(333, 201, 18, moon(6), moon(2.5), 'moon') +
      planet(388, 295, 12, '#e76f51') +
      diff(404, 281, 18, `<circle cx="404" cy="281" r="5" fill="#bfc7d5"/>`, '') +
      planet(497, 194, 40, '#e9b88a') +
      `<ellipse cx="497" cy="180" rx="36" ry="4" fill="#c98b5e" fill-opacity="0.6"/><ellipse cx="497" cy="208" rx="35" ry="4" fill="#c98b5e" fill-opacity="0.6"/>` +
      diff(510, 205, 18, `<ellipse cx="510" cy="205" rx="8" ry="5" fill="#c1440e"/>`, '') +
      diff(553, 194, 18, io, anim({ id: 'io', type: 'rotate', pivot: [497, 194], period: 9 }, io), 'io') +
      diff(637, 309, 54, planet(637, 309, 30, '#e9c46a', '#f4e1a1'), planet(637, 309, 30, '#e9c46a', '#9b7bff')) +
      diff(727, 59, 19, planet(727, 59, 18, '#8ecae6'), planet(727, 59, 18, '#b8f2c2')) +
      planet(762, 421, 18, '#3a5bd9') +
      diff(191, 409, 44, comet(160, 420), '')
    )
  },
})
