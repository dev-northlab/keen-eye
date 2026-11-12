import { balloon, bike, bin, car, cone, dog, flowerBox, hydrant, pigeon, trafficLight } from '../chapter-02/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { cloud, sun } from '../shapes.ts'
import { around, big, daySky, stallAwning, windowPane } from './shapes.ts'
import { bird, birds, pot, roadSign } from '../time/shapes.ts'

/** Lit-up window grid of the tall building on the right. */
const windows = () =>
  [90, 160, 230, 300, 370]
    .flatMap((y) => [310, 365, 420].map((x) => `<rect x="${x}" y="${y}" width="44" height="44" rx="4" fill="#e6f4fb"/>`))
    .join('')

export default memoryLevel({
  id: 307,
  title: 'memoryStreet',
  showSeconds: 4,
  scene: ({ diff }) =>
    daySky(470) +
    sun(70, 100) +
    big(210, 70, 0.9, cloud(0, 0)) +
    // Shop on the left
    `<rect x="20" y="240" width="240" height="230" fill="#f2cc8f"/><rect x="10" y="230" width="260" height="16" fill="#c98b5a"/>` +
    windowPane(46, 266, 60, 50) +
    windowPane(174, 266, 60, 50) +
    `<rect x="120" y="406" width="40" height="64" rx="4" fill="#7a4e33"/><rect x="62" y="410" width="44" height="40" fill="#bde3f2"/><rect x="174" y="410" width="44" height="40" fill="#bde3f2"/>` +
    stallAwning(140, 350, 160, '#e63946') +
    // Tall building on the right
    `<rect x="290" y="60" width="190" height="410" fill="#7aa6d6"/>` +
    windows() +
    // Sidewalk and road
    `<rect y="470" width="500" height="50" fill="#d9d4c7"/><rect y="520" width="500" height="230" fill="#5c5f66"/>` +
    `<path d="M20 660H480" stroke="#ffffff" stroke-width="6" stroke-dasharray="40 30"/>` +
    big(272, 500, 1.6, trafficLight(0, 0, 0)) +
    diff(...around(320, 453, 400, 500), big(360, 500, 1.8, dog(0, 0, '#c48a5a', true)), '') +
    diff(...around(444, 442, 476, 500, 34), '', big(460, 500, 1.8, hydrant(0, 0))) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(240, 215, 0.4) +
    cloud(50, 195, 0.4) +
    birds(160, 160) +
    balloon(258, 120, '#e63946') +
    flowerBox(332, 152, '#ff6b8b') +
    flowerBox(442, 292, '#ffd23f') +
    bird(390, 60, '#e63946') +
    pot(30, 500) +
    roadSign(210, 503) +
    bin(90, 500) +
    pot(160, 500, '#3a86ff') +
    pigeon(125, 503) +
    cone(30, 735) +
    car(400, 740, '#e63946', true) +
    bike(440, 610, '#8338ec') +
    diff(...around(74, 572, 226, 640), big(150, 640, 1.8, car(0, 0, '#3a86ff')), big(150, 640, 1.8, car(0, 0, '#ffb703'))),
})
