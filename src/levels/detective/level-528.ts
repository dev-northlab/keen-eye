// "The ski lodge mystery", scene 3 — the yard at night: the innkeeper's window dark (she was asleep),
// no smoke from the chimney, an icicle broken off, the lantern out, the shovel gone, ski tracks from
// the door, a red mitten on the fence, the snowman's carrot nose gone, the bird feeder empty and huge
// furry footprints walking past the fence and away.
import { detectiveLevel } from '../helpers.ts'
import { fence, fir, lantern, snowGround } from './shapes.ts'

const STARS: [number, number][] = [[40, 30], [120, 80], [200, 24], [420, 40], [480, 110], [560, 30], [640, 80], [760, 50], [700, 140], [520, 180]]

const icicle = (x: number, length: number) => `<path d="M${x} 160h6l-3 ${length}Z" fill="#dff1fb"/>`

/** Yeti footprint: a big oval sole and four round toes, toes up. Bounds: x ±14, y from −26 to +18. */
const yetiPrint = (x: number, y: number) =>
  `<g fill="#9fb6cc"><ellipse cx="${x}" cy="${y + 2}" rx="12" ry="16"/>${[-9, -3, 3, 9].map((dx) => `<circle cx="${x + dx}" cy="${y - 20}" r="4.4"/>`).join('')}</g>`

/** Red mitten hanging on the fence picket at x 600. Bounds: x 596–620, y 252–276. */
const mitten = () => `<path d="M600 254H614V272Q614 276 607 276Q600 276 600 270ZM600 262q-4 -2 -4 4t4 4Z" fill="#e5484d"/><rect x="599" y="252" width="16" height="5" rx="2" fill="#fff"/>`

/** Snow shovel stuck in the snow by the door. Bounds: x 424–446, y 250–330. */
const shovel = () => `<path d="M434 252V306" stroke="#a8743f" stroke-width="5"/><rect x="428" y="250" width="14" height="5" rx="2" fill="#2b2b38"/><path d="M424 306H446L442 330H428Z" fill="#e5484d"/>`

export default detectiveLevel({
  id: 528,
  case: 'lodge',
  title: 'lodgeYard',
  parTimeSec: 122,
  scene: ({ clue }) =>
    `<rect width="800" height="500" fill="#22305a"/>` +
    STARS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#fff3b0"/>`).join('') +
    `<circle cx="620" cy="70" r="26" fill="#fff3b0"/>` +
    fir(700, 300, 1.2) +
    fir(780, 310, 0.9) +
    fir(560, 300, 0.8) +
    snowGround(330) +
    // The lodge
    `<rect x="320" y="40" width="30" height="80" fill="#8a5a2b"/><rect x="316" y="34" width="38" height="10" fill="#f4f8fc"/>` +
    clue('chimneySmoke', 336, 21, 20, `<path d="M335 32q-8 -6 0 -12t0 -12M344 30q6 -6 0 -12" stroke="#dfe3ea" stroke-width="4" fill="none" stroke-linecap="round"/>`, '') +
    `<path d="M30 164L230 56L430 164Z" fill="#6b4a2b"/><path d="M30 164L230 56L430 164L418 168L230 70L42 168Z" fill="#f4f8fc"/>` +
    `<rect x="50" y="160" width="360" height="170" fill="#a8743f"/><path d="${Array.from({ length: 5 }, (_, i) => `M50 ${190 + i * 30}H410`).join('')}" stroke="#8a5a2b" stroke-width="3"/>` +
    `<rect x="44" y="152" width="372" height="12" rx="5" fill="#f4f8fc"/>` +
    `<circle cx="230" cy="115" r="22" fill="#6b4a2b"/>` +
    clue(
      'innLightOut',
      230,
      115,
      22,
      `<circle cx="230" cy="115" r="17" fill="#ffe680"/><path d="M230 98V132M213 115H247" stroke="#6b4a2b" stroke-width="3"/>`,
      `<circle cx="230" cy="115" r="17" fill="#1f2a4a"/><path d="M230 98V132M213 115H247" stroke="#6b4a2b" stroke-width="3"/>`,
    ) +
    [60, 88, 116, 144, 200, 228, 256, 284, 312, 340, 368, 396].map((x, i) => icicle(x, i % 2 ? 16 : 24)).join('') +
    clue('icicleBroken', 175, 176, 20, icicle(172, 26), icicle(172, 8) + `<path d="M168 190l6 -2l2 6Z" fill="#dff1fb"/>`) +
    [80, 180].map((x) => `<rect x="${x}" y="210" width="70" height="60" rx="4" fill="#ffe680"/><path d="M${x + 35} 210V270M${x} 240H${x + 70}" stroke="#6b4a2b" stroke-width="4"/>`).join('') +
    `<rect x="290" y="230" width="50" height="100" fill="#5e3b1a"/><circle cx="330" cy="282" r="4" fill="#f2c14e"/><path d="M360 226h6" stroke="#2b2b38" stroke-width="3"/>` +
    clue('lanternOut', 366, 248, 24, lantern(366, 226, true), lantern(366, 226, false)) +
    clue('shovelGone', 435, 290, 42, shovel(), '') +
    // The yard
    fence(440, 800, 330, '#a8743f') +
    clue('redMitten', 608, 264, 20, '', mitten()) +
    `<path d="M760 238V330" stroke="#6b4a2b" stroke-width="5"/><path d="M740 238L760 222L780 238Z" fill="#b83236"/><rect x="744" y="248" width="32" height="5" fill="#8a5a2b"/>` +
    clue('birdFeeder', 760, 244, 20, `<g fill="#c9953f">${[750, 756, 762, 768].map((x, i) => `<circle cx="${x}" cy="${245 - (i % 2) * 2}" r="2.4"/>`).join('')}</g>`, '') +
    // Snowman
    `<g fill="#fff" stroke="#c7d8e8" stroke-width="2"><circle cx="500" cy="440" r="34"/><circle cx="500" cy="392" r="24"/><circle cx="500" cy="356" r="18"/></g>` +
    `<circle cx="494" cy="352" r="2.4" fill="#2b2b38"/><circle cx="506" cy="352" r="2.4" fill="#2b2b38"/><path d="M492 362q8 5 16 0" stroke="#2b2b38" stroke-width="2" fill="none"/>` +
    `<path d="M484 342h32l-4 -18h-24Z" fill="#2b2b38"/><path d="M478 392L446 372M522 392L556 374" stroke="#6b4a2b" stroke-width="4" stroke-linecap="round"/>` +
    clue('snowmanNose', 516, 356, 20, `<path d="M506 353L528 357L506 360Z" fill="#f2994a"/>`, '') +
    clue('skiTracks', 408, 425, 58, '', `<path d="M356 446Q400 430 460 418M356 432Q400 416 460 404" stroke="#a9bfd4" stroke-width="3" fill="none"/>`) +
    clue('yetiPrints', 680, 425, 52, '', yetiPrint(646, 438) + yetiPrint(684, 420) + yetiPrint(716, 438)),
})
