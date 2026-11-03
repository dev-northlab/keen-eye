// "The ski lodge mystery", scene 4 — the chairlift at dawn: a light on in the operator's hut, snow
// swept off one chair, a pennant gone, the trail sign turned, the snow cannon off, the barrier raised,
// round ski-pole holes in the snow, a cup left on the bench, a pile of snowballs and a dropped ski pass.
import { detectiveLevel } from '../helpers.ts'
import { fir, snowGround } from './shapes.ts'

const FLAGS = ['#e5484d', '#f2b632', '#3a6ea5', '#3fbf5f']

/** Cable from the station wheel up to the right edge; y on the cable at x. */
const cableY = (x: number) => 140 - (x - 240) * 0.232

/** Lift chair hanging from the cable at x; its seat top at y 180. */
const chair = (x: number) =>
  `<path d="M${x} ${cableY(x)}V172" stroke="#5b6b7a" stroke-width="3"/><path d="M${x - 22} 182H${x + 22}V190H${x - 22}ZM${x - 22} 182V160" stroke="#3a6ea5" stroke-width="5" fill="#3a6ea5"/>`

/** Trail sign board on the post at 470: pointing right (A) or turned to the left (B). Bounds: x 440–500, y 258–282. */
const sign = (right: boolean) =>
  `<path d="${right ? 'M440 258H488L500 270L488 282H440Z' : 'M500 258H452L440 270L452 282H500Z'}" fill="#f2b632" stroke="#8a5a2b" stroke-width="2"/>` +
  `<path d="${right ? 'M450 270h28' : 'M462 270h28'}" stroke="#2b2b38" stroke-width="3"/>`

/** Barrier arm at the station entrance, pivot (280, 300): down (A) or raised (B). Bounds: x 276–364, y 216–304. */
const barrier = (down: boolean) =>
  `<g transform="rotate(${down ? 0 : -90} 280 300)"><rect x="280" y="296" width="80" height="8" fill="#fff"/>${[292, 316, 340].map((x) => `<rect x="${x}" y="296" width="12" height="8" fill="#e5484d"/>`).join('')}</g>`

const hole = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="4" fill="#8aa5bf"/><circle cx="${x}" cy="${y}" r="7" fill="none" stroke="#c7d8e8" stroke-width="2"/>`

const snowball = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="9" fill="#fff" stroke="#c7d8e8" stroke-width="1.6"/>`

