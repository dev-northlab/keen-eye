// Motion differences: the cow floats faster on picture B; the saucer lights blink faster on B; the weathervane spins only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level090Redesign } from './level-090-redesign.ts'
import { cow, hayBale, sheep } from '../shapes.ts'
import { alienPlant, crystal, fuelCanister, person, probe, starField, toolbox, ufo } from './shapes.ts'

const vane = `<path d="M616 176h28M640 172l6 4l-6 4M616 172v8" stroke="#3d4a55" stroke-width="3" fill="none"/>`
const lights = `<g fill="#ff6b6b"><circle cx="368" cy="114.8" r="4.8"/><circle cx="400" cy="116.4" r="4.8"/><circle cx="432" cy="114.8" r="4.8"/></g>`

export default svgLevel({
  id: 90,
  chapter: 'space',
  title: 'ufoFarm',
  parTimeSec: 140,
  redesign: level090Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    const floating = (period: number) => anim({ id: 'cow', type: 'bob', dx: 0, dy: 12, period }, `<g transform="translate(402 290) scale(0.6)">${cow(0, 0)}</g>`)
    const blinking = (period: number) => anim({ type: 'blink', duty: 0.5, period }, lights)

    return (
      `<rect width="800" height="500" fill="#0f1a3a"/><rect y="220" width="800" height="110" fill="#1c2a5c"/>` +
      starField(rand, 0, 300, 60) +
      diff(90, 70, 28, `<circle cx="90" cy="70" r="26" fill="#f4f1de"/>`, `<circle cx="90" cy="70" r="26" fill="#ffd166"/>`) +
      // Hills and field
      `<path d="M0 340q200 -50 400 -10t400 -20V500H0Z" fill="#1f4d2e"/><path d="M0 420q300 -30 600 0t200 -6V500H0Z" fill="#2a6b3a"/>` +
      // Barn and silo
      `<rect x="710" y="220" width="40" height="140" fill="#8d99ae"/>` +
      diff(730, 210, 22, `<path d="M710 220a20 20 0 0 1 40 0Z" fill="#5c677d"/>`, `<path d="M710 220a20 20 0 0 1 40 0Z" fill="#e63946"/>`) +
      `<rect x="560" y="260" width="140" height="100" fill="#9b2f3e"/><path d="M550 262L630 200L710 262Z" fill="#6e2230"/>` +
      `<rect x="605" y="310" width="50" height="50" fill="#f4f1de"/><path d="M605 310l50 50M655 310l-50 50" stroke="#9b2f3e" stroke-width="4"/>` +
      diff(630, 285, 18, `<rect x="620" y="277" width="20" height="16" fill="#ffd166"/>`, `<rect x="620" y="277" width="20" height="16" fill="#3d2030"/>`) +
      `<path d="M630 200v-24" stroke="#3d4a55" stroke-width="3"/>` +
      diff(630, 176, 18, vane, anim({ type: 'rotate', pivot: [630, 176], period: 2 }, vane)) +
      // Fence
      `<path d="M20 372h290M20 392h290" stroke="#c9a06c" stroke-width="5"/>` +
      `<g fill="#a0703f"><rect x="40" y="362" width="8" height="40"/><rect x="120" y="362" width="8" height="40"/><rect x="280" y="362" width="8" height="40"/></g>` +
      diff(204, 382, 21, `<rect x="200" y="362" width="8" height="40" fill="#a0703f"/>`, '') +
      diff(120, 450, 33, `<g transform="translate(120 450) scale(0.6)">${hayBale(0, 0)}</g>`, '') +
      diff(703, 441, 30, `<g transform="translate(700 440) scale(0.6)">${sheep(0, 0, true)}</g>`, `<g transform="translate(700 440) scale(0.6)">${sheep(0, 0, true, '#c9b8a8')}</g>`) +
      diff(260, 435, 20, person(260, 470, '#3a86ff'), person(260, 470, '#e63946')) +
      // Saucer and beam
      `<path d="M370 125L320 400H480L410 125Z" fill="#f4ff8a" fill-opacity="0.22"/>` +
      diff(404, 290, 47, floating(3), floating(1.4), 'cow') +
      `<g transform="translate(400 110) scale(1.6)">${ufo(0, 0, '#9b7bff', '#ffd23f')}</g>` +
      diff(400, 115, 38, blinking(2), blinking(0.7)) +
      alienPlant(560, 445) +
      crystal(500, 440) +
      probe(250, 250) +
      fuelCanister(775, 385) +
      toolbox(340, 450) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['pineCone', 666, 394],
        ['leafPile', 422, 457],
        ['hedgehog', 535, 479],
        ['frog', 265, 345],
        ['mushroom', 201, 471],
        ['fern', 512, 386],
        ['sparkle', 248, 175],
        ['spaceStar', 747, 68],
        ['sparkle', 445, 46],
        ['spaceStar', 545, 174],
      ])
    )
  },
})
