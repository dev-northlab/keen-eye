// Windmill polder: windmills along a canal in summer and in winter, among the ten hardest of "time" (hidden until
// released, levels/upcoming.ts). Two windmills, a drawbridge with its lantern, a barge with crates and a flag, a
// farmhouse with shutters, a mailbox and a signpost; the canal freezes in winter.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, bareTree, barrel, bench, bike, bird, bush, butterfly, cat, chimney, cloud, door, duck, flowers, grass, house, icicles, mailbox, oak, pane, person, pine, pineSnow, rabbit, roofSnow, signpost, sky, smoke, snowCap, snowfall, snowman, stump, winterPerson, winterSky } from './shapes.ts'

/** Windmill sails around the hub (x, y), turned by `deg`; the first sail's cloth can be left out. Bounds: radius 92. */
const sails = (x: number, y: number, deg: number, skipFirst = false) => {
  let out = ''
  for (let i = 0; i < 4; i++) {
    out += `<g transform="rotate(${deg + i * 90} ${x} ${y})"><path d="M${x} ${y}V${y - 90}" stroke="#5a3d2b" stroke-width="4"/>`
    if (!(skipFirst && i === 0)) out += `<rect x="${x + 1}" y="${y - 88}" width="16" height="68" fill="#f4f1e8" stroke="#8a6a44" stroke-width="1.5"/>`
    out += '</g>'
  }
  return out + `<circle cx="${x}" cy="${y}" r="6" fill="#3d4a55"/>`
}
/** Cloth of the first sail of `sails(x, y, deg)` in `color`. */
const sailCloth = (x: number, y: number, deg: number, color: string) =>
  `<rect x="${x + 1}" y="${y - 88}" width="16" height="68" fill="${color}" stroke="#8a6a44" stroke-width="1.5" transform="rotate(${deg} ${x} ${y})"/>`

