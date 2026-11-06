// Allotment gardens: garden plots in summer and in winter, among the ten hardest of "time" (hidden until released,
// levels/upcoming.ts). Two sheds, a greenhouse with tomatoes, vegetable beds, a scarecrow, a wheelbarrow, a
// watering can, a compost bin, a bird house, a garden gnome and the gardener.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, bench, bird, birdHouse, bucket, bush, butterfly, cat, chimney, cloud, crate, door, fence, flowers, grass, hedgehog, house, icicles, logPile, oak, bareTree, pane, person, pond, rock, roofSnow, signBoard, sky, smoke, snowCap, snowfall, snowman, squirrel, stump, winterPerson, winterSky } from './shapes.ts'

/** Scarecrow without its hat; (x, y) = foot of its pole. Bounds: x ±26, y from −64 to 0. */
const scarecrow = (x: number, y: number) =>
  `<path d="M${x} ${y}V${y - 50}M${x - 24} ${y - 40}H${x + 24}" stroke="#8a5a33" stroke-width="4"/><path d="M${x - 16} ${y - 44}H${x + 16}L${x + 12} ${y - 14}H${x - 12}Z" fill="#3a86ff"/>` +
  `<path d="M${x - 26} ${y - 40}l-4 6M${x + 26} ${y - 40}l4 6" stroke="#e9c46a" stroke-width="3"/><circle cx="${x}" cy="${y - 52}" r="9" fill="#d9c08f"/><circle cx="${x - 3}" cy="${y - 53}" r="1.4" fill="#222"/><circle cx="${x + 3}" cy="${y - 53}" r="1.4" fill="#222"/>`

/** Wheelbarrow facing left, without its tray; (x, y) = ground under the wheel. Bounds: x from −10 to +50, y from −24 to 0. */
const barrow = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y - 7}" r="7" fill="#2b2b2b"/><path d="M${x} ${y - 7}L${x + 46} ${y - 18}M${x + 30} ${y - 12}V${y}" stroke="#5c677d" stroke-width="3"/>`

/** Garden gnome; (x, y) = bottom center. Bounds: x ±9, y from −30 to 0. */
const gnome = (x: number, y: number) =>
  `<path d="M${x - 8} ${y}L${x - 6} ${y - 14}H${x + 6}L${x + 8} ${y}Z" fill="#3a86ff"/><path d="M${x - 6} ${y - 14}q6 8 12 0Z" fill="#f4f1e8"/><circle cx="${x}" cy="${y - 17}" r="4" fill="#f2d29b"/><path d="M${x - 6} ${y - 18}L${x} ${y - 30}L${x + 6} ${y - 18}Z" fill="#e63946"/>`