export default detectiveLevel({
  id: 529,
  case: 'lodge',
  title: 'lodgeChairlift',
  parTimeSec: 124,
  scene: ({ clue, anim }) =>
    `<rect width="800" height="500" fill="#bfe0f5"/><circle cx="640" cy="60" r="30" fill="#fff3b0"/>` +
    `<path d="M0 340L150 150L260 260L420 90L600 280L720 170L800 230V340Z" fill="#dfe8f2"/><path d="M420 90L380 140L400 136L420 150L440 134L460 140ZM150 150L126 180L150 172L170 184Z" fill="#fff"/>` +
    fir(640, 340, 0.7) +
    fir(780, 340, 0.9) +
    snowGround(340) +
    // Station
    `<rect x="40" y="160" width="220" height="180" fill="#8a5a2b"/><rect x="32" y="150" width="236" height="14" rx="5" fill="#f4f8fc"/>` +
    `<circle cx="250" cy="140" r="30" fill="none" stroke="#5b6b7a" stroke-width="8"/><circle cx="250" cy="140" r="6" fill="#5b6b7a"/>` +
    `<rect x="100" y="200" width="90" height="70" rx="4" fill="#5e3b1a"/>` +
    clue('hutLightOn', 145, 235, 44, `<rect x="108" y="208" width="74" height="54" fill="#3a4a6a"/>`, `<rect x="108" y="208" width="74" height="54" fill="#ffe680"/><path d="M118 254l20 -36M138 254l16 -28" stroke="#fff" stroke-opacity="0.6" stroke-width="3"/>`) +
    `<path d="M145 208V262" stroke="#5e3b1a" stroke-width="4"/>` +
    // Cable and chairs
    `<path d="M240 ${cableY(240)}L800 ${cableY(800).toFixed(1)}" stroke="#2b2b38" stroke-width="3"/>` +
    chair(380) +
    clue('snowOffSeat', 380, 176, 24, `<path d="M358 182Q360 170 370 172Q380 164 390 172Q402 170 402 182Z" fill="#fff" stroke="#c7d8e8" stroke-width="1.4"/>`, '') +
    `<path d="M520 ${cableY(520).toFixed(1)}V124" stroke="#5b6b7a" stroke-width="3"/><path d="M500 134h40v6h-40ZM500 134v-18" stroke="#3a6ea5" stroke-width="5" fill="#3a6ea5"/>` +
    // Pennants from the station to a pole
    `<path d="M440 150V340" stroke="#8a8f99" stroke-width="5"/><path d="M262 132L440 152" stroke="#5e3b1a" stroke-width="1.6"/>` +
    [305, 330, 355, 380, 405].map((x, i) => `<path d="M${x} ${132 + (x - 262) * 0.112}h16l-8 18Z" fill="${FLAGS[i % 4]}"/>`).join('') +
    clue('pennantGone', 288, 143, 20, `<path d="M280 ${(132 + 18 * 0.112).toFixed(1)}h16l-8 18Z" fill="#8e6bbf"/>`, '') +
    // Entrance barrier and the trail sign
    `<rect x="272" y="290" width="16" height="50" fill="#5b6b7a"/>` +
    clue('barrierUp', 320, 260, 60, barrier(true), barrier(false)) +
    `<path d="M470 258V350" stroke="#8a5a2b" stroke-width="6"/>` +
    clue('signTurned', 470, 270, 34, sign(true), sign(false)) +
    // Snow cannon
    `<path d="M690 340L700 300L712 340M700 300L690 290" stroke="#5b6b7a" stroke-width="5"/><path d="M684 300L728 252L740 264L696 312Z" fill="#f2b632"/><circle cx="734" cy="258" r="10" fill="#5b6b7a"/>` +
    clue('snowCannonOff', 756, 228, 36, `<g fill="#fff" stroke="#a9bfd4" stroke-width="1.2">${[[746, 246], [752, 236], [760, 242], [764, 228], [770, 236], [772, 220], [758, 226], [776, 212]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4"/>`).join('')}</g>`, '') +
    anim({ type: 'bob', dx: 0, dy: 4, period: 3 }, `<path d="M60 70q10 -8 20 0q10 -8 20 0" stroke="#2b2b38" stroke-width="2.4" fill="none"/>`) +
    // Bench and the snow in front
    `<rect x="90" y="370" width="140" height="10" rx="3" fill="#8a5a2b"/><path d="M104 380V400M216 380V400" stroke="#6b4a2b" stroke-width="6"/>` +
    clue('cupLeft', 196, 360, 20, '', `<path d="M188 352H204L201 370H191Z" fill="#fff" stroke="#c9c2b6" stroke-width="1.2"/><rect x="189" y="358" width="14" height="5" fill="#e5484d"/>`) +
    clue('skiPassDropped', 262, 450, 22, '', `<path d="M248 440q14 -12 28 0" stroke="#3a6ea5" stroke-width="2.4" fill="none"/><rect x="252" y="444" width="22" height="16" rx="3" fill="#f2b632"/><rect x="256" y="448" width="8" height="8" fill="#fff"/>`) +
    clue('snowballs', 404, 440, 34, '', snowball(386, 450) + snowball(404, 452) + snowball(422, 448) + snowball(394, 436) + snowball(412, 436) + snowball(403, 422)) +
    clue('polePrints', 560, 431, 46, '', hole(530, 420) + hole(550, 440) + hole(572, 422) + hole(592, 442)),
})
