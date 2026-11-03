// "The night train mystery", scene 5 — the boy's sleeping compartment: pearls mixed in with his
// marbles, the blanket half off the upper bunk, the teddy gone, a comic on the floor, one slipper
// missing, the cocoa cup empty, the night light on, the clock stopped and the toy train off its track.
import { detectiveLevel } from '../helpers.ts'
import { windowBox } from './shapes.ts'

const WALL_STARS: [number, number][] = [[560, 40], [620, 90], [720, 60], [770, 120], [540, 200], [600, 250], [760, 230], [250, 40], [120, 60]]

/** Clock hands at (650, 140): `h` and `m` as angles in degrees from twelve. Bounds: ±18. */
const hands = (h: number, m: number) =>
  `<path d="M650 140L${(650 + Math.sin((h * Math.PI) / 180) * 10).toFixed(1)} ${(140 - Math.cos((h * Math.PI) / 180) * 10).toFixed(1)}" stroke="#2b2b38" stroke-width="3.4" stroke-linecap="round"/>` +
  `<path d="M650 140L${(650 + Math.sin((m * Math.PI) / 180) * 16).toFixed(1)} ${(140 - Math.cos((m * Math.PI) / 180) * 16).toFixed(1)}" stroke="#2b2b38" stroke-width="2.4" stroke-linecap="round"/>`

const teddy = () =>
  `<g fill="#b5835a"><circle cx="70" cy="290" r="5"/><circle cx="90" cy="290" r="5"/><circle cx="80" cy="300" r="12"/><ellipse cx="80" cy="322" rx="14" ry="13"/></g>` +
  `<ellipse cx="80" cy="304" rx="5" ry="4" fill="#e8d2b4"/><circle cx="76" cy="298" r="1.6" fill="#2b2b38"/><circle cx="84" cy="298" r="1.6" fill="#2b2b38"/>`

const comic = (x: number, y: number) =>
  `<g transform="rotate(12 ${x} ${y})"><rect x="${x - 20}" y="${y - 14}" width="40" height="28" fill="#f2b632"/><rect x="${x - 16}" y="${y - 10}" width="15" height="10" fill="#e5484d"/><rect x="${x + 2}" y="${y - 10}" width="14" height="20" fill="#5b8db8"/>` +
  `<rect x="${x - 16}" y="${y + 2}" width="15" height="8" fill="#3fbf5f"/></g>`