export default svgLevel({
  id: 232,
  chapter: 'time',
  title: 'allotmentGardens',
  pair: 'summer-winter',
  parTimeSec: 160,
  scene: ({ diff, time, trap, extra, anim }) => {
    let beds = ''
    let bedSnow = ''
    for (const x0 of [230, 380]) {
      beds += `<rect x="${x0}" y="350" width="80" height="16" rx="4" fill="#7a4e2d"/>`
      for (let i = 0; i < 4; i++) beds += `<circle cx="${x0 + 12 + i * 19}" cy="348" r="7" fill="#7fb24a"/>`
      bedSnow += snowCap(x0, 344, 80)
    }
    return (
      time(sky(false, 260), winterSky(260)) +
      `<rect y="260" width="800" height="240" fill="${time('#8fc25a', '#f4f8fb')}"/>` +
      fence(0, 37, 270) +
      // Shed 1: door, window, chimney
      chimney(165, 250, '#7a5236') +
      house(130, 330, 120, 70, 30, '#c1622f', '#5a3d2b') +
      time('', roofSnow(130, 230, 72, 32)) +
      diff(...around(84, 284, 116, 330), door(100, 330, '#2f6e8c'), door(100, 330, '#e63946')) +
      diff(...around(137, 277, 173, 307), pane(140, 280, 30, 24), '') +
      // The greenhouse: tomatoes, the roof vent
      `<path d="M320 330V250L390 226L460 250V330Z" fill="#bde3f2" fill-opacity="0.6"/><path d="M320 330V250L390 226L460 250V330M355 238V330M390 226V330M425 238V330M320 290H460" stroke="#f4f1e8" stroke-width="3" fill="none"/>` +
      `<path d="M360 330V290M360 306l-8 -6M360 300l8 -8" stroke="#3f9a5a" stroke-width="3"/>` +
      diff(...around(352, 290, 370, 308), `<circle cx="356" cy="296" r="4" fill="#e63946"/><circle cx="366" cy="300" r="4" fill="#e63946"/><circle cx="358" cy="304" r="4" fill="#e63946"/>`, `<circle cx="356" cy="296" r="4" fill="#8ac926"/><circle cx="366" cy="300" r="4" fill="#8ac926"/><circle cx="358" cy="304" r="4" fill="#8ac926"/>`) +
      diff(...around(408, 228, 432, 244), `<path d="M410 240L430 230V236L412 244Z" fill="#bde3f2" stroke="#f4f1e8" stroke-width="2"/>`, `<path d="M410 240L430 234V238L412 244Z" fill="#bde3f2" stroke="#f4f1e8" stroke-width="2"/>`) +
      // Shed 2: the sign in its gable
      house(620, 330, 110, 70, 28, '#81b29a', '#4f7f68') +
      time('', roofSnow(620, 232, 67, 30)) +
      door(600, 330, '#4f7f68') +
      diff(...around(600, 238, 640, 262), signBoard(620, 250, 40, '#ffb703'), signBoard(620, 250, 40, '#8338ec')) +
      // Beds, the scarecrow's hat, the wheelbarrow's tray, the watering can, the compost bin, the bird house, the gnome
      beds + time('', bedSnow) +
      scarecrow(520, 420) +
      diff(...around(506, 350, 534, 362), `<path d="M506 362H534L530 358Q520 346 510 358Z" fill="#a0703f"/>`, `<path d="M506 362H534L530 358Q520 346 510 358Z" fill="#2b2b2b"/>`) +
      barrow(230, 460) +
      diff(...around(226, 436, 276, 452), `<path d="M226 436H276L268 452H234Z" fill="#2a9d8f"/>`, `<path d="M226 436H276L268 452H234Z" fill="#e63946"/>`) +
      diff(...around(314, 458, 348, 478), `<path d="M318 478V462H338V478Z" fill="#3fa46f"/><path d="M338 466L348 458" stroke="#3fa46f" stroke-width="3"/><path d="M318 464q-6 6 0 12" stroke="#3fa46f" stroke-width="2" fill="none"/>`, '') +
      `<rect x="462" y="444" width="36" height="34" fill="#4f7f68"/><path d="M462 456h36M462 468h36" stroke="#3d6b55" stroke-width="2"/>` +
      diff(...around(458, 438, 502, 444), `<rect x="458" y="438" width="44" height="6" rx="2" fill="#2b2b2b"/>`, `<rect x="458" y="438" width="44" height="6" rx="2" fill="#e76f51"/>`) +
      birdHouse(180, 480, '#e07a5f') +
      diff(...around(168, 410, 192, 434), `<rect x="168" y="410" width="24" height="24" fill="#e07a5f"/><circle cx="180" cy="422" r="4" fill="#3d2a20"/>`, `<rect x="168" y="410" width="24" height="24" fill="#3a86ff"/><circle cx="180" cy="422" r="4" fill="#3d2a20"/>`) +
      diff(...around(51, 446, 69, 476), gnome(60, 476), '') +
      // Decor: the same in both seasons, snowed on in winter (grass and butterflies only in summer)
      cloud(300, 70, 0.5) +
      cloud(560, 60, 0.5) +
      cloud(760, 120, 0.35) +
      bird(250, 228) +
      bird(520, 228, '#e63946') +
      squirrel(480, 256) +
      bush(520, 300, 0.7) +
      time('', snowCap(506, 284, 28)) +
      stump(40, 350) +
      time('', snowCap(26, 330, 28)) +
      logPile(200, 362) +
      time('', snowCap(184, 334, 32)) +
      bench(700, 382) +
      time('', snowCap(670, 354, 60)) +
      cat(560, 320, '#f08c3a') +
      crate(30, 400, 26) +
      time('', snowCap(17, 374, 26)) +
      bucket(300, 404) +
      hedgehog(320, 424) +
      rock(440, 334, 0.6) +
      time(butterfly(290, 300) + grass(560, 490) + grass(120, 496), '') +
      // Natural changes: smoke, icicles, leaves, ice, a snowman, flowers, warm clothes
      trap(176, 186, 33, '', smoke(162, 214), 'smoke') +
      trap(662, 268, 20, '', icicles(650, 674, 260), 'icicles') +
      trap(745, 259, 52, oak(745, 300, 0.85), bareTree(745, 300, 0.8), 'leaves') +
      trap(620, 444, 42, pond(620, 444, 40, 10, false), pond(620, 444, 40, 10, true), 'ice') +
      trap(740, 448, 50, '', snowman(740, 490), 'snowman') +
      trap(560, 389, 27, flowers(560, 400, '#ff6b8b'), '', 'flowers') +
      trap(400, 444, 37, person(400, 480, '#2a9d8f'), winterPerson(400, 480, '#ffb703', false, '#3a86ff'), 'clothes') +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 440, 120],
        ['birds', 120, 90],
      ]) +
      time('', snowfall(232, 260, 46))
    )
  },
})
