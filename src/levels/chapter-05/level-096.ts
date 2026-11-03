// Motion differences: the space whale swims faster on picture B; the star jelly pulses faster on B.
import { svgLevel } from '../helpers.ts'
import { jellyfish } from '../chapter-04/shapes.ts'
import { asteroid, comet, fuelCanister, planet, probe, rocket, satellite, sparkle, star, starField, ufo, wrench } from './shapes.ts'

/** Space whale, faces right; (x, y) = body center. Bounds: x from −80 to +70, y from −34 to +30. */
const whale = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-60 0q-12 -20 -20 -30q14 2 22 14q0 -8 -2 -18q10 8 10 26Z" fill="#5b8bd9"/>` +
  `<path d="M-56 4q10 -38 66 -36q60 2 60 30q0 32 -60 32q-50 0 -66 -26Z" fill="#6c9fe8"/><path d="M-40 14q40 18 100 0q-10 16 -50 16q-36 0 -50 -16Z" fill="#cfe3ff"/>` +
  `<circle cx="40" cy="-4" r="3" fill="#1b1640"/><path d="M0 18q-6 10 -18 12q8 -10 6 -14Z" fill="#5b8bd9"/>` +
  `<g fill="#fff" fill-opacity="0.8"><circle cx="-10" cy="-16" r="2"/><circle cx="8" cy="-22" r="2.5"/><circle cx="24" cy="-14" r="1.8"/></g></g>`

export default svgLevel({
  id: 96,
  chapter: 'space',
  title: 'nebula',
  parTimeSec: 140,
  scene: ({ diff, anim, rand }) => {
    const swimming = (period: number) => anim({ id: 'whale', type: 'path', points: [[0, 0], [260, 0]], flipX: 260, period }, whale(260, 300))
    const pulsing = (period: number) => anim({ id: 'jelly', type: 'bob', dx: 0, dy: 14, period }, jellyfish(640, 160, '#ff9ff3'))

    return (
      `<rect width="800" height="500" fill="#0d0820"/>` +
      `<ellipse cx="250" cy="180" rx="260" ry="120" fill="#ff6b8b" fill-opacity="0.16" transform="rotate(-20 250 180)"/>` +
      `<ellipse cx="560" cy="320" rx="300" ry="110" fill="#3ae0ff" fill-opacity="0.12" transform="rotate(15 560 320)"/>` +
      `<ellipse cx="420" cy="120" rx="180" ry="70" fill="#9b7bff" fill-opacity="0.18"/><ellipse cx="160" cy="420" rx="200" ry="60" fill="#ffb703" fill-opacity="0.08"/>` +
      starField(rand, 0, 500, 90) +
      sparkle(380, 110, 14) +
      diff(470, 70, 18, sparkle(470, 70, 10), '') +
      diff(100, 80, 18, star(100, 80, 10, '#ffd23f'), star(100, 80, 10, '#3ae0ff')) +
      diff(740, 70, 34, planet(740, 70, 32, '#2a9d8f'), planet(740, 70, 24, '#2a9d8f')) +
      diff(231, 449, 44, comet(200, 460), '') +
      diff(640, 166, 22, pulsing(4), pulsing(1.6), 'jelly') +
      jellyfish(560, 100, '#b38cff') +
      diff(110, 230, 41, satellite(110, 230), satellite(110, 230, '#8ac926')) +
      diff(700, 432, 37, ufo(700, 430), '') +
      `<circle cx="480" cy="440" r="6" fill="#fff" fill-opacity="0.9"/><circle cx="480" cy="440" r="14" fill="#fff" fill-opacity="0.15"/>` +
      diff(560, 470, 18, `<circle cx="560" cy="470" r="5" fill="#ffd166"/><circle cx="560" cy="470" r="12" fill="#ffd166" fill-opacity="0.2"/>`, '') +
      diff(255, 298, 82, swimming(18), swimming(9), 'whale') +
      probe(400, 420) +
      asteroid(330, 140, 0.6) +
      rocket(760, 310, '#f1f1f1', '#ff6b8b', 0.35) +
      wrench(620, 380) +
      fuelCanister(150, 340)
    )
  },
})
