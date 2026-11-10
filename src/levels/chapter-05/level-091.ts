// Motion differences: the big geyser puffs faster on picture B; the small geyser erupts only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level091Redesign } from './level-091-redesign.ts'
import { alien, astronaut, beacon, dome, flag, fuelCanister, helmet, planet, probe, sparkle, starField, toolbox } from './shapes.ts'

/** Geyser plume; (x, y) = vent. Bounds: x ±w, y from −h to 0. */
const plume = (x: number, y: number, w: number, h: number) =>
  `<g fill="#f1fbff" fill-opacity="0.85"><ellipse cx="${x}" cy="${y - h * 0.25}" rx="${w * 0.45}" ry="${h * 0.25}"/>` +
  `<circle cx="${x - w * 0.4}" cy="${y - h * 0.62}" r="${w * 0.55}"/><circle cx="${x + w * 0.35}" cy="${y - h * 0.7}" r="${w * 0.6}"/><circle cx="${x}" cy="${y - h + w * 0.6}" r="${w * 0.6}"/></g>`

/** Ice crystals; (x, y) = bottom center. Bounds: x ±20, y from −40 to 0. */
const crystals = (x: number, y: number, color: string) =>
  `<path d="M${x - 20} ${y}l6 -26l6 26ZM${x - 8} ${y}l8 -40l8 40ZM${x + 8} ${y}l6 -22l6 22Z" fill="${color}"/><path d="M${x - 2} ${y - 4}l2 -30" stroke="#fff" stroke-opacity="0.6" stroke-width="2"/>`

export default svgLevel({
  id: 91,
  chapter: 'space',
  title: 'iceMoon',
  parTimeSec: 140,
  redesign: level091Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    const puffing = (period: number) => anim({ id: 'geyser', type: 'bob', dx: 0, dy: 10, period }, plume(180, 330, 34, 100))
    const small = plume(520, 340, 26, 58)

    return (
      `<rect width="800" height="500" fill="#0b1030"/>` +
      starField(rand, 0, 300, 60) +
      planet(640, 90, 110, '#9b7bff', '#d0c4ff') +
      diff(470, 60, 18, `<circle cx="470" cy="60" r="10" fill="#bfc7d5"/>`, '') +
      diff(300, 80, 18, sparkle(300, 80, 10), '') +
      // Ice ground
      `<path d="M0 320q200 -30 420 -6t380 -12V500H0Z" fill="#dff3fb"/><path d="M0 420q260 -30 520 0t280 -8V500H0Z" fill="#c4e6f3"/>` +
      `<path d="M60 360l40 20l30 -10M300 350l30 30l50 4M600 440l40 -14l50 20" stroke="#a9d6e5" stroke-width="3" fill="none"/>` +
      `<ellipse cx="180" cy="332" rx="22" ry="6" fill="#7fb8cc"/><ellipse cx="520" cy="342" rx="16" ry="5" fill="#7fb8cc"/>` +
      diff(180, 280, 55, puffing(3), puffing(1.3), 'geyser') +
      diff(520, 310, 34, small, anim({ type: 'blink', duty: 0.5, period: 2 }, small)) +
      `<path d="M720 330l14 -60l14 60Z" fill="#a9d6e5"/>` +
      diff(760, 300, 33, `<path d="M746 330l14 -60l14 60Z" fill="#8ecae6"/>`, '') +
      crystals(40, 470, '#3ae0ff') +
      diff(320, 400, 28, crystals(320, 420, '#3ae0ff'), crystals(320, 420, '#ff9ff3')) +
      // Base
      dome(660, 380, 50, '#e6f6ff') +
      diff(660, 371, 18, `<rect x="652" y="362" width="16" height="18" fill="#3a86ff"/>`, `<rect x="652" y="362" width="16" height="18" fill="#ffb703"/>`) +
      diff(582, 357, 18, flag(570, 400, '#e63946'), flag(570, 400, '#3a86ff')) +
      diff(420, 414, 31, astronaut(420, 440, '#f1f1f1', '#ffb703'), astronaut(420, 440, '#ff9f43', '#ffb703')) +
      `<path d="M436 428l14 14" stroke="#5c677d" stroke-width="4"/>` +
      diff(90, 429, 18, alien(90, 460, '#f1f1f1'), alien(90, 460, '#f1f1f1', 2)) +
      alien(220, 480, '#bde3f2', 2) +
      beacon(240, 365) +
      fuelCanister(520, 410) +
      toolbox(330, 470) +
      probe(380, 220) +
      helmet(740, 470) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['crater', 493, 401],
        ['crystal', 322, 332, '#ff6bd6'],
        ['moonPebbles', 173, 392],
        ['crater', 675, 466],
        ['crystal', 744, 389, '#7bdff2'],
        ['sparkle', 194, 148],
        ['probe', 631, 262],
        ['spaceStar', 435, 155],
        ['ringPlanet', 70, 263],
        ['asteroid', 352, 30],
      ])
    )
  },
})