const slipper = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="12" ry="6" fill="#5b8db8"/><path d="M${x - 2} ${y - 6}a8 6 0 0 1 12 6" fill="#8ab6dc"/>`

/** Toy engine standing on the track at (642, 444). Bounds: x 626–658, y 412–446. */
const engine = () =>
  `<rect x="628" y="424" width="28" height="16" rx="2" fill="#e5484d"/><rect x="644" y="414" width="12" height="12" fill="#b83236"/><rect x="632" y="416" width="6" height="8" fill="#2b2b38"/>` +
  `<g fill="#2b2b38"><circle cx="634" cy="442" r="4"/><circle cx="650" cy="442" r="4"/></g>`

export default detectiveLevel({
  id: 525,
  case: 'train',
  title: 'trainSleeper',
  parTimeSec: 114,
  scene: ({ clue }) =>
    `<rect width="800" height="400" fill="#3f6f99"/>` +
    WALL_STARS.map(([x, y]) => `<path d="M${x} ${y - 6}l2 4l5 1l-4 3l1 5l-4 -3l-4 3l1 -5l-4 -3l5 -1Z" fill="#f2c14e" fill-opacity="0.6"/>`).join('') +
    `<rect y="400" width="800" height="100" fill="#6b4a2b"/><rect x="80" y="420" width="640" height="70" rx="10" fill="#4a6b8a"/>` +
    // Bunk beds with a ladder
    `<path d="M30 80V400M330 80V400" stroke="#8a5a2b" stroke-width="10"/><rect x="30" y="190" width="300" height="12" fill="#8a5a2b"/><rect x="30" y="352" width="300" height="12" fill="#8a5a2b"/>` +
    `<rect x="36" y="170" width="290" height="22" rx="6" fill="#fff"/><rect x="40" y="154" width="60" height="20" rx="8" fill="#f5ecd8"/><rect x="100" y="164" width="210" height="28" rx="6" fill="#5b8db8"/>` +
    clue('blanketFallen', 314, 200, 40, '', `<path d="M300 164L328 170L326 236Q312 232 300 226Z" fill="#5b8db8"/><path d="M306 190l16 2M304 210l18 4" stroke="#4a7aa8" stroke-width="3"/>`) +
    `<rect x="36" y="330" width="290" height="24" rx="6" fill="#fff"/><rect x="40" y="312" width="64" height="22" rx="8" fill="#f5ecd8"/><rect x="110" y="326" width="210" height="28" rx="6" fill="#e8913a"/>` +
    clue('teddyGone', 80, 310, 28, teddy(), '') +
    `<path d="M346 150V400M372 150V400" stroke="#a8743f" stroke-width="5"/>` +
    [180, 220, 260, 300, 340, 380].map((y) => `<path d="M346 ${y}H372" stroke="#a8743f" stroke-width="4"/>`).join('') +
    // Window and the little table
    windowBox(390, 90, 120, 120, '#1f2a4a') +
    `<circle cx="470" cy="124" r="11" fill="#fff3b0"/><path d="M398 202V176Q440 160 502 180V202Z" fill="#14203a"/>` +
    `<rect x="440" y="262" width="12" height="138" fill="#5e3b1a"/><rect x="384" y="256" width="124" height="10" rx="3" fill="#8a5a2b"/>` +
    `<path d="M400 256V236H420V256Z" fill="#fff"/><path d="M420 240q8 0 8 6t-8 6" stroke="#fff" stroke-width="3" fill="none"/>` +
    clue('cupEmpty', 410, 238, 22, `<ellipse cx="410" cy="237" rx="10" ry="2.6" fill="#7a4a2a"/><path d="M406 230q-3 -5 0 -10M414 230q-3 -5 0 -10" stroke="#dfe3ea" stroke-width="1.6" fill="none"/>`, `<ellipse cx="410" cy="237" rx="10" ry="2.6" fill="#e8e2d6"/>`) +
    `<rect x="462" y="250" width="16" height="6" fill="#5b6b7a"/><path d="M470 250V242" stroke="#5b6b7a" stroke-width="3"/>` +
    clue(
      'nightLightOn',
      470,
      236,
      26,
      `<path d="M458 244L462 226H478L482 244Z" fill="#5b6b7a"/>`,
      `<circle cx="470" cy="236" r="24" fill="#ffe680" fill-opacity="0.35"/><path d="M458 244L462 226H478L482 244Z" fill="#ffe680"/>`,
    ) +
    // Clock and a shelf of toys
    `<circle cx="650" cy="140" r="26" fill="#8a5a2b"/><circle cx="650" cy="140" r="20" fill="#fffaf0"/>` +
    clue('clockStopped', 650, 140, 22, hands(300, 60), hands(130, 240)) +
    `<circle cx="650" cy="140" r="2.6" fill="#2b2b38"/>` +
    `<rect x="580" y="260" width="180" height="8" fill="#8a5a2b"/><rect x="596" y="232" width="26" height="28" fill="#e5484d"/><circle cx="660" cy="246" r="14" fill="#3fbf5f"/><rect x="700" y="224" width="20" height="36" rx="3" fill="#f2b632"/>` +
    // Floor: comic, slippers, marbles and the toy train
    clue('comicFallen', 200, 450, 30, '', comic(200, 450)) +
    slipper(340, 424) +
    clue('slipperGone', 366, 428, 20, slipper(366, 428), '') +
    `<path d="M520 440Q516 420 532 414L530 406H548L546 414Q562 420 558 440Z" fill="#8e6bbf"/><path d="M530 410h18" stroke="#f2c14e" stroke-width="3"/>` +
    `<circle cx="560" cy="452" r="5" fill="#5cc3e0"/><circle cx="578" cy="442" r="5" fill="#e8457a"/><circle cx="572" cy="460" r="5" fill="#3fbf5f"/><circle cx="596" cy="456" r="5" fill="#f2b632"/>` +
    clue('marblesPearls', 568, 445, 26, '', `<g fill="#fffaf0" stroke="#c9c2b6" stroke-width="0.8">${[[550, 450], [566, 436], [586, 452]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5"/>`).join('')}</g>`) +
    `<ellipse cx="690" cy="448" rx="86" ry="22" fill="none" stroke="#8a8f99" stroke-width="4" stroke-dasharray="3 5"/>` +
    `<rect x="700" y="456" width="30" height="16" rx="2" fill="#3a6ea5"/><g fill="#2b2b38"><circle cx="706" cy="474" r="4"/><circle cx="724" cy="474" r="4"/></g>` +
    clue('toyTrainOff', 642, 444, 38, engine(), `<g transform="rotate(-70 642 444)">${engine()}</g>`),
})
