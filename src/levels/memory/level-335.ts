// Treehouse: a house in a big tree among the ten hardest of "memory" (hidden until released, levels/upcoming.ts). Its
// door, window and flag, a bird's nest with eggs, a tire swing, a bucket on a pulley rope, a ladder and a kite in the sky.
import { bird, bush, mushroom, rock } from '../chapter-03/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { bucket, cloud, sun } from '../shapes.ts'
import { flowers } from '../time/shapes.ts'
import { around, big, daySky, ground } from './shapes.ts'

export default memoryLevel({
  id: 335,
  title: 'memoryTreehouse',
  showSeconds: 5,
  scene: ({ diff }) =>
    daySky(620) + sun(70, 70) + cloud(380, 40, 0.5) + ground(620, '#7fb24a') +
    // The kite in the sky
    `<path d="M450 170Q440 220 470 260" stroke="#5c677d" stroke-width="1" fill="none"/>` +
    diff(...around(434, 110, 466, 172, 30), `<path d="M450 110L466 136L450 162L434 136Z" fill="#e63946"/><path d="M450 162q-6 6 0 10" stroke="#e63946" stroke-width="2" fill="none"/>`, `<path d="M450 110L466 136L450 162L434 136Z" fill="#3a86ff"/><path d="M450 162q-6 6 0 10" stroke="#3a86ff" stroke-width="2" fill="none"/>`) +
    // The tree and its branches
    `<path d="M210 620V230H290V620Q300 630 320 630H180Q200 630 210 620Z" fill="#7a4e2d"/>` +
    `<path d="M212 400Q140 380 60 392M288 380Q360 360 440 362" stroke="#7a4e2d" stroke-width="16" fill="none" stroke-linecap="round"/>` +
    `<circle cx="160" cy="130" r="80" fill="#3f9a5a"/><circle cx="250" cy="90" r="90" fill="#4caf6a"/><circle cx="340" cy="130" r="80" fill="#3f9a5a"/><circle cx="250" cy="180" r="70" fill="#4caf6a"/>` +
    // The treehouse: flag, window, door
    `<rect x="120" y="330" width="260" height="14" fill="#a0703f"/><path d="M130 344V420M370 344V420" stroke="#6b4f3a" stroke-width="5"/>` +
    `<rect x="150" y="230" width="180" height="100" fill="#c68b4e"/><path d="M150 252H330M150 276H330M150 300H330" stroke="#a0703f" stroke-width="2"/><path d="M140 232L240 170L340 232Z" fill="#e63946"/>` +
    `<path d="M240 170V130" stroke="#5c677d" stroke-width="2"/>` +
    diff(...around(240, 130, 266, 146, 30), `<rect x="240" y="130" width="26" height="16" fill="#ffd23f"/>`, `<rect x="240" y="130" width="26" height="16" fill="#8338ec"/>`) +
    `<rect x="170" y="260" width="40" height="30" fill="#bde3f2" stroke="#f4f1e8" stroke-width="3"/>` +
    diff(...around(170, 260, 210, 290, 30), `<path d="M172 262h12l-12 26ZM208 262h-12l12 26Z" fill="#ff6b8b"/>`, '') +
    diff(...around(260, 280, 290, 330, 30), `<rect x="260" y="280" width="30" height="50" fill="#2f6e8c"/><circle cx="284" cy="306" r="2.5" fill="#ffd23f"/>`, `<rect x="260" y="280" width="30" height="50" fill="#3fa46f"/><circle cx="284" cy="306" r="2.5" fill="#ffd23f"/>`) +
    // The ladder
    `<path d="M330 344L350 620M362 344L382 620M334 380H366M339 420H371M344 460H376M349 500H381M354 540H386M359 580H391" stroke="#a0703f" stroke-width="5"/>` +
    // The nest's eggs
    `<ellipse cx="402" cy="352" rx="26" ry="9" fill="#8a6a44"/><circle cx="392" cy="346" r="5" fill="#bde3f2"/><circle cx="402" cy="344" r="5" fill="#bde3f2"/>` +
    diff(...around(407, 339, 417, 351, 30), `<circle cx="412" cy="346" r="5" fill="#bde3f2"/>`, '') +
    `<path d="M376 352H428" stroke="#6b4f3a" stroke-width="3"/>` +
    // The tire swing, the bucket on its rope
    `<path d="M70 392V498" stroke="#c9a26b" stroke-width="3"/>` +
    diff(...around(44, 498, 96, 542, 30), `<ellipse cx="70" cy="520" rx="26" ry="22" fill="none" stroke="#2b2b2b" stroke-width="10"/>`, '') +
    diff(...around(113, 344, 147, 460, 30), `<path d="M130 344V372" stroke="#c9a26b" stroke-width="2"/>` + bucket(130, 400, '#3a86ff'), `<path d="M130 344V432" stroke="#c9a26b" stroke-width="2"/>` + bucket(130, 460, '#3a86ff')) +
    // Decor: the same in both pictures
    bird(320, 372, '#e63946') +
    `<path d="M420 362V500M460 362V500" stroke="#c9a26b" stroke-width="2"/><rect x="410" y="500" width="60" height="10" rx="3" fill="#a0703f"/>` +
    big(60, 650, 1.4, bush(0, 0)) +
    big(450, 640, 1.4, bush(0, 0, 1, '#4caf6a')) +
    flowers(200, 700, '#ff6b8b') +
    flowers(320, 720, '#ffd23f') +
    big(420, 720, 1.2, rock(0, 0)) +
    big(130, 720, 1.2, mushroom(0, 0, '#e63946')),
})
