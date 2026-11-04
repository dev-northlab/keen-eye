// Motion differences: the saucer hovers faster on picture B; the bulb plant sways faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { alien, alienPlant, crystal, moonPebbles, planet, probe, solarPanel, star, starField, ufo } from './shapes.ts'

/** Mushroom house; (x, y) = bottom center. Bounds: x ±50, y from −100 to 0. */
const house = (x: number, y: number, cap: string) =>
  `<rect x="${x - 24}" y="${y - 62}" width="48" height="62" rx="6" fill="#f4f1de"/>` +
  `<path d="M${x - 50} ${y - 58}q0 -42 50 -42q50 0 50 42Z" fill="${cap}"/>` +
  `<circle cx="${x + 20}" cy="${y - 80}" r="6" fill="#fff" fill-opacity="0.8"/><circle cx="${x - 2}" cy="${y - 90}" r="4" fill="#fff" fill-opacity="0.8"/>`

/** Bulb plant; (x, y) = base. Bounds: x ±14, y from −82 to 0. */
const bulb = (x: number, y: number) =>
  `<path d="M${x} ${y}q-8 -30 0 -60" stroke="#3a7d44" stroke-width="5" fill="none"/><path d="M${x} ${y - 20}q12 -10 14 -2q-6 8 -14 2Z" fill="#3a7d44"/>` +
  `<circle cx="${x}" cy="${y - 70}" r="12" fill="#ff9ff3"/><circle cx="${x - 4}" cy="${y - 74}" r="4" fill="#fff" fill-opacity="0.6"/>`

/** Glowing lamp on a stick; (x, y) = foot. The orb is at (x, y − 58). */
const lampPost = (x: number, y: number) => `<rect x="${x - 2}" y="${y - 50}" width="4" height="50" fill="#5c677d"/>`
const orb = (x: number, y: number, color: string) => `<circle cx="${x}" cy="${y - 58}" r="12" fill="${color}" fill-opacity="0.35"/><circle cx="${x}" cy="${y - 58}" r="7" fill="${color}"/>`

export default svgLevel({
  id: 86,
  chapter: 'space',
  title: 'alienVillage',
  parTimeSec: 140,
  scene: ({ diff, anim, rand, extra }) => {
    const hovering = (period: number) => anim({ id: 'ufo', type: 'bob', dx: 0, dy: 8, period }, ufo(680, 150, '#ffb703', '#ffffff'))
    const swaying = (period: number) => anim({ type: 'sway', angle: 10, pivot: [60, 440], period }, bulb(60, 440))

    return (
      `<rect width="800" height="500" fill="#2b1d5c"/><rect y="200" width="800" height="120" fill="#5b3a8c"/><rect y="260" width="800" height="60" fill="#b45f9e"/>` +
      starField(rand, 0, 230, 45) +
      `<ellipse cx="150" cy="90" rx="69" ry="14" fill="none" stroke="#ffd6e0" stroke-width="6"/>` +
      diff(150, 90, 41, `<circle cx="150" cy="90" r="40" fill="#ffb3c6"/>`, `<circle cx="150" cy="90" r="40" fill="#8ecae6"/>`) +
      `<path d="M81 90A69 14 0 0 0 219 90" fill="none" stroke="#ffd6e0" stroke-width="6"/>` +
      planet(560, 60, 16, '#ffd166') +
      diff(480, 70, 18, star(480, 70, 10, '#fff3b0'), '') +
      diff(680, 146, 37, hovering(5), hovering(2), 'ufo') +
      // Hills and ground
      `<path d="M0 330q140 -60 280 -20t300 -10t220 0V400H0Z" fill="#7b2f6e"/>` +
      `<rect y="380" width="800" height="120" fill="#2a9d8f"/><path d="M0 460q200 -20 400 0t400 -6V500H0Z" fill="#23867a"/>` +
      // Houses
      house(160, 400, '#e63946') +
      `<rect x="150" y="370" width="20" height="30" rx="10" fill="#7a4e33"/><circle cx="178" cy="356" r="7" fill="#ffd166"/>` +
      diff(130, 322, 18, `<circle cx="130" cy="322" r="7" fill="#fff" fill-opacity="0.8"/>`, '') +
      house(400, 380, '#9b7bff') +
      `<rect x="390" y="350" width="20" height="30" rx="10" fill="#7a4e33"/>` +
      diff(400, 332, 18, `<circle cx="400" cy="332" r="7" fill="#ffd166"/>`, `<circle cx="400" cy="332" r="7" fill="#3ae0ff"/>`) +
      house(640, 410, '#3a86ff') +
      diff(640, 395, 18, `<rect x="630" y="380" width="20" height="30" rx="10" fill="#7a4e33"/>`, `<rect x="630" y="380" width="20" height="30" rx="10" fill="#e63946"/>`) +
      lampPost(320, 430) +
      diff(320, 372, 18, orb(320, 430, '#3ae0ff'), '') +
      lampPost(540, 440) +
      orb(540, 440, '#3ae0ff') +
      // Villagers
      diff(270, 419, 18, alien(270, 450), alien(270, 450, '#8ac926', 2)) +
      diff(520, 437, 29, alien(520, 460, '#ff9f43', 2), alien(520, 460, '#ff6b8b', 2)) +
      alien(740, 470, '#8ac926', 2) +
      diff(60, 400, 48, swaying(4), swaying(1.6)) +
      bulb(760, 400) +
      alienPlant(380, 452) +
      crystal(465, 432) +
      moonPebbles(600, 452) +
      probe(280, 210) +
      solarPanel(218, 428) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['alienPlant', 437, 446],
        ['crystal', 183, 436, '#ff6bd6'],
        ['moonPebbles', 722, 399],
        ['crater', 239, 470],
        ['crystal', 592, 438, '#7bdff2'],
        ['moonPebbles', 117, 475],
        ['spaceStar', 215, 131],
        ['ringPlanet', 65, 144],
        ['asteroid', 571, 155],
        ['ufo', 394, 136],
      ])
    )
  },
})
