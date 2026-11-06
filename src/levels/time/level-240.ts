// Lake camp: a summer camp by a lake in summer and in winter, the hardest of "time" (hidden until released,
// levels/upcoming.ts). A log cabin with its lantern, a flagpole, a dock with a canoe and a life ring, a tent, a
// picnic table, a canoe rack, an archery target, the camp sign and a bird house; the lake freezes in winter.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, bareTree, bird, birdHouse, birds, butterfly, cat, chimney, cloud, door, duck, fireLogs, flowers, grass, house, lifeRing, mountains, oak, pane, person, pine, pineSnow, rock, roofSnow, signBoard, sky, smoke, snowCap, snowfall, snowman, winterPerson, winterSky } from './shapes.ts'

/** Canoe seen from the side, faces right; (x, y) = center. Bounds: x ±44, y ±6. */
const canoe = (x: number, y: number, color: string) =>
  `<path d="M${x - 44} ${y - 6}Q${x} ${y + 14} ${x + 44} ${y - 6}Z" fill="${color}"/><path d="M${x - 40} ${y - 5}H${x + 40}" stroke="#000" stroke-opacity="0.2" stroke-width="2"/>`

/** Archery target on its stand; (x, y) = target center, rings in `color`. Bounds: x ±22, y ±22. */
const target = (x: number, y: number, color: string) =>
  `<circle cx="${x}" cy="${y}" r="22" fill="#f4f1e8"/><circle cx="${x}" cy="${y}" r="16" fill="${color}"/><circle cx="${x}" cy="${y}" r="10" fill="#f4f1e8"/><circle cx="${x}" cy="${y}" r="5" fill="#ffd23f"/>`