export default svgLevel({
  id: 236,
  chapter: 'time',
  title: 'windmillPolder',
  pair: 'summer-winter',
  parTimeSec: 165,
  scene: ({ diff, time, trap, extra, anim }) => {
    let crates = ''
    for (const x of [190, 212]) crates += `<rect x="${x}" y="322" width="20" height="18" fill="#c68b4e" stroke="#8a5a33" stroke-width="1.5"/>`
    return (
      time(sky(false, 250), winterSky(250)) +
      `<rect y="250" width="800" height="250" fill="${time('#8fc25a', '#f4f8fb')}"/>` +
      // The canal, its far bank
      `<rect y="330" width="800" height="42" fill="${time('#4aa3c7', '#cfe6f2')}"/><path d="M0 330H800M0 372H800" stroke="${time('#6b8f4a', '#c9d6df')}" stroke-width="4"/>` +
      time(`<path d="M600 350h40M700 360h30M40 345h30" stroke="#ffffff" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round"/>`, `<path d="M600 344l20 10l16 -6M700 362l14 -8M40 350l18 6" stroke="#ffffff" stroke-width="2" fill="none"/>`) +
      // Windmill 1: a sail's cloth, the door, the window
      `<path d="M112 322L124 192H156L168 322Z" fill="#9c4a3a"/><path d="M120 194Q140 160 160 194Z" fill="#3d4a55"/>` + sails(140, 180, -20, true) +
      diff(...around(105, 91, 155, 161), sailCloth(140, 180, -20, '#f4f1e8'), sailCloth(140, 180, -20, '#e63946')) +
      time('', snowCap(118, 186, 44)) +
      diff(...around(130, 292, 150, 322), `<path d="M130 322V300a10 10 0 0 1 20 0V322Z" fill="#2f6e8c"/>`, `<path d="M130 322V300a10 10 0 0 1 20 0V322Z" fill="#ffb703"/>`) +
      diff(...around(144, 226, 156, 240), `<rect x="144" y="226" width="12" height="14" fill="#bde3f2" stroke="#f4f1e8" stroke-width="2"/>`, '') +
      // Windmill 2: the cap, the gallery
      `<path d="M572 322L584 200H616L628 322Z" fill="#6b4f3a"/>` +
      diff(...around(566, 246, 634, 256), `<rect x="566" y="246" width="68" height="10" fill="#8a6a44"/><path d="M572 246V238M584 246V238M596 246V238M608 246V238M620 246V238M632 246V238M566 238H634" stroke="#8a6a44" stroke-width="2"/>`, '') +
      diff(...around(580, 168, 620, 202), `<path d="M580 202Q600 168 620 202Z" fill="#3d4a55"/>`, `<path d="M580 202Q600 168 620 202Z" fill="#2a9d8f"/>`) +
      sails(600, 188, 25) +
      // The drawbridge and its lantern
      `<path d="M400 330V270M480 330V270" stroke="#f4f1e8" stroke-width="8"/><rect x="396" y="266" width="88" height="10" fill="#f4f1e8"/><rect x="380" y="322" width="120" height="8" fill="#f4f1e8"/>` +
      `<path d="M404 276L420 322M476 276L460 322" stroke="#5c677d" stroke-width="1.5"/><path d="M480 266V258" stroke="#3d4a55" stroke-width="2"/>` +
      diff(...around(474, 250, 486, 264), `<rect x="474" y="250" width="12" height="14" rx="2" fill="#3d4a55"/><rect x="477" y="253" width="6" height="8" fill="#ffd166"/>`, `<rect x="474" y="250" width="12" height="14" rx="2" fill="#e63946"/><rect x="477" y="253" width="6" height="8" fill="#ffd166"/>`) +
      // The barge: a crate, the flag
      `<path d="M170 340H320L310 362H180Z" fill="#3d4a55"/><rect x="280" y="318" width="36" height="22" fill="#e9c46a"/><rect x="290" y="324" width="12" height="8" fill="#bde3f2"/>` + crates +
      diff(...around(234, 322, 254, 340), `<rect x="234" y="322" width="20" height="18" fill="#c68b4e" stroke="#8a5a33" stroke-width="1.5"/>`, '') +
      `<path d="M318 318V296" stroke="#5c677d" stroke-width="2"/>` +
      diff(...around(318, 296, 336, 306), `<rect x="318" y="296" width="18" height="10" fill="#e63946"/><path d="M318 301h18" stroke="#ffffff" stroke-width="3"/>`, `<rect x="318" y="296" width="18" height="10" fill="#3a86ff"/><path d="M318 301h18" stroke="#ffffff" stroke-width="3"/>`) +
      time('', snowCap(280, 314, 36)) +
      // The farmhouse: shutters, door
      chimney(668, 354, '#7a5236') +
      house(700, 440, 120, 70, 34, '#c1622f', '#5a3d2b') +
      time('', roofSnow(700, 336, 72, 36)) +
      pane(660, 388, 24, 24) +
      diff(...around(652, 388, 692, 412), `<rect x="652" y="388" width="6" height="24" fill="#2a9d8f"/><rect x="686" y="388" width="6" height="24" fill="#2a9d8f"/>`, `<rect x="652" y="388" width="6" height="24" fill="#e63946"/><rect x="686" y="388" width="6" height="24" fill="#e63946"/>`) +
      diff(...around(724, 394, 756, 440), door(740, 440, '#2f6e8c'), door(740, 440, '#ffb703')) +
      // The mailbox, the signpost
      diff(...around(566, 420, 594, 470), mailbox(580, 470, '#3a86ff'), mailbox(580, 470, '#e63946')) +
      diff(...around(30, 386, 90, 450), signpost(60, 450, 1), signpost(60, 450, -1)) +
      // Decor: the same in both seasons, snowed on in winter (grass, butterflies and ducks only in summer)
      cloud(300, 60, 0.5) +
      cloud(500, 90, 0.45) +
      cloud(740, 60, 0.4) +
      bird(170, 194) +
      bench(520, 302) +
      time('', snowCap(490, 274, 60)) +
      barrel(40, 320) +
      time('', snowCap(27, 288, 26)) +
      stump(780, 482) +
      time('', snowCap(766, 462, 28)) +
      cat(660, 488, '#5c677d') +
      bike(760, 322, '#ffb703') +
      rabbit(110, 490) +
      bush(262, 492, 0.6) +
      time('', snowCap(250, 478, 24)) +
      pine(780, 250, 0.6) +
      time('', pineSnow(780, 250, 0.6)) +
      time(duck(540, 350) + butterfly(240, 420) + grass(420, 494) + grass(620, 494), '') +
      // Natural changes: leaves, ice, a snowman, flowers, smoke, icicles, warm clothes
      trap(320, 216, 41, oak(320, 250, 0.7), bareTree(320, 250, 0.65), 'leaves') +
      trap(120, 351, 22, '', `<path d="M104 346l14 8l14 -6" stroke="#9fc4d8" stroke-width="2" fill="none"/>`, 'ice') +
      trap(360, 448, 50, '', snowman(360, 490), 'snowman') +
      trap(200, 449, 27, flowers(200, 460, '#ff6b8b'), '', 'flowers') +
      trap(679, 292, 35, '', smoke(665, 320), 'smoke') +
      trap(420, 284, 21, '', icicles(404, 436, 276), 'icicles') +
      trap(480, 452, 37, person(480, 488, '#e76f51'), winterPerson(480, 488, '#3a86ff', false, '#ffd23f'), 'clothes') +
      // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 420, 120],
        ['birds', 230, 60],
      ]) +
      time('', snowfall(236, 250, 46))
    )
  },
})
