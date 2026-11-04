import { balloon, bike, bin, car, cone, dog, flowerBox, hydrant, pigeon, trafficLight } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { cloud, sun } from '../shapes.ts'
import { around, big, daySky, stallAwning, windowPane } from './shapes.ts'
import { bird, birds, pot, roadSign } from '../time/shapes.ts'

/** Lit-up window grid of the tall building on the right. */
const windows = () =>
  [80, 150, 220]
    .flatMap((y) => [520, 600, 680].map((x) => `<rect x="${x}" y="${y}" width="44" height="44" rx="4" fill="#e6f4fb"/>`))
    .join('')

export default memoryLevel({
  id: 307,
  title: 'memoryStreet',
  showSeconds: 4,
  scene: ({ diff, extra, anim }) =>
    daySky(300) +
    sun(380, 60) +
    big(380, 150, 0.9, cloud(0, 0)) +
    // Shop on the left
    `<rect x="40" y="70" width="260" height="230" fill="#f2cc8f"/><rect x="30" y="60" width="280" height="16" fill="#c98b5a"/>` +
    windowPane(76, 96, 60, 50) +
    windowPane(204, 96, 60, 50) +
    `<rect x="150" y="236" width="40" height="64" rx="4" fill="#7a4e33"/><rect x="90" y="240" width="44" height="40" fill="#bde3f2"/><rect x="206" y="240" width="44" height="40" fill="#bde3f2"/>` +
    diff(...around(80, 180, 260, 226), stallAwning(170, 180, 160, '#e63946'), stallAwning(170, 180, 160, '#3fa46f')) +
    // Tall building on the right
    `<rect x="490" y="40" width="270" height="260" fill="#7aa6d6"/>` +
    windows() +
    // Sidewalk and road
    `<rect y="300" width="800" height="50" fill="#d9d4c7"/><rect y="350" width="800" height="150" fill="#5c5f66"/>` +
    `<path d="M20 428H780" stroke="#ffffff" stroke-width="6" stroke-dasharray="40 30"/>` +
    big(400, 330, 1.6, trafficLight(0, 0, 0)) +
    diff(...around(520, 298, 600, 345), big(560, 345, 1.8, dog(0, 0, '#c48a5a', true)), '') +
    diff(...around(674, 287, 706, 345, 34), '', big(690, 345, 1.8, hydrant(0, 0))) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(20, 40, 0.4) +
    cloud(460, 230, 0.4) +
    birds(330, 230) +
    balloon(470, 120, '#e63946') +
    flowerBox(542, 142, '#ff6b8b') +
    flowerBox(702, 212, '#ffd23f') +
    bird(600, 40, '#e63946') +
    pot(30, 345) +
    roadSign(330, 348) +
    bin(370, 345) +
    pot(450, 345, '#3a86ff') +
    pigeon(475, 348) +
    cone(775, 345) +
    car(620, 480, '#e63946', true) +
    bike(760, 470, '#8338ec') +
    diff(...around(144, 377, 296, 445), big(220, 445, 1.8, car(0, 0, '#3a86ff')), big(220, 445, 1.8, car(0, 0, '#ffb703'))) +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['cone', 427, 379],
      ['pigeon', 82, 404],
      ['cone', 638, 387],
    ]),
})