export default svgLevel({
  id: 240,
  chapter: 'time',
  title: 'lakeCamp',
  pair: 'summer-winter',
  parTimeSec: 175,
  scene: ({ diff, time, trap, extra, anim }) => {
    let forest = ''
    for (const x of [20, 80, 140, 200, 260, 320, 380]) forest += pine(x, 298, 0.55) + time('', pineSnow(x, 298, 0.55))
    return (
      time(sky(false, 240), winterSky(240)) + mountains(240, time(false, true)) +
      `<rect y="240" width="800" height="260" fill="${time('#8fc25a', '#f4f8fb')}"/>` + forest +
      `<path d="M0 300Q200 290 420 320Q440 380 300 410Q120 420 0 402Z" fill="${time('#4aa3c7', '#cfe6f2')}"/>` +
      // The dock: the paddle in the canoe, the life ring
      `<rect x="230" y="330" width="40" height="82" fill="#a0703f"/><path d="M230 350H270M230 370H270M230 390H270" stroke="#8a5a33" stroke-width="2"/><rect x="270" y="336" width="8" height="30" fill="#6b4f3a"/>` +
      canoe(180, 358, '#e76f51') +
      diff(...around(150, 350, 210, 360), `<path d="M152 356L206 352" stroke="#8a5a33" stroke-width="3"/><ellipse cx="206" cy="352" rx="6" ry="3" fill="#8a5a33"/>`, '') +
      diff(...around(262, 336, 290, 364), lifeRing(276, 350, '#e63946'), '') +
      // The flagpole, the bird house
      `<path d="M440 300V200" stroke="#8d99ae" stroke-width="3"/>` +
      diff(...around(440, 200, 464, 214), `<rect x="440" y="200" width="24" height="14" fill="#2a9d8f"/>`, `<rect x="440" y="200" width="24" height="14" fill="#e63946"/>`) +
      birdHouse(500, 330, '#e07a5f') +
      diff(...around(488, 260, 512, 284), `<rect x="488" y="260" width="24" height="24" fill="#e07a5f"/><circle cx="500" cy="272" r="4" fill="#3d2a20"/>`, `<rect x="488" y="260" width="24" height="24" fill="#8ac926"/><circle cx="500" cy="272" r="4" fill="#3d2a20"/>`) +
      // The cabin: door, window, the porch lantern
      chimney(680, 298, '#7a5236') +
      house(620, 390, 160, 80, 40, '#a0703f', '#5a3d2b') +
      time('', roofSnow(620, 270, 92, 42)) +
      `<path d="M548 390V326" stroke="#6b4f3a" stroke-width="4"/>` +
      diff(...around(584, 344, 616, 390), door(600, 390, '#2f6e8c'), door(600, 390, '#e63946')) +
      diff(...around(647, 327, 683, 359), pane(650, 330, 30, 26), '') +
      diff(...around(542, 326, 554, 344), `<rect x="542" y="328" width="12" height="16" rx="3" fill="#3d4a55"/><rect x="545" y="332" width="6" height="8" fill="#ffd166"/>`, `<rect x="542" y="328" width="12" height="16" rx="3" fill="#e63946"/><rect x="545" y="332" width="6" height="8" fill="#ffd166"/>`) +
      // The tent's flap, the picnic basket, the canoe rack
      `<path d="M110 480L160 420L210 480Z" fill="#ffb703"/><path d="M160 420V480" stroke="#c98f00" stroke-width="2"/>` +
      diff(...around(150, 444, 170, 480), `<path d="M150 480L160 444L170 480Z" fill="#5a3d2b"/>`, `<path d="M150 480L160 444L170 480Z" fill="#e63946"/>`) +
      `<rect x="260" y="444" width="80" height="6" fill="#8a5a33"/><path d="M270 450L264 482M330 450L336 482M262 466H338" stroke="#8a5a33" stroke-width="4"/>` +
      diff(...around(300, 430, 324, 444), `<path d="M300 444L302 432H322L324 444Z" fill="#c9a26b"/><path d="M304 432q8 -10 16 0" stroke="#8a6a44" stroke-width="2" fill="none"/>`, '') +
      `<path d="M400 490V428M480 490V428M396 440H484M396 466H484" stroke="#6b4f3a" stroke-width="4"/>` + canoe(440, 462, '#2a9d8f') +
      diff(...around(396, 428, 484, 440), canoe(440, 436, '#ffd23f'), canoe(440, 436, '#8338ec')) +
      // The camp sign, the archery target
      `<path d="M534 490V460M586 490V460" stroke="#6b4f3a" stroke-width="4"/>` +
      diff(...around(530, 448, 590, 472), signBoard(560, 460, 60, '#2f6e8c'), signBoard(560, 460, 60, '#ffb703')) +
      `<path d="M748 470L760 440L772 470" stroke="#6b4f3a" stroke-width="4" fill="none"/>` +
      diff(...around(738, 408, 782, 452), target(760, 430, '#e63946'), target(760, 430, '#3a86ff')) +
      // Decor: the same in both seasons, snowed on in winter (grass, butterflies and ducks only in summer)
      cloud(360, 70, 0.45) +
      cloud(600, 50, 0.4) +
      fireLogs(240, 490) +
      time('', snowCap(222, 480, 36)) +
      cat(520, 392, '#5c677d') +
      bird(620, 270) +
      rock(380, 492, 0.6) +
      time('', snowCap(370, 484, 22)) +
      time(duck(340, 360) + butterfly(470, 330) + grass(700, 494) + grass(420, 300), '') +
      // Natural changes: smoke, ice, leaves, a snowman, warm clothes, flowers, birds
      trap(691, 236, 35, '', smoke(677, 264), 'smoke') +
      trap(90, 350, 24, '', `<path d="M70 346l16 8l18 -6" stroke="#9fc4d8" stroke-width="2" fill="none"/>`, 'ice') +
      trap(750, 291, 37, oak(750, 320, 0.6), bareTree(750, 320, 0.55), 'leaves') +
      trap(60, 448, 50, '', snowman(60, 490), 'snowman') +
      trap(640, 454, 37, person(640, 490, '#e76f51', true), winterPerson(640, 490, '#3a86ff', true, '#ffd23f'), 'clothes') +
      trap(712, 470, 27, flowers(712, 480, '#ff6b8b'), '', 'flowers') +
      trap(240, 120, 35, birds(240, 120), '', 'birds') +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 560, 150],
        ['birds', 120, 200],
      ]) +
      time('', snowfall(240, 240, 46))
    )
  },
})
